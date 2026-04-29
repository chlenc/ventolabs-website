"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { openCalendly } from "./CalendlyPopup";
import { trackContactClick, trackCtaClick } from "@/lib/analytics";
import { isFocusFunnelPath } from "@/lib/utils";

export function FloatingContact() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (isFocusFunnelPath(pathname)) return null;

  return (
    <div className="fab">
      {open && (
        <div className="fab__menu" onClick={() => setOpen(false)}>
          <a href={site.telegram} target="_blank" rel="noopener" className="fab__option" onClick={(e) => { e.stopPropagation(); trackContactClick("telegram"); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 5L2 12.5l7 1.5M21 5l-7 15-4.5-8.5M21 5L9 14"/>
            </svg>
            <span>{dict.floating.telegram}</span>
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener" className="fab__option" onClick={(e) => { e.stopPropagation(); trackContactClick("whatsapp"); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.47 14.38c-.29-.15-1.71-.84-1.97-.94-.27-.1-.46-.15-.65.15-.2.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.19.05-.36-.02-.51-.07-.14-.65-1.56-.89-2.14-.23-.56-.47-.49-.65-.49h-.56c-.19 0-.51.07-.77.36-.27.29-1.02 1-1.02 2.43s1.04 2.82 1.19 3.01c.14.19 2.05 3.13 4.97 4.39.69.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.95-1.38.24-.67.24-1.25.17-1.37-.07-.12-.27-.19-.56-.34M12.05 21.8h-.02c-1.78 0-3.53-.48-5.05-1.38l-.36-.22-3.76.99 1-3.67-.24-.37A9.86 9.86 0 012.05 12c0-5.5 4.48-9.98 9.99-9.98 2.67 0 5.18 1.04 7.06 2.93a9.93 9.93 0 012.93 7.07c0 5.5-4.48 9.99-9.98 9.99"/>
            </svg>
            <span>{dict.floating.whatsapp}</span>
          </a>
          <a href={`mailto:${site.email}`} className="fab__option" onClick={(e) => { e.stopPropagation(); trackContactClick("email"); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
            </svg>
            <span>{dict.floating.email}</span>
          </a>
          <button className="fab__option" onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
            trackCtaClick({ label: dict.floating.book, location: "floating_contact" });
            openCalendly("floating_contact");
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            <span>{dict.floating.book}</span>
          </button>
        </div>
      )}
      <button
        className={`fab__button${open ? " fab__button--open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={dict.floating.aria}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
