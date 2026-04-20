"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  locales,
  localeNames,
  localeShortCodes,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function stripBase(p: string): string {
  if (base && p.startsWith(base)) return p.slice(base.length) || "/";
  return p;
}

function prependBase(p: string): string {
  return `${base}${p}`;
}

export function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const locale = useLocale();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const localeTargetHref = (target: Locale) => {
    const normalized = stripBase(pathname);
    return prependBase(switchLocalePath(normalized, target));
  };

  return (
    <div
      ref={ref}
      className={`lang-switcher${open ? " lang-switcher--open" : ""} lang-switcher--${variant}`}
    >
      <button
        type="button"
        className="lang-switcher__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${localeNames[locale]}`}
      >
        <svg
          className="lang-switcher__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
        </svg>
        <span className="lang-switcher__code">{localeShortCodes[locale]}</span>
        <svg
          className="lang-switcher__caret"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="lang-switcher__menu" role="listbox">
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <a
                href={localeTargetHref(l)}
                className={`lang-switcher__item${l === locale ? " lang-switcher__item--active" : ""}`}
                hrefLang={l}
                onClick={() => setOpen(false)}
              >
                <span className="lang-switcher__item-code">{localeShortCodes[l]}</span>
                <span className="lang-switcher__item-name">{localeNames[l]}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
