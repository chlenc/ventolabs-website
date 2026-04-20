import type { Metadata } from "next";
import { CasesContent } from "@/components/pages/CasesContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ locale: "en", path: "/cases", kind: "cases" });

export default function CasesPage() {
  return <CasesContent />;
}
