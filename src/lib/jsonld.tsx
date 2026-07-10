import { site } from "./site";
import { getDictionary, localizedPath, type Locale } from "./i18n";

/**
 * JSON-LD builders for page-level structured data. The sitewide
 * ProfessionalService/Organization node lives in app/layout.tsx; everything
 * here references it via `@id` so search/answer engines see one entity.
 */

const ORG_ID = `${site.url}/#organization`;

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
}: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${localizedPath(path, locale)}`,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
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
 * - bankruptcy-agent renders its own complete JSON-LD inline — emitting the
 *   generic set again would duplicate FAQPage/Service/BreadcrumbList.
 * - erp-agent renders bespoke (Russian) page copy, so the dictionary FAQ
 *   text is not visible on the page — a FAQPage schema over invisible
 *   content violates Google's structured-data guidelines.
 */
const BESPOKE_CASE_JSONLD: Record<string, "skip" | "breadcrumb-only"> = {
  "bankruptcy-agent": "skip",
  "erp-agent": "breadcrumb-only",
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
  if (bespoke === "breadcrumb-only") return [breadcrumb];

  const data: object[] = [
    serviceJsonLd({
      name: svc.title,
      description: svc.seo.description,
      path: `${basePath}/${slug}`,
      locale,
    }),
    breadcrumb,
  ];
  if (svc.faq?.length) data.push(faqPageJsonLd(svc.faq));
  return data;
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}
