"use client";

import { useState, useMemo } from "react";
import {
  FadeUp,
  MagneticButton,
  CheckIcon,
  GiftIcon,
  PhoneIcon,
  ArrowIcon,
  TelegramIcon,
  PlusIcon,
} from "@/components/Primitives";
import { useLocale } from "@/components/LocaleProvider";
import { getDictionary, localizedPath, htmlLangCodes, type Locale } from "@/lib/i18n";
import { asset, breadcrumbHomeLabels, href } from "@/lib/utils";
import { site } from "@/lib/site";
import { ORG_ID, breadcrumbJsonLd, jsonLdString } from "@/lib/jsonld";
import { relatedGuidesFor } from "@/lib/blog";
import { BankruptcyLeadMagnetModal } from "./BankruptcyLeadMagnetModal";
import {
  bankHero,
  bankDiptych,
  bankProblem,
  bankCapabilities,
  bankDeadlines,
  bankDemo,
  bankProcess,
  bankArch,
  bankFigures,
  bankSecurity,
  bankIncluded,
  bankProof,
  bankStakes,
  bankFinalCta,
  bankFaq,
  bankRelatedServices,
  bankLeadMagnet,
  bankPhone,
  bankTelegram,
  type DemoScenario,
  type ChatMessage,
  type Permission,
  type BankFigureId,
} from "./bankruptcy-agent-content";

const ROLE_BG: Record<DemoScenario["id"], { bg: string; fg: string }> = {
  report: { bg: "#3a4a3a", fg: "#cfe9c1" },
  filing: { bg: "#5a3f25", fg: "#f3d8b5" },
  audit: { bg: "#3d3a52", fg: "#d6d2f2" },
};

/** Figure id → asset path. Alt text and captions live in bankruptcy-agent-content.ts. */
const FIGURE_SRC: Record<BankFigureId, string> = {
  perimeter: "/images/cases/bankruptcy-agent-perimeter.jpg",
};

const PAGE_PATH = "/cases/bankruptcy-agent";
const RU_URL = `${site.url}${localizedPath(PAGE_PATH, "ru")}`;

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

function ScenarioDemo() {
  const [activeId, setActiveId] = useState<DemoScenario["id"]>("report");
  const active = useMemo(
    () => bankDemo.scenarios.find((s) => s.id === activeId)!,
    [activeId]
  );

  return (
    <section className="erp-demo" id="demo">
      <div className="container">
        <div className="erp-demo__head">
          <FadeUp>
            <p className="eyebrow erp-demo__eyebrow">{bankDemo.eyebrow}</p>
            <h2 className="erp-demo__h2">
              {bankDemo.headingLead}
              <em>{bankDemo.headingEm}</em>
              {bankDemo.headingTail}
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <p className="erp-demo__lede">{bankDemo.lede}</p>
          </FadeUp>
        </div>

        <FadeUp delay={200}>
          <div className="erp-demo__shell">
            <div className="erp-demo__bar">
              <div className="erp-demo__cli">
                <span className="erp-demo__cli-prompt">claude code</span>
                <span className="erp-demo__cli-sep">/</span>
                <span className="erp-demo__cli-path">bankruptcy-agent · case А40-12345/2024</span>
              </div>
              <div className="erp-demo__pill">{bankDemo.pill}</div>
            </div>
            <div className="erp-demo__body">
              <div className="erp-demo__roles" role="tablist">
                <div className="erp-demo__roles-head">{bankDemo.rolesLabel}</div>
                {bankDemo.scenarios.map((s) => (
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
                  <span>draft-review · approve-required</span>
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
                <div className="erp-demo__perms-head">{bankDemo.permsLabel}</div>
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
            <span className="erp-demo__lg erp-demo__lg--allow">{bankDemo.legend.allow}</span>
            <span className="erp-demo__lg erp-demo__lg--review">{bankDemo.legend.review}</span>
            <span className="erp-demo__lg erp-demo__lg--deny">{bankDemo.legend.deny}</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/**
 * JSON-LD structured data: BreadcrumbList + Service + FAQPage.
 * Embedded inline so the static HTML carries the schemas without
 * waiting for client hydration.
 */
function BankruptcyJsonLd() {
  // Names must match the breadcrumb the page actually renders — the trail
  // above uses breadcrumbHomeLabels.ru, so this one does too.
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: breadcrumbHomeLabels.ru, item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Кейсы",
        item: `${site.url}${localizedPath("/cases", "ru")}`,
      },
      { "@type": "ListItem", position: 3, name: "Bankruptcy AI", item: RU_URL },
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bankruptcy AI — ИИ-платформа для арбитражных управляющих",
    serviceType: "AI platform for arbitration trustees",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Russia" },
    description:
      "Готовит отчёты собранию и в АС, формирует процессуальные документы со ссылками на свежую практику ВС, контролирует сроки 127-ФЗ и АПК, собирает данные по должнику.",
    // The subscription price the FAQ on this page states out loud. The
    // previous node advertised price "0" for the free demo, which read as
    // "the platform is free" — the demo is a sales step, not the offering.
    offers: {
      "@type": "Offer",
      name: "Подписка Bankruptcy AI",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        minPrice: 2500,
        unitCode: "MON",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
      availability: "https://schema.org/InStock",
      url: RU_URL,
    },
    inLanguage: htmlLangCodes.ru,
    image: `${RU_URL}opengraph-image`,
    url: RU_URL,
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bankFaq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faq) }}
      />
    </>
  );
}

