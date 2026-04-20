"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocale } from "./LocaleProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import { openCalendly } from "./CalendlyPopup";
import { ArrowIcon } from "./Primitives";
import { asset } from "@/lib/utils";
import { trackCtaClick, trackPopupShown } from "@/lib/analytics";
import { isGiftPopupOpen } from "./GiftPopup";

// Storage key for "user already saw / dismissed this". Persists across
// sessions (unlike exit-intent which is session-scoped) — if they said no,
// don't re-interrupt forever.
const DISMISS_KEY = "vl_pilot_dismissed";

// Localized auxiliary copy that isn't in the shared giftPopup dict.
// Kept compact here so we don't bloat the Dictionary type with one-off
// strings.
type AuxCopy = {
  badge: string;
  eyebrow: string;
  /** Title rendered as JSX — the italic span is the design accent. */
  title: { lead: string; em: string; tail: string };
  desc: string;
  wasLabel: string;
  nowLabel: string;
  slotsLabel: string;
  slotsValue: string;
  was: string;
  now: string;
  skip: string;
};

const AUX: Record<Locale, AuxCopy> = {
  en: {
    badge: "Offer · 2 weeks · free",
    eyebrow: "A free pilot, on us",
    title: { lead: "Ship a working ", em: "AI agent", tail: " before you sign a thing." },
    desc: "Two-week pilot. Your data, your tone, your traffic. A real agent in production by week two — or we walk away.",
    wasLabel: "Was",
    nowLabel: "Now",
    slotsLabel: "Slots",
    slotsValue: "3 / month",
    was: "€4,900",
    now: "€0",
    skip: "No thanks, keep browsing",
  },
  es: {
    badge: "Oferta · 2 semanas · gratis",
    eyebrow: "Un piloto gratuito, invitamos nosotros",
    title: { lead: "Lanza un ", em: "agente de IA", tail: " antes de firmar nada." },
    desc: "Piloto de dos semanas. Tus datos, tu tono, tu tráfico. Un agente real en producción en la segunda semana — o nos retiramos.",
    wasLabel: "Antes",
    nowLabel: "Ahora",
    slotsLabel: "Plazas",
    slotsValue: "3 / mes",
    was: "4.900 €",
    now: "0 €",
    skip: "No, gracias — seguir navegando",
  },
  ru: {
    badge: "Предложение · 2 недели · бесплатно",
    eyebrow: "Бесплатный пилот за наш счёт",
    title: { lead: "Запустите живого ", em: "AI-агента", tail: " прежде чем что-то подписать." },
    desc: "Двухнедельный пилот. Ваши данные, ваш тон, ваш трафик. Живой агент в продакшене ко второй неделе — или мы уходим.",
    wasLabel: "Было",
    nowLabel: "Сейчас",
    slotsLabel: "Мест",
    slotsValue: "3 / мес",
    was: "€4 900",
    now: "€0",
    skip: "Нет, продолжу смотреть сайт",
  },
  de: {
    badge: "Angebot · 2 Wochen · kostenlos",
    eyebrow: "Ein kostenloser Pilot, geht auf uns",
    title: { lead: "Einen echten ", em: "KI-Agenten", tail: " live — bevor du etwas unterschreibst." },
    desc: "Zwei-Wochen-Pilot. Deine Daten, dein Ton, dein Traffic. Ein echter Agent in Produktion bis Woche zwei — oder wir ziehen uns zurück.",
    wasLabel: "Vorher",
    nowLabel: "Jetzt",
    slotsLabel: "Plätze",
    slotsValue: "3 / Monat",
    was: "4.900 €",
    now: "0 €",
    skip: "Nein danke — weiter stöbern",
  },
};

/**
 * Timed auto-popup: shows ~2.4s after first paint, once per user (localStorage
 * scoped). Offers a free 2-week pilot. Dismiss is permanent — "no thanks"
 * and the close button both persist.
 *
 * Respects existing popup orchestration: sets `__giftPopupOpen` so the
 * exit-intent popup doesn't stack on top of this one.
 */
export function PilotOfferPopup() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const aux = AUX[locale] ?? AUX.en;

  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Announce open-state to the global orchestrator so exit-intent stays out
  // of the way while this is visible.
  useEffect(() => {
    (window as unknown as { __giftPopupOpen?: boolean }).__giftPopupOpen = open;
  }, [open]);

  // Schedule open 2.4s after mount, unless the user already dismissed once.
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
      if (isGiftPopupOpen()) return; // someone else beat us to the modal slot
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

  // Body scroll lock + ESC close while visible.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (dismissed) return null;

  return (
    <div
      className={`pilot-backdrop${open ? " pilot-backdrop--open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-hidden={!open}
    >
      <div
        className="pilot"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pilot-title"
      >
        <div className="pilot__media">
          <span className="pilot__badge">◍ {aux.badge}</span>
          <button
            className="pilot__close"
            onClick={close}
            aria-label="Close"
            type="button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 1 L13 13 M13 1 L1 13" strokeLinecap="round" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/images/ai-assistant-box.png")}
            alt=""
            className="pilot__image"
          />
        </div>

        <div className="pilot__body">
          <div className="pilot__eyebrow">{aux.eyebrow}</div>
          <h3 id="pilot-title" className="pilot__title">
            {aux.title.lead}
            <em>{aux.title.em}</em>
            {aux.title.tail}
          </h3>
          <p className="pilot__desc">{aux.desc}</p>

          <div className="pilot__meta">
            <div>
              {aux.wasLabel} <strong>{aux.was}</strong>
            </div>
            <div>
              {aux.nowLabel} <strong>{aux.now}</strong>
            </div>
            <div>
              {aux.slotsLabel} <strong>{aux.slotsValue}</strong>
            </div>
          </div>

          <div className="pilot__actions">
            <button
              className="btn btn--primary"
              onClick={() => {
                close();
                trackCtaClick({ label: dict.giftPopup.cta, location: "pilot_offer_popup" });
                openCalendly("pilot_offer_popup");
              }}
              type="button"
            >
              {dict.giftPopup.cta} <ArrowIcon />
            </button>
          </div>

          <button className="pilot__skip" onClick={close} type="button">
            {aux.skip}
          </button>
        </div>
      </div>
    </div>
  );
}
