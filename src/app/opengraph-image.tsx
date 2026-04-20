import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vento Labs — AI Agents & Automation for Business";

export default function Image() {
  return renderOgImage({ locale: "en", kind: "home" });
}
