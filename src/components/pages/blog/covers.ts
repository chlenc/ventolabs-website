import type { BlogSlug } from "@/lib/blog";
import type { FigureId } from "./types";

/**
 * Image paths for the guides. Kept here, keyed by a typed id, so neither the
 * article bodies nor `src/lib/blog.ts` ever names a file — the same split
 * `/data-centers` uses (see `projectImage` in `DataCentersPage.tsx`). Copy
 * files carry alt text and captions only.
 *
 * Every cover ships twice: a wide `-cover` for the article hero and a smaller
 * `-card` for the /blog index, where six of them load at once.
 */
export const coverImage: Record<BlogSlug, string> = {
  "instrumenty-1c-claude-code-codex": "/images/blog/instrumenty-1c-claude-code-codex-cover.jpg",
  "ai-agent-dlya-1c-vnedrenie": "/images/blog/ai-agent-dlya-1c-vnedrenie-cover.jpg",
  "ai-agent-dlya-marketpleysov-wb-ozon":
    "/images/blog/ai-agent-dlya-marketpleysov-wb-ozon-cover.jpg",
  "ii-dlya-arbitrazhnogo-upravlyayushchego":
    "/images/blog/ii-dlya-arbitrazhnogo-upravlyayushchego-cover.jpg",
  "custom-ai-agent-cost": "/images/blog/custom-ai-agent-cost-cover.jpg",
  "autonomous-ai-accountability": "/images/blog/autonomous-ai-accountability-cover.jpg",
};

export const cardImage: Record<BlogSlug, string> = {
  "instrumenty-1c-claude-code-codex": "/images/blog/instrumenty-1c-claude-code-codex-card.jpg",
  "ai-agent-dlya-1c-vnedrenie": "/images/blog/ai-agent-dlya-1c-vnedrenie-card.jpg",
  "ai-agent-dlya-marketpleysov-wb-ozon":
    "/images/blog/ai-agent-dlya-marketpleysov-wb-ozon-card.jpg",
  "ii-dlya-arbitrazhnogo-upravlyayushchego":
    "/images/blog/ii-dlya-arbitrazhnogo-upravlyayushchego-card.jpg",
  "custom-ai-agent-cost": "/images/blog/custom-ai-agent-cost-card.jpg",
  "autonomous-ai-accountability": "/images/blog/autonomous-ai-accountability-card.jpg",
};

/**
 * Site-root cover path for structured data. Lives here so `coverImage` stays
 * the single place a guide's cover filename is written down — `jsonld.tsx`
 * calls this rather than re-deriving the pattern. Type-only imports mean this
 * module pulls no React and no article text into the metadata bundles.
 */
export function blogCoverPath(slug: BlogSlug): string {
  return coverImage[slug];
}

/** In-article photography, referenced by `{ kind: "figure", id }` blocks. */
export const figureImage: Record<FigureId, string> = {
  "bankruptcy-statements": "/images/blog/figure-bankruptcy-statements.jpg",
  "cost-stack": "/images/blog/figure-cost-stack.jpg",
};
