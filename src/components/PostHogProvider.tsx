"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ?? "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

/**
 * Initializes PostHog once on the client and emits a manual `$pageview`
 * whenever the app-router pathname or query string changes.
 *
 * Notes for this project:
 *  - `output: "export"` is on, so there's no server init — PostHog runs
 *    client-only. The no-key guard makes previews/CI safe when the env
 *    var isn't set.
 *  - GTM is already installed and fires its own analytics funnel; PostHog
 *    runs alongside it (no exclusivity, different product).
 *  - `capture_pageview: false` — we emit pageviews manually so client-side
 *    route changes (language switch, nav) are counted. The default
 *    auto-pageview only fires on full page loads.
 */
export function PostHogAnalytics({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_TOKEN) return;
    if ((posthog as unknown as { __loaded?: boolean }).__loaded) return;
    posthog.init(POSTHOG_TOKEN, {
      api_host: POSTHOG_HOST,
      defaults: "2025-05-24",
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "identified_only",
    });
  }, []);

  return (
    <>
      {/* useSearchParams needs a Suspense boundary so Next can stream the
          rest of the tree while the client-only query string resolves. */}
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </>
  );
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_TOKEN) return;
    if (!pathname) return;
    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    posthog.capture("$pageview", { $current_url: window.location.origin + url });
  }, [pathname, searchParams]);

  return null;
}
