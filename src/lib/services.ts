export const servicesSlugs = [
  "ai-assistant",
  "ai-automation",
  "ai-training",
  "ai-workspace",
] as const;

export type ServiceSlug = (typeof servicesSlugs)[number];

export type ServiceDef = {
  slug: ServiceSlug;
  title: string;
  kicker: string;
  navLabel: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  cardSummary: string;
  problems: string[];
  guide: { empathy: string; authority: string };
  plan: { title: string; description: string }[];
  included: string[];
  outcomes: string[];
  stakes: string;
  socialProof?: { company: string; result: string };
  faq: { q: string; a: string }[];
};

export const services: Record<ServiceSlug, ServiceDef> = {
  "ai-assistant": {
    slug: "ai-assistant",
    title: "AI Agents",
    kicker: "Personal & Business AI",
    navLabel: "AI Agents",
    heroTitle: "Your own AI agent that works 24/7 — self-hosted, secure, fully yours",
    heroDescription:
      "We build custom AI agents powered by OpenClaw, LangGraph, CrewAI, and other leading frameworks. Self-hosted on your server or local machine. Controls your computer, uses any LLM — even local models. Manages Telegram, LinkedIn, WhatsApp, email, and any tool you use daily.",
    heroImage: "/images/page-ai-agent.jpg",
    cardSummary:
      "Custom AI agents — self-hosted, secure, powered by OpenClaw, LangGraph, CrewAI. From personal assistants to full business automation.",
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
      "Custom AI agent built on OpenClaw, LangGraph, or CrewAI",
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
      { q: "What frameworks do you use?", a: "We build on OpenClaw, LangGraph, CrewAI, and other leading open-source frameworks. We pick the best tool for your specific use case — there's no one-size-fits-all." },
      { q: "Can it really control my computer?", a: "Yes. Using computer-use capabilities, the agent can browse websites, fill forms, extract data, manage files, and interact with any application — just like a human assistant would." },
      { q: "What about data privacy?", a: "Your agent runs on your infrastructure — your server, your VPS, or even your office machine. Data never leaves your environment. You can use fully local LLMs for maximum privacy." },
      { q: "Which messengers and platforms are supported?", a: "Telegram, WhatsApp, LinkedIn, email (Gmail, Outlook), Slack, and any platform with an API. We can also add custom integrations." },
      { q: "How long does it take to build?", a: "A basic agent launches in 3-5 days. Complex multi-platform agents with custom integrations take 1-3 weeks. You always get a working MVP first." },
    ],
  },

  "ai-automation": {
    slug: "ai-automation",
    title: "AI Automation",
    kicker: "Workflows & Integrations",
    navLabel: "Automation",
    heroTitle: "Automate your operations — from lead to invoice, zero manual work",
    heroDescription:
      "We connect your tools and build intelligent workflows using n8n, Make.com, and custom integrations. Your CRM talks to your email, your forms feed your database, your reports generate themselves — and AI makes smart decisions at every step.",
    heroImage: "/images/page-automation.png",
    cardSummary:
      "Intelligent workflow automation with n8n, Make.com — connecting your CRM, email, forms, and databases into seamless operations.",
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
  },

  "ai-training": {
    slug: "ai-training",
    title: "AI Consulting & Training",
    kicker: "Team Enablement",
    navLabel: "Consulting",
    heroTitle: "Your team is stuck on ChatGPT. We'll get them to the next level.",
    heroDescription:
      "Most teams use AI at 10% of its potential. We come in, assess your workflows, install the right tools — Claude Code, Cursor, MCP servers, custom prompts — and train your team until AI becomes a daily habit, not a novelty.",
    heroImage: "/images/service-ai-training.jpg",
    cardSummary:
      "AI consulting and hands-on training — we install the right tools, teach real use cases, and make AI adoption stick.",
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
  },

  "ai-workspace": {
    slug: "ai-workspace",
    title: "Enterprise AI Platform",
    kicker: "AI Operating System",
    navLabel: "Enterprise",
    heroTitle: "Your entire company, powered by AI agents",
    heroDescription:
      "Not a chatbot. Not a dashboard. A full AI operating system — with dedicated agents for every department, a shared knowledge vault, and enterprise-grade security. Go live in 4 weeks.",
    heroImage: "/images/enterprise-solution.jpg",
    cardSummary:
      "Complete AI operating system for your company — dedicated agents, shared knowledge vault, enterprise security. Go live in 4 weeks.",
    problems: [
      "Your teams use different AI tools with personal accounts — there's zero oversight, inconsistent quality, and data scattered everywhere",
      "Critical company knowledge lives in people's heads — when someone leaves, their contacts, processes, and context leave with them",
      "You're paying for scattered AI subscriptions with no visibility into total spend, usage, or ROI",
      "There's no governance — no policies for what data goes where, who approves AI outputs, or what's off-limits",
    ],
    guide: {
      empathy: "Scaling AI across a company is hard. Individual tools work, but without a system it's chaos. We've seen it — and we've solved it.",
      authority: "We've deployed company-wide AI operating systems with 10+ agents, serving teams of 10-100+ people.",
    },
    plan: [
      { title: "Connect", description: "We audit your processes, connect your systems (CRM, email, chat, databases), and design your AI architecture. 1 week." },
      { title: "Launch", description: "We deploy AI agents for each department, fill the Knowledge Vault, configure access controls. Your team starts working with AI. 2-3 weeks." },
      { title: "Scale", description: "The system learns and grows. New agents are added in days, not months. Knowledge compounds. ROI accelerates." },
    ],
    included: [
      "Full process audit and AI architecture design",
      "Claude Team Plan setup with role-based access for every employee",
      "Custom AI agents for each department (sales, marketing, operations, support)",
      "Knowledge Vault — all company knowledge indexed and available to AI",
      "MCP Gateway — AI connected to your systems (Shopify, Gmail, WhatsApp, CRM, databases)",
      "Usage monitoring and ROI reporting dashboard",
      "AI usage policies and compliance documentation",
      "Employee onboarding to the AI platform",
      "Quarterly optimization reviews",
      "Priority support and agent updates",
    ],
    outcomes: [
      "Every employee has an AI assistant with full company context",
      "Company knowledge is preserved, indexed, and accessible — forever",
      "Full visibility into AI usage, costs, and ROI across all teams",
      "New AI agents deploy in days — the system grows with your business",
    ],
    stakes: "Without a system, AI adoption creates more chaos than it solves. Scattered tools, fragmented knowledge, zero governance — that's not innovation, it's a liability.",
    socialProof: { company: "ASG Compute", result: "13 AI agents deployed across 5 departments in 4 weeks" },
    faq: [
      { q: "How many AI agents can you deploy?", a: "We typically start with 5-8 agents and scale from there. Our largest deployment runs 20+ agents across multiple departments. The architecture supports unlimited expansion." },
      { q: "What about data security?", a: "Enterprise-grade: self-hosted databases, OAuth 2.1 authentication, role-based access, audit logs. Your data stays on your infrastructure. No vendor lock-in — we use standard open protocols." },
      { q: "Do we need a technical team?", a: "No. Vento Labs handles all technical implementation, monitoring, and updates. Your team uses AI through simple interfaces — chat, dashboards, automated reports." },
      { q: "What systems do you connect to?", a: "Shopify, Gmail, WhatsApp, Telegram, Google Drive, Notion, Slack, CRM systems, databases, and any service with a REST API. If your tool has an API, we connect it." },
      { q: "How much does it cost?", a: "We offer three tiers: Pilot (1-3 agents, up to 5 seats), Scale (5-8 agents, up to 15 seats), and Enterprise (13+ agents, unlimited). Setup starts from a fixed fee, plus monthly management. Claude Team Plan ($100/seat/month) is billed directly by Anthropic." },
    ],
  },
};

export function getService(slug: string): ServiceDef | undefined {
  return services[slug as ServiceSlug];
}
