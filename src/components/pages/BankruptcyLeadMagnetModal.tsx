"use client";

import { useEffect, useState, useCallback } from "react";
import { OfferDialog } from "@/components/OfferDialog";
import { TelegramIcon } from "@/components/Primitives";
import { trackPopupShown, trackCtaClick } from "@/lib/analytics";
import { isGiftPopupOpen } from "@/components/GiftPopup";
import { bankLeadMagnet, bankTelegram, bankPhone } from "./bankruptcy-agent-content";

const DISMISS_KEY = "vl_bank_leadmagnet_dismissed";
const IDLE_MS = 60_000;

/**
 * Bankruptcy-page lead magnet — fires once per session on:
 * - exit-intent (mouse leaves top of viewport, desktop only)
 * - idle (no activity for IDLE_MS)
 *
 * Primary action goes to Telegram (lowest friction for users
 * about to leave). Phone is offered in the description copy.
 */
export function BankruptcyLeadMagnetModal() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Returns true when the modal actually opened — callers only latch their
  // one-shot flag on success, so a decline (another dialog on screen) doesn't
  // permanently kill the trigger.
  const fire = useCallback((reason: "exit_intent" | "idle"): boolean => {
    if (isGiftPopupOpen()) return false; // another dialog is on screen — never stack
    setOpen(true);
    trackPopupShown(`bankruptcy_leadmagnet_${reason}`);
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
        // Latch only if the modal actually opened; otherwise re-arm and retry.
        if (fire("idle")) firedAlready = true;
        else armIdle();
      }, IDLE_MS);
    };

    const onMove = (e: MouseEvent) => {
      armIdle();
      if (firedAlready) return;
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
    trackCtaClick({
      label: "Lead magnet — Free demo",
      location: "bankruptcy_leadmagnet_modal",
    });
    window.open(bankTelegram.href, "_blank", "noopener");
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
      desc={`${bankLeadMagnet.description} Или позвоните напрямую — ${bankPhone.display}.`}
      termsHref="/privacy"
      termsLinkLabel="Политика обработки данных"
      primaryLabel={
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          Написать в Telegram
          <TelegramIcon size={14} />
        </span>
      }
    />
  );
}
