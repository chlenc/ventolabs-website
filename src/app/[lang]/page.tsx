import type { Metadata } from "next";
import { HomeContent } from "@/components/pages/HomeContent";
import { buildPageMetadata } from "@/lib/seo";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { JsonLd, faqPageJsonLd } from "@/lib/jsonld";

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  return buildPageMetadata({ locale: lang as Locale, path: "/", kind: "home" });
}

export default async function LocalizedHomePage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  return (
    <>
      <JsonLd data={faqPageJsonLd(dict.faq.items)} />
      <HomeContent />
    </>
  );
}
