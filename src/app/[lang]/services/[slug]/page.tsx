import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesSlugs } from "@/lib/services";
import { ServiceWrapper } from "@/components/pages/ServiceWrapper";
import { buildPageMetadata } from "@/lib/seo";
import { isValidLocale, nonDefaultLocales, type Locale } from "@/lib/i18n";

type Params = { lang: string; slug: string };

export function generateStaticParams(): Params[] {
  const params: Params[] = [];
  for (const lang of nonDefaultLocales) {
    for (const slug of servicesSlugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};
  return buildPageMetadata({
    locale: lang as Locale,
    path: `/services/${slug}`,
    kind: "service",
    serviceSlug: slug,
  });
}

export default async function LocalizedServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!(servicesSlugs as readonly string[]).includes(slug)) notFound();
  return <ServiceWrapper slug={slug} />;
}
