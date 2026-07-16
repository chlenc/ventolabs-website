import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogSlugs, getBlogEntry, isBlogSlug } from "@/lib/blog";
import { BlogArticlePage } from "@/components/pages/blog/BlogArticlePage";
import { articles } from "@/components/pages/blog/registry";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, blogPostingJsonLd } from "@/lib/jsonld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogSlug(slug)) return {};
  return buildPageMetadata({ locale: "en", path: `/blog/${slug}`, kind: "article", blogSlug: slug });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!isBlogSlug(slug)) notFound();
  const entry = getBlogEntry(slug);
  return (
    <>
      <JsonLd data={blogPostingJsonLd({ entry, locale: "en", faq: articles[slug].faq })} />
      <BlogArticlePage slug={slug} />
    </>
  );
}
