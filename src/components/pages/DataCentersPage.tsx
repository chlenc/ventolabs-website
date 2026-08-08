"use client";

import { FadeUp, MagneticButton, ArrowIcon, CheckIcon, PhoneIcon } from "@/components/Primitives";
import { FaqSection } from "@/components/FaqSection";
import { LeadForm } from "@/components/LeadForm";
import { useLocale } from "@/components/LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import type { DataCenterProjectId, DataCenterShotId } from "@/lib/i18n/types";
import { site } from "@/lib/site";
import { asset, breadcrumbHomeLabels, href } from "@/lib/utils";

/* Photos live here rather than in the dictionaries so translators never touch
 * image paths — the copy keys carry only alt text and captions. */
const projectImage: Record<DataCenterProjectId, string> = {
  "east-texas": "/images/dc/site-texas-aerial.jpg",
  "west-texas": "/images/dc/transformer-yard.jpg",
  midwest: "/images/dc/modular-rows.jpg",
  stockholm: "/images/dc/building-conversion.jpg",
};

const shotImage: Record<DataCenterShotId, string> = {
  substation: "/images/dc/substation-138kv.jpg",
  transmission: "/images/dc/transmission-tower.jpg",
  switchgear: "/images/dc/switchgear-room.jpg",
  modular: "/images/dc/modular-deployment.jpg",
  parcel: "/images/dc/site-parcel-plan.jpg",
};

