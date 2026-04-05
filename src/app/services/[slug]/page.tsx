import { notFound } from "next/navigation";
import { servicesSlugs, getService } from "@/lib/services";
import { ServicePage } from "@/components/ServicePage";
import type { Metadata } from "next";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return servicesSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = getService(slug);
    if (!service) return {};
    return {
      title: `${service.title} — AI Automation`,
      description: service.heroDescription,
    };
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
