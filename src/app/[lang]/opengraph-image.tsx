import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { isValidLocale, nonDefaultLocales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vento Labs";

export function generateStaticParams() {
  return nonDefaultLocales.map((lang) => ({ lang }));
}

type Params = { lang: string };

export default async function Image({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  if (!isValidLocale(lang) || lang === "en") notFound();
  return renderOgImage({ locale: lang as Locale, kind: "home" });
}
