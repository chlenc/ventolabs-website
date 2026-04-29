"use client";

import { FaqSection } from "./FaqSection";
import { FadeUp, MagneticButton, ArrowIcon, CheckIcon, GiftIcon, PhoneIcon, MailIcon, TelegramIcon } from "./Primitives";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import type { ServiceDict } from "@/lib/i18n/types";
import { asset, href } from "@/lib/utils";

export function ServicePage({
  slug,
  service,
  breadcrumb,
  heroImage,
}: {
  slug: string;
  service: ServiceDict;
  breadcrumb?: { parentLabel: string; parentHref: string };
  /** Optional marketing image shown in a full-bleed band right after the hero. */
  heroImage?: string;
}) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const c = dict.servicesCommon;
  const parent = breadcrumb ?? { parentLabel: "Services", parentHref: "/#services" };

  function ctaIcon(kind?: "phone" | "mail" | "telegram" | "arrow") {
    if (kind === "phone") return <PhoneIcon size={16} />;
    if (kind === "mail") return <MailIcon size={16} />;
    if (kind === "telegram") return <TelegramIcon size={16} />;
    return <ArrowIcon />;
  }

  return (
    <>
      {/* 1. Hero */}
      <section className="page-hero">
        <div className="container">
          <FadeUp>
            <div className="breadcrumbs">
              <a href={href("/", locale)}>Home</a>
              <span className="breadcrumbs__sep">/</span>
              <a href={href(parent.parentHref, locale)}>{parent.parentLabel}</a>
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
              {service.ctaPrimary ? (
                <div className="cta-stack">
                  <MagneticButton href={service.ctaPrimary.href}>
                    {service.ctaPrimary.label} {ctaIcon(service.ctaPrimary.kind)}
                  </MagneticButton>
                  {service.ctaPrimary.meta && (
                    <span className="cta-meta">{service.ctaPrimary.meta}</span>
                  )}
                </div>
              ) : (
                <MagneticButton href="#book">
                  {c.heroCta} <ArrowIcon />
                </MagneticButton>
              )}
              {service.ctaSecondary ? (
                <div className="cta-stack">
                  <MagneticButton href={service.ctaSecondary.href} variant="ghost">
                    {service.ctaSecondary.label} {ctaIcon(service.ctaSecondary.kind)}
                  </MagneticButton>
                  {service.ctaSecondary.meta && (
                    <span className="cta-meta">{service.ctaSecondary.meta}</span>
                  )}
                </div>
              ) : (
                <MagneticButton href={href("#included", locale)} variant="ghost">
                  {c.heroSecondary}
                </MagneticButton>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 1b. Hero marketing image (optional) */}
      {heroImage && (
        <section className="case-hero-image">
          <div className="container">
            <FadeUp>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(heroImage)}
                alt={service.title}
                className="case-hero-image__img"
                loading="eager"
              />
            </FadeUp>
          </div>
        </section>
      )}

      {/* 1c. Trust strip — big numbers band, optional */}
      {service.trustStrip && (
        <section className="trust-strip-section">
          <div className="container">
            <FadeUp>
              <div className="trust-strip">
                {service.trustStrip.map((s, i) => (
                  <div key={i} className="trust-strip__cell">
                    <div className="trust-strip__value">{s.value}</div>
                    <div className="trust-strip__label">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* 2. Problem */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{c.problemEyebrow}</p>
                <h2>{c.problemHeading}</h2>
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

      {/* 2b. Lead magnet — Telegram-driven guide download */}
      {service.leadMagnet && (
        <section className="section section--surface lead-magnet-section">
          <div className="container">
            <FadeUp>
              <div className="lead-magnet">
                <div className="lead-magnet__copy">
                  <span className="lead-magnet__badge">
                    <GiftIcon size={16} />
                    {service.leadMagnet.badge}
                  </span>
                  <h2 className="lead-magnet__heading">{service.leadMagnet.heading}</h2>
                  <p className="lead-magnet__desc">{service.leadMagnet.description}</p>
                  <ul className="lead-magnet__bullets">
                    {service.leadMagnet.bullets.map((b) => (
                      <li key={b}>
                        <span className="lead-magnet__bullet-icon"><CheckIcon size={16} /></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lead-magnet__action">
                  <MagneticButton href={service.leadMagnet.ctaHref} variant="on-forest">
                    {service.leadMagnet.ctaLabel} <TelegramIcon size={16} />
                  </MagneticButton>
                  <p className="lead-magnet__footnote">{service.leadMagnet.footnote}</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* 3. Guide (forest) */}
      <section className="section section--forest">
        <div className="container">
          <FadeUp>
            <div className="guide-section">
              <div className="guide-card">
                <p className="eyebrow">{c.guideGet}</p>
                <p className="guide-text">&ldquo;{service.guide.empathy}&rdquo;</p>
              </div>
              <div className="guide-card">
                <p className="eyebrow">{c.guideTrackRecord}</p>
                <p className="guide-text">{service.guide.authority}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4. Plan */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{c.howItWorksEyebrow}</p>
                <h2>{c.howItWorksHeading}</h2>
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

      {/* 5. What's included */}
      <section className="section section--surface" id="included">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{c.deliverablesEyebrow}</p>
                <h2>{c.deliverablesHeading}</h2>
              </div>
              <div className="section-header__right">
                <p>
                  Concrete deliverables. Each item below ships as part of the
                  initial engagement, not as a future upsell.
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="checklist">
              {service.included.map((item) => (
                <div key={item} className="checklist__item">
                  <span className="checklist__icon">
                    <CheckIcon size={20} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 6. Results / outcomes — feature grid */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{c.resultsEyebrow}</p>
                <h2>{c.resultsHeading}</h2>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="features">
              {service.outcomes.map((outcome, i) => (
                <div key={outcome} className="feature">
                  <div className="feature__idx">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="feature__title">{outcome}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 6b. Metrics table — optional, only on long-form case landings */}
      {service.metrics && (
        <section className="section section--surface">
          <div className="container">
            <FadeUp>
              <div className="section-header">
                <div className="section-header__left">
                  <p className="eyebrow">{service.metrics.eyebrow}</p>
                  <h2>{service.metrics.heading}</h2>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="kpi-table" role="table">
                <div className="kpi-table__row kpi-table__row--head" role="row">
                  <span role="columnheader">{service.metrics.columns.metric}</span>
                  <span role="columnheader">{service.metrics.columns.before}</span>
                  <span role="columnheader">{service.metrics.columns.after}</span>
                  <span role="columnheader">{service.metrics.columns.change}</span>
                </div>
                {service.metrics.rows.map((row) => (
                  <div key={row.metric} className="kpi-table__row" role="row">
                    <span className="kpi-table__metric" role="cell">
                      <span className="kpi-table__label">{service.metrics!.columns.metric}</span>
                      {row.metric}
                    </span>
                    <span className="kpi-table__before" role="cell">
                      <span className="kpi-table__label">{service.metrics!.columns.before}</span>
                      {row.before}
                    </span>
                    <span className="kpi-table__after" role="cell">
                      <span className="kpi-table__label">{service.metrics!.columns.after}</span>
                      {row.after}
                    </span>
                    <span className="kpi-table__change" role="cell">
                      <span className="kpi-table__label">{service.metrics!.columns.change}</span>
                      {row.change}
                    </span>
                  </div>
                ))}
              </div>
              <p className="kpi-table__source">{service.metrics.source}</p>
            </FadeUp>
          </div>
        </section>
      )}

      {/* 6c. Guarantees / security guardrails — optional */}
      {service.guarantees && (
        <section className="section section--paper">
          <div className="container">
            <FadeUp>
              <div className="section-header">
                <div className="section-header__left">
                  <p className="eyebrow">{service.guarantees.eyebrow}</p>
                  <h2>{service.guarantees.heading}</h2>
                </div>
              </div>
            </FadeUp>
            <div className="guarantees">
              {service.guarantees.items.map((g, i) => (
                <FadeUp key={g.title} delay={i * 60}>
                  <div className="guarantee">
                    <div className="guarantee__idx">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="guarantee__title">{g.title}</h3>
                      <p className="guarantee__desc">{g.description}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Stakes (ink) */}
      <section className="section section--ink">
        <div className="container container--narrow">
          <FadeUp>
            <div className="stakes-section">
              <p className="eyebrow">{c.stakesEyebrow}</p>
              <h2 style={{ marginTop: "1rem" }}>{service.stakes}</h2>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 8. Social proof */}
      {service.socialProof && (
        <section className="section section--paper">
          <div className="container">
            <FadeUp>
              <div className="social-proof">
                <p className="eyebrow">{c.socialProofEyebrow}</p>
                <p className="social-proof__quote">
                  &ldquo;{service.socialProof.result}&rdquo;
                </p>
                <p className="social-proof__company">
                  — {service.socialProof.company}
                </p>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* 9. CTA banner (forest) */}
      <section className="section section--forest" id="book">
        <div className="container">
          <FadeUp>
            <div className="magnet__gift" style={{ margin: "0 auto 1.5rem" }}>
              <span className="magnet__giftIcon">
                <GiftIcon size={18} />
              </span>
              <span>{service.finalCta?.badge ?? c.bookFreeGiftLabel}</span>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="banner">
              <h2>{service.finalCta?.heading ?? c.bookFreeHeading}</h2>
              <p style={{ color: "rgba(243,234,216,0.78)" }}>
                {service.finalCta?.subtitle ?? c.bookFreeSubtitle}
              </p>
              {service.finalCta ? (
                <div className="final-cta-row">
                  <div className="cta-stack cta-stack--center">
                    <MagneticButton href={service.finalCta.primary.href} variant="on-forest">
                      {service.finalCta.primary.label} {ctaIcon(service.finalCta.primary.kind)}
                    </MagneticButton>
                    {service.finalCta.primary.meta && (
                      <span className="cta-meta cta-meta--on-forest">{service.finalCta.primary.meta}</span>
                    )}
                  </div>
                  {service.finalCta.secondary && (
                    <div className="cta-stack cta-stack--center">
                      <MagneticButton href={service.finalCta.secondary.href} variant="ghost">
                        {service.finalCta.secondary.label} {ctaIcon(service.finalCta.secondary.kind)}
                      </MagneticButton>
                      {service.finalCta.secondary.meta && (
                        <span className="cta-meta cta-meta--on-forest">{service.finalCta.secondary.meta}</span>
                      )}
                    </div>
                  )}
                  {service.finalCta.tertiary && (
                    <div className="cta-stack cta-stack--center">
                      <MagneticButton href={service.finalCta.tertiary.href} variant="ghost">
                        {service.finalCta.tertiary.label} {ctaIcon(service.finalCta.tertiary.kind)}
                      </MagneticButton>
                      {service.finalCta.tertiary.meta && (
                        <span className="cta-meta cta-meta--on-forest">{service.finalCta.tertiary.meta}</span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="cta-row" style={{ justifyContent: "center" }}>
                  <MagneticButton href="#book" variant="on-forest">
                    {c.bookFreeCta} <ArrowIcon />
                  </MagneticButton>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 10. FAQ */}
      <FaqSection
        items={service.faq}
        heading={`${service.title} — ${c.faqSuffix}`}
      />

      {/* Slug-specific decoration: forces a `slug` reference so the prop is
          consumed even when ServicePage is invoked without specialization. */}
      <span data-service-slug={slug} hidden />
    </>
  );
}
