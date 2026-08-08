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

export const blogSlugs = [
  "instrumenty-1c-claude-code-codex",
  "ai-agent-dlya-1c-vnedrenie",
  "ai-agent-dlya-marketpleysov-wb-ozon",
  "ii-dlya-arbitrazhnogo-upravlyayushchego",
  "custom-ai-agent-cost",
  "autonomous-ai-accountability",
] as const;

export type BlogSlug = (typeof blogSlugs)[number];

export function isBlogSlug(slug: string): slug is BlogSlug {
  return (blogSlugs as readonly string[]).includes(slug);
}

type Seo = { title: string; description: string };

/**
 * Index-card copy — shown on /blog in every locale.
 *
 * `imageAlt` describes the guide's cover, which appears both on the index card
 * and as the article hero. The cover's *path* is resolved from the slug in
 * `blog/covers.ts`; nothing here ever names a file.
 */
type Card = {
  eyebrow: string;
  title: string;
  summary: string;
  readLabel: string;
  imageAlt: string;
};

export type BlogEntry = {
  slug: BlogSlug;
  /**
   * Locale the article was originally written in. Stubs point back here, and
   * a translation declares it as its `isBasedOn` source.
   */
  articleLocale: Locale;
  /**
   * Locales that ship a full body. Defaults to `[articleLocale]` — most guides
   * are single-language with stubs elsewhere (see the module comment). A guide
   * whose subject isn't market-specific can be translated outright: list every
   * locale here and give `registry.ts` a body for each.
   */
  bodyLocales?: readonly Locale[];
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
        "Каталог AI-инструментов для 1С:Предприятие: MCP-серверы, наборы Claude Code Skills, плагин BSL Language Server, Codex-плагин Unica и 1С:Напарник.",
    },
    en: {
      title: "AI tooling for 1C: MCP servers, skills and plugins",
      description:
        "A field guide to the AI tooling around 1C:Enterprise — MCP servers, Claude Code skills, the BSL Language Server plugin, OpenAI Codex. Guide in Russian.",
    },
    de: {
      title: "KI-Tools für 1C: MCP-Server, Skills und Plugins",
      description:
        "Überblick über das KI-Ökosystem rund um 1C:Enterprise — MCP-Server, Claude-Code-Skills, BSL-Language-Server-Plugin, Codex. Guide auf Russisch.",
    },
    es: {
      title: "Herramientas de IA para 1C: servidores MCP, skills y plugins",
      description:
        "Guía del ecosistema de IA alrededor de 1C:Enterprise — servidores MCP, skills de Claude Code, el plugin BSL Language Server y Codex. Guía en ruso.",
    },
  },
  card: {
    ru: {
      eyebrow: "Гайд · AI-инструменты",
      title: "Инструменты для 1С:Предприятие в Claude Code и OpenAI Codex",
      summary:
        "Три десятка MCP-серверов, 95 скиллов в крупнейшем наборе, официальный плагин BSL Language Server и Codex-плагин Unica. Разбираем, что из этого ставить первым, что работает в обоих агентах и почему без MCP LLM уверенно пишет неправильный BSL.",
      readLabel: "Читать гайд",
      imageAlt:
        "Веер рожковых ключей и шестигранников на светлом столе рядом с тёмно-зелёными машинными блоками, один шестигранник тоже зелёный",
    },
    en: {
      eyebrow: "Guide · AI tooling",
      title: "AI tooling for 1C:Enterprise in Claude Code and OpenAI Codex",
      summary:
        "A survey of the 1C AI ecosystem: three dozen MCP servers, large Claude Code skill packs, the official BSL Language Server plugin and the Unica plugin for Codex. Written in Russian — the market it serves is Russian-speaking.",
      readLabel: "English summary",
      imageAlt:
        "Wrenches and hex keys fanned out on a pale surface beside deep-green machined blocks, one hex key green as well",
    },
    de: {
      eyebrow: "Guide · KI-Tools",
      title: "KI-Tools für 1C:Enterprise in Claude Code und OpenAI Codex",
      summary:
        "Ein Überblick über das 1C-KI-Ökosystem: drei Dutzend MCP-Server, große Claude-Code-Skill-Pakete, das offizielle BSL-Language-Server-Plugin und das Unica-Plugin für Codex. Auf Russisch verfasst.",
      readLabel: "Deutsche Zusammenfassung",
      imageAlt:
        "Auffächerte Schraubenschlüssel und Innensechskantschlüssel auf heller Fläche neben dunkelgrünen Metallblöcken, einer der Schlüssel ebenfalls grün",
    },
    es: {
      eyebrow: "Guía · Herramientas de IA",
      title: "Herramientas de IA para 1C:Enterprise en Claude Code y OpenAI Codex",
      summary:
        "Panorama del ecosistema de IA para 1C: tres decenas de servidores MCP, paquetes de skills para Claude Code, el plugin oficial de BSL Language Server y el plugin Unica para Codex. Escrita en ruso.",
      readLabel: "Resumen en español",
      imageAlt:
        "Llaves fijas y llaves Allen desplegadas en abanico sobre una superficie clara junto a bloques mecanizados verde oscuro, una de las llaves también verde",
    },
  },
};

