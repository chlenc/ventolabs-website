import { Button } from "@/components/Button";
import { asset } from "@/lib/utils";
import {
  problems,
  solutionSteps,
  leadMagnet,
  roiCards,
  roiDisclaimer,
  securityPoints,
  faq,
} from "@/lib/content";
import { services } from "@/lib/services";
import { FaqSection } from "@/components/FaqSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";

function ProblemSection() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="eyebrow">The Problem</p>
            <h2>Sound familiar?</h2>
          </div>
        </ScrollReveal>
        <div className="problem-list">
          {problems.map((p, i) => (
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
  );
}

function SolutionSection() {
  return (
    <section className="section section--surface">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="eyebrow">How We Work</p>
            <h2>From audit to results in weeks, not months</h2>
          </div>
        </ScrollReveal>
        <div className="steps">
          {solutionSteps.map((step, i) => (
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
  );
}

function ServicesSection() {
  const items = [
    { slug: "ai-assistant" as const, image: asset("/images/service-ai-assistant.jpg") },
    { slug: "ai-automation" as const, image: asset("/images/service-ai-automation.jpg") },
    { slug: "ai-training" as const, image: asset("/images/service-ai-training.jpg") },
    { slug: "ai-workspace" as const, image: asset("/images/service-ai-workspace.jpg") },
  ];
  return (
    <section className="section" id="services">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <p className="eyebrow">What We Do</p>
            <h2>Four ways we help your business work smarter</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid--2">
          {items.map(({ slug, image }, i) => {
            const s = services[slug];
            return (
              <ScrollReveal key={slug} delay={i * 100}>
                <a href={asset(`/services/${slug}`)} className="service-card">
                  <div className="service-card__image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt={s.title} loading="lazy" />
                    <div className="service-card__overlay">
                      <span className="service-card__logo">Vento Labs</span>
                    </div>
                  </div>
                  <div className="service-card__body">
                    <h3>{s.title}</h3>
                    <p>{s.cardSummary}</p>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LeadMagnetSection() {
  return (
    <section className="section section--forest" id="free">
      <div className="container">
        <ScrollReveal>
          <div className="lead-magnet__gift">
            <span className="lead-magnet__emoji">🎁</span>
            <span className="lead-magnet__gift-label">FREE AI ASSISTANT</span>
          </div>
        </ScrollReveal>
        <div className="lead-magnet">
          <ScrollReveal>
            <div>
              <h2 style={{ marginBottom: "1.5rem" }}>{leadMagnet.title}</h2>
              <Button href="#book" variant="on-forest">
                {leadMagnet.cta}
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="lead-magnet__list">
              {leadMagnet.items.map((item) => (
                <div key={item} className="lead-magnet__item">
                  <svg className="lead-magnet__check" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function RoiSection() {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header centered">
            <p className="eyebrow">Why AI Works</p>
            <h2>Research-backed results from real studies</h2>
            <p>These numbers come from peer-reviewed academic research and controlled experiments — not marketing claims.</p>
          </div>
        </ScrollReveal>
        <div className="grid grid--3">
          {roiCards.map((card, i) => (
            <ScrollReveal key={card.source} delay={i * 120}>
              <a href={card.sourceUrl} target="_blank" rel="noopener noreferrer" className="roi-card">
                <div className="roi-card__header">
                  <span className="roi-card__logo-icon">
                    {card.logo === "stanford" && "🎓"}
                    {card.logo === "science" && "🔬"}
                    {card.logo === "github" && "⚡"}
                  </span>
                  <span className="roi-card__source">{card.source}</span>
                  <svg className="roi-card__link" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </div>
                <div className="roi-card__stat">
                  {card.stat} <span className="roi-card__stat-label">{card.statLabel}</span>
                </div>
                <p className="roi-card__desc">{card.description}</p>
                <p className="roi-card__sample">{card.sample}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <p className="text-muted text-center" style={{ marginTop: "2rem", fontSize: "0.85rem", maxWidth: "600px", marginInline: "auto" }}>
            {roiDisclaimer}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section className="section section--surface">
      <div className="container">
        <ScrollReveal>
          <div className="section-header centered">
            <p className="eyebrow">Security</p>
            <h2>Your data is protected. We take this seriously.</h2>
          </div>
        </ScrollReveal>
        <div className="security-grid">
          {securityPoints.map((point, i) => (
            <ScrollReveal key={point.title} delay={i * 80}>
              <div className="security-item">
                <svg className="security-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="section section--dark">
      <div className="container">
        <ScrollReveal>
          <div className="banner">
            <h2>Start with a free AI assistant — book a call today</h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              20-minute discovery call. No pitch, no pressure. We&apos;ll set up your AI assistant for free.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <Button href="#book" variant="on-dark">Book a free call</Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <LeadMagnetSection />
      <RoiSection />
      <SecuritySection />
      <FaqSection items={faq} />
      <FinalCtaSection />
    </>
  );
}
