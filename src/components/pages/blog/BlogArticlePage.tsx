"use client";

import type { ReactNode } from "react";
import { FadeUp, MagneticButton, ArrowIcon } from "@/components/Primitives";
import { useLocale } from "@/components/LocaleProvider";
import { localeNames, localizedPath } from "@/lib/i18n";
import { asset, href, breadcrumbHomeLabels } from "@/lib/utils";
import { site } from "@/lib/site";
import {
  getBlogEntry,
  blogIndexCopy,
  hasFullBody,
  relatedGuides,
  type BlogSlug,
} from "@/lib/blog";
import { getArticleBody } from "./registry";
import { cardImage, coverImage, figureImage } from "./covers";
import type { Block, Section } from "./types";

/**
 * Inline markdown subset: `**bold**`, `[label](href)` and `` `code` ``.
 * Same shape as `renderInline` in LegalContent — kept separate because guides
 * additionally need inline code, and the two are otherwise unrelated.
 */
function renderInline(text: string, locale: ReturnType<typeof useLocale>): ReactNode[] {
  const segments = text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g)
    .filter(Boolean);

  return segments.map((seg, i) => {
    if (seg.startsWith("**") && seg.endsWith("**")) {
      return <strong key={i}>{seg.slice(2, -2)}</strong>;
    }
    if (seg.startsWith("`") && seg.endsWith("`") && seg.length > 2) {
      return (
        <code key={i} className="post__ic">
          {seg.slice(1, -1)}
        </code>
      );
    }
    const link = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, url] = link;
      const external = url.startsWith("http");
      const target = external || url.startsWith("#") ? url : href(url, locale);
      return (
        <a
          key={i}
          href={target}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
        >
          {label}
        </a>
      );
    }
    return <span key={i}>{seg}</span>;
  });
}

