import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseSlugs } from "@/lib/cases";
import { CaseWrapper } from "@/components/pages/CaseWrapper";
import { buildPageMetadata } from "@/lib/seo";
import { isValidLocale, nonDefaultLocales, type Locale } from "@/lib/i18n";

type Params = { lang: string; slug: string };

export function generateStaticParams(): Params[] {
  const params: Params[] = [];
  for (const lang of nonDefaultLocales) {
    for (const slug of caseSlugs) {
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
    path: `/cases/${slug}`,
    kind: "case",
    caseSlug: slug,
  });
}

export default async function LocalizedCasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!(caseSlugs as readonly string[]).includes(slug)) notFound();
  return <CaseWrapper slug={slug} />;
}
