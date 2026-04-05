"use client";

import { useEffect, useRef } from "react";
import { Button } from "./Button";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const words = hero.querySelectorAll<HTMLSpanElement>(".hero-word");
    let ticking = false;

    const applyScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      words.forEach((word) => {
        const speed = parseFloat(word.dataset.speed || "1");
        const dir = word.dataset.dir || "none";
        const x = dir === "right" ? scrollY * speed * 0.5
                : dir === "left" ? -scrollY * speed * 0.5
                : 0;
        const opacity = 1 - progress * 1.2;
        word.style.transform = `translateX(${x}px)`;
        word.style.opacity = String(Math.max(opacity, 0));
      });
    };

    // Reset on mount (handles back-navigation)
    applyScroll();

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        applyScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero-v2" ref={heroRef}>
      <div className="hero-v2__content">
        <div className="hero-v2__title">
          <span className="hero-word hero-word--line1" data-speed="0.6" data-dir="right">
            AI assistants
          </span>
          <span className="hero-word hero-word--line2" data-speed="0" data-dir="none">
            & automations
          </span>
          <span className="hero-word hero-word--line3" data-speed="0.6" data-dir="left">
            for your business
          </span>
        </div>

        <div className="hero-v2__bottom">
          <div className="hero-v2__desc">
            <p>
              We launch AI assistants in Telegram and WhatsApp, automate your processes,
              and train your team — so you save time from month one.
            </p>
            <p className="hero-v2__sub">
              Book a call — we&apos;ll set up your AI assistant for free.
            </p>
          </div>
          <div className="hero-v2__cta">
            <Button href="#book">Book a free call</Button>
            <Button href="#services" variant="secondary">Our services</Button>
          </div>
        </div>
      </div>

      <div className="hero-v2__scroll">
        <span>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 4v16m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
