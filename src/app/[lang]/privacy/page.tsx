import type { Metadata } from "next";
import { PrivacyContent } from "@/components/pages/LegalContent";
import { buildPageMetadata } from "@/lib/seo";
import { isValidLocale, type Locale } from "@/lib/i18n";

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  return buildPageMetadata({ locale: lang as Locale, path: "/privacy", kind: "privacy" });
}

export default function LocalizedPrivacyPage() {
  return <PrivacyContent />;
}
