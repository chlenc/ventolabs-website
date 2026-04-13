import { ServiceDef } from "@/lib/services";
import { Button } from "./Button";
import { FaqSection } from "./FaqSection";
import { ScrollReveal } from "./ScrollReveal";
import { asset } from "@/lib/utils";

const agentCategories = [
  {
    name: "Client & Customer Service",
    image: "/images/agent-supply.jpg",
    agents: [
      { name: "Customer Concierge", does: "Handles tier-1 questions 24/7 — order status, returns, FAQs — and escalates complex issues" },
      { name: "Client Reporter", does: "Generates branded weekly/monthly reports for each client automatically" },
      { name: "Follow-up Agent", does: "Sends personalized follow-ups after calls, demos, and purchases — never lets a lead go cold" },
    ],
  },
  {
    name: "Sales & Lead Management",
    image: "/images/agent-sales.jpg",
    agents: [
      { name: "Lead Qualifier", does: "Scores and routes inbound leads in under 5 minutes based on your criteria" },
      { name: "Proposal Builder", does: "Generates custom proposals from templates, CRM data, and past deals" },
      { name: "Outreach Agent", does: "Drafts and sends personalized outreach sequences across email and LinkedIn" },
    ],
  },
  {
    name: "Marketing & Content",
    image: "/images/agent-marketing.jpg",
    agents: [
      { name: "Content Engine", does: "Creates blog posts, social media, newsletters from briefs in your brand voice" },
      { name: "Campaign Optimizer", does: "Analyzes ad performance across platforms and suggests improvements" },
      { name: "SEO Monitor", does: "Tracks rankings, finds keyword opportunities, drafts optimized content" },
    ],
  },
  {
    name: "Operations & Knowledge",
    image: "/images/agent-operations.jpg",
    agents: [
      { name: "Morning Dashboard", does: "Compiles overnight metrics, flags anomalies, prepares your daily briefing" },
      { name: "Knowledge Keeper", does: "Indexes all docs, SOPs, and conversations — answers any internal question instantly" },
      { name: "Report Generator", does: "Creates weekly/monthly reports from live data across all your tools" },
      { name: "Onboarding Guide", does: "Walks new hires through processes, answers questions, reduces ramp-up time" },
    ],
  },
];

const aiSkills = [
  { title: "Presentations & Reports", description: "AI creates polished decks, proposals, and reports from a simple brief — in your company\u2019s style." },
  { title: "Email & Calendar", description: "AI reads your inbox, drafts replies in your voice, and prepares smart meeting briefs automatically." },
  { title: "Research & Analysis", description: "AI analyzes competitors, market data, and industry trends — delivers structured findings you can act on." },
  { title: "CRM & Customer Data", description: "AI connects to your CRM, finds patterns, suggests next actions, and keeps your pipeline sharp." },
  { title: "Spreadsheets & Data", description: "No more manual formulas. AI processes your files, calculates, and visualizes in seconds." },
  { title: "Knowledge Base & Docs", description: "AI indexes your company docs and becomes an internal expert your team can ask anything." },
];

const integrations = [
  "Google Sheets", "Google Drive", "Gmail", "Outlook", "Slack",
  "Notion", "HubSpot", "Salesforce", "Shopify", "Telegram",
  "WhatsApp", "LinkedIn", "Jira", "Trello", "Zoom",
];

const pricingTiers = [
  { name: "Pilot", agents: "1–3", seats: "Up to 5", timeline: "4 weeks", setup: "From $3,000", monthly: "From $500/mo", highlight: false },
  { name: "Scale", agents: "5–8", seats: "Up to 15", timeline: "8 weeks", setup: "From $8,000", monthly: "From $2,000/mo", highlight: true },
  { name: "Enterprise", agents: "13+", seats: "Unlimited", timeline: "12 weeks", setup: "Custom", monthly: "Custom", highlight: false },
];

