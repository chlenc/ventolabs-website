"use client";

import { useEffect } from "react";
import { calendly } from "@/lib/content";
import { trackCalendlyOpened, trackCtaClick } from "@/lib/analytics";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
      initBadgeWidget: (opts: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding: boolean;
      }) => void;
    };
  }
}

export function openCalendly(source: string = "unknown") {
  trackCalendlyOpened(source);
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({
      url: `${calendly.url}?hide_gdpr_banner=1&primary_color=234c12`,
    });
  }
}

export function CalendlyWidget() {
  useEffect(() => {
    // Load Calendly CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load Calendly JS
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    // Intercept all #book links to open popup instead of scrolling
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>('a[href$="#book"]');
      if (anchor && window.Calendly) {
        e.preventDefault();
        trackCtaClick({
          label: (anchor.textContent || "").trim() || "unknown",
          location: anchor.closest("[data-section]")?.getAttribute("data-section")
            || anchor.closest("section")?.id
            || window.location.pathname,
        });
        openCalendly("anchor_link");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