const oneCAgent: BlogEntry = {
  slug: "ai-agent-dlya-1c-vnedrenie",
  articleLocale: "ru",
  datePublished: "2026-07-16",
  dateModified: "2026-08-08",
  readingMinutes: 14,
  keywords: [
    "AI-агент для 1С",
    "ИИ в 1С",
    "автоматизация 1С нейросетью",
    "внедрение искусственного интеллекта в 1С",
    "безопасность AI в 1С",
    "1С:Предприятие",
    "AI-агенты в учётных системах",
    "read-only доступ к 1С",
  ],
  seo: {
    ru: {
      title: "AI-агент для 1С: возможности, ограничения, внедрение",
      description:
        "Что AI-агент умеет поверх 1С, как устроен безопасный доступ — read-only роли, ревью планов, аудит-лог — где ИИ не работает и как внедрить за 2–4 недели.",
    },
    en: {
      title: "AI agent for 1C: capabilities, limits, rollout (RU guide)",
      description:
        "What an AI agent does on top of 1C:Enterprise — safe access architecture, honest limits, step-by-step rollout. Published in Russian; English summary here.",
    },
    de: {
      title: "KI-Agent für 1C: Fähigkeiten, Grenzen, Einführung (RU)",
      description:
        "Was ein KI-Agent über 1C leistet — sichere Zugriffsarchitektur, ehrliche Grenzen, Einführung Schritt für Schritt. Der vollständige Guide ist auf Russisch.",
    },
    es: {
      title: "Agente de IA para 1C: qué hace, límites e implantación",
      description:
        "Qué hace un agente de IA sobre 1C — arquitectura de acceso seguro, límites honestos e implantación paso a paso. La guía completa está en ruso.",
    },
  },
  card: {
    ru: {
      eyebrow: "Гайд · AI-агент для 1С",
      title: "AI-агент для 1С: что он реально умеет, где ломается и как внедрить без риска для базы",
      summary:
        "Ответы по данным, отчёты без программиста, рутина с подтверждением и помощь разработчику — и архитектура, которая делает это безопасным: read-only роли, ревью планов перед записью, аудит-лог. Плюс честный список зон, куда ИИ пускать нельзя, этапы внедрения за 2–4 недели и разбор, во что упирается стоимость.",
      readLabel: "Читать гайд",
      imageAlt:
        "Матовый корпус со ступенчатыми стальными пластинами и одним узким тёмно-зелёным просветом внутрь, рядом — стальной ключ",
    },
    en: {
      eyebrow: "Guide · AI agents for 1C",
      title: "An AI agent for 1C:Enterprise: what it can do, where it breaks, and how to deploy it safely",
      summary:
        "What AI agents genuinely handle on top of 1C — data Q&A, ad-hoc reports, routine operations, developer assistance — and the architecture that keeps the database safe: read-only roles, plan review before any write, a full audit log. Written in Russian for the market it serves.",
      readLabel: "English summary",
      imageAlt:
        "A matte enclosure with stepped steel plates and a single narrow deep-green opening leading inside, a steel key beside it",
    },
    de: {
      eyebrow: "Guide · KI-Agenten für 1C",
      title: "Ein KI-Agent für 1C:Enterprise: was er kann, wo er scheitert und wie man ihn sicher einführt",
      summary:
        "Was KI-Agenten über 1C tatsächlich leisten — Datenabfragen, Ad-hoc-Berichte, Routineoperationen, Entwickler-Unterstützung — und die Architektur, die die Datenbank schützt: Read-only-Rollen, Plan-Review vor jedem Schreibzugriff, vollständiges Audit-Log. Auf Russisch verfasst.",
      readLabel: "Deutsche Zusammenfassung",
      imageAlt:
        "Ein mattes Gehäuse mit gestuften Stahlplatten und einem schmalen dunkelgrünen Durchlass ins Innere, daneben ein Stahlschlüssel",
    },
    es: {
      eyebrow: "Guía · Agentes de IA para 1C",
      title: "Un agente de IA para 1C:Enterprise: qué sabe hacer, dónde falla y cómo implantarlo sin riesgo",
      summary:
        "Lo que los agentes de IA resuelven de verdad sobre 1C — consultas de datos, informes puntuales, operaciones rutinarias, asistencia al desarrollador — y la arquitectura que protege la base: roles de solo lectura, revisión de planes antes de escribir, registro de auditoría completo. Escrita en ruso.",
      readLabel: "Resumen en español",
      imageAlt:
        "Una carcasa mate con placas de acero escalonadas y una única abertura verde oscuro hacia el interior, con una llave de acero al lado",
    },
  },
};

