"use client";

import { FaqSection } from "./FaqSection";
import { FadeUp, MagneticButton, ArrowIcon, CheckIcon } from "./Primitives";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import type { ServiceDict } from "@/lib/i18n/types";
import { href, asset } from "@/lib/utils";
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

const agentCategoryImages = [
  "/images/agent-supply.jpg",
  "/images/agent-sales.jpg",
  "/images/agent-marketing.jpg",
  "/images/agent-operations.jpg",
];

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

const customIcons: Record<string, string> = {
  Outlook:
    "M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.57-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.33.75.1.43.1.9zm-1.98-4.17L0 5.7V18.3l5.9 2.07zm.67-.14l5.53-3.66V2.53l-5.53 3.2zm6.19-.14L18.69 4v16l-5.93-3.41zm2.06-5.66L20.75 0 24 2.07v19.86L20.75 24l-5.93-5.93z",
  Slack:
    "M5.04 15.16a2.52 2.52 0 01-2.52 2.52A2.52 2.52 0 010 15.16a2.52 2.52 0 012.52-2.52h2.52zm1.27 0a2.52 2.52 0 012.52-2.52 2.52 2.52 0 012.52 2.52v6.32A2.52 2.52 0 018.83 24a2.52 2.52 0 01-2.52-2.52zM8.83 5.04a2.52 2.52 0 01-2.52-2.52A2.52 2.52 0 018.83 0a2.52 2.52 0 012.52 2.52v2.52zm0 1.27a2.52 2.52 0 012.52 2.52 2.52 2.52 0 01-2.52 2.52H2.52A2.52 2.52 0 010 8.83a2.52 2.52 0 012.52-2.52zM18.96 8.83a2.52 2.52 0 012.52-2.52A2.52 2.52 0 0124 8.83a2.52 2.52 0 01-2.52 2.52h-2.52zm-1.27 0a2.52 2.52 0 01-2.52 2.52 2.52 2.52 0 01-2.52-2.52V2.52A2.52 2.52 0 0115.17 0a2.52 2.52 0 012.52 2.52zm-2.52 10.13a2.52 2.52 0 012.52 2.52A2.52 2.52 0 0115.17 24a2.52 2.52 0 01-2.52-2.52v-2.52zm0-1.27a2.52 2.52 0 01-2.52-2.52 2.52 2.52 0 012.52-2.52h6.31A2.52 2.52 0 0124 15.17a2.52 2.52 0 01-2.52 2.52z",
  Salesforce:
    "M10.12 4.13a4.59 4.59 0 013.37-1.48 4.64 4.64 0 014.38 3.16 3.82 3.82 0 011.27-.21 3.89 3.89 0 013.89 3.89 3.89 3.89 0 01-3.89 3.89h-.04a4.12 4.12 0 01-3.87 2.68 4.15 4.15 0 01-2.47-.82 4.63 4.63 0 01-3.91 2.15c-2.23 0-4.08-1.58-4.52-3.68a4.22 4.22 0 01-.87.09A3.52 3.52 0 010 10.28a3.52 3.52 0 012.93-3.47 4.62 4.62 0 017.19-2.68z",
  LinkedIn:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z",
};

const integrations = [
  "Google Sheets",
  "Google Drive",
  "Gmail",
  "Outlook",
  "Slack",
  "Notion",
  "HubSpot",
  "Salesforce",
  "Shopify",
  "Telegram",
  "WhatsApp",
  "LinkedIn",
  "Jira",
  "Trello",
  "Zoom",
];

const archIcons = ["lock", "key", "chart", "shield"];

function ArchIcon({ kind }: { kind: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 018 0v3" />
        </svg>
      );
    case "key":
      return (
        <svg {...common}>
          <circle cx="8" cy="14" r="4" />
          <path d="M11 14h11M19 14v3M22 14v3" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 4 4 5-7" />
        </svg>
      );
    case "shield":
    default:
      return (
        <svg {...common}>
          <path d="M12 2L4 6v6c0 5 3.5 9.4 8 10 4.5-.6 8-5 8-10V6l-8-4z" />
        </svg>
      );
  }
}

