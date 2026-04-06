import { ServiceDef } from "@/lib/services";
import { Button } from "./Button";
import { FaqSection } from "./FaqSection";
import { ScrollReveal } from "./ScrollReveal";
import { asset } from "@/lib/utils";

export function ServicePage({ service }: { service: ServiceDef }) {
  return (
    <>
      {/* 1. Hero — Customer as hero */}
      <section className="service-hero">
        <div className="container">
          <p className="eyebrow">{service.kicker}</p>
          <h1>{service.heroTitle}</h1>
          <p>{service.heroDescription}</p>
          <div className="cta-row">
            <Button href="#book">Book a free call</Button>
            <Button href="#included" variant="secondary">What&apos;s included</Button>
          </div>
        </div>
      </section>

      {/* 2. Problem — Pain points */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="eyebrow">The Problem</p>
              <h2>Sound familiar?</h2>
            </div>
          </ScrollReveal>
          <div className="problem-list">
            {service.problems.map((p, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="problem-item">
                  <span className="problem-number">{String(i + 1).padStart(2, "0")}</span>
                  <p>{p}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Guide — Empathy + Authority */}
      <section className="section section--forest">
        <div className="container">
          <ScrollReveal>
            <div className="guide-section">
              <div className="guide-card">
                <p className="eyebrow" style={{ color: "rgba(255,231,210,0.6)" }}>We get it</p>
                <p className="guide-text">&ldquo;{service.guide.empathy}&rdquo;</p>
              </div>
              <div className="guide-card">
                <p className="eyebrow" style={{ color: "rgba(255,231,210,0.6)" }}>Our track record</p>
                <p className="guide-text">{service.guide.authority}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Plan — 3 simple steps */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="eyebrow">How It Works</p>
              <h2>Three steps to get started</h2>
            </div>
          </ScrollReveal>
          <div className="steps">
            {service.plan.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 120}>
                <div className="step">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What's Included */}
      <section className="section section--surface" id="included">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="eyebrow">Deliverables</p>
              <h2>What&apos;s included</h2>
            </div>
          </ScrollReveal>
          <div className="checklist">
            {service.included.map((item, i) => (
              <ScrollReveal key={item} delay={i * 50}>
                <div className="checklist__item">
                  <svg className="checklist__icon" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Results */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="eyebrow">Results</p>
              <h2>What you can expect</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            {service.outcomes.map((outcome, i) => (
              <ScrollReveal key={outcome} delay={i * 80}>
                <div className="card">
                  <p style={{ color: "var(--color-text)", fontSize: "1.05rem" }}>{outcome}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Stakes — What if you don't act */}
      <section className="section section--dark">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="stakes-section">
              <p className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>The cost of waiting</p>
              <h2>{service.stakes}</h2>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. Social proof */}
      {service.socialProof && (
        <section className="section">
          <div className="container container--narrow">
            <ScrollReveal>
              <div className="social-proof">
                <p className="eyebrow">Client result</p>
                <p className="social-proof__quote">&ldquo;{service.socialProof.result}&rdquo;</p>
                <p className="social-proof__company">— {service.socialProof.company}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 9. CTA Banner — Free agent */}
      <section className="section section--forest">
        <div className="container">
          <ScrollReveal>
            <div className="banner">
              <div className="lead-magnet__gift" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="lead-magnet__emoji">🎁</span>
                <span className="lead-magnet__gift-label">FREE AI AGENT</span>
              </div>
              <h2>Book a call — we&apos;ll set up your AI agent for free</h2>
              <p style={{ color: "rgba(255,231,210,0.7)" }}>
                20-minute discovery call. No pitch, no pressure.
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <Button href="#book" variant="on-forest">Claim your free AI agent</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 10. FAQ */}
      <FaqSection items={service.faq} heading={`${service.title} — FAQ`} />
    </>
  );
}
