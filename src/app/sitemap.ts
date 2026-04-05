import type { MetadataRoute } from "next";
import { servicesSlugs } from "@/lib/services";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPages = [
    { url: `${base}/`, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/cases/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/terms/`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/privacy/`, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const servicePages = servicesSlugs.map((slug) => ({
    url: `${base}/services/${slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}
