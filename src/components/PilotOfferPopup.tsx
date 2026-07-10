"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import { openCalendly } from "./CalendlyPopup";
import { OfferDialog } from "./OfferDialog";
import { href, isFocusFunnelPath } from "@/lib/utils";
import { trackCtaClick, trackPopupShown } from "@/lib/analytics";
import { hasAutoPopupFiredThisSession, isGiftPopupOpen, markAutoPopupFired } from "./GiftPopup";

// Storage key for "user already saw / dismissed this". Stores a timestamp —
// a dismissal suppresses the popup for DISMISS_TTL_MS, then it may show again.
const DISMISS_KEY = "vl_pilot_dismissed";
const DISMISS_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function isDismissalActive(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    // Legacy value "1" (no timestamp) — treat as a fresh dismissal once, so
    // existing users who said no aren't re-interrupted immediately.
    if (raw === "1") {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
      return true;
    }
    const ts = Number(raw);
    return Number.isFinite(ts) && Date.now() - ts < DISMISS_TTL_MS;
  } catch {
    return false;
  }
}

type AuxCopy = {
  badge: string;
  eyebrow: string;
  /** Title split so the italic accent word (em) can be localized. */
  title: { lead: string; em: string; tail: string };
  desc: string;
  termsLinkLabel: string;
};

const AUX: Record<Locale, AuxCopy> = {
  en: {
    badge: "Free pilot · setup on us",
    eyebrow: "A free pilot, on us",
    title: { lead: "We build your working ", em: "AI agent", tail: " — free of charge." },
    desc: "Two-week pilot, built on Claude Agent SDK and deployed into your stack. Your data, your tone, your traffic. A real agent live by week two.",
    termsLinkLabel: "Terms apply",
  },
  es: {
    badge: "Piloto gratuito · por nuestra cuenta",
    eyebrow: "Un piloto gratuito, invitamos nosotros",
    title: { lead: "Te montamos un ", em: "agente de IA", tail: " — sin coste." },
    desc: "Piloto de dos semanas sobre Claude Agent SDK, desplegado en tu stack. Tus datos, tu tono, tu tráfico. Un agente real en producción en la segunda semana.",
    termsLinkLabel: "Ver términos",
  },
  ru: {
    badge: "Бесплатный пилот · за наш счёт",
    eyebrow: "Бесплатный пилот за наш счёт",
    title: { lead: "Настроим рабочего ", em: "AI-агента", tail: " — бесплатно." },
    desc: "Двухнедельный пилот на Claude Agent SDK, развёрнутый в вашей инфраструктуре. Ваши данные, ваш тон, ваш трафик. Рабочий агент ко второй неделе.",
    termsLinkLabel: "Условия",
  },
  de: {
    badge: "Kostenloser Pilot · geht auf uns",
    eyebrow: "Ein kostenloser Pilot, geht auf uns",
    title: { lead: "Wir bauen deinen ", em: "KI-Agenten", tail: " — kostenfrei." },
    desc: "Zwei-Wochen-Pilot auf Basis des Claude Agent SDK, in deinem Stack deployed. Deine Daten, dein Ton, dein Traffic. Ein echter Agent live in Woche zwei.",
    termsLinkLabel: "Bedingungen",
  },
};

/**
 * Engagement-triggered auto-popup: shows once the visitor has demonstrably
 * engaged — scrolled ~45% of the page or dwelled 30s — never on first paint.
 * A dismissal suppresses it for 14 days (localStorage timestamp).
 *
 * Coordinates with the exit-intent popup via the global `__giftPopupOpen`
 * flag so the two modals never stack.
 */
export function PilotOfferPopup() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const aux = AUX[locale] ?? AUX.en;
  const pathname = usePathname();
  const focusFunnel = isFocusFunnelPath(pathname);

  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    (window as unknown as { __giftPopupOpen?: boolean }).__giftPopupOpen = open;
  }, [open]);

  useEffect(() => {
    // Never arm on focus-funnel pages: the component renders null there, but
    // an invisibly-fired popup would still consume the session cap, publish
    // __giftPopupOpen=true forever, and block the page's own lead magnet.
    if (focusFunnel) return;
    if (isDismissalActive()) {
      setDismissed(true);
      return;
    }

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      teardown();
      if (isGiftPopupOpen()) return;
      if (hasAutoPopupFiredThisSession()) return; // one auto-popup per session
      markAutoPopupFired();
      trackPopupShown("pilot_offer");
      setOpen(true);
    };

    // Engaged = scrolled ~45% of the page, or 30s of dwell time.
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.45) fire();
    };

    const dwellTimer = window.setTimeout(fire, 30000);
    window.addEventListener("scroll", onScroll, { passive: true });

    const teardown = () => {
      window.clearTimeout(dwellTimer);
      window.removeEventListener("scroll", onScroll);
    };
    return teardown;
  }, [focusFunnel]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    // Wait for exit animation before unmounting so the fade-out reads.
    window.setTimeout(() => setDismissed(true), 500);
  }, []);

  if (dismissed || focusFunnel) return null;

  return (
    <OfferDialog
      open={open}
      onClose={close}
      onPrimary={() => {
        close();
        trackCtaClick({ label: dict.giftPopup.cta, location: "pilot_offer_popup" });
        openCalendly("pilot_offer_popup");
      }}
      badge={aux.badge}
      eyebrow={aux.eyebrow}
      titleLead={aux.title.lead}
      titleEm={aux.title.em}
      titleTail={aux.title.tail}
      desc={aux.desc}
      termsHref={href("/terms", locale)}
      termsLinkLabel={aux.termsLinkLabel}
      primaryLabel={dict.giftPopup.cta}
    />
  );
}
