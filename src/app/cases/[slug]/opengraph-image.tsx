import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { caseSlugs } from "@/lib/cases";

export const dynamic = "force-static";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vento Labs";

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

type Params = { slug: string };

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return renderOgImage({ locale: "en", kind: "case", slug });
}
