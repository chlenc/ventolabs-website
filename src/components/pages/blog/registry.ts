import type { Locale } from "@/lib/i18n";
import type { BlogSlug } from "@/lib/blog";
import type { Article } from "./types";
import { oneCToolsArticle } from "./instrumenty-1c-claude-code-codex-content";
import { oneCAgentArticle } from "./ai-agent-dlya-1c-vnedrenie-content";
import { marketplaceAgentArticle } from "./ai-agent-dlya-marketpleysov-wb-ozon-content";
import { bankruptcyAiArticle } from "./ii-dlya-arbitrazhnogo-upravlyayushchego-content";
import { aiAgentCostArticle } from "./custom-ai-agent-cost-content";
import { accountabilityArticles } from "./autonomous-ai-accountability-content";

/**
 * slug → locale → article body. Kept apart from `src/lib/blog.ts` so the
 * metadata module (imported by sitemap, seo and og) never drags the article
 * text into those bundles.
 *
 * Most guides carry a single locale and stub out elsewhere; a translated guide
 * lists a body per locale and sets `bodyLocales` on its entry to match.
 */
export const articles: Record<BlogSlug, Partial<Record<Locale, Article>>> = {
  "instrumenty-1c-claude-code-codex": { ru: oneCToolsArticle },
  "ai-agent-dlya-1c-vnedrenie": { ru: oneCAgentArticle },
  "ai-agent-dlya-marketpleysov-wb-ozon": { ru: marketplaceAgentArticle },
  "ii-dlya-arbitrazhnogo-upravlyayushchego": { ru: bankruptcyAiArticle },
  "custom-ai-agent-cost": { en: aiAgentCostArticle },
  "autonomous-ai-accountability": accountabilityArticles,
};

/**
 * The body to render for a locale, or undefined when this locale only gets a
 * stub. Stub copy lives on the original-language body's `stubs` map.
 */
export function getArticleBody(slug: BlogSlug, locale: Locale): Article | undefined {
  return articles[slug][locale];
}

/**
 * The `<h1>` this locale actually renders — the article's own heading, or the
 * stub's. Feeds schema.org `headline`, which is supposed to match the visible
 * headline; the SEO title is a different string written for the SERP.
 */
export function getArticleHeadline(
  slug: BlogSlug,
  locale: Locale,
  articleLocale: Locale,
): string | undefined {
  const body = articles[slug][locale];
  if (body) return body.h1;
  return articles[slug][articleLocale]?.stubs[locale]?.h1;
}