const marketplaceAgent: BlogEntry = {
  slug: "ai-agent-dlya-marketpleysov-wb-ozon",
  articleLocale: "ru",
  datePublished: "2026-07-16",
  dateModified: "2026-08-08",
  readingMinutes: 14,
  keywords: [
    "автоматизация Wildberries",
    "автоматизация Ozon",
    "ИИ для маркетплейсов",
    "AI-агент для маркетплейсов",
    "аналитика маркетплейсов",
    "API Wildberries",
    "Ozon Seller API",
    "юнит-экономика маркетплейсов",
    "цифровой сотрудник",
  ],
  seo: {
    ru: {
      title: "Автоматизация Wildberries и Ozon: AI-агент для селлера",
      description:
        "Как AI-агент забирает рутину селлера на Wildberries и Ozon: API площадок, ETL в свою базу, отчёты в Telegram, юнит-экономика и честные ограничения.",
    },
    en: {
      title: "AI agent for Wildberries and Ozon: seller automation guide",
      description:
        "How an AI agent takes over seller routine on Wildberries and Ozon: marketplace APIs, ETL into your own database, Telegram reports, honest limits. In Russian.",
    },
    de: {
      title: "KI-Agent für Wildberries und Ozon: Seller-Automatisierung",
      description:
        "Wie ein KI-Agent die Seller-Routine auf Wildberries und Ozon übernimmt: Marktplatz-APIs, ETL in die eigene Datenbank, Telegram-Reports. Auf Russisch.",
    },
    es: {
      title: "Agente de IA para Wildberries y Ozon: automatiza tu rutina",
      description:
        "Cómo un agente de IA asume la rutina del seller en Wildberries y Ozon: APIs, ETL a una base propia, informes en Telegram y límites honestos. Guía en ruso.",
    },
  },
  card: {
    ru: {
      eyebrow: "Гайд · Маркетплейсы",
      title: "Цифровой сотрудник для маркетплейсов: AI-агент против рутины на Wildberries и Ozon",
      summary:
        "Утро селлера — выгрузки из двух ЛК, склейка в Excel и пересчёт маржи. Разбираем, как AI-агент поверх API WB и Ozon забирает эту рутину: ETL в свою базу, отчёты в Telegram, контент карточек. И честно — где автоматизация хрупкая и когда достаточно готового SaaS.",
      readLabel: "Читать гайд",
      imageAlt:
        "Два потока серых посылок на конвейерных дорожках сходятся в одну упорядоченную линию, одна посылка тёмно-зелёная",
    },
    en: {
      eyebrow: "Guide · Marketplaces",
      title: "A digital employee for marketplaces: an AI agent for Wildberries and Ozon sellers",
      summary:
        "A seller's morning is exports from two dashboards, spreadsheet merging and margin recalculation. The guide shows how an AI agent on top of the WB and Ozon APIs takes that routine over — and where automation stays fragile. Written in Russian, the language of both marketplaces.",
      readLabel: "English summary",
      imageAlt:
        "Two streams of grey parcels on conveyor tracks merging into a single ordered line, one parcel deep green",
    },
    de: {
      eyebrow: "Guide · Marktplätze",
      title: "Ein digitaler Mitarbeiter für Marktplätze: KI-Agent für Wildberries- und Ozon-Seller",
      summary:
        "Der Alltag eines Sellers: Exporte aus zwei Dashboards, Excel und Margen-Neuberechnung. Der Guide zeigt, wie ein KI-Agent über die WB- und Ozon-APIs diese Routine übernimmt — und wo Automatisierung fragil bleibt. Auf Russisch verfasst.",
      readLabel: "Deutsche Zusammenfassung",
      imageAlt:
        "Zwei Ströme grauer Pakete auf Förderbändern laufen zu einer geordneten Linie zusammen, ein Paket ist dunkelgrün",
    },
    es: {
      eyebrow: "Guía · Marketplaces",
      title: "Un empleado digital para marketplaces: agente de IA para sellers de Wildberries y Ozon",
      summary:
        "La mañana de un seller: exportaciones de dos paneles, Excel y recálculo de márgenes. La guía muestra cómo un agente de IA sobre las APIs de WB y Ozon asume esa rutina — y dónde la automatización sigue siendo frágil. Escrita en ruso.",
      readLabel: "Resumen en español",
      imageAlt:
        "Dos flujos de paquetes grises sobre cintas transportadoras que confluyen en una sola línea ordenada, uno de ellos verde oscuro",
    },
  },
};