const differentiators = [
  { title: "Built on the best AI", description: "We use Claude, GPT, and open-source frameworks — and extend them with your data, your tools, your workflows. No reinventing the wheel." },
  { title: "Knowledge compounds", description: "Every decision and conversation is saved. After 6 months, AI knows your business better than any new hire ever could." },
  { title: "Live in weeks, not months", description: "First agents work in 4 weeks. New ones deploy in days. We iterate on real data, not assumptions." },
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
              <h2>Sound familiar?</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={40}>
            <p style={{ marginBottom: "2rem", color: "var(--color-muted)", maxWidth: 640 }}>
              81% of business leaders say AI is pivotal to their strategy. Yet most haven&apos;t deployed it beyond a chatbot.
              <span style={{ display: "block", fontSize: "0.8rem", marginTop: "0.25rem", opacity: 0.6 }}>— Microsoft 2025 Work Trend Index</span>
            </p>
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

      {/* Live Example */}
      <section className="section section--surface">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">See it in action</p>
              <h2>Not a chatbot. An AI that does the work.</h2>
              <p>Your team types in plain English. AI reads your files, opens your tools, and executes — like a colleague who knows every system in your company.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="card" style={{ maxWidth: 720, marginInline: "auto", padding: "2rem" }}>
              <p style={{ marginBottom: "0.75rem", color: "var(--color-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Your team types:</p>
              <p style={{ fontSize: "1.1rem", fontStyle: "italic", marginBottom: "1.5rem" }}>&ldquo;Pull last month&apos;s sales data, compare it to Q3, and write an exec summary in our format.&rdquo;</p>
              <p style={{ marginBottom: "0.75rem", color: "var(--color-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>AI does:</p>
              <p style={{ marginBottom: "1.5rem" }}>
                ✓ Opens Google Sheets &middot; reads your data &middot; writes the summary &middot; saves it to your Drive in your template
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <span style={{ color: "var(--color-forest)", fontWeight: 600 }}>38 seconds</span>
                <span style={{ color: "var(--color-muted)" }}>No developer involved</span>
                <span style={{ color: "var(--color-muted)" }}>No prompts to memorize</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Solution — with image */}
      <section className="section section--forest">
        <div className="container">
          <div className="ent-solution">
            <ScrollReveal>
              <div className="ent-solution__text">
                <p className="eyebrow" style={{ color: "rgba(255,231,210,0.6)" }}>The Solution</p>
                <h2>One AI platform — one brain for your entire team</h2>
                <p style={{ color: "rgba(255,231,210,0.7)" }}>
                  Not a chatbot. Not a dashboard. A full AI platform with dedicated agents for every team,
                  a shared knowledge vault, and your data secured on your infrastructure.
                </p>
                <div className="ent-solution__cards">
                  {[
                    { t: "AI for Every Team Member", d: "Every employee gets an AI assistant with full company context — from day one" },
                    { t: "Custom AI Agents", d: "Dedicated agents per team, trained on your processes and connected to your tools" },
                    { t: "Knowledge Vault", d: "All company knowledge indexed and available to AI — forever" },
                    { t: "Connected to Your Tools", d: "AI talks to your CRM, email, chat, Shopify, databases — in real time" },
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

      {/* AI Skills */}
      <section className="section section--surface">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">Capabilities</p>
              <h2>What your team gets</h2>
              <p>No coding. No prompts to memorize. No IT team needed.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {aiSkills.map((skill, i) => (
              <ScrollReveal key={skill.title} delay={i * 80}>
                <div className="card">
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
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

      {/* Integrations */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">Integrations</p>
              <h2>Connected to the tools you already use</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", maxWidth: 700, marginInline: "auto" }}>
              {integrations.map((name) => (
                <span key={name} style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--color-surface)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}>{name}</span>
              ))}
              <span style={{
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--color-forest)",
                color: "var(--color-cream)",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}>+ any REST API</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Compounding */}
      <section className="section section--dark">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="stakes-section">
              <p className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>It gets smarter</p>
              <h2>Every week, your AI knows your business better</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "1.5rem", lineHeight: 1.7 }}>
                Every conversation teaches your AI more about your business. It remembers decisions, learns your terminology, builds on past work.
                After a month, it knows your processes. After three, it anticipates your needs. After six, it&apos;s irreplaceable.
              </p>
              <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "1rem", lineHeight: 1.7 }}>
                Consultants leave. Tools get abandoned. We stay — not just for the kickoff, but for the whole journey.
                Every month: new automations, new skills, new capabilities. Your AI platform grows with your business.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Architecture */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">Architecture</p>
              <h2>Your data stays yours. We take this seriously.</h2>
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
              AI model costs ($20–200/month depending on usage) billed directly by providers — no markups from us.
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
              <h2>Why Vento Labs, not doing it yourself</h2>
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

      {/* Social proof — multiple case studies */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header centered">
              <p className="eyebrow">Results</p>
              <h2>Companies we&apos;ve helped</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid--3">
            {[
              { company: "NoConcept", industry: "E-commerce", result: "Lead response dropped from 6 hours to 8 minutes. 25 hours/week saved across the team." },
              { company: "Zigmund Online", industry: "Healthcare", result: "Patient response time from 4 hours to 2 minutes. Booking conversion up 40%." },
              { company: "ASG Compute", industry: "Cloud / SaaS", result: "13 AI agents deployed across 5 departments in 4 weeks. AI costs reduced 35%." },
            ].map((c, i) => (
              <ScrollReveal key={c.company} delay={i * 100}>
                <div className="card">
                  <p className="eyebrow">{c.industry}</p>
                  <h3>{c.company}</h3>
                  <p>{c.result}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center" style={{ marginTop: "2rem" }}>
              <Button href="/cases/" variant="secondary">See all case studies</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--forest">
        <div className="container">
          <ScrollReveal>
            <div className="banner">
              <h2>Ready to power your team with AI?</h2>
              <p style={{ color: "rgba(255,231,210,0.7)" }}>
                Book a discovery call. We&apos;ll map your processes and show you exactly which agents will save you the most time.
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <Button href="#book" variant="on-forest">Book a discovery call</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={service.faq} heading="AI Platform — FAQ" />
    </>
  );
}
