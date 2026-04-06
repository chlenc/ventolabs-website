import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { CalendlyWidget } from "@/components/CalendlyPopup";
import { FloatingContact } from "@/components/FloatingContact";
import { site } from "@/lib/content";
import { asset } from "@/lib/utils";
import "./globals.css";

const seoTitle = "Vento Labs — AI Agents & Automation for Business | Cut Costs, Scale Fast";
const seoDesc = "We design and build custom AI agents that automate operations, cut costs, and scale your business without adding headcount. Free AI agent setup included.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seoTitle,
    template: "%s | Vento Labs",
  },
  description: seoDesc,
  keywords: [
    "AI agents for business",
    "AI automation agency",
    "custom AI agents",
    "AI process automation",
    "enterprise AI solutions",
    "AI business assistant",
    "reduce operating costs with AI",
    "AI team training",
    "AI workflow automation",
    "business AI implementation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: seoTitle,
    description: seoDesc,
  },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDesc },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "US",
    "theme-color": "#234c12",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={asset("/favicon.svg")} type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: site.name,
              url: site.url,
              email: site.email,
              description: site.description,
              areaServed: { "@type": "Country", name: "United States" },
              serviceType: [
                "AI Automation",
                "AI Business Assistants",
                "Enterprise AI Implementation",
                "AI Team Training",
              ],
            }),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main" style={{
          position: "absolute",
          top: "-100px",
          left: "1rem",
          padding: "0.5rem 1rem",
          background: "var(--color-forest)",
          color: "var(--color-cream)",
          borderRadius: "var(--radius-sm)",
          zIndex: 999,
        }}>
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ExitIntentPopup />
        <FloatingContact />
        <CalendlyWidget />
      </body>
    </html>
  );
}
