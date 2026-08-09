"use client";

import { useState, useMemo } from "react";
import { FadeUp, MagneticButton, ArrowIcon, CheckIcon, GiftIcon, PhoneIcon, MailIcon, TelegramIcon, PlusIcon } from "@/components/Primitives";
import { useLocale } from "@/components/LocaleProvider";
import { getDictionary, localizedPath, type Locale } from "@/lib/i18n";
import { asset, breadcrumbHomeLabels, href } from "@/lib/utils";
import { site } from "@/lib/site";
import { faqPageJsonLd, jsonLdString } from "@/lib/jsonld";
import { ErpLeadMagnetModal } from "./ErpLeadMagnetModal";
import { relatedGuidesFor } from "@/lib/blog";
import {
  erpHero,
  erpDiptych,
  erpProblem,
  erpDemo,
  erpBeforeAfter,
  erpFigures,
  erpProcess,
  erpModes,
  erpIncluded,
  erpOutcomes,
  erpArch,
  erpStakes,
  erpProof,
  erpFinalCta,
  erpFaq,
  erpRelatedServices,
  erpLeadMagnet,
  type DemoScenario,
  type ChatMessage,
  type Permission,
  type ErpFigureId,
} from "./erp-agent-content";

const ROLE_BG: Record<DemoScenario["id"], { bg: string; fg: string }> = {
  dev: { bg: "#3a4a3a", fg: "#cfe9c1" },
  ops: { bg: "#5a3f25", fg: "#f3d8b5" },
  finance: { bg: "#3d3a52", fg: "#d6d2f2" },
};

/** Figure id → asset path. Alt text and captions live in erp-agent-content.ts. */
const FIGURE_SRC: Record<ErpFigureId, string> = {
  "permission-layer": "/images/cases/erp-agent-permission-layer.jpg",
};

const PAGE_PATH = "/cases/erp-agent";
const RU_URL = `${site.url}${localizedPath(PAGE_PATH, "ru")}`;

/**
 * Localized stub strings for non-RU visitors. The bespoke landing below is
 * Russian-only (1C is a Russian-market ERP) — serving it under en/de/es URLs
 * is a title/body language mismatch, so those locales get a short localized
 * summary with a link to the full Russian case instead.
 *
 * The summary describes the *mechanics* rather than quoting outcome numbers:
 * the RU page's headline figure is a pricing comparison, not a measured
 * result, and restating it in three more languages would read as a benchmark.
 */