function BlockView({ block }: { block: Block }) {
  const locale = useLocale();
  const inline = (t: string) => renderInline(t, locale);

  switch (block.kind) {
    case "p":
      return <p>{inline(block.text)}</p>;
    case "h3":
      return <h3 id={block.id}>{inline(block.text)}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="post__ol">
          {block.items.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <figure className="post__table-wrap">
          <table className="post__table">
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col">
                    {inline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.note && <figcaption className="post__table-note">{inline(block.note)}</figcaption>}
        </figure>
      );
    case "code":
      return (
        <div className="post__code">
          {block.caption && <div className="post__code-cap">{block.caption}</div>}
          <pre>
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "note":
      return (
        <aside className="post__note">
          {block.title && <p className="post__note-title">{block.title}</p>}
          <p>{inline(block.text)}</p>
        </aside>
      );
    case "figure":
      return (
        <figure className="post__figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(figureImage[block.id])}
            alt={block.alt}
            width={1200}
            height={805}
            loading="lazy"
          />
          {block.caption && <figcaption>{inline(block.caption)}</figcaption>}
        </figure>
      );
    case "flow":
      // Built in HTML rather than generated as a picture: the labels have to
      // be real text — readable, selectable, and translated with the body.
      return (
        <figure className="post__flow">
          {block.title && <figcaption className="post__flow-title">{block.title}</figcaption>}
          <ol>
            {block.stages.map((stage, i) => (
              <li
                key={i}
                className={stage.gate ? "post__flow-step post__flow-step--gate" : "post__flow-step"}
              >
                <span className="post__flow-idx">{String(i + 1).padStart(2, "0")}</span>
                <p className="post__flow-label">{stage.label}</p>
                <p className="post__flow-text">{inline(stage.text)}</p>
              </li>
            ))}
          </ol>
          {block.note && <p className="post__flow-note">{inline(block.note)}</p>}
        </figure>
      );
  }
}

function SectionView({ section, index }: { section: Section; index: number }) {
  return (
    <section className="post__section" id={section.id}>
      <h2>
        <span className="post__section-idx">{String(index + 1).padStart(2, "0")}</span>
        {section.title}
      </h2>
      {section.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </section>
  );
}

/**
 * Guide → guide rail. Rendered under every article *and* every stub: the six
 * guides used to make one cross-link between them, so /blog passed no
 * authority internally and a reader who finished one had nowhere to go but
 * the CTA.
 */
function RelatedGuides({ slug }: { slug: BlogSlug }) {
  const locale = useLocale();
  const related = relatedGuides(slug);
  if (!related.length) return null;

  return (
    <aside className="post__related" aria-labelledby="related-guides">
      <h2 id="related-guides" className="post__related-title">
        {blogIndexCopy[locale].relatedTitle}
      </h2>
      <div className="post__related-grid">
        {related.map((entry) => {
          const card = entry.card[locale];
          // Same rule as the index: flag only when this locale gets a stub.
          const foreign = !hasFullBody(entry, locale);
          return (
            <a
              key={entry.slug}
              className="post__related-card"
              href={href(`/blog/${entry.slug}`, locale)}
            >
              <span className="post__related-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(cardImage[entry.slug])}
                  alt={card.imageAlt}
                  width={900}
                  height={502}
                  loading="lazy"
                />
              </span>
              <span className="post__related-eyebrow">
                {card.eyebrow}
                {foreign && (
                  <span className="post-card__lang">{localeNames[entry.articleLocale]}</span>
                )}
              </span>
              <span className="post__related-headline">{card.title}</span>
              <span className="post__related-cta">
                {card.readLabel} <ArrowIcon />
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}

/**
 * Locales that don't ship a body get a summary + a link to the original.
 * Serving a Russian body under /blog, /de/blog or /es/blog would be a
 * title/body language mismatch — the same reason /cases/erp-agent stubs out.
 */
function ArticleStub({ slug }: { slug: BlogSlug }) {
  const locale = useLocale();
  const entry = getBlogEntry(slug);
  // Stub copy hangs off the original-language body, which is the one that
  // always exists.
  const stub = getArticleBody(slug, entry.articleLocale)?.stubs[locale];
  if (!stub) return null;

  const originalUrl = `${site.url}${localizedPath(`/blog/${slug}`, entry.articleLocale)}`;

  return (
    <section className="page-hero">
      <div className="container" style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="breadcrumbs">
          <a href={href("/", locale)}>{breadcrumbHomeLabels[locale]}</a>
          <span className="breadcrumbs__sep">/</span>
          <a href={href("/blog", locale)}>{blogIndexCopy[locale].eyebrow}</a>
          <span className="breadcrumbs__sep">/</span>
          <span className="breadcrumbs__current">{entry.card[locale].eyebrow}</span>
        </div>
        <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
          {stub.eyebrow}
        </p>
        <h1 className="page-hero__title">{stub.h1}</h1>
        {stub.paragraphs.map((p, i) => (
          <p key={i} className="page-hero__lede">
            {p}
          </p>
        ))}
        <div className="cta-row" style={{ marginTop: "2rem" }}>
          <MagneticButton href={originalUrl}>
            {stub.ctaPrimary} <ArrowIcon />
          </MagneticButton>
          <MagneticButton href={href("/blog", locale)} variant="ghost">
            {stub.ctaSecondary}
          </MagneticButton>
        </div>
        <div className="container container--narrow" style={{ padding: 0 }}>
          <RelatedGuides slug={slug} />
        </div>
      </div>
    </section>
  );
}

export function BlogArticlePage({ slug }: { slug: BlogSlug }) {
  const locale = useLocale();
  const entry = getBlogEntry(slug);
  const article = getArticleBody(slug, locale);

  if (!article) return <ArticleStub slug={slug} />;

  return (
    <article className="post">
      <header className="post__head">
        <div className="container container--narrow">
          <div className="breadcrumbs">
            <a href={href("/", locale)}>{breadcrumbHomeLabels[locale]}</a>
            <span className="breadcrumbs__sep">/</span>
            <a href={href("/blog", locale)}>{blogIndexCopy[locale].eyebrow}</a>
            <span className="breadcrumbs__sep">/</span>
            <span className="breadcrumbs__current">{article.eyebrow}</span>
          </div>
          <FadeUp>
            <h1 className="post__title">{article.h1}</h1>
            <p className="post__lede">{article.lede}</p>
            <div className="post__byline">
              <div className="post__byline-who">
                <span className="post__byline-name">{article.meta.author}</span>
                <span className="post__byline-role">{article.meta.authorRole}</span>
              </div>
              <dl className="post__byline-meta">
                <div>
                  <dt>{article.meta.dateLabel}</dt>
                  <dd>
                    <time dateTime={entry.dateModified}>{article.meta.dateValue}</time>
                  </dd>
                </div>
                <div>
                  <dt>{article.meta.readingLabel}</dt>
                  <dd>{article.meta.readingValue}</dd>
                </div>
              </dl>
            </div>
          </FadeUp>
        </div>
      </header>

      <div className="container container--narrow">
        <FadeUp>
          <figure className="post__cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(coverImage[slug])}
              alt={entry.card[locale].imageAlt}
              width={1376}
              height={768}
            />
          </figure>
        </FadeUp>
      </div>

      <div className="container container--narrow post__body">
        <FadeUp>
          <aside className="post__tldr">
            <p className="post__tldr-title">{article.tldrTitle}</p>
            <ul>
              {article.tldr.map((item, i) => (
                <li key={i}>{renderInline(item, locale)}</li>
              ))}
            </ul>
          </aside>
        </FadeUp>

        <nav className="post__toc" aria-label={article.tocTitle}>
          <p className="post__toc-title">{article.tocTitle}</p>
          <ol>
            {article.sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span className="post__toc-idx">{String(i + 1).padStart(2, "0")}</span>
                  {s.tocLabel ?? s.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq">
                <span className="post__toc-idx">
                  {String(article.sections.length + 1).padStart(2, "0")}
                </span>
                {article.faqTitle}
              </a>
            </li>
          </ol>
        </nav>

        {article.sections.map((section, i) => (
          <SectionView key={section.id} section={section} index={i} />
        ))}

        <section className="post__section" id="faq">
          <h2>
            <span className="post__section-idx">
              {String(article.sections.length + 1).padStart(2, "0")}
            </span>
            {article.faqTitle}
          </h2>
          <p>{article.faqLede}</p>
          <div className="post__faq">
            {article.faq.map((item, i) => (
              <details key={i} className="post__faq-item" {...(i === 0 ? { open: true } : {})}>
                <summary>
                  <h3>{item.q}</h3>
                </summary>
                <p>{renderInline(item.a, locale)}</p>
              </details>
            ))}
          </div>
        </section>

        <RelatedGuides slug={slug} />
      </div>

      <section className="post__cta">
        <div className="container container--narrow">
          <FadeUp>
            <p className="eyebrow">{article.cta.eyebrow}</p>
            <h2 className="post__cta-title">{article.cta.title}</h2>
            <p className="post__cta-text">{article.cta.text}</p>
            <div className="cta-row" style={{ marginTop: "2rem" }}>
              <MagneticButton href={href(article.cta.primaryHref, locale)} variant="on-forest">
                {article.cta.primaryLabel} <ArrowIcon />
              </MagneticButton>
              <MagneticButton href={href(article.cta.secondaryHref, locale)} variant="ghost">
                {article.cta.secondaryLabel}
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}
