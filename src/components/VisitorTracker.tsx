"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureUtm } from "@/lib/utm";
import { notifyVisit } from "@/lib/notify";
import { initSessionTracker, trackPageChange } from "@/lib/session";
import { isLikelyBot } from "@/lib/bot";

export function VisitorTracker() {
  const pathname = usePathname();

  // Init once on mount
  useEffect(() => {
    captureUtm();
    // Headless/automated clients (crawlers, scrapers, uptime monitors) skip
    // both session tracking and the visit ping entirely — no point spending
    // cycles on data that isn't a real visitor.
    if (isLikelyBot()) return;
    initSessionTracker();
    const t = setTimeout(notifyVisit, 1500);
    return () => clearTimeout(t);
  }, []);

  // Track SPA page changes
  useEffect(() => {
    if (isLikelyBot()) return;
    trackPageChange();
  }, [pathname]);

  return null;
}
