/**
 * Locale-agnostic site/brand info. Used by components that display contact
 * info or reference the company by name — these don't need translation.
 */
export const site = {
  name: "Vento Labs",
  url: "https://ventolabs.com",
  email: "alexey@ventolabs.com",
  phone: "+529998023600",
  phoneDisplay: "+52 999 802 3600",
  telegram: "https://t.me/defi_defiler",
  telegramHandle: "@defi_defiler",
  whatsapp: "https://wa.me/529998023600",
  linkedin: "https://www.linkedin.com/company/vento-labs/",
};

export const erpAgentContact = {
  phone: "+79032333525",
  phoneDisplay: "+7 903 233 35 25",
  whatsapp: "https://wa.me/79032333525",
};

export const bankruptcyAgentContact = {
  phone: "+79943182188",
  phoneDisplay: "+7 994 318 21 88",
  whatsapp: "https://wa.me/79943182188",
};

export const calendly = {
  /** Direct booking page — fallback when the embed can't load. */
  url: "https://cal.com/ventolabs/30min",
  calLink: "ventolabs/30min",
  namespace: "30min",
};
