import { ServiceDef } from "@/lib/services";
import { Button } from "./Button";
import { FaqSection } from "./FaqSection";
import { ScrollReveal } from "./ScrollReveal";
import { asset } from "@/lib/utils";
import {
  siGooglesheets,
  siGoogledrive,
  siGmail,
  siNotion,
  siHubspot,
  siShopify,
  siTelegram,
  siWhatsapp,
  siJira,
  siTrello,
  siZoom,
} from "simple-icons";

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

/* Simple-icons paths for brands available in v16 */
const siIcons: Record<string, string> = {
  "Google Sheets": siGooglesheets.path,
  "Google Drive": siGoogledrive.path,
  Gmail: siGmail.path,
  Notion: siNotion.path,
  HubSpot: siHubspot.path,
  Shopify: siShopify.path,
  Telegram: siTelegram.path,
  WhatsApp: siWhatsapp.path,
  Jira: siJira.path,
  Trello: siTrello.path,
  Zoom: siZoom.path,
};

/* Inline SVG paths for brands missing from simple-icons v16 */
const customIcons: Record<string, string> = {
  Outlook: "M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.57-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.33.75.1.43.1.9zm-1.98-4.17L0 5.7V18.3l5.9 2.07zm.67-.14l5.53-3.66V2.53l-5.53 3.2zm6.19-.14L18.69 4v16l-5.93-3.41zm2.06-5.66L20.75 0 24 2.07v19.86L20.75 24l-5.93-5.93z",
  Slack: "M5.04 15.16a2.52 2.52 0 01-2.52 2.52A2.52 2.52 0 010 15.16a2.52 2.52 0 012.52-2.52h2.52zm1.27 0a2.52 2.52 0 012.52-2.52 2.52 2.52 0 012.52 2.52v6.32A2.52 2.52 0 018.83 24a2.52 2.52 0 01-2.52-2.52zM8.83 5.04a2.52 2.52 0 01-2.52-2.52A2.52 2.52 0 018.83 0a2.52 2.52 0 012.52 2.52v2.52zm0 1.27a2.52 2.52 0 012.52 2.52 2.52 2.52 0 01-2.52 2.52H2.52A2.52 2.52 0 010 8.83a2.52 2.52 0 012.52-2.52zM18.96 8.83a2.52 2.52 0 012.52-2.52A2.52 2.52 0 0124 8.83a2.52 2.52 0 01-2.52 2.52h-2.52zm-1.27 0a2.52 2.52 0 01-2.52 2.52 2.52 2.52 0 01-2.52-2.52V2.52A2.52 2.52 0 0115.17 0a2.52 2.52 0 012.52 2.52zm-2.52 10.13a2.52 2.52 0 012.52 2.52A2.52 2.52 0 0115.17 24a2.52 2.52 0 01-2.52-2.52v-2.52zm0-1.27a2.52 2.52 0 01-2.52-2.52 2.52 2.52 0 012.52-2.52h6.31A2.52 2.52 0 0124 15.17a2.52 2.52 0 01-2.52 2.52z",
  Salesforce: "M10.12 4.13a4.59 4.59 0 013.37-1.48 4.64 4.64 0 014.38 3.16 3.82 3.82 0 011.27-.21 3.89 3.89 0 013.89 3.89 3.89 3.89 0 01-3.89 3.89h-.04a4.12 4.12 0 01-3.87 2.68 4.15 4.15 0 01-2.47-.82 4.63 4.63 0 01-3.91 2.15c-2.23 0-4.08-1.58-4.52-3.68a4.22 4.22 0 01-.87.09A3.52 3.52 0 010 10.28a3.52 3.52 0 012.93-3.47 4.62 4.62 0 017.19-2.68z",
  LinkedIn: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z",
};

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
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", maxWidth: 760, marginInline: "auto" }}>
              {integrations.map((name) => {
                const iconPath = siIcons[name] ?? customIcons[name];
                return (
                  <span key={name} style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-surface)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}>
                    {iconPath && (
                      <svg role="img" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ opacity: 0.6, flexShrink: 0 }}>
                        <path d={iconPath} />
                      </svg>
                    )}
                    {name}
                  </span>
                );
              })}
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
