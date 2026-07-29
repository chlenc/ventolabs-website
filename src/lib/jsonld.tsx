import { site } from "./site";
import { getDictionary, localizedPath, htmlLangCodes, type Locale } from "./i18n";
import { blogIndex, blogIndexCopy, hasFullBody, type BlogEntry } from "./blog";
import { breadcrumbHomeLabels } from "./utils";
import { caseLandingSlugs, caseStudySlugs } from "./cases";

/**
 * JSON-LD builders for page-level structured data. The sitewide
 * ProfessionalService/Organization node lives in app/layout.tsx; everything
 * here references it via `@id` so search/answer engines see one entity.
 */

export const ORG_ID = `${site.url}/#organization`;

/**
 * Safe to embed in a <script type="application/ld+json"> via
 * dangerouslySetInnerHTML: JSON.stringify alone does not escape "<", so a
 * value containing the literal substring "</script>" would prematurely
 * close the tag and corrupt both the JSON-LD and the surrounding page HTML.
 */
export function jsonLdString(obj: object): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

type QA = { q: string; a: string };

export function faqPageJsonLd(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  locale,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  /** Short category label (e.g. dict's `kicker`) — omitted if not given. */
  serviceType?: string;
}) {
  const url = `${site.url}${localizedPath(path, locale)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    // Same per-slug OG image route every other builder in this file uses
    // (see blogPostingJsonLd) — real, already-generated, no extra asset.
    image: `${url}opengraph-image`,
    provider: { "@id": ORG_ID },
    ...(serviceType ? { serviceType } : {}),
    areaServed: { "@type": "Place", name: "Worldwide" },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${localizedPath(item.path, locale)}`,
    })),
  };
}

/**
 * Bespoke case landings need special handling:
 * - bankruptcy-agent renders its own complete JSON-LD inline (see
 *   BankruptcyAgentPage.tsx) — emitting the generic set again would
 *   duplicate FAQPage/Service/BreadcrumbList.
 * - erp-agent renders bespoke (Russian) page copy, so the dictionary FAQ
 *   text is not visible on the page — a FAQPage schema over invisible
 *   content violates Google's structured-data guidelines. It still gets a
 *   real Service + BreadcrumbList, just no FAQPage.
 */
const BESPOKE_CASE_JSONLD: Record<string, "skip" | "no-faq"> = {
  "bankruptcy-agent": "skip",
  "erp-agent": "no-faq",
};

/**
 * Full structured-data set for a service or case landing:
 * Service + FAQPage + BreadcrumbList, localized.
 */
export function servicePageJsonLd({
  slug,
  locale,
  kind,
}: {
  slug: string;
  locale: Locale;
  kind: "service" | "case";
}): object[] {
  const dict = getDictionary(locale);
  const svc = kind === "service" ? dict.services_pages[slug] : dict.case_pages[slug];
  if (!svc) return [];
  const basePath = kind === "service" ? "/services" : "/cases";
  const bespoke = kind === "case" ? BESPOKE_CASE_JSONLD[slug] : undefined;
  if (bespoke === "skip") return [];

  // Services have no hub page, so their trail is Home → page; cases include
  // the /cases hub with its localized label.
  const trail =
    kind === "case"
      ? [
          { name: "Home", path: "/" },
          { name: dict.casesIntro.eyebrow, path: "/cases" },
          { name: svc.title, path: `${basePath}/${slug}` },
        ]
      : [
          { name: "Home", path: "/" },
          { name: svc.title, path: `${basePath}/${slug}` },
        ];
  const breadcrumb = breadcrumbJsonLd(trail, locale);

  const data: object[] = [
    serviceJsonLd({
      name: svc.title,
      description: svc.seo.description,
      path: `${basePath}/${slug}`,
      locale,
      serviceType: svc.kicker,
    }),
    breadcrumb,
  ];
  if (bespoke !== "no-faq" && svc.faq?.length) data.push(faqPageJsonLd(svc.faq));
  return data;
}

/**
 * /cases hub: BreadcrumbList + an ItemList covering all 8 cases — the 4
 * landing pages (as Service references to their own URL) and the 4
 * inline-only client studies (zigmund, noconcept, asgcompute, arbitrai),
 * which have no dedicated route and previously had zero structured-data
 * footprint anywhere on the site.
 */
