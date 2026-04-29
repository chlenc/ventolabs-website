"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { ServicePage } from "@/components/ServicePage";
import { ErpAgentPage } from "@/components/pages/ErpAgentPage";
import { isLandingSlug, type CaseLandingSlug } from "@/lib/cases";

const landingHeroImage: Record<CaseLandingSlug, string> = {
  "content-factory": "/images/case-content-factory.png",
  "supplier-agent": "/images/case-supplier-agent.png",
  "erp-agent": "/images/case-erp-agent.png",
};

export function CaseWrapper({ slug }: { slug: string }) {
  const locale = useLocale();
  const dict = getDictionary(locale);

  if (!isLandingSlug(slug)) return null;

  // ERP-agent has its own bespoke layout (interactive permission demo,
  // diptych spec, two-mode comparison, architecture diagram).
  if (slug === "erp-agent") return <ErpAgentPage />;

  const caseDict = dict.case_pages[slug];
  if (!caseDict) return null;

  return (
    <ServicePage
      slug={slug}
      service={caseDict}
      breadcrumb={{
        parentLabel: dict.casesIntro.eyebrow,
        parentHref: "/cases",
      }}
      heroImage={landingHeroImage[slug]}
    />
  );
}
