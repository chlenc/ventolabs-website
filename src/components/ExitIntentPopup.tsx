"use client";

import { useEffect, useState } from "react";
import { exitPopup } from "@/lib/content";
import { openCalendly } from "./CalendlyPopup";
import { asset } from "@/lib/utils";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const key = "vl_exit_seen";
    if (typeof window === "undefined") return;

    // Already shown this session — don't set up listeners
    if (sessionStorage.getItem(key)) return;

    let fired = false;
    const fire = () => {
      if (fired || sessionStorage.getItem(key)) return;
      fired = true;
      setShow(true);
      sessionStorage.setItem(key, "1");
      cleanup();
    };

    // 1. Exit intent — mouse leaves viewport top (works on desktop)
    const exitHandler = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };

    // 2. Idle timer — 25s without any interaction
    let idleTimer: ReturnType<typeof setTimeout>;
    const resetIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(fire, 25000);
    };

    const cleanup = () => {
      document.documentElement.removeEventListener("mouseleave", exitHandler);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("click", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      clearTimeout(idleTimer);
    };

    // Delay 5s before arming triggers (don't annoy users immediately)
    const armTimer = setTimeout(() => {
      document.documentElement.addEventListener("mouseleave", exitHandler);
      window.addEventListener("scroll", resetIdle, { passive: true });
      window.addEventListener("mousemove", resetIdle, { passive: true });
      window.addEventListener("click", resetIdle);
      window.addEventListener("keydown", resetIdle);
      resetIdle(); // start idle countdown
    }, 5000);

    return () => {
      clearTimeout(armTimer);
      cleanup();
    };
  }, []);

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
        <img src={asset("/images/exit-popup.jpg")} alt="" className="popup__image" loading="lazy" />
        <div className="popup__body">
          <h3>{exitPopup.title}</h3>
          <p>{exitPopup.description}</p>
          <button className="btn btn--primary" style={{ width: "100%" }} onClick={() => { setShow(false); openCalendly(); }}>
            {exitPopup.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
