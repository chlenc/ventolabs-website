import type { Locale } from "./i18n";

/**
 * Editorial guides (/blog).
 *
 * Guide copy deliberately does NOT live in the four locale dictionaries: an
 * article is a single long-form text written in one language, and translating
 * 4k words four ways per publish is not the deal. Instead each guide declares
 * the locale it is written in; every other locale renders a short localized
 * stub that summarises it and links to the original — the same arrangement the
 * bespoke /cases/erp-agent landing uses (see `ErpRussianOnlyStub`).
 *
 * The article body itself lives next to its renderer in
 * `src/components/pages/blog/<slug>-content.ts`.
 */

export const blogSlugs = ["instrumenty-1c-claude-code-codex"] as const;

export type BlogSlug = (typeof blogSlugs)[number];

export function isBlogSlug(slug: string): slug is BlogSlug {
  return (blogSlugs as readonly string[]).includes(slug);
}

type Seo = { title: string; description: string };

/** Index-card copy — shown on /blog in every locale. */
type Card = { eyebrow: string; title: string; summary: string; readLabel: string };

export type BlogEntry = {
  slug: BlogSlug;
  /** Locale the full article is written in. Others get the stub. */
  articleLocale: Locale;
  /** ISO dates — feed schema.org datePublished/dateModified. */
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  /** Topic keywords — schema.org `keywords`, not a meta-keywords tag. */
  keywords: string[];
  seo: Record<Locale, Seo>;
  card: Record<Locale, Card>;
};

const oneCTools: BlogEntry = {
  slug: "instrumenty-1c-claude-code-codex",
  articleLocale: "ru",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  readingMinutes: 16,
  keywords: [
    "MCP-сервер для 1С",
    "Claude Code",
    "OpenAI Codex",
    "1С:Предприятие",
    "BSL Language Server",
    "Agent Skills",
    "1С:Напарник",
    "AI-разработка 1С",
  ],
  seo: {
    ru: {
      title: "Инструменты 1С для Claude Code и Codex: MCP, скиллы, плагины",
      description:
        "Каталог AI-инструментов для 1С:Предприятие: три десятка MCP-серверов, наборы Claude Code Skills, плагин BSL Language Server, Codex-плагин Unica и 1С:Напарник. Что ставить, в каком порядке и где грабли. Обзор от команды, которая внедряет AI-агентов в 1С.",
    },
    en: {
      title: "AI tooling for 1C: MCP servers, skills and plugins (Russian guide)",
      description:
        "A field guide to the AI tooling around 1C:Enterprise — MCP servers, Claude Code skills, the BSL Language Server plugin and OpenAI Codex support. Published in Russian; English summary here.",
    },
    de: {
      title: "KI-Tools für 1C: MCP-Server, Skills und Plugins (russischer Guide)",
      description:
        "Überblick über das KI-Ökosystem rund um 1C:Enterprise — MCP-Server, Claude-Code-Skills, das BSL-Language-Server-Plugin und OpenAI-Codex-Support. Der vollständige Guide ist auf Russisch.",
    },
    es: {
      title: "Herramientas de IA para 1C: servidores MCP, skills y plugins",
      description:
        "Guía del ecosistema de IA alrededor de 1C:Enterprise — servidores MCP, skills de Claude Code, el plugin de BSL Language Server y soporte de OpenAI Codex. La guía completa está en ruso.",
    },
  },
  card: {
    ru: {
      eyebrow: "Гайд · AI-инструменты",
      title: "Инструменты для 1С:Предприятие в Claude Code и OpenAI Codex",
      summary:
        "Три десятка MCP-серверов, 95 скиллов в крупнейшем наборе, официальный плагин BSL Language Server и Codex-плагин Unica. Разбираем, что из этого ставить первым, что работает в обоих агентах и почему без MCP LLM уверенно пишет неправильный BSL.",
      readLabel: "Читать гайд",
    },
    en: {
      eyebrow: "Guide · AI tooling",
      title: "AI tooling for 1C:Enterprise in Claude Code and OpenAI Codex",
      summary:
        "A survey of the 1C AI ecosystem: three dozen MCP servers, large Claude Code skill packs, the official BSL Language Server plugin and the Unica plugin for Codex. Written in Russian — the market it serves is Russian-speaking.",
      readLabel: "English summary",
    },
    de: {
      eyebrow: "Guide · KI-Tools",
      title: "KI-Tools für 1C:Enterprise in Claude Code und OpenAI Codex",
      summary:
        "Ein Überblick über das 1C-KI-Ökosystem: drei Dutzend MCP-Server, große Claude-Code-Skill-Pakete, das offizielle BSL-Language-Server-Plugin und das Unica-Plugin für Codex. Auf Russisch verfasst.",
      readLabel: "Deutsche Zusammenfassung",
    },
    es: {
      eyebrow: "Guía · Herramientas de IA",
      title: "Herramientas de IA para 1C:Enterprise en Claude Code y OpenAI Codex",
      summary:
        "Panorama del ecosistema de IA para 1C: tres decenas de servidores MCP, paquetes de skills para Claude Code, el plugin oficial de BSL Language Server y el plugin Unica para Codex. Escrita en ruso.",
      readLabel: "Resumen en español",
    },
  },
};

