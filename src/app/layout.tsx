import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { CalendlyWidget } from "@/components/CalendlyPopup";
import { FloatingContact } from "@/components/FloatingContact";
import { GoogleTagManagerHead, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";
import { AnalyticsBootstrap } from "@/components/AnalyticsBootstrap";
import { site } from "@/lib/content";
import { asset } from "@/lib/utils";
import "./globals.css";

const seoTitle = "Vento Labs | AI Agents & Automation for Business";
const seoDesc = "Custom AI agents that cut operating costs, automate workflows, and scale your business without adding headcount. Free AI agent setup with every engagement.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seoTitle,
    template: "%s — Vento Labs | AI Automation Agency",
  },
  description: seoDesc,
  keywords: [
    "AI agents for business",
    "AI automation agency",
    "custom AI agents",
    "AI process automation",
    "enterprise AI solutions",
    "AI business assistant",
    "AI workflow automation",
    "business AI implementation",
    "AI chatbot for business",
    "automate business operations with AI",
    "AI agent development company",
    "reduce operating costs AI",
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: seoTitle,
    description: seoDesc,
    url: site.url,
  },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDesc },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as unknown as undefined,
    "max-video-preview": -1,
  },
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
        <GoogleTagManagerHead />
        <link rel="icon" href={asset("/favicon.svg")} type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": `${site.url}/#organization`,
              name: "Vento Labs Pte. Ltd.",
              alternateName: "Vento Labs",
              url: site.url,
              email: site.email,
              telephone: site.phoneDisplay,
              description: seoDesc,
              foundingDate: "2025-02-03",
              legalName: "Vento Labs Pte. Ltd.",
              areaServed: [
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "Singapore" },
              ],
              serviceType: [
                "AI Agent Development",
                "AI Process Automation",
                "Enterprise AI Implementation",
                "AI Team Training & Adoption",
                "Custom AI Solutions",
              ],
              sameAs: [
                site.linkedin,
                site.telegram,
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Business Automation",
                "AI Agents",
                "Machine Learning",
                "Natural Language Processing",
              ],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <AnalyticsBootstrap />
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
