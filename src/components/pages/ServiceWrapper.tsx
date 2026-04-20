"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { ServicePage } from "@/components/ServicePage";
import { EnterprisePage } from "@/components/EnterprisePage";

export function ServiceWrapper({ slug }: { slug: string }) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const service = dict.services_pages[slug];
  if (!service) return null;
  if (slug === "ai-workspace") return <EnterprisePage service={service} />;
  return <ServicePage slug={slug} service={service} />;
}
