/**
 * Lightweight bot/automation detector for the client-side notify pipeline.
 * Not a security boundary on its own (see the mirrored UA check in
 * cloudflare/notify-worker/_worker.js) — this just stops obvious
 * crawlers/headless browsers from generating visit/session/lead noise
 * before a request ever leaves the browser.
 */
const BOT_UA_RE =
  /bot|crawl|spider|slurp|headless|puppeteer|playwright|selenium|phantomjs|python-requests|python-urllib|go-http-client|scrapy|curl\/|wget\/|facebookexternalhit/i;

export function isLikelyBot(): boolean {
  if (typeof navigator === "undefined") return false;
  if (navigator.webdriver) return true;
  return BOT_UA_RE.test(navigator.userAgent || "");
}
