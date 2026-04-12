export const site = {
  name: "Vento Labs",
  url: "https://ventolabs.com",
  email: "alexey@ventolabs.com",
  phone: "+351932111777",
  phoneDisplay: "+351 932 111 777",
  telegram: "https://t.me/defi_defiler",
  telegramHandle: "@defi_defiler",
  whatsapp: "https://wa.me/351932111777",
  linkedin: "https://www.linkedin.com/company/vento-labs/",
  description:
    "We design and build AI agents that cut operating costs, automate operations, and scale your business without adding headcount.",
};

export const hero = {
  subtitle:
    "Book a call — we'll set up your AI assistant for free.",
  ctaPrimary: "Book a free call",
  ctaSecondary: "Our services",
};

export const problems = [
  "Your team wastes hours on repetitive tasks — answering the same questions, searching for info, compiling reports manually",
  "Leads and requests slip through the cracks between chats, spreadsheets, and email threads",
  "You tried AI tools — your team played around for a week and went back to doing things the old way",
  "There's no clear process for adopting AI — everyone does their own thing, with inconsistent results",
];

export const solutionSteps = [
  {
    title: "Audit",
    description:
      "We analyze your key process in a 30-60 minute call. No fluff — we identify where AI can save the most time and money right now.",
  },
  {
    title: "Build",
    description:
      "We set up your first AI agent — connected to your tools, knowledge base, and workflows. You see a working solution in days, not months.",
  },
  {
    title: "Scale",
    description:
      "We expand automation across your operations by priority. Each iteration has clear KPIs, and we support you as your needs evolve.",
  },
];

export const leadMagnet = {
  title: "Book a call — we'll set up your AI agent for free",
  items: [
    "Custom AI agent deployed for your team",
    "Connected to your knowledge base — docs, FAQ, internal guides",
    "Short training session so your team can start using it immediately",
    "Infrastructure costs are on your account — fully transparent",
  ],
  cta: "Claim your free AI agent",
};

export const roiCards = [
  {
    source: "Stanford & MIT, 2023",
    sourceUrl: "https://www.nber.org/papers/w31161",
    logo: "stanford",
    stat: "+14%",
    statLabel: "productivity",
    description:
      "Customer support agents with an AI assistant showed 14% higher productivity on average — and up to 34% for new hires.",
    sample: "Controlled study of 5,179 agents across a Fortune 500 company",
  },
  {
    source: "Science, 2023",
    sourceUrl: "https://www.science.org/doi/10.1126/science.adh2586",
    logo: "science",
    stat: "–40%",
    statLabel: "time on tasks",
    description:
      "Professionals using AI for writing tasks completed them 40% faster with 18% higher quality ratings.",
    sample: "Randomized experiment with 453 professionals across industries",
  },
  {
    source: "GitHub & Microsoft, 2022",
    sourceUrl: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/",
    logo: "github",
    stat: "~56%",
    statLabel: "faster coding",
    description:
      "Developers using AI coding tools completed tasks significantly faster in controlled experiments.",
    sample: "Controlled experiment measuring task completion speed",
  },
];

export const roiDisclaimer =
  "Every business is different. These are peer-reviewed research benchmarks, not guarantees. We measure your actual results during implementation.";

export const securityPoints = [
  {
    title: "No training on your data",
    description:
      "We use API-level access only. Your business data is never used to train AI models.",
  },
  {
    title: "Full transparency",
    description:
      "Everything runs on your own accounts. You see every cost, every API call, every access log.",
  },
  {
    title: "Access controls from day one",
    description:
      "Role-based permissions, audit trails, and clear boundaries for what the AI can and cannot do.",
  },
  {
    title: "Nothing leaks, nothing breaks",
    description:
      "Your assistant operates within strict guardrails. It can't delete, modify, or share data outside its defined scope.",
  },
];

