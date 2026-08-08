"use client";

import { FadeUp, ArrowIcon } from "./Primitives";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { getBlogEntry, isBlogSlug } from "@/lib/blog";
import { href } from "@/lib/utils";

/**
 * "Where to go next" — the four service pages were reachable only from the
 * nav and footer and pointed at nothing but the booking form, so each one was
 * a dead end for both crawlers and readers. This block gives every service
 * page outbound links to its sibling services, the case landings that show
 * the same work shipped, /data-centers where the infrastructure question is
 * real, and a guide.
 *
 * Titles and summaries are pulled from the dictionary entries the targets
 * already own — nothing here needs translating twice.
 */
type LinkRef =
  | { kind: "service"; slug: string }
  | { kind: "case"; slug: string }
  | { kind: "blog"; slug: string }
  | { kind: "datacenters" };

const SERVICE_LINKS: Record<string, LinkRef[]> = {
  "ai-assistant": [
    { kind: "service", slug: "ai-automation" },
    { kind: "service", slug: "ai-training" },
    { kind: "case", slug: "supplier-agent" },
    { kind: "datacenters" },
  ],
  "ai-automation": [
    { kind: "service", slug: "ai-assistant" },
    { kind: "service", slug: "ai-workspace" },
    { kind: "case", slug: "supplier-agent" },
    { kind: "case", slug: "content-factory" },
  ],
  "ai-training": [
    { kind: "service", slug: "ai-assistant" },
    { kind: "service", slug: "ai-automation" },
    { kind: "service", slug: "ai-workspace" },
    { kind: "case", slug: "erp-agent" },
    { kind: "blog", slug: "instrumenty-1c-claude-code-codex" },
  ],
  "ai-workspace": [
    { kind: "service", slug: "ai-assistant" },
    { kind: "service", slug: "ai-automation" },
    { kind: "service", slug: "ai-training" },
    { kind: "datacenters" },
    { kind: "blog", slug: "autonomous-ai-accountability" },
  ],
};

export function ServiceCrossLinks({ slug }: { slug: string }) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const c = dict.servicesCommon;
  const refs = SERVICE_LINKS[slug];
  if (!refs?.length) return null;

  const cards = refs
    .map((ref) => {
      if (ref.kind === "datacenters") {
        return {
          key: "datacenters",
          href: href("/data-centers", locale),
          title: dict.dataCenters.navLabel,
          summary: dict.dataCenters.cardSummary,
        };
      }
      if (ref.kind === "blog") {
        if (!isBlogSlug(ref.slug)) return null;
        const card = getBlogEntry(ref.slug).card[locale];
        return {
          key: `blog-${ref.slug}`,
          href: href(`/blog/${ref.slug}`, locale),
          title: card.title,
          summary: card.summary,
        };
      }
      const entry =
        ref.kind === "service" ? dict.services_pages[ref.slug] : dict.case_pages[ref.slug];
      if (!entry) return null;
      return {
        key: `${ref.kind}-${ref.slug}`,
        href: href(`/${ref.kind === "service" ? "services" : "cases"}/${ref.slug}`, locale),
        title: entry.title,
        summary: entry.cardSummary,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (!cards.length) return null;

  return (
    <section className="section section--surface">
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-header__left">
              <p className="eyebrow">{c.nextEyebrow}</p>
              <h2>{c.nextHeading}</h2>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={80}>
          <div className="svc-next">
            {cards.map((card) => (
              <a key={card.key} className="svc-next__card" href={card.href}>
                <h3 className="svc-next__title">{card.title}</h3>
                <p className="svc-next__summary">{card.summary}</p>
                <span className="svc-next__cta">
                  {c.nextCta} <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
