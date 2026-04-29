export type ServiceDict = {
  title: string;
  kicker: string;
  navLabel: string;
  heroTitle: string;
  heroDescription: string;
  cardSummary: string;
  problems: string[];
  guide: { empathy: string; authority: string };
  plan: { title: string; description: string }[];
  included: string[];
  outcomes: string[];
  stakes: string;
  socialProof?: { company: string; result: string };
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
  /** Optional KPI table (before/after) — block 6 of long-form case landings. */
  metrics?: {
    eyebrow: string;
    heading: string;
    columns: { metric: string; before: string; after: string; change: string };
    rows: { metric: string; before: string; after: string; change: string }[];
    source: string;
  };
  /** Optional security/guarantee section — block 7 of long-form case landings. */
  guarantees?: {
    eyebrow: string;
    heading: string;
    items: { title: string; description: string }[];
  };
  /** Per-page override for hero CTAs (e.g. tel:/mailto: instead of #book). */
  ctaPrimary?: { label: string; href: string; meta?: string; kind?: "phone" | "mail" | "telegram" | "arrow" };
  ctaSecondary?: { label: string; href: string; meta?: string; kind?: "phone" | "mail" | "telegram" | "arrow" };
  /** Optional big-numbers band shown right after the hero. */
  trustStrip?: { value: string; label: string }[];
  /** Optional Telegram-driven lead magnet block. */
  leadMagnet?: {
    badge: string;
    heading: string;
    description: string;
    bullets: string[];
    ctaLabel: string;
    ctaHref: string;
    footnote: string;
  };
  /** Optional override for the bottom conversion banner (replaces shared bookFree* copy). */
  finalCta?: {
    badge: string;
    heading: string;
    subtitle: string;
    primary: { label: string; href: string; meta?: string; kind?: "phone" | "mail" | "telegram" | "arrow" };
    secondary?: { label: string; href: string; meta?: string; kind?: "phone" | "mail" | "telegram" | "arrow" };
    tertiary?: { label: string; href: string; meta?: string; kind?: "phone" | "mail" | "telegram" | "arrow" };
  };
};

export type CaseStudyDict = {
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { value: string; label: string }[];
};

export type AgentCategoryDict = {
  name: string;
  agents: { name: string; does: string }[];
};

