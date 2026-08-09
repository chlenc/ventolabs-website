"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { ServicePage } from "@/components/ServicePage";
import { EnterprisePage } from "@/components/EnterprisePage";
import { serviceMedia } from "@/components/service-media";

export function ServiceWrapper({ slug }: { slug: string }) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const service = dict.services_pages[slug];
  if (!service) return null;
  const media = serviceMedia[slug];
  if (slug === "ai-workspace") return <EnterprisePage service={service} media={media} />;
  return <ServicePage slug={slug} service={service} media={media} />;
}
