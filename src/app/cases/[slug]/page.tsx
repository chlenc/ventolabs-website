import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseSlugs } from "@/lib/cases";
import { CaseWrapper } from "@/components/pages/CaseWrapper";
import { buildPageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    if (!(caseSlugs as readonly string[]).includes(slug)) return {};
    return buildPageMetadata({
      locale: "en",
      path: `/cases/${slug}`,
      kind: "case",
      caseSlug: slug,
    });
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!(caseSlugs as readonly string[]).includes(slug)) notFound();
  return <CaseWrapper slug={slug} />;
}