export type Dictionary = {
  meta: {
    htmlLang: string;
    ogLocale: string;
  };

  site: {
    description: string;
  };

  seo: {
    homeTitle: string;
    homeDescription: string;
    titleTemplate: string;
    casesTitle: string;
    casesDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    termsTitle: string;
    termsDescription: string;
    keywords: string[];
  };

  nav: {
    links: { label: string; href: string }[];
    cta: { label: string; href: string };
    openMenu: string;
    giftAria: string;
    languageLabel: string;
  };

  hero: {
    line1: string;
    line2: string;
    line3: string;
    tags: string[];
    desc: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };

  problem: {
    eyebrow: string;
    heading: string;
    items: string[];
  };

  solution: {
    eyebrow: string;
    heading: string;
    lead: string;
    steps: { title: string; description: string }[];
  };

  services: {
    eyebrow: string;
    heading: string;
    lead: string;
  };

  leadMagnet: {
    giftLabel: string;
    title: string;
    items: string[];
    cta: string;
  };

  roi: {
    eyebrow: string;
    heading: string;
    lead: string;
    cards: {
      source: string;
      stat: string;
      statLabel: string;
      description: string;
      sample: string;
    }[];
    disclaimer: string;
  };

  security: {
    eyebrow: string;
    heading: string;
    items: { title: string; description: string }[];
  };

  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[];
  };

  finalCta: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: string;
  };

  exitPopup: {
    title: string;
    description: string;
    cta: string;
  };

  giftPopup: {
    title: string;
    description: string;
    cta: string;
  };

  casesIntro: {
    eyebrow: string;
    heading: string;
    lead: string;
    description: string;
    homeHeadingLead: string;
    homeHeadingEm: string;
    homeHeadingTail: string;
    homeCardMetrics: { contentFactory: string; supplierAgent: string; erpAgent: string };
  };

  cases: {
    records: Record<string, CaseStudyDict>;
    sectionLabels: {
      challenge: string;
      solution: string;
      result: string;
    };
    readyHeading: string;
    readyDesc: string;
    readyCta: string;
  };

  servicesCommon: {
    heroCta: string;
    heroSecondary: string;
    problemEyebrow: string;
    problemHeading: string;
    guideGet: string;
    guideTrackRecord: string;
    howItWorksEyebrow: string;
    howItWorksHeading: string;
    deliverablesEyebrow: string;
    deliverablesHeading: string;
    resultsEyebrow: string;
    resultsHeading: string;
    stakesEyebrow: string;
    socialProofEyebrow: string;
    bookFreeGiftLabel: string;
    bookFreeHeading: string;
    bookFreeSubtitle: string;
    bookFreeCta: string;
    faqSuffix: string;
  };

  services_pages: Record<string, ServiceDict>;

  case_pages: Record<string, ServiceDict>;

  enterprise: {
    heroCta: string;
    heroSecondary: string;
    problemStatPrefix: string;
    problemStatSource: string;
    liveEyebrow: string;
    liveHeading: string;
    liveLead: string;
    liveTeamTypes: string;
    liveQuote: string;
    liveAIDoes: string;
    liveAIResult: string;
    liveDuration: string;
    liveNoDev: string;
    liveNoPrompts: string;
    solutionEyebrow: string;
    solutionHeading: string;
    solutionLead: string;
    solutionCards: { t: string; d: string }[];
    howItWorksEyebrow: string;
    howItWorksHeading: string;
    capabilitiesEyebrow: string;
    capabilitiesHeading: string;
    capabilitiesLead: string;
    skills: { title: string; description: string }[];
    agentsEyebrow: string;
    agentsHeading: string;
    agentCategories: AgentCategoryDict[];
    integrationsEyebrow: string;
    integrationsHeading: string;
    integrationsCustomTag: string;
    compoundEyebrow: string;
    compoundHeading: string;
    compoundP1: string;
    compoundP2: string;
    archEyebrow: string;
    archHeading: string;
    archFacts: string[];
    pricingEyebrow: string;
    pricingHeading: string;
    pricingNote: string;
    pricingLabels: {
      agents: string;
      seats: string;
      timeline: string;
      setup: string;
      monthly: string;
      bookCta: string;
    };
    pricingTiers: {
      name: string;
      agents: string;
      seats: string;
      timeline: string;
      setup: string;
      monthly: string;
    }[];
    whyEyebrow: string;
    whyHeading: string;
    differentiators: { title: string; description: string }[];
    stakesEyebrow: string;
    resultsEyebrow: string;
    resultsHeading: string;
    resultsEntries: { company: string; industry: string; result: string }[];
    resultsCta: string;
    ctaHeading: string;
    ctaDesc: string;
    ctaPrimary: string;
    faqHeading: string;
  };

  footer: {
    servicesHeading: string;
    companyHeading: string;
    contactHeading: string;
    servicesLinks: { label: string; href: string }[];
    companyLinks: { label: string; href: string }[];
    terms: string;
    privacy: string;
    rights: string;
    blurb: string;
    telegramLabel: string;
    linkedinLabel: string;
  };

  floating: {
    telegram: string;
    whatsapp: string;
    email: string;
    book: string;
    aria: string;
  };

  skipLink: string;

  legal: {
    privacy: {
      title: string;
      updated: string;
      intro: string;
      sections: { heading: string; content: (string | string[])[] }[];
    };
    terms: {
      title: string;
      updated: string;
      sections: { heading: string; content: (string | string[])[] }[];
      contactQuestion: string;
    };
  };
};
