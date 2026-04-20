"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocale } from "./LocaleProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import { openCalendly } from "./CalendlyPopup";
import { isGiftPopupOpen } from "./GiftPopup";
import { OfferDialog } from "./OfferDialog";
import { href } from "@/lib/utils";
import { trackCtaClick, trackPopupShown } from "@/lib/analytics";

type AuxCopy = {
  badge: string;
  eyebrow: string;
  /** Split title so the italic accent word (em) can be localized. */
  title: { lead: string; em: string; tail: string };
  desc: string;
  termsLinkLabel: string;
};

// Exit-intent copy is a beat more urgent — they were about to leave.
// Same visual as PilotOfferPopup / GiftPopup (shared OfferDialog).
const AUX: Record<Locale, AuxCopy> = {
  en: {
    badge: "Free pilot · setup on us",
    eyebrow: "One more thing before you go",
    title: { lead: "Take a working ", em: "AI agent", tail: " with you — free of charge." },
    desc: "A 30-minute call to scope the use case, then we build your agent on Claude Agent SDK, connected to your tools and trained on your knowledge base.",
    termsLinkLabel: "Terms apply",
  },
  es: {
    badge: "Piloto gratuito · por nuestra cuenta",
    eyebrow: "Una cosa más antes de irte",
    title: { lead: "Llévate un ", em: "agente de IA", tail: " funcionando — sin coste." },
    desc: "Una llamada de 30 minutos para encuadrar el caso, y construimos tu agente sobre Claude Agent SDK, conectado a tus herramientas y entrenado con tu base de conocimiento.",
    termsLinkLabel: "Ver términos",
  },
  ru: {
    badge: "Бесплатный пилот · за наш счёт",
    eyebrow: "Одна вещь напоследок",
    title: { lead: "Заберите рабочего ", em: "AI-агента", tail: " — бесплатно." },
    desc: "30-минутный звонок чтобы очертить задачу, и мы собираем агента на Claude Agent SDK — подключённого к вашим инструментам и обученного на вашей базе знаний.",
    termsLinkLabel: "Условия",
  },
  de: {
    badge: "Kostenloser Pilot · geht auf uns",
    eyebrow: "Noch eine Sache, bevor du gehst",
    title: { lead: "Nimm einen laufenden ", em: "KI-Agenten", tail: " mit — kostenlos." },
    desc: "Ein 30-minütiger Call, um den Use Case zu umreißen, dann bauen wir deinen Agenten auf Basis des Claude Agent SDK, verbunden mit deinen Tools und trainiert auf deiner Wissensbasis.",
    termsLinkLabel: "Bedingungen",
  },
};

/**
 * Fires once per session (session-scoped) when the user looks like they're
 * about to leave: cursor leaves the top of the viewport, tab is hidden,
 * or they've been idle for 20 seconds after an 8-second arm delay.
 *
 * Shares the editorial OfferDialog with the timed pilot popup and the
 * header gift button — only the trigger logic is different.
 */
export function ExitIntentPopup() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const aux = AUX[locale] ?? AUX.en;
  const [open, setOpen] = useState(false);

  const fire = useCallback(() => {
    trackPopupShown("exit_intent");
    setOpen(true);
  }, []);

  // Session-scope the "already shown" flag so it re-fires in a new tab/visit
  // but not every time the user cancels within one session.
  const STORAGE_KEY = "vl_exit_shown";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    let firedAlready = false;

    const doFire = () => {
      if (firedAlready) return;
      if (isGiftPopupOpen()) return; // another popup is on screen — skip
      firedAlready = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      fire();
      teardown();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY < 5 && !e.relatedTarget) {
        doFire();
      }
    };

    const onVisibilityChange = () => {
      if (!armed) return;
      if (document.visibilityState === "hidden") {
        doFire();
      }
    };

    let idleTimer: ReturnType<typeof setTimeout>;
    const resetIdle = () => {
      clearTimeout(idleTimer);
      if (armed && !firedAlready) {
        idleTimer = setTimeout(doFire, 20000);
      }
    };

    const teardown = () => {
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("click", resetIdle);
      clearTimeout(idleTimer);
    };

    const armDelay = setTimeout(() => {
      armed = true;
      document.addEventListener("mouseout", onMouseOut);
      document.addEventListener("visibilitychange", onVisibilityChange);
      window.addEventListener("scroll", resetIdle, { passive: true });
      window.addEventListener("mousemove", resetIdle, { passive: true });
      window.addEventListener("click", resetIdle);
      resetIdle();
    }, 8000);

    return () => {
      clearTimeout(armDelay);
      teardown();
    };
  }, [fire]);

  const close = useCallback(() => setOpen(false), []);

  if (!open) return null;

  return (
    <OfferDialog
      open={open}
      onClose={close}
      onPrimary={() => {
        close();
        trackCtaClick({ label: dict.giftPopup.cta, location: "exit_intent_popup" });
        openCalendly("exit_intent_popup");
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