const bankruptcyAi: BlogEntry = {
  slug: "ii-dlya-arbitrazhnogo-upravlyayushchego",
  articleLocale: "ru",
  datePublished: "2026-07-16",
  dateModified: "2026-08-08",
  readingMinutes: 14,
  keywords: [
    "ИИ для арбитражного управляющего",
    "автоматизация процедур банкротства",
    "программа для арбитражного управляющего",
    "анализ банковских выписок",
    "127-ФЗ",
    "ЕФРСБ",
    "оспаривание сделок должника",
    "AI-агент для юристов",
  ],
  seo: {
    ru: {
      title: "ИИ для арбитражного управляющего: что доверить агенту",
      description:
        "Что AI-агент уже делает в процедурах банкротства: сроки 127-ФЗ, анализ банковских выписок, черновики отчётов и публикаций. И где граница ответственности АУ.",
    },
    en: {
      title: "AI for bankruptcy trustees: what an agent can handle",
      description:
        "What a bankruptcy AI agent already handles — deadlines, bank statement screening, report drafts — and where the trustee's personal liability draws the line.",
    },
    de: {
      title: "KI für Insolvenzverwalter: was ein Agent übernehmen kann",
      description:
        "Was ein KI-Agent in Insolvenzverfahren schon übernimmt — Fristen, Kontoauszug-Screening, Berichtsentwürfe — und wo die persönliche Haftung die Grenze zieht.",
    },
    es: {
      title: "IA para administradores concursales: qué asume un agente",
      description:
        "Qué asume un agente de IA en un concurso — plazos, cribado de extractos bancarios, borradores de informes — y dónde marca el límite la responsabilidad personal.",
    },
  },
  card: {
    ru: {
      eyebrow: "Гайд · Банкротство",
      title: "ИИ для арбитражного управляющего: какие процедуры уже можно доверить агенту",
      summary:
        "Контроль сроков по 127-ФЗ, разбор банковских выписок на оспоримые сделки, черновики отчётов и публикаций, мониторинг КАД и ЕФРСБ — что из рутины АУ агент уже забирает. И честно о границе: агент готовит, а решает и подписывает управляющий — ответственность персональная.",
      readLabel: "Читать гайд",
      imageAlt:
        "Стопки документов и папок разной высоты, у одной папки — тёмно-зелёный корешок, поперёк лежит стальная линейка",
    },
    en: {
      eyebrow: "Guide · AI in bankruptcy",
      title: "AI for bankruptcy trustees: which parts of the procedure an agent can already handle",
      summary:
        "Deadline tracking under Law 127-FZ, bank statement screening for voidable transactions, report and filing drafts, court docket monitoring — what an AI agent already takes over, and where personal liability draws the line. Written in Russian for the market it serves.",
      readLabel: "English summary",
      imageAlt:
        "Stacks of documents and folders at differing heights, one folder with a deep-green tab, a steel ruler laid across them",
    },
    de: {
      eyebrow: "Guide · KI in der Insolvenzpraxis",
      title: "KI für Insolvenzverwalter: welche Teile des Verfahrens ein Agent schon übernehmen kann",
      summary:
        "Fristenkontrolle nach 127-FZ, Screening von Kontoauszügen auf anfechtbare Transaktionen, Berichts- und Schriftsatzentwürfe, Akten-Monitoring — was ein KI-Agent schon übernimmt und wo die persönliche Haftung die Grenze zieht. Auf Russisch verfasst.",
      readLabel: "Deutsche Zusammenfassung",
      imageAlt:
        "Stapel von Dokumenten und Mappen unterschiedlicher Höhe, eine Mappe mit dunkelgrünem Reiter, quer darüber ein Stahllineal",
    },
    es: {
      eyebrow: "Guía · IA en procedimientos concursales",
      title: "IA para administradores concursales: qué partes del procedimiento puede asumir ya un agente",
      summary:
        "Control de plazos según la ley 127-FZ, cribado de extractos bancarios en busca de operaciones impugnables, borradores de informes y escritos, monitorización de expedientes: lo que un agente ya asume y dónde marca el límite la responsabilidad personal. Escrita en ruso.",
      readLabel: "Resumen en español",
      imageAlt:
        "Pilas de documentos y carpetas de distinta altura, una con pestaña verde oscuro y una regla de acero cruzada encima",
    },
  },
};

