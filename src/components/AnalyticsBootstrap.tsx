"use client";

import { useEffect } from "react";
import { trackCalendlyBooked } from "@/lib/analytics";

type CalendlyMessage = {
  event?: string;
  payload?: { event?: { uri?: string } };
};

function isCalendlyEvent(data: unknown): data is CalendlyMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof (data as { event?: unknown }).event === "string" &&
    (data as { event: string }).event.startsWith("calendly.")
  );
}

/**
 * Listens for Calendly's postMessage events and fires the `calendly_booked`
 * dataLayer event when the user actually schedules a meeting. This is the main
 * conversion we care about across all ad channels.
 */
export function AnalyticsBootstrap() {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!isCalendlyEvent(e.data)) return;
      if (e.data.event === "calendly.event_scheduled") {
        trackCalendlyBooked(e.data.payload?.event?.uri);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
