import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { PilotOfferPopup } from "@/components/PilotOfferPopup";
import { CalendlyWidget } from "@/components/CalendlyPopup";
import { FloatingContact } from "@/components/FloatingContact";
import { GoogleTagManagerHead, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";
import { AnalyticsBootstrap } from "@/components/AnalyticsBootstrap";
import { VisitorTracker } from "@/components/VisitorTracker";
import { LocaleProvider } from "@/components/LocaleProvider";
import { PostHogAnalytics } from "@/components/PostHogProvider";
import { WebMCP } from "@/components/WebMCP";
import { site } from "@/lib/site";
import { asset } from "@/lib/utils";
import { defaultLocale, getDictionary, htmlLangCodes, locales, localizedPath, openGraphLocales } from "@/lib/i18n";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: dict.seo.homeTitle,
    template: dict.seo.titleTemplate,
  },
  description: dict.seo.homeDescription,
  keywords: dict.seo.keywords,
  alternates: {
    canonical: site.url,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${site.url}${localizedPath("/", l)}`])),
      "x-default": site.url,
    },
  },
  openGraph: {
    type: "website",
    locale: openGraphLocales[defaultLocale],
    alternateLocale: locales.filter((l) => l !== defaultLocale).map((l) => openGraphLocales[l]),
    siteName: site.name,
    title: dict.seo.homeTitle,
    description: dict.seo.homeDescription,
    url: site.url,
  },
  twitter: { card: "summary_large_image", title: dict.seo.homeTitle, description: dict.seo.homeDescription },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as unknown as undefined,
    "max-video-preview": -1,
  },
  other: {
    "geo.region": "US",
    "theme-color": "#1e3c14",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={htmlLangCodes[defaultLocale]}
      className={`${fraunces.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <GoogleTagManagerHead />
        <link rel="icon" href={asset("/favicon.svg")} type="image/svg+xml" />
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <meta
          httpEquiv="Link"
          content='</.well-known/api-catalog>; rel="api-catalog", </.well-known/agent-skills/index.json>; rel="agent-skills"'
        />
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
              description: dict.seo.homeDescription,
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
              sameAs: [site.linkedin, site.telegram],
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
        <VisitorTracker />
        <WebMCP />
        <PostHogAnalytics>
          <LocaleProvider>
            <a className="skip-link" href="#main">{dict.skipLink}</a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <PilotOfferPopup />
            <ExitIntentPopup />
            <FloatingContact />
            <CalendlyWidget />
          </LocaleProvider>
        </PostHogAnalytics>
      </body>
    </html>
  );
}
