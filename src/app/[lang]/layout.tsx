import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/LocaleProvider";
import { htmlLangCodes, isValidLocale, nonDefaultLocales, type Locale } from "@/lib/i18n";

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
  const htmlLang = htmlLangCodes[lang as Locale];
  return (
    <LocaleProvider locale={lang as Locale}>
      {/* The static export renders <html lang="en"> from the root layout
          (which can't see this segment's params). Correct it synchronously
          during HTML parsing — before first paint — so crawlers that execute
          JS and the :lang() CSS rules see the right language immediately.
          Non-JS crawlers get the language from hreflang + og:locale. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(htmlLang)}`,
        }}
      />
      {children}
    </LocaleProvider>
  );
}
