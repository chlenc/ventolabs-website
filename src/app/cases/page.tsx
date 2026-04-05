import type { Metadata } from "next";
import { caseStudies, calendly } from "@/lib/content";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how Vento Labs helps businesses automate processes and deploy AI assistants — real projects, real results.",
};

export default function CasesPage() {
  return (
    <>
      <section className="service-hero">
        <div className="container">
          <p className="eyebrow">Case Studies</p>
          <h1>Real projects, real results</h1>
          <p>
            We believe in showing, not telling. Here are projects where we deployed AI
            assistants and automations for real businesses.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gap: "clamp(2rem, 4vw, 3rem)" }}>
            {caseStudies.map((cs) => (
              <div key={cs.title} className="case-card">
                <p className="case-card__label">{cs.label}</p>
                <h3>{cs.title}</h3>

                <div className="case-card__section">
                  <h4>Challenge</h4>
                  <p>{cs.challenge}</p>
                </div>

                <div className="case-card__section">
                  <h4>Solution</h4>
                  <p>{cs.solution}</p>
                </div>

                <div className="case-card__section">
                  <h4>Result</h4>
                  <p>{cs.result}</p>
                </div>

                <div className="case-card__tech">
                  {cs.tech.map((t) => (
                    <span key={t} className="case-card__tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--forest">
        <div className="container">
          <div className="banner">
            <h2>Ready to see what AI can do for your business?</h2>
            <p style={{ color: "rgba(255,231,210,0.7)" }}>
              Book a call — we&apos;ll set up your AI assistant for free.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <Button href={`/#book`} variant="on-forest">
                Book a free call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