export function casesHubJsonLd(locale: Locale): object[] {
  const dict = getDictionary(locale);
  const hubUrl = `${site.url}${localizedPath("/cases", locale)}`;

  const breadcrumb = breadcrumbJsonLd(
    [
      { name: breadcrumbHomeLabels[locale], path: "/" },
      { name: dict.casesIntro.eyebrow, path: "/cases" },
    ],
    locale,
  );

  // bankruptcy-agent's card is hidden on the hub page itself for non-ru
  // locales (see the matching filter in CasesContent.tsx) -- mirror that
  // here so the JSON-LD never lists something the page doesn't show.
  const visibleLandingSlugs = caseLandingSlugs.filter(
    (slug) => locale === "ru" || slug !== "bankruptcy-agent",
  );
  const landingItems = visibleLandingSlugs.map((slug, i) => {
    const cp = dict.case_pages[slug];
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: cp?.title ?? slug,
        url: `${site.url}${localizedPath(`/cases/${slug}`, locale)}`,
      },
    };
  });

  const studyItems = caseStudySlugs
    .map((slug, i) => {
      const cs = dict.cases.records[slug];
      if (!cs) return null;
      return {
        "@type": "ListItem",
        position: visibleLandingSlugs.length + i + 1,
        item: {
          "@type": "CreativeWork",
          name: cs.title,
          about: cs.industry,
          description: cs.result,
          url: hubUrl,
        },
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} — ${dict.casesIntro.eyebrow}`,
    url: hubUrl,
    itemListElement: [...landingItems, ...studyItems],
  };

  return [breadcrumb, itemList];
}

const AUTHOR = {
  "@type": "Person",
  "@id": `${site.url}/#alexey-nagorny`,
  name: "Alexey Nagorny",
  jobTitle: "Founder & Lead Engineer",
  worksFor: { "@id": ORG_ID },
  sameAs: [site.linkedin],
};

/**
 * BlogPosting for a guide, plus its breadcrumb trail and (if the guide ships
 * a FAQ that is actually rendered) a FAQPage.
 *
 * `entry.bodyLocales` says which locales ship a body: the stub locales get the
 * same BlogPosting shape but with `inLanguage` set to the stub's language and
 * no FAQ, since the stub renders neither the FAQ nor the article text.
 */
export function blogPostingJsonLd({
  entry,
  locale,
  faq,
}: {
  entry: BlogEntry;
  locale: Locale;
  faq?: QA[];
}): object[] {
  const path = `/blog/${entry.slug}`;
  const url = `${site.url}${localizedPath(path, locale)}`;
  const seo = entry.seo[locale];
  const isFull = hasFullBody(entry, locale);

  const posting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: seo.title,
    description: seo.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: htmlLangCodes[locale],
    datePublished: entry.datePublished,
    dateModified: entry.dateModified,
    author: AUTHOR,
    publisher: { "@id": ORG_ID },
    image: `${url}opengraph-image`,
    keywords: entry.keywords.join(", "),
    // Stubs summarise the original rather than translate it — say so, so the
    // three short pages are never mistaken for duplicates of the guide.
    ...(isFull
      ? { articleSection: "Engineering", timeRequired: `PT${entry.readingMinutes}M` }
      : { isBasedOn: `${site.url}${localizedPath(path, entry.articleLocale)}` }),
  };

  const data: object[] = [
    posting,
    breadcrumbJsonLd(
      [
        { name: breadcrumbHomeLabels[locale], path: "/" },
        { name: blogIndexCopy[locale].eyebrow, path: "/blog" },
        { name: entry.card[locale].title, path },
      ],
      locale,
    ),
  ];
  if (isFull && faq?.length) data.push(faqPageJsonLd(faq));
  return data;
}

/** Blog hub: a Blog node listing every guide, newest first. */
export function blogIndexJsonLd(locale: Locale): object {
  const url = `${site.url}${localizedPath("/blog", locale)}`;
  const copy = blogIndexCopy[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: `${copy.heading} — ${site.name}`,
    description: copy.metaDescription,
    url,
    inLanguage: htmlLangCodes[locale],
    publisher: { "@id": ORG_ID },
    blogPost: blogIndex.map((entry) => ({
      "@type": "BlogPosting",
      "@id": `${site.url}${localizedPath(`/blog/${entry.slug}`, locale)}#article`,
      headline: entry.seo[locale].title,
      datePublished: entry.datePublished,
      author: AUTHOR,
    })),
  };
}

/** Minimal WebSite node — anchors the site as an entity distinct from the
 * ProfessionalService/business entity it's published by. No on-site search,
 * so no SearchAction. */
export function webSiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": ORG_ID },
  };
}

/** Render one or more JSON-LD objects as script tags (server-safe). */
export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(obj) }}
        />
      ))}
    </>
  );
}
