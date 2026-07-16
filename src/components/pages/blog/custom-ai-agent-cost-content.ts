import type { Article } from "./types";

/**
 * English-language buyer's guide to custom AI agent pricing in 2026.
 *
 * Every dollar figure in this article is a market-wide range as publicly
 * quoted (agency pricing pages, freelance-platform rate cards, vendor price
 * lists) — never a Vento Labs client price. Volatile third-party prices are
 * stamped "at the time of publication" (July 2026). The worked ROI example is
 * explicitly labeled as illustrative.
 */
export const aiAgentCostArticle: Article = {
  eyebrow: "AI agents · Pricing",
  h1: "How much does a custom AI agent cost in 2026? An honest breakdown",
  lede: "Ask five vendors what an AI agent costs and you'll get numbers spanning two orders of magnitude — somewhere between a Zapier subscription and a consulting engagement with a comma in it. We build agents on top of ERPs, accounting systems and marketplaces for a living. Here's what actually drives the price, what the market charges to build and to run one, when a per-seat SaaS beats a custom build, and how to find out for your own workflow without betting the budget.",
  meta: {
    author: "Alexey Nagorny",
    authorRole: "Founder, Vento Labs. Builds AI agents on top of business systems",
    dateLabel: "Updated",
    dateValue: "July 16, 2026",
    readingLabel: "Reading time",
    readingValue: "14 minutes",
  },

  tldrTitle: "TL;DR",
  tldr: [
    "**Market build ranges (July 2026):** a working prototype runs $5,000–15,000; a production agent for one workflow, $15,000–50,000; a multi-system agent with review flows and audit logs, $50,000–150,000+. These are market-wide ranges — not our price list.",
    "**The monthly bill is the number everyone forgets.** Tokens, hosting, monitoring and a maintenance retainer typically land at $500–2,000 a month for an SMB production agent. High-volume customer-facing agents can spend that on tokens alone.",
    "**The model is the cheap part.** Price is driven by five things: how many workflows you automate, how many systems the agent touches, the state of your data, the guardrails required before it can write anywhere, and where it has to be hosted. Integrations and data readiness dominate.",
    "**Break-even is arithmetic, not faith.** Payback months = build cost ÷ (monthly hours saved × loaded hourly rate − monthly run cost). If that doesn't clear 12–18 months, buy SaaS or do nothing — an honest vendor will tell you so.",
    "**Never buy the full build to find out if it works.** One workflow, real data, a measured baseline, kill criteria — two weeks is enough. That's exactly the shape of the [free pilot](/services/ai-assistant/) we run.",
  ],

  tocTitle: "Contents",

  sections: [
    {
      id: "what-drives-cost",
      title: "What you're actually paying for (hint: not the model)",
      tocLabel: "What drives the cost",
      blocks: [
        {
          kind: "p",
          text: "**The LLM call is the cheapest line item in the whole project.** At the time of publication, mainstream frontier-model APIs price input at a few dollars per million tokens — for most business workflows, that's cents per completed task. What you're paying for is everything around the model: connecting it to your systems, keeping it from doing damage, and keeping it working after every upstream change.",
        },
        { kind: "p", text: "Five drivers explain almost any quote you'll get:" },
        {
          kind: "table",
          head: ["Cost driver", "Cheap end", "Expensive end"],
          rows: [
            [
              "Scope",
              "One workflow, one decision type — 'triage inbound requests'",
              "A family of workflows with branching edge cases and exception handling",
            ],
            [
              "Integrations",
              "One system with a clean REST API and current docs",
              "A legacy ERP behind a SOAP interface, an accounting system with no API at all, a marketplace that changes endpoints quarterly",
            ],
            [
              "Data access & quality",
              "Data already lives in one queryable place",
              "Data spread across mailboxes, spreadsheets and two databases that disagree with each other",
            ],
            [
              "Guardrails & review flows",
              "Agent drafts, a human clicks send",
              "Agent writes to systems of record — role-based permissions, plan review before execution, full audit log",
            ],
            [
              "Hosting & compliance",
              "Vendor cloud, standard data-processing agreement",
              "Private cloud or on-premise, security review, data that can't leave the building",
            ],
          ],
        },
        {
          kind: "p",
          text: "Integrations and data are where budgets die. Swapping the model is a config change; teaching an agent to post a document into a fifteen-year-old ERP correctly — including every way the posting can fail — is engineering work, and it's billed as such. Our own [1C Agent](/cases/erp-agent/) spends most of its code not on prompts but on the layer that validates what the agent is about to change before anything touches the ledger.",
        },
        {
          kind: "note",
          title: "A rule of thumb for reading quotes",
          text: "Ask what share of the effort goes into the agent thinking versus the agent safely touching your systems. In serious production builds the ratio runs around 20/80. A quote where prompts are the main deliverable is a demo with an invoice attached.",
        },
      ],
    },

    {
      id: "build-cost",
      title: "What a build costs in 2026: market ranges",
      tocLabel: "Build cost: market ranges",
      blocks: [
        {
          kind: "p",
          text: "**The honest answer is a range, and anyone who names a single figure before scoping is guessing.** The ranges below reflect what agencies and freelance platforms were publicly quoting for this kind of work as of July 2026. They describe what the market charges — not our price list — and where you land inside each range depends on the five drivers above.",
        },
        {
          kind: "table",
          head: ["Tier", "What you get", "Market range", "Typical timeline"],
          rows: [
            [
              "Prototype / proof of concept",
              "One workflow on real data, happy path only, minimal error handling, runs on a demo instance",
              "$5,000–15,000",
              "1–3 weeks",
            ],
            [
              "Production agent, one workflow",
              "Error handling, permissions, logging, a human review flow, monitoring, deployed in your infrastructure",
              "$15,000–50,000",
              "4–10 weeks",
            ],
            [
              "Multi-system agent",
              "Several workflows, three or more integrations, role-based access, plan review before writes, full audit trail",
              "$50,000–150,000+",
              "2–6 months",
            ],
          ],
          note: "Market ranges as of July 2026 — they drift as rates and tooling change.",
        },
        {
          kind: "p",
          text: "The spread inside each tier is mostly labor arithmetic. Senior AI engineers bill roughly $75–200 an hour in the US and Western Europe, and $30–80 in Eastern Europe and Latin America; a production single-workflow agent is a few hundred engineering hours. Same scope, different rate card — that's how one shop quotes $18,000 and another $60,000 for the same brief, and why 'where is the team' is a fair early question.",
        },
        {
          kind: "p",
          text: "Two red flags sit at the extremes. A 'production agent' under $5,000 is a prompt in a wrapper — fine as a demo, dangerous connected to real systems. And a six-figure quote for one straightforward workflow usually means you're paying for the vendor's brand, their process overhead, or their learning curve on your stack.",
        },
        { kind: "h3", text: "Why prototype prices keep falling — and production prices don't" },
        {
          kind: "p",
          text: "One 2026-specific note: prototypes have gotten dramatically cheaper because vendors themselves now build with coding agents. The demo that took a month of hand-coding in 2024 takes days. Production hardening — guardrails, failure modes, audit trails, the eval suite — has not gotten cheaper at anything like the same rate, which is why the gap between an $8,000 prototype and a $40,000 production build keeps widening. Treat an impressive cheap demo as evidence that a vendor can start, not that they can finish.",
        },
      ],
    },

    {
      id: "run-cost",
      title: "The monthly bill: tokens, hosting, maintenance",
      tocLabel: "Monthly run cost",
      blocks: [
        {
          kind: "p",
          text: "**Build cost gets all the attention; run cost decides whether the agent survives.** Budget four line items from day one.",
        },
        {
          kind: "table",
          head: ["Line item", "Typical SMB range / month", "What moves it"],
          rows: [
            [
              "LLM tokens",
              "$50–500 for internal agents; $500–5,000+ customer-facing",
              "Task volume, context size, model tier. At publication, frontier APIs price input at a few dollars per million tokens; smaller models run 5–20× cheaper",
            ],
            [
              "Hosting & infrastructure",
              "$20–300",
              "Vendor cloud vs your VPC vs on-premise; queues, databases, vector stores",
            ],
            [
              "Monitoring & evals",
              "$0–200",
              "Logging, tracing, and a regression suite that runs before every model or prompt change",
            ],
            [
              "Maintenance retainer",
              "$500–3,000",
              "Who fixes it when an API changes or a model is deprecated; response-time guarantees",
            ],
          ],
        },
        {
          kind: "p",
          text: "Token math is worth doing once, honestly. Say an agent processes 2,000 tasks a month, and each task — context, retrieved documents, a couple of reasoning steps — burns 50,000 tokens. That's 100 million tokens a month: a few hundred dollars on a frontier model, and well under a hundred if most traffic routes through a smaller model with the frontier one reserved for hard cases. Model routing is the single biggest lever on the run bill, and it's a build-time decision — ask your vendor about it before the build, not after the first invoice.",
        },
        {
          kind: "p",
          text: "The retainer is the item buyers try hardest to cut, and it's the one that keeps the agent alive. It isn't 'support' in the hotline sense — it's someone re-running the eval suite when the model provider ships an update, fixing the integration when your CRM changes its API, and adjusting prompts when your own process changes. An agent without it degrades the way an unmaintained website does: slowly, then suddenly.",
        },
        {
          kind: "note",
          title: "The sanity check that cuts through pricing fog",
          text: "Compute cost per completed task and put it next to the loaded cost of a human doing the same task. An agent at $0.15 per processed document next to a human at $4 per document is a conversation worth having. An agent at $3.80 is not — yet.",
        },
      ],
    },

    {
      id: "build-vs-buy",
      title: "No-code vs SaaS seats vs custom: the actual math",
      tocLabel: "No-code vs SaaS vs custom",
      blocks: [
        {
          kind: "p",
          text: "**Custom is not the default answer — most workflows shouldn't be custom builds.** There are three ways to buy agent capability in 2026, and each is the right answer for something.",
        },
        {
          kind: "table",
          head: ["Option", "Upfront", "Monthly", "Right when", "Breaks down when"],
          rows: [
            [
              "**DIY no-code** — Zapier, Make or n8n plus an LLM API",
              "$0 beyond your own time",
              "$20–500 in plan and API fees",
              "The workflow is linear — trigger, transform, deliver — and you want to learn what agents can do",
              "Branching logic, error handling, permissions, anything writing to systems of record. Maintenance quietly becomes a part-time job",
            ],
            [
              "**SaaS per seat or per usage** — Microsoft 365 Copilot, ChatGPT Team, vertical agents like Intercom Fin",
              "$0",
              "Roughly $20–40 per seat; usage-priced tools charge around $1 per resolution (at publication)",
              "Your workflow matches what the product was built for and you want value this week",
              "You need your data model, your business rules, your systems. Configurability ends exactly where your process stops being generic",
            ],
            [
              "**Custom build**",
              "$15,000–50,000+ for production",
              "$500–2,000 run cost plus retainer",
              "The workflow is core to the business, volume is high, and the systems are non-standard — ERP, industry software, marketplaces",
              "Volume is low, the process changes monthly, or a SaaS already covers 90% of it",
            ],
          ],
        },
        {
          kind: "p",
          text: "The comparison people actually want — 'custom agent vs Copilot seats' — is mostly a category error. Per-seat assistants make each employee somewhat faster at everything; a custom agent takes one workflow off people entirely. In practice they're complements, not substitutes. The break-even that matters is against the labor inside the workflow itself:",
        },
        {
          kind: "p",
          text: "**Payback months = build cost ÷ (monthly hours saved × loaded hourly rate − monthly run cost).**",
        },
        {
          kind: "p",
          text: "Plug in illustrative numbers — these are made up to show the shape of the math, not a case study. A back office spends 400 hours a month processing supplier documents at a $20 loaded hourly rate: $8,000 a month. An agent takes 70% of the volume, humans review the rest: $5,600 a month saved. Against a $35,000 build and $1,200 in monthly run cost, payback lands around eight months, and every month after that returns $4,400. Now run it with your numbers — that formula is worth more than any market range in this article.",
        },
        {
          kind: "p",
          text: "And take a negative result seriously. If the workflow burns 40 hours a month, the same arithmetic gives a payback measured in years — and the honest recommendation is a $30 SaaS subscription or a Zapier flow. A vendor who quotes you a custom build anyway is optimizing for their invoice, not your outcome.",
        },
      ],
    },

    {
      id: "hidden-costs",
      title: "The hidden costs nobody puts in the proposal",
      tocLabel: "Hidden costs",
      blocks: [
        {
          kind: "p",
          text: "**These line items show up in year one and almost never in the quote.** None of them is a reason not to build — all of them are reasons to budget honestly.",
        },
        {
          kind: "ul",
          items: [
            "**Prompt drift.** Model providers update their models continuously, and behavior shifts in ways release notes don't capture: an agent that formatted output correctly for six months starts doing something subtly different. Without a regression eval suite, your users become the eval suite. Building one is real work — a meaningful slice of any serious budget — and it's the least skippable part.",
            "**Model deprecations.** API models get retired on roughly 6–18 month cycles across providers. Migration is not 'change one string': behavior differs between versions, so everything needs re-testing. Budget one migration a year, and ask whether it's covered by the retainer or billed extra — answers to that question vary more than any other.",
            "**Integration breakage.** The agent sits downstream of every system it touches. Your CRM deprecates an API version, an admin renames a field in the ERP, the marketplace tightens rate limits — the agent breaks through no fault of its own. This is most of what a maintenance retainer actually pays for.",
            "**The data-readiness tax.** The most common surprise cost isn't AI at all: it's discovering that the agent needs data living in someone's inbox, or that two systems disagree about what a 'customer' is. Untangling that can quietly eat a third of a first project's budget. In fairness, the cleanup is an asset that outlives the agent.",
            "**Human review time.** A draft-first agent — the right design for anything touching money or customers — turns operators into reviewers. Reviewing is far faster than doing, but it isn't free, and pretending it's zero flatters the ROI math. Put it in the model.",
            "**The tail you shouldn't automate.** Getting from 80% to 95% automation routinely costs more than getting from zero to 80%. The remaining cases are rare, weird and high-stakes — exactly what humans are good at and agents are not. The cheapest correct solution for the tail is usually a clean escalation path, not more engineering.",
          ],
        },
      ],
    },

    {
      id: "pilot-first",
      title: "How to find out cheaply: pilot before you commit",
      tocLabel: "Pilot before committing",
      blocks: [
        {
          kind: "p",
          text: "**The only reliable way to price an agent for your business is to run one on your workflow — everything else is estimation.** The good news: a pilot that genuinely answers the question is cheap and fast. What it needs is discipline, not budget.",
        },
        {
          kind: "ol",
          items: [
            "**Pick one workflow, not a vision.** Frequent (daily, not quarterly), describable as rules with known exceptions, measurably costly. 'Answer supplier status emails' qualifies. 'Transform our operations with AI' does not.",
            "**Measure the baseline first.** Hours spent, error rate, turnaround time — this week, before any AI is involved. Without a baseline the pilot cannot fail, and a pilot that cannot fail proves nothing.",
            "**Write kill criteria upfront.** Put numbers on 'no': accuracy below X%, escalation rate above Y%, cost per task above the human's. Deciding after you've seen the results means deciding by vibes.",
            "**Run on real data in shadow mode.** The agent drafts, humans keep executing, you compare outputs. Demo data hides exactly the mess that determines the real cost.",
            "**Decide on the numbers.** If it clears the bar, you now know scope, volume and error profile — enough to price a production build within a tight range instead of a guess. If it doesn't, you've spent two weeks and learned the actual shape of your workflow. Both outcomes beat a signed six-figure estimate.",
          ],
        },
        {
          kind: "p",
          text: "This logic is why we run [free two-week pilots](/services/ai-assistant/) at Vento Labs: an agent on your workflow, on your data, against a measured baseline — before anyone discusses a build contract. It moves the risk of the estimate from your budget to ours, which is where it belongs: we're the ones claiming it will work. Our [case studies](/cases/) show what came out the other end of that funnel.",
        },
        {
          kind: "note",
          title: "What a pilot proves — and what it doesn't",
          text: "Two weeks proves the workflow is automatable and produces real error and volume numbers. It does not prove production readiness: guardrails, permissions and failure handling are precisely what the build is. Distrust any pilot that ends with 'it works — ship it Monday.'",
        },
      ],
    },

    {
      id: "vendor-questions",
      title: "Ten questions to ask any vendor — including us",
      tocLabel: "Questions for vendors",
      blocks: [
        {
          kind: "p",
          text: "**A serious builder answers all ten without flinching.** You're listening for specifics, not reassurance.",
        },
        {
          kind: "ol",
          items: [
            "**What exactly does this price include — and what's the first thing that costs extra?** The gap between the quote and year-one spend usually hides in the second half of that question.",
            "**Who owns the code, prompts and evals if we part ways?** The only acceptable answer is: you do, with a documented handover. Anything else is rent dressed up as a build.",
            "**What happens when the model behind this is deprecated?** They should describe a migration process and say whether it's inside the retainer. A blank look here is a preview of your year-two invoice.",
            "**Show me your eval suite.** Not the demo — the tests. How do you know it still works after a prompt change? 'We check manually' means you will be the one checking.",
            "**What does the agent do when it isn't sure?** The right answer involves confidence thresholds and escalation to a human. 'It's very accurate' is not an answer.",
            "**What has to happen before the agent can write to my systems?** Listen for review flows, permissions, dry runs and audit logs. If it writes to production from day one, walk away.",
            "**What will my token bill be at my volume?** A good vendor asks about your volume and context sizes before answering. A number produced without questions is a number made up.",
            "**Which part of my workflow would you refuse to automate?** Every real workflow has a tail that shouldn't be automated. A vendor who can't find one is selling, not scoping.",
            "**Can I talk to a client who's been in production for six months or more?** Month six is when drift, deprecations and integration breakage have all had a chance to show up.",
            "**How did your last comparable project's final cost compare to its quote?** Honest vendors have an honest answer, because overruns happen. 'We always hit the estimate' is itself the red flag.",
          ],
        },
      ],
    },
  ],

  faqTitle: "FAQ",
  faqLede: "Short answers to what buyers ask most often.",
  faq: [
    {
      q: "How much does a custom AI agent cost in 2026?",
      a: "Market ranges as of July 2026: a working prototype runs $5,000–15,000, a production agent automating one workflow runs $15,000–50,000, and a multi-system agent with review flows and audit logs runs $50,000–150,000 or more. Where a project lands inside those ranges depends on integrations, data quality, guardrail requirements and the vendor's rate card. Add a monthly run cost — typically $500–2,000 for an SMB — because the build price is never the whole price.",
    },
    {
      q: "What does it cost to run an AI agent per month?",
      a: "Four line items: LLM tokens (tens to hundreds of dollars for internal agents, potentially thousands for high-volume customer-facing ones), hosting ($20–300 unless compliance forces private infrastructure), monitoring and evals, and a maintenance retainer ($500–3,000 in the market). The retainer is the item to keep: it covers model migrations, prompt regressions and integration fixes. All figures are market ranges at the time of publication, July 2026.",
    },
    {
      q: "Is a custom AI agent worth it compared to ChatGPT or Copilot seats?",
      a: "They solve different problems. Per-seat assistants — roughly $20–40 per user per month at publication — make each employee somewhat faster at everything, while a custom agent takes one workflow off people entirely, so in practice they're complements rather than substitutes. Run the payback formula: build cost divided by monthly labor savings minus run cost. If it clears 12–18 months, custom is defensible; if not, buy seats or use no-code. Many workflows honestly don't justify a build.",
    },
    {
      q: "How long does it take to build a custom AI agent?",
      a: "A prototype on real data takes one to three weeks. A production agent for a single workflow takes four to ten weeks, with most of that spent on error handling, permissions and integration hardening rather than the AI itself. Multi-system agents run two to six months. A vendor promising production in a week is describing a prototype with a production price tag.",
    },
    {
      q: "What are the hidden costs of AI agents?",
      a: "Five recur across projects: prompt drift when model providers ship updates (which makes a regression eval suite mandatory), forced migrations as models are deprecated on roughly 6–18 month cycles, integration breakage when connected systems change their APIs, a data-readiness tax that can eat a third of a first project, and human review time in draft-first designs. None is avoidable. All are budgetable — if the vendor is honest about them upfront.",
    },
    {
      q: "Can I build an AI agent myself with no-code tools?",
      a: "For linear workflows, yes. Zapier, Make or n8n plus an LLM API costs $20–500 a month and is the right answer for trigger-transform-deliver automation. The limits arrive with branching logic, error handling and writing to systems of record: there's no real permissions or audit layer, and maintenance quietly becomes a part-time job. A reasonable path is to prototype in no-code to learn your workflow's actual shape, then decide whether the volume justifies a proper build.",
    },
    {
      q: "How can I test an AI agent before paying for a full build?",
      a: "Run a shadow-mode pilot: one workflow, real data, a measured baseline, and kill criteria written down before you start. Two weeks is enough to learn accuracy, escalation rate and cost per task — the numbers a production quote should be built on. This is exactly the shape of the free two-week pilot we run at Vento Labs: the risk of the estimate sits with the vendor rather than with your budget.",
    },
  ],

  cta: {
    eyebrow: "Vento Labs",
    title: "Price it with a pilot, not a proposal",
    text: "We build custom AI agents on top of ERPs, accounting systems and marketplaces — with review flows before anything writes to your data. The first two weeks are free: your workflow, your data, a measured baseline, and kill criteria you set. If the numbers don't clear the bar, you'll know for the cost of a few review hours — and we'll be the ones to say so.",
    primaryLabel: "Book a 30-minute call",
    primaryHref: "#book",
    secondaryLabel: "See the case studies",
    secondaryHref: "/cases/",
  },

  stubs: {
    ru: {
      eyebrow: "Гайд · Цены на AI-агентов",
      h1: "Сколько стоит кастомный AI-агент в 2026 году: честный разбор",
      paragraphs: [
        "Разбор для тех, кто выбирает между no-code, SaaS-подписками и заказной разработкой. Внутри: пять факторов, из которых складывается цена агента (объём задач, интеграции, состояние данных, guardrails, хостинг), рыночные вилки на разработку — от прототипа до production-агента с ревью-флоу — и на ежемесячную эксплуатацию, таблица сравнения трёх подходов с формулой окупаемости, скрытые расходы от дрейфа промптов до депрекации моделей и десять вопросов любому подрядчику.",
        "Гайд опубликован на английском — на языке рынка, о ценах которого идёт речь. Все цифры — открытые рыночные вилки на июль 2026 года, не наш прайс-лист.",
      ],
      ctaPrimary: "Читать гайд (на английском)",
      ctaSecondary: "Все гайды",
    },
    de: {
      eyebrow: "Guide · Kosten von KI-Agenten",
      h1: "Was kostet ein maßgeschneiderter KI-Agent 2026? Eine ehrliche Aufschlüsselung",
      paragraphs: [
        "Ein Leitfaden für alle, die zwischen No-Code, SaaS-Abos und Individualentwicklung abwägen. Darin: die fünf Faktoren hinter jedem Angebot (Umfang, Integrationen, Datenqualität, Guardrails, Hosting), Marktpreisspannen für die Entwicklung — vom Prototyp bis zum Production-Agenten mit Review-Flows — und für den monatlichen Betrieb, eine Vergleichstabelle der drei Ansätze mit Break-even-Formel, versteckte Kosten von Prompt-Drift bis Modell-Deprecation sowie zehn Fragen an jeden Anbieter.",
        "Der Guide erscheint auf Englisch — in der Sprache des Marktes, um dessen Preise es geht. Alle Zahlen sind öffentliche Marktspannen mit Stand Juli 2026, keine Preisliste von Vento Labs.",
      ],
      ctaPrimary: "Guide lesen (auf Englisch)",
      ctaSecondary: "Alle Guides",
    },
    es: {
      eyebrow: "Guía · Costes de agentes de IA",
      h1: "Cuánto cuesta un agente de IA a medida en 2026: un desglose honesto",
      paragraphs: [
        "Una guía para quien compara no-code, suscripciones SaaS y desarrollo a medida. Dentro: los cinco factores que determinan cualquier presupuesto (alcance, integraciones, estado de los datos, guardrails, hosting), rangos de mercado para el desarrollo — del prototipo al agente en producción con flujos de revisión — y para la operación mensual, una tabla comparativa de los tres enfoques con fórmula de retorno, los costes ocultos — del prompt drift a la retirada de modelos — y diez preguntas para cualquier proveedor.",
        "La guía está publicada en inglés, el idioma del mercado cuyos precios analiza. Todas las cifras son rangos públicos de mercado a julio de 2026, no nuestra lista de precios.",
      ],
      ctaPrimary: "Leer la guía (en inglés)",
      ctaSecondary: "Todas las guías",
    },
  },
};
