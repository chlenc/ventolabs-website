"use client";

import { useEffect, type ReactNode } from "react";
import { ArrowIcon } from "./Primitives";
import { asset } from "@/lib/utils";

/**
 * Shared editorial pop-up dialog used by both the timed auto-leadgen and
 * the header gift button. Same visual, different trigger & state logic.
 *
 * Content (title, description, copy) is passed in by the caller so the two
 * entry points can diverge on wording without forking the markup.
 */
export function OfferDialog({
  open,
  onClose,
  onPrimary,
  badge,
  eyebrow,
  titleLead,
  titleEm,
  titleTail,
  desc,
  termsHref,
  termsLinkLabel,
  primaryLabel,
  imageSrc = "/images/ai-assistant-box.png",
  imageAlt = "",
}: {
  open: boolean;
  onClose: () => void;
  onPrimary: () => void;
  badge: string;
  eyebrow: string;
  /** Title renders as `{lead}<em>{em}</em>{tail}` so the italic accent
   * word is translatable per locale. */
  titleLead: string;
  titleEm: string;
  titleTail: string;
  desc: string;
  termsHref: string;
  /** Label for the terms link, e.g. "Terms". */
  termsLinkLabel: string;
  primaryLabel: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}) {
  // Body scroll lock + ESC close while visible.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`pilot-backdrop${open ? " pilot-backdrop--open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!open}
    >
      <div
        className="pilot"
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-dialog-title"
      >
        <div className="pilot__media">
          <span className="pilot__badge">◍ {badge}</span>
          <button
            className="pilot__close"
            onClick={onClose}
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
            src={asset(imageSrc)}
            alt={imageAlt}
            className="pilot__image"
          />
        </div>

        <div className="pilot__body">
          <div className="pilot__eyebrow">{eyebrow}</div>
          <h3 id="offer-dialog-title" className="pilot__title">
            {titleLead}
            <em>{titleEm}</em>
            {titleTail}
          </h3>
          <p className="pilot__desc">{desc}</p>

          <div className="pilot__actions">
            <button
              className="btn btn--primary"
              onClick={onPrimary}
              type="button"
            >
              {primaryLabel} <ArrowIcon />
            </button>
          </div>

          <a
            href={termsHref}
            className="pilot__terms-link"
            target="_blank"
            rel="noopener"
          >
            {termsLinkLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
