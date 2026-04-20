import { ImageResponse } from "next/og";
import { getDictionary, type Locale } from "./i18n";
import type { ServiceSlug } from "./services";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgKind = "home" | "cases" | "privacy" | "terms" | "service";

/**
 * Render a branded OG card for a given (locale, page). Kept intentionally
 * font-stack-only (no custom font fetch) so the static export build never
 * depends on a runtime network call.
 *
 * Visual: warm paper bg, forest accent column, logo + localized eyebrow at
 * top, page title set in a serif fallback (Satori falls through "serif"
 * generic family to whatever the host has). Brand mark + domain in footer.
 */
export function renderOgImage({
  locale,
  kind,
  slug,
}: {
  locale: Locale;
  kind: OgKind;
  slug?: string;
}) {
  const dict = getDictionary(locale);

  // Per-kind title + eyebrow selection. Titles come straight from the
  // dictionary so translations stay in one place.
  let title = dict.seo.homeTitle;
  let eyebrow: string = dict.nav.cta.label; // generic fallback
  if (kind === "home") {
    title = dict.hero.line1 + " " + dict.hero.line2 + " " + dict.hero.line3;
    eyebrow = dict.services.eyebrow;
  } else if (kind === "cases") {
    title = dict.casesIntro.heading;
    eyebrow = dict.casesIntro.eyebrow;
  } else if (kind === "privacy") {
    title = dict.legal.privacy.title;
    eyebrow = dict.footer.privacy;
  } else if (kind === "terms") {
    title = dict.legal.terms.title;
    eyebrow = dict.footer.terms;
  } else if (kind === "service" && slug) {
    const svc = dict.services_pages[slug as ServiceSlug];
    if (svc) {
      title = svc.heroTitle;
      eyebrow = svc.kicker;
    }
  }

  // Star mark (Vento Labs favicon path).
  const LogoMark = ({ size }: { size: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 46 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.7119 29.2666L19.9521 46.1074L16.1494 44.3555L23.9092 27.5146L27.7119 29.2666ZM38.8672 39.46L35.0615 41.2041L27.3369 24.3467L31.1436 22.6025L38.8672 39.46ZM20.2031 30.3877L2.17871 34.7402L1.19629 30.6699L19.2207 26.3184L20.2031 30.3877ZM17.1191 22.9053L14.5127 26.1826L0 14.6416L2.60645 11.3643L17.1191 22.9053ZM45.8887 19.3408L45.0244 23.4375L26.8818 19.6064L27.7461 15.5098L45.8887 19.3408ZM18.542 18.542H14.3545V0H18.542V18.542ZM37.4385 5.51367L23.1787 17.3662L20.5029 14.1465L34.7627 2.29395L37.4385 5.51367Z"
        fill="currentColor"
      />
    </svg>
  );

  // Hard-clamp title length so it never wraps past the canvas.
  const clampedTitle = title.length > 120 ? title.slice(0, 117) + "…" : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f4ee",
          color: "#0e0e0c",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Forest accent column */}
        <div
          style={{
            width: "20px",
            background: "#1e3c14",
            display: "flex",
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "72px 80px",
            justifyContent: "space-between",
          }}
        >
          {/* Top row: logo mark + wordmark + eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              color: "#0e0e0c",
            }}
          >
            <LogoMark size={44} />
            <div
              style={{
                fontSize: "32px",
                letterSpacing: "-0.01em",
                fontFamily: "serif",
                color: "#0e0e0c",
              }}
            >
              Vento Labs
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontSize: "18px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(14,14,12,0.55)",
              }}
            >
              {eyebrow}
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: "72px",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontFamily: "serif",
              color: "#0e0e0c",
              maxWidth: "980px",
              // Use mixed-color em-like accent: we render the whole string as-is;
              // relying on serif keeps the Fraunces-esque feel.
            }}
          >
            {clampedTitle}
          </div>

          {/* Bottom row: domain + locale */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "20px",
              color: "rgba(14,14,12,0.6)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <span>ventolabs.com</span>
            <span>{locale.toUpperCase()}</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
