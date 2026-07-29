import type { Metadata } from "next";
import { CasesContent } from "@/components/pages/CasesContent";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, casesHubJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildPageMetadata({ locale: "en", path: "/cases", kind: "cases" });

export default function CasesPage() {
  return (
    <>
      <JsonLd data={casesHubJsonLd("en")} />
      <CasesContent />
    </>
  );
}
