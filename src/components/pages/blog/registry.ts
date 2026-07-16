import type { BlogSlug } from "@/lib/blog";
import type { Article } from "./types";
import { oneCToolsArticle } from "./instrumenty-1c-claude-code-codex-content";
import { oneCAgentArticle } from "./ai-agent-dlya-1c-vnedrenie-content";
import { marketplaceAgentArticle } from "./ai-agent-dlya-marketpleysov-wb-ozon-content";
import { bankruptcyAiArticle } from "./ii-dlya-arbitrazhnogo-upravlyayushchego-content";
import { aiAgentCostArticle } from "./custom-ai-agent-cost-content";

/**
 * slug → article body. Kept apart from `src/lib/blog.ts` so the metadata
 * module (imported by sitemap, seo and og) never drags 4k words of article
 * text into those bundles.
 */
export const articles: Record<BlogSlug, Article> = {
  "instrumenty-1c-claude-code-codex": oneCToolsArticle,
  "ai-agent-dlya-1c-vnedrenie": oneCAgentArticle,
  "ai-agent-dlya-marketpleysov-wb-ozon": marketplaceAgentArticle,
  "ii-dlya-arbitrazhnogo-upravlyayushchego": bankruptcyAiArticle,
  "custom-ai-agent-cost": aiAgentCostArticle,
};