/**
 * Non-RU locales render the stub above instead of the full page, so they
 * previously shipped zero structured data for this route. A lightweight
 * BreadcrumbList + Service (pointing back at the RU canonical via
 * isBasedOn, same pattern as the blog's translation stubs) gives crawlers
 * something to index instead of nothing.
 */
function BankruptcyStubJsonLd({ locale }: { locale: Exclude<Locale, "ru"> }) {
  const s = STUB_STRINGS[locale];
  const url = `${site.url}${localizedPath(PAGE_PATH, locale)}`;

  const breadcrumb = breadcrumbJsonLd(
    [
      { name: s.breadcrumbHome, path: "/" },
      { name: s.breadcrumbCases, path: "/cases" },
      { name: "Bankruptcy AI", path: PAGE_PATH },
    ],
    locale,
  );

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bankruptcy AI",
    serviceType: "AI platform for arbitration trustees",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Russia" },
    // `summary`, not `lede`: the lede is written to be followed by an inline
    // link on the page ("...the full landing page is at <a>...</a>") and would
    // trail off mid-clause here. The summary describes the product and stands
    // on its own, which is what a Service description should do.
    description: s.summary,
    url,
    inLanguage: htmlLangCodes[locale],
    isBasedOn: RU_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(service) }}
      />
    </>
  );
}

/**
 * Stub shown to non-RU visitors. The product targets Russian arbitration
 * trustees working under 127-ФЗ — translating doesn't add value.
 *
 * `lede` explains the language restriction and is followed by an inline link
 * on the page. `summary` describes what the platform actually does, so the
 * stub is a real (if short) page rather than a redirect notice, and so the
 * JSON-LD description below is a self-contained sentence.
 */
const STUB_STRINGS: Record<
  Exclude<Locale, "ru">,
  {
    eyebrow: string;
    title: string;
    lede: string;
    summary: string;
    howLabel: string;
    how: string[];
    relatedLabel: string;
    primaryCta: string;
    secondaryCta: string;
    breadcrumbHome: string;
    breadcrumbCases: string;
  }
