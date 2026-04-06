import { ServiceDef } from "@/lib/services";
import { Button } from "./Button";
import { FaqSection } from "./FaqSection";
import { ScrollReveal } from "./ScrollReveal";

const agentCategories = [
  {
    name: "Supply & Procurement",
    agents: [
      { name: "Price Parser", does: "Extracts prices from WhatsApp, email, PDFs automatically", replaces: "Manual data entry from supplier messages" },
      { name: "Purchase Optimizer", does: "Suggests optimal order quantities based on demand and margins", replaces: "Gut-feel purchasing decisions" },
      { name: "Supplier Scout", does: "Finds and evaluates new suppliers, compares terms", replaces: "Hours of manual market research" },
    ],
  },
  {
    name: "Sales & GTM",
    agents: [
      { name: "Lead Qualifier", does: "Scores and routes inbound leads based on your criteria", replaces: "Manual lead review and email sorting" },
      { name: "Proposal Builder", does: "Generates custom proposals from templates and client data", replaces: "Copy-paste proposal creation" },
      { name: "Outreach Agent", does: "Drafts and sends personalized outreach sequences", replaces: "Manual cold email writing" },
    ],
  },
  {
    name: "Marketing & Content",
    agents: [
      { name: "Content Engine", does: "Creates blog posts, social media, newsletters from briefs", replaces: "Blank page syndrome and first-draft bottleneck" },
      { name: "Campaign Optimizer", does: "Analyzes campaign performance and suggests improvements", replaces: "Manual analytics review and guesswork" },
      { name: "SEO Monitor", does: "Tracks rankings, finds keyword opportunities, suggests fixes", replaces: "Monthly manual SEO audits" },
    ],
  },
  {
    name: "Operations & Support",
    agents: [
      { name: "Morning Dashboard", does: "Compiles overnight metrics, flags anomalies, prepares briefing", replaces: "30 minutes of morning data checking" },
      { name: "Customer Concierge", does: "Handles tier-1 support, escalates complex issues", replaces: "Repetitive support ticket responses" },
      { name: "Inventory Prophet", does: "Predicts stock needs, alerts on low inventory, suggests reorders", replaces: "Reactive stock management" },
      { name: "Report Generator", does: "Creates weekly/monthly reports from live data across all tools", replaces: "Half-day of report compilation" },
    ],
  },
];

const pricingTiers = [
  {
    name: "Pilot",
    agents: "1–3",
    seats: "Up to 5",
    timeline: "4 weeks",
    setup: "Custom",
    monthly: "Custom",
    highlight: false,
  },
  {
    name: "Scale",
    agents: "5–8",
    seats: "Up to 15",
    timeline: "8 weeks",
    setup: "Custom",
    monthly: "Custom",
    highlight: true,
  },
  {
    name: "Enterprise",
    agents: "13+",
    seats: "Unlimited",
    timeline: "12 weeks",
    setup: "Custom",
    monthly: "Custom",
    highlight: false,
  },
];

const differentiators = [
  {
    title: "Claude-native",
    description: "We don't build AI from scratch. We use the best platform and extend it. Faster. More reliable. More cost-effective than hiring an AI team.",
  },
  {
    title: "Knowledge compounds",
    description: "Every conversation, every decision, every deal is saved in your Knowledge Vault. After 6 months, AI knows your business better than any new hire.",
  },
  {
    title: "Agile delivery",
    description: "First agent works in 4 weeks. New agents deploy in days, not months. We iterate based on real data, not assumptions.",
  },
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

      {/* Solution */}
      <section className="section section--forest">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered" style={{ color: "var(--color-cream)" }}>
              <p className="eyebrow" style={{ color: "rgba(255,231,210,0.6)" }}>The Solution</p>
              <h2>AI Operating System — one brain for your entire company</h2>
              <p style={{ color: "rgba(255,231,210,0.7)" }}>
                Not a chatbot. Not a dashboard. A full operating system with dedicated AI agents for every department,
                a shared knowledge vault, and enterprise-grade security.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid--2">
            {[
              { title: "Claude Team Plan", desc: "Every employee gets an AI assistant with full company context" },
              { title: "Custom AI Agents", desc: "Dedicated agents for sales, marketing, operations, support — each trained on your processes" },
              { title: "Knowledge Vault", desc: "Everything your company knows — stored, indexed, and available to AI. Knowledge never leaves." },
              { title: "MCP Gateway", desc: "AI connected to your systems: Shopify, Gmail, WhatsApp, CRM, databases — through secure protocols" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="card card--forest">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
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

      {/* Agents Showcase */}
      <section className="section section--surface">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">AI Agents</p>
              <h2>13+ agents. 4 departments. Zero manual work.</h2>
            </div>
          </ScrollReveal>
          <div className="agents-showcase">
            {agentCategories.map((cat, ci) => (
              <ScrollReveal key={cat.name} delay={ci * 100}>
                <div className="agents-category">
                  <h3 className="agents-category__title">{cat.name}</h3>
                  <div className="agents-category__list">
                    {cat.agents.map((agent) => (
                      <div key={agent.name} className="agent-card">
                        <h4>{agent.name}</h4>
                        <p className="agent-card__does">{agent.does}</p>
                        <p className="agent-card__replaces">
                          <span>Replaces:</span> {agent.replaces}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
                { icon: "🔒", text: "Data stays on your infrastructure (Supabase, self-hosted VPS)" },
                { icon: "🔑", text: "OAuth 2.1 authentication, role-based access controls" },
                { icon: "📊", text: "Full audit logs and usage monitoring" },
                { icon: "🔓", text: "No vendor lock-in — standard open protocols (MCP, REST)" },
              ].map((fact) => (
                <div key={fact.text} className="arch-fact">
                  <span className="arch-fact__icon">{fact.icon}</span>
                  <span>{fact.text}</span>
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
                    <div className="pricing-card__row"><span>Setup</span><strong>{tier.setup}</strong></div>
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
            {differentiators.map((diff, i) => (
              <ScrollReveal key={diff.title} delay={i * 100}>
                <div className="card">
                  <h3>{diff.title}</h3>
                  <p>{diff.description}</p>
                </div>
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
