import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/pages/blog/BlogIndexPage";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, blogIndexJsonLd } from "@/lib/jsonld";

export function generateMetadata(): Metadata {
  return buildPageMetadata({ locale: "en", path: "/blog", kind: "blog" });
}

export default function Page() {
  return (
    <>
      <JsonLd data={blogIndexJsonLd("en")} />
      <BlogIndexPage />
    </>
  );
}
