import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { isValidLocale, nonDefaultLocales, type Locale } from "@/lib/i18n";
import { servicesSlugs } from "@/lib/services";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vento Labs";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of nonDefaultLocales) {
    for (const slug of servicesSlugs) {
      out.push({ lang, slug });
    }
  }
  return out;
}

type Params = { lang: string; slug: string };

export default async function Image({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang) || lang === "en") notFound();
  return renderOgImage({ locale: lang as Locale, kind: "service", slug });
}
