import { HomeContent } from "@/components/pages/HomeContent";
import { JsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { getDictionary } from "@/lib/i18n";

export default function HomePage() {
  const dict = getDictionary("en");
  return (
    <>
      <JsonLd data={faqPageJsonLd(dict.faq.items)} />
      <HomeContent />
    </>
  );
}
