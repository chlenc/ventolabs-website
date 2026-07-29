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
import { jsonLdString, webSiteJsonLd } from "@/lib/jsonld";
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
    // Trailing slash to match sitemap.ts's own homepage entry and the
    // trailingSlash:true convention every other page's canonical follows.
    canonical: `${site.url}/`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${site.url}${localizedPath("/", l)}`])),
      "x-default": `${site.url}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: openGraphLocales[defaultLocale],
    alternateLocale: locales.filter((l) => l !== defaultLocale).map((l) => openGraphLocales[l]),
    siteName: site.name,
    title: dict.seo.homeTitle,
    description: dict.seo.homeDescription,
    url: `${site.url}/`,
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
        {/* RFC 8288 link relations for agents (GH Pages can't set HTTP Link headers, so we expose them in HTML). */}
        <link rel="sitemap" type="application/xml" href={asset("/sitemap.xml")} />
        <link rel="terms-of-service" href={`${site.url}/terms/`} />
        <link rel="privacy-policy" href={`${site.url}/privacy/`} />
        <link rel="author" href={site.linkedin} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(webSiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": `${site.url}/#organization`,
              name: "Vento Labs Pte. Ltd.",
              alternateName: "Vento Labs",
              url: site.url,
              logo: `${site.url}/favicon.svg`,
              image: `${site.url}/opengraph-image`,
              email: site.email,
              telephone: site.phoneDisplay,
              description: dict.seo.homeDescription,
              foundingDate: "2025-02-03",
              legalName: "Vento Labs Pte. Ltd.",
              identifier: {
                "@type": "PropertyValue",
                propertyID: "UEN",
                value: "202504485G",
              },
              founder: {
                "@type": "Person",
                name: "Alexey Nagorny",
                jobTitle: "Founder & Lead Engineer",
                email: site.email,
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "SG",
              },
              areaServed: "Worldwide",
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
