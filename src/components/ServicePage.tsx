"use client";

import { FaqSection } from "./FaqSection";
import { FadeUp, MagneticButton, ArrowIcon, CheckIcon, GiftIcon } from "./Primitives";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import type { ServiceDict } from "@/lib/i18n/types";
import { href } from "@/lib/utils";

export function ServicePage({ slug, service }: { slug: string; service: ServiceDict }) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const c = dict.servicesCommon;

  return (
    <>
      {/* 1. Hero */}
      <section className="page-hero">
        <div className="container">
          <FadeUp>
            <div className="breadcrumbs">
              <a href={href("/", locale)}>Home</a>
              <span className="breadcrumbs__sep">/</span>
              <a href={href("/#services", locale)}>Services</a>
              <span className="breadcrumbs__sep">/</span>
              <span className="breadcrumbs__current">{service.title}</span>
            </div>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
              {service.kicker}
            </p>
          </FadeUp>
          <FadeUp delay={160}>
            <h1 className="page-hero__title">{service.heroTitle}</h1>
          </FadeUp>
          <FadeUp delay={260}>
            <p className="page-hero__lede">{service.heroDescription}</p>
          </FadeUp>
          <FadeUp delay={360}>
            <div className="page-hero__cta">
              <MagneticButton href="#book">
                {c.heroCta} <ArrowIcon />
              </MagneticButton>
              <MagneticButton href={href("#included", locale)} variant="ghost">
                {c.heroSecondary}
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 2. Problem */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{c.problemEyebrow}</p>
                <h2>{c.problemHeading}</h2>
              </div>
            </div>
          </FadeUp>
          <div className="problem-list">
            {service.problems.map((p, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div className="problem-item">
                  <span className="problem-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p>{p}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Guide (forest) */}
      <section className="section section--forest">
        <div className="container">
          <FadeUp>
            <div className="guide-section">
              <div className="guide-card">
                <p className="eyebrow">{c.guideGet}</p>
                <p className="guide-text">&ldquo;{service.guide.empathy}&rdquo;</p>
              </div>
              <div className="guide-card">
                <p className="eyebrow">{c.guideTrackRecord}</p>
                <p className="guide-text">{service.guide.authority}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4. Plan */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{c.howItWorksEyebrow}</p>
                <h2>{c.howItWorksHeading}</h2>
              </div>
            </div>
          </FadeUp>
          <div className="steps">
            {service.plan.map((step, i) => (
              <FadeUp key={step.title} delay={i * 100}>
                <div className="step">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What's included */}
      <section className="section section--surface" id="included">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{c.deliverablesEyebrow}</p>
                <h2>{c.deliverablesHeading}</h2>
              </div>
              <div className="section-header__right">
                <p>
                  Concrete deliverables. Each item below ships as part of the
                  initial engagement, not as a future upsell.
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="checklist">
              {service.included.map((item) => (
                <div key={item} className="checklist__item">
                  <span className="checklist__icon">
                    <CheckIcon size={20} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 6. Results / outcomes — feature grid */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{c.resultsEyebrow}</p>
                <h2>{c.resultsHeading}</h2>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="features">
              {service.outcomes.map((outcome, i) => (
                <div key={outcome} className="feature">
                  <div className="feature__idx">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="feature__title">{outcome}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 7. Stakes (ink) */}
      <section className="section section--ink">
        <div className="container container--narrow">
          <FadeUp>
            <div className="stakes-section">
              <p className="eyebrow">{c.stakesEyebrow}</p>
              <h2 style={{ marginTop: "1rem" }}>{service.stakes}</h2>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 8. Social proof */}
      {service.socialProof && (
        <section className="section section--paper">
          <div className="container">
            <FadeUp>
              <div className="social-proof">
                <p className="eyebrow">{c.socialProofEyebrow}</p>
                <p className="social-proof__quote">
                  &ldquo;{service.socialProof.result}&rdquo;
                </p>
                <p className="social-proof__company">
                  — {service.socialProof.company}
                </p>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* 9. CTA banner (forest) */}
      <section className="section section--forest" id="book">
        <div className="container">
          <FadeUp>
            <div className="magnet__gift" style={{ margin: "0 auto 1.5rem" }}>
              <span className="magnet__giftIcon">
                <GiftIcon size={18} />
              </span>
              <span>{c.bookFreeGiftLabel}</span>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="banner">
              <h2>{c.bookFreeHeading}</h2>
              <p style={{ color: "rgba(243,234,216,0.78)" }}>
                {c.bookFreeSubtitle}
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <MagneticButton href="#book" variant="on-forest">
                  {c.bookFreeCta} <ArrowIcon />
                </MagneticButton>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 10. FAQ */}
      <FaqSection
        items={service.faq}
        heading={`${service.title} — ${c.faqSuffix}`}
      />

      {/* Slug-specific decoration: forces a `slug` reference so the prop is
          consumed even when ServicePage is invoked without specialization. */}
      <span data-service-slug={slug} hidden />
    </>
  );
}
