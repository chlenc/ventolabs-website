export const servicesSlugs = [
  "ai-assistant",
  "ai-automation",
  // Russian-market offer: the dashboard + storefront + agent bundle. The slug
  // is the Russian transliteration on purpose — same convention the guides
  // already use, since the page is written for that audience first.
  "sistema-ucheta",
  "ai-training",
  "ai-workspace",
  "seo-geo-audit",
] as const;

export type ServiceSlug = (typeof servicesSlugs)[number];