const ERP_STUB: Record<Exclude<Locale, "ru">, {
  breadcrumbHome: string;
  breadcrumbCases: string;
  eyebrow: string;
  h1: string;
  p1: string;
  p2: string;
  howLabel: string;
  how: string[];
  relatedLabel: string;
  ctaPrimary: string;
  ctaSecondary: string;
}> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCases: "Cases",
    eyebrow: "1C Agent · AI-ops",
    h1: "1C Agent — an AI developer for the 1C ERP platform",
    p1: "1C is the dominant ERP platform in the Russian-speaking market. 1C Agent is a digital 1C developer: the IT director or the head of department describes a task in plain business language, the agent turns it into a change plan, and only after that plan is approved does it write anything. Changes land in configuration extensions, so the standard 1C core stays untouched and vendor updates keep working.",
    p2: "Access is deliberately narrow — only the two authorised people can issue commands — and every request, action and result goes into an audit log. The product is sold into the Russian market, so the full case study, including the interactive permission demo, is written in Russian.",
    howLabel: "How it works",
    how: [
      "Requests in plain business language instead of internal dev tickets",
      "Every change arrives as a reviewable plan before anything is applied",
      "Writes only to configuration extensions — the 1C core stays standard",
      "Full audit log: who asked, what ran, what changed",
      "Pilot in 2–4 weeks, self-hosted ready",
    ],
    relatedLabel: "Related services:",
    ctaPrimary: "Read the full case in Russian",
    ctaSecondary: "Back to cases",
  },
  de: {
    breadcrumbHome: "Start",
    breadcrumbCases: "Cases",
    eyebrow: "1C Agent · AI-Ops",
    h1: "1C Agent — ein KI-Entwickler für die ERP-Plattform 1C",
    p1: "1C ist die dominierende ERP-Plattform im russischsprachigen Markt. 1C Agent ist ein digitaler 1C-Entwickler: Die IT-Leitung oder die Abteilungsleitung beschreibt eine Aufgabe in normaler Geschäftssprache, der Agent macht daraus einen Änderungsplan — und schreibt erst, wenn dieser Plan freigegeben ist. Änderungen landen in Configuration Extensions, der Standard-Kern von 1C bleibt unangetastet und Vendor-Updates funktionieren weiter.",
    p2: "Der Zugang ist bewusst eng: Nur die beiden autorisierten Personen können Befehle erteilen, und jede Anfrage, Aktion und jedes Ergebnis landet im Audit-Log. Das Produkt wird im russischen Markt verkauft — die vollständige Case Study samt interaktiver Berechtigungs-Demo ist deshalb auf Russisch.",
    howLabel: "So funktioniert es",
    how: [
      "Anfragen in normaler Geschäftssprache statt interner Dev-Tickets",
      "Jede Änderung kommt zuerst als prüfbarer Plan, bevor etwas angewendet wird",
      "Schreibt ausschließlich in Configuration Extensions — der 1C-Kern bleibt Standard",
      "Lückenloses Audit-Log: wer gefragt hat, was lief, was sich geändert hat",
      "Pilot in 2–4 Wochen, self-hosted-fähig",
    ],
    relatedLabel: "Passende Leistungen:",
    ctaPrimary: "Vollständige Case Study auf Russisch lesen",
    ctaSecondary: "Zurück zu den Cases",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCases: "Casos",
    eyebrow: "1C Agent · AI-ops",
    h1: "1C Agent — un desarrollador de IA para el ERP 1C",
    p1: "1C es la plataforma ERP dominante en el mercado rusohablante. 1C Agent es un desarrollador 1C digital: el director de TI o el responsable del área describe una tarea en lenguaje de negocio normal, el agente la convierte en un plan de cambios y no escribe nada hasta que ese plan se aprueba. Los cambios van a extensiones de configuración, así que el núcleo estándar de 1C queda intacto y las actualizaciones del proveedor siguen funcionando.",
    p2: "El acceso es deliberadamente estrecho — solo las dos personas autorizadas pueden dar órdenes — y cada petición, acción y resultado queda en un registro de auditoría. El producto se vende en el mercado ruso, así que el caso completo, incluida la demo interactiva de permisos, está en ruso.",
    howLabel: "Cómo funciona",
    how: [
      "Peticiones en lenguaje de negocio en lugar de tickets internos de desarrollo",
      "Cada cambio llega como un plan revisable antes de aplicarse",
      "Escribe solo en extensiones de configuración; el núcleo de 1C sigue siendo estándar",
      "Registro de auditoría completo: quién pidió qué, qué se ejecutó y qué cambió",
      "Piloto en 2–4 semanas, listo para self-hosted",
    ],
    relatedLabel: "Servicios relacionados:",
    ctaPrimary: "Leer el caso completo en ruso",
    ctaSecondary: "Volver a los casos",
  },
};

