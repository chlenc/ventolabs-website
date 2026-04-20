"use client";

import { LogoMark } from "./Logo";
import { FadeUp, MagneticButton, ArrowIcon } from "./Primitives";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { href } from "@/lib/utils";

export function HeroSection() {
  const locale = useLocale();
  const dict = getDictionary(locale);

  return (
    <section className="hero container">
      <div className="hero-v1__meta">
        <FadeUp className="hero-v1__stamp">
          <span>Ventures</span>
          <b>/ Labs 2020—26</b>
        </FadeUp>
        <FadeUp className="hero-v1__center" delay={120}>
          <LogoMark size={42} spin />
          <span
            className="mono"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              color: "var(--muted)",
              marginTop: "0.35rem",
            }}
          >
            VL · 01
          </span>
        </FadeUp>
        <FadeUp className="hero-v1__right" delay={240}>
          <div className="hero-v1__stamp" style={{ justifyContent: "flex-end" }}>
            <b>Lisbon — remote</b>
            <span>/ 41.1579, -8.6291</span>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={120}>
        <h1 className="hero-v1__title">
          {dict.hero.line1}
          <br />
          {dict.hero.line2} <em className="italic">{dict.hero.line3}</em>
        </h1>
      </FadeUp>

      <FadeUp delay={300}>
        <div className="hero-tags">
          {dict.hero.tags.map((t) => (
            <span key={t} className="hero-tag">
              {t}
            </span>
          ))}
        </div>
      </FadeUp>

      <div className="hero-v1__bottom">
        <FadeUp delay={450}>
          <div className="hero-v1__desc">
            <p>{dict.hero.desc}</p>
            <p className="muted">{dict.hero.sub}</p>
          </div>
        </FadeUp>
        <FadeUp delay={550}>
          <div className="hero-v1__cta">
            <div className="hero-v1__ctaRow">
              <MagneticButton href="#book">
                {dict.hero.ctaPrimary} <ArrowIcon />
              </MagneticButton>
              <MagneticButton href={href("#services", locale)} variant="ghost">
                {dict.hero.ctaSecondary}
              </MagneticButton>
            </div>
          </div>
        </FadeUp>
      </div>

      <div className="scroll-cue">
        <span>{dict.hero.scroll}</span>
        <span className="scroll-cue__line" />
      </div>
    </section>
  );
}
