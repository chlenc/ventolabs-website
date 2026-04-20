"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { trackCalendlyOpened, trackCtaClick } from "@/lib/analytics";
import { calendly } from "@/lib/site";

let calReady = false;

export async function openCalendly(source: string = "unknown") {
  trackCalendlyOpened(source);
  if (typeof window === "undefined") return;
  const cal = await getCalApi({ namespace: calendly.namespace });
  cal("modal", {
    calLink: calendly.calLink,
    config: { layout: "month_view" },
  });
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
