import type { BlogSlug } from "@/lib/blog";
import type { Article } from "./types";
import { oneCToolsArticle } from "./instrumenty-1c-claude-code-codex-content";

/**
 * slug → article body. Kept apart from `src/lib/blog.ts` so the metadata
 * module (imported by sitemap, seo and og) never drags 4k words of article
 * text into those bundles.
 */
export const articles: Record<BlogSlug, Article> = {
  "instrumenty-1c-claude-code-codex": oneCToolsArticle,
};
