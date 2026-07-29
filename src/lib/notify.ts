import { getUtmParams, type UtmParams } from "./utm";
import { isLikelyBot } from "./bot";

// Default: Cloudflare Pages worker (project `ventolabs-notify`, source in
// cloudflare/notify-worker/). The previous Supabase project
// (wlwmmyawxzspgwrijyvm) died — its domain no longer resolves, so every
// notification was silently lost. notify.ventolabs.com is a CNAME we control:
// re-platforming later is a DNS change, not a site redeploy.
const ENDPOINT = process.env.NEXT_PUBLIC_NOTIFY_URL || "https://notify.ventolabs.com/";

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
  // Honeypot value — see notifyLead below. Only ever non-empty when a bot
  // filled every field it could find.
  website?: string;
};

/** Send a visit notification (once per session) */
export function notifyVisit() {
  if (typeof window === "undefined" || !ENDPOINT) return;
  if (isLikelyBot()) return;
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
export async function notifyLead(
  data: { name: string; email: string; message: string; website?: string }
): Promise<boolean> {
  if (typeof window === "undefined" || !ENDPOINT) return false;
  if (isLikelyBot()) return false;
  // Honeypot: a hidden field real visitors never see or fill. A non-empty
  // value usually means a bot filled the whole form -- but on the rare
  // chance a password manager or form-filler extension blindly fills every
  // input regardless of visibility, we still SEND the request (so there's
  // at least a server-side trace to investigate) rather than dropping it
  // before any network call ever happens. We just always report success
  // to the caller for this case: a bot shouldn't learn it was caught, and
  // a genuine human who tripped it by accident shouldn't hit a dead end.
  const honeypotTripped = Boolean(data.website);

  const payload: LeadPayload = {
    type: "lead",
    name: data.name.slice(0, 200),
    email: data.email.slice(0, 200),
    message: data.message.slice(0, 2000),
    page: window.location.pathname,
    utm: getUtmParams(),
    ts: new Date().toISOString(),
    website: data.website,
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
    if (honeypotTripped) return true;
    if (!res.ok) return false;
    // The function answers 200 {ok:true, note:"unhandled event"} for payload
    // types it doesn't know. Treat that as failure so the form falls back to
    // the direct-email path instead of dropping the lead silently.
    const body = await res.json().catch(() => null);
    return body?.ok === true && !body?.note;
  } catch {
    return honeypotTripped;
  } finally {
    clearTimeout(timer);
  }
}

/** Send a booking notification */
export function notifyBooking() {
  if (typeof window === "undefined" || !ENDPOINT) return;
  if (isLikelyBot()) return;

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
