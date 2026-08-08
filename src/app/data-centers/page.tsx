import type { Metadata } from "next";
import { DataCentersPage } from "@/components/pages/DataCentersPage";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, dataCentersJsonLd } from "@/lib/jsonld";

export function generateMetadata(): Metadata {
  return buildPageMetadata({ locale: "en", path: "/data-centers", kind: "datacenters" });
}

export default function Page() {
  return (
    <>
      <JsonLd data={dataCentersJsonLd("en")} />
      <DataCentersPage />
    </>
  );
}
