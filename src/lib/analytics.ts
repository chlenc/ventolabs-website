// Google Tag Manager dataLayer helper.
// All tracking events flow through pushEvent() -> dataLayer -> GTM -> GA4/Meta/Yandex.

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
}

/** Fired when the user opens the Calendly popup (any entry point). */
export function trackCalendlyOpened(source: string): void {
  pushEvent({
    event: "calendly_opened",
    calendly_source: source,
  });
}

/** Fired once when the user successfully schedules a call. Main conversion. */
export function trackCalendlyBooked(eventUri?: string): void {
  pushEvent({
    event: "calendly_booked",
    calendly_event_uri: eventUri,
  });
}

/** Fired when the exit-intent / gift popups appear. */
export function trackPopupShown(name: "exit_intent" | "gift"): void {
  pushEvent({
    event: "popup_shown",
    popup_name: name,
  });
}

/** Fired when a contact channel (Telegram / WhatsApp / email) is clicked from the FAB. */
export function trackContactClick(channel: "telegram" | "whatsapp" | "email"): void {
  pushEvent({
    event: "contact_click",
    contact_channel: channel,
  });
}
