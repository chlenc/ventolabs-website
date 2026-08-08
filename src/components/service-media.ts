import type { EnterpriseTeamImageId } from "@/lib/i18n/types";

/**
 * Imagery for the four service pages. Paths live here rather than in the
 * dictionaries so translators only ever touch alt text and captions — same
 * split as /data-centers (see DataCentersPage.tsx).
 *
 * The four pages share one visual grammar so a reader moving between them
 * reads one system: a full-bleed documentary band under the hero, a studio
 * frame per "how it works" step on a bone seamless background, and one wide
 * figure of the delivered kit under "what's included".
 */
export type ServiceMedia = {
  /** Full-bleed band directly under the hero. */
  hero: string;
  /** One studio frame per `plan` step, same order as the dictionary. */
  steps: string[];
  /** Wide figure for the deliverables block. */
  kit: string;
};

const B = "/images/services";

export const serviceMedia: Record<string, ServiceMedia> = {
  "ai-assistant": {
    hero: `${B}/hero-ai-assistant.jpg`,
    steps: [
      `${B}/step-ai-assistant-1.jpg`,
      `${B}/step-ai-assistant-2.jpg`,
      `${B}/step-ai-assistant-3.jpg`,
    ],
    kit: `${B}/kit-ai-assistant.jpg`,
  },
  "ai-automation": {
    hero: `${B}/hero-ai-automation.jpg`,
    steps: [
      `${B}/step-ai-automation-1.jpg`,
      `${B}/step-ai-automation-2.jpg`,
      `${B}/step-ai-automation-3.jpg`,
    ],
    kit: `${B}/kit-ai-automation.jpg`,
  },
  "ai-training": {
    hero: `${B}/hero-ai-training.jpg`,
    steps: [
      `${B}/step-ai-training-1.jpg`,
      `${B}/step-ai-training-2.jpg`,
      `${B}/step-ai-training-3.jpg`,
    ],
    kit: `${B}/kit-ai-training.jpg`,
  },
  "ai-workspace": {
    hero: `${B}/hero-ai-workspace.jpg`,
    steps: [
      `${B}/step-ai-workspace-1.jpg`,
      `${B}/step-ai-workspace-2.jpg`,
      `${B}/step-ai-workspace-3.jpg`,
    ],
    kit: `${B}/kit-ai-workspace.jpg`,
  },
};

/** Assembled-platform render leading the /services/ai-workspace solution block. */
export const workspacePlatformImage = `${B}/workspace-platform.jpg`;

/** One documentary shot per team function in the ai-workspace agent showcase. */
export const teamImage: Record<EnterpriseTeamImageId, string> = {
  service: `${B}/team-service.jpg`,
  sales: `${B}/team-sales.jpg`,
  marketing: `${B}/team-marketing.jpg`,
  operations: `${B}/team-operations.jpg`,
};
