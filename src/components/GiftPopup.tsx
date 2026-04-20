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
    badge: "Free pilot · setup on us",
    eyebrow: "Your free AI agent",
    title: { lead: "We'll build a working ", em: "AI agent", tail: " for your team — free." },
    desc: "A 30-minute call to scope the use case, then we set up an AI agent on Claude Agent SDK, connected to your tools and trained on your knowledge base.",
    termsLinkLabel: "Terms apply",
  },
  es: {
    badge: "Piloto gratuito · por nuestra cuenta",
    eyebrow: "Tu agente de IA gratis",
    title: { lead: "Te montamos un ", em: "agente de IA", tail: " para tu equipo — gratis." },
    desc: "Una llamada de 30 min para encuadrar el caso, y luego montamos un agente sobre Claude Agent SDK, conectado a tus herramientas y entrenado con tu base de conocimiento.",
    termsLinkLabel: "Ver términos",
  },
  ru: {
    badge: "Бесплатный пилот · за наш счёт",
    eyebrow: "Ваш бесплатный AI-агент",
    title: { lead: "Соберём рабочего ", em: "AI-агента", tail: " для вашей команды — бесплатно." },
    desc: "30-минутный звонок чтобы очертить задачу, и мы настраиваем агента на Claude Agent SDK — подключённого к вашим инструментам и обученного на вашей базе знаний.",
    termsLinkLabel: "Условия",
  },
  de: {
    badge: "Kostenloser Pilot · geht auf uns",
    eyebrow: "Dein kostenloser KI-Agent",
    title: { lead: "Wir bauen einen ", em: "KI-Agenten", tail: " für dein Team — kostenlos." },
    desc: "Ein 30-minütiger Call, um den Use Case zu umreißen, dann bauen wir einen Agenten auf Basis des Claude Agent SDK, verbunden mit deinen Tools und trainiert auf deiner Wissensbasis.",
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
