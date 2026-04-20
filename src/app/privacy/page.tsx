import type { Metadata } from "next";
import { PrivacyContent } from "@/components/pages/LegalContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ locale: "en", path: "/privacy", kind: "privacy" });

export default function PrivacyPage() {
  return <PrivacyContent />;
}
