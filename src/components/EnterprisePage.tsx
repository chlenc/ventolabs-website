import { ServiceDef } from "@/lib/services";
import { Button } from "./Button";
import { FaqSection } from "./FaqSection";
import { ScrollReveal } from "./ScrollReveal";
import { asset } from "@/lib/utils";

const agentCategories = [
  {
    name: "Supply & Procurement",
    image: "/images/agent-supply.jpg",
    agents: [
      { name: "Price Parser", does: "Extracts prices from WhatsApp, email, PDFs automatically" },
      { name: "Purchase Optimizer", does: "Suggests optimal order quantities based on demand and margins" },
      { name: "Supplier Scout", does: "Finds and evaluates new suppliers, compares terms" },
    ],
  },
  {
    name: "Sales & GTM",
    image: "/images/agent-sales.jpg",
    agents: [
      { name: "Lead Qualifier", does: "Scores and routes inbound leads based on your criteria" },
      { name: "Proposal Builder", does: "Generates custom proposals from templates and client data" },
      { name: "Outreach Agent", does: "Drafts and sends personalized outreach sequences" },
    ],
  },
  {
    name: "Marketing & Content",
    image: "/images/agent-marketing.jpg",
    agents: [
      { name: "Content Engine", does: "Creates blog posts, social media, newsletters from briefs" },
      { name: "Campaign Optimizer", does: "Analyzes campaign performance and suggests improvements" },
      { name: "SEO Monitor", does: "Tracks rankings, finds keyword opportunities, suggests fixes" },
    ],
  },
  {
    name: "Operations & Support",
    image: "/images/agent-operations.jpg",
    agents: [
      { name: "Morning Dashboard", does: "Compiles overnight metrics, flags anomalies, prepares briefing" },
      { name: "Customer Concierge", does: "Handles tier-1 support, escalates complex issues" },
      { name: "Inventory Prophet", does: "Predicts stock needs, alerts on low inventory" },
      { name: "Report Generator", does: "Creates weekly/monthly reports from live data" },
    ],
  },
];

const pricingTiers = [
  { name: "Pilot", agents: "1–3", seats: "Up to 5", timeline: "4 weeks", setup: "Custom", monthly: "Custom", highlight: false },
  { name: "Scale", agents: "5–8", seats: "Up to 15", timeline: "8 weeks", setup: "Custom", monthly: "Custom", highlight: true },
  { name: "Enterprise", agents: "13+", seats: "Unlimited", timeline: "12 weeks", setup: "Custom", monthly: "Custom", highlight: false },
];

const differentiators = [
  { title: "Claude-native", description: "We use the best AI platform and extend it. Faster, more reliable, and more cost-effective than building from scratch." },
  { title: "Knowledge compounds", description: "Every decision and conversation is saved. After 6 months, AI knows your business better than any new hire." },
  { title: "Agile delivery", description: "First agent works in 4 weeks. New agents deploy in days. We iterate on real data, not assumptions." },
];

