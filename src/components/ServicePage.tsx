import { ServiceDef } from "@/lib/services";
import { Button } from "./Button";
import { FaqSection } from "./FaqSection";

export function ServicePage({ service }: { service: ServiceDef }) {
  return (
    <>
      {/* Hero */}
      <section className="service-hero">
        <div className="container">
          <p className="eyebrow">{service.kicker}</p>
          <h1>{service.heroTitle}</h1>
          <p>{service.heroDescription}</p>
          <div className="cta-row">
            <Button href="#book">Book a free call</Button>
            <Button href="#included" variant="secondary">
              See what&apos;s included
            </Button>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">The Problem</p>
            <h2>Sound familiar?</h2>
          </div>
          <div className="problem-list">
            {service.problems.map((p, i) => (
              <div key={i} className="problem-item">
                <span className="problem-number">{String(i + 1).padStart(2, "0")}</span>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Our Approach</p>
            <h2>How we solve it</h2>
          </div>
          <div className="checklist">
            {service.solution.map((s) => (
              <div key={s} className="checklist__item">
                <svg className="checklist__icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section" id="included">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Deliverables</p>
            <h2>What&apos;s included</h2>
          </div>
          <div className="grid grid--2">
            {service.included.map((item) => (
              <div key={item} className="card">
                <div className="checklist__item">
                  <svg className="checklist__icon" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span style={{ fontSize: "1.05rem" }}>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Results</p>
            <h2>What you can expect</h2>
          </div>
          <div className="grid grid--2">
            {service.outcomes.map((outcome) => (
              <div key={outcome} className="card">
                <p style={{ color: "var(--color-text)", fontSize: "1.05rem" }}>
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="section section--forest">
        <div className="container">
          <div className="banner">
            <h2>Book a call — we&apos;ll set up your AI assistant for free</h2>
            <p style={{ color: "rgba(255,231,210,0.7)" }}>
              20-minute discovery call. No pitch, no pressure.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <Button href="#book" variant="on-forest">
                Book a free call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={service.faq} heading={`${service.title} — FAQ`} />
    </>
  );
}
