"use client";

import { FadeUp, MagneticButton, ArrowIcon } from "@/components/Primitives";
import { useLocale } from "@/components/LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { asset, href } from "@/lib/utils";

const caseOrder = ["zigmund", "noconcept", "asgcompute"] as const;
const caseMeta: Record<
  (typeof caseOrder)[number],
  { company: string; image: string; tech: string[] }
> = {
  zigmund: {
    company: "Zigmund Online",
    image: "/images/case-zigmund.jpg",
    tech: ["AI Agent", "Telegram", "WhatsApp", "Claude API", "Notion"],
  },
  noconcept: {
    company: "NoConcept",
    image: "/images/case-noconcept.jpg",
    tech: ["n8n", "OpenAI API", "Shopify", "Gmail", "Google Sheets"],
  },
  asgcompute: {
    company: "ASG Compute",
    image: "/images/case-asgcompute.jpg",
    tech: ["Claude Team", "MCP Gateway", "n8n", "Supabase", "Custom Agents"],
  },
};

export function CasesContent() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const labels = dict.cases.sectionLabels;

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <FadeUp>
            <div className="breadcrumbs">
              <a href={href("/", locale)}>Home</a>
              <span className="breadcrumbs__sep">/</span>
              <span className="breadcrumbs__current">Cases</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
              {dict.casesIntro.eyebrow}
            </p>
          </FadeUp>
          <FadeUp delay={180}>
            <h1 className="page-hero__title">
              {dict.casesIntro.heading}
            </h1>
          </FadeUp>
          <FadeUp delay={260}>
            <p className="page-hero__lede">{dict.casesIntro.description}</p>
          </FadeUp>
        </div>
      </section>

      {/* Case studies */}
      <section className="section section--paper">
        <div className="container">
          {caseOrder.map((key, i) => {
            const cs = dict.cases.records[key];
            const meta = caseMeta[key];
            return (
              <FadeUp key={meta.company} delay={i * 80}>
                <article className="case-detail">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(meta.image)}
                    alt={meta.company}
                    className="case-detail__image"
                    loading="lazy"
                  />
                  <div className="case-detail__body">
                    <div className="case-detail__header">
                      <span style={{ fontWeight: 500, color: "var(--fg)" }}>
                        {meta.company}
                      </span>
                      <span className="case-detail__industry">
                        {cs.industry}
                      </span>
                    </div>
                    <h3 className="case-detail__title">{cs.title}</h3>

                    <div className="case-detail__metrics">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="case-detail__metric">
                          <span className="case-detail__metric-value">
                            {m.value}
                          </span>
                          <span className="case-detail__metric-label">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="case-detail__sections">
                      <div className="case-detail__section">
                        <h4>{labels.challenge}</h4>
                        <p>{cs.challenge}</p>
                      </div>
                      <div className="case-detail__section">
                        <h4>{labels.solution}</h4>
                        <p>{cs.solution}</p>
                      </div>
                      <div className="case-detail__section">
                        <h4>{labels.result}</h4>
                        <p>{cs.result}</p>
                      </div>
                    </div>

                    <div className="case-detail__tech">
                      {meta.tech.map((t) => (
                        <span key={t} className="case-detail__tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </FadeUp>
            );
          })}
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