export function EnterprisePage({ service }: { service: ServiceDef }) {
  return (
    <>
      {/* Hero */}
      <section className="service-hero">
        <div className="container">
          <p className="eyebrow">{service.kicker}</p>
          <h1>{service.heroTitle}</h1>
          <p>{service.heroDescription}</p>
          <div className="cta-row">
            <Button href="#book">Book a discovery call</Button>
            <Button href="#pricing" variant="secondary">See pricing</Button>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="eyebrow">The Problem</p>
              <h2>Your company is using AI. Just not well.</h2>
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

      {/* Solution — with image */}
      <section className="section section--forest">
        <div className="container">
          <div className="ent-solution">
            <ScrollReveal>
              <div className="ent-solution__text">
                <p className="eyebrow" style={{ color: "rgba(255,231,210,0.6)" }}>The Solution</p>
                <h2>AI Operating System — one brain for your entire company</h2>
                <p style={{ color: "rgba(255,231,210,0.7)" }}>
                  Not a chatbot. Not a dashboard. A full operating system with dedicated AI agents,
                  a shared knowledge vault, and enterprise-grade security.
                </p>
                <div className="ent-solution__cards">
                  {[
                    { t: "Claude Team Plan", d: "AI assistant with full company context for every employee" },
                    { t: "Custom AI Agents", d: "Dedicated agents per department, trained on your processes" },
                    { t: "Knowledge Vault", d: "Company knowledge indexed and available to AI — forever" },
                    { t: "MCP Gateway", d: "Secure connections to Shopify, Gmail, WhatsApp, CRM, databases" },
                  ].map((c) => (
                    <div key={c.t} className="ent-solution__card">
                      <strong>{c.t}</strong>
                      <span>{c.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/images/enterprise-solution.jpg")} alt="AI Operating System" className="ent-solution__image" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="eyebrow">How It Works</p>
              <h2>From zero to AI-powered in 4 weeks</h2>
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

      {/* Agents Showcase — with images per category */}
      <section className="section section--surface">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">AI Agents</p>
              <h2>13+ agents across your entire operation</h2>
            </div>
          </ScrollReveal>
          {agentCategories.map((cat, ci) => (
            <ScrollReveal key={cat.name} delay={ci * 80}>
              <div className={`ent-agent-row${ci % 2 === 1 ? " ent-agent-row--reverse" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(cat.image)} alt={cat.name} className="ent-agent-row__image" loading="lazy" />
                <div className="ent-agent-row__content">
                  <h3>{cat.name}</h3>
                  <div className="ent-agent-row__list">
                    {cat.agents.map((a) => (
                      <div key={a.name} className="ent-agent-item">
                        <strong>{a.name}</strong>
                        <span>{a.does}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">Architecture</p>
              <h2>Enterprise-grade security. Startup-speed deployment.</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="arch-facts">
              {[
                { icon: "🔒", text: "Data stays on your infrastructure — self-hosted VPS + Supabase" },
                { icon: "🔑", text: "OAuth 2.1 authentication with role-based access controls" },
                { icon: "📊", text: "Full audit logs, usage monitoring, and ROI reporting" },
                { icon: "🔓", text: "No vendor lock-in — standard open protocols (MCP, REST API)" },
              ].map((f) => (
                <div key={f.text} className="arch-fact">
                  <span className="arch-fact__icon">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="section section--surface" id="pricing">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">Pricing</p>
              <h2>Transparent pricing. No surprises.</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="pricing-grid">
              {pricingTiers.map((tier) => (
                <div key={tier.name} className={`pricing-card${tier.highlight ? " pricing-card--highlight" : ""}`}>
                  <h3>{tier.name}</h3>
                  <div className="pricing-card__details">
                    <div className="pricing-card__row"><span>Agents</span><strong>{tier.agents}</strong></div>
                    <div className="pricing-card__row"><span>Seats</span><strong>{tier.seats}</strong></div>
                    <div className="pricing-card__row"><span>Timeline</span><strong>{tier.timeline}</strong></div>
                    <div className="pricing-card__row"><span>Setup fee</span><strong>{tier.setup}</strong></div>
                    <div className="pricing-card__row"><span>Monthly</span><strong>{tier.monthly}</strong></div>
                  </div>
                  <Button href="#book" variant={tier.highlight ? "primary" : "secondary"}>
                    Book a call
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-muted text-center" style={{ marginTop: "1.5rem", fontSize: "0.85rem" }}>
              + Claude Team Plan ($100/seat/month) billed directly by Anthropic
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Vento Labs */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">Why Us</p>
              <h2>Why Vento Labs, not &ldquo;hire an AI team&rdquo;</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {differentiators.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 100}>
                <div className="card"><h3>{d.title}</h3><p>{d.description}</p></div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stakes */}
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

      {/* Social proof */}
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

      {/* CTA */}
      <section className="section section--forest">
        <div className="container">
          <ScrollReveal>
            <div className="banner">
              <h2>Ready to power your company with AI?</h2>
              <p style={{ color: "rgba(255,231,210,0.7)" }}>
                Book a discovery call. We&apos;ll map your processes and design your AI operating system.
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <Button href="#book" variant="on-forest">Book a discovery call</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={service.faq} heading="Enterprise AI — FAQ" />
    </>
  );
}
