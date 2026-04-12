import type { Metadata } from "next";
import { caseStudies, casesIntro } from "@/lib/content";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { asset } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Automation Case Studies — Real Business Results",
  description:
    "See how businesses cut response times by 90%, tripled content output, and automated lead qualification with Vento Labs AI agents. Real projects, measured results.",
};

export default function CasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="service-hero">
        <div className="container">
          <p className="eyebrow">Case Studies</p>
          <h1>Real projects. Measured results.</h1>
        </div>
      </section>

      {/* AI = Computers analogy */}
      <section className="section">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="cases-intro">
              <h2>{casesIntro.title}</h2>
              <p>{casesIntro.description}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section section--surface">
        <div className="container">
          <div className="cases-grid">
            {caseStudies.map((cs) => (
              <ScrollReveal key={cs.company}>
                <div className="case-v2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(cs.image)} alt={cs.company} className="case-v2__image" loading="lazy" />
                  <div className="case-v2__content">
                    <div className="case-v2__header">
                      <span className="case-v2__company">{cs.company}</span>
                      <span className="case-v2__industry">{cs.industry}</span>
                    </div>
                    <h3>{cs.title}</h3>

                    <div className="case-v2__metrics">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="case-v2__metric">
                          <span className="case-v2__metric-value">{m.value}</span>
                          <span className="case-v2__metric-label">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="case-v2__sections">
                      <div className="case-v2__section">
                        <h4>Challenge</h4>
                        <p>{cs.challenge}</p>
                      </div>
                      <div className="case-v2__section">
                        <h4>Solution</h4>
                        <p>{cs.solution}</p>
                      </div>
                      <div className="case-v2__section">
                        <h4>Result</h4>
                        <p>{cs.result}</p>
                      </div>
                    </div>

                    <div className="case-v2__tech">
                      {cs.tech.map((t) => (
                        <span key={t} className="case-card__tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--forest">
        <div className="container">
          <ScrollReveal>
            <div className="banner">
              <h2>Ready to join them?</h2>
              <p style={{ color: "rgba(255,231,210,0.7)" }}>
                Book a call — we&apos;ll set up your AI agent for free.
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <Button href="#book" variant="on-forest">
                  Book a free call
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
