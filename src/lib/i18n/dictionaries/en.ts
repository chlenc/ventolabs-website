import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: { htmlLang: "en", ogLocale: "en_US" },

  site: {
    description:
      "We design and build AI agents that cut operating costs, automate operations, and scale your business without adding headcount.",
  },

  seo: {
    homeTitle: "AI Agents & Automation for Business | Vento Labs",
    homeDescription:
      "Custom AI agents that cut operating costs, automate workflows, and scale your business without new headcount. Free AI agent build with every engagement.",
    titleTemplate: "%s | Vento Labs",
    casesTitle: "AI Agent Case Studies — Content, Supplier & 1C Automation",
    casesDescription:
      "What we build and ship: an e-commerce content factory, a supplier-operations agent, a permissioned AI layer over 1C, and ArbitrAI — our own legaltech product.",
    privacyTitle: "Privacy Policy",
    privacyDescription: "Privacy Policy for Vento Labs — how we handle your data.",
    termsTitle: "Terms of Use",
    termsDescription: "Terms of Use for Vento Labs AI automation services.",
    keywords: [
      "AI agents for business",
      "AI automation agency",
      "custom AI agents",
      "AI process automation",
      "enterprise AI solutions",
      "AI business assistant",
      "AI workflow automation",
      "business AI implementation",
      "AI chatbot for business",
      "automate business operations with AI",
      "AI agent development company",
      "reduce operating costs AI",
    ],
  },

  nav: {
    links: [
      { label: "AI Agents", href: "/services/ai-assistant" },
      { label: "Automation", href: "/services/ai-automation" },
      { label: "Consulting", href: "/services/ai-training" },
      { label: "AI Platform", href: "/services/ai-workspace" },
      { label: "Data centers", href: "/data-centers" },
      { label: "Cases", href: "/cases" },
      { label: "Guides", href: "/blog" },
    ],
    cta: { label: "Book a call", href: "#book" },
    openMenu: "Open menu",
    giftAria: "Free AI agent",
    languageLabel: "Language",
  },

  hero: {
    badge: "Free 2-week pilot — we build your first AI agent at no cost",
    line1: "We design & build",
    line2: "AI agents",
    line3: "that grow your business",
    tags: [
      "Self-hosted — your data stays in your infrastructure",
      "Built on Claude Agent SDK and open frameworks",
      "Live in days, not months",
    ],
    desc: "Custom AI agents and automations that handle your repetitive work — so your team focuses on growth instead of busywork.",
    sub: "Book a 30-minute call — we scope the use case and build your first agent for free.",
    ctaPrimary: "Book a free call",
    ctaSecondary: "Our services",
    scroll: "Scroll",
    imageAlt:
      "A company back office: desks of printed order forms, archive boxes and spreadsheets on screen — the manual work an AI agent takes over.",
    imageCaption:
      "This is what we automate: order forms, supplier emails, spreadsheet updates and the same questions answered by hand every day.",
  },

  problem: {
    eyebrow: "The Problem",
    heading: "Sound familiar?",
    items: [
      "Your team wastes hours on repetitive tasks — answering the same questions, searching for info, compiling reports manually",
      "Leads and requests slip through the cracks between chats, spreadsheets, and email threads",
      "You tried AI tools — your team played around for a week and went back to doing things the old way",
      "There's no clear process for adopting AI — everyone does their own thing, with inconsistent results",
    ],
  },

  solution: {
    eyebrow: "How We Work",
    heading: "From audit to results in weeks, not months",
    lead: "Three phases, zero fluff. We start small, prove value, then scale — so you're never stuck paying for something that doesn't work.",
    steps: [
      { id: "audit", title: "Audit", description: "We analyze your key processes in a 30-minute call. No fluff — we identify where AI can save the most time and money right now.", imageAlt: "A process map drawn by hand on paper during a discovery call, with three steps circled as automation candidates." },
      { id: "build", title: "Build", description: "We set up your first AI agent — connected to your tools, knowledge base, and workflows. You see a working solution in days, not months.", imageAlt: "A build desk: the agent's code on one screen, the chat channel it answers in on the other." },
      { id: "scale", title: "Scale", description: "We expand automation across your operations by priority. Each iteration has clear KPIs, and we support you as your needs evolve.", imageAlt: "An operations dashboard across three screens, tracking every running agent against its KPIs." },
    ],
  },

  services: {
    eyebrow: "What We Do",
    heading: "Four ways we help your business work smarter",
    lead: "We cover the full cycle — from idea to production release. Every engagement starts with a free AI agent, so you see value before you commit.",
    crossEyebrow: "Also from Vento Labs",
    crossLinks: [
      {
        id: "data-centers",
        title: "AI data centers",
        description:
          "A separate practice for investors and owners: we develop AI data centers end to end — configuration, land next to transmission capacity, grid interconnection, modular construction and commissioning. From 10 to 100+ MW.",
        cta: "See the data center practice",
      },
      {
        id: "blog",
        title: "Engineering guides",
        description:
          "How this actually gets built — what a custom agent costs, how long integrations take, connecting agents to 1C and marketplaces, and where autonomy still needs a human in the loop.",
        cta: "Read the guides",
      },
    ],
  },

  leadMagnet: {
    giftLabel: "FREE AI ASSISTANT",
    title: "Book a call — we'll set up your AI agent for free",
    items: [
      "Custom AI agent deployed for your team",
      "Connected to your knowledge base — docs, FAQ, internal guides",
      "Short training session so your team can start using it immediately",
      "Infrastructure costs are on your account — fully transparent",
    ],
    cta: "Claim your free AI agent",
  },

  roi: {
    eyebrow: "Why AI Works",
    heading: "Research-backed results from real studies",
    lead: "These numbers come from peer-reviewed academic research and controlled experiments — not marketing claims.",
    cards: [
      { source: "Stanford & MIT, 2023", stat: "+14%", statLabel: "productivity", description: "Customer support agents with an AI assistant showed 14% higher productivity on average — and up to 34% for new hires.", sample: "Controlled study of 5,179 agents across a Fortune 500 company" },
      { source: "Science, 2023", stat: "–40%", statLabel: "time on tasks", description: "Professionals using AI for writing tasks completed them 40% faster with 18% higher quality ratings.", sample: "Randomized experiment with 453 professionals across industries" },
      { source: "GitHub & Microsoft, 2022", stat: "~56%", statLabel: "faster coding", description: "Developers using AI coding tools completed tasks significantly faster in controlled experiments.", sample: "Controlled experiment measuring task completion speed" },
    ],
    disclaimer: "Every business is different. These are peer-reviewed research benchmarks, not guarantees. We measure your actual results during implementation.",
  },

  security: {
    eyebrow: "Security",
    heading: "Your data is protected. We take this seriously.",
    items: [
      { title: "No training on your data", description: "We use API-level access only. Your business data is never used to train AI models." },
      { title: "Full transparency", description: "Everything runs on your own accounts. You see every cost, every API call, every access log." },
      { title: "Access controls from day one", description: "Role-based permissions, audit trails, and clear boundaries for what the AI can and cannot do." },
      { title: "Strict guardrails by design", description: "Every agent operates within an explicit scope: what it can read, what it can write, and what always requires human approval. Out-of-scope actions are blocked, not just discouraged." },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Frequently asked questions",
    items: [
      { q: "Will the AI make things up or hallucinate?", a: "We configure every agent to answer strictly from your approved knowledge base. If it doesn't know something, it says so and routes the question to a human. We also fine-tune and test accuracy before launch." },
      { q: "What data goes to external AI models?", a: "Only the data you explicitly allow. We use business-tier API access where your data is not used for model training. We can also set up self-hosted models for maximum control if your compliance requires it." },
      { q: "How much does it cost to run monthly?", a: "Typical AI model costs are $20–200/month depending on usage volume. We give you a detailed cost estimate before starting, and you pay providers directly — no markups." },
      { q: "How long does implementation take?", a: "A basic AI agent launches in 3-7 days. Process automation workflows take 1-3 weeks. Enterprise workspace setup is typically 2-4 weeks. You always get a working solution first." },
      { q: "Can we stop after the first setup?", a: "Yes — there's no lock-in or long-term commitment. The free pilot stays live so you can keep evaluating it; if you continue with any paid engagement, everything we built transfers to you, including code and configurations. Many clients start small and come back when they're ready to automate more." },
      { q: "Do you work with our industry?", a: "Our approach works across industries — the AI tools are flexible and we customize the knowledge base, workflows, and policies to your specific needs. We've worked with professional services, e-commerce, SaaS, and consulting firms." },
    ],
  },

  finalCta: {
    eyebrow: "Start here",
    heading: "Start with a free AI agent — book a call today",
    description: "30-minute discovery call. No pitch, no pressure. We'll build and deploy your AI agent for free.",
    cta: "Claim your free AI agent",
  },

  exitPopup: {
    title: "Wait — free AI agent for your business",
    description: "Book a 30-minute call and we'll build and deploy a custom AI agent for your team. Zero cost for the setup.",
    cta: "Claim your free AI agent",
  },

  giftPopup: {
    title: "🎁 Free AI Agent",
    description: "Book a discovery call and we'll set up a custom AI agent for your business — completely free.",
    cta: "Book a free call",
  },

  founder: {
    eyebrow: "Who you'll talk to",
    heading: "No sales team. You talk to the person who builds your agent.",
    name: "Alexey Nagorny",
    role: "Founder & Lead Engineer, Vento Labs",
    bio: "Alexey has spent 10+ years building production software and now designs AI agents on Claude Agent SDK, LangGraph, and n8n for companies in e-commerce, SaaS, and professional services. Every discovery call, architecture decision, and deployment goes through him — no account managers in between.",
    points: [
      "Personally scopes and builds every pilot",
      "Answers within one business day — email or Telegram",
      "Vento Labs Pte. Ltd. — registered in Singapore, working remotely from Lisbon",
    ],
    note: "Prefer async? Skip the call and write directly:",
  },

  leadForm: {
    heading: "Not ready for a call?",
    subheading: "Tell us what you'd like to automate — we'll reply with a concrete plan and an estimate within one business day.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Work email",
    emailPlaceholder: "you@company.com",
    messageLabel: "What would you like to automate?",
    messagePlaceholder: "E.g. we spend hours a day answering the same customer questions…",
    submit: "Send request",
    sending: "Sending…",
    success: "Thanks — your request is in. We'll reply within one business day.",
    error: "We couldn't submit that automatically. Click below to send it as an email instead — everything's already filled in.",
    mailtoCta: "Send as email",
    privacyNote: "No newsletters, no spam — we only reply to your request.",
  },

  casesIntro: {
    eyebrow: "Case Studies",
    heading: "AI systems we build — and the results they produce",
    lead: "Solutions you can launch, and the product we built, shipped and run ourselves.",
    description: "Four productized solutions — a content factory, a supplier-operations agent, a permissioned AI layer over 1C, and a bankruptcy legaltech platform — plus ArbitrAI, the legaltech product we built, shipped and run ourselves. Every number on this page says where it came from.",
    homeHeadingLead: "Three AI systems",
    homeHeadingEm: "we build",
    homeHeadingTail: "for operations.",
    homeCardMetrics: { contentFactory: "SKU → flow", supplierAgent: "Chaos → structure", erpAgent: "Safe by role" },
  },

  cases: {
    records: {
      "content-factory": {
        industry: "E-commerce / Marketplaces",
        title: "Turn your catalog into a stream of content that sells every day",
        challenge: "While your product lives only inside the card, the buyer has already decided — in the feed, a board, a short video, a useful carousel, an inspirational set. Manual content production can't keep up with the rhythm of e-commerce: too slow, too expensive, too few angles per SKU.",
        solution: "The Content Factory turns every product into a system of content angles. From one catalog unit you get a pack of scenarios you can publish, test and scale — lifestyle visuals, carousels, short videos, AI presenters, versions for product cards and ads — all in one brand voice.",
        result: "Lifestyle visuals from your references and product photos. Carousels with a real hook: recipes, how-tos, sets, comparisons, use cases. Short videos and AI presenters for product demos. Versions for product cards, rich content, ads and social-first formats. Consistent brand identity at high volume with a clear publishing flow.",
        metrics: [
          { value: "Lifestyle", label: "visuals from product photos" },
          { value: "Carousels", label: "how-tos, sets, use cases" },
          { value: "Video", label: "AI presenters & demos" },
        ],
      },
      "supplier-agent": {
        industry: "Supplier Operations",
        title: "Suppliers write in chaos. Your catalog should respond with structure.",
        challenge: "When product, price and stock data live across email, chats and files, your catalog always lags. You sell wrong availability, react slower to price changes, waste time on manual copy-pasting, and keep managers in permanent firefighting mode.",
        solution: "The Supplier Agent reads incoming emails, messages, price lists, spreadsheets and files from suppliers, extracts SKUs, stock, prices and lead times, stores everything in your database or CRM, and triggers catalog updates by your rules — with clear approval routes for exceptions.",
        result: "Ingestion from email, chats, files and other inbound channels. Extraction of SKUs, prices, stock, lead times, MOQs. Normalization and matching against your catalog. Rule-based updates to site, CRM, DB or internal systems. Approval flows for disputed changes. A single pane of glass for supplier data and change history.",
        metrics: [
          { value: "Email + Chat", label: "into a structured catalog" },
          { value: "Auto updates", label: "by rules, with approvals" },
          { value: "Single view", label: "of supplier data & changes" },
        ],
      },
      "erp-agent": {
        industry: "Enterprise / 1C",
        title: "Work with 1C in the language of business — without risking the core",
        challenge: "Every change in 1C queues behind the dev team, requires manual requirements handoff, and carries a risk of breaking the standard configuration. Managers don't need access to everything — they need fast, safe actions within their role.",
        solution: "We build a permission-based AI layer over 1C on Claude. For developers — accelerated change: prompts, plans, extensions, review-friendly diffs. For managers — a clear interface for allowed actions over data, with no access to the architecture or critical settings.",
        result: "Developer mode: prompts, change plans, extension preparation, review-friendly diffs. Manager mode: read, search, create and update data within allowed objects. Separate roles and access per user type. Action approval before write or publish. Change journal and transparent audit. 1C integration via approved tools and access scenarios.",
        metrics: [
          { value: "Developer mode", label: "prompt → plan → ext → review" },
          { value: "Manager mode", label: "read & write within role" },
          { value: "Full audit", label: "journal & approvals" },
        ],
      },
      "bankruptcy-agent": {
        industry: "LegalTech / Bankruptcy",
        title: "AI platform for arbitration trustees — RU market (page in Russian)",
        challenge: "Russian arbitration trustees («арбитражные управляющие») drown in procedural paperwork: reports to the creditors' meeting, motions, claims to challenge transactions, and dozens of EFRSB publications. Deadlines under 127-FZ and APC are strict, Supreme Court practice updates faster than teams can track, and debtor information is scattered across email, bank statements and tax-authority responses.",
        solution: "Bankruptcy AI — a platform deployed in your perimeter. It drafts procedural documents with citations to fresh Supreme Court practice, watches 127-FZ and APC deadlines, parses statements and government responses, builds the debtor's affiliation map and surfaces challengeable transactions under arts. 61.2 and 61.3 of 127-FZ.",
        result: "Daily mode: reports, motions and correspondence — 3–5x faster. Deep mode: due-diligence on debtor transactions, affiliation map, Supreme Court practice retrieval. Deadline control, audit trail, EFRSB publications. Self-hosted, NDA on day one, free demo on a single real case.",
        metrics: [
          { value: "−68 h/mo", label: "freed per trustee" },
          { value: "×3–5", label: "faster documents" },
          { value: "127-FZ + APC", label: "deadline control" },
        ],
      },
      arbitrai: {
        industry: "LegalTech · Bankruptcy",
        title: "ArbitrAI — our own AI platform for bankruptcy trustees: deadline control, AI documents, legal analytics",
        challenge: "A bankruptcy trustee runs 20–300 cases at once. Daily deadline monitoring takes 2–3 hours, one missed statutory publication risks disqualification, and routine court filings consume hours of highly-paid time.",
        solution: "A product Vento Labs built and launched together with a practicing trustee: automatic deadline calculation under the Russian insolvency law with Telegram alerts, AI-drafted publications and notices, transaction analysis for clawback claims. Integrated with the court and registry systems (KAD, EFRSB); data hosted in-country for compliance. Every AI output ships as a draft for human review — never auto-filed.",
        result: "Daily deadline monitoring dropped from 2–3 hours to under 20 minutes, 99.9% of statutory registry filings now go out on time, and document prep is 6× faster. Live at arbitrai.tech — our own product for the Russian legaltech market.",
        imageAlt: "An open archival document box holding a row of blank filing dividers, precisely aligned, one tab in dark green.",
        metrics: [
          { value: "2–3 h → 20 min", label: "daily deadline monitoring" },
          { value: "99.9%", label: "publications filed on time" },
          { value: "6×", label: "faster document prep" },
        ],
        metricsSource: "Source: Vento Labs’ own measurements on ArbitrAI (arbitrai.tech). Our product, our figures — not an independent audit.",
      },
    },
    sectionLabels: { challenge: "Challenge", solution: "Solution", result: "Result" },
    readyHeading: "Want one of these on your operation?",
    readyDesc: "Book a call — we'll set up your AI agent for free.",
    readyCta: "Book a free call",
  },

  servicesCommon: {
    heroCta: "Book a free call",
    heroSecondary: "What's included",
    problemEyebrow: "The Problem",
    problemHeading: "Sound familiar?",
    guideGet: "We get it",
    guideTrackRecord: "Our track record",
    howItWorksEyebrow: "How It Works",
    howItWorksHeading: "Three steps to get started",
    deliverablesEyebrow: "Deliverables",
    deliverablesHeading: "What's included",
    deliverablesNote: "Concrete deliverables. The free pilot covers your first working agent; the full list below ships in a paid engagement — fixed quote after the discovery call.",
    resultsEyebrow: "Results",
    resultsHeading: "What you can expect",
    stakesEyebrow: "The cost of waiting",
    socialProofEyebrow: "Client result",
    bookFreeGiftLabel: "FREE AI AGENT",
    bookFreeHeading: "Book a call — we'll set up your AI agent for free",
    bookFreeSubtitle: "30-minute discovery call. No pitch, no pressure.",
    bookFreeCta: "Claim your free AI agent",
    faqSuffix: "FAQ",
    nextEyebrow: "Keep going",
    nextHeading: "Where to go next",
    nextCta: "Open",
  },

  services_pages: {
    "ai-assistant": {
      title: "AI Agents",
      kicker: "Personal & Business AI",
      navLabel: "AI Agents",
      heroTitle: "Your own AI agent that works 24/7 — self-hosted, secure, fully yours",
      heroDescription: "We build custom AI agents powered by Claude Agent SDK, LangGraph, CrewAI, and other leading frameworks. Self-hosted on your server or local machine. Controls your computer, uses any LLM — even local models. Manages Telegram, LinkedIn, WhatsApp, email, and any tool you use daily.",
      cardSummary: "Custom AI agents — self-hosted, secure, powered by Claude Agent SDK, LangGraph, CrewAI. From personal assistants to full business automation.",
      problems: [
        "You spend hours every day on repetitive communication — answering emails, Telegram messages, LinkedIn DMs, and qualifying leads manually",
        "Your knowledge is scattered across docs, chats, and your own head — every new request requires you to search, remember, and retype the same answers",
        "You've tried ChatGPT and Perplexity, but they don't connect to your tools, don't remember context, and can't take action on your behalf",
        "You're paying for AI subscriptions your team barely uses because nobody set up the right workflows",
      ],
      guide: {
        empathy: "We've been there — drowning in messages while the real work waits. AI should be doing this, not you.",
        authority: "We've deployed 50+ custom AI agents for businesses across industries using battle-tested open-source frameworks.",
      },
      plan: [
        { title: "Define", description: "We map your daily tasks and identify the highest-impact workflows to automate. 30-minute call." },
        { title: "Build", description: "We deploy your custom AI agent — self-hosted, connected to your tools, trained on your knowledge base. Ready in days." },
        { title: "Evolve", description: "Your agent learns and improves. We add new capabilities as your needs grow — new integrations, new workflows, new skills." },
      ],
      included: [
        "Custom AI agent built on Claude Agent SDK, LangGraph, or CrewAI",
        "Self-hosted deployment — your server, your VPS, or your local machine",
        "Any LLM backend — Claude, GPT, Llama, Mistral, or local models",
        "Telegram, WhatsApp, LinkedIn, and email integration",
        "Computer control capabilities — browse, click, fill forms, extract data",
        "Knowledge base connection — your docs, FAQ, CRM, databases",
        "Lead generation and outreach automation",
        "Automated report generation and data analysis",
        "Team training session on working with your agent",
        "30 days of support, monitoring, and fine-tuning",
      ],
      outcomes: [
        "Hours of repetitive communication eliminated every day",
        "Leads captured and qualified automatically across all channels",
        "Your knowledge base works for you 24/7 — instant answers, zero searching",
        "Full control over your data — self-hosted, no vendor lock-in",
      ],
      stakes: "Every day without an AI agent is a day you're doing work a machine should handle. Your competitors are already automating — the gap grows wider every month.",
      faq: [
        { q: "What frameworks do you use?", a: "We build on Claude Agent SDK, LangGraph, CrewAI, and other leading open-source frameworks. We pick the best tool for your specific use case — there's no one-size-fits-all." },
        { q: "Can it really control my computer?", a: "Yes. Using computer-use capabilities, the agent can browse websites, fill forms, extract data, manage files, and interact with any application — just like a human assistant would." },
        { q: "What about data privacy?", a: "Your agent runs on your infrastructure — your server, your VPS, or even your office machine. Data never leaves your environment. You can use fully local LLMs for maximum privacy." },
        { q: "Which messengers and platforms are supported?", a: "Telegram, WhatsApp, LinkedIn, email (Gmail, Outlook), Slack, and any platform with an API. We can also add custom integrations." },
        { q: "How long does it take to build?", a: "A basic agent launches in 3–7 days. Complex multi-platform agents with custom integrations take 1-3 weeks. You always get a working MVP first." },
        { q: "How much does a custom AI agent cost?", a: "The first pilot agent is free — we build it after a 30-minute discovery call. Production agents are quoted fixed-price after the call, depending on integrations and scope; typical build time is 3–7 days. Ongoing costs are just AI model usage, usually $20–200/month paid directly to providers with no markup." },
      ],
      seo: {
        title: "Custom AI Agent Development, Self-Hosted",
        description:
          "We build one custom AI agent for you — self-hosted, on Claude Agent SDK, LangGraph or CrewAI, wired into Telegram, email and your tools. First agent free.",
        serviceType: "AI agent development",
      },
      media: {
        heroAlt: "A compact self-hosted server appliance on a desk in a quiet office — the agent runs on hardware you own.",
        stepAlts: [
          "Blank cards laid out and linked into a branching map of everyday tasks.",
          "A steel agent appliance with its side panel lifted off, showing the boards and cabling inside.",
          "The same appliance with three expansion modules clipped alongside it in a row.",
        ],
        kitAlt: "Exploded view of the agent appliance: outer shell, mainboard, storage module, connector plate and power unit.",
        kitCaption:
          "One system, handed over whole: the agent runtime, its integrations, the knowledge base and the keys — all on hardware you control.",
      },
    },
    "ai-automation": {
      title: "AI Automation",
      kicker: "Workflows & Integrations",
      navLabel: "Automation",
      heroTitle: "Automate your operations — from lead to invoice, zero manual work",
      heroDescription: "We connect your tools and build intelligent workflows using n8n, Make.com, and custom integrations. Your CRM talks to your email, your forms feed your database, your reports generate themselves — and AI makes smart decisions at every step.",
      cardSummary: "Intelligent workflow automation with n8n, Make.com — connecting your CRM, email, forms, and databases into seamless operations.",
      problems: [
        "Your team copies data between 5+ tools every day — CRM, spreadsheets, email, task managers — and still makes mistakes",
        "New leads sit in your inbox for hours because nobody has time to qualify and route them manually",
        "Generating a weekly report takes half a day of pulling data from different sources and formatting it",
        "You've tried Zapier or Make but the automations broke after a month because nobody maintained them",
      ],
      guide: {
        empathy: "We know the frustration of watching your team do robot work when actual robots could do it better.",
        authority: "We've built 200+ production workflows that run reliably month after month — with monitoring and maintenance built in.",
      },
      plan: [
        { title: "Map", description: "We audit your current processes and identify the biggest time sinks. You show us the workflow, we find the automation." },
        { title: "Automate", description: "We build intelligent workflows that connect your tools — with AI-powered decision-making where manual judgment used to be required." },
        { title: "Monitor", description: "We set up alerts, logging, and health checks. When something changes in your tools, we adapt the automations. No more silent failures." },
      ],
      included: [
        "Process audit and automation roadmap",
        "Custom workflow design with n8n or Make.com",
        "AI-powered lead qualification and response drafting",
        "Cross-platform data sync (CRM ↔ sheets ↔ email ↔ chat)",
        "Automated reporting and dashboard generation",
        "Customer onboarding and follow-up sequences",
        "Webhook-based triggers and real-time processing",
        "Error monitoring and alerting dashboard",
        "Integration with AI agents for intelligent routing",
        "Ongoing maintenance and adaptation as your tools change",
      ],
      outcomes: [
        "Hours of manual data entry eliminated every week",
        "Leads qualified and routed in under 5 minutes, not hours",
        "Reports generated automatically with fresh data — every morning",
        "Zero data loss between systems — everything synced in real time",
      ],
      stakes: "Every manual process is a bottleneck waiting to break. While you copy-paste between tabs, your competitors close deals faster because their systems talk to each other.",
      faq: [
        { q: "What tools do you integrate with?", a: "Google Workspace, HubSpot, Salesforce, Notion, Airtable, Slack, Telegram, WhatsApp, Shopify, WooCommerce, Stripe, and any tool with an API. If it exists, we can connect it." },
        { q: "What happens if an automation breaks?", a: "We set up monitoring and alerts so we catch issues before you do. Our support package includes fixing and adapting automations as your tools or processes change." },
        { q: "Can AI make decisions in the workflow?", a: "Yes. We integrate AI at decision points — qualifying leads, categorizing requests, drafting responses, prioritizing tasks. The AI handles judgment calls that used to require a human." },
        { q: "How is this different from just using Zapier?", a: "We use n8n (self-hosted, no per-task pricing) and Make.com for complex workflows. More importantly, we add AI intelligence and ongoing maintenance — not just point-and-click connections." },
      ],
      seo: {
        title: "AI Workflow Automation — n8n & Make.com",
        description:
          "We connect your CRM, inbox, forms and databases into AI-driven workflows on n8n and Make.com: leads qualified in minutes, data synced, reports written for you.",
        serviceType: "Business process automation",
      },
      media: {
        heroAlt: "A patch frame where every cable run has been combed and dressed by hand — what a maintained automation looks like.",
        stepAlts: [
          "A tangle of loose cables on one side; the same cables combed into a single dressed harness on the other.",
          "A machined manifold block with a dozen ports and green valves, steel lines converging into it.",
          "A row of indicator lamps set into a steel bar — most green, one amber.",
        ],
        kitAlt: "The automation kit laid out flat: manifold block, graded connector fittings, hose, valves, indicator bar and mounting brackets.",
        kitCaption:
          "Workflows, the connectors between your tools, and the monitoring that tells you when one of them changes — built as one set, not as separate zaps.",
      },
    },
    "ai-training": {
      title: "AI Consulting & Training",
      kicker: "Team Enablement",
      navLabel: "Consulting",
      heroTitle: "Your team is stuck on ChatGPT. We'll get them to the next level.",
      heroDescription: "Most teams use AI at 10% of its potential. We come in, assess your workflows, install the right tools — Claude Code, Cursor, MCP servers, custom prompts — and train your team until AI becomes a daily habit, not a novelty.",
      cardSummary: "AI consulting and hands-on training — we install the right tools, teach real use cases, and make AI adoption stick.",
      problems: [
        "Your team uses ChatGPT for fun but nobody applies AI to actual work — it feels like a toy, not a tool",
        "Developers don't know about Claude Code or Cursor, and spend hours on tasks AI could do in minutes",
        "You want to adopt AI but don't know where to start — there are too many tools, frameworks, and opinions",
        "You've sent people to AI webinars and courses, but nothing changed — they went right back to the old way",
      ],
      guide: {
        empathy: "We've seen it a hundred times — excited about AI, confused about execution. It's not your fault. The landscape moves too fast.",
        authority: "We've trained 30+ teams on practical AI workflows. Not theory — real tools, real use cases, measured results.",
      },
      plan: [
        { title: "Assess", description: "We evaluate your team's current AI maturity, identify high-impact use cases, and design a custom training program." },
        { title: "Equip", description: "We install Claude Code, Cursor, MCP servers, and custom prompt libraries. Everyone gets the right tools configured for their role." },
        { title: "Train", description: "Hands-on workshops with real work tasks. We measure adoption at 30 and 60 days — if people aren't using it, we adjust." },
      ],
      included: [
        "Team AI maturity assessment",
        "Custom training curriculum for your specific workflows",
        "Claude Code and Cursor setup for every developer",
        "MCP server configuration for your tools and databases",
        "Custom prompt libraries tailored to your use cases",
        "Hands-on workshops using real work tasks, not demos",
        "AI adoption tracking — we measure if people actually use it",
        "Follow-up sessions at 30 and 60 days",
        "Best practices playbook your team can reference anytime",
        "Consulting for large-scale AI projects — architecture, tool selection, risk assessment",
      ],
      outcomes: [
        "Team uses AI tools daily — not occasionally, not \"for fun\"",
        "Developers ship code 2-3x faster with AI-assisted coding",
        "Business teams produce content, reports, and analysis in a fraction of the time",
        "You have measurable data on AI adoption and productivity gains",
      ],
      stakes: "Companies that adopt AI now will be 10x more productive in 2 years. Companies that wait will spend 10x more catching up. The window is closing.",
      faq: [
        { q: "What if our team has never used AI before?", a: "That's common and perfectly fine. We design training from the ground up, starting with fundamentals and progressing to advanced workflows based on your team's pace." },
        { q: "Is this a one-time workshop or ongoing?", a: "Both options available. We start with an intensive workshop series, then offer monthly check-ins to sustain adoption. We measure at 30 and 60 days and adjust." },
        { q: "Can you help with our own AI development project?", a: "Yes. Beyond training, we provide consulting for companies building their own AI products — architecture review, tool selection, implementation strategy, risk assessment." },
        { q: "What tools do you teach?", a: "Claude Code, Cursor, MCP servers, prompt engineering, n8n/Make for automation, and whatever else fits your team's needs. We don't push one tool — we find what works." },
      ],
      seo: {
        title: "AI Training for Teams — Claude Code, MCP",
        description:
          "We install Claude Code, Cursor and MCP servers, run workshops on your team's real work, then measure adoption at 30 and 60 days. AI consulting at any scale.",
        serviceType: "AI training and consulting",
      },
      media: {
        heroAlt: "A team working through a hands-on AI session at a long table, seen from the back of the room.",
        stepAlts: [
          "Calipers and a pencil resting on a blank sheet of grid paper.",
          "A workstation kit laid out in a grid: laptop, stand, keyboard, cables and a hex tool.",
          "A stack of identical bound playbooks, the top one open at blank pages.",
        ],
        kitAlt: "The training kit laid out flat: laptop and stand, three bound playbooks, pencil, calipers, cable and two machined blocks.",
        kitCaption:
          "Tools installed on every machine, workshops run on your own work, and a playbook the team keeps after we leave.",
      },
    },
    "ai-workspace": {
      title: "AI Platform",
      kicker: "AI Platform for Teams",
      navLabel: "AI Platform",
      heroTitle: "Your entire team, powered by AI agents",
      heroDescription: "We set up dedicated AI agents for every team in your company — sales, support, marketing, operations. Connected to your tools, trained on your knowledge base, secured on your infrastructure. Go live in 4 weeks.",
      cardSummary: "Dedicated AI agents for every team — connected to your tools, trained on your knowledge, secured on your infrastructure. Go live in 4 weeks.",
      problems: [
        "Your team handles the same tasks manually every day — answering clients, updating spreadsheets, compiling reports. It doesn't scale.",
        "Critical knowledge lives in people's heads — when someone leaves or goes on vacation, their context and contacts disappear with them.",
        "You've tried AI tools, but without a system everyone does their own thing. No consistency, no compounding, no real results.",
        "New hires take weeks to ramp up because there's no single place with all the answers, processes, and context they need.",
      ],
      guide: {
        empathy: "Scaling AI across a company is hard. Individual tools work, but without a system it's chaos. We've seen it — and we've solved it.",
        authority: "We've deployed company-wide AI platforms with 10+ agents, serving teams of 10-100+ people across e-commerce, SaaS, and professional services.",
      },
      plan: [
        { title: "Connect", description: "We audit your processes, connect your systems (CRM, email, chat, databases), and design your AI architecture. 1 week." },
        { title: "Launch", description: "We deploy AI agents for each team, fill the Knowledge Vault, configure access controls. Your team starts working with AI in 2-3 weeks." },
        { title: "Scale", description: "The system learns and grows. New agents are added in days, not months. Knowledge compounds. ROI accelerates." },
      ],
      included: [
        "Full process audit and AI architecture design",
        "AI assistant with full company context for every team member",
        "Custom AI agents for each team (sales, marketing, operations, support)",
        "Knowledge Vault — all company knowledge indexed and available to AI",
        "Connected to your tools — CRM, email, WhatsApp, Shopify, databases, and more",
        "Usage monitoring and ROI reporting dashboard",
        "AI usage policies and compliance documentation",
        "Employee onboarding to the AI platform",
        "Quarterly optimization reviews",
        "Priority support and agent updates",
      ],
      outcomes: [
        "Every team member has an AI assistant with full company context",
        "Company knowledge is preserved, indexed, and accessible — forever",
        "Full visibility into AI usage, costs, and ROI across all teams",
        "New AI agents deploy in days — the system grows with your business",
      ],
      stakes: "Without a system, AI adoption creates more chaos than it solves. Scattered tools, fragmented knowledge, inconsistent results — that's not innovation, it's wasted potential.",
      faq: [
        { q: "How many AI agents can you deploy?", a: "We typically start with 3-5 agents and scale from there. Our largest deployment runs 20+ agents across multiple departments. The architecture supports unlimited expansion." },
        { q: "What about data security?", a: "Your data stays on your infrastructure — self-hosted databases, role-based access, audit logs. No vendor lock-in — we use standard open protocols." },
        { q: "Do we need a technical team?", a: "No. Vento Labs handles all technical implementation, monitoring, and updates. Your team uses AI through simple interfaces — chat, dashboards, automated reports." },
        { q: "What systems do you connect to?", a: "Shopify, Gmail, WhatsApp, Telegram, Google Drive, Notion, Slack, CRM systems, databases, and any service with a REST API. If your tool has an API, we connect it." },
        { q: "What size companies is this for?", a: "Teams of 5 to 200+. We work with marketing agencies, e-commerce brands, SaaS companies, and professional services firms. The Pilot tier starts at just 5 seats — you don't need to be a large enterprise." },
        { q: "How much does it cost?", a: "Pilot starts from $3,000 setup + $500/month. Scale starts from $8,000 setup + $2,000/month. Enterprise is custom-priced. AI model costs ($20-200/month depending on usage) are billed directly by providers — no markups." },
      ],
      seo: {
        title: "Company-Wide AI Platform for Every Team",
        description:
          "An AI agent for every department, a Knowledge Vault over your documents, role-based access and ROI reporting. Live in 4 weeks on your own infrastructure.",
        serviceType: "Enterprise AI platform",
      },
      media: {
        heroAlt: "An open-plan office floor mid-afternoon, seen from the back — the whole company, not one power user.",
        stepAlts: [
          "A steel hub block with eight cables running into it from every direction.",
          "Four identical modular units side by side, the second one standing open.",
          "Twelve identical modules in a grid, one of them being set down into its place.",
        ],
        kitAlt: "Exploded view of the platform: enclosure, four agent modules, a gateway hub, a sealed knowledge vault and the cable loom.",
        kitCaption:
          "Agents per team, the gateway they all speak through, the vault your knowledge lives in and the wiring to your systems — one platform, not eleven subscriptions.",
      },
    },
  },

  case_pages: {
    "content-factory": {
      title: "Content Factory",
      kicker: "AI-ops · Content speed",
      navLabel: "Content Factory",
      heroTitle: "Turn your catalog into a stream of content that sells every day",
      heroDescription: "We take your product photos, feed, brand guide and references — and ship lifestyle visuals, carousels, short videos, AI presenters and product-card versions for your site, social channels and marketplaces.",
      cardSummary: "Turns SKUs into a stream of discovery content for social, product cards and marketplaces.",
      imageAlt: "A single amber dropper bottle surrounded by a grid of small prints, each showing the same bottle from a different angle and in different light.",
      problems: [
        "Your product only lives inside the card, while the buyer has already decided — in the feed, a board, a short video, a useful carousel.",
        "Manual content production can't keep up with e-commerce rhythm: too slow, too expensive, too few angles per SKU.",
        "Every card needs variants for Pinterest, TikTok, Instagram, YouTube Shorts and marketplace rich content — you never have enough hands.",
        "Agencies drift on style, and a consistent brand voice at high volume becomes almost impossible.",
      ],
      guide: {
        empathy: "We don't do random AI slop — we build a controlled content pipeline where every SKU turns into a system of scenarios.",
        authority: "This isn't a studio and it isn't a generator. It's a content operating system that plugs into your catalog and your channels.",
      },
      plan: [
        { title: "Connect", description: "You share product photos, catalog and brand-style references. We build a content matrix: which angles drive sales, brand and performance." },
        { title: "Generate", description: "The system ships a pack per channel — lifestyle visuals, carousels, short videos, AI presenters and product-card versions." },
        { title: "Publish", description: "Your team approves, publishes and gets a steady stream of new creative without a production bottleneck." },
      ],
      included: [
        "Lifestyle visuals from references and product photos",
        "Story carousels: recipes, how-tos, sets, comparisons, use cases",
        "Short videos for TikTok, Shorts and Reels",
        "AI presenters and scripted product demos",
        "Product-card versions and rich content",
        "Social-first formats for Pinterest, Instagram, TikTok, YouTube",
        "Ad variants for Meta, Google, Wildberries, Ozon",
        "One brand voice and style across high-volume output",
        "Content matrix and system of content angles",
        "A ready publishing queue linked to your product cards",
      ],
      outcomes: [
        "One SKU becomes a full content pack in hours, not weeks",
        "A single brand aesthetic across every channel at once",
        "Less dependency on one-off shoots and scattered agencies",
        "New hypotheses and angles tested every day instead of once a quarter",
      ],
      stakes: "If your catalog grows faster than your content team, you don't need another design sprint. You need a content factory.",
      faq: [
        { q: "Does this replace designers and photographers?", a: "No. The factory handles volume and standard angles — lifestyle, carousels, channel versions. Designers and photographers stay for key brand work, fashion shoots and bespoke concepts. The point is to free them from the conveyor belt." },
        { q: "What about quality? AI images often look off.", a: "We don't use off-the-shelf models. Each brand gets a pipeline tuned to its style — references, brand guide, product photos — with a human review before publishing. Bad visuals don't ship." },
        { q: "Will this work on marketplaces like Wildberries and Ozon?", a: "Yes. Rich content, AI photo studios, A/B image tests, 3D models and video covers are actively growing there. We build assets to those specs for each platform." },
        { q: "What about platform rules and honesty around AI content?", a: "We don't dress up AI output as real customer reviews and we don't use synthetic testimonials. Scripted demos and AI presenters are presented as what they are. FTC and EU consumer-review rules are respected." },
        { q: "How fast can we launch a pilot?", a: "Typical shape: 10–30 SKUs, 1–2 weeks to the first publishable pack. After that you move to a regular weekly rhythm." },
      ],
      pipeline: {
        eyebrow: "How it runs",
        heading: "One catalog in. Every channel out.",
        lede: "Nothing here is a black box: you hand over source material, the pipeline turns each SKU into a system of angles, and a human signs off before anything is published.",
        columns: [
          {
            head: "What you hand over",
            nodes: [
              { name: "Product photos and feed", meta: "Your catalog, as it already exists" },
              { name: "Brand guide and references", meta: "The look the output has to hold" },
              { name: "Channels and rules", meta: "Where it ships, and in what shape" },
            ],
          },
          {
            head: "The content pipeline",
            nodes: [
              { name: "Content matrix", meta: "Which angles sell, build brand, drive performance" },
              { name: "Generation tuned per brand", meta: "References and product photos, not an off-the-shelf model" },
              { name: "Human review", meta: "Bad visuals do not ship" },
            ],
          },
          {
            head: "What comes back",
            nodes: [
              { name: "Lifestyle visuals and carousels", meta: "Recipes, how-tos, sets, comparisons" },
              { name: "Short video and AI presenters", meta: "TikTok, Shorts, Reels, scripted demos" },
              { name: "Card and rich-content versions", meta: "Product cards and marketplace specs" },
              { name: "Ad variants per platform", meta: "Meta, Google, Wildberries, Ozon" },
            ],
          },
        ],
      },
      seo: {
        title: "Content Factory for E-commerce — Pilot on your SKUs",
        description: "Turn your catalog into a content stream for product cards, social and marketplaces. Lifestyle visuals, carousels, short videos, AI presenters. Pilot on your SKUs.",
      },
    },
    "supplier-agent": {
      title: "Supplier Agent",
      kicker: "AI-ops · Catalog speed",
      navLabel: "Supplier Agent",
      heroTitle: "Suppliers write in chaos. Your catalog should respond with structure.",
      heroDescription: "The agent reads incoming emails, messages, price lists, spreadsheets and files from suppliers, extracts SKUs, stock, prices and lead times, stores everything in your database or CRM, and triggers catalog updates by your rules.",
      cardSummary: "Turns emails, chats and price lists from suppliers into live stock, prices and catalog updates.",
      imageAlt: "Overhead view: plain cardboard boxes and tubes heaped in disorder on the left, the same objects arranged in an exact grid on the right.",
      problems: [
        "Product and stock data live across email, chats, PDFs and spreadsheets — your catalog always lags.",
        "Managers burn hours hand-copying price lists and syncing stock and prices.",
        "You sell wrong availability and lose orders when a supplier's update was sent but never processed in time.",
        "Stale prices and stock trigger mismatches and disapprovals on Google Merchant Center and marketplaces.",
      ],
      guide: {
        empathy: "We don't promise magic without control — we promise fewer manual touches, fresher stock and a transparent supplier workflow.",
        authority: "The agent acts as a supplier-operations layer: it closes the gap between a supplier's signal and the truth on your storefront.",
      },
      plan: [
        { title: "Wire up inputs", description: "We connect the channels where supplier updates land — email, chats, file folders, messengers." },
        { title: "Set rules", description: "We configure extraction, matching against your catalog, validation and approval. We define what auto-publishes and what goes to review." },
        { title: "Run in the background", description: "The agent runs as an operations layer. Your team only sees what actually needs attention — disputed changes and exceptions." },
      ],
      included: [
        "Ingestion from email, chats, files and other inbound channels",
        "Extraction of SKUs, prices, stock, lead times, MOQs and terms",
        "Normalization and matching against your catalog",
        "Rule-based updates to site, CRM, database or internal systems",
        "Approval routing for disputed changes",
        "Change journal and history per supplier",
        "A single pane of glass for supplier management",
        "Integrations with Shopify, WooCommerce, 1C, custom CRMs, Google Sheets",
        "Monitoring and alerts on failures or suspicious data",
        "Team training on the agent and rules",
      ],
      outcomes: [
        "The catalog updates within minutes of an inbound message",
        "Fewer manual touches — fewer human errors",
        "Accurate availability — fewer refunds and broken orders",
        "Managers spend time on exceptions, not on routine",
      ],
      stakes: "If your catalog depends on whether a manager reads an email in time, it's no longer a scalable process. Make suppliers a source of data, not a source of chaos.",
      faq: [
        { q: "What if suppliers send wildly different formats?", a: "That's the point. The agent handles email, PDFs, Excel, Google Sheets, photos of price lists, Telegram and WhatsApp messages. Each supplier gets a tuned extraction template, and the agent learns new formats without rewriting rules." },
        { q: "Who decides on disputed changes?", a: "You do. The agent works by rules: some things auto-update (stock from a trusted supplier), others route to manager review (big price changes, new SKUs, outliers). The boundary is set to match your practice." },
        { q: "Which systems can you integrate with?", a: "Shopify, WooCommerce, 1C, Bitrix, MyWarehouse, Google Sheets, Airtable, Notion, custom CRMs and databases via API. If it has an API or a structured access path, we'll integrate." },
        { q: "What about supplier data security?", a: "Data is processed inside your perimeter or via API access with data-processing agreements. Models run on business tier — your data isn't used for training. For strict requirements we can run self-hosted." },
        { q: "How long does it take to launch?", a: "MVP on 1–3 key suppliers — 2–3 weeks. Full supplier coverage — 1–2 months depending on the number of sources and rule complexity." },
      ],
      pipeline: {
        eyebrow: "How it runs",
        heading: "Chaos in. Structure out.",
        lede: "The agent sits between the supplier and your storefront. It reads whatever arrives, extracts the fields that matter, and either updates by your rules or hands the exception to a human.",
        columns: [
          {
            head: "Inbound, as suppliers send it",
            nodes: [
              { name: "Email and attachments", meta: "Threads, forwards, replies to replies" },
              { name: "Chats", meta: "Telegram, WhatsApp, messenger updates" },
              { name: "Price lists and files", meta: "Excel, PDF, Google Sheets, photos of a price list" },
            ],
          },
          {
            head: "The agent layer",
            nodes: [
              { name: "Extraction", meta: "SKU, price, stock, lead time, MOQ, terms" },
              { name: "Normalization and matching", meta: "Against your catalog, per-supplier templates" },
              { name: "Rules", meta: "Auto-publish what is trusted, route the rest to review" },
              { name: "Change journal", meta: "History per supplier, with the source message" },
            ],
          },
          {
            head: "Systems that end up correct",
            nodes: [
              { name: "Storefront", meta: "Shopify, WooCommerce" },
              { name: "CRM and ERP", meta: "1C, Bitrix, MyWarehouse, custom systems" },
              { name: "Database and sheets", meta: "API, Google Sheets, Airtable, Notion" },
              { name: "Alerts", meta: "Failures, outliers, suspicious data" },
            ],
          },
        ],
      },
      seo: {
        title: "Supplier Agent — AI for Supplier Emails & Catalog Updates",
        description: "AI agent turns supplier emails, chats and price lists into live stock, prices and storefront updates — by your rules, with approvals and a full change journal.",
      },
    },
    "erp-agent": {
      title: "1C Agent",
      kicker: "AI-ops · Controlled 1C acceleration",
      navLabel: "1C Agent",
      heroTitle: "A managed AI layer over 1C: business-grade speed without risking the accounting core",
      heroDescription: "Built on Claude: developers ship changes faster, managers read and update data strictly inside their role. Every action runs through review, approval and the audit journal — no exceptions.",
      cardSummary: "Permission-based AI layer over 1C: faster development, safe manager actions, end-to-end audit.",
      problems: [
        "Every 1C change — from a manager's request to release — gets stuck in the dev queue, manual requirements handoff and testing. Days and weeks instead of minutes.",
        "Giving managers direct 1C access risks corrupting accounting data and breaking compliance. Locking it down sends them right back to the ticket queue.",
        "Developers spend their time on reports, exports and reference data — work without architectural depth that still consumes the team's main capacity.",
        "Companies see AI's potential for accounting systems but won't ship it: there's no built-in permission control, action approval or end-to-end audit trail.",
      ],
      guide: {
        empathy: "We don't hand AI the 1C core, we don't blur manager and developer roles, and we don't sell a magic button that does everything for you.",
        authority: "Permission-based AI: request → plan → approval → execution → journal entry. Every action stays inside its role, under audit, with no surprises for the business and no pain for IT.",
      },
      plan: [
        { title: "Map roles and limits", description: "In a single workshop we lock in roles, accessible objects and hard limits. The output is a transparent security policy that makes privilege escalation through AI impossible." },
        { title: "Connect 1C", description: "We integrate via OData, HTTP services and web-services. The agent only sees approved tools. AI runs inside your perimeter and the standard configuration stays untouched." },
        { title: "Launch both flows", description: "Developers: prompt → plan → extension → review → apply. Managers: natural-language request → permission check → action → journal entry. Speed goes up, control stays in place." },
      ],
      included: [
        "Permission-based AI layer over 1C on Claude (business-tier API — your data is not used to train the model)",
        "Developer mode: change plans, extension prep, review-friendly diffs, version-control integration",
        "Manager mode: read, search, create and update data via natural language",
        "Role model and access policies — any number of roles and users",
        "Action-approval subsystem before write or publish",
        "Change journal with full history of requests, results and authors",
        "Integration adapters: OData, HTTP services, web-services, MCP connections with allowlist/denylist",
        "Training for developers and key managers — a 2-hour workshop",
        "First week of technical support after pilot go-live",
      ],
      outcomes: [
        "Routine dev tickets — down 70% inside the first month",
        "Reports and exports prepared 3× faster",
        "Unauthorised changes to accounting data — under 100% control",
        "1C core stays standard and upgradeable — no pain on vendor releases",
      ],
      metrics: {
        eyebrow: "Measured KPIs",
        heading: "Business outcomes in numbers",
        columns: { metric: "Metric", before: "Before", after: "After", change: "Change" },
        rows: [
          { metric: "Time to prepare a standard report (person-hours)", before: "3.5", after: "0.4", change: "−88%" },
          { metric: "Open tickets in the dev queue (count)", before: "38", after: "11", change: "−71%" },
          { metric: "From manager request to execution (days)", before: "2.3", after: "0.2", change: "−91%" },
          { metric: "Incidents from incorrect data changes (per month)", before: "4–6", after: "0", change: "fully eliminated" },
        ],
        source: "Source: Vento Labs internal analytics across three projects — manufacturing, distribution and professional services (Q1–Q2 2025).",
      },
      guarantees: {
        eyebrow: "Security & guarantees",
        heading: "We architect the risks out — we don't just look the other way",
        items: [
          { title: "1C core stays untouched", description: "All changes ship through configuration extensions. The standard configuration stays original — no friction with vendor upgrades." },
          { title: "Manual approval on every change", description: "In the dev flow the developer sees the plan and the diff before apply. In the manager flow the agent never executes an action outside the role — it doesn't even appear in the available list." },
          { title: "Data localisation and privacy", description: "Claude is called on the business tier of the API: your data isn't stored or used for training. On request, an on-premise model deployment inside your perimeter — full feature parity." },
          { title: "Full audit trail", description: "The journal of requests and operations lives in your infrastructure. Ready to be handed to external auditors or regulators in any required format." },
          { title: "Warranty obligations", description: "If 1C is disrupted by an AI-agent error (with the standard upgrade procedure followed) — Vento Labs restores the system at no extra cost." },
        ],
      },
      stakes: "The business wants speed. IT wants safety. A chatbot solves neither. A managed AI layer over 1C does — with roles, approval and audit out of the box.",
      faq: [
        { q: "What are the risks to the accounting system from AI?", a: "Risks are minimised by architecture. The agent has no direct access to the configuration core: all changes ship through extensions pre-approved by a developer. In Manager mode the agent only executes actions explicitly allowed by the role policy; out-of-bounds attempts are blocked at the prompt level." },
        { q: "Is our data used to train models?", a: "No. We run Claude on the business tier of the API, which guarantees data isn't stored or used for training. For customers with stricter security requirements, an on-premise model deployed inside the company perimeter is available." },
        { q: "Which 1C configurations are supported?", a: "1C:Enterprise 8.3 and above. Standard configurations: Accounting, Trade Management, ERP, KA, UNF. Any custom configuration that supports OData, HTTP services or web-services. If the required interfaces are missing — Vento Labs builds them in 1–2 days." },
        { q: "What does production licensing cost after the pilot?", a: "Fixed subscription from USD 2,500/month: unlimited requests, up to 5 manager users, all updates and technical support. Claude API costs are included. For companies with more users or specific requirements — custom pricing." },
        { q: "Will automation lead to layoffs in the dev team?", a: "Our experience shows the opposite: developers are freed from routine work and shift focus to architecturally complex, innovative projects. None of our projects has resulted in IT-team layoffs." },
        { q: "How do you align actions with our accounting policy?", a: "During the role-mapping stage we jointly fix allowed scenarios and prohibitions. Every subsequent agent request is checked against these rules. You can also enable manual approval for any action above a defined threshold — by amount, operation type or other criteria." },
      ],
      seo: {
        title: "1C Agent — a digital 1C developer",
        description: "AI agent for 1C ERP on Claude: plain-language requests, a reviewed change plan, edits confined to extensions so the 1C core stays intact. Full case in Russian.",
      },
      ctaPrimary: { label: "Book a free call", href: "#book", kind: "arrow" },
      ctaSecondary: { label: "Email us", href: "mailto:alexey@ventolabs.com", meta: "alexey@ventolabs.com", kind: "mail" },
      trustStrip: [
        { value: "−70%", label: "routine dev tickets" },
        { value: "3×", label: "faster reports & exports" },
        { value: "100%", label: "change-control coverage" },
        { value: "0", label: "data-incident months" },
      ],
      leadMagnet: {
        badge: "Free playbook",
        heading: "AI Implementation Playbook — practice, not theory",
        description: "A step-by-step guide to rolling out AI inside accounting and operational processes without chaos: from roles and permissions to pilot go-live and ROI. Based on real Vento Labs projects in manufacturing, distribution and services.",
        bullets: [
          "Which processes pay back in 2–4 weeks",
          "How to split AI / developer / manager roles without risk",
          "Templates for access policies and action approvals",
          "Readiness checklist for permission-based AI",
        ],
        ctaLabel: "Message on Telegram — I'll send the PDF",
        ctaHref: "https://t.me/defi_defiler",
        footnote: "Sent personally. No mailing lists, no signups.",
      },
      finalCta: {
        badge: "Free 14-day pilot",
        heading: "Run a managed AI layer over your 1C — no payment, no commitment",
        subtitle: "Setup in your test perimeter in 30–45 minutes. After the pilot: KPIs and a clear go/no-go. No hidden terms.",
        primary: { label: "Book a free call", href: "#book", kind: "arrow" },
        secondary: { label: "Email us", href: "mailto:alexey@ventolabs.com", meta: "alexey@ventolabs.com", kind: "mail" },
      },
    },
    "bankruptcy-agent": {
      title: "Bankruptcy AI",
      kicker: "LegalTech · AI for Russian arbitration trustees",
      navLabel: "Bankruptcy AI",
      heroTitle: "Focus on the procedure — AI handles the routine",
      heroDescription: "AI platform for Russian arbitration trustees («арбитражные управляющие»). Drafts reports to the creditors' meeting and to the commercial court, prepares procedural documents with citations to fresh Supreme Court practice, watches 127-FZ and APC deadlines, and surfaces challengeable transactions under arts. 61.2 / 61.3. Page is in Russian — product targets the RU market.",
      cardSummary: "AI platform for Russian arbitration trustees: procedural docs, deadline control, debtor due-diligence, EFRSB integration.",
      problems: [
        "Every motion, meeting report and challenge claim eats hours — drafting with the right 127-FZ / APC citations and the latest Supreme Court determinations.",
        "Bankruptcy deadlines are unforgiving: 2 months for the registry, 3–6 for meeting reports, 3 working days for EFRSB publications. A miss = complaint, fine, possible removal.",
        "Debtor information lives across email, tax-authority responses, bank statements and Rosreestr PDFs. Manual systematisation is impossible — challengeable transactions slip through.",
        "Each procedure touches dozens of creditors, counterparties and government agencies. Email correspondence has no structure — finding a reply from last quarter is a separate quest.",
      ],
      guide: {
        empathy: "A trustee should be running the procedure, not stamping forms. The platform doesn't replace your expertise — it removes the routine and gives you back time for strategy.",
        authority: "Self-hosted in your perimeter. Integrations with EFRSB, kad.arbitr.ru, EGRUL/SPARK, bank statements and KonsultantPlus. Audit trail per document.",
      },
      plan: [
        { title: "Connect sources", description: "EFRSB, the commercial court file, EGRUL/SPARK, bank statements, your mailbox and procedure-file storage. No copies of procedural data leave your environment." },
        { title: "Map templates and deadlines", description: "We capture report formats, motion templates, the 127-FZ / APC deadline regime and EFRSB publication rules. The platform learns from your practice." },
        { title: "Run on one procedure", description: "We pick one real case and run three scenarios: meeting report, motion, transaction analysis. The trustee reviews — we refine — we scale to the portfolio." },
      ],
      included: [
        "Claude-based AI platform inside your perimeter (self-hosted ready)",
        "Integrations: EFRSB, kad.arbitr.ru, EGRUL, SPARK / Kontur.Focus",
        "PDF and scanned-document parsing of bank statements, Rosreestr extracts and tax responses",
        "Procedural document templates with auto-substitution of parties, dates and case practice",
        "Report templates for the creditors' meeting, the commercial court and the SRO",
        "Procedural deadline calendar with notifications and an action journal",
        "Debtor transaction analyser for arts. 61.2 and 61.3 of 127-FZ",
        "Affiliation map: EGRUL + bank links + SPARK",
        "Fresh Supreme Court practice retrieval bound to each draft",
        "Trustee + assistant onboarding workshop (2 hours) and materials",
      ],
      outcomes: [
        "Meeting reports and motions ship 3–5x faster",
        "127-FZ and APC deadlines are tracked automatically — no notebooks, no Google Calendar",
        "Challengeable-transaction analysis no longer depends on whether the assistant catches it in the statements",
        "The same team runs more procedures",
      ],
      stakes: "A trustee should be running the procedure, not fighting forms and deadlines. Free up the hours for strategy — and close more cases with the same headcount.",
      socialProof: { company: "SRO «Severnaya Stolitsa»", result: "−68 hours per trustee per month" },
      faq: [
        { q: "Where is procedure data stored?", a: "Inside your perimeter — your server or your cloud. No copies of procedural materials leave the environment. Claude is called via the enterprise API tier with zero retention. For the strictest requirements an on-prem model deployment is available." },
        { q: "Does the platform file documents on the trustee's behalf?", a: "No. The platform prepares drafts with citations to the law and case practice; the trustee signs filings via Moy Arbitr and EFRSB publications with their own qualified electronic signature. It is a tool, not an autopilot." },
        { q: "What about up-to-date Supreme Court practice?", a: "We connect to KonsultantPlus or Garant via your subscription and to the official kad.arbitr.ru file. The platform pulls the relevant Supreme Court determinations and circuit-court rulings for each draft." },
        { q: "Which SROs and regulations are supported?", a: "Any SRO. The platform knows 127-FZ, the APC, Government Decree No. 22 forms and the EFRSB rulebook. Your SRO's internal templates are wired in within a day from a .docx upload." },
        { q: "What does it cost after the demo?", a: "Fixed subscription from USD 2,500/month: up to 5 users (trustee + assistants), unlimited queries, updates and support. Claude API spend is included. Larger firms — bespoke pricing." },
      ],
      seo: {
        title: "Bankruptcy AI — Russian-only product (page in Russian)",
        description: "AI platform for Russian bankruptcy trustees: court-ready drafts with fresh case law, deadline control under 127-FZ, transaction analysis. Self-hosted. Page in Russian.",
      },
      ctaPrimary: { label: "View Russian version", href: "/ru/cases/bankruptcy-agent", meta: "page in Russian", kind: "telegram" },
      ctaSecondary: { label: "Back to cases", href: "/cases", meta: "browse other cases", kind: "phone" },
      trustStrip: [
        { value: "−68 h", label: "per trustee per month" },
        { value: "×3–5", label: "faster documents" },
        { value: "127-FZ", label: "deadlines on rails" },
        { value: "Self-hosted", label: "data stays with you" },
      ],
      leadMagnet: {
        badge: "Free demo",
        heading: "30 minutes — and you see AI on your own procedure",
        description: "We show how Bankruptcy AI works on one of your real cases (NDA on day one). Meeting report assembled in 5 minutes, draft motion with fresh Supreme Court practice, challengeable-transaction map of the debtor — all on your data, in your perimeter.",
        bullets: [
          "We take one of your procedures under NDA",
          "Meeting report assembled per Decree No. 22 in 5 minutes",
          "Draft procedural document with fresh case practice citations",
          "Map of challengeable transactions under arts. 61.2 / 61.3",
        ],
        ctaLabel: "Book a demo via Telegram",
        ctaHref: "https://t.me/defi_defiler",
        footnote: "The demo is run by the founder. No decks, no salespeople.",
      },
      finalCta: {
        badge: "Page in Russian",
        heading: "This case targets Russian arbitration trustees",
        subtitle: "Product copy, demo materials and documentation are in Russian. The full landing is at /ru/cases/bankruptcy-agent.",
        primary: { label: "View Russian version", href: "/ru/cases/bankruptcy-agent", meta: "ventolabs.com/ru/cases/bankruptcy-agent", kind: "telegram" },
        secondary: { label: "Back to cases", href: "/cases", meta: "browse other cases", kind: "phone" },
      },
    },
  },

  dataCenters: {
    navLabel: "Data centers",
    breadcrumb: "Data centers",
    cardSummary:
      "End-to-end development of AI data centers — site, power, grid interconnection, modular build and operation. 10 to 100+ MW.",
    seo: {
      title: "AI Data Center Development — Site, Power, Build & Operate",
      description:
        "We develop AI data centers end to end: choosing the right configuration, securing land next to transmission capacity, grid interconnection, modular construction and commissioning. From 10 to 100+ MW.",
    },

    hero: {
      eyebrow: "AI Infrastructure",
      title: "AI data centers, from empty land to live megawatts",
      lede:
        "If you have capital and you're looking at data centers as an asset, the hard part is never the servers — it's power, land and time. We help you decide what to build, find and secure the site, get it connected to transmission, build it modularly and hand it over running.",
      ctaPrimary: "Book a call",
      ctaSecondary: "See the process",
      imageAlt:
        "Rows of modular data center units on a prepared site, with a private substation and high-voltage transmission line behind",
    },

    stats: [
      { value: "10–100 MW", label: "Typical project size, phased" },
      { value: "3–6 mo", label: "Modular deployment vs 24–36 traditional" },
      { value: "<1.3", label: "Target PUE with hybrid cooling" },
      { value: "100 kW", label: "Per rack, liquid-cooled GPU density" },
    ],

    leadMagnet: {
      badge: "Free · 30 minutes",
      heading: "Book a call about your data center",
      description:
        "Tell us the budget, the geography and the time horizon. We come back with a straight answer on what that capital actually buys in megawatts, how long it would take, and where the money goes.",
      bullets: [
        "A realistic capacity and configuration for your budget — how many MW, what density, what cooling",
        "The two or three geographies worth looking at, and why the others aren't",
        "What securing a grid position would take in your target market, and how long it really runs",
        "An honest read on whether the project is worth doing at all",
      ],
      ctaLabel: "Book a call",
      ctaHref: "#book",
      footnote: "No deck, no pitch. If the numbers don't work, we say so on the call.",
    },

    investor: {
      eyebrow: "For investors and owners",
      heading: "You have the capital. We handle everything between it and a working facility.",
      lead:
        "Most people who want to own compute infrastructure stall at the same place: which configuration actually pays back, where to put it, and who is accountable when the grid study comes back at 30 months. We take that whole chain. Below are the three structures we usually work in — the right one depends on how much of the asset you want to own and how much operating risk you want to carry.",
      models: [
        {
          title: "You own it — turnkey build",
          description:
            "We design and build the facility to your spec and hand over the keys. You hold the land, the asset and the depreciation.",
          points: [
            "Single point of accountability from site search to commissioning",
            "CAPEX deal — the asset sits on your balance sheet",
            "Specification written around your workload, not a catalogue product",
            "In the US, integrated solar and storage can qualify for a 30% investment tax credit",
          ],
        },
        {
          title: "Build-to-suit for a tenant",
          description:
            "We build against a signed offtake — an AI company, a cloud operator or an enterprise — so the facility is contracted before it's energized.",
          points: [
            "Revenue secured before construction completes",
            "Long-term contract, predictable cash flow",
            "Tenant covenant strengthens the project financing",
            "You stay the owner, we can stay on as operator",
          ],
        },
        {
          title: "Joint venture",
          description:
            "You bring land, power position or capital; we bring engineering, supply chain and delivery. We build and operate together.",
          points: [
            "Works well when you already control a site or a grid position",
            "Shared CAPEX, shared upside",
            "Scales across several facilities on one platform",
            "Option to sell compute capacity rather than only lease space",
          ],
        },
      ],
    },

    process: {
      eyebrow: "How it works",
      heading: "Seven steps from a conversation to a running facility",
      lead:
        "Nothing here is exotic. It's a long chain of unglamorous work where the expensive mistakes happen early — buying land whose interconnection queue is six years deep, or sizing cooling for a density the racks will exceed in eighteen months.",
      steps: [
        {
          title: "Decide what to build",
          description:
            "Before any land is bought, we size the thing: capacity, workload profile, density per rack, redundancy level, and what the total cost of ownership looks like over ten years.",
          detail:
            "Training clusters, inference fleets and enterprise HPC want different buildings. Getting this wrong is the most expensive error available.",
        },
        {
          title: "Find the site",
          description:
            "We screen land against the criteria that actually gate a data center — available transmission capacity first, then water, fiber, zoning, climate and tax regime.",
          detail:
            "Most parcels that look perfect on a map die on the interconnection study. We check that before you make an offer.",
        },
        {
          title: "Secure land and power",
          description:
            "Purchase or long-term ground lease, plus the paperwork that makes the megawatts real: interconnection agreements, facility extension agreements, substation capacity.",
          detail:
            "A site without a signed power position is farmland with a good story.",
        },
        {
          title: "Connect to transmission",
          description:
            "Substation, high-voltage interconnect, transformers and switchgear — engineered, procured and coordinated with the utility, in phases if the load ramps.",
          detail:
            "This is usually the longest pole in the tent, which is why we start it in parallel with design rather than after it.",
        },
        {
          title: "Engineer and manufacture",
          description:
            "Detailed design of power, cooling and network, then factory production of the modules while site works and foundations proceed in parallel.",
          detail:
            "Building the box and preparing the ground at the same time is where most of the schedule saving comes from.",
        },
        {
          title: "Install and commission",
          description:
            "Delivery, assembly, integration, testing and handover — power on, cooling balanced, network live, load proven.",
          detail:
            "Pre-configured modules arrive tested, so commissioning is verification rather than discovery.",
        },
        {
          title: "Operate and monetize",
          description:
            "Run it, or have it run: colocation, hosting, GPU-as-a-service, reserved clusters, or wholesale capacity to a single large operator.",
          detail:
            "A megawatt sold as electricity has one value. The same megawatt sold as AI compute has a considerably higher one.",
        },
      ],
    },

    anatomy: {
      eyebrow: "Anatomy",
      heading: "What a data center is actually made of",
      lead:
        "Strip away the marketing and an AI data center is four systems that all have to be sized together: something to bring power in, something to take heat out, something to move data, and a structure to hold it. Get one wrong and the others are wasted.",
      cutawayAlt:
        "Exploded cutaway of a three-level modular data center showing the power floor, the rack floor and the cooling plant above it",
      cutawayCaption:
        "A facility, pulled apart: electrical distribution at the bottom, compute in the middle, cooling plant on top. Each level is a set of modules built in a factory, not a room poured on site.",
      groups: [
        {
          id: "power",
          imageAlt:
            "Skid-mounted power module with a transformer, switchgear cabinets and copper busbars in a galvanized steel frame",
          title: "Power",
          description:
            "The gating constraint on every project. Everything upstream of the rack, from the transmission line to the busbar.",
          items: [
            { name: "Grid interconnect", note: "High-voltage connection to transmission, typically 138 kV and up" },
            { name: "Substation and switchgear", note: "Step-down, protection and distribution to the halls" },
            { name: "Transformers", note: "Medium and low voltage distribution inside the module" },
            { name: "BESS", note: "Battery storage for ride-through, load balancing and peak shaving" },
            { name: "On-site generation", note: "Solar, gas or hydro depending on the site — reduces grid dependence and OPEX" },
          ],
        },
        {
          id: "cooling",
          imageAlt:
            "Cooling distribution module with plate heat exchangers, redundant pumps and insulated stainless pipework",
          title: "Cooling",
          description:
            "AI racks run at densities that air alone can no longer handle. Cooling design follows the chip, not tradition.",
          items: [
            { name: "Liquid-cooled racks", note: "Direct-to-chip loops for high-density GPU and HPC loads" },
            { name: "Cooling distribution unit", note: "Isolates the facility loop from the rack loop and controls temperature" },
            { name: "Dry coolers", note: "Free cooling wherever the climate allows it — the cheapest cooling is the kind you don't run" },
            { name: "Chilled air handling", note: "For the mixed and lower-density parts of the load" },
            { name: "Heat recovery", note: "Organic Rankine Cycle turns waste heat back into electricity, or feeds a district loop" },
          ],
        },
        {
          id: "compute",
          imageAlt:
            "Liquid-cooled compute module: racks of GPU servers with coolant manifolds and quick-disconnect hoses",
          title: "Network and compute",
          description: "The part everyone pictures — and the part that is easiest to change later.",
          items: [
            { name: "Network module", note: "Pre-cabled fiber and copper, built for scale-out topologies" },
            { name: "Optical interconnect", note: "Photonics moves more data per watt than copper at distance" },
            { name: "Carrier connectivity", note: "Diverse routes and enough capacity for training-scale data movement" },
            { name: "Compute halls", note: "Racks, PDUs, structured cabling — configured to the workload" },
          ],
        },
        {
          id: "structure",
          imageAlt:
            "Prefabricated data center enclosure with one door open, showing the raised floor and overhead cable trays inside",
          title: "Site and structure",
          description: "The unglamorous half of the CAPEX, and the half that determines the schedule.",
          items: [
            { name: "Land", note: "Enough of it, zoned correctly, near transmission — the three rarely coincide" },
            { name: "Foundations and civils", note: "Pads, access roads, drainage, security perimeter" },
            { name: "Modular enclosures", note: "Factory-built structures that arrive tested rather than assembled on site" },
            { name: "Water", note: "Wells or municipal supply for evaporative and hybrid cooling schemes" },
            { name: "Security and fire", note: "Physical access control, detection and suppression" },
          ],
        },
      ],
    },

    modular: {
      eyebrow: "Why modular",
      heading: "The same megawatts, roughly a year and a half sooner",
      lead:
        "Traditional data center construction was designed for a market where demand was predictable and you could plan three years out. AI demand does not behave that way. Modular construction moves most of the build into a factory and runs it in parallel with site preparation.",
      columns: { criterion: "", traditional: "Traditional build", modular: "Modular build" },
      rows: [
        { criterion: "Time to first megawatt", traditional: "24–36 months", modular: "3–6 months" },
        { criterion: "CAPEX", traditional: "Rising 30–50% on materials and labor", modular: "20–30% lower via factory production" },
        { criterion: "Land footprint", traditional: "700+ acres per gigawatt", modular: "Dense vertical and stacked layouts" },
        { criterion: "Scaling", traditional: "Fixed at design, expensive to extend", modular: "Phased from 10 to 100+ MW" },
        { criterion: "AI readiness", traditional: "Retrofit needed for GPU density", modular: "Liquid cooling designed in from the start" },
        { criterion: "Renewables", traditional: "Bolted on, if at all", modular: "Solar, storage and heat recovery integrated" },
        { criterion: "Supply chain", traditional: "Local contractors, local prices", modular: "Established international sourcing" },
      ],
      note:
        "Modular is not automatically the right answer. For very large single-tenant campuses on cheap land, conventional construction can still win. We tell you which case you're in before you commit capital.",
    },

    construction: {
      eyebrow: "How it gets built",
      heading: "Four stages from bare ground to running load",
      lead:
        "This is what the schedule actually looks like on site. The trick isn't working faster — it's that the modules are being built in a factory the whole time the ground is being prepared, so two of the longest jobs happen at once instead of one after the other.",
      note:
        "Stage durations depend on the site: grading and foundations move fast on flat, dry ground and slowly on anything else. Grid works run in parallel throughout and are usually what sets the finish date.",
      steps: [
        {
          id: "site",
          label: "Stage 1",
          title: "Clear and grade the site",
          description:
            "Access roads, drainage, survey, compaction. Unglamorous and easy to underestimate — this is where a cheap parcel starts costing money.",
          alt: "Graded and staked data center site with a high-voltage transmission line crossing behind it",
        },
        {
          id: "foundations",
          label: "Stage 2",
          title: "Pour foundations and pull services",
          description:
            "Concrete pads in the module grid, conduit and earthing cast in, water and fiber brought to the boundary. Module fabrication is already underway in the factory.",
          alt: "Freshly poured concrete foundation pads in rows with rebar and electrical conduit stubs",
        },
        {
          id: "craning",
          label: "Stage 3",
          title: "Set the modules",
          description:
            "Modules arrive tested and are craned onto their pads, then coupled: power, cooling loops, network. A row goes down in days rather than months.",
          alt: "Mobile crane lowering a prefabricated data center module onto its concrete pad",
        },
        {
          id: "live",
          label: "Stage 4",
          title: "Energize and prove the load",
          description:
            "Commissioning, cooling balanced, redundancy tested, load ramped. Because the modules were tested in the factory, this stage is verification rather than discovery.",
          alt: "Energized rows of modular data center units at dusk with the substation lit alongside",
        },
      ],
    },

    projects: {
      eyebrow: "Sites and projects",
      heading: "What we're working on",
      lead:
        "A representative selection of the sites in our pipeline — one in advanced diligence, three under evaluation. They give a sense of what a viable data center site looks like in practice: power position first, everything else second.",
      disclaimer:
        "Counterparty names, exact addresses and commercial terms are withheld — these materials are covered by confidentiality agreements. Status reflects where each site stands today, not a claim of ownership.",
      specsLabel: "Key parameters",
      items: [
        {
          id: "east-texas",
          status: "In diligence",
          title: "187-acre site, 70 MW secured",
          location: "East Texas, United States",
          description:
            "A large parcel with an existing private substation and an on-site high-voltage grid interconnect. The regional transmission utility has approved a facility extension for 70 MW, delivered in two phases as the substation expands. Natural gas runs a few miles out, there are five water wells on the property, and fiber is being installed now.",
          alt: "Aerial view of a 187-acre power and data center development site",
          tags: ["Power secured", "Gas adjacent", "On-site water", "Fiber in progress"],
          specs: [
            { k: "Site area", v: "~187 acres" },
            { k: "Power", v: "70 MW facility extension approved, phased" },
            { k: "Interconnect", v: "138 kV, substation on site" },
            { k: "Water", v: "5 wells, ≥46,000 gal/day" },
            { k: "Connectivity", v: "400 Gbps installing, 1 Tbps confirmed" },
          ],
        },
        {
          id: "west-texas",
          status: "Under evaluation",
          title: "105 MW power-ready site",
          location: "West Texas energy corridor, United States",
          description:
            "A development-ready site with a direct grid connection and substation, switchgear and transformer infrastructure already installed. Structured for step-down and containerized deployment, which means megawatts can be brought online in increments rather than all at once.",
          alt: "High-voltage transformer and substation equipment at a West Texas site",
          tags: ["Grid-connected", "Substation on site", "Containerized"],
          specs: [
            { k: "Indicative capacity", v: "~105 MW" },
            { k: "Infrastructure", v: "Substation, switchgear, transformers installed" },
            { k: "Structure", v: "Long-term ground lease under discussion" },
          ],
        },
        {
          id: "midwest",
          status: "Under evaluation",
          title: "41 MW operating portfolio, +20 MW approved",
          location: "Midwest United States, MISO grid",
          description:
            "A fully energized multi-site portfolio — three co-located facilities within an hour of each other — with an operations team already in place and a track record above 99% uptime. Substation capacity for a further 20 MW is already approved, which makes it a candidate for redeployment to AI and HPC loads.",
          alt: "Rows of modular data center containers at an operating site",
          tags: ["Live and energized", "Multi-site", "Expansion approved"],
          specs: [
            { k: "Live capacity", v: "41 MW" },
            { k: "Expansion", v: "+20 MW, substation-approved" },
            { k: "Uptime record", v: ">99%" },
            { k: "Operations", v: "Team in place" },
          ],
        },
        {
          id: "stockholm",
          status: "Under evaluation",
          title: "10 MW high-density conversion",
          location: "Stockholm, Sweden",
          description:
            "Conversion of an existing steel-frame industrial building into a vertical high-density compute facility, aimed at inference and fine-tuning workloads in a supply-constrained in-city power market. Industrial zoning and building permits are already in place, which removes the slowest part of a European build.",
          alt: "Industrial building earmarked for conversion into a high-density compute facility",
          tags: ["Building conversion", "In-city power", "Permits in place"],
          specs: [
            { k: "Critical IT load", v: "10 MW, phased from 2 MW" },
            { k: "Site power position", v: "15 MW" },
            { k: "Permitting", v: "Zoning and building permits secured" },
          ],
        },
      ],
    },

    gallery: {
      eyebrow: "On the ground",
      heading: "The infrastructure behind the megawatts",
      lead:
        "Photographs from site diligence and live deployments. This is what most of the work actually looks like — substations, switchgear rooms and steel boxes on gravel, long before anything resembles a server room.",
      items: [
        {
          id: "substation",
          alt: "138 kV substation with transmission tower at a data center site",
          caption: "138 kV interconnect and private substation at the East Texas site",
        },
        {
          id: "switchgear",
          alt: "Interior switchgear and electrical distribution room",
          caption: "Switchgear and distribution room at an operating facility",
        },
        {
          id: "modular",
          alt: "Modular data center containers deployed on a prepared site",
          caption: "Modular units deployed on a prepared pad, Midwest United States",
        },
        {
          id: "parcel",
          alt: "Survey plan of a parcel adjacent to transmission infrastructure",
          caption: "Parcel survey — screening land against its power position",
        },
      ],
    },

    siteSelection: {
      eyebrow: "Site selection",
      heading: "What makes a parcel worth buying",
      lead:
        "We screen sites in this order. A site that fails the first test is not a data center site, no matter how good the price is.",
      items: [
        {
          title: "Available transmission capacity",
          description:
            "Not proximity to a power line — actual deliverable megawatts, with a utility willing to commit to them on a timeline. This single factor eliminates most candidate sites.",
        },
        {
          title: "Interconnection timeline",
          description:
            "A queue position measured in years turns a good site into a bad investment. We check the study status before anyone signs anything.",
        },
        {
          title: "Water and climate",
          description:
            "Cool climates cut cooling OPEX for the life of the asset. Water rights matter wherever evaporative or hybrid cooling is on the table.",
        },
        {
          title: "Fiber and carriers",
          description:
            "Diverse routes and real capacity. Training workloads move data volumes that make a single provider a single point of failure.",
        },
        {
          title: "Land, zoning and permits",
          description:
            "Correct zoning, buildable ground, room to expand, and a permitting authority that has done this before.",
        },
        {
          title: "Tax and incentives",
          description:
            "Investment tax credits, sales tax exemptions on equipment and local abatements can move the returns more than a better price on the land.",
        },
      ],
    },

    team: {
      eyebrow: "Who does the work",
      heading: "A team that has built this before",
      lead:
        "Data center development is not one discipline. It's engineering, procurement, energy, construction, project finance and law, and it fails at the seams between them. We assemble the whole chain under one point of accountability.",
      items: [
        {
          title: "Data center engineering",
          description:
            "Specialists with delivery experience on US data center projects, including facilities in Texas — electrical, mechanical, cooling and modular integration.",
        },
        {
          title: "Supply chain",
          description:
            "Established international sourcing for the long-lead items that stall projects: transformers, switchgear, cooling plant, batteries and network hardware.",
        },
        {
          title: "Energy and grid",
          description:
            "Interconnection strategy, utility negotiation, on-site generation and storage, and the tariff structures that determine whether the economics work.",
        },
        {
          title: "Project finance",
          description:
            "Structuring the holding and project companies, modelling the returns and bringing in institutional capital alongside yours.",
        },
        {
          title: "Legal and regulatory",
          description:
            "International corporate structuring, land and power contracts, offtake agreements and the regulatory process in the host jurisdiction.",
        },
        {
          title: "Software and AI",
          description:
            "Our own discipline — the operations, monitoring and AI systems that run on top of the facility once it's live. See our AI engineering work for what that looks like.",
        },
      ],
    },

    geo: {
      eyebrow: "Where we work",
      heading: "Sites on four continents",
      lead:
        "Power is local. The right jurisdiction depends on what you're optimizing for — cheap electricity, speed to market, tax treatment or proximity to your customers.",
      items: [
        { region: "United States", note: "Texas and MISO — deep transmission capacity, 30% investment tax credit on integrated solar and storage" },
        { region: "Northern Europe", note: "Cool climate, clean grids and in-city power positions for latency-sensitive inference" },
        { region: "South and Southeast Asia", note: "Hydropower economics and sovereign AI programmes, with India as the logistics and equipment hub" },
        { region: "Africa and Latin America", note: "Government-backed sovereign data center initiatives opening genuinely new markets" },
      ],
    },

    faq: {
      eyebrow: "Questions",
      heading: "What people ask before the first call",
      items: [
        {
          q: "What does a 10 MW data center cost?",
          a: "There is no honest single number, and anyone who gives you one on a website is guessing. The cost is driven by land price, how much grid work the site needs, rack density and therefore cooling architecture, whether you integrate generation and storage, equipment lead times and local labour. We price it properly once we know the site — a bad site can cost more in grid works than the entire IT load.",
        },
        {
          q: "How long does it take?",
          a: "Modular deployment runs 3–6 months from a prepared site, against 24–36 months for conventional construction. The honest caveat is that securing land and a firm power position usually takes longer than building the facility, which is why we start the grid conversation first.",
        },
        {
          q: "What do you need from me to start?",
          a: "A conversation. Concretely: roughly what you want to invest, whether you want to own the asset or contract it out, whether you have a target geography or an existing site, and what your time horizon is. From there we can tell you fairly quickly whether the project makes sense.",
        },
        {
          q: "Do I need a tenant before building?",
          a: "No, but it changes the risk profile substantially. Build-to-suit against a signed offtake finances far more easily than speculative capacity. If you'd rather not carry the leasing risk, we structure it that way from the start.",
        },
        {
          q: "Who owns the facility?",
          a: "Whoever the structure says. In a turnkey build you own the land and the asset outright. In a joint venture, ownership splits according to what each side contributes — land, power position, capital or delivery. We set this out before any money moves.",
        },
        {
          q: "Can you also supply the GPUs?",
          a: "We build and deliver the facility, and we work with the supply chain for the compute hardware. Whether GPUs sit in the same contract depends on your model — some owners lease shell and power, others want the whole stack including the compute revenue.",
        },
        {
          q: "Do you operate it after handover?",
          a: "Optional. Some clients take the keys and run it themselves, others want us on a long-term operations contract. Since we also build the AI and automation software, we can take on the monitoring and operations layer as well.",
        },
      ],
    },

    finalCta: {
      badge: "No obligation",
      heading: "Thinking about a data center? Let's talk before you buy land.",
      subtitle:
        "A 30-minute call. Tell us the budget, the geography and the time horizon, and we'll tell you honestly whether it's worth building, what it would take, and where the money actually goes.",
      primary: "Book a call",
      secondary: "Write to us",
      note: "We'll say so if we think your capital is better deployed elsewhere.",
    },
  },

  enterprise: {
    heroCta: "Book a discovery call",
    heroSecondary: "See pricing",
    problemStatPrefix: "81% of business leaders say AI is pivotal to their strategy. Yet most haven't deployed it beyond a chatbot.",
    problemStatSource: "— Microsoft 2025 Work Trend Index",
    liveEyebrow: "See it in action",
    liveHeading: "Not a chatbot. An AI that does the work.",
    liveLead: "Your team types in plain English. AI reads your files, opens your tools, and executes — like a colleague who knows every system in your company.",
    liveTeamTypes: "Your team types:",
    liveQuote: "\u201CPull last month's sales data, compare it to Q3, and write an exec summary in our format.\u201D",
    liveAIDoes: "AI does:",
    liveAIResult: "✓ Opens Google Sheets · reads your data · writes the summary · saves it to your Drive in your template",
    liveDuration: "38 seconds",
    liveNoDev: "No developer involved",
    liveNoPrompts: "No prompts to memorize",
    solutionEyebrow: "The Solution",
    solutionHeading: "One AI platform — one brain for your entire team",
    solutionLead: "Not a chatbot. Not a dashboard. A full AI platform with dedicated agents for every team, a shared knowledge vault, and your data secured on your infrastructure.",
    solutionCards: [
      { t: "AI for Every Team Member", d: "Every employee gets an AI assistant with full company context — from day one" },
      { t: "Custom AI Agents", d: "Dedicated agents per team, trained on your processes and connected to your tools" },
      { t: "Knowledge Vault", d: "All company knowledge indexed and available to AI — forever" },
      { t: "Connected to Your Tools", d: "AI talks to your CRM, email, chat, Shopify, databases — in real time" },
    ],
    solutionImageAlt: "An assembled modular platform: four agent modules seated in one enclosure, a gateway block on top, cabling entering from the side.",
    howItWorksEyebrow: "How It Works",
    howItWorksHeading: "From zero to AI-powered in 4 weeks",
    capabilitiesEyebrow: "Capabilities",
    capabilitiesHeading: "What your team gets",
    capabilitiesLead: "No coding. No prompts to memorize. No IT team needed.",
    skills: [
      { title: "Presentations & Reports", description: "AI creates polished decks, proposals, and reports from a simple brief — in your company's style." },
      { title: "Email & Calendar", description: "AI reads your inbox, drafts replies in your voice, and prepares smart meeting briefs automatically." },
      { title: "Research & Analysis", description: "AI analyzes competitors, market data, and industry trends — delivers structured findings you can act on." },
      { title: "CRM & Customer Data", description: "AI connects to your CRM, finds patterns, suggests next actions, and keeps your pipeline sharp." },
      { title: "Spreadsheets & Data", description: "No more manual formulas. AI processes your files, calculates, and visualizes in seconds." },
      { title: "Knowledge Base & Docs", description: "AI indexes your company docs and becomes an internal expert your team can ask anything." },
    ],
    agentsEyebrow: "AI Agents",
    agentsHeading: "13+ agents across your entire operation",
    agentCategories: [
      {
        name: "Client & Customer Service",
        agents: [
          { name: "Customer Concierge", does: "Handles tier-1 questions 24/7 — order status, returns, FAQs — and escalates complex issues" },
          { name: "Client Reporter", does: "Generates branded weekly/monthly reports for each client automatically" },
          { name: "Follow-up Agent", does: "Sends personalized follow-ups after calls, demos, and purchases — never lets a lead go cold" },
        ],
        imageId: "service",
        imageAlt: "A support desk with a headset resting beside the keyboard.",
      },
      {
        name: "Sales & Lead Management",
        agents: [
          { name: "Lead Qualifier", does: "Scores and routes inbound leads in under 5 minutes based on your criteria" },
          { name: "Proposal Builder", does: "Generates custom proposals from templates, CRM data, and past deals" },
          { name: "Outreach Agent", does: "Drafts and sends personalized outreach sequences across email and LinkedIn" },
        ],
        imageId: "sales",
        imageAlt: "Two colleagues going through a deal at a table by the window.",
      },
      {
        name: "Marketing & Content",
        agents: [
          { name: "Content Engine", does: "Creates blog posts, social media, newsletters from briefs in your brand voice" },
          { name: "Campaign Optimizer", does: "Analyzes ad performance across platforms and suggests improvements" },
          { name: "SEO Monitor", does: "Tracks rankings, finds keyword opportunities, drafts optimized content" },
        ],
        imageId: "marketing",
        imageAlt: "Printed proofs, a camera and colour swatches laid out on a studio table.",
      },
      {
        name: "Operations & Knowledge",
        agents: [
          { name: "Morning Dashboard", does: "Compiles overnight metrics, flags anomalies, prepares your daily briefing" },
          { name: "Knowledge Keeper", does: "Indexes all docs, SOPs, and conversations — answers any internal question instantly" },
          { name: "Report Generator", does: "Creates weekly/monthly reports from live data across all your tools" },
          { name: "Onboarding Guide", does: "Walks new hires through processes, answers questions, reduces ramp-up time" },
        ],
        imageId: "operations",
        imageAlt: "An archive aisle of identical binders, one being pulled from the shelf.",
      },
    ],
    integrationsEyebrow: "Integrations",
    integrationsHeading: "Connected to the tools you already use",
    integrationsCustomTag: "+ any REST API",
    compoundEyebrow: "It gets smarter",
    compoundHeading: "Every week, your AI knows your business better",
    compoundP1: "Every conversation teaches your AI more about your business. It remembers decisions, learns your terminology, builds on past work. After a month, it knows your processes. After three, it anticipates your needs. After six, it's irreplaceable.",
    compoundP2: "Consultants leave. Tools get abandoned. We stay — not just for the kickoff, but for the whole journey. Every month: new automations, new skills, new capabilities. Your AI platform grows with your business.",
    archEyebrow: "Architecture",
    archHeading: "Your data stays yours. We take this seriously.",
    archFacts: [
      "Data stays on your infrastructure — self-hosted VPS + Supabase",
      "OAuth 2.1 authentication with role-based access controls",
      "Full audit logs, usage monitoring, and ROI reporting",
      "No vendor lock-in — standard open protocols (MCP, REST API)",
    ],
    pricingEyebrow: "Pricing",
    pricingHeading: "Transparent pricing. No surprises.",
    pricingNote: "AI model costs ($20–200/month depending on usage) billed directly by providers — no markups from us.",
    pricingLabels: {
      agents: "Agents",
      seats: "Seats",
      timeline: "Timeline",
      setup: "Setup fee",
      monthly: "Monthly",
      bookCta: "Book a call",
    },
    pricingTiers: [
      { name: "Pilot", agents: "1–3", seats: "Up to 5", timeline: "4 weeks", setup: "From $3,000", monthly: "From $500/mo" },
      { name: "Scale", agents: "5–8", seats: "Up to 15", timeline: "8 weeks", setup: "From $8,000", monthly: "From $2,000/mo" },
      { name: "Enterprise", agents: "13+", seats: "Unlimited", timeline: "12 weeks", setup: "Custom", monthly: "Custom" },
    ],
    whyEyebrow: "Why Us",
    whyHeading: "Why Vento Labs, not doing it yourself",
    differentiators: [
      { title: "Built on the best AI", description: "We use Claude, GPT, and open-source frameworks — and extend them with your data, your tools, your workflows. No reinventing the wheel." },
      { title: "Knowledge compounds", description: "Every decision and conversation is saved. After 6 months, AI knows your business better than any new hire ever could." },
      { title: "Live in weeks, not months", description: "First agents work in 4 weeks. New ones deploy in days. We iterate on real data, not assumptions." },
    ],
    stakesEyebrow: "The cost of waiting",
    ctaHeading: "Ready to power your team with AI?",
    ctaDesc: "Book a discovery call. We'll map your processes and show you exactly which agents will save you the most time.",
    ctaPrimary: "Book a discovery call",
    faqHeading: "AI Platform — FAQ",
  },

  footer: {
    servicesHeading: "Services",
    companyHeading: "Company",
    contactHeading: "Contact",
    servicesLinks: [
      { label: "AI Agents", href: "/services/ai-assistant" },
      { label: "Automation", href: "/services/ai-automation" },
      { label: "Consulting", href: "/services/ai-training" },
      { label: "AI Platform", href: "/services/ai-workspace" },
      { label: "Data Centers", href: "/data-centers" },
    ],
    companyLinks: [
      { label: "Case Studies", href: "/cases" },
      { label: "Guides", href: "/blog" },
      { label: "Book a Call", href: "#book" },
    ],
    terms: "Terms",
    privacy: "Privacy",
    rights: "All rights reserved.",
    blurb: "Vento Labs is an AI automation agency: we design and build custom AI agents that cut costs, automate operations, and help businesses scale without adding headcount.",
    legalLine: "Vento Labs Pte. Ltd. · UEN 202504485G · Registered in Singapore · Working remotely from Lisbon",
    telegramLabel: "Telegram",
    linkedinLabel: "LinkedIn",
  },

  floating: {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    email: "Email",
    book: "Book a call",
    aria: "Contact us",
  },

  skipLink: "Skip to content",

  legal: {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: July 2026",
      intro: "This policy applies to Vento Labs Pte. Ltd. (UEN 202504485G), a company incorporated in the Republic of Singapore.",
      sections: [
        {
          heading: "1. Information We Collect",
          content: [
            "**Information you provide**",
            [
              "Contact information (name, email, company) when you book a call or fill out a form",
              "Business information shared during consultations and implementation",
              "Communication records (emails, call notes) related to our services",
            ],
            "**Information collected automatically**",
            [
              "Website usage data (pages visited, time on site, clicks on calls-to-action) collected via PostHog analytics and Google Tag Manager",
              "Device, browser, approximate location, and referral source information",
              "If you arrive from an advertising campaign, the advertising platform (such as Google Ads or Meta) may set cookies to measure whether the ad led to a call being booked",
            ],
          ],
        },
        {
          heading: "2. How We Use Your Information",
          content: [
            [
              "To provide and improve our AI automation services",
              "To communicate about your project and our services",
              "To schedule and conduct discovery calls",
              "To analyze website usage and improve user experience",
            ],
            "We do not sell, rent, or share your personal information with third parties for marketing purposes.",
          ],
        },
        {
          heading: "3. AI Model Provider Data Policies",
          content: [
            "When we implement AI solutions for your business, we use third-party AI model providers (such as OpenAI and Anthropic) via their business/API tiers. Key points:",
            [
              "Business and API-tier usage: your data is not used to train AI models by default",
              "Data is processed for the purpose of generating responses only and is subject to the provider's data retention policies",
              "We use API-level access with appropriate data handling agreements in place",
              "For clients with strict data requirements, we can implement self-hosted or on-premise AI models",
            ],
          ],
        },
        {
          heading: "4. Data Security",
          content: [
            "We implement industry-standard security measures to protect your data, including:",
            [
              "Encrypted communications (TLS/SSL)",
              "Role-based access controls for all systems",
              "Regular security reviews of our processes and tools",
              "Minimal data retention — we only keep what's necessary for service delivery",
            ],
          ],
        },
        {
          heading: "5. Data Retention",
          content: [
            "We retain your personal information only as long as necessary to provide our services and fulfill legal obligations. Project data is retained for the duration of our engagement plus 90 days for knowledge transfer. You may request deletion of your data at any time.",
          ],
        },
        {
          heading: "6. Your Rights",
          content: [
            "You have the right to:",
            [
              "Access the personal data we hold about you",
              "Request correction of inaccurate information",
              "Request deletion of your data",
              "Opt out of marketing communications",
              "Request a copy of your data in a portable format",
            ],
          ],
        },
        {
          heading: "7. Cookies and Tracking",
          content: [
            "Our website uses cookies and similar technologies to understand how visitors use the site and to measure the performance of our marketing campaigns. Specifically:",
            [
              "**PostHog & Google Tag Manager** — to measure page views, scroll depth, call-to-action clicks, and discovery-call bookings so we can improve the site",
              "**Advertising measurement cookies** — when you arrive from a paid campaign (Google Ads, Meta, Yandex, or similar), the corresponding platform may set a cookie so the advertiser can measure whether its campaign led to a booked call",
              "**Cal.com** — sets its own cookies inside its scheduling widget when you book a call",
            ],
            "We do not use cookies to build profiles for sale, and we do not share personal data with data brokers. You can block analytics and advertising cookies using your browser settings or a privacy extension at any time.",
          ],
        },
        {
          heading: "8. Third-Party Services",
          content: [
            "Our website integrates with Cal.com for appointment scheduling, PostHog for product analytics, and Google Tag Manager for marketing measurement. When you book a call, Cal.com's own privacy policy applies to the data you enter in their scheduling widget. When PostHog or an advertising platform collects data about your visit, the respective provider's privacy policy applies.",
          ],
        },
        {
          heading: "9. Changes to This Policy",
          content: [
            "We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.",
          ],
        },
        {
          heading: "10. Contact",
          content: [
            "For privacy-related inquiries, contact us at [alexey@ventolabs.com](mailto:alexey@ventolabs.com).",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      updated: "Last updated: April 2026",
      sections: [
        {
          heading: "1. Company & Services",
          content: [
            "Vento Labs Pte. Ltd. (UEN 202504485G), a company incorporated in Singapore (\"we,\" \"us,\" or \"our\"), provides AI automation consulting, implementation, and training services. By engaging our services, you agree to these terms.",
          ],
        },
        {
          heading: "2. Free AI Agent Pilot — Conditional Offer",
          content: [
            "Vento Labs offers a complimentary AI agent build (the \"Free Pilot\") to prospective clients as part of onboarding into a paid engagement. We cover the build, configuration, and deployment at no cost in exchange for the client proceeding to a signed services agreement for one of our commercial packages.",
            "Typical scope: a two-week build on Claude Agent SDK (or an equivalent agent framework), connected to a pre-agreed knowledge base and tool stack, deployed into the client's environment. The exact deliverable is confirmed in writing during the discovery call before any work begins.",
            "If the client does not sign a paid engagement, Vento Labs retains ownership of the Free Pilot — including code, prompts, and configurations. No fee is charged for the pilot work itself, but the deliverable is not transferred to the client unless a paid agreement is executed.",
            "Infrastructure costs (cloud hosting, AI model API usage) are the responsibility of the client and billed directly by the respective providers at all times, including during the Free Pilot period.",
          ],
        },
        {
          heading: "3. Client Responsibilities",
          content: [
            [
              "Provide accurate information about your business processes and requirements",
              "Ensure necessary access to systems and tools required for implementation",
              "Review and approve deliverables in a timely manner",
              "Pay infrastructure costs (AI model APIs, hosting) on your own accounts",
              "Comply with applicable laws regarding AI usage in your industry",
            ],
          ],
        },
        {
          heading: "4. Intellectual Property",
          content: [
            "Custom automations, configurations, and workflows created for your business belong to you. Our proprietary methodologies, templates, and tools remain our intellectual property. Open-source components are governed by their respective licenses.",
          ],
        },
        {
          heading: "5. Data Handling",
          content: [
            "We access client data solely for the purpose of implementing and maintaining agreed-upon automations. We do not store, sell, or share client data beyond what is necessary for service delivery. See our [Privacy Policy](privacy) for details.",
          ],
        },
        {
          heading: "6. Limitation of Liability",
          content: [
            "AI-powered systems may produce inaccurate or unexpected outputs. While we implement safeguards, guardrails, and testing procedures, we cannot guarantee 100% accuracy of AI-generated content or decisions. Clients should implement appropriate review processes for critical operations.",
            "Our liability is limited to the fees paid for services in the preceding 12 months. We are not liable for indirect, consequential, or incidental damages.",
          ],
        },
        {
          heading: "7. Termination",
          content: [
            "Either party may terminate the engagement with 14 days written notice. Upon termination, we will provide all necessary credentials, documentation, and knowledge transfer to ensure continuity of your automations.",
          ],
        },
        {
          heading: "8. Governing Law",
          content: [
            "These terms are governed by the laws of the Republic of Singapore. Disputes shall be resolved through good-faith negotiation before pursuing formal remedies.",
          ],
        },
        {
          heading: "9. Changes to Terms",
          content: [
            "We may update these terms from time to time. Significant changes will be communicated to active clients via email. Continued use of our services constitutes acceptance of updated terms.",
          ],
        },
      ],
      contactQuestion: "Questions? Contact us at [alexey@ventolabs.com](mailto:alexey@ventolabs.com).",
    },
  },
};