export function EnterprisePage({ service }: { service: ServiceDict }) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const e = dict.enterprise;

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <FadeUp>
            <div className="breadcrumbs">
              <a href={href("/", locale)}>Home</a>
              <span className="breadcrumbs__sep">/</span>
              <a href={href("/#services", locale)}>Services</a>
              <span className="breadcrumbs__sep">/</span>
              <span className="breadcrumbs__current">{service.title}</span>
            </div>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
              {service.kicker}
            </p>
          </FadeUp>
          <FadeUp delay={160}>
            <h1 className="page-hero__title">{service.heroTitle}</h1>
          </FadeUp>
          <FadeUp delay={260}>
            <p className="page-hero__lede">{service.heroDescription}</p>
          </FadeUp>
          <FadeUp delay={360}>
            <div className="page-hero__cta">
              <MagneticButton href="#book">
                {e.heroCta} <ArrowIcon />
              </MagneticButton>
              <MagneticButton href={href("#pricing", locale)} variant="ghost">
                {e.heroSecondary}
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Problem */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{dict.servicesCommon.problemEyebrow}</p>
                <h2>{dict.servicesCommon.problemHeading}</h2>
              </div>
              <div className="section-header__right">
                <p>
                  {e.problemStatPrefix}
                  <span style={{ display: "block", fontSize: "0.78rem", marginTop: "0.5rem", opacity: 0.6 }}>
                    {e.problemStatSource}
                  </span>
                </p>
              </div>
            </div>
          </FadeUp>
          <div className="problem-list">
            {service.problems.map((p, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div className="problem-item">
                  <span className="problem-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p>{p}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Live example (surface) */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header centered">
              <p className="eyebrow eyebrow--plain">{e.liveEyebrow}</p>
              <h2>{e.liveHeading}</h2>
              <p>{e.liveLead}</p>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div
              style={{
                maxWidth: 760,
                marginInline: "auto",
                padding: "2.25rem",
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <p className="eyebrow eyebrow--plain" style={{ marginBottom: "0.6rem" }}>
                {e.liveTeamTypes}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.35rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.4,
                  marginBottom: "1.75rem",
                  color: "var(--fg)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{e.liveQuote}&rdquo;
              </p>
              <p className="eyebrow eyebrow--plain" style={{ marginBottom: "0.6rem" }}>
                {e.liveAIDoes}
              </p>
              <p style={{ marginBottom: "1.5rem" }}>{e.liveAIResult}</p>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <span style={{ color: "var(--forest)", fontWeight: 500 }}>
                  {e.liveDuration}
                </span>
                <span style={{ color: "var(--muted)" }}>{e.liveNoDev}</span>
                <span style={{ color: "var(--muted)" }}>{e.liveNoPrompts}</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Solution (forest) */}
      <section className="section section--forest">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: "clamp(2rem, 4vw, 4rem)",
              alignItems: "center",
            }}
            className="ent-solution-grid"
          >
            <FadeUp>
              <div>
                <p className="eyebrow">{e.solutionEyebrow}</p>
                <h2 style={{ marginTop: "1rem" }}>{e.solutionHeading}</h2>
                <p style={{ color: "rgba(243,234,216,0.78)", marginTop: "1.25rem" }}>
                  {e.solutionLead}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                    marginTop: "2rem",
                  }}
                >
                  {e.solutionCards.map((card) => (
                    <div
                      key={card.t}
                      style={{
                        padding: "1rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid rgba(243,234,216,0.18)",
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          fontSize: "0.85rem",
                          color: "var(--cream)",
                          fontWeight: 500,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {card.t}
                      </strong>
                      <span style={{ fontSize: "0.82rem", color: "rgba(243,234,216,0.65)" }}>
                        {card.d}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={180}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/images/enterprise-solution.jpg")}
                alt="AI Operating System"
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  objectFit: "cover",
                  borderRadius: "var(--radius-md)",
                }}
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{e.howItWorksEyebrow}</p>
                <h2>{e.howItWorksHeading}</h2>
              </div>
            </div>
          </FadeUp>
          <div className="steps">
            {service.plan.map((step, i) => (
              <FadeUp key={step.title} delay={i * 100}>
                <div className="step">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* AI Skills (features grid) */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header centered">
              <p className="eyebrow eyebrow--plain">{e.capabilitiesEyebrow}</p>
              <h2>{e.capabilitiesHeading}</h2>
              <p>{e.capabilitiesLead}</p>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="features">
              {e.skills.map((skill, i) => (
                <div key={skill.title} className="feature">
                  <div className="feature__idx">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="feature__title">{skill.title}</div>
                    <p className="feature__desc">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Agents Showcase — alternating image rows */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header centered">
              <p className="eyebrow eyebrow--plain">{e.agentsEyebrow}</p>
              <h2>{e.agentsHeading}</h2>
            </div>
          </FadeUp>
          {e.agentCategories.map((cat, ci) => (
            <FadeUp key={cat.name} delay={ci * 60}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: ci % 2 === 1 ? "1.3fr 1fr" : "1fr 1.3fr",
                  gap: "clamp(1.5rem, 3vw, 3rem)",
                  alignItems: "center",
                  marginTop: ci === 0 ? "1.5rem" : "0",
                  paddingBottom: ci === e.agentCategories.length - 1 ? 0 : "clamp(2rem, 4vw, 3.5rem)",
                  marginBottom: ci === e.agentCategories.length - 1 ? 0 : "clamp(2rem, 4vw, 3.5rem)",
                  borderBottom:
                    ci === e.agentCategories.length - 1
                      ? "none"
                      : "1px solid var(--line)",
                }}
                className="ent-agent-row"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(agentCategoryImages[ci] ?? agentCategoryImages[0])}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    objectFit: "cover",
                    borderRadius: "var(--radius-md)",
                    order: ci % 2 === 1 ? 2 : 1,
                  }}
                  loading="lazy"
                />
                <div style={{ order: ci % 2 === 1 ? 1 : 2 }}>
                  <h3
                    style={{
                      color: "var(--forest)",
                      fontSize: "1.5rem",
                      marginBottom: "1.25rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {cat.agents.map((a) => (
                      <div
                        key={a.name}
                        style={{
                          padding: "1rem 1.1rem",
                          borderRadius: "var(--radius-sm)",
                          background: "var(--paper)",
                          border: "1px solid var(--line)",
                          transition: "border-color 0.2s",
                        }}
                      >
                        <strong
                          style={{
                            display: "block",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                            marginBottom: "0.2rem",
                            color: "var(--fg)",
                          }}
                        >
                          {a.name}
                        </strong>
                        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                          {a.does}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header centered">
              <p className="eyebrow eyebrow--plain">{e.integrationsEyebrow}</p>
              <h2>{e.integrationsHeading}</h2>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.6rem",
                maxWidth: 780,
                marginInline: "auto",
              }}
            >
              {integrations.map((name) => {
                const iconPath = siIcons[name] ?? customIcons[name];
                return (
                  <span
                    key={name}
                    style={{
                      padding: "0.55rem 1rem",
                      borderRadius: 999,
                      background: "var(--paper)",
                      border: "1px solid var(--line)",
                      fontSize: "0.88rem",
                      fontWeight: 450,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "var(--fg)",
                    }}
                  >
                    {iconPath && (
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                        style={{ opacity: 0.55 }}
                      >
                        <path d={iconPath} />
                      </svg>
                    )}
                    {name}
                  </span>
                );
              })}
              <span
                style={{
                  padding: "0.55rem 1rem",
                  borderRadius: 999,
                  background: "var(--forest)",
                  color: "var(--cream)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                }}
              >
                {e.integrationsCustomTag}
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Compounding (ink) */}
      <section className="section section--ink">
        <div className="container container--narrow">
          <FadeUp>
            <div className="stakes-section">
              <p className="eyebrow">{e.compoundEyebrow}</p>
              <h2 style={{ marginTop: "1rem" }}>{e.compoundHeading}</h2>
              <p style={{ marginTop: "1.5rem", color: "rgba(246,244,238,0.7)" }}>
                {e.compoundP1}
              </p>
              <p style={{ marginTop: "1rem", color: "rgba(246,244,238,0.7)" }}>
                {e.compoundP2}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Architecture facts */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header centered">
              <p className="eyebrow eyebrow--plain">{e.archEyebrow}</p>
              <h2>{e.archHeading}</h2>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              {e.archFacts.map((text, i) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "1.25rem 1.4rem",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--paper-warm)",
                    fontSize: "0.95rem",
                  }}
                >
                  <span style={{ color: "var(--forest)", flexShrink: 0 }}>
                    <ArchIcon kind={archIcons[i] ?? "shield"} />
                  </span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Pricing */}
      <section className="section section--surface" id="pricing">
        <div className="container">
          <FadeUp>
            <div className="section-header centered">
              <p className="eyebrow eyebrow--plain">{e.pricingEyebrow}</p>
              <h2>{e.pricingHeading}</h2>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="tier-grid">
              {e.pricingTiers.map((tier, i) => {
                const featured = i === 1;
                return (
                  <div
                    key={tier.name}
                    className={`tier ${featured ? "tier--featured" : ""}`}
                  >
                    <div className="tier__eyebrow">
                      {featured ? "Most popular" : `Plan ${i + 1}`}
                    </div>
                    <div className="tier__title">{tier.name}</div>
                    <ul className="tier__list">
                      <li>
                        {e.pricingLabels.agents}: {tier.agents}
                      </li>
                      <li>
                        {e.pricingLabels.seats}: {tier.seats}
                      </li>
                      <li>
                        {e.pricingLabels.timeline}: {tier.timeline}
                      </li>
                      <li>
                        {e.pricingLabels.setup}: {tier.setup}
                      </li>
                      <li>
                        {e.pricingLabels.monthly}: {tier.monthly}
                      </li>
                    </ul>
                    <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                      <MagneticButton
                        href="#book"
                        variant={featured ? "on-dark" : "ghost"}
                      >
                        {e.pricingLabels.bookCta} <ArrowIcon />
                      </MagneticButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
          <FadeUp>
            <p
              className="text-muted text-center"
              style={{
                marginTop: "1.5rem",
                fontSize: "0.85rem",
              }}
            >
              {e.pricingNote}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Why Vento Labs */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{e.whyEyebrow}</p>
                <h2>{e.whyHeading}</h2>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="features">
              {e.differentiators.map((d, i) => (
                <div key={d.title} className="feature">
                  <div className="feature__idx">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="feature__title">{d.title}</div>
                    <p className="feature__desc">{d.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stakes (ink) */}
      <section className="section section--ink">
        <div className="container container--narrow">
          <FadeUp>
            <div className="stakes-section">
              <p className="eyebrow">{e.stakesEyebrow}</p>
              <h2 style={{ marginTop: "1rem" }}>{service.stakes}</h2>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Results */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header centered">
              <p className="eyebrow eyebrow--plain">{e.resultsEyebrow}</p>
              <h2>{e.resultsHeading}</h2>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="features">
              {e.resultsEntries.map((c) => (
                <div key={c.company} className="feature">
                  <div className="feature__idx">{c.industry}</div>
                  <div>
                    <div className="feature__title">{c.company}</div>
                    <p className="feature__desc">{c.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp>
            <div
              className="cta-row"
              style={{ justifyContent: "center", marginTop: "2.5rem" }}
            >
              <MagneticButton href={href("/cases", locale)} variant="ghost">
                {e.resultsCta} <ArrowIcon />
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA (forest) */}
      <section className="section section--forest" id="book">
        <div className="container">
          <FadeUp>
            <div className="banner">
              <h2>{e.ctaHeading}</h2>
              <p style={{ color: "rgba(243,234,216,0.78)" }}>{e.ctaDesc}</p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <MagneticButton href="#book" variant="on-forest">
                  {e.ctaPrimary} <ArrowIcon />
                </MagneticButton>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={service.faq} heading={e.faqHeading} />

      {/* Touch CheckIcon to keep import (for future deliverables list) */}
      <span hidden>
        <CheckIcon />
      </span>
    </>
  );
}
