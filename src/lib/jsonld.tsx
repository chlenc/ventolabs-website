import { site } from "./site";
import { getDictionary, localizedPath, htmlLangCodes, type Locale } from "./i18n";
import { blogIndex, blogIndexCopy, hasFullBody, type BlogEntry } from "./blog";
import { blogCoverPath } from "@/components/pages/blog/covers";
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
 * /data-centers: Service + FAQPage + BreadcrumbList. Its own builder rather
 * than a `services_pages` entry because the page has a bespoke content shape
 * (projects, gallery, comparison table) that doesn't fit ServiceDict.
 */
export function dataCentersJsonLd(locale: Locale): object[] {
  const dict = getDictionary(locale);
  const dc = dict.dataCenters;

  const data: object[] = [
    serviceJsonLd({
      name: dc.hero.title,
      description: dc.seo.description,
      path: "/data-centers",
      locale,
      serviceType: dc.hero.eyebrow,
    }),
    breadcrumbJsonLd(
      [
        { name: "Home", path: "/" },
        { name: dc.breadcrumb, path: "/data-centers" },
      ],
      locale,
    ),
  ];
  if (dc.faq.items.length) data.push(faqPageJsonLd(dc.faq.items));
  return data;
}

/**
 * External home of an inline study that is a real shipped product rather than
 * a page on this site. Keeps the ItemList honest: every entry resolves to a
 * URL that exists, instead of pointing several list items at the hub itself.
 */
const STUDY_URLS: Record<string, string> = {
  arbitrai: "https://arbitrai.tech/",
};

/**
 * /cases hub: BreadcrumbList + an ItemList covering everything the page
 * actually renders — the landing pages (as Service references to their own
 * URL) and the inline-only studies.
 *
 * The only inline study left is ArbitrAI, which Vento Labs builds and operates
 * itself, so it is emitted as a SoftwareApplication published by the
 * organization and pointed at its real product URL — not as a client
 * CreativeWork, and not at a URL that would 404.
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
      const url = STUDY_URLS[slug];
      if (!cs || !url) return null;
      return {
        "@type": "ListItem",
        position: visibleLandingSlugs.length + i + 1,
        item: {
          "@type": "SoftwareApplication",
          name: cs.title,
          applicationCategory: "BusinessApplication",
          about: cs.industry,
          description: cs.result,
          url,
          publisher: { "@id": ORG_ID },
          author: { "@id": ORG_ID },
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
  headline,
}: {
  entry: BlogEntry;
  locale: Locale;
  faq?: QA[];
  /**
   * The `<h1>` the page actually renders. Passed in by the route (which
   * already loads the body for the FAQ) rather than imported here, so this
   * module stays free of article text. Falls back to the SEO title.
   */
  headline?: string;
}): object[] {
  const path = `/blog/${entry.slug}`;
  const url = `${site.url}${localizedPath(path, locale)}`;
  const seo = entry.seo[locale];
  const isFull = hasFullBody(entry, locale);

  const posting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: headline ?? seo.title,
    description: seo.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: htmlLangCodes[locale],
    datePublished: entry.datePublished,
    dateModified: entry.dateModified,
    author: AUTHOR,
    publisher: { "@id": ORG_ID },
    // The guide's own cover first — a real, article-specific 16:9 photo — with
    // the generated OG card as the fallback crop.
    image: [`${site.url}${blogCoverPath(entry.slug)}`, `${url}opengraph-image`],
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

/**
 * Blog hub: the Blog node, an ItemList expressing the six guides as the
 * ordered collection the page actually renders, and the breadcrumb trail the
 * page shows but previously never declared.
 *
 * Blog/`blogPost` says "these posts belong to this blog"; ItemList says "this
 * page is a list, in this order" — the shape /cases already uses, and the one
 * answer engines read when deciding what a hub page enumerates.
 */
export function blogIndexJsonLd(locale: Locale): object[] {
  const url = `${site.url}${localizedPath("/blog", locale)}`;
  const copy = blogIndexCopy[locale];

  const blog = {
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

  // Card titles, not SEO titles: the ItemList describes what the page shows.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#guides`,
    name: `${copy.heading} — ${site.name}`,
    url,
    numberOfItems: blogIndex.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: blogIndex.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BlogPosting",
        "@id": `${site.url}${localizedPath(`/blog/${entry.slug}`, locale)}#article`,
        name: entry.card[locale].title,
        description: entry.card[locale].summary,
        url: `${site.url}${localizedPath(`/blog/${entry.slug}`, locale)}`,
        image: `${site.url}${blogCoverPath(entry.slug)}`,
        datePublished: entry.datePublished,
        dateModified: entry.dateModified,
        inLanguage: htmlLangCodes[entry.articleLocale],
        author: AUTHOR,
      },
    })),
  };

  const breadcrumb = breadcrumbJsonLd(
    [
      { name: breadcrumbHomeLabels[locale], path: "/" },
      { name: copy.eyebrow, path: "/blog" },
    ],
    locale,
  );

  return [blog, itemList, breadcrumb];
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
