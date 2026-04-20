import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: { htmlLang: "en", ogLocale: "en_US" },

  site: {
    description:
      "We design and build AI agents that cut operating costs, automate operations, and scale your business without adding headcount.",
  },

  seo: {
    homeTitle: "Vento Labs | AI Agents & Automation for Business",
    homeDescription:
      "Custom AI agents that cut operating costs, automate workflows, and scale your business without adding headcount. Free AI agent setup with every engagement.",
    titleTemplate: "%s — Vento Labs | AI Automation Agency",
    casesTitle: "AI Automation Case Studies — Real Business Results",
    casesDescription:
      "See how businesses cut response times by 90%, tripled content output, and automated lead qualification with Vento Labs AI agents. Real projects, measured results.",
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
      { label: "Cases", href: "/cases" },
    ],
    cta: { label: "Book a call", href: "#book" },
    openMenu: "Open menu",
    giftAria: "Free AI agent",
    languageLabel: "Language",
  },

  hero: {
    line1: "We design & build",
    line2: "AI agents",
    line3: "that grow your business",
    tags: [
      "Cut operational costs by 20–40%",
      "Replace 1–2 full-time roles with AI",
      "Go live in days, not months",
    ],
    desc: "Custom AI agents and automations that handle your repetitive work — so your team focuses on growth instead of busywork.",
    sub: "Book a call — we'll build your AI agent for free.",
    ctaPrimary: "Book a free call",
    ctaSecondary: "Our services",
    scroll: "Scroll",
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
    steps: [
      { title: "Audit", description: "We analyze your key processes in a 30-minute call. No fluff — we identify where AI can save the most time and money right now." },
      { title: "Build", description: "We set up your first AI agent — connected to your tools, knowledge base, and workflows. You see a working solution in days, not months." },
      { title: "Scale", description: "We expand automation across your operations by priority. Each iteration has clear KPIs, and we support you as your needs evolve." },
    ],
  },

  services: {
    eyebrow: "What We Do",
    heading: "Four ways we help your business work smarter",
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
      { title: "Nothing leaks, nothing breaks", description: "Your assistant operates within strict guardrails. It can't delete, modify, or share data outside its defined scope." },
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
      { q: "Can we stop after the first setup?", a: "Absolutely. The initial build is yours to keep. Many clients start there and come back when they're ready to automate more. There's no lock-in or long-term commitment required." },
      { q: "Do you work with our industry?", a: "Our approach works across industries — the AI tools are flexible and we customize the knowledge base, workflows, and policies to your specific needs. We've worked with professional services, e-commerce, SaaS, and consulting firms." },
    ],
  },

  finalCta: {
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

  casesIntro: {
    eyebrow: "Case Studies",
    heading: "Real projects. Measured results.",
    lead: "Companies that adopt AI win. The rest fall behind.",
    description: "When computers were invented, companies that adopted them became faster, cheaper, and more competitive. Those that didn't went bankrupt. AI is the same inflection point — and the window is closing. Don't lose money and time. Start winning now.",
  },

  cases: {
    records: {
      zigmund: {
        industry: "Online Therapy Platform",
        title: "AI agent cut patient intake time by 80% and handles 200+ conversations daily",
        challenge: "Zigmund Online's support team was overwhelmed — 200+ daily inquiries about therapist availability, session booking, and insurance questions. Patients waited 3-4 hours for a response, and 30% dropped off before booking.",
        solution: "Deployed a self-hosted AI agent in Telegram and WhatsApp that handles patient intake, answers insurance questions from the knowledge base, matches patients with available therapists, and books sessions automatically.",
        result: "Patient response time dropped from 4 hours to under 2 minutes. Booking conversion increased by 40%. The support team now focuses on complex cases instead of repetitive intake.",
        metrics: [
          { value: "2 min", label: "response time (was 4 hours)" },
          { value: "+40%", label: "booking conversion" },
          { value: "200+", label: "conversations handled daily" },
        ],
      },
      noconcept: {
        industry: "E-commerce",
        title: "Automated product management saves 25 hours per week across the team",
        challenge: "NoConcept manages 3,000+ SKUs across multiple marketplaces. Price updates, stock sync, and customer inquiries consumed 5+ hours daily. Lead qualification from the website and social channels was entirely manual.",
        solution: "Built an automation pipeline with n8n: incoming leads are qualified by AI, product data syncs across platforms in real-time, customer questions are answered from the product database, and weekly analytics reports generate automatically.",
        result: "Lead response time dropped from 6 hours to 8 minutes. Product data sync errors eliminated. The team reclaimed 25+ hours per week for growth activities instead of data entry.",
        metrics: [
          { value: "8 min", label: "lead response (was 6 hours)" },
          { value: "25h", label: "saved per week" },
          { value: "3,000+", label: "SKUs managed automatically" },
        ],
      },
      asgcompute: {
        industry: "Cloud Infrastructure",
        title: "Enterprise AI workspace deployed for 45 employees across 5 departments in 4 weeks",
        challenge: "ASG Compute had no AI governance. Engineers used personal ChatGPT accounts, sales had no AI tools, and sensitive infrastructure data was going through uncontrolled channels. No visibility into AI spend or usage.",
        solution: "Deployed a full AI operating system: Claude Team Plan for all 45 employees, 13 custom AI agents across sales, engineering, DevOps, marketing, and support. Knowledge Vault with all internal documentation. Role-based access and compliance policies.",
        result: "Full AI adoption across all departments in under 4 weeks. AI spend consolidated and reduced by 35%. New AI agents now deploy in 2-3 days instead of weeks. Company knowledge is preserved and accessible to every team member.",
        metrics: [
          { value: "13", label: "AI agents deployed" },
          { value: "4 weeks", label: "from zero to full adoption" },
          { value: "–35%", label: "AI infrastructure costs" },
        ],
      },
    },
    sectionLabels: { challenge: "Challenge", solution: "Solution", result: "Result" },
    readyHeading: "Ready to join them?",
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
    resultsEyebrow: "Results",
    resultsHeading: "What you can expect",
    stakesEyebrow: "The cost of waiting",
    socialProofEyebrow: "Client result",
    bookFreeGiftLabel: "FREE AI AGENT",
    bookFreeHeading: "Book a call — we'll set up your AI agent for free",
    bookFreeSubtitle: "30-minute discovery call. No pitch, no pressure.",
    bookFreeCta: "Claim your free AI agent",
    faqSuffix: "FAQ",
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
      socialProof: { company: "Zigmund Online", result: "Response time dropped from 4 hours to under 2 minutes" },
      faq: [
        { q: "What frameworks do you use?", a: "We build on Claude Agent SDK, LangGraph, CrewAI, and other leading open-source frameworks. We pick the best tool for your specific use case — there's no one-size-fits-all." },
        { q: "Can it really control my computer?", a: "Yes. Using computer-use capabilities, the agent can browse websites, fill forms, extract data, manage files, and interact with any application — just like a human assistant would." },
        { q: "What about data privacy?", a: "Your agent runs on your infrastructure — your server, your VPS, or even your office machine. Data never leaves your environment. You can use fully local LLMs for maximum privacy." },
        { q: "Which messengers and platforms are supported?", a: "Telegram, WhatsApp, LinkedIn, email (Gmail, Outlook), Slack, and any platform with an API. We can also add custom integrations." },
        { q: "How long does it take to build?", a: "A basic agent launches in 3-5 days. Complex multi-platform agents with custom integrations take 1-3 weeks. You always get a working MVP first." },
      ],
      seo: {
        title: "Custom AI Agents — Self-Hosted, Secure, 24/7",
        description: "We build self-hosted AI agents on Claude Agent SDK, LangGraph, CrewAI. Controls your computer, integrates with Telegram, LinkedIn, WhatsApp. Free agent setup included.",
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
      socialProof: { company: "NoConcept", result: "Lead response time dropped from 6 hours to 8 minutes" },
      faq: [
        { q: "What tools do you integrate with?", a: "Google Workspace, HubSpot, Salesforce, Notion, Airtable, Slack, Telegram, WhatsApp, Shopify, WooCommerce, Stripe, and any tool with an API. If it exists, we can connect it." },
        { q: "What happens if an automation breaks?", a: "We set up monitoring and alerts so we catch issues before you do. Our support package includes fixing and adapting automations as your tools or processes change." },
        { q: "Can AI make decisions in the workflow?", a: "Yes. We integrate AI at decision points — qualifying leads, categorizing requests, drafting responses, prioritizing tasks. The AI handles judgment calls that used to require a human." },
        { q: "How is this different from just using Zapier?", a: "We use n8n (self-hosted, no per-task pricing) and Make.com for complex workflows. More importantly, we add AI intelligence and ongoing maintenance — not just point-and-click connections." },
      ],
      seo: {
        title: "AI Process Automation — n8n, Make.com & Custom Workflows",
        description: "Automate lead qualification, data sync, reporting, and workflows with AI-powered n8n and Make.com automations. Zero manual data entry.",
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
      socialProof: { company: "Odivo Pro", result: "Team AI adoption went from 12% to 89% in 60 days" },
      faq: [
        { q: "What if our team has never used AI before?", a: "That's common and perfectly fine. We design training from the ground up, starting with fundamentals and progressing to advanced workflows based on your team's pace." },
        { q: "Is this a one-time workshop or ongoing?", a: "Both options available. We start with an intensive workshop series, then offer monthly check-ins to sustain adoption. We measure at 30 and 60 days and adjust." },
        { q: "Can you help with our own AI development project?", a: "Yes. Beyond training, we provide consulting for companies building their own AI products — architecture review, tool selection, implementation strategy, risk assessment." },
        { q: "What tools do you teach?", a: "Claude Code, Cursor, MCP servers, prompt engineering, n8n/Make for automation, and whatever else fits your team's needs. We don't push one tool — we find what works." },
      ],
      seo: {
        title: "AI Consulting & Team Training — Claude Code, Cursor, MCP",
        description: "We install Claude Code, Cursor, and MCP servers, train your team on real workflows, and measure adoption at 30 and 60 days. AI consulting for projects of any scale.",
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
      socialProof: { company: "ASG Compute", result: "13 AI agents deployed across 5 departments in 4 weeks" },
      faq: [
        { q: "How many AI agents can you deploy?", a: "We typically start with 3-5 agents and scale from there. Our largest deployment runs 20+ agents across multiple departments. The architecture supports unlimited expansion." },
        { q: "What about data security?", a: "Your data stays on your infrastructure — self-hosted databases, role-based access, audit logs. No vendor lock-in — we use standard open protocols." },
        { q: "Do we need a technical team?", a: "No. Vento Labs handles all technical implementation, monitoring, and updates. Your team uses AI through simple interfaces — chat, dashboards, automated reports." },
        { q: "What systems do you connect to?", a: "Shopify, Gmail, WhatsApp, Telegram, Google Drive, Notion, Slack, CRM systems, databases, and any service with a REST API. If your tool has an API, we connect it." },
        { q: "What size companies is this for?", a: "Teams of 5 to 200+. We work with marketing agencies, e-commerce brands, SaaS companies, and professional services firms. The Pilot tier starts at just 5 seats — you don't need to be a large enterprise." },
        { q: "How much does it cost?", a: "Pilot starts from $3,000 setup + $500/month. Scale starts from $8,000 setup + $2,000/month. Enterprise is custom-priced. AI model costs ($20-200/month depending on usage) are billed directly by providers — no markups." },
      ],
      seo: {
        title: "Enterprise AI Platform — AI Operating System for Business",
        description: "Full AI operating system: dedicated agents per department, Knowledge Vault, MCP Gateway, enterprise security. Deploy in 4 weeks. Pricing from Pilot to Enterprise.",
      },
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
      },
      {
        name: "Sales & Lead Management",
        agents: [
          { name: "Lead Qualifier", does: "Scores and routes inbound leads in under 5 minutes based on your criteria" },
          { name: "Proposal Builder", does: "Generates custom proposals from templates, CRM data, and past deals" },
          { name: "Outreach Agent", does: "Drafts and sends personalized outreach sequences across email and LinkedIn" },
        ],
      },
      {
        name: "Marketing & Content",
        agents: [
          { name: "Content Engine", does: "Creates blog posts, social media, newsletters from briefs in your brand voice" },
          { name: "Campaign Optimizer", does: "Analyzes ad performance across platforms and suggests improvements" },
          { name: "SEO Monitor", does: "Tracks rankings, finds keyword opportunities, drafts optimized content" },
        ],
      },
      {
        name: "Operations & Knowledge",
        agents: [
          { name: "Morning Dashboard", does: "Compiles overnight metrics, flags anomalies, prepares your daily briefing" },
          { name: "Knowledge Keeper", does: "Indexes all docs, SOPs, and conversations — answers any internal question instantly" },
          { name: "Report Generator", does: "Creates weekly/monthly reports from live data across all your tools" },
          { name: "Onboarding Guide", does: "Walks new hires through processes, answers questions, reduces ramp-up time" },
        ],
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
    resultsEyebrow: "Results",
    resultsHeading: "Companies we've helped",
    resultsEntries: [
      { company: "NoConcept", industry: "E-commerce", result: "Lead response dropped from 6 hours to 8 minutes. 25 hours/week saved across the team." },
      { company: "Zigmund Online", industry: "Healthcare", result: "Patient response time from 4 hours to 2 minutes. Booking conversion up 40%." },
      { company: "ASG Compute", industry: "Cloud / SaaS", result: "13 AI agents deployed across 5 departments in 4 weeks. AI costs reduced 35%." },
    ],
    resultsCta: "See all case studies",
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
    ],
    companyLinks: [
      { label: "Case Studies", href: "/cases" },
      { label: "Book a Call", href: "#book" },
    ],
    terms: "Terms",
    privacy: "Privacy",
    rights: "All rights reserved.",
    blurb: "We design and build AI agents that cut costs, automate operations, and help businesses scale without adding headcount.",
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
      updated: "Last updated: April 2026",
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
              "Website usage data (pages visited, time on site, clicks on calls-to-action) collected via Google Analytics 4",
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
              "**Google Tag Manager & Google Analytics 4** — to measure page views, scroll depth, call-to-action clicks, and discovery-call bookings so we can improve the site",
              "**Advertising measurement cookies** — when you arrive from a paid campaign (Google Ads, Meta, Yandex, or similar), the corresponding platform may set a cookie so the advertiser can measure whether its campaign led to a booked call",
              "**Calendly** — sets its own cookies inside its scheduling widget when you book a call",
            ],
            "We do not use cookies to build profiles for sale, and we do not share personal data with data brokers. You can block analytics and advertising cookies using your browser settings or a privacy extension at any time.",
          ],
        },
        {
          heading: "8. Third-Party Services",
          content: [
            "Our website integrates with Calendly for appointment scheduling and Google Tag Manager for analytics and marketing measurement. When you book a call, Calendly's own privacy policy applies to the data you enter in their scheduling widget. When Google Analytics or an advertising platform collects data about your visit, the respective provider's privacy policy applies.",
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
          heading: "2. Free AI Assistant Setup",
          content: [
            "Vento Labs offers a complimentary AI assistant setup as a demonstration of our capabilities. There is no obligation to purchase additional services. You are free to keep the setup and end the engagement after the initial deployment.",
            "The free setup includes a basic AI assistant configuration as described during the discovery call. Any customization, additional features, or ongoing maintenance beyond the initial setup constitutes paid services.",
            "Infrastructure costs (cloud hosting, AI model API usage) are the responsibility of the client and are billed directly by the respective providers.",
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
