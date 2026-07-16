import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/pages/blog/BlogIndexPage";
import { buildPageMetadata } from "@/lib/seo";
import { isValidLocale, nonDefaultLocales, type Locale } from "@/lib/i18n";
import { JsonLd, blogIndexJsonLd } from "@/lib/jsonld";

type Params = { lang: string };

export function generateStaticParams(): Params[] {
  return nonDefaultLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  return buildPageMetadata({ locale: lang as Locale, path: "/blog", kind: "blog" });
}

export default async function LocalizedBlogPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : "en";
  return (
    <>
      <JsonLd data={blogIndexJsonLd(locale)} />
      <BlogIndexPage />
    </>
  );
}
