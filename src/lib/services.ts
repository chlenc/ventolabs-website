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
  heroTitle: string;
  heroDescription: string;
  cardSummary: string;
  problems: string[];
  solution: string[];
  included: string[];
  outcomes: string[];
  faq: { q: string; a: string }[];
};

export const services: Record<ServiceSlug, ServiceDef> = {
  "ai-assistant": {
    slug: "ai-assistant",
    title: "AI Assistant",
    kicker: "Telegram & WhatsApp",
    heroTitle: "AI assistant that handles leads, FAQ, and internal tasks — launch in days",
    heroDescription:
      "Your team gets a smart assistant in Telegram or WhatsApp that captures leads, answers common questions from your knowledge base, drafts documents, and routes requests — without manual work.",
    cardSummary:
      "Smart assistant in Telegram or WhatsApp for lead capture, FAQ, document drafts, and internal tasks.",
    problems: [
      "Your team spends hours answering the same questions over and over",
      "Leads come in via chat but nobody tracks or qualifies them consistently",
      "Important requests get buried in group chats and forgotten",
      "New hires take weeks to learn internal processes and find the right info",
    ],
    solution: [
      "We deploy an AI assistant connected to your knowledge base — docs, FAQ, internal guides",
      "The assistant captures and qualifies incoming leads automatically, routing them to the right person",
      "It drafts responses, creates task summaries, and handles repetitive requests",
      "Your team gets instant answers instead of searching through files and chats",
    ],
    included: [
      "AI assistant deployed in Telegram or WhatsApp",
      "Connected to your knowledge base (documents, FAQ, guides)",
      "Lead capture and qualification workflow",
      "Automatic request routing and escalation",
      "Team training session on how to use and improve the assistant",
      "30 days of support and fine-tuning after launch",
    ],
    outcomes: [
      "Response time drops from hours to seconds",
      "Leads are captured and qualified automatically",
      "Team spends less time on repetitive questions",
      "New employees onboard faster with instant access to knowledge",
    ],
    faq: [
      {
        q: "Which messengers are supported?",
        a: "We deploy in Telegram and WhatsApp. Both support text, documents, and image processing. We recommend starting with whichever platform your team already uses.",
      },
      {
        q: "What kind of knowledge base can it use?",
        a: "PDFs, Google Docs, Notion pages, FAQ databases, internal wikis — any text-based source. We connect it during setup and show you how to keep it updated.",
      },
      {
        q: "How accurate are the answers?",
        a: "The assistant only answers from your approved knowledge base. If it doesn't know something, it says so and routes the question to a human. We fine-tune accuracy during the first 30 days.",
      },
    ],
  },

  "ai-automation": {
    slug: "ai-automation",
    title: "AI Process Automation",
    kicker: "Integrations & Workflows",
    heroTitle: "Automate manual work across your tools — CRM, sheets, tasks, and reports",
    heroDescription:
      "We connect your existing tools and build AI-powered workflows that handle data entry, report generation, and routine tasks — so your team focuses on what actually matters.",
    cardSummary:
      "AI-powered workflows connecting your CRM, spreadsheets, task managers, and reporting tools.",
    problems: [
      "Your team copies data between spreadsheets, CRM, and task managers manually",
      "Report generation takes hours every week — and the data is often outdated by the time it's ready",
      "Leads and requests slip through the cracks because nothing triggers automatically",
      "You've tried automation tools but couldn't set them up properly or they broke after a month",
    ],
    solution: [
      "We audit your current workflow and identify the biggest time sinks",
      "Build AI-powered automations connecting your existing tools (CRM, Google Sheets, task managers, email)",
      "Set up intelligent triggers — when a lead comes in, a task is created, a report is generated",
      "Monitor and maintain the automations so they keep working as your process evolves",
    ],
    included: [
      "Process audit and automation roadmap",
      "Custom workflow design and implementation",
      "Integration with your existing tools (CRM, sheets, task managers, email)",
      "AI-powered data processing and report generation",
      "Monitoring dashboard for automation health",
      "Ongoing support and adjustments as your process changes",
    ],
    outcomes: [
      "Hours of manual data entry eliminated every week",
      "Reports generated automatically with fresh data",
      "Zero leads lost — everything is tracked and followed up",
      "Your team focuses on decisions, not data shuffling",
    ],
    faq: [
      {
        q: "What tools do you integrate with?",
        a: "We work with most popular business tools — Google Workspace, HubSpot, Salesforce, Notion, Airtable, Slack, and many more. If your tool has an API, we can connect it.",
      },
      {
        q: "What happens if an automation breaks?",
        a: "We set up monitoring and alerts so we catch issues before you do. Our support package includes fixing and adjusting automations as your tools or processes change.",
      },
      {
        q: "How long does it take to set up?",
        a: "A typical automation workflow takes 1-2 weeks from audit to launch. Complex multi-tool integrations may take 3-4 weeks. You get a working MVP first, then we iterate.",
      },
    ],
  },

  "ai-training": {
    slug: "ai-training",
    title: "Team Training & Adoption",
    kicker: "AI Skills & Workflows",
    heroTitle: "Get your team actually using AI — with the right tools, habits, and workflows",
    heroDescription:
      "We don't just show your team ChatGPT. We train them on professional AI tools — Claude Code, Cursor, custom workflows — and build habits that stick.",
    cardSummary:
      "Hands-on training on Claude Code, Cursor, and AI workflows that your team will actually use.",
    problems: [
      "Your team 'tried AI' but it didn't stick — they went back to doing things manually",
      "Everyone uses AI differently, there's no standard, and results are inconsistent",
      "Developers don't know about AI coding tools that could double their output",
      "Managers can't tell if AI is actually saving time or just creating new busywork",
    ],
    solution: [
      "We start with a skills assessment to understand where AI can help your specific team",
      "Design custom training programs focused on real work tasks, not generic demos",
      "Train developers on Claude Code and Cursor for code generation, review, and debugging",
      "Train business teams on prompt engineering, document analysis, and content workflows",
    ],
    included: [
      "Team AI skills assessment",
      "Custom training curriculum based on your team's actual work",
      "Hands-on workshops with Claude Code, Cursor, and other professional AI tools",
      "Prompt libraries and workflow templates for your specific use cases",
      "Adoption tracking — we measure if people actually use what they learned",
      "Follow-up session 30 days after training to address questions and refine workflows",
    ],
    outcomes: [
      "Your team uses AI tools daily, not just occasionally",
      "Developers ship code faster with AI-assisted coding",
      "Business teams produce content, reports, and analysis in a fraction of the time",
      "You have measurable data on AI adoption and productivity gains",
    ],
    faq: [
      {
        q: "Is this a one-time workshop or ongoing training?",
        a: "Both options are available. We start with a workshop series, then offer monthly check-ins to sustain adoption and train on new tools as they emerge.",
      },
      {
        q: "What if our team has never used AI before?",
        a: "That's common and perfectly fine. We design training from the ground up, starting with fundamentals and progressing to advanced workflows based on your team's pace.",
      },
      {
        q: "How do you measure if the training worked?",
        a: "We track adoption metrics: how many team members use AI tools daily, time saved on specific tasks, and productivity changes. You get a report 30 days after training.",
      },
    ],
  },

  "ai-workspace": {
    slug: "ai-workspace",
    title: "Enterprise AI Workspace",
    kicker: "Governance & Access Control",
    heroTitle: "AI for your whole company — with access control, policies, and clear governance",
    heroDescription:
      "We set up a company-wide AI environment with managed subscriptions, role-based access, usage policies, and compliance guardrails — so AI adoption doesn't become chaos.",
    cardSummary:
      "Company-wide AI environment with managed subscriptions, access control, and compliance policies.",
    problems: [
      "Different teams use different AI tools with personal accounts — there's no oversight",
      "You're paying for scattered subscriptions and have no idea what the total AI spend is",
      "Sensitive company data goes to AI models through uncontrolled personal accounts",
      "There are no policies for how AI should be used, who approves outputs, or what's off-limits",
    ],
    solution: [
      "We audit your current AI usage across teams and identify risks and waste",
      "Set up centralized AI subscriptions with role-based access for each team",
      "Define clear usage policies: what data can be processed, who approves AI outputs, compliance requirements",
      "Build monitoring and reporting so leadership has visibility into AI usage and ROI",
    ],
    included: [
      "AI usage audit across all teams and departments",
      "Centralized subscription management (OpenAI, Anthropic, etc.)",
      "Role-based access control setup",
      "AI usage policy documentation",
      "Compliance review for your industry",
      "Usage monitoring and reporting dashboard",
      "Quarterly review and optimization sessions",
    ],
    outcomes: [
      "Full visibility into who uses AI, how, and at what cost",
      "Company data stays within approved, controlled environments",
      "AI spend is optimized — no duplicate subscriptions or waste",
      "Clear policies protect the company while enabling productive AI use",
    ],
    faq: [
      {
        q: "We're in a regulated industry. Can you handle compliance?",
        a: "Yes. We design the workspace with your compliance requirements in mind — data residency, audit trails, approval workflows. We've worked with financial and healthcare compliance frameworks.",
      },
      {
        q: "How do you manage subscriptions?",
        a: "We set up enterprise accounts with the major AI providers (OpenAI, Anthropic) under your company, with team-based access and usage limits. You get a single dashboard for all AI spend.",
      },
      {
        q: "Can we start small and expand?",
        a: "Absolutely. Most companies start with one department, prove the model works, then roll out company-wide. We design the workspace to scale from day one.",
      },
    ],
  },
};

export function getService(slug: string): ServiceDef | undefined {
  return services[slug as ServiceSlug];
}
