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

/** Project/site ids on /data-centers. Photos are mapped per-id in the
 * component, so translators never touch image paths. */
export type DataCenterProjectId = "east-texas" | "west-texas" | "midwest" | "stockholm";

/** Gallery photo ids on /data-centers — same reasoning as the project ids. */
export type DataCenterShotId =
  | "substation"
  | "transmission"
  | "switchgear"
  | "modular"
  | "parcel";

/** The four systems in the anatomy section. Each maps to a module render. */
export type DataCenterSystemId = "power" | "cooling" | "compute" | "structure";

/** Frames of the build sequence, in order. */
export type DataCenterBuildStepId = "site" | "foundations" | "craning" | "live";

/** The three phases of the home page's process section. Each maps to a photo
 * in the component, so translators only ever supply copy and alt text. */
export type HomeStepId = "audit" | "build" | "scale";

/** Home-page body links out to the business lines that aren't service cards.
 * Paths are mapped per-id in the component. */
export type HomeCrossLinkId = "data-centers" | "blog";

export type DataCentersDict = {
  navLabel: string;
  breadcrumb: string;
  seo: { title: string; description: string };

  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    /** Alt text for the full-bleed campus image under the hero copy. */
    imageAlt: string;
  };

  /** Big-numbers band under the hero. */
  stats: { value: string; label: string }[];

  /** Lead magnet — books a discovery call. `ctaHref` is "#book", which the
   * global CalendlyWidget click handler turns into the Cal.com modal. */
  leadMagnet: {
    badge: string;
    heading: string;
    description: string;
    bullets: string[];
    ctaLabel: string;
    ctaHref: string;
    footnote: string;
  };

  /** "You have capital and you're looking at a data center" — the main ask. */
  investor: {
    eyebrow: string;
    heading: string;
    lead: string;
    models: { title: string; description: string; points: string[] }[];
  };

  /** End-to-end delivery process: strategy → land → grid → build → operate. */
  process: {
    eyebrow: string;
    heading: string;
    lead: string;
    steps: { title: string; description: string; detail: string }[];
  };

  /** What a data center is actually made of. */
  anatomy: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** Wide exploded-cutaway figure leading the section. */
    cutawayAlt: string;
    cutawayCaption: string;
    groups: {
      id: DataCenterSystemId;
      title: string;
      description: string;
      imageAlt: string;
      items: { name: string; note: string }[];
    }[];
  };

  /** The build sequence — bare site to energized facility, four frames. */
  construction: {
    eyebrow: string;
    heading: string;
    lead: string;
    note: string;
    steps: { id: DataCenterBuildStepId; label: string; title: string; description: string; alt: string }[];
  };

  /** Traditional build vs modular — comparison table. */
  modular: {
    eyebrow: string;
    heading: string;
    lead: string;
    columns: { criterion: string; traditional: string; modular: string };
    rows: { criterion: string; traditional: string; modular: string }[];
    note: string;
  };

  /** Sites and projects. Counterparty names, exact addresses and commercial
   * terms are deliberately withheld — the source materials are NDA-bound. */
  projects: {
    eyebrow: string;
    heading: string;
    lead: string;
    disclaimer: string;
    specsLabel: string;
    items: {
      id: DataCenterProjectId;
      status: string;
      title: string;
      location: string;
      description: string;
      alt: string;
      tags: string[];
      specs: { k: string; v: string }[];
    }[];
  };

  /** Photo strip — infrastructure shots from live diligence and deployments. */
  gallery: {
    eyebrow: string;
    heading: string;
    lead: string;
    items: { id: DataCenterShotId; alt: string; caption: string }[];
  };

  /** What we look for when picking a site. */
  siteSelection: {
    eyebrow: string;
    heading: string;
    lead: string;
    items: { title: string; description: string }[];
  };

  /** Who does the work — experience is framed through the team, not through
   * ownership claims we can't evidence. */
  team: {
    eyebrow: string;
    heading: string;
    lead: string;
    items: { title: string; description: string }[];
  };

  /** Where we work. */
  geo: {
    eyebrow: string;
    heading: string;
    lead: string;
    items: { region: string; note: string }[];
  };

  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[];
  };

  finalCta: {
    badge: string;
    heading: string;
    subtitle: string;
    primary: string;
    secondary: string;
    note: string;
  };
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
    /** Offer pill rendered above the H1 — the free-pilot differentiator. */
    badge: string;
    line1: string;
    line2: string;
    line3: string;
    tags: string[];
    desc: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    /** Alt text and caption for the full-bleed band under the hero copy. */
    imageAlt: string;
    imageCaption: string;
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
    steps: { id: HomeStepId; title: string; description: string; imageAlt: string }[];
  };

  services: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** Body-copy links to the business lines that have no service card —
     * without these, /data-centers and /blog are reachable from the nav only. */
    crossEyebrow: string;
    crossLinks: {
      id: HomeCrossLinkId;
      title: string;
      description: string;
      cta: string;
    }[];
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

  /** Named client outcomes strip on the homepage (real engagements). */
  clientProof: {
    eyebrow: string;
    heading: string;
    lead: string;
    cta: string;
  };

  /** "Who you'll talk to" — founder block on the homepage. */
  founder: {
    eyebrow: string;
    heading: string;
    name: string;
    role: string;
    bio: string;
    points: string[];
    note: string;
  };

  /** Low-friction lead capture form (alternative to booking a call). */
  leadForm: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    /** Label for the pre-filled mailto fallback shown when the POST fails. */
    mailtoCta: string;
    privacyNote: string;
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
    /** Right-column note clarifying what the free pilot covers vs paid scope. */
    deliverablesNote: string;
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

  dataCenters: DataCentersDict;

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
    /** Legal identity line — company entity, registration, operating base. */
    legalLine: string;
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
