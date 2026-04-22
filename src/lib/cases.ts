/** Cases that have their own landing page (own route under /cases/[slug]). */
export const caseLandingSlugs = [
  "content-factory",
  "supplier-agent",
  "erp-agent",
] as const;

/** Client case studies shown inline on /cases, without dedicated landing pages. */
export const caseStudySlugs = ["zigmund", "noconcept", "asgcompute"] as const;

/** Slugs that have their own route. Only landings do. */
export const caseSlugs = caseLandingSlugs;

export type CaseLandingSlug = (typeof caseLandingSlugs)[number];
export type CaseStudySlug = (typeof caseStudySlugs)[number];
export type CaseSlug = (typeof caseSlugs)[number];

export function isLandingSlug(slug: string): slug is CaseLandingSlug {
  return (caseLandingSlugs as readonly string[]).includes(slug);
}
