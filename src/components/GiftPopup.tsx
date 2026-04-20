"use client";

import { useState, useEffect } from "react";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { openCalendly } from "./CalendlyPopup";
import { GiftIcon } from "./Primitives";
import { asset } from "@/lib/utils";
import { trackCtaClick, trackPopupShown } from "@/lib/analytics";

export function isGiftPopupOpen() {
  return (
    typeof window !== "undefined" &&
    (window as unknown as { __giftPopupOpen?: boolean }).__giftPopupOpen === true
  );
}

export function GiftButton() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const [show, setShow] = useState(false);

  useEffect(() => {
    (window as unknown as { __giftPopupOpen?: boolean }).__giftPopupOpen = show;
  }, [show]);

  return (
    <>
      <button
        className="header__gift"
        onClick={() => {
          trackPopupShown("gift");
          setShow(true);
        }}
        aria-label={dict.nav.giftAria}
        title={dict.nav.giftAria}
      >
        <GiftIcon />
      </button>

      {show && (
        <div className="popup-overlay" onClick={() => setShow(false)}>
          <div className="popup popup--wide" onClick={(e) => e.stopPropagation()}>
            <button
              className="popup__close"
              onClick={() => setShow(false)}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/ai-assistant-box.png")}
              alt="Free AI Agent"
              className="popup__image"
            />
            <div className="popup__body">
              <h3>{dict.giftPopup.title}</h3>
              <p>{dict.giftPopup.description}</p>
              <button
                className="btn btn--primary"
                style={{ width: "100%" }}
                onClick={() => {
                  setShow(false);
                  trackCtaClick({ label: dict.giftPopup.cta, location: "gift_popup" });
                  openCalendly("gift_popup");
                }}
              >
                {dict.giftPopup.cta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
