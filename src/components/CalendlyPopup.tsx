"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { trackCalendlyOpened, trackCtaClick } from "@/lib/analytics";
import { calendly } from "@/lib/site";

let calReady = false;

export async function openCalendly(source: string = "unknown") {
  trackCalendlyOpened(source);
  if (typeof window === "undefined") return;
  try {
    // If the embed script is blocked or slow (ad blockers, flaky networks),
    // don't let the primary CTA die silently — fall through to the direct
    // booking page instead.
    const cal = await Promise.race([
      getCalApi({ namespace: calendly.namespace }),
      new Promise<never>((_, reject) =>
        window.setTimeout(() => reject(new Error("cal embed timeout")), 4000),
      ),
    ]);
    cal("modal", {
      calLink: calendly.calLink,
      config: { layout: "month_view" },
    });
  } catch {
    window.open(calendly.url, "_blank", "noopener");
  }
}

export function CalendlyWidget() {
  useEffect(() => {
    if (calReady) return;
    calReady = true;

    (async () => {
      const cal = await getCalApi({ namespace: calendly.namespace });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>('a[href$="#book"]');
      if (anchor) {
        e.preventDefault();
        trackCtaClick({
          label: (anchor.textContent || "").trim() || "unknown",
          location:
            anchor.closest("[data-section]")?.getAttribute("data-section") ||
            anchor.closest("section")?.id ||
            window.location.pathname,
        });
        openCalendly("anchor_link");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
