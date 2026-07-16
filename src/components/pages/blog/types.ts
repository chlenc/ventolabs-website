/**
 * Block model for long-form guides.
 *
 * Deliberately small: an article is prose, lists, tables, code and callouts —
 * not a CMS. Inline text supports the same markdown subset the legal pages use
 * (`**bold**`, `[label](href)`) plus `` `code` ``; see `renderInline` in
 * `BlogArticlePage.tsx`.
 */

import type { Locale } from "@/lib/i18n";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string; id?: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  /** `head` labels the columns; every row must have the same arity. */
  | { kind: "table"; head: string[]; rows: string[][]; note?: string }
  | { kind: "code"; caption?: string; code: string }
  | { kind: "note"; title?: string; text: string };

/** A top-level `<h2>` section. `id` is its anchor and its table-of-contents key. */
export type Section = {
  id: string;
  title: string;
  /** Short label for the table of contents. Falls back to `title`. */
  tocLabel?: string;
  blocks: Block[];
};

export type Faq = { q: string; a: string };

/**
 * What a locale that is *not* the article's language gets: a real summary of
 * the guide plus a link to the original. Never the translated body — and never
 * the original body under a foreign-language URL.
 */
export type Stub = {
  eyebrow: string;
  h1: string;
  paragraphs: string[];
  ctaPrimary: string;
  ctaSecondary: string;
};

export type Article = {
  eyebrow: string;
  h1: string;
  lede: string;
  /** Byline + freshness strip under the lede. Values are pre-formatted in the
   *  article's own language — the full body only ever renders in that locale. */
  meta: {
    author: string;
    authorRole: string;
    dateLabel: string;
    dateValue: string;
    readingLabel: string;
    readingValue: string;
  };
  tldrTitle: string;
  tldr: string[];
  tocTitle: string;
  sections: Section[];
  faqTitle: string;
  faqLede: string;
  faq: Faq[];
  cta: {
    eyebrow: string;
    title: string;
    text: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  /** Keyed by every locale except the one the article is written in. */
  stubs: Partial<Record<Locale, Stub>>;
};
