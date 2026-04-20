import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesSlugs, type ServiceSlug } from "@/lib/services";
import { ServiceWrapper } from "@/components/pages/ServiceWrapper";
import { buildPageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return servicesSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const dict = getDictionary("en");
    const service = dict.services_pages[slug as ServiceSlug];
    if (!service) return {};
    return buildPageMetadata({
      locale: "en",
      path: `/services/${slug}`,
      kind: "service",
      serviceSlug: slug,
    });
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!(servicesSlugs as readonly string[]).includes(slug)) notFound();
  return <ServiceWrapper slug={slug} />;
}
