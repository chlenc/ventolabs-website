import type { MetadataRoute } from "next";
import { servicesSlugs } from "@/lib/services";
import { site } from "@/lib/site";
import { locales, localizedPath } from "@/lib/i18n";

export const dynamic = "force-static";

type Priority = number;
type ChangeFreq = "weekly" | "monthly" | "yearly";

const pages: { path: string; priority: Priority; changeFrequency: ChangeFreq }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/cases", priority: 0.7, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ...servicesSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => {
      const url = `${site.url}${localizedPath(path, locale)}`.replace(/\/?$/, "/");
      return {
        url,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${site.url}${localizedPath(path, l)}`.replace(/\/?$/, "/"),
            ]),
          ),
        },
      };
    }),
  );
}
