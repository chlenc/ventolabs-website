"use client";

import { useEffect } from "react";
import { calendly } from "@/lib/content";

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

export function openCalendly() {
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
      const anchor = target.closest('a[href="#book"], a[href="/#book"]');
      if (anchor && window.Calendly) {
        e.preventDefault();
        openCalendly();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
