import type { MetadataRoute } from "next";
import { servicesSlugs } from "@/lib/services";
import { caseLandingSlugs } from "@/lib/cases";
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
};

const RU_ONLY_CASE_SLUGS: readonly string[] = ["bankruptcy-agent"];

const caseSitemapEntries: SitemapPage[] = caseLandingSlugs.map((slug) => ({
  path: `/cases/${slug}`,
  priority: 0.85,
  changeFrequency: "monthly" as const,
  locales: RU_ONLY_CASE_SLUGS.includes(slug) ? (["ru"] as const) : undefined,
}));

const pages: SitemapPage[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/cases", priority: 0.7, changeFrequency: "monthly" },
  ...caseSitemapEntries,
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ...servicesSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency, locales: pageLocales }) => {
    const targetLocales = pageLocales ?? locales;
    return targetLocales.map((locale) => {
      const url = `${site.url}${localizedPath(path, locale)}`.replace(/\/?$/, "/");
      return {
        url,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            targetLocales.map((l) => [
              l,
              `${site.url}${localizedPath(path, l)}`.replace(/\/?$/, "/"),
            ]),
          ),
        },
      };
    });
  });
}