export function DataCentersPage() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const t = dict.dataCenters;

  return (
    <>
      {/* 1. Hero */}
      <section className="page-hero">
        <div className="container">
          <FadeUp>
            <div className="breadcrumbs">
              <a href={href("/", locale)}>{breadcrumbHomeLabels[locale]}</a>
              <span className="breadcrumbs__sep">/</span>
              <span className="breadcrumbs__current">{t.breadcrumb}</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
              {t.hero.eyebrow}
            </p>
          </FadeUp>
          <FadeUp delay={180}>
            <h1 className="page-hero__title">{t.hero.title}</h1>
          </FadeUp>
          <FadeUp delay={260}>
            <p className="page-hero__lede">{t.hero.lede}</p>
          </FadeUp>
          <FadeUp delay={340}>
            <div className="page-hero__cta">
              <MagneticButton href="#book" variant="primary">
                {t.hero.ctaPrimary} <ArrowIcon />
              </MagneticButton>
              <MagneticButton href="#process" variant="secondary">
                {t.hero.ctaSecondary}
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 2. Stats band */}
      <section className="dc-stats">
        <div className="container">
          <div className="dc-stats__grid">
            {t.stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 70}>
                <div className="dc-stat">
                  <div className="dc-stat__value">{s.value}</div>
                  <div className="dc-stat__label">{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Investment models */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{t.investor.eyebrow}</p>
                <h2>{t.investor.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{t.investor.lead}</p>
              </div>
            </div>
          </FadeUp>
          <div className="dc-models">
            {t.investor.models.map((m, i) => (
              <FadeUp key={m.title} delay={i * 90}>
                <article className="dc-model">
                  <span className="dc-model__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{m.title}</h3>
                  <p className="dc-model__desc">{m.description}</p>
                  <ul className="dc-model__points">
                    {m.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 3b. Lead magnet — books a discovery call via the global Cal.com handler */}
      <section className="section section--surface lead-magnet-section">
        <div className="container">
          <FadeUp>
            <div className="lead-magnet">
              <div className="lead-magnet__copy">
                <span className="lead-magnet__badge">
                  <PhoneIcon size={16} />
                  {t.leadMagnet.badge}
                </span>
                <h2 className="lead-magnet__heading">{t.leadMagnet.heading}</h2>
                <p className="lead-magnet__desc">{t.leadMagnet.description}</p>
                <ul className="lead-magnet__bullets">
                  {t.leadMagnet.bullets.map((b) => (
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
                <MagneticButton href={t.leadMagnet.ctaHref} variant="primary">
                  {t.leadMagnet.ctaLabel} <PhoneIcon size={16} />
                </MagneticButton>
                <p className="lead-magnet__footnote">{t.leadMagnet.footnote}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4. Process */}
      <section className="section section--forest" id="process">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{t.process.eyebrow}</p>
                <h2>{t.process.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{t.process.lead}</p>
              </div>
            </div>
          </FadeUp>
          <ol className="dc-steps">
            {t.process.steps.map((s, i) => (
              <FadeUp key={s.title} delay={i * 60} as="li" className="dc-step">
                <span className="dc-step__num">{String(i + 1).padStart(2, "0")}</span>
                <div className="dc-step__body">
                  <h3>{s.title}</h3>
                  <p className="dc-step__desc">{s.description}</p>
                  <p className="dc-step__detail">{s.detail}</p>
                </div>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Anatomy */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{t.anatomy.eyebrow}</p>
                <h2>{t.anatomy.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{t.anatomy.lead}</p>
              </div>
            </div>
          </FadeUp>
          <div className="dc-anatomy">
            {t.anatomy.groups.map((g, i) => (
              <FadeUp key={g.title} delay={i * 80}>
                <article className="dc-anatomy__group">
                  <h3>{g.title}</h3>
                  <p className="dc-anatomy__desc">{g.description}</p>
                  <dl className="dc-anatomy__list">
                    {g.items.map((item) => (
                      <div key={item.name} className="dc-anatomy__item">
                        <dt>{item.name}</dt>
                        <dd>{item.note}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Modular vs traditional */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{t.modular.eyebrow}</p>
                <h2>{t.modular.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{t.modular.lead}</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="dc-table-wrap">
              <table className="dc-table">
                <thead>
                  <tr>
                    <th scope="col">{t.modular.columns.criterion}</th>
                    <th scope="col">{t.modular.columns.traditional}</th>
                    <th scope="col" className="dc-table__hi">
                      {t.modular.columns.modular}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.modular.rows.map((r) => (
                    <tr key={r.criterion}>
                      <th scope="row">{r.criterion}</th>
                      <td>{r.traditional}</td>
                      <td className="dc-table__hi">{r.modular}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
          <FadeUp delay={180}>
            <p className="dc-note">{t.modular.note}</p>
          </FadeUp>
        </div>
      </section>

      {/* 7. Sites and projects */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{t.projects.eyebrow}</p>
                <h2>{t.projects.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{t.projects.lead}</p>
              </div>
            </div>
          </FadeUp>
          <div className="dc-projects">
            {t.projects.items.map((p, i) => (
              <FadeUp key={p.id} delay={i * 90}>
                <article className="dc-project">
                  <div className="dc-project__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(projectImage[p.id])} alt={p.alt} loading="lazy" />
                    <span className="dc-project__status">{p.status}</span>
                  </div>
                  <div className="dc-project__body">
                    <h3>{p.title}</h3>
                    <p className="dc-project__loc">{p.location}</p>
                    <p className="dc-project__desc">{p.description}</p>
                    <div className="dc-chips">
                      {p.tags.map((tag) => (
                        <span key={tag} className="dc-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="dc-project__specsLabel">{t.projects.specsLabel}</p>
                    <dl className="dc-specs">
                      {p.specs.map((s) => (
                        <div key={s.k} className="dc-specs__row">
                          <dt>{s.k}</dt>
                          <dd>{s.v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={200}>
            <p className="dc-disclaimer">{t.projects.disclaimer}</p>
          </FadeUp>
        </div>
      </section>

      {/* 8. Photo strip */}
      <section className="section section--ink">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{t.gallery.eyebrow}</p>
                <h2>{t.gallery.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{t.gallery.lead}</p>
              </div>
            </div>
          </FadeUp>
          <div className="dc-gallery">
            {t.gallery.items.map((g, i) => (
              <FadeUp key={g.id} delay={i * 70}>
                <figure className="dc-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(shotImage[g.id])} alt={g.alt} loading="lazy" />
                  <figcaption>{g.caption}</figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Site selection criteria */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{t.siteSelection.eyebrow}</p>
                <h2>{t.siteSelection.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{t.siteSelection.lead}</p>
              </div>
            </div>
          </FadeUp>
          <ol className="dc-criteria">
            {t.siteSelection.items.map((c, i) => (
              <FadeUp key={c.title} delay={i * 70} as="li" className="dc-criterion">
                <span className="dc-criterion__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* 10. Team */}
      <section className="section section--surface">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{t.team.eyebrow}</p>
                <h2>{t.team.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{t.team.lead}</p>
              </div>
            </div>
          </FadeUp>
          <div className="dc-team">
            {t.team.items.map((item, i) => (
              <FadeUp key={item.title} delay={i * 70}>
                <article className="dc-team__item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Geographies */}
      <section className="section section--paper">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{t.geo.eyebrow}</p>
                <h2>{t.geo.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{t.geo.lead}</p>
              </div>
            </div>
          </FadeUp>
          <div className="dc-geo">
            {t.geo.items.map((g, i) => (
              <FadeUp key={g.region} delay={i * 70}>
                <div className="dc-geo__row">
                  <h3>{g.region}</h3>
                  <p>{g.note}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <FaqSection items={t.faq.items} heading={t.faq.heading} />

      {/* 13. Final CTA */}
      <section className="section section--forest" id="book">
        <div className="container">
          <FadeUp>
            <div className="banner">
              <p className="eyebrow" style={{ justifyContent: "center", marginBottom: "1.25rem" }}>
                {t.finalCta.badge}
              </p>
              <h2>{t.finalCta.heading}</h2>
              <p style={{ color: "rgba(243,234,216,0.78)" }}>{t.finalCta.subtitle}</p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <MagneticButton href="#dc-lead" variant="on-forest">
                  {t.finalCta.primary} <ArrowIcon />
                </MagneticButton>
                <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                  {t.finalCta.secondary}
                </MagneticButton>
              </div>
              <p className="dc-cta-note">{t.finalCta.note}</p>
            </div>
          </FadeUp>
          <FadeUp delay={200}>
            <div id="dc-lead" style={{ maxWidth: "640px", margin: "3rem auto 0" }}>
              <LeadForm location="data_centers_final_cta" />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
