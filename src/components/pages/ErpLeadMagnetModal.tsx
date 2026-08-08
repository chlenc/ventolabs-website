"use client";

import { useEffect, useState, useCallback } from "react";
import { OfferDialog } from "@/components/OfferDialog";
import { TelegramIcon } from "@/components/Primitives";
import { trackPopupShown, trackCtaClick } from "@/lib/analytics";
import { isGiftPopupOpen } from "@/components/GiftPopup";
import { useLocale } from "@/components/LocaleProvider";
import { href } from "@/lib/utils";
import { erpLeadMagnet } from "./erp-agent-content";

const DISMISS_KEY = "vl_erp_leadmagnet_dismissed";
const IDLE_MS = 60_000;
const TG_HREF = erpLeadMagnet.ctaHref;

/**
 * ERP-page lead magnet — fires once per session on:
 * - exit-intent (mouse leaves top of viewport, desktop only)
 * - idle (no activity for IDLE_MS)
 *
 * After dismissal it stays quiet for the session.
 */
export function ErpLeadMagnetModal() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Returns true when the modal actually opened — callers only latch their
  // one-shot flag on success, so a decline (another dialog on screen) doesn't
  // permanently kill the trigger.
  const fire = useCallback((reason: "exit_intent" | "idle"): boolean => {
    if (isGiftPopupOpen()) return false; // another dialog is on screen — never stack
    setOpen(true);
    trackPopupShown(`erp_leadmagnet_${reason}`);
    return true;
  }, []);

  // Publish open state so the global popups (exit-intent, pilot offer) skip
  // firing while this dialog is on screen.
  useEffect(() => {
    (window as unknown as { __giftPopupOpen?: boolean }).__giftPopupOpen = open;
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode etc. — ignore */
    }
  }, []);

  // Read dismissed flag once on mount.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) setDismissed(true);
    } catch {
      /* ignore */
    }
  }, []);

  // Exit-intent + idle wiring.
  useEffect(() => {
    if (dismissed) return;

    let firedAlready = false;
    let idleTimer: number | undefined;

    const armIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (firedAlready) return;
        // Latch only if the modal actually opened; otherwise re-arm and retry.
        if (fire("idle")) firedAlready = true;
        else armIdle();
      }, IDLE_MS);
    };

    const onMove = (e: MouseEvent) => {
      armIdle();
      // Exit-intent: mouse leaves through top edge.
      if (firedAlready) return;
      // matchMedia pointer:fine ≈ desktop with mouse — skip on touch.
      if (!window.matchMedia("(pointer: fine)").matches) return;
      if (e.clientY <= 8 && e.relatedTarget === null) {
        if (fire("exit_intent")) firedAlready = true;
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
    trackCtaClick({ label: "Lead magnet — Telegram", location: "erp_leadmagnet_modal" });
    window.open(TG_HREF, "_blank", "noopener");
    close();
  }, [close]);

  if (dismissed && !open) return null;

  return (
    <OfferDialog
      open={open}
      onClose={close}
      onPrimary={onPrimary}
      badge={erpLeadMagnet.badge}
      eyebrow="Перед уходом — заберите гайд"
      titleLead="Гайд по внедрению "
      titleEm="ИИ"
      titleTail=" в компанию — практика, не теория"
      desc={erpLeadMagnet.description}
      termsHref={href("/privacy", locale)}
      termsLinkLabel="Политика обработки данных"
      primaryLabel={
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          {erpLeadMagnet.ctaLabel}
          <TelegramIcon size={14} />
        </span>
      }
    />
  );
}
