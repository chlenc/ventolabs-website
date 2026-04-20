import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/LocaleProvider";
import { isValidLocale, nonDefaultLocales, type Locale } from "@/lib/i18n";

type Params = { lang: string };

export function generateStaticParams(): Params[] {
  return nonDefaultLocales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang) || lang === "en") notFound();
  return <LocaleProvider locale={lang as Locale}>{children}</LocaleProvider>;
}
