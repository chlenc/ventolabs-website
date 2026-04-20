// Tracking events fan out to two tools:
//  1) GTM dataLayer  -> GA4 / Meta / Yandex ads attribution
//  2) PostHog        -> product analytics, session replay, funnels

import posthog from "posthog-js";

export const GTM_ID = "GTM-NG78TDBW";

type DataLayerRecord = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerRecord[];
  }
}

/** Push an arbitrary event to the GTM dataLayer. No-op on the server. */
export function pushEvent(event: DataLayerRecord): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/**
 * Fire-and-forget capture on PostHog. Silently no-ops when the key isn't
 * set (local dev without env, CI) so it never breaks the funnel.
 */
function captureToPostHog(event: string, properties: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.capture(event, properties);
  } catch {
    // PostHog not initialized yet — drop silently, we'll still have GTM.
  }
}

/** Fired whenever the user clicks a primary CTA that leads to Calendly. */
export function trackCtaClick(params: {
  label: string;
  location: string;
}): void {
  pushEvent({
    event: "cta_click",
    cta_label: params.label,
    cta_location: params.location,
  });
  captureToPostHog("cta_click", {
    cta_label: params.label,
    cta_location: params.location,
  });
}

/** Fired when the user opens the Calendly popup (any entry point). */
export function trackCalendlyOpened(source: string): void {
  pushEvent({
    event: "calendly_opened",
    calendly_source: source,
  });
  captureToPostHog("calendly_opened", { calendly_source: source });
}

/** Fired once when the user successfully schedules a call. Main conversion. */
export function trackCalendlyBooked(eventUri?: string): void {
  pushEvent({
    event: "calendly_booked",
    calendly_event_uri: eventUri,
  });
  captureToPostHog("calendly_booked", { calendly_event_uri: eventUri });
}

/** Fired when the exit-intent / gift popups appear. */
export function trackPopupShown(name: "exit_intent" | "gift" | "pilot_offer"): void {
  pushEvent({
    event: "popup_shown",
    popup_name: name,
  });
  captureToPostHog("popup_shown", { popup_name: name });
}

/** Fired when a contact channel (Telegram / WhatsApp / email) is clicked from the FAB. */
export function trackContactClick(channel: "telegram" | "whatsapp" | "email"): void {
  pushEvent({
    event: "contact_click",
    contact_channel: channel,
  });
  captureToPostHog("contact_click", { contact_channel: channel });
}