const entries: Record<BlogSlug, BlogEntry> = {
  "instrumenty-1c-claude-code-codex": oneCTools,
};

export function getBlogEntry(slug: BlogSlug): BlogEntry {
  return entries[slug];
}

/** Newest first — the order /blog renders cards in. */
export const blogIndex: BlogEntry[] = [...blogSlugs]
  .map((slug) => entries[slug])
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished));

/** Index page chrome, per locale. */
export const blogIndexCopy: Record<
  Locale,
  { eyebrow: string; heading: string; lede: string; metaTitle: string; metaDescription: string }
> = {
  ru: {
    eyebrow: "Гайды",
    heading: "Инженерные гайды",
    lede: "Длинные разборы того, что мы сами внедряем: AI-агенты поверх учётных систем, инструменты разработки, границы применимости. Без маркетинга — только то, что проверено на проектах.",
    metaTitle: "Гайды по AI в учётных системах",
    metaDescription:
      "Инженерные разборы от Vento Labs: AI-агенты поверх ERP, инструменты разработки, MCP-серверы и границы применимости LLM в учётных системах.",
  },
  en: {
    eyebrow: "Guides",
    heading: "Engineering guides",
    lede: "Long-form write-ups on what we actually ship: AI agents on top of business systems, the tooling around them, and where the limits are. Some guides are published in the language of the market they serve.",
    metaTitle: "Engineering guides",
    metaDescription:
      "Long-form engineering write-ups from Vento Labs: AI agents on top of ERP systems, developer tooling, MCP servers, and where LLMs stop working.",
  },
  de: {
    eyebrow: "Guides",
    heading: "Engineering-Guides",
    lede: "Ausführliche Analysen zu dem, was wir tatsächlich ausliefern: KI-Agenten auf Geschäftssystemen, das Tooling drumherum und die Grenzen. Manche Guides erscheinen in der Sprache ihres Zielmarkts.",
    metaTitle: "Engineering-Guides",
    metaDescription:
      "Ausführliche Engineering-Analysen von Vento Labs: KI-Agenten auf ERP-Systemen, Developer-Tooling, MCP-Server und die Grenzen von LLMs.",
  },
  es: {
    eyebrow: "Guías",
    heading: "Guías de ingeniería",
    lede: "Análisis extensos sobre lo que realmente implementamos: agentes de IA sobre sistemas de gestión, las herramientas que los rodean y sus límites. Algunas guías se publican en el idioma de su mercado.",
    metaTitle: "Guías de ingeniería",
    metaDescription:
      "Análisis de ingeniería de Vento Labs: agentes de IA sobre sistemas ERP, herramientas de desarrollo, servidores MCP y los límites de los LLM.",
  },
};
