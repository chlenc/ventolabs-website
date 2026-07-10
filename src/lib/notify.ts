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

type LeadPayload = {
  type: "lead";
  name: string;
  email: string;
  message: string;
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

/** Send a lead-form submission. Resolves true on success. */
export async function notifyLead(data: { name: string; email: string; message: string }): Promise<boolean> {
  if (typeof window === "undefined" || !ENDPOINT) return false;

  const payload: LeadPayload = {
    type: "lead",
    name: data.name.slice(0, 200),
    email: data.email.slice(0, 200),
    message: data.message.slice(0, 2000),
    page: window.location.pathname,
    utm: getUtmParams(),
    ts: new Date().toISOString(),
  };

  // Fail fast (6s) so a paused/unreachable backend never leaves the form
  // stuck in "Sending…" — the caller falls back to the pre-filled mailto.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    if (!res.ok) return false;
    // The function answers 200 {ok:true, note:"unhandled event"} for payload
    // types it doesn't know. Treat that as failure so the form falls back to
    // the direct-email path instead of dropping the lead silently.
    const body = await res.json().catch(() => null);
    return body?.ok === true && !body?.note;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
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