const aiAgentCost: BlogEntry = {
  slug: "custom-ai-agent-cost",
  articleLocale: "en",
  datePublished: "2026-07-16",
  dateModified: "2026-08-08",
  readingMinutes: 14,
  keywords: [
    "custom AI agent cost",
    "AI agent development price",
    "how much does an AI agent cost",
    "AI automation cost for business",
    "AI agent pricing 2026",
    "AI agent build vs buy",
    "AI agent maintenance cost",
    "AI agent ROI",
  ],
  seo: {
    ru: {
      title: "Сколько стоит кастомный AI-агент в 2026: честный разбор",
      description:
        "Рыночные вилки на разработку и эксплуатацию AI-агента в 2026, сравнение no-code, SaaS и заказной разработки, скрытые расходы и вопросы подрядчику.",
    },
    en: {
      title: "Custom AI Agent Cost in 2026: An Honest Breakdown",
      description:
        "What a custom AI agent really costs in 2026: build and monthly run ranges from market data, no-code vs SaaS vs custom break-even math, and hidden costs.",
    },
    de: {
      title: "Was kostet ein KI-Agent 2026? Ehrliche Aufschlüsselung",
      description:
        "Marktpreise für Entwicklung und Betrieb von KI-Agenten 2026, Break-even-Vergleich von No-Code, SaaS und Individualentwicklung, versteckte Kosten, Checkliste.",
    },
    es: {
      title: "Cuánto cuesta un agente de IA a medida en 2026",
      description:
        "Rangos de mercado para crear y operar un agente de IA en 2026, comparación no-code vs SaaS vs desarrollo a medida, costes ocultos y preguntas al proveedor.",
    },
  },
  card: {
    ru: {
      eyebrow: "Гайд · Цены на AI-агентов",
      title: "Сколько стоит кастомный AI-агент в 2026 году: честный разбор",
      summary:
        "Рыночные вилки на разработку и ежемесячную эксплуатацию, пять факторов, из которых складывается любая смета, формула окупаемости no-code против SaaS и заказной разработки, скрытые расходы. Написано командой, которая строит агентов, — включая честные случаи, когда строить не стоит. На английском.",
      readLabel: "Читать гайд",
      imageAlt:
        "Стальное коромысло весов: с одной стороны стопка небольших серых блоков, с другой — один крупный тёмно-зелёный",
    },
    en: {
      eyebrow: "AI agents · Pricing",
      title: "How much does a custom AI agent cost in 2026? An honest breakdown",
      summary:
        "Market ranges for build and monthly run, the five drivers behind any quote, break-even math for no-code vs SaaS vs custom, and the hidden costs vendors leave out of proposals. Written by a team that builds agents — including the honest cases where you shouldn't buy one.",
      readLabel: "Read the guide",
      imageAlt:
        "A steel balance beam with a stack of small grey blocks on one side and a single larger deep-green block on the other",
    },
    de: {
      eyebrow: "Guide · Kosten von KI-Agenten",
      title: "Was kostet ein maßgeschneiderter KI-Agent 2026? Eine ehrliche Aufschlüsselung",
      summary:
        "Marktspannen für Entwicklung und monatlichen Betrieb, die fünf Faktoren hinter jedem Angebot, Break-even-Rechnung für No-Code, SaaS und Individualentwicklung sowie versteckte Kosten. Geschrieben von einem Team, das Agenten baut — inklusive der ehrlichen Fälle, in denen sich der Bau nicht lohnt. Auf Englisch.",
      readLabel: "Guide lesen",
      imageAlt:
        "Ein stählerner Waagebalken: auf der einen Seite ein Stapel kleiner grauer Blöcke, auf der anderen ein größerer dunkelgrüner",
    },
    es: {
      eyebrow: "Guía · Costes de agentes de IA",
      title: "Cuánto cuesta un agente de IA a medida en 2026: un desglose honesto",
      summary:
        "Rangos de mercado para el desarrollo y la operación mensual, los cinco factores detrás de cualquier presupuesto, la fórmula de retorno para comparar no-code, SaaS y desarrollo a medida, y los costes ocultos. Escrito por un equipo que construye agentes — incluidos los casos honestos en que no conviene construir. En inglés.",
      readLabel: "Leer la guía",
      imageAlt:
        "Una balanza de acero con una pila de bloques grises pequeños en un lado y un único bloque verde oscuro más grande en el otro",
    },
  },
};

