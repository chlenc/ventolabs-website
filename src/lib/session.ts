/**
 * Session tracker — records active time, page journey, and click events.
 * Sends a summary via sendBeacon when the user leaves.
 */

const STORAGE_KEY = "vl_session";
// Same live endpoint as notify.ts (notify.ventolabs.com, Cloudflare Pages).
// This used to default to the old Supabase project, which died — so every
// "session" summary was being sent into the void with no error surfaced
// (sendBeacon doesn't report delivery failures). Keep this in sync with
// src/lib/notify.ts's ENDPOINT.
const ENDPOINT = process.env.NEXT_PUBLIC_NOTIFY_URL || "https://notify.ventolabs.com/";

type ClickEvent = { label: string; section: string; time: number };
type SessionData = {
  startedAt: number;
  activeMs: number;
  pages: string[];
  clicks: ClickEvent[];
  maxScroll: number;
};

let session: SessionData | null = null;
let lastActive = 0;
let isActive = true;
let interacted = false;
let tickInterval: ReturnType<typeof setInterval> | null = null;
let sentSummary = false;

function getSession(): SessionData {
  if (session) return session;

  // Try restoring from sessionStorage (survives SPA navigations)
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      session = JSON.parse(stored);
      return session!;
    }
  } catch { /* ignore */ }

  session = {
    startedAt: Date.now(),
    activeMs: 0,
    pages: [],
    clicks: [],
    maxScroll: 0,
  };
  return session;
}

function persist() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(getSession()));
  } catch { /* ignore */ }
}

/** Record current page */
function trackPage() {
  const s = getSession();
  const page = window.location.pathname + window.location.search;
  // Avoid duplicates for same page
  if (s.pages[s.pages.length - 1] !== page) {
    s.pages.push(page);
  }
  persist();
}

/** Record a click on a meaningful element */
function trackClick(label: string, section: string) {
  const s = getSession();
  // Keep max 20 clicks to avoid bloat
  if (s.clicks.length < 20) {
    s.clicks.push({
      label: label.slice(0, 60),
      section: section.slice(0, 40),
      time: Math.round((Date.now() - s.startedAt) / 1000),
    });
    persist();
  }
}

/** Track max scroll depth (0–100%) */
function updateScroll() {
  const s = getSession();
  const scrollPct = Math.round(
    ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
  );
  if (scrollPct > s.maxScroll) {
    s.maxScroll = scrollPct;
  }
}

/** Active time ticker — adds time when tab is visible and user is active */
function startTicker() {
  if (tickInterval) return;
  lastActive = Date.now();

  tickInterval = setInterval(() => {
    if (isActive) {
      const s = getSession();
      const now = Date.now();
      s.activeMs += now - lastActive;
      lastActive = now;
    }
  }, 1000);
}

function formatDuration(ms: number): string {
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

/** Send session summary via sendBeacon (survives page unload) */
function sendSummary() {
  if (sentSummary || typeof navigator === "undefined") return;
  const s = getSession();

  // Require both a meaningful visible-time floor AND at least one real
  // interaction signal (click/scroll/keydown/mousemove). A flat "tab was
  // open" timer alone is trivially cleared by any headless bot that just
  // waits a few seconds without touching the page — that was letting bots
  // generate full "Session ended" reports with an empty click list.
  if (s.activeMs < 15000 || s.pages.length === 0 || !interacted) return;

  sentSummary = true;

  // Final active time update
  if (isActive) {
    s.activeMs += Date.now() - lastActive;
  }
  updateScroll();

  const utm = (() => {
    try {
      const raw = sessionStorage.getItem("vl_utm");
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  })();

  const payload = {
    type: "session",
    activeTime: formatDuration(s.activeMs),
    activeMs: s.activeMs,
    pages: s.pages,
    clicks: s.clicks,
    maxScroll: s.maxScroll,
    utm,
    ts: new Date().toISOString(),
  };

  // sendBeacon with text/plain avoids CORS preflight (no OPTIONS needed)
  const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
  navigator.sendBeacon(ENDPOINT, blob);
}

/** Initialize session tracking — call once from a client component */
export function initSessionTracker() {
  if (typeof window === "undefined") return;

  trackPage();
  startTicker();

  // Track active/idle
  const markActive = () => {
    if (!isActive) {
      isActive = true;
      lastActive = Date.now();
    }
  };
  const markIdle = () => { isActive = false; };
  const markInteracted = () => { interacted = true; };

  // Visibility change — pause timer when tab hidden, send summary on hide
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      markIdle();
      persist();
      sendSummary(); // Try to send when tab goes hidden
    } else {
      markActive();
    }
  });

  // Send on page unload (backup)
  window.addEventListener("beforeunload", () => {
    persist();
    sendSummary();
  });

  // Track scroll depth periodically
  let scrollTick = false;
  window.addEventListener("scroll", () => {
    if (!scrollTick) {
      scrollTick = true;
      requestAnimationFrame(() => {
        updateScroll();
        scrollTick = false;
      });
    }
    markActive();
    markInteracted();
  }, { passive: true });

  // Track clicks on meaningful elements
  document.addEventListener("click", (e) => {
    markActive();
    markInteracted();

    const target = e.target as HTMLElement;

    // Track button/link clicks
    const clickable = target.closest("a, button");
    if (!clickable) return;

    const label =
      clickable.textContent?.trim().replace(/\s+/g, " ").slice(0, 60) || "";
    if (!label) return;

    // Determine section
    const section =
      clickable.closest("[data-section]")?.getAttribute("data-section") ||
      clickable.closest("section")?.querySelector(".eyebrow")?.textContent?.trim() ||
      clickable.closest("header") ? "header" :
      clickable.closest("footer") ? "footer" :
      clickable.closest(".fab") ? "floating_contact" :
      clickable.closest(".popup") ? "popup" :
      "unknown";

    // Skip non-meaningful clicks (nav styling, close buttons, etc.)
    if (label.length < 3 || label === "×") return;

    trackClick(label, String(section));
  });

  // Mouse movement = active
  window.addEventListener("mousemove", () => { markActive(); markInteracted(); }, { passive: true });
  window.addEventListener("keydown", () => { markActive(); markInteracted(); }, { passive: true });
}

/** Call on SPA navigation to record new page */
export function trackPageChange() {
  if (typeof window === "undefined") return;
  trackPage();
}