export const faq = [
  {
    q: "Will the AI make things up or hallucinate?",
    a: "We configure every agent to answer strictly from your approved knowledge base. If it doesn't know something, it says so and routes the question to a human. We also fine-tune and test accuracy before launch.",
  },
  {
    q: "What data goes to external AI models?",
    a: "Only the data you explicitly allow. We use business-tier API access where your data is not used for model training. We can also set up self-hosted models for maximum control if your compliance requires it.",
  },
  {
    q: "How much does it cost to run monthly?",
    a: "Typical AI model costs are $20–200/month depending on usage volume. We give you a detailed cost estimate before starting, and you pay providers directly — no markups.",
  },
  {
    q: "How long does implementation take?",
    a: "A basic AI agent launches in 3-7 days. Process automation workflows take 1-3 weeks. Enterprise workspace setup is typically 2-4 weeks. You always get a working solution first.",
  },
  {
    q: "Can we stop after the first setup?",
    a: "Absolutely. The initial build is yours to keep. Many clients start there and come back when they're ready to automate more. There's no lock-in or long-term commitment required.",
  },
  {
    q: "Do you work with our industry?",
    a: "Our approach works across industries — the AI tools are flexible and we customize the knowledge base, workflows, and policies to your specific needs. We've worked with professional services, e-commerce, SaaS, and consulting firms.",
  },
];

export const calendly = {
  title: "Book a 20-minute discovery call",
  subtitle:
    "No pitch, no pressure. We'll look at your process and tell you what's possible. Plus — we'll set up your AI agent for free.",
  url: "https://calendly.com/alexey-ventolabs/30min",
};

export const exitPopup = {
  title: "Wait — free AI agent for your business",
  description:
    "Book a 20-minute call and we'll build and deploy a custom AI agent for your team. Zero cost for the setup.",
  cta: "Claim your free AI agent",
};

export const giftPopup = {
  title: "🎁 Free AI Agent",
  description:
    "Book a discovery call and we'll set up a custom AI agent for your business — completely free.",
  cta: "Book a free call",
};

export const caseStudies = [
  {
    label: "Pilot Project",
    title: "AI assistant for a consulting firm's internal knowledge base",
    challenge:
      "Consultants spent 30+ minutes per day searching for past project templates, client frameworks, and internal guidelines across scattered Google Docs and Notion pages.",
    solution:
      "Deployed an AI assistant in Telegram connected to the firm's Notion workspace and Google Drive. The assistant instantly finds relevant documents, drafts summaries, and answers process questions.",
    result:
      "Average time to find internal documents dropped from 30+ minutes to under 2 minutes. Team adoption reached 85% within the first two weeks.",
    tech: ["Telegram Bot", "Claude API", "Notion API", "Google Drive"],
  },
  {
    label: "Internal Deployment",
    title: "Automated lead qualification for an e-commerce agency",
    challenge:
      "The sales team received 50+ inbound inquiries per week via email and chat. Manually reading, categorizing, and responding to each one took the entire morning.",
    solution:
      "Built an automation workflow that reads incoming inquiries, qualifies them based on criteria (budget, timeline, fit), drafts personalized responses, and creates tasks in the CRM for qualified leads.",
    result:
      "Lead response time dropped from 4 hours to under 15 minutes. The team now spends mornings on sales calls instead of inbox triage.",
    tech: ["n8n", "OpenAI API", "HubSpot", "Gmail API"],
  },
  {
    label: "Pilot Project",
    title: "AI-powered content workflow for a SaaS marketing team",
    challenge:
      "The marketing team of 3 needed to produce 12+ blog posts, 40+ social media posts, and 4 newsletters per month. The bottleneck was always first drafts and research.",
    solution:
      "Set up an AI content pipeline: topic research and outline generation, first draft creation, SEO optimization suggestions, and social media repurposing — all triggered from a simple Notion board.",
    result:
      "Content production capacity increased by approximately 3x without hiring. First draft time dropped from 3-4 hours to 30 minutes per piece.",
    tech: ["Claude API", "Notion API", "Google Sheets", "Make"],
  },
];

export const nav = {
  links: [
    { label: "Cases", href: "/cases" },
  ],
  cta: { label: "Book a call", href: "#book" },
};

export const footer = {
  blurb:
    "We design and build AI agents that cut costs, automate operations, and help businesses scale without adding headcount.",
  services: [
    { label: "AI Agents", href: "/services/ai-assistant" },
    { label: "Process Automation", href: "/services/ai-automation" },
    { label: "Team Training", href: "/services/ai-training" },
    { label: "Enterprise Workspace", href: "/services/ai-workspace" },
  ],
  company: [
    { label: "Case Studies", href: "/cases" },
    { label: "Book a Call", href: "#book" },
  ],
};
