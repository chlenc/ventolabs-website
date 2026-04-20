export const servicesSlugs = [
  "ai-assistant",
  "ai-automation",
  "ai-training",
  "ai-workspace",
] as const;

export type ServiceSlug = (typeof servicesSlugs)[number];