> = {
  en: {
    eyebrow: "Bankruptcy AI · LegalTech",
    title: "AI platform for Russian arbitration trustees",
    lede: "This case targets Russian arbitration trustees («арбитражные управляющие») working under 127-ФЗ. The product, demo materials and documentation are Russian-only. The full landing page is at",
    summary:
      "Bankruptcy AI is an AI platform for arbitration trustees running insolvency procedures under Russian law: it assembles creditors'-meeting and court reports on the statutory forms, drafts procedural filings with citations to current Supreme Court practice, tracks the statutory deadlines, and pulls debtor data out of the public registries and bank statements. It drafts — the trustee reviews, signs with a qualified electronic signature and files.",
    howLabel: "What it covers",
    how: [
      "Reports to the creditors' meeting and to the court, on the statutory forms",
      "Procedural filings with citations to current Supreme Court practice",
      "Deadline control under the insolvency law and the arbitration procedure code",
      "Debtor due diligence across public registries, bank statements and scanned replies",
      "Self-hosted deployment inside the trustee's own perimeter, NDA before any data touches it",
    ],
    relatedLabel: "Related services:",
    primaryCta: "View Russian version",
    secondaryCta: "Back to cases",
    breadcrumbHome: "Home",
    breadcrumbCases: "Cases",
  },
  de: {
    eyebrow: "Bankruptcy AI · LegalTech",
    title: "KI-Plattform für russische Insolvenzverwalter",
    lede: "Dieser Case richtet sich an russische Insolvenzverwalter («арбитражные управляющие»), die nach dem Gesetz 127-FZ arbeiten. Produkt, Demo-Materialien und Dokumentation sind ausschließlich auf Russisch. Die vollständige Landingpage finden Sie unter",
    summary:
      "Bankruptcy AI ist eine KI-Plattform für Insolvenzverwalter nach russischem Recht: Sie erstellt Berichte an die Gläubigerversammlung und an das Gericht auf den gesetzlich vorgeschriebenen Formularen, entwirft Schriftsätze mit Belegstellen aus der aktuellen Rechtsprechung des Obersten Gerichts, überwacht die gesetzlichen Fristen und zieht Schuldnerdaten aus öffentlichen Registern und Kontoauszügen zusammen. Sie entwirft — prüfen, mit qualifizierter elektronischer Signatur unterzeichnen und einreichen bleibt beim Verwalter.",
    howLabel: "Was abgedeckt ist",
    how: [
      "Berichte an Gläubigerversammlung und Gericht auf den gesetzlichen Formularen",
      "Schriftsätze mit Belegstellen aus der aktuellen Rechtsprechung des Obersten Gerichts",
      "Fristenkontrolle nach Insolvenzgesetz und Arbitrageverfahrensordnung",
      "Schuldner-Due-Diligence über öffentliche Register, Kontoauszüge und gescannte Auskünfte",
      "Self-hosted im eigenen Perimeter des Verwalters, NDA vor der ersten Datenanbindung",
    ],
    relatedLabel: "Passende Leistungen:",
    primaryCta: "Russische Version öffnen",
    secondaryCta: "Zurück zu den Cases",
    breadcrumbHome: "Startseite",
    breadcrumbCases: "Cases",
  },
  es: {
    eyebrow: "Bankruptcy AI · LegalTech",
    title: "Plataforma de IA para administradores concursales rusos",
    lede: "Este caso está dirigido a administradores concursales rusos («арбитражные управляющие») que trabajan bajo la ley 127-FZ. El producto, los materiales de demo y la documentación están solo en ruso. La página completa está en",
    summary:
      "Bankruptcy AI es una plataforma de IA para administradores concursales bajo la ley rusa: monta los informes a la junta de acreedores y al tribunal en los formularios legales, redacta escritos procesales citando jurisprudencia vigente del Tribunal Supremo, controla los plazos legales y reúne los datos del deudor a partir de registros públicos y extractos bancarios. Redacta borradores — revisar, firmar con firma electrónica cualificada y presentar sigue siendo del administrador.",
    howLabel: "Qué cubre",
    how: [
      "Informes a la junta de acreedores y al tribunal, en los formularios legales",
      "Escritos procesales con citas de jurisprudencia vigente del Tribunal Supremo",
      "Control de plazos según la ley concursal y el código procesal de arbitraje",
      "Due diligence del deudor sobre registros públicos, extractos bancarios y respuestas escaneadas",
      "Despliegue self-hosted en el propio perímetro del administrador, NDA antes de conectar datos",
    ],
    relatedLabel: "Servicios relacionados:",
    primaryCta: "Ver versión en ruso",
    secondaryCta: "Volver a los casos",
    breadcrumbHome: "Inicio",
    breadcrumbCases: "Casos",
  },
};

function RussianOnlyStub() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const s = locale !== "ru" ? STUB_STRINGS[locale] : STUB_STRINGS.en;
  return (
    <>
      {locale !== "ru" && <BankruptcyStubJsonLd locale={locale} />}
      <section className="page-hero">
      <div className="container" style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="breadcrumbs">
          <a href={href("/", locale)}>{s.breadcrumbHome}</a>
          <span className="breadcrumbs__sep">/</span>
          <a href={href("/cases", locale)}>{s.breadcrumbCases}</a>
          <span className="breadcrumbs__sep">/</span>
          <span className="breadcrumbs__current">Bankruptcy AI</span>
        </div>
        <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
          {s.eyebrow}
        </p>
        <h1 className="page-hero__title">{s.title}</h1>
        <p className="page-hero__lede">{s.summary}</p>
        <p className="page-hero__lede">
          {s.lede} <a href={RU_URL}>ventolabs.com/ru/cases/bankruptcy-agent</a>.
        </p>
        <div className="stub-how">
          <p className="stub-how__label">{s.howLabel}</p>
          <ul className="stub-how__list">
            {s.how.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="cta-row" style={{ marginTop: "2rem" }}>
          <MagneticButton href={RU_URL}>
            {s.primaryCta} <ArrowIcon />
          </MagneticButton>
          <MagneticButton href={href("/cases", locale)} variant="ghost">
            {s.secondaryCta}
          </MagneticButton>
        </div>
        <p className="stub-related">
          {s.relatedLabel}{" "}
          <a href={href("/services/ai-assistant", locale)}>
            {dict.services_pages["ai-assistant"].title}
          </a>
          {" · "}
          <a href={href("/services/ai-automation", locale)}>
            {dict.services_pages["ai-automation"].title}
          </a>
        </p>
      </div>
      </section>
    </>
  );
}

