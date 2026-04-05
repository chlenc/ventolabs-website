"use client";

import { useEffect, useState } from "react";
import { exitPopup } from "@/lib/content";
import { openCalendly } from "./CalendlyPopup";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const key = "vl_exit_seen";
    if (typeof window === "undefined" || sessionStorage.getItem(key)) return;

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      setShow(true);
      sessionStorage.setItem(key, "1");
      cleanup();
    };

    // 1. Exit intent — mouse leaves viewport top
    const exitHandler = (e: MouseEvent) => {
      if (e.clientY < 10) fire();
    };

    // 2. Idle timer — 30s without scroll/click/mousemove
    let idleTimer: ReturnType<typeof setTimeout>;
    const resetIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(fire, 30000);
    };

    const cleanup = () => {
      document.removeEventListener("mouseout", exitHandler);
      document.removeEventListener("scroll", resetIdle);
      document.removeEventListener("mousemove", resetIdle);
      document.removeEventListener("click", resetIdle);
      clearTimeout(idleTimer);
    };

    // Delay 5s before arming triggers
    const armTimer = setTimeout(() => {
      document.addEventListener("mouseout", exitHandler);
      document.addEventListener("scroll", resetIdle, { passive: true });
      document.addEventListener("mousemove", resetIdle, { passive: true });
      document.addEventListener("click", resetIdle);
      resetIdle();
    }, 5000);

    return () => {
      clearTimeout(armTimer);
      cleanup();
    };
  }, []);

  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={() => setShow(false)}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" onClick={() => setShow(false)} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <h3>{exitPopup.title}</h3>
        <p>{exitPopup.description}</p>
        <button className="btn btn--primary" onClick={() => { setShow(false); openCalendly(); }}>
          {exitPopup.cta}
        </button>
      </div>
    </div>
  );
}
