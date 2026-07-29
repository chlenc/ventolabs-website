import type { MetadataRoute } from "next";
import { servicesSlugs } from "@/lib/services";
import { caseLandingSlugs } from "@/lib/cases";
import { blogSlugs, getBlogEntry } from "@/lib/blog";
import { site } from "@/lib/site";
import { locales, localizedPath, type Locale } from "@/lib/i18n";

export const dynamic = "force-static";

type Priority = number;
type ChangeFreq = "weekly" | "monthly" | "yearly";

type SitemapPage = {
  path: string;
  priority: Priority;
  changeFrequency: ChangeFreq;
  /**
   * If set, the page is only emitted for these locales (and hreflang
   * alternates are limited to them too). Use for region-locked pages
   * like /cases/bankruptcy-agent which targets RU trustees only.
   */
  locales?: readonly Locale[];
  /** ISO date string — feeds the sitemap's <lastmod>. Omitted where we don't
   * actually track a per-page edit date (fabricating one would be a false
   * freshness signal). */
  lastModified?: string;
};

// Note: /cases/bankruptcy-agent targets RU trustees, but its EN/DE/ES copies
// are live and indexable, so the sitemap lists every locale — a RU-only
// sitemap entry would contradict the pages' own hreflang annotations.
const caseSitemapEntries: SitemapPage[] = caseLandingSlugs.map((slug) => ({
  path: `/cases/${slug}`,
  priority: 0.85,
  changeFrequency: "monthly" as const,
}));

// Guides are written in one language and stubbed in the others (see
// `src/lib/blog.ts`), but every locale's URL is live and self-canonical, so
// each one belongs in the sitemap — same reasoning as the case landings above.
const blogSitemapEntries: SitemapPage[] = blogSlugs.map((slug) => ({
  path: `/blog/${slug}`,
  priority: 0.9,
  changeFrequency: "monthly" as const,
  lastModified: getBlogEntry(slug).dateModified,
}));

const pages: SitemapPage[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/cases", priority: 0.7, changeFrequency: "monthly" },
  ...caseSitemapEntries,
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  ...blogSitemapEntries,
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ...servicesSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency, locales: pageLocales, lastModified }) => {
    const targetLocales = pageLocales ?? locales;
    return targetLocales.map((locale) => {
      const url = `${site.url}${localizedPath(path, locale)}`.replace(/\/?$/, "/");
      return {
        url,
        changeFrequency,
        priority,
        ...(lastModified ? { lastModified } : {}),
        alternates: {
          languages: {
            ...Object.fromEntries(
              targetLocales.map((l) => [
                l,
                `${site.url}${localizedPath(path, l)}`.replace(/\/?$/, "/"),
              ]),
            ),
            "x-default": `${site.url}${localizedPath(path, "en")}`.replace(/\/?$/, "/"),
          },
        },
      };
    });
  });
}
