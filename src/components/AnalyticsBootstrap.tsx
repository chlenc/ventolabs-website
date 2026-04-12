"use client";

import { useEffect } from "react";
import { trackCalendlyBooked } from "@/lib/analytics";
import { notifyBooking } from "@/lib/notify";

/**
 * Listens for Cal.com booking events via postMessage and fires:
 * 1. GTM dataLayer event (calendly_booked) for ad tracking
 * 2. Telegram notification via Supabase Edge Function
 */
export function AnalyticsBootstrap() {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      // Cal.com fires __cal events
      if (
        typeof e.data === "object" &&
        e.data !== null &&
        (e.data as Record<string, unknown>).type === "CAL:event_scheduled"
      ) {
        trackCalendlyBooked(undefined);
        notifyBooking();
        return;
      }

      // Also handle Calendly legacy format (in case)
      if (
        typeof e.data === "object" &&
        e.data !== null &&
        typeof (e.data as Record<string, unknown>).event === "string" &&
        ((e.data as Record<string, string>).event === "calendly.event_scheduled")
      ) {
        trackCalendlyBooked((e.data as { payload?: { event?: { uri?: string } } }).payload?.event?.uri);
        notifyBooking();
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
