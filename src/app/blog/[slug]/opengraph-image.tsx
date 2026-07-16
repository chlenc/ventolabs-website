import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { blogSlugs } from "@/lib/blog";

export const dynamic = "force-static";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vento Labs";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

type Params = { slug: string };

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return renderOgImage({ locale: "en", kind: "article", slug });
}
