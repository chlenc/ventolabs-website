"use client";

import { FadeUp, ArrowIcon } from "@/components/Primitives";
import { useLocale } from "@/components/LocaleProvider";
import { localeNames } from "@/lib/i18n";
import { asset, href, breadcrumbHomeLabels } from "@/lib/utils";
import { blogIndex, blogIndexCopy, hasFullBody } from "@/lib/blog";
import { cardImage } from "./covers";

/** "16 июля 2026" / "16 July 2026" — locale-aware, no dependency. */
function formatDate(iso: string, locale: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function BlogIndexPage() {
  const locale = useLocale();
  const copy = blogIndexCopy[locale];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <a href={href("/", locale)}>{breadcrumbHomeLabels[locale]}</a>
            <span className="breadcrumbs__sep">/</span>
            <span className="breadcrumbs__current">{copy.eyebrow}</span>
          </div>
          <FadeUp>
            <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
              {copy.eyebrow}
            </p>
            <h1 className="page-hero__title">{copy.heading}</h1>
            <p className="page-hero__lede">{copy.lede}</p>
          </FadeUp>
        </div>
      </section>

      <section className="section section--paper" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="post-cards">
            {blogIndex.map((entry, i) => {
              const card = entry.card[locale];
              // The badge warns that the guide opens in another language, so
              // it keys off whether *this* locale ships a body — not off the
              // original language. The one translated guide has a body in all
              // four and must never be flagged.
              const foreign = !hasFullBody(entry, locale);
              return (
                <FadeUp key={entry.slug}>
                  <a className="post-card" href={href(`/blog/${entry.slug}`, locale)}>
                    <div className="post-card__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(cardImage[entry.slug])}
                        alt={card.imageAlt}
                        width={900}
                        height={502}
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                    </div>
                    <div className="post-card__meta">
                      <span>{card.eyebrow}</span>
                      <span className="post-card__dot">·</span>
                      <time dateTime={entry.datePublished}>
                        {formatDate(entry.datePublished, locale)}
                      </time>
                      <span className="post-card__dot">·</span>
                      <span>{entry.readingMinutes} min</span>
                      {foreign && (
                        <span className="post-card__lang">{localeNames[entry.articleLocale]}</span>
                      )}
                    </div>
                    <h2 className="post-card__title">{card.title}</h2>
                    <p className="post-card__summary">{card.summary}</p>
                    <span className="post-card__cta">
                      {card.readLabel} <ArrowIcon />
                    </span>
                  </a>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