/** Short localized summary shown to non-RU visitors instead of the Russian landing. */
function ErpRussianOnlyStub({ locale }: { locale: Exclude<Locale, "ru"> }) {
  const t = ERP_STUB[locale] ?? ERP_STUB.en;
  const dict = getDictionary(locale);
  return (
    <section className="page-hero">
      <div className="container" style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="breadcrumbs">
          <a href={href("/", locale)}>{t.breadcrumbHome}</a>
          <span className="breadcrumbs__sep">/</span>
          <a href={href("/cases", locale)}>{t.breadcrumbCases}</a>
          <span className="breadcrumbs__sep">/</span>
          <span className="breadcrumbs__current">1C Agent</span>
        </div>
        <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
          {t.eyebrow}
        </p>
        <h1 className="page-hero__title">{t.h1}</h1>
        <p className="page-hero__lede">{t.p1}</p>
        <p className="page-hero__lede">{t.p2}</p>
        <div className="stub-how">
          <p className="stub-how__label">{t.howLabel}</p>
          <ul className="stub-how__list">
            {t.how.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="cta-row" style={{ marginTop: "2rem" }}>
          <MagneticButton href={RU_URL}>
            {t.ctaPrimary} <ArrowIcon />
          </MagneticButton>
          <MagneticButton href={href("/cases", locale)} variant="ghost">
            {t.ctaSecondary}
          </MagneticButton>
        </div>
        <p className="stub-related">
          {t.relatedLabel}{" "}
          <a href={href("/services/ai-assistant", locale)}>
            {dict.services_pages["ai-assistant"].title}
          </a>
          {" · "}
          <a href={href("/services/ai-workspace", locale)}>
            {dict.services_pages["ai-workspace"].title}
          </a>
        </p>
      </div>
    </section>
  );
}

function TermLine({ m }: { m: ChatMessage }) {
  if (m.kind === "plan") {
    return (
      <div className="erp-term__plan">
        <div className="erp-term__plan-title">
          <span className="erp-term__plan-glyph">▎</span>
          {m.title}
        </div>
        <div className="erp-term__plan-body">
          {m.lines.map((l, i) => (
            <div key={i} className="erp-term__plan-line">{l}</div>
          ))}
        </div>
      </div>
    );
  }
  if (m.kind === "user") {
    return (
      <div className="erp-term__line erp-term__line--user">
        <span className="erp-term__sigil">&gt;</span>
        <span className="erp-term__text">{m.text}</span>
      </div>
    );
  }
  if (m.kind === "blocked") {
    return (
      <div className="erp-term__line erp-term__line--blocked">
        <span className="erp-term__tag">{m.meta}</span>
        <span className="erp-term__text">{m.text}</span>
      </div>
    );
  }
  return (
    <div className="erp-term__line erp-term__line--ai">
      <span className="erp-term__tag">{m.meta}</span>
      <span className="erp-term__text">{m.text}</span>
    </div>
  );
}

function PermRow({ p }: { p: Permission }) {
  const stateLabel = p.state === "allow" ? "Allow" : p.state === "review" ? "Review" : "Deny";
  return (
    <div className="erp-perm" data-state={p.state}>
      <div className="erp-perm__name">
        <span>{p.name}</span>
        <span className="erp-perm__scope">{p.scope}</span>
      </div>
      <div className="erp-perm__state">{stateLabel}</div>
    </div>
  );
}

function PermissionDemo() {
  const [activeId, setActiveId] = useState<DemoScenario["id"]>("dev");
  const active = useMemo(
    () => erpDemo.scenarios.find((s) => s.id === activeId)!,
    [activeId]
  );

  return (
    <section className="erp-demo" id="demo">
      <div className="container">
        <div className="erp-demo__head">
          <FadeUp>
            <p className="eyebrow erp-demo__eyebrow">{erpDemo.eyebrow}</p>
            <h2 className="erp-demo__h2">
              {erpDemo.headingLead}
              <em>{erpDemo.headingEm}</em>
              {erpDemo.headingTail}
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <p className="erp-demo__lede">{erpDemo.lede}</p>
          </FadeUp>
        </div>

        <FadeUp delay={200}>
          <div className="erp-demo__shell">
            <div className="erp-demo__bar">
              <div className="erp-demo__cli">
                <span className="erp-demo__cli-prompt">claude code</span>
                <span className="erp-demo__cli-sep">/</span>
                <span className="erp-demo__cli-path">1c-agent · workspace</span>
              </div>
              <div className="erp-demo__pill">{erpDemo.pill}</div>
            </div>
            <div className="erp-demo__body">
              <div className="erp-demo__roles" role="tablist">
                <div className="erp-demo__roles-head">{erpDemo.rolesLabel}</div>
                {erpDemo.scenarios.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={s.id === activeId}
                    className={`erp-role${s.id === activeId ? " is-active" : ""}`}
                    onClick={() => setActiveId(s.id)}
                  >
                    <span
                      className="erp-role__avatar"
                      style={{ background: ROLE_BG[s.id].bg, color: ROLE_BG[s.id].fg }}
                    >
                      {s.initial}
                    </span>
                    <span className="erp-role__meta">
                      <span className="erp-role__name">{s.name}</span>
                      <span className="erp-role__title">{s.title}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="erp-demo__chat">
                <div className="erp-demo__chat-head">
                  <span>
                    <b>{active.name}</b> · session #4821
                  </span>
                  <span>plan-review · approve-required</span>
                </div>
                <div key={active.id} className="erp-demo__chat-body">
                  {active.messages.map((m, i) => (
                    <div
                      key={i}
                      className="erp-demo__msg-wrap"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <TermLine m={m} />
                    </div>
                  ))}
                </div>
                <div className="erp-demo__input">
                  <span className="erp-demo__input-prompt">&gt;</span>
                  <span className="erp-demo__input-ghost">{active.ghost}</span>
                  <span className="erp-demo__caret" aria-hidden />
                </div>
              </div>

              <div key={`p-${active.id}`} className="erp-demo__perms">
                <div className="erp-demo__perms-head">{erpDemo.permsLabel}</div>
                {active.perms.map((p, i) => (
                  <div
                    key={p.name}
                    className="erp-demo__perm-wrap"
                    style={{ animationDelay: `${i * 60 + 200}ms` }}
                  >
                    <PermRow p={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={280}>
          <div className="erp-demo__legend">
            <span className="erp-demo__lg erp-demo__lg--allow">{erpDemo.legend.allow}</span>
            <span className="erp-demo__lg erp-demo__lg--review">{erpDemo.legend.review}</span>
            <span className="erp-demo__lg erp-demo__lg--deny">{erpDemo.legend.deny}</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function ErpAgentPage() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const caseDict = dict.case_pages["erp-agent"];

  // The bespoke landing below is Russian-only copy. Non-RU locales get a
  // short localized summary instead (no lead-magnet modal, no Russian body).
  if (locale !== "ru") {
    return <ErpRussianOnlyStub locale={locale} />;
  }

  // Primary CTA is locale-aware: the RU dictionary keeps the direct +7 phone
  // (the 1C product sells into the RU market); other locales book a call.
  const primaryCta = caseDict.ctaPrimary ?? {
    label: erpHero.primaryLabel,
    href: erpHero.primaryHref,
    meta: erpHero.primaryMeta,
    kind: "phone" as const,
  };
  const primaryIcon = primaryCta.kind === "phone" ? <PhoneIcon size={16} /> : <ArrowIcon />;

  return (
    <>
      {/* FAQPage over the RU accordion below — see ErpFaqJsonLd. */}
      <ErpFaqJsonLd />

      {/* 1. Hero */}
      <section className="erp-hero">
        <div className="container">
          <FadeUp>
            <div className="breadcrumbs">
              <a href={href("/", locale)}>{breadcrumbHomeLabels[locale]}</a>
              <span className="breadcrumbs__sep">/</span>
              <a href={href("/cases", locale)}>{dict.casesIntro.eyebrow}</a>
              <span className="breadcrumbs__sep">/</span>
              <span className="breadcrumbs__current">1C Agent</span>
            </div>
          </FadeUp>

          <FadeUp delay={80}>
            <div className="erp-hero__top">
              <div className="erp-hero__stamp">
                <span>Кейс № <b>{erpHero.caseNumber.split(" · ")[0]}</b> · {erpHero.caseNumber.split(" · ")[1]}</span>
                <span>{erpHero.caseLabel}</span>
              </div>
              <div className="erp-hero__center">
                <span className="erp-hero__pulse" aria-hidden />
                {erpHero.liveLabel}
              </div>
              <div className="erp-hero__right">
                <span>{erpHero.stackLabel}</span>
                <br />
                <b>{erpHero.stackValue}</b>
              </div>
            </div>
          </FadeUp>

          <div className="erp-hero__grid">
            <FadeUp delay={160}>
              <h1 className="erp-hero__title">
                {erpHero.titleLead}
                <em>{erpHero.titleEm1}</em>
                {erpHero.titleMid}
                <em>{erpHero.titleEm2}</em>
                {erpHero.titleTail}
              </h1>
            </FadeUp>
            <FadeUp delay={260}>
              <div className="erp-hero__side">
                <p className="erp-hero__lede">{caseDict.heroDescription}</p>
                <div className="erp-hero__cta">
                  <div className="cta-stack">
                    <MagneticButton href={primaryCta.href}>
                      {primaryCta.label} {primaryIcon}
                    </MagneticButton>
                    {primaryCta.meta && <span className="cta-meta">{primaryCta.meta}</span>}
                  </div>
                  <div className="cta-stack">
                    <MagneticButton href={erpHero.secondaryHref} variant="ghost">
                      {erpHero.secondaryLabel} <MailIcon size={16} />
                    </MagneticButton>
                    <span className="cta-meta">{erpHero.secondaryMeta}</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. Diptych */}
      <section className="erp-diptych">
        <div className="container">
          <FadeUp>
            <div className="erp-diptych__grid">
              <div className="erp-diptych__img">
                <span className="erp-diptych__tag">{erpDiptych.imageTag}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset("/images/case-erp-agent.webp")} alt="1C Agent — рабочий интерфейс" loading="eager" fetchPriority="high" />
                <div className="erp-diptych__brand">
                  <i>{erpDiptych.brandSmall}</i>
                  {erpDiptych.brandBig}
                </div>
              </div>
              <div className="erp-diptych__spec">
                <div className="erp-diptych__spec-head">
                  <span>{erpDiptych.specHead}</span>
                  <span>{erpDiptych.specVersion}</span>
                </div>
                <div className="erp-diptych__spec-big">
                  {erpDiptych.specBig}
                  <sup>{erpDiptych.specBigUnit}</sup>
                </div>
                <p className="erp-diptych__spec-desc">{erpDiptych.specBigDesc}</p>
                {erpDiptych.specRows.map((r) => (
                  <div key={r.label} className="erp-diptych__spec-row">
                    <span className="erp-diptych__spec-label">{r.label}</span>
                    <span className="erp-diptych__spec-value">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 3. Problem (2×2) */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{erpProblem.eyebrow}</p>
                <h2>{erpProblem.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{erpProblem.lede}</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="erp-problem">
              {erpProblem.items.map((p, i) => (
                <div key={i}>
                  <span className="erp-problem__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4. Lead magnet */}
      <section className="section section--paper lead-magnet-section">
        <div className="container">
          <FadeUp>
            <div className="lead-magnet">
              <div className="lead-magnet__copy">
                <span className="lead-magnet__badge">
                  <GiftIcon size={16} />
                  {erpLeadMagnet.badge}
                </span>
                <h2 className="lead-magnet__heading">{erpLeadMagnet.heading}</h2>
                <p className="lead-magnet__desc">{erpLeadMagnet.description}</p>
                <ul className="lead-magnet__bullets">
                  {erpLeadMagnet.bullets.map((b) => (
                    <li key={b}>
                      <span className="lead-magnet__bullet-icon">
                        <CheckIcon size={16} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lead-magnet__action">
                <MagneticButton href={erpLeadMagnet.ctaHref}>
                  {erpLeadMagnet.ctaLabel} <TelegramIcon size={16} />
                </MagneticButton>
                <p className="lead-magnet__footnote">{erpLeadMagnet.footnote}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 5. Permission Demo (interactive) */}
      <PermissionDemo />

      {/* 5b. Before / after — the process being replaced, as a comparison
          rather than a picture of one. */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{erpBeforeAfter.eyebrow}</p>
                <h2>{erpBeforeAfter.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{erpBeforeAfter.lede}</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="erp-ba">
              <div className="erp-ba__head" aria-hidden>
                <span className="erp-ba__label" />
                <span className="erp-ba__col-head erp-ba__col-head--before">
                  {erpBeforeAfter.beforeLabel}
                </span>
                <span className="erp-ba__col-head erp-ba__col-head--after">
                  {erpBeforeAfter.afterLabel}
                </span>
              </div>
              {erpBeforeAfter.rows.map((row) => (
                <div key={row.label} className="erp-ba__row">
                  <span className="erp-ba__label">{row.label}</span>
                  <span className="erp-ba__cell erp-ba__cell--before">
                    <span className="erp-ba__tag">{erpBeforeAfter.beforeLabel}</span>
                    {row.before}
                  </span>
                  <span className="erp-ba__cell erp-ba__cell--after">
                    <span className="erp-ba__tag">{erpBeforeAfter.afterLabel}</span>
                    {row.after}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 6. Process rows */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{erpProcess.eyebrow}</p>
                <h2>{erpProcess.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{erpProcess.lede}</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <figure className="case-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(FIGURE_SRC[erpFigures.process.id])}
                alt={erpFigures.process.alt}
                width={1376}
                height={768}
                loading="lazy"
              />
              <figcaption>{erpFigures.process.caption}</figcaption>
            </figure>
          </FadeUp>
          <div className="erp-process">
            {erpProcess.rows.map((row, i) => (
              <FadeUp key={row.title} delay={i * 80}>
                <div className="erp-process__row">
                  <span className="erp-process__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="erp-process__title">{row.title}</h3>
                  <p className="erp-process__desc">{row.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Two modes */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{erpModes.eyebrow}</p>
                <h2>{erpModes.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{erpModes.lede}</p>
              </div>
            </div>
          </FadeUp>
          <div className="erp-modes">
            <FadeUp>
              <div className="erp-mode erp-mode--dark">
                <span className="erp-mode__bg" aria-hidden />
                <div className="erp-mode__head">
                  <span className="erp-mode__icon">{erpModes.dev.initial}</span>
                  <div>
                    <p className="eyebrow">{erpModes.dev.eyebrow}</p>
                    <h3 className="erp-mode__title">{erpModes.dev.title}</h3>
                  </div>
                </div>
                <p className="erp-mode__lede">{erpModes.dev.lede}</p>
                <div className="erp-mode__flow">
                  {erpModes.dev.flow.map((step, i) => (
                    <span key={step} className="erp-mode__contents">
                      <span className="erp-flow-step">{step}</span>
                      {i < erpModes.dev.flow.length - 1 && <span className="erp-flow-arrow">→</span>}
                    </span>
                  ))}
                </div>
                <ul className="erp-mode__list">
                  {erpModes.dev.list.map((item) => (
                    <li key={item}>
                      <span className="erp-mode__tick">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="erp-mode">
                <span className="erp-mode__bg" aria-hidden />
                <div className="erp-mode__head">
                  <span className="erp-mode__icon">{erpModes.manager.initial}</span>
                  <div>
                    <p className="eyebrow">{erpModes.manager.eyebrow}</p>
                    <h3 className="erp-mode__title">{erpModes.manager.title}</h3>
                  </div>
                </div>
                <p className="erp-mode__lede">{erpModes.manager.lede}</p>
                <div className="erp-mode__flow">
                  {erpModes.manager.flow.map((step, i) => (
                    <span key={step} className="erp-mode__contents">
                      <span className="erp-flow-step">{step}</span>
                      {i < erpModes.manager.flow.length - 1 && <span className="erp-flow-arrow">→</span>}
                    </span>
                  ))}
                </div>
                <ul className="erp-mode__list">
                  {erpModes.manager.list.map((item) => (
                    <li key={item}>
                      <span className="erp-mode__tick">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 8. What's included */}
      <section className="section section--paper" id="included">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{erpIncluded.eyebrow}</p>
                <h2>{erpIncluded.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{erpIncluded.lede}</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="erp-checklist">
              {erpIncluded.items.map((item) => (
                <div key={item} className="erp-check">
                  <span className="erp-check__icon">
                    <CheckIcon size={14} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 9. Outcomes */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{erpOutcomes.eyebrow}</p>
                <h2>{erpOutcomes.heading}</h2>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="erp-features">
              {erpOutcomes.items.map((item, i) => (
                <div key={item} className="erp-feature">
                  <span className="erp-feature__idx">{String(i + 1).padStart(2, "0")}</span>
                  <div className="erp-feature__title">{item}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 10. Architecture */}
      <section className="erp-arch">
        <div className="container">
          <FadeUp>
            <div className="erp-arch__head">
              <p className="eyebrow">{erpArch.eyebrow}</p>
              <h2>
                {erpArch.headingLead}
                <em>{erpArch.headingEm}</em>
                {erpArch.headingTail}
              </h2>
              <p className="erp-arch__lede">{erpArch.lede}</p>
            </div>
          </FadeUp>
          <FadeUp delay={140}>
            <div className="erp-arch__diagram">
              {erpArch.columns.map((col) => (
                <div key={col.head} className="erp-arch__col">
                  <div className="erp-arch__col-head">{col.head}</div>
                  {col.nodes.map((n) => (
                    <div
                      key={n.name}
                      className={`erp-arch__node${n.variant === "core" ? " erp-arch__node--core" : ""}${n.variant === "gate" ? " erp-arch__node--gate" : ""}`}
                    >
                      <span className="erp-arch__node-name">{n.name}</span>
                      <span className="erp-arch__node-meta">{n.meta}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 11. Stakes */}
      <section className="section--ink erp-stakes">
        <div className="container">
          <FadeUp>
            <div className="erp-stakes__inner">
              <p className="eyebrow eyebrow--plain">{erpStakes.eyebrow}</p>
              <h2>
                {erpStakes.textLead}
                <em>{erpStakes.em1}</em>
                {erpStakes.textMid}
                <em>{erpStakes.em2}</em>
                {erpStakes.textTail}
              </h2>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 12. Social proof */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="erp-proof">
              <div>
                <div className="erp-proof__metric">
                  {erpProof.metric}
                  <small>{erpProof.metricLabel}</small>
                </div>
              </div>
              <div>
                <p className="erp-proof__quote">{erpProof.quote}</p>
                <div className="erp-proof__attr">
                  <b>{erpProof.name}</b>
                  <span>{erpProof.role}</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 13. CTA — forest card */}
      <section className="erp-cta-section section--paper" id="book">
        <div className="container">
          <FadeUp>
            <div className="erp-cta">
              <span className="erp-cta__gift">{erpFinalCta.badge}</span>
              <h2>{erpFinalCta.heading}</h2>
              <p>{erpFinalCta.subtitle}</p>
              <div className="erp-cta__row">
                <div className="cta-stack cta-stack--center">
                  <MagneticButton href={primaryCta.href} variant="on-forest">
                    {primaryCta.label} {primaryIcon}
                  </MagneticButton>
                  {primaryCta.meta && <span className="cta-meta cta-meta--on-forest">{primaryCta.meta}</span>}
                </div>
                <div className="cta-stack cta-stack--center">
                  <MagneticButton href={erpHero.secondaryHref} variant="ghost">
                    {erpHero.secondaryLabel} <MailIcon size={16} />
                  </MagneticButton>
                  <span className="cta-meta cta-meta--on-forest">{erpHero.secondaryMeta}</span>
                </div>
              </div>
              <div className="erp-cta__hint">
                {erpFinalCta.hints.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 14. FAQ */}
      <ErpFaqAccordion />

      {/* 15. Related guides — inferred from which blog articles link here
          (see relatedGuidesFor in src/lib/blog.ts). This case has the most
          inbound guide links on the site. */}
      <ErpRelatedGuides />

      {/* Exit-intent + idle lead-magnet modal (page-scoped) */}
      <ErpLeadMagnetModal />
    </>
  );
}

function ErpRelatedGuides() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const guides = relatedGuidesFor("erp-agent");
  return (
    <section className="section section--paper">
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-header__left">
              <h2>Читайте также</h2>
            </div>
          </div>
        </FadeUp>
        {guides.length > 0 && (
          <FadeUp delay={80}>
            <div className="post-cards">
              {guides.map((entry) => {
                const card = entry.card[locale];
                return (
                  <a key={entry.slug} className="post-card" href={href(`/blog/${entry.slug}`, locale)}>
                    <h3 className="post-card__title">{card.title}</h3>
                    <p className="post-card__summary">{card.summary}</p>
                    <span className="post-card__cta">
                      {card.readLabel} <ArrowIcon />
                    </span>
                  </a>
                );
              })}
            </div>
          </FadeUp>
        )}
        <FadeUp delay={140}>
          <div className="rel-services">
            <p className="rel-services__label">{erpRelatedServices.heading}</p>
            <div className="rel-services__grid">
              {erpRelatedServices.items.map((s) => (
                <a key={s.slug} className="rel-service" href={href(`/services/${s.slug}`, locale)}>
                  <span className="rel-service__title">
                    {dict.services_pages[s.slug].title} <ArrowIcon />
                  </span>
                  <span className="rel-service__desc">{s.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/**
 * FAQPage built from `erpFaq.items` — the questions the RU accordion at the
 * bottom of this page actually renders.
 *
 * The route-level `servicePageJsonLd` is set to "no-faq" for this slug because
 * *its* source is the dictionary FAQ, which the bespoke layout never displays;
 * schema over invisible text is a structured-data violation. That reasoning
 * doesn't apply to the copy below — it is on the page, in the DOM, in the same
 * language — so the page emits its own FAQPage instead of going without one.
 * Rendered only under the RU branch, since the en/de/es stubs have no FAQ.
 */
function ErpFaqJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(faqPageJsonLd(erpFaq.items)) }}
    />
  );
}

function ErpFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="section section--surface">
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-header__left">
              <p className="eyebrow">{erpFaq.eyebrow}</p>
              <h2>{erpFaq.heading}</h2>
            </div>
            <div className="section-header__right">
              <p>{erpFaq.lede}</p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={120}>
          <div className="faq-list">
            {erpFaq.items.map((item, i) => (
              <div key={i} className="faq-item" data-open={openIndex === i ? "true" : "false"}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <h3>{item.q}</h3>
                  <span className="faq-icon"><PlusIcon /></span>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
