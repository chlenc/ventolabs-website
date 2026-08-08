/** Cases that have their own landing page (own route under /cases/[slug]). */
export const caseLandingSlugs = [
  "content-factory",
  "supplier-agent",
  "erp-agent",
  "bankruptcy-agent",
] as const;

/**
 * Studies shown inline on /cases, without dedicated landing pages.
 *
 * Only ArbitrAI remains: it is Vento Labs' own shipped product (arbitrai.tech),
 * so its numbers are ours to measure and to stand behind. The three named
 * "client" studies that used to live here (Zigmund Online, NoConcept, ASG
 * Compute) were illustrative from the start — see the commit that introduced
 * them — and were removed rather than presented as engagements we can source.
 */
export const caseStudySlugs = ["arbitrai"] as const;

/** Slugs that have their own route. Only landings do. */
export const caseSlugs = caseLandingSlugs;

export type CaseLandingSlug = (typeof caseLandingSlugs)[number];
export type CaseStudySlug = (typeof caseStudySlugs)[number];
export type CaseSlug = (typeof caseSlugs)[number];

export function isLandingSlug(slug: string): slug is CaseLandingSlug {
  return (caseLandingSlugs as readonly string[]).includes(slug);
}

/**
 * Service pages each case landing should point at. Slugs are structure, not
 * copy, so they live here — the visible labels come from
 * `dict.services_pages[slug]` and translate for free.
 *
 * Both directions matter: the guides already link into these landings (see
 * RELATED_GUIDES in blog.ts), and the landings had no outbound path into the
 * services that actually deliver them.
 */
export const caseRelatedServices: Record<string, readonly string[]> = {
  "content-factory": ["ai-automation", "ai-assistant"],
  "supplier-agent": ["ai-assistant", "ai-automation"],
};
