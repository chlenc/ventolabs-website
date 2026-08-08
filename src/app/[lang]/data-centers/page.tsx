import type { Metadata } from "next";
import { DataCentersPage } from "@/components/pages/DataCentersPage";
import { buildPageMetadata } from "@/lib/seo";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { JsonLd, dataCentersJsonLd } from "@/lib/jsonld";

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  return buildPageMetadata({ locale: lang as Locale, path: "/data-centers", kind: "datacenters" });
}

export default async function LocalizedDataCentersPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : "en";
  return (
    <>
      <JsonLd data={dataCentersJsonLd(locale)} />
      <DataCentersPage />
    </>
  );
}