/**
 * The one guide that is translated outright rather than stubbed: AI governance
 * is not a market-specific subject the way 1C or WB/Ozon are, so every locale
 * gets the full body. `bodyLocales` lists all four, and `registry.ts` supplies
 * a body for each.
 */
const accountability: BlogEntry = {
  slug: "autonomous-ai-accountability",
  articleLocale: "en",
  bodyLocales: ["en", "ru", "de", "es"],
  datePublished: "2026-07-17",
  dateModified: "2026-07-17",
  readingMinutes: 6,
  keywords: [
    "AI governance",
    "AI accountability",
    "autonomous AI agents",
    "human in the loop",
    "AI audit trail",
    "agent permissions",
    "enterprise AI",
  ],
  seo: {
    en: {
      title: "Autonomous AI without delegating accountability",
      description:
        "AI governance in practice: the five things every agent needs — scope, limits, approval points, an audit trail, a named owner — and why \"human in the loop\" is not a control.",
    },
    ru: {
      title: "Автономный AI без делегирования ответственности",
      description:
        "Управление AI-агентами на практике: пять вещей, которые нужны каждому агенту — полномочия, лимиты, точки одобрения, аудит-лог и владелец с именем.",
    },
    de: {
      title: "Autonome KI, ohne Verantwortung zu delegieren",
      description:
        "KI-Governance in der Praxis: die fünf Dinge, die jeder Agent braucht — Kompetenzrahmen, Limits, Freigabepunkte, Audit-Log und ein benannter Eigentümer.",
    },
    es: {
      title: "IA autónoma sin delegar la responsabilidad",
      description:
        "Gobernanza de IA en la práctica: las cinco cosas que necesita todo agente — ámbito, límites, puntos de aprobación, audit log y un responsable con nombre.",
    },
  },
  card: {
    en: {
      eyebrow: "Guide · AI governance",
      title: "Autonomous AI without delegating accountability",
      summary:
        "Agents now talk to customers, edit records and move money — but most companies cannot say who answers when one gets it wrong. The five requirements every agent needs, why \"human in the loop\" usually isn't one, and why the boundary makes you faster rather than slower.",
      readLabel: "Read the guide",
      imageAlt:
        "Three nested steel rings with aligned gaps, leaving one path through to a deep-green cylinder standing at the centre",
    },
    ru: {
      eyebrow: "Гайд · Управление AI",
      title: "Автономный AI без делегирования ответственности",
      summary:
        "Агенты уже общаются с клиентами, правят записи и двигают деньги — но большинство компаний не может ответить, кто отвечает за ошибку. Пять требований к каждому агенту, почему «человек в контуре» обычно им не является и почему граница ускоряет, а не тормозит.",
      readLabel: "Читать гайд",
      imageAlt:
        "Три вложенных стальных кольца с совпадающими разрывами: сквозь них один проход к тёмно-зелёному цилиндру в центре",
    },
    de: {
      eyebrow: "Guide · KI-Governance",
      title: "Autonome KI, ohne Verantwortung zu delegieren",
      summary:
        "Agenten sprechen mit Kunden, ändern Datensätze und bewegen Geld — doch die meisten Unternehmen können nicht sagen, wer haftet, wenn einer sich irrt. Die fünf Anforderungen an jeden Agenten und warum die Grenze schneller statt langsamer macht.",
      readLabel: "Guide lesen",
      imageAlt:
        "Drei ineinanderliegende Stahlringe mit fluchtenden Öffnungen — ein Weg führt zu einem dunkelgrünen Zylinder in der Mitte",
    },
    es: {
      eyebrow: "Guía · Gobernanza de IA",
      title: "IA autónoma sin delegar la responsabilidad",
      summary:
        "Los agentes ya hablan con clientes, modifican registros y mueven dinero, pero la mayoría de las empresas no sabe quién responde cuando uno se equivoca. Los cinco requisitos de todo agente y por qué la frontera acelera en lugar de frenar.",
      readLabel: "Leer la guía",
      imageAlt:
        "Tres anillos de acero anidados con aberturas alineadas que dejan un solo paso hasta un cilindro verde oscuro en el centro",
    },
  },
};

