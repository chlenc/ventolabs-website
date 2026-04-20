"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { GiftButton } from "./GiftPopup";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MagneticButton, ArrowIcon } from "./Primitives";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { href } from "@/lib/utils";

export function Header() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header${scrolled ? " header--scrolled" : ""}`}>
        <div className="header__inner">
          <Logo />

          <nav className="header__nav">
            {dict.nav.links.map((link) => (
              <a
                key={link.href}
                href={href(link.href, locale)}
                className="header__link"
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher variant="desktop" />
            <GiftButton />
            <MagneticButton href={href(dict.nav.cta.href, locale)} variant="primary" className="header__cta">
              {dict.nav.cta.label} <ArrowIcon />
            </MagneticButton>
          </nav>

          <button
            className="header__burger"
            onClick={() => setMobileOpen(true)}
            aria-label={dict.nav.openMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav className="mobile-nav" onClick={() => setMobileOpen(false)}>
          {dict.nav.links.map((link) => (
            <a key={link.href} href={href(link.href, locale)}>
              {link.label}
            </a>
          ))}
          <div className="mobile-nav__lang" onClick={(e) => e.stopPropagation()}>
            <LanguageSwitcher variant="mobile" />
          </div>
          <a href={href(dict.nav.cta.href, locale)} className="btn btn--primary">
            {dict.nav.cta.label} <ArrowIcon />
          </a>
        </nav>
      )}
    </>
  );
}
