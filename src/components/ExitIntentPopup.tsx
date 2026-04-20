"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { openCalendly } from "./CalendlyPopup";
import { isGiftPopupOpen } from "./GiftPopup";
import { asset } from "@/lib/utils";
import { trackCtaClick, trackPopupShown } from "@/lib/analytics";

export function ExitIntentPopup() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const [show, setShow] = useState(false);

  const fire = useCallback(() => {
    trackPopupShown("exit_intent");
    setShow(true);
  }, []);

  useEffect(() => {
    const key = "vl_exit_shown";
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(key)) return;

    let armed = false;
    let firedAlready = false;

    const doFire = () => {
      if (firedAlready) return;
      if (isGiftPopupOpen()) return;
      firedAlready = true;
      sessionStorage.setItem(key, "1");
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

  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={() => setShow(false)}>
      <div className="popup popup--wide" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" onClick={() => setShow(false)} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/images/ai-assistant-box.png")} alt="Free AI Agent" className="popup__image" />
        <div className="popup__body">
          <h3>{dict.exitPopup.title}</h3>
          <p>{dict.exitPopup.description}</p>
          <button className="btn btn--primary" style={{ width: "100%" }} onClick={() => {
            setShow(false);
            trackCtaClick({ label: dict.exitPopup.cta, location: "exit_intent_popup" });
            openCalendly("exit_intent_popup");
          }}>
            {dict.exitPopup.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
