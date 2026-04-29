"use client";

import { useState, useMemo } from "react";
import { FadeUp, MagneticButton, CheckIcon, GiftIcon, PhoneIcon, MailIcon, TelegramIcon, PlusIcon } from "@/components/Primitives";
import { useLocale } from "@/components/LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { asset, href } from "@/lib/utils";
import {
  erpHero,
  erpDiptych,
  erpProblem,
  erpDemo,
  erpProcess,
  erpModes,
  erpIncluded,
  erpOutcomes,
  erpArch,
  erpStakes,
  erpProof,
  erpFinalCta,
  erpFaq,
  erpLeadMagnet,
  type DemoScenario,
  type ChatMessage,
  type Permission,
} from "./erp-agent-content";

const ROLE_BG: Record<DemoScenario["id"], { bg: string; fg: string }> = {
  dev: { bg: "#3a4a3a", fg: "#cfe9c1" },
  ops: { bg: "#5a3f25", fg: "#f3d8b5" },
  finance: { bg: "#3d3a52", fg: "#d6d2f2" },
};

function ChatBubble({ m }: { m: ChatMessage }) {
  if (m.kind === "plan") {
    return (
      <div className="erp-bubble erp-bubble--plan">
        <span className="erp-bubble__plan-title">{m.title}</span>
        {m.lines.map((l, i) => (
          <span key={i} className="erp-bubble__plan-line">
            {l}
          </span>
        ))}
      </div>
    );
  }
  const cls =
    m.kind === "user"
      ? "erp-bubble erp-bubble--user"
      : m.kind === "blocked"
        ? "erp-bubble erp-bubble--blocked"
        : "erp-bubble erp-bubble--ai";
  return (
    <div className={cls}>
      {"meta" in m && m.meta && <div className="erp-bubble__meta">{m.meta}</div>}
      <span className="erp-bubble__text">{m.text}</span>
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
              <div className="erp-demo__dots" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <div className="erp-demo__addr">{erpDemo.addr}</div>
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
                    <b>{active.name}</b> · {erpDemo.sessionLabel}
                  </span>
                  <span>{erpDemo.flowLabel}</span>
                </div>
                <div key={active.id} className="erp-demo__chat-body">
                  {active.messages.map((m, i) => (
                    <div
                      key={i}
                      className="erp-demo__msg-wrap"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <ChatBubble m={m} />
                    </div>
                  ))}
                </div>
                <div className="erp-demo__input">
                  <span>{active.ghost}</span>
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

  return (
    <>
      {/* 1. Hero */}
      <section className="erp-hero">
        <div className="container">
          <FadeUp>
            <div className="breadcrumbs">
              <a href={href("/", locale)}>Home</a>
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
                    <MagneticButton href={erpHero.primaryHref}>
                      {erpHero.primaryLabel} <PhoneIcon size={16} />
                    </MagneticButton>
                    <span className="cta-meta">{erpHero.primaryMeta}</span>
                  </div>
                  <div className="cta-stack">
                    <MagneticButton href={erpHero.secondaryHref} variant="ghost">
                      {erpHero.secondaryLabel} <MailIcon size={16} />
                    </MagneticButton>
                    <span className="cta-meta">{erpHero.secondaryMeta}</span>
                  </div>
                </div>
                <div className="erp-hero__chips">
                  {erpHero.chips.map((c, i) => (
                    <span
                      key={c}
                      className={`erp-chip${i === 0 ? " erp-chip--solid" : ""}`}
                    >
                      {c}
                    </span>
                  ))}
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
                <img src={asset("/images/case-erp-agent.png")} alt="1C Agent — рабочий интерфейс" loading="eager" />
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
                <MagneticButton href={erpLeadMagnet.ctaHref} variant="on-forest">
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
                  <MagneticButton href={erpHero.primaryHref} variant="on-forest">
                    {erpHero.primaryLabel} <PhoneIcon size={16} />
                  </MagneticButton>
                  <span className="cta-meta cta-meta--on-forest">{erpHero.primaryMeta}</span>
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
    </>
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
                  <span>{item.q}</span>
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
