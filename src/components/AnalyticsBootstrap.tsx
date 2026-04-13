"use client";

import { useEffect } from "react";
import { trackCalendlyBooked } from "@/lib/analytics";
import { notifyBooking } from "@/lib/notify";

/**
 * Listens for Cal.com booking events via postMessage and fires:
 * 1. GTM dataLayer event (calendly_booked) for ad tracking
 * 2. Telegram notification via Supabase Edge Function
 *
 * Cal.com embed sends messages in various formats depending on version:
 * - { type: "CAL:event_scheduled", ... }
 * - { data: { type: "booking_successful" } }
 * - { event: "__cal:booking:created", ... }
 * We catch all known patterns.
 */
export function AnalyticsBootstrap() {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "object" || e.data === null) return;

      const data = e.data as Record<string, unknown>;
      const type = String(data.type || "");
      const event = String(data.event || "");

      const isBooking =
        type === "CAL:event_scheduled" ||
        type === "booking_successful" ||
        event === "__cal:booking:created" ||
        event === "booking_successful" ||
        // Cal embed v2 wraps in data.type
        (typeof data.data === "object" &&
          data.data !== null &&
          (data.data as Record<string, unknown>).type === "booking_successful");

      if (isBooking) {
        trackCalendlyBooked(undefined);
        notifyBooking();
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
