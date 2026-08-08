import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogSlugs, getBlogEntry, isBlogSlug } from "@/lib/blog";
import { BlogArticlePage } from "@/components/pages/blog/BlogArticlePage";
import { getArticleBody, getArticleHeadline } from "@/components/pages/blog/registry";
import { buildPageMetadata } from "@/lib/seo";
import { isValidLocale, nonDefaultLocales, type Locale } from "@/lib/i18n";
import { JsonLd, blogPostingJsonLd } from "@/lib/jsonld";

type Params = { lang: string; slug: string };

export function generateStaticParams(): Params[] {
  const params: Params[] = [];
  for (const lang of nonDefaultLocales) {
    for (const slug of blogSlugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang) || !isBlogSlug(slug)) return {};
  return buildPageMetadata({
    locale: lang as Locale,
    path: `/blog/${slug}`,
    kind: "article",
    blogSlug: slug,
  });
}

export default async function LocalizedArticlePage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;
  if (!isBlogSlug(slug)) notFound();
  const locale: Locale = isValidLocale(lang) ? lang : "en";
  const entry = getBlogEntry(slug);
  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          entry,
          locale,
          faq: getArticleBody(slug, locale)?.faq,
          headline: getArticleHeadline(slug, locale, entry.articleLocale),
        })}
      />
      <BlogArticlePage slug={slug} />
    </>
  );
}
