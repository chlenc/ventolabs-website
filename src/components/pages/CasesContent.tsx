"use client";

import { FadeUp, MagneticButton, ArrowIcon } from "@/components/Primitives";
import { useLocale } from "@/components/LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import {
  caseLandingSlugs,
  caseStudySlugs,
  type CaseLandingSlug,
  type CaseStudySlug,
} from "@/lib/cases";
import { asset, href } from "@/lib/utils";

const landingImage: Record<CaseLandingSlug, string> = {
  "content-factory": "/images/case-content-factory.png",
  "supplier-agent": "/images/case-supplier-agent.png",
  "erp-agent": "/images/case-erp-agent.png",
};

const studyMeta: Record<CaseStudySlug, { image: string; company: string }> = {
  zigmund: { image: "/images/case-zigmund.jpg", company: "Zigmund Online" },
  noconcept: { image: "/images/case-noconcept.jpg", company: "NoConcept" },
  asgcompute: { image: "/images/case-asgcompute.jpg", company: "ASG Compute" },
};

const ctaLabels = {
  en: "Read case",
  ru: "Смотреть",
  es: "Ver caso",
  de: "Case ansehen",
} as const;

const kindLabels = {
  en: { landing: "Solution", study: "Case study" },
  ru: { landing: "Решение", study: "Кейс" },
  es: { landing: "Solución", study: "Caso" },
  de: { landing: "Lösung", study: "Case" },
} as const;

export function CasesContent() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const kinds = kindLabels[locale] ?? kindLabels.en;
  const cta = ctaLabels[locale] ?? ctaLabels.en;

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <FadeUp>
            <div className="breadcrumbs">
              <a href={href("/", locale)}>Home</a>
              <span className="breadcrumbs__sep">/</span>
              <span className="breadcrumbs__current">{dict.casesIntro.eyebrow}</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
              {dict.casesIntro.eyebrow}
            </p>
          </FadeUp>
          <FadeUp delay={180}>
            <h1 className="page-hero__title">{dict.casesIntro.heading}</h1>
          </FadeUp>
          <FadeUp delay={260}>
            <p className="page-hero__lede">{dict.casesIntro.description}</p>
          </FadeUp>
        </div>
      </section>

      {/* Unified grid — new solutions first (clickable), then case studies (static) */}
      <section className="section section--paper">
        <div className="container">
          <div className="cases-editorial-grid">
            {caseLandingSlugs.map((slug, i) => {
              const cs = dict.cases.records[slug];
              const landing = dict.case_pages[slug];
              return (
                <FadeUp key={slug} delay={i * 80}>
                  <a href={href(`/cases/${slug}`, locale)} className="case-card">
                    <div className="case-card__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(landingImage[slug])}
                        alt={landing.title}
                        className="case-card__img"
                        loading="lazy"
                      />
                    </div>
                    <div className="case-card__body">
                      <div className="case-card__meta">
                        <span className="case-card__kind case-card__kind--landing">
                          {kinds.landing}
                        </span>
                        <span>{cs.industry}</span>
                      </div>
                      <h3 className="case-card__title">{landing.title}</h3>
                      <p className="case-card__summary">{landing.cardSummary}</p>
                      <div className="case-card__metrics">
                        {cs.metrics.map((m) => (
                          <span key={m.label} className="case-card__chip">
                            {m.value}
                          </span>
                        ))}
                      </div>
                      <span className="case-card__cta">
                        {cta} <ArrowIcon />
                      </span>
                    </div>
                  </a>
                </FadeUp>
              );
            })}

            {caseStudySlugs.map((slug, i) => {
              const cs = dict.cases.records[slug];
              const meta = studyMeta[slug];
              return (
                <FadeUp key={slug} delay={(caseLandingSlugs.length + i) * 80}>
                  <article className="case-card case-card--static">
                    <div className="case-card__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(meta.image)}
                        alt={meta.company}
                        className="case-card__img"
                        loading="lazy"
                      />
                    </div>
                    <div className="case-card__body">
                      <div className="case-card__meta">
                        <span className="case-card__kind">{kinds.study}</span>
                        <span>{cs.industry}</span>
                      </div>
                      <h3 className="case-card__title">{cs.title}</h3>
                      <p className="case-card__summary">{cs.result}</p>
                      <div className="case-card__metrics">
                        {cs.metrics.map((m) => (
                          <span key={m.label} className="case-card__chip">
                            {m.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--forest">
        <div className="container">
          <FadeUp>
            <div className="banner">
              <h2>{dict.cases.readyHeading}</h2>
              <p style={{ color: "rgba(243,234,216,0.78)" }}>
                {dict.cases.readyDesc}
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <MagneticButton href="#book" variant="on-forest">
                  {dict.cases.readyCta} <ArrowIcon />
                </MagneticButton>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