export function BankruptcyAgentPage() {
  const locale = useLocale();
  const dict = getDictionary(locale);

  if (locale !== "ru") {
    return <RussianOnlyStub />;
  }

  return (
    <>
      <BankruptcyJsonLd />

      {/* 1. Hero */}
      <section className="erp-hero">
        <div className="container">
          <FadeUp>
            <div className="breadcrumbs">
              <a href={href("/", locale)}>{breadcrumbHomeLabels[locale]}</a>
              <span className="breadcrumbs__sep">/</span>
              <a href={href("/cases", locale)}>{dict.casesIntro.eyebrow}</a>
              <span className="breadcrumbs__sep">/</span>
              <span className="breadcrumbs__current">Bankruptcy AI</span>
            </div>
          </FadeUp>

          <FadeUp delay={80}>
            <div className="erp-hero__top">
              <div className="erp-hero__stamp">
                <span>
                  Кейс № <b>{bankHero.caseNumber.split(" · ")[0]}</b> ·{" "}
                  {bankHero.caseNumber.split(" · ")[1]}
                </span>
                <span>{bankHero.caseLabel}</span>
              </div>
              <div className="erp-hero__center">
                <span className="erp-hero__pulse" aria-hidden />
                {bankHero.liveLabel}
              </div>
              <div className="erp-hero__right">
                <span>{bankHero.stackLabel}</span>
                <br />
                <b>{bankHero.stackValue}</b>
              </div>
            </div>
          </FadeUp>

          <div className="erp-hero__grid">
            <FadeUp delay={160}>
              <h1 className="erp-hero__title">
                {bankHero.titleLead}
                <em>{bankHero.titleEm1}</em>
                {bankHero.titleMid}
                <em>{bankHero.titleEm2}</em>
                {bankHero.titleTail}
              </h1>
            </FadeUp>
            <FadeUp delay={260}>
              <div className="erp-hero__side">
                <p className="erp-hero__lede">{bankHero.heroDescription}</p>
                <div className="erp-hero__cta">
                  <div className="cta-stack">
                    <MagneticButton href={bankHero.primaryHref}>
                      {bankHero.primaryLabel} <ArrowIcon />
                    </MagneticButton>
                    <span className="cta-meta">{bankHero.primaryMeta}</span>
                  </div>
                  <div className="cta-stack">
                    <MagneticButton href={bankHero.secondaryHref} variant="ghost">
                      {bankHero.secondaryLabel} <PhoneIcon size={16} />
                    </MagneticButton>
                    <span className="cta-meta">{bankHero.secondaryMeta}</span>
                  </div>
                </div>
                <ul className="bank-trust" aria-label="Что внутри">
                  {bankHero.trustStrip.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
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
                <span className="erp-diptych__tag">{bankDiptych.imageTag}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/images/case-bankruptcy-agent.svg")}
                  alt="Рабочее место арбитражного управляющего с Bankruptcy AI — отчёты, ходатайства, контроль сроков 127-ФЗ"
                  loading="eager"
                />
                <div className="erp-diptych__brand">
                  <i>{bankDiptych.brandSmall}</i>
                  {bankDiptych.brandBig}
                </div>
              </div>
              <div className="erp-diptych__spec">
                <div className="erp-diptych__spec-head">
                  <span>{bankDiptych.specHead}</span>
                  <span>{bankDiptych.specVersion}</span>
                </div>
                <div className="erp-diptych__spec-big">
                  {bankDiptych.specBig}
                  <sup>{bankDiptych.specBigUnit}</sup>
                </div>
                <p className="erp-diptych__spec-desc">{bankDiptych.specBigDesc}</p>
                {bankDiptych.specRows.map((r) => (
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

      {/* 3. Problem */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{bankProblem.eyebrow}</p>
                <h2>{bankProblem.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{bankProblem.lede}</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="erp-problem">
              {bankProblem.items.map((p, i) => (
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

      {/* 4. Capabilities — replaces "Two modes". 6-card grid mapping client brief 1:1 */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{bankCapabilities.eyebrow}</p>
                <h2>{bankCapabilities.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{bankCapabilities.lede}</p>
              </div>
            </div>
          </FadeUp>
          <div className="bank-caps">
            {bankCapabilities.items.map((cap, i) => (
              <FadeUp key={cap.idx} delay={i * 60}>
                <article className="bank-cap">
                  <div className="bank-cap__head">
                    <span className="bank-cap__idx">{cap.idx}</span>
                    <h3 className="bank-cap__title">{cap.title}</h3>
                  </div>
                  <p className="bank-cap__desc">{cap.description}</p>
                  <ul className="bank-cap__points">
                    {cap.points.map((pt) => (
                      <li key={pt}>
                        <span className="bank-cap__tick" aria-hidden>
                          <CheckIcon size={12} />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 4b. Deadline workflow — the statutory windows the platform tracks. */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{bankDeadlines.eyebrow}</p>
                <h2>{bankDeadlines.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{bankDeadlines.lede}</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <ol className="bank-timeline">
              {bankDeadlines.items.map((item) => (
                <li key={item.title} className="bank-tl">
                  <span className="bank-tl__marker" aria-hidden />
                  <span className="bank-tl__window">{item.window}</span>
                  <h3 className="bank-tl__title">{item.title}</h3>
                  <p className="bank-tl__desc">{item.desc}</p>
                  <span className="bank-tl__source">{item.source}</span>
                </li>
              ))}
            </ol>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="bank-timeline__note">{bankDeadlines.note}</p>
          </FadeUp>
        </div>
      </section>

      {/* 5. Demo (interactive scenarios) */}
      <ScenarioDemo />

      {/* 6. Process */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{bankProcess.eyebrow}</p>
                <h2>{bankProcess.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{bankProcess.lede}</p>
              </div>
            </div>
          </FadeUp>
          <div className="erp-process">
            {bankProcess.rows.map((row, i) => (
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

      {/* 7. Architecture */}
      <section className="erp-arch">
        <div className="container">
          <FadeUp>
            <div className="erp-arch__head">
              <p className="eyebrow">{bankArch.eyebrow}</p>
              <h2>
                {bankArch.headingLead}
                <em>{bankArch.headingEm}</em>
                {bankArch.headingTail}
              </h2>
              <p className="erp-arch__lede">{bankArch.lede}</p>
            </div>
          </FadeUp>
          <FadeUp delay={140}>
            <div className="erp-arch__diagram">
              {bankArch.columns.map((col) => (
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

      {/* 8. Security — NEW */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{bankSecurity.eyebrow}</p>
                <h2>{bankSecurity.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{bankSecurity.lede}</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <figure className="case-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(FIGURE_SRC[bankFigures.security.id])}
                alt={bankFigures.security.alt}
                width={1376}
                height={768}
                loading="lazy"
              />
              <figcaption>{bankFigures.security.caption}</figcaption>
            </figure>
          </FadeUp>
          <div className="erp-process">
            {bankSecurity.items.map((row, i) => (
              <FadeUp key={row.title} delay={i * 60}>
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

      {/* 9. Included */}
      <section className="section section--paper" id="included">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{bankIncluded.eyebrow}</p>
                <h2>{bankIncluded.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{bankIncluded.lede}</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="erp-checklist">
              {bankIncluded.items.map((item) => (
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

      {/* 10. Social proof — 3 metrics + quote */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{bankProof.eyebrow}</p>
                <h2>{bankProof.heading}</h2>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="bank-proof">
              <div className="bank-proof__metrics">
                {bankProof.metrics.map((m) => (
                  <div key={m.label} className="bank-proof__metric">
                    <div className="bank-proof__value">
                      {m.value}
                      {m.unit && <sup>{m.unit}</sup>}
                    </div>
                    <div className="bank-proof__label">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="bank-proof__quote-wrap">
                <p className="bank-proof__quote">{bankProof.quote}</p>
                <div className="bank-proof__attr">
                  <b>{bankProof.name}</b>
                  <span>{bankProof.role}</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 11. Stakes — dark callout */}
      <section className="section--ink erp-stakes">
        <div className="container">
          <FadeUp>
            <div className="erp-stakes__inner">
              <h2>
                {bankStakes.textLead}
                <em>{bankStakes.em1}</em>
                {bankStakes.textMid}
                <em>{bankStakes.em2}</em>
                {bankStakes.textTail}
              </h2>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 12. Lead magnet — main CTA block (id="book") */}
      <section className="section section--paper lead-magnet-section" id="book">
        <div className="container">
          <FadeUp>
            <div className="lead-magnet">
              <div className="lead-magnet__copy">
                <span className="lead-magnet__badge">
                  <GiftIcon size={16} />
                  {bankLeadMagnet.badge}
                </span>
                <h2 className="lead-magnet__heading">{bankLeadMagnet.heading}</h2>
                <p className="lead-magnet__desc">{bankLeadMagnet.description}</p>
                <ul className="lead-magnet__bullets">
                  {bankLeadMagnet.bullets.map((b) => (
                    <li key={b}>
                      <span className="lead-magnet__bullet-icon">
                        <CheckIcon size={16} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="lead-magnet__hints">
                  {bankLeadMagnet.hints.map((h) => (
                    <span key={h} className="lead-magnet__hint">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lead-magnet__action">
                <div className="cta-stack">
                  <MagneticButton href={bankLeadMagnet.primaryHref}>
                    {bankLeadMagnet.primaryLabel} <PhoneIcon size={16} />
                  </MagneticButton>
                  <span className="cta-meta">демо ведёт основатель</span>
                </div>
                <div className="cta-stack">
                  <MagneticButton href={bankLeadMagnet.secondaryHref} variant="ghost">
                    {bankLeadMagnet.secondaryLabel} <TelegramIcon size={16} />
                  </MagneticButton>
                  <span className="cta-meta">{bankTelegram.display}</span>
                </div>
                <p className="lead-magnet__footnote">{bankLeadMagnet.footnote}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 13. Final CTA — last-chance pitch */}
      <section className="erp-cta-section section--paper">
        <div className="container">
          <FadeUp>
            <div className="erp-cta">
              <span className="erp-cta__gift">{bankFinalCta.badge}</span>
              <h2>{bankFinalCta.heading}</h2>
              <p>{bankFinalCta.subtitle}</p>
              <div className="erp-cta__row">
                <div className="cta-stack cta-stack--center">
                  <MagneticButton href={bankPhone.href} variant="on-forest">
                    Позвонить {bankPhone.display} <PhoneIcon size={16} />
                  </MagneticButton>
                  <span className="cta-meta cta-meta--on-forest">прямо сейчас</span>
                </div>
                <div className="cta-stack cta-stack--center">
                  <MagneticButton href={bankTelegram.href} variant="ghost">
                    Написать в Telegram <TelegramIcon size={16} />
                  </MagneticButton>
                  <span className="cta-meta cta-meta--on-forest">{bankTelegram.display}</span>
                </div>
              </div>
              <div className="erp-cta__hint">
                {bankFinalCta.hints.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 14. FAQ */}
      <BankFaqAccordion />

      {/* 15. Related guides — inferred from which blog articles link here
          (see relatedGuidesFor in src/lib/blog.ts). */}
      <BankRelatedGuides />

      {/* Exit-intent + idle lead-magnet modal */}
      <BankruptcyLeadMagnetModal />
    </>
  );
}

function BankRelatedGuides() {
  const dict = getDictionary("ru");
  const guides = relatedGuidesFor("bankruptcy-agent");
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
                const card = entry.card.ru;
                return (
                  <a key={entry.slug} className="post-card" href={href(`/blog/${entry.slug}`, "ru")}>
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
            <p className="rel-services__label">{bankRelatedServices.heading}</p>
            <div className="rel-services__grid">
              {bankRelatedServices.items.map((s) => (
                <a key={s.slug} className="rel-service" href={href(`/services/${s.slug}`, "ru")}>
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

function BankFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="section section--surface">
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-header__left">
              <p className="eyebrow">{bankFaq.eyebrow}</p>
              <h2>{bankFaq.heading}</h2>
            </div>
            <div className="section-header__right">
              <p>{bankFaq.lede}</p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={120}>
          <div className="faq-list">
            {bankFaq.items.map((item, i) => (
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
