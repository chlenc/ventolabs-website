"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import { openCalendly } from "./CalendlyPopup";
import { hasAutoPopupFiredThisSession, isGiftPopupOpen, markAutoPopupFired } from "./GiftPopup";
import { OfferDialog } from "./OfferDialog";
import { href, isFocusFunnelPath } from "@/lib/utils";
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
    badge: "Digital Business Brain · $500",
    eyebrow: "One more thing before you go",
    title: { lead: "Take a working ", em: "Digital Business Brain", tail: " with you — for $500." },
    desc: "A 30-minute call to scope your systems, then we connect your data, CRM and chats into an AI layer that finds what your dashboards don't show.",
    termsLinkLabel: "Terms apply",
  },
  es: {
    badge: "Cerebro Digital de Negocio · $500",
    eyebrow: "Una cosa más antes de irte",
    title: { lead: "Llévate un ", em: "Cerebro Digital de Negocio", tail: " funcionando — por $500." },
    desc: "Una llamada de 30 minutos para definir tus sistemas, y luego conectamos tus datos, CRM y chats en una capa de IA que encuentra lo que tus paneles no muestran.",
    termsLinkLabel: "Ver términos",
  },
  ru: {
    badge: "Цифровой бизнес-мозг · $500",
    eyebrow: "Одна вещь напоследок",
    title: { lead: "Заберите рабочий ", em: "Цифровой бизнес-мозг", tail: " с собой — за $500." },
    desc: "30-минутный звонок, чтобы разобрать ваши системы, — и мы подключаем ваши данные, CRM и чаты в AI-слой, который находит то, что не видно на дашбордах.",
    termsLinkLabel: "Условия",
  },
  de: {
    badge: "Digitales Business-Gehirn · $500",
    eyebrow: "Noch eine Sache, bevor Sie gehen",
    title: { lead: "Nehmen Sie ein funktionierendes ", em: "Digitales Business-Gehirn", tail: " mit — für $500." },
    desc: "Ein 30-minütiges Gespräch, um Ihre Systeme zu erfassen, dann verbinden wir Ihre Daten, CRM und Chats zu einer KI-Schicht, die findet, was Ihre Dashboards nicht zeigen.",
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
  const pathname = usePathname();
  const focusFunnel = isFocusFunnelPath(pathname);
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
    // Never arm on focus-funnel pages — see PilotOfferPopup for rationale.
    if (focusFunnel) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    let firedAlready = false;

    const doFire = () => {
      if (firedAlready) return;
      if (isGiftPopupOpen()) return; // another popup is on screen — skip
      if (hasAutoPopupFiredThisSession()) return; // one auto-popup per session
      firedAlready = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      markAutoPopupFired();
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
  }, [fire, focusFunnel]);

  const close = useCallback(() => setOpen(false), []);

  if (!open || focusFunnel) return null;

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
