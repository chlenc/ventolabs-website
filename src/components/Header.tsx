"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { GiftButton } from "./GiftPopup";
import { nav } from "@/lib/content";
import { href } from "@/lib/utils";

export function Header() {
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
            {nav.links.map((link) => (
              <a key={link.href} href={href(link.href)} className="header__link">
                {link.label}
              </a>
            ))}
            <GiftButton />
            <a href={href(nav.cta.href)} className="btn btn--primary header__cta">
              {nav.cta.label}
            </a>
          </nav>

          <button
            className="header__burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav className="mobile-nav" onClick={() => setMobileOpen(false)}>
          {nav.links.map((link) => (
            <a key={link.href} href={href(link.href)}>
              {link.label}
            </a>
          ))}
          <a href={href(nav.cta.href)} className="btn btn--primary">
            {nav.cta.label}
          </a>
        </nav>
      )}
    </>
  );
}
