"use client";

import { FadeUp, ArrowIcon } from "./Primitives";
import { useLocale } from "./LocaleProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/utils";
import type { ServiceSlug } from "@/lib/services";

const RELATED_SERVICES_LABEL: Record<Locale, string> = {
  en: "Other ways we help",
  ru: "Чем ещё помогаем",
  de: "Wie wir außerdem helfen",
  es: "Otras formas en que ayudamos",
};

/**
 * Which sibling services to surface at the foot of each service page.
 *
 * Before this, every /services/* page had exactly one inbound body-copy link
 * — the homepage grid — which left the four of them as islands in the
 * internal link graph. The pairs rotate so each service ends up with two
 * inbound links, and each pairing is a real next step for the reader:
 * agents → automation/platform, automation → platform/enablement,
 * consulting → the two things we'd actually build, platform → the agents
 * inside it and the training that makes a rollout stick.
 *
 * Labels and summaries come from `dict.services_pages`, so this needs no new
 * dictionary copy and works in all four locales automatically.
 */
const RELATED_SERVICES: Record<string, readonly ServiceSlug[]> = {
  "ai-assistant": ["ai-automation", "ai-workspace"],
  "ai-automation": ["ai-workspace", "ai-training"],
  "ai-training": ["ai-assistant", "ai-automation"],
  "ai-workspace": ["ai-training", "ai-assistant"],
};

/**
 * Rendered by both service-page shells — the generic `ServicePage` and the
 * bespoke `EnterprisePage` used for /services/ai-workspace. Keeping it in one
 * component is what stops ai-workspace from silently dropping out of the
 * cross-link graph again.
 *
 * Reuses the `post-card` grid rather than introducing a second card style.
 */
export function RelatedServices({ slug }: { slug: string }) {
  const locale = useLocale();
  const dict = getDictionary(locale);

  const related = (RELATED_SERVICES[slug] ?? [])
    .map((s) => ({ slug: s, service: dict.services_pages[s] }))
    .filter((s) => Boolean(s.service));

  if (related.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-header__left">
              <h2>{RELATED_SERVICES_LABEL[locale]}</h2>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={80}>
          <div className="post-cards">
            {related.map(({ slug: s, service }) => (
              <a key={s} className="post-card" href={href(`/services/${s}`, locale)}>
                <h3 className="post-card__title">{service.title}</h3>
                <p className="post-card__summary">{service.cardSummary}</p>
                <span className="post-card__cta">
                  {service.kicker} <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