const entries: Record<BlogSlug, BlogEntry> = {
  "instrumenty-1c-claude-code-codex": oneCTools,
  "ai-agent-dlya-1c-vnedrenie": oneCAgent,
  "ai-agent-dlya-marketpleysov-wb-ozon": marketplaceAgent,
  "ii-dlya-arbitrazhnogo-upravlyayushchego": bankruptcyAi,
  "custom-ai-agent-cost": aiAgentCost,
  "autonomous-ai-accountability": accountability,
};

export function getBlogEntry(slug: BlogSlug): BlogEntry {
  return entries[slug];
}

/**
 * Reverse of the links guides already make TO service/case pages (the
 * markdown `[text](/cases/erp-agent/)` / `(/services/ai-assistant/)` links
 * inside each `*-content.ts` body). Hand-maintained, but checked against
 * each article's actual body at the time this was written -- keep it in
 * sync manually if an article's outbound links ever change. Used by
 * ServicePage.tsx to show "related guides" on the service/case pages these
 * articles reference, closing the loop the other way.
 */
const RELATED_GUIDES: Record<string, BlogSlug[]> = {
  "erp-agent": [
    "ai-agent-dlya-1c-vnedrenie",
    "ai-agent-dlya-marketpleysov-wb-ozon",
    "autonomous-ai-accountability",
    "custom-ai-agent-cost",
    "ii-dlya-arbitrazhnogo-upravlyayushchego",
    "instrumenty-1c-claude-code-codex",
  ],
  "bankruptcy-agent": ["ii-dlya-arbitrazhnogo-upravlyayushchego"],
  "content-factory": ["ai-agent-dlya-marketpleysov-wb-ozon"],
  "supplier-agent": ["ai-agent-dlya-marketpleysov-wb-ozon"],
  "ai-assistant": ["custom-ai-agent-cost"],
  "ai-automation": ["ai-agent-dlya-marketpleysov-wb-ozon"],
  "ai-workspace": ["autonomous-ai-accountability"],
};

