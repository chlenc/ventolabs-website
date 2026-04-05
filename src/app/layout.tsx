import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { CalendlyWidget } from "@/components/CalendlyPopup";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Vento Labs — AI Automation Agency",
    template: "%s | Vento Labs",
  },
  description: site.description,
  keywords: [
    "AI automation",
    "AI business assistant",
    "AI process automation",
    "enterprise AI",
    "AI consulting",
    "Telegram AI bot",
    "WhatsApp AI assistant",
    "AI team training",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: "Vento Labs — AI Automation Agency",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
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
        <CalendlyWidget />
      </body>
    </html>
  );
}
