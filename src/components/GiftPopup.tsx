"use client";

import { useState, useEffect } from "react";
import { useLocale } from "./LocaleProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import { openCalendly } from "./CalendlyPopup";
import { GiftIcon } from "./Primitives";
import { OfferDialog } from "./OfferDialog";
import { href } from "@/lib/utils";
import { trackCtaClick, trackPopupShown } from "@/lib/analytics";

/** Global flag so the exit-intent popup knows this modal is open and
 *  stays out of the way. */
export function isGiftPopupOpen() {
  return (
    typeof window !== "undefined" &&
    (window as unknown as { __giftPopupOpen?: boolean }).__giftPopupOpen === true
  );
}

// Session-level frequency cap: at most ONE auto-fired offer dialog (pilot
// offer / exit intent) per browsing session. The header gift button is
// user-initiated and ignores the cap.
const SESSION_CAP_KEY = "vl_offer_popup_shown";

export function hasAutoPopupFiredThisSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_CAP_KEY) === "1";
  } catch {
    return false;
  }
}

export function markAutoPopupFired(): void {
  try {
    sessionStorage.setItem(SESSION_CAP_KEY, "1");
  } catch {
    // ignore
  }
}

type AuxCopy = {
  badge: string;
  eyebrow: string;
  title: { lead: string; em: string; tail: string };
  desc: string;
  termsLinkLabel: string;
};

// Same offer as PilotOfferPopup, surfaced manually via the header gift
// button. Copy is a beat softer (user opted-in by clicking the icon).
const AUX: Record<Locale, AuxCopy> = {
  en: {
    badge: "Digital Business Brain · $500",
    eyebrow: "Your Digital Business Brain",
    title: { lead: "We'll connect your ", em: "Digital Business Brain", tail: " — $500." },
    desc: "A 30-minute call to scope your systems, then we connect your databases, CRM, chats and kanban boards into a working AI layer that surfaces what you've been missing.",
    termsLinkLabel: "Terms apply",
  },
  es: {
    badge: "Cerebro Digital de Negocio · $500",
    eyebrow: "Tu Cerebro Digital de Negocio",
    title: { lead: "Conectamos tu ", em: "Cerebro Digital de Negocio", tail: " — por $500." },
    desc: "Una llamada de 30 minutos para definir tus sistemas, y luego conectamos tus bases de datos, CRM, chats y tableros kanban en una capa de IA funcional que revela lo que se te estaba escapando.",
    termsLinkLabel: "Ver términos",
  },
  ru: {
    badge: "Цифровой бизнес-мозг · $500",
    eyebrow: "Ваш Цифровой бизнес-мозг",
    title: { lead: "Подключим ваш ", em: "Цифровой бизнес-мозг", tail: " — за $500." },
    desc: "30-минутный звонок, чтобы разобрать ваши системы, — и мы подключаем ваши базы данных, CRM, чаты и канбан-доски в рабочий AI-слой, который показывает то, что вы упускали.",
    termsLinkLabel: "Условия",
  },
  de: {
    badge: "Digitales Business-Gehirn · $500",
    eyebrow: "Ihr Digitales Business-Gehirn",
    title: { lead: "Wir verbinden Ihr ", em: "Digitales Business-Gehirn", tail: " — für $500." },
    desc: "Ein 30-minütiges Gespräch, um Ihre Systeme zu erfassen, dann verbinden wir Ihre Datenbanken, CRM, Chats und Kanban-Boards zu einer funktionierenden KI-Schicht, die zeigt, was Ihnen bisher entgangen ist.",
    termsLinkLabel: "Bedingungen",
  },
};

export function GiftButton() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const aux = AUX[locale] ?? AUX.en;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (window as unknown as { __giftPopupOpen?: boolean }).__giftPopupOpen = open;
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        className="header__gift"
        onClick={() => {
          trackPopupShown("gift");
          setOpen(true);
        }}
        aria-label={dict.nav.giftAria}
        title={dict.nav.giftAria}
        type="button"
      >
        <GiftIcon />
      </button>

      <OfferDialog
        open={open}
        onClose={close}
        onPrimary={() => {
          close();
          trackCtaClick({ label: dict.giftPopup.cta, location: "gift_popup" });
          openCalendly("gift_popup");
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
    </>
  );
}
