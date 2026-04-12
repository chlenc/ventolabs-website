import { getUtmParams, type UtmParams } from "./utm";

const ENDPOINT = process.env.NEXT_PUBLIC_NOTIFY_URL || "https://wlwmmyawxzspgwrijyvm.supabase.co/functions/v1/notify";

type VisitPayload = {
  type: "visit";
  page: string;
  referrer: string;
  utm: UtmParams;
  ua: string;
  ts: string;
};

type BookingPayload = {
  type: "booking";
  page: string;
  utm: UtmParams;
  ts: string;
};

/** Send a visit notification (once per session) */
export function notifyVisit() {
  if (typeof window === "undefined" || !ENDPOINT) return;
  const key = "vl_visit_sent";
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");

  const payload: VisitPayload = {
    type: "visit",
    page: window.location.pathname + window.location.search,
    referrer: document.referrer || "(direct)",
    utm: getUtmParams(),
    ua: navigator.userAgent.slice(0, 200),
    ts: new Date().toISOString(),
  };

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

/** Send a booking notification */
export function notifyBooking() {
  if (typeof window === "undefined" || !ENDPOINT) return;

  const payload: BookingPayload = {
    type: "booking",
    page: window.location.pathname,
    utm: getUtmParams(),
    ts: new Date().toISOString(),
  };

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}
