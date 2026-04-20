import type { Metadata } from "next";
import { TermsContent } from "@/components/pages/LegalContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ locale: "en", path: "/terms", kind: "terms" });

export default function TermsPage() {
  return <TermsContent />;
}
