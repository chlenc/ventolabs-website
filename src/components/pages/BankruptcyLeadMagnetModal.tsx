"use client";

import { useEffect, useState, useCallback } from "react";
import { OfferDialog } from "@/components/OfferDialog";
import { TelegramIcon } from "@/components/Primitives";
import { trackPopupShown, trackCtaClick } from "@/lib/analytics";
import { bankLeadMagnet } from "./bankruptcy-agent-content";

const DISMISS_KEY = "vl_bank_leadmagnet_dismissed";
const IDLE_MS = 60_000;
const TG_HREF = bankLeadMagnet.ctaHref;

/**
 * Bankruptcy-page lead magnet — fires once per session on:
 * - exit-intent (mouse leaves top of viewport, desktop only)
 * - idle (no activity for IDLE_MS)
 *
 * After dismissal it stays quiet for the session.
 */
export function BankruptcyLeadMagnetModal() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const fire = useCallback((reason: "exit_intent" | "idle") => {
    setOpen(true);
    trackPopupShown(`bankruptcy_leadmagnet_${reason}`);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode etc. — ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) setDismissed(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;

    let firedAlready = false;
    let idleTimer: number | undefined;

    const armIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (firedAlready) return;
        firedAlready = true;
        fire("idle");
      }, IDLE_MS);
    };

    const onMove = (e: MouseEvent) => {
      armIdle();
      if (firedAlready) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      if (e.clientY <= 8 && e.relatedTarget === null) {
        firedAlready = true;
        fire("exit_intent");
      }
    };

    const onActivity = () => armIdle();

    armIdle();
    document.addEventListener("mouseout", onMove);
    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("touchstart", onActivity, { passive: true });
    window.addEventListener("click", onActivity);

    return () => {
      window.clearTimeout(idleTimer);
      document.removeEventListener("mouseout", onMove);
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("touchstart", onActivity);
      window.removeEventListener("click", onActivity);
    };
  }, [dismissed, fire]);

  const onPrimary = useCallback(() => {
    trackCtaClick({ label: "Lead magnet — Free demo", location: "bankruptcy_leadmagnet_modal" });
    window.open(TG_HREF, "_blank", "noopener");
    close();
  }, [close]);

  if (dismissed && !open) return null;

  return (
    <OfferDialog
      open={open}
      onClose={close}
      onPrimary={onPrimary}
      badge={bankLeadMagnet.badge}
      eyebrow="Перед уходом — заберите бесплатное демо"
      titleLead="30 минут — и вы видите "
      titleEm="AI"
      titleTail=" на своей процедуре"
      desc={bankLeadMagnet.description}
      termsHref="/privacy"
      termsLinkLabel="Политика обработки данных"
      primaryLabel={
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          {bankLeadMagnet.ctaLabel}
          <TelegramIcon size={14} />
        </span>
      }
    />
  );
}