/** Guides that link to this service/case slug, newest first. Empty if none. */
export function relatedGuidesFor(slug: string): BlogEntry[] {
  const slugs = RELATED_GUIDES[slug];
  if (!slugs?.length) return [];
  return slugs
    .map((s) => entries[s])
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

/**
 * Guide → guide adjacency, used for the "related guides" rail at the foot of
 * every article and stub. The guides were an island: between them they made a
 * single cross-link, so nothing on /blog passed authority to anything else on
 * /blog. Two or three genuinely adjacent guides each, curated by topic — not
 * "everything else", which reads as a footer and gets treated as one.
 */
const GUIDE_RELATIONS: Record<BlogSlug, readonly BlogSlug[]> = {
  "instrumenty-1c-claude-code-codex": [
    "ai-agent-dlya-1c-vnedrenie",
    "custom-ai-agent-cost",
  ],
  "ai-agent-dlya-1c-vnedrenie": [
    "instrumenty-1c-claude-code-codex",
    "autonomous-ai-accountability",
    "custom-ai-agent-cost",
  ],
  "ai-agent-dlya-marketpleysov-wb-ozon": [
    "custom-ai-agent-cost",
    "ai-agent-dlya-1c-vnedrenie",
    "autonomous-ai-accountability",
  ],
  "ii-dlya-arbitrazhnogo-upravlyayushchego": [
    "autonomous-ai-accountability",
    "ai-agent-dlya-1c-vnedrenie",
  ],
  "custom-ai-agent-cost": [
    "autonomous-ai-accountability",
    "ai-agent-dlya-1c-vnedrenie",
    "ai-agent-dlya-marketpleysov-wb-ozon",
  ],
  "autonomous-ai-accountability": [
    "custom-ai-agent-cost",
    "ai-agent-dlya-1c-vnedrenie",
    "ii-dlya-arbitrazhnogo-upravlyayushchego",
  ],
};

/** The two or three guides worth reading next to this one. */
export function relatedGuides(slug: BlogSlug): BlogEntry[] {
  return GUIDE_RELATIONS[slug].map((s) => entries[s]);
}

/** Does this locale get the real article, or a stub pointing at the original? */
export function hasFullBody(entry: BlogEntry, locale: Locale): boolean {
  return (entry.bodyLocales ?? [entry.articleLocale]).includes(locale);
}

/**
 * Newest `dateModified` across the guides — the /blog hub's real `lastmod`.
 * Derived rather than hand-typed so it can never drift into a fabricated
 * freshness signal.
 */
export const blogLastModified: string = blogSlugs
  .map((slug) => entries[slug].dateModified)
  .sort()
  .at(-1)!;

/** Newest first — the order /blog renders cards in. */
export const blogIndex: BlogEntry[] = [...blogSlugs]
  .map((slug) => entries[slug])
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished));

/** Index page chrome, per locale. */
export const blogIndexCopy: Record<
  Locale,
  {
    eyebrow: string;
    heading: string;
    lede: string;
    metaTitle: string;
    metaDescription: string;
    /** Heading over the guide-to-guide rail at the foot of every article. */
    relatedTitle: string;
  }
> = {
  ru: {
    eyebrow: "Гайды",
    heading: "Инженерные гайды",
    lede: "Длинные разборы того, что мы сами внедряем: AI-агенты поверх учётных систем, инструменты разработки, границы применимости. Без маркетинга — только то, что проверено на проектах.",
    metaTitle: "Гайды по AI в учётных системах",
    metaDescription:
      "Инженерные разборы от Vento Labs: AI-агенты поверх ERP, инструменты разработки, MCP-серверы и границы применимости LLM в учётных системах.",
    relatedTitle: "Читайте дальше",
  },
  en: {
    eyebrow: "Guides",
    heading: "Engineering guides",
    lede: "Long-form write-ups on what we actually ship: AI agents on top of business systems, the tooling around them, and where the limits are. Some guides are published in the language of the market they serve.",
    metaTitle: "Engineering guides",
    metaDescription:
      "Long-form engineering write-ups from Vento Labs: AI agents on top of ERP systems, developer tooling, MCP servers, and where LLMs stop working.",
    relatedTitle: "Read next",
  },
  de: {
    eyebrow: "Guides",
    heading: "Engineering-Guides",
    lede: "Ausführliche Analysen zu dem, was wir tatsächlich ausliefern: KI-Agenten auf Geschäftssystemen, das Tooling drumherum und die Grenzen. Manche Guides erscheinen in der Sprache ihres Zielmarkts.",
    metaTitle: "Engineering-Guides",
    metaDescription:
      "Ausführliche Engineering-Analysen von Vento Labs: KI-Agenten auf ERP-Systemen, Developer-Tooling, MCP-Server und die Grenzen von LLMs.",
    relatedTitle: "Weiterlesen",
  },
  es: {
    eyebrow: "Guías",
    heading: "Guías de ingeniería",
    lede: "Análisis extensos sobre lo que realmente implementamos: agentes de IA sobre sistemas de gestión, las herramientas que los rodean y sus límites. Algunas guías se publican en el idioma de su mercado.",
    metaTitle: "Guías de ingeniería",
    metaDescription:
      "Análisis de ingeniería de Vento Labs: agentes de IA sobre sistemas ERP, herramientas de desarrollo, servidores MCP y los límites de los LLM.",
    relatedTitle: "Sigue leyendo",
  },
};
