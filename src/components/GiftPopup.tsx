"use client";

import { useState } from "react";
import { giftPopup } from "@/lib/content";
import { openCalendly } from "./CalendlyPopup";
import { asset } from "@/lib/utils";

export function GiftButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        className="header__gift"
        onClick={() => setShow(true)}
        aria-label="Free AI agent"
        title="Free AI agent"
      >
        🎁
      </button>

      {show && (
        <div className="popup-overlay" onClick={() => setShow(false)}>
          <div className="popup popup--wide" onClick={(e) => e.stopPropagation()}>
            <button className="popup__close" onClick={() => setShow(false)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/images/free-agent.jpg")} alt="Free AI Agent" className="popup__image" />
            <div className="popup__body">
              <h3>{giftPopup.title}</h3>
              <p>{giftPopup.description}</p>
              <button className="btn btn--primary" style={{ width: "100%" }} onClick={() => { setShow(false); openCalendly(); }}>
                {giftPopup.cta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
