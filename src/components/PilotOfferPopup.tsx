"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocale } from "./LocaleProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import { openCalendly } from "./CalendlyPopup";
import { OfferDialog } from "./OfferDialog";
import { href } from "@/lib/utils";
import { trackCtaClick, trackPopupShown } from "@/lib/analytics";
import { isGiftPopupOpen } from "./GiftPopup";

// Storage key for "user already saw / dismissed this". Persists across
// sessions — if they said no, don't re-interrupt forever.
const DISMISS_KEY = "vl_pilot_dismissed";

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
    desc: "Двухнедельный пилот на Claude Agent SDK, развёрнутый в вашей инфраструктуре. Ваши данные, ваш тон, ваш трафик. Живой агент ко второй неделе.",
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
 * Timed auto-popup: shows ~2.4s after first paint, once per user
 * (localStorage scoped). Offers a free 2-week pilot.
 *
 * Coordinates with the exit-intent popup via the global `__giftPopupOpen`
 * flag so the two modals never stack.
 */
export function PilotOfferPopup() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const aux = AUX[locale] ?? AUX.en;

  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    (window as unknown as { __giftPopupOpen?: boolean }).__giftPopupOpen = open;
  }, [open]);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      // localStorage blocked — show anyway, no persistence is fine.
    }
    const t = window.setTimeout(() => {
      if (isGiftPopupOpen()) return;
      trackPopupShown("pilot_offer");
      setOpen(true);
    }, 2400);
    return () => window.clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    // Wait for exit animation before unmounting so the fade-out reads.
    window.setTimeout(() => setDismissed(true), 500);
  }, []);

  if (dismissed) return null;

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
