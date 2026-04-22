import type { Metadata } from "next";
import { getDictionary, locales, localizedPath, openGraphLocales, type Locale } from "./i18n";
import { site } from "./site";
import type { ServiceSlug } from "./services";

type PageKind = "home" | "cases" | "privacy" | "terms" | "service" | "case";

type Args = {
  locale: Locale;
  /** Path WITHOUT locale prefix (e.g. "/cases", "/services/ai-assistant"). */
  path: string;
  kind: PageKind;
  serviceSlug?: string;
  caseSlug?: string;
};

/**
 * Build metadata for a page with correct hreflang alternates across locales
 * and a locale-specific title/description pulled from the dictionary.
 *
 * Canonical URL is the current-locale URL. `alternates.languages` points at
 * the equivalent page in every supported locale plus `x-default` (English).
 */
export function buildPageMetadata({ locale, path, kind, serviceSlug, caseSlug }: Args): Metadata {
  const dict = getDictionary(locale);
  const url = `${site.url}${localizedPath(path, locale)}`;

  let title = dict.seo.homeTitle;
  let description = dict.seo.homeDescription;

  if (kind === "cases") {
    title = dict.seo.casesTitle;
    description = dict.seo.casesDescription;
  } else if (kind === "privacy") {
    title = dict.seo.privacyTitle;
    description = dict.seo.privacyDescription;
  } else if (kind === "terms") {
    title = dict.seo.termsTitle;
    description = dict.seo.termsDescription;
  } else if (kind === "service" && serviceSlug) {
    const svc = dict.services_pages[serviceSlug as ServiceSlug];
    if (svc) {
      title = svc.seo.title;
      description = svc.seo.description;
    }
  } else if (kind === "case" && caseSlug) {
    const cs = dict.case_pages[caseSlug];
    if (cs) {
      title = cs.seo.title;
      description = cs.seo.description;
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${site.url}${localizedPath(path, l)}`]),
        ),
        "x-default": `${site.url}${localizedPath(path, "en")}`,
      },
    },
    openGraph: {
      type: "website",
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => openGraphLocales[l]),
      siteName: site.name,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
