import type { Metadata } from "next";
import { HomeContent } from "@/components/pages/HomeContent";
import { buildPageMetadata } from "@/lib/seo";
import { isValidLocale, type Locale } from "@/lib/i18n";

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  return buildPageMetadata({ locale: lang as Locale, path: "/", kind: "home" });
}

export default function LocalizedHomePage() {
  return <HomeContent />;
}
