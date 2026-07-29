// Vento Labs notify — the LIVE endpoint (notify.ventolabs.com). The Supabase
// copy at supabase/functions/notify/index.ts is a dead project (its domain
// no longer resolves) kept only as a reference/fallback in case Supabase is
// ever revived — this Cloudflare Pages Functions file is canonical now; keep
// the two in sync when editing. Deployed as a Pages project
// `ventolabs-notify`; accepts POST on any path.
//
// Env vars (Pages project → Settings → Variables, all optional):
//   TG_BOT_TOKEN / TG_CHAT_ID — override the hardcoded Telegram target
//   ANTHROPIC_API_KEY         — enables 2-3 sentence company summary via Claude
//   CAL_API_KEY + CAL_AUTO_GUESTS — auto-invite team emails to new bookings
//   RESEND_API_KEY (+ NOTIFY_EMAIL_TO / NOTIFY_EMAIL_FROM) — email copy
//   NOTIFY_DEBUG              — log composed messages

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

// ── Bot/spam filtering ────────────────────────────────
// Mirrors src/lib/bot.ts's client-side check — this is the server-side
// backstop, since anyone can bypass client JS by POSTing directly to this
// public endpoint. Broad substring match on purpose: real browser UAs never
// contain these tokens, but crawler/scraper/automation UAs almost always do.
const BOT_UA_RE =
  /bot|crawl|spider|slurp|headless|puppeteer|playwright|selenium|phantomjs|python-requests|python-urllib|go-http-client|scrapy|curl\/|wget\/|facebookexternalhit/i;

// Short-TTL per-IP+type suppression so a bot/monitor re-hitting the site
// every few minutes doesn't spam a fresh Telegram message every time it
// returns. Cache API is edge-local (not globally consistent across every
// Cloudflare colo), which is fine here — this only needs to cut *repeat*
// noise, not guarantee exactly-once delivery.
async function isDuplicate(ip, type) {
  if (!ip) return false;
  try {
    const cache = caches.default;
    const key = new Request(`https://dedup.ventolabs.internal/${type}/${encodeURIComponent(ip)}`);
    const hit = await cache.match(key);
    if (hit) return true;
    await cache.put(key, new Response("1", { headers: { "Cache-Control": "max-age=1200" } }));
    return false;
  } catch {
    return false; // never let a dedup failure block a real notification
  }
}

// ── Funny visitor names & avatars ────────────────────
const ANIMALS = [
  "Penguin", "Raccoon", "Capybara", "Hedgehog", "Octopus",
  "Flamingo", "Axolotl", "Red Panda", "Quokka", "Narwhal",
  "Sloth", "Otter", "Gecko", "Alpaca", "Chameleon",
  "Platypus", "Puffin", "Pangolin", "Lemur", "Wombat",
];
const ADJECTIVES = [
  "Mysterious", "Electric", "Cosmic", "Sneaky", "Turbo",
  "Quantum", "Neon", "Stealthy", "Hyper", "Galactic",
  "Legendary", "Atomic", "Cyber", "Shadow", "Crystal",
  "Ultra", "Phantom", "Mega", "Astro", "Thunder",
];
const EMOJIS = [
  "🐧", "🦝", "🦫", "🦔", "🐙",
  "🦩", "🦎", "🐾", "🐨", "🦄",
  "🦥", "🦦", "🦎", "🦙", "🦎",
  "🥚", "🐦", "🦔", "🐒", "🐻",
];

function visitorId(ip) {
  let h = 0;
  for (let i = 0; i < ip.length; i++) {
    h = ((h << 5) - h + ip.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(h);
  const adj = ADJECTIVES[idx % ADJECTIVES.length];
  const animal = ANIMALS[(idx >> 4) % ANIMALS.length];
  const emoji = EMOJIS[(idx >> 4) % EMOJIS.length];
  const short = Math.abs(h).toString(36).slice(0, 4).toUpperCase();
  return { name: `${adj} ${animal}`, emoji, hash: short };
}

// ── Geo lookup ───────────────────────────────────────
async function geoLookup(ip) {
  if (!ip || ip === "127.0.0.1" || ip === "::1") return "localhost";
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city,isp`);
    const data = await res.json();
    if (data.status === "success") {
      const parts = [data.city, data.country].filter(Boolean).join(", ");
      return parts + (data.isp ? ` (${data.isp})` : "");
    }
  } catch { /* ignore */ }
  return ip;
}

function getClientIp(req) {
  return (
    req.headers.get("cf-connecting-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    ""
  );
}

// ── Lead enrichment (email domain → company info) ────
const FREE_MAIL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.es", "yahoo.com.mx",
  "yahoo.com.ar", "yahoo.com.br", "hotmail.com", "hotmail.es", "outlook.com",
  "outlook.es", "live.com", "msn.com", "icloud.com", "me.com", "mac.com",
  "proton.me", "protonmail.com", "pm.me", "aol.com", "gmx.com", "gmx.de",
  "gmx.net", "web.de", "zoho.com", "tutanota.com", "tuta.io", "mail.com",
  "mail.ru", "bk.ru", "list.ru", "inbox.ru", "internet.ru", "yandex.ru",
  "yandex.com", "ya.ru", "rambler.ru", "ukr.net",
]);

function emailDomain(email) {
  const m = String(email || "").toLowerCase().trim().match(/@([a-z0-9][a-z0-9.-]*\.[a-z]{2,})$/);
  if (!m) return null;
  return FREE_MAIL.has(m[1]) ? null : m[1];
}

async function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; VentoLabsNotify/1.0)" },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(s) {
  return s
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&nbsp;/gi, " ")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
}

function parsePage(html) {
  const pick = (re) => decodeEntities(((html.match(re) || [])[1] || "").replace(/\s+/g, " ").trim());
  const title = pick(/<title[^>]*>([^<]*)<\/title>/i);
  const description =
    pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
    pick(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i) ||
    pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
  const text = decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 3500);
  return { title, description, text };
}

async function llmCompanySummary(env, domain, pageText) {
  const key = env.ANTHROPIC_API_KEY;
  if (!key || pageText.length < 100) return null;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        signal: ctrl.signal,
        headers: {
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5",
          max_tokens: 300,
          messages: [{
            role: "user",
            content:
              `Текст главной страницы сайта компании ${domain}:\n\n${pageText}\n\n` +
              "Опиши в 2-3 коротких предложениях на русском: что это за компания, чем занимается, " +
              "из какой страны (если видно), кто её клиенты. Только факты со страницы, без домыслов.",
          }],
        }),
      });
      if (!r.ok) return null;
      const data = await r.json();
      const out = data && data.content && data.content[0] && data.content[0].text;
      return typeof out === "string" ? out.trim() : null;
    } finally {
      clearTimeout(timer);
    }
  } catch {
    return null;
  }
}

async function enrichByEmail(env, email) {
  try {
    const domain = emailDomain(email);
    if (!domain) {
      return email ? [`🏢 Личная почта (${esc(email.split("@")[1] || "")}) — компанию по домену не определить`] : [];
    }
    const lines = [];
    const res = await fetchWithTimeout(`https://${domain}`, 8000);
    if (res && res.ok) {
      const { title, description, text } = parsePage(await res.text());
      const summary = await llmCompanySummary(env, domain, text);
      lines.push(`🏢 <b>${esc(domain)}</b>${title ? ` — ${esc(title)}` : ""}`);
      if (summary) lines.push(`📎 ${esc(summary)}`);
      else if (description) lines.push(`📎 ${esc(description.slice(0, 300))}`);
    } else {
      lines.push(`🏢 <b>${esc(domain)}</b> — сайт не открылся, смотри ссылки ниже`);
    }
    lines.push(
      `🔎 <a href="https://www.google.com/search?q=${encodeURIComponent(domain)}">Google</a>` +
      ` · <a href="https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(domain)}">LinkedIn</a>`,
    );
    return lines;
  } catch {
    return [];
  }
}

// ── Attendee timezone → country ──────────────────────
const TZ_COUNTRY = {
  "Europe/Moscow": "Россия 🇷🇺", "Europe/Kaliningrad": "Россия 🇷🇺", "Europe/Samara": "Россия 🇷🇺",
  "Europe/Volgograd": "Россия 🇷🇺", "Europe/Saratov": "Россия 🇷🇺", "Europe/Kirov": "Россия 🇷🇺",
  "Europe/Astrakhan": "Россия 🇷🇺", "Europe/Ulyanovsk": "Россия 🇷🇺", "Asia/Yekaterinburg": "Россия 🇷🇺",
  "Asia/Omsk": "Россия 🇷🇺", "Asia/Novosibirsk": "Россия 🇷🇺", "Asia/Krasnoyarsk": "Россия 🇷🇺",
  "Asia/Irkutsk": "Россия 🇷🇺", "Asia/Yakutsk": "Россия 🇷🇺", "Asia/Vladivostok": "Россия 🇷🇺",
  "Europe/Madrid": "Испания 🇪🇸", "Atlantic/Canary": "Испания 🇪🇸",
  "America/Mexico_City": "Мексика 🇲🇽", "America/Monterrey": "Мексика 🇲🇽", "America/Tijuana": "Мексика 🇲🇽",
  "America/Bogota": "Колумбия 🇨🇴", "America/Lima": "Перу 🇵🇪", "America/Santiago": "Чили 🇨🇱",
  "America/Argentina/Buenos_Aires": "Аргентина 🇦🇷", "America/Argentina/Cordoba": "Аргентина 🇦🇷",
  "America/Sao_Paulo": "Бразилия 🇧🇷", "America/Caracas": "Венесуэла 🇻🇪", "America/Guayaquil": "Эквадор 🇪🇨",
  "America/La_Paz": "Боливия 🇧🇴", "America/Asuncion": "Парагвай 🇵🇾", "America/Montevideo": "Уругвай 🇺🇾",
  "America/Guatemala": "Гватемала 🇬🇹", "America/El_Salvador": "Сальвадор 🇸🇻", "America/Managua": "Никарагуа 🇳🇮",
  "America/Tegucigalpa": "Гондурас 🇭🇳", "America/Costa_Rica": "Коста-Рика 🇨🇷", "America/Panama": "Панама 🇵🇦",
  "America/Santo_Domingo": "Доминикана 🇩🇴", "America/Havana": "Куба 🇨🇺", "America/Puerto_Rico": "Пуэрто-Рико 🇵🇷",
  "Europe/Berlin": "Германия 🇩🇪", "Europe/Lisbon": "Португалия 🇵🇹", "Europe/London": "Великобритания 🇬🇧",
  "Europe/Paris": "Франция 🇫🇷", "Europe/Rome": "Италия 🇮🇹", "Europe/Amsterdam": "Нидерланды 🇳🇱",
  "Europe/Warsaw": "Польша 🇵🇱", "Europe/Kiev": "Украина 🇺🇦", "Europe/Kyiv": "Украина 🇺🇦",
  "Europe/Minsk": "Беларусь 🇧🇾", "Europe/Istanbul": "Турция 🇹🇷", "Asia/Almaty": "Казахстан 🇰🇿",
  "Asia/Aqtobe": "Казахстан 🇰🇿", "Asia/Tashkent": "Узбекистан 🇺🇿", "Asia/Tbilisi": "Грузия 🇬🇪",
  "Asia/Yerevan": "Армения 🇦🇲", "Asia/Baku": "Азербайджан 🇦🇿", "Asia/Dubai": "ОАЭ 🇦🇪",
  "Asia/Jerusalem": "Израиль 🇮🇱", "America/New_York": "США 🇺🇸", "America/Chicago": "США 🇺🇸",
  "America/Denver": "США 🇺🇸", "America/Los_Angeles": "США 🇺🇸", "America/Phoenix": "США 🇺🇸",
  "America/Toronto": "Канада 🇨🇦", "America/Vancouver": "Канада 🇨🇦",
};

function countryFromTz(tz) {
  if (!tz) return null;
  return TZ_COUNTRY[tz] || null;
}

// ── Auto-invite the team to new bookings ─────────────
async function addTeamGuests(env, payload) {
  const key = env.CAL_API_KEY;
  const guestsEnv = env.CAL_AUTO_GUESTS;
  const uid = typeof payload.uid === "string" ? payload.uid : "";
  if (!key || !guestsEnv || !uid) return;
  const guests = guestsEnv.split(",").map((s) => s.trim()).filter(Boolean).map((email) => ({ email }));
  if (guests.length === 0) return;
  try {
    const res = await fetch(`https://api.cal.com/v2/bookings/${uid}/guests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "cal-api-version": "2024-08-13",
      },
      body: JSON.stringify({ guests }),
    });
    if (env.NOTIFY_DEBUG) {
      console.log(`addTeamGuests ${uid}: ${res.status} ${await res.text()}`);
    }
  } catch { /* never break the notification */ }
}

// ── Optional email copy via Resend ───────────────────
async function sendEmailCopy(env, subject, tgHtmlMessage) {
  const key = env.RESEND_API_KEY;
  if (!key) return;
  const to = (env.NOTIFY_EMAIL_TO || "alexey@ventolabs.com").split(",").map((s) => s.trim());
  const from = env.NOTIFY_EMAIL_FROM || "Vento Labs Notify <notify@ventolabs.com>";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to, subject,
        html: `<pre style="font-family:inherit;white-space:pre-wrap">${tgHtmlMessage}</pre>`,
      }),
    });
  } catch { /* never break the main notification */ }
}

function utmLine(utm) {
  if (!utm) return "";
  return Object.entries(utm).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(", ");
}

function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Main handler ─────────────────────────────────────
export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    const BOT_TOKEN = env.TG_BOT_TOKEN || "8796675484:AAFmoa8ouMNPMpvnzV10tLiXsp9Xuq9nv6o";
    const CHAT_ID = env.TG_CHAT_ID || "-1003805212766";
    const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      const raw = await req.text();
      const body = JSON.parse(raw);
      const { type } = body;

      const ip = getClientIp(req);

      // Filtering applies only to client-originated events (visit/session/
      // lead/booking-signal). The Cal.com webhook branch below
      // (body.triggerEvent) is a server-to-server call with no comparable
      // browser UA, so it's exempt — never gate real booking confirmations
      // on a UA heuristic.
      if (type === "visit" || type === "session" || type === "lead" || type === "booking") {
        const headerUa = req.headers.get("user-agent") || "";
        const bodyUa = typeof body.ua === "string" ? body.ua : "";
        if (BOT_UA_RE.test(headerUa) || BOT_UA_RE.test(bodyUa)) {
          return new Response(JSON.stringify({ ok: true, note: "filtered" }), {
            status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (type === "lead" && body.website) {
          // Honeypot field a real visitor never fills — silently drop.
          return new Response(JSON.stringify({ ok: true, note: "filtered" }), {
            status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if ((type === "visit" || type === "session") && (await isDuplicate(ip, type))) {
          return new Response(JSON.stringify({ ok: true, note: "deduped" }), {
            status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      const geo = await geoLookup(ip);
      const utm = utmLine(body.utm);
      const visitor = visitorId(ip);
      const visitorTag = `${visitor.emoji} <b>${visitor.name}</b> <code>#${visitor.hash}</code>`;

      let message = "";
      let emailSubject = "";

      if (type === "visit") {
        const { page, referrer, ts } = body;
        message = [
          `👁 <b>New visitor</b> — ${visitorTag}`,
          "",
          `📄 Page: <code>${page || "/"}</code>`,
          referrer && referrer !== "(direct)" ? `🔗 Referrer: ${referrer}` : "🔗 Referrer: (direct)",
          `📍 ${geo}`,
          ip ? `🌐 IP: <code>${ip}</code>` : "",
          utm ? `🏷 UTM: <code>${utm}</code>` : "",
          `🕐 ${ts || new Date().toISOString()}`,
        ].filter(Boolean).join("\n");

      } else if (type === "booking") {
        // Client-side signal only (Cal.com embed postMessage) — can be
        // triggered by opening/closing the widget, or forged by a direct
        // POST to this endpoint since it carries no name/email. The
        // authoritative confirmation is the "via Cal.com!" message below,
        // sent from Cal.com's own server-to-server webhook. Label this one
        // clearly so it isn't mistaken for a confirmed booking.
        const { page, ts } = body;
        message = [
          `🔔 <b>Booking widget signal</b> <i>(unverified — no Cal.com confirmation yet)</i> — ${visitorTag}`,
          "",
          `📄 Page: <code>${page || "/"}</code>`,
          `📍 ${geo}`,
          ip ? `🌐 IP: <code>${ip}</code>` : "",
          utm ? `🏷 UTM: <code>${utm}</code>` : "",
          `🕐 ${ts || new Date().toISOString()}`,
        ].join("\n");

      } else if (type === "lead") {
        const { name, email, message: ask, page, ts } = body;
        const enrichment = email ? await enrichByEmail(env, email) : [];
        message = [
          `📨 <b>NEW LEAD (form)</b> — ${visitorTag}`,
          "",
          `👤 <b>${esc(name) || "Unknown"}</b>`,
          email ? `✉️ <code>${esc(email)}</code>` : "",
          ...enrichment,
          ask ? `📝 ${esc(String(ask).slice(0, 800))}` : "",
          `📄 Page: <code>${esc(page) || "/"}</code>`,
          `📍 ${geo}`,
          ip ? `🌐 IP: <code>${ip}</code>` : "",
          utm ? `🏷 UTM: <code>${utm}</code>` : "",
          `🕐 ${ts || new Date().toISOString()}`,
          "",
          "👤 @defi_defiler @vlacomor",
        ].filter(Boolean).join("\n");
        emailSubject = `Новый лид с сайта: ${String(name || email || "без имени").slice(0, 80)}`;

      } else if (type === "session") {
        const { activeTime, pages, clicks, maxScroll, ts } = body;

        const journey = (pages || []).length > 0
          ? pages.map((p) => p.split("?")[0]).join(" → ")
          : "(no pages)";

        const clickList = (clicks || []).length > 0
          ? clicks.map((c) => `  • "${c.label}" <i>(${c.section}, ${c.time}s)</i>`).join("\n")
          : "  (no clicks)";

        message = [
          `📊 <b>Session ended</b> — ${visitorTag}`,
          "",
          `⏱ Active: <b>${activeTime || "?"}</b>`,
          `📄 Pages (${(pages || []).length}): <code>${journey}</code>`,
          `📜 Scroll: ${maxScroll || 0}%`,
          `📍 ${geo}`,
          ip ? `🌐 IP: <code>${ip}</code>` : "",
          utm ? `🏷 UTM: <code>${utm}</code>` : "",
          "",
          `🖱 <b>Clicks:</b>`,
          clickList,
          "",
          `🕐 ${ts || new Date().toISOString()}`,
        ].filter(Boolean).join("\n");

      } else if (
        body.triggerEvent === "BOOKING_CREATED" ||
        body.triggerEvent === "BOOKING_RESCHEDULED"
      ) {
        const payload = body.payload || {};
        const responses = payload.responses || {};
        const attendee = (payload.attendees && payload.attendees[0]) || {};

        const respValue = (v) => {
          if (!v) return "";
          if (typeof v === "string") return v;
          if (typeof v === "object" && v !== null && "value" in v) {
            return typeof v.value === "string" ? v.value : "";
          }
          return "";
        };

        const attendeeName = respValue(responses.name) || attendee.name || "";
        const attendeeEmail = respValue(responses.email) || attendee.email || "";
        const who = [attendeeName, attendeeEmail].filter(Boolean).join(" — ");

        const title = payload.title || payload.eventTitle || "Meeting";
        const fmt = (tz) =>
          payload.startTime
            ? new Date(payload.startTime).toLocaleString("ru-RU", {
                timeZone: tz, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
              })
            : "?";

        const notes =
          respValue(responses["what-would-you-like-to-improve-or-automate-with-ai"]) ||
          (typeof payload.additionalNotes === "string" ? payload.additionalNotes : "") ||
          respValue(responses.notes) ||
          respValue(responses.rescheduleReason) ||
          "";

        if (body.triggerEvent === "BOOKING_CREATED") {
          await addTeamGuests(env, payload);
        }

        const attendeeTz = attendee.timeZone;
        const country = countryFromTz(attendeeTz);
        const enrichment = attendeeEmail ? await enrichByEmail(env, attendeeEmail) : [];

        message = [
          "🎉 <b>NEW BOOKING via Cal.com!</b>",
          "",
          `👤 <b>${esc(who) || "Unknown"}</b>`,
          country
            ? `🌍 ${country} <i>(таймзона ${esc(attendeeTz)})</i>`
            : attendeeTz ? `🌍 Таймзона: ${esc(attendeeTz)}` : "",
          ...enrichment,
          `📅 ${esc(title)}`,
          `🕐 ${fmt("Europe/Moscow")} МСК · ${fmt("Europe/Lisbon")} Лиссабон`,
          notes ? `📝 ${esc(notes.slice(0, 300))}` : "",
          "",
          "👤 @defi_defiler @vlacomor",
        ].filter(Boolean).join("\n");
        emailSubject = `Новая бронь звонка: ${String(attendeeName || attendeeEmail || "без имени").slice(0, 80)}${country ? ` (${country})` : ""}`;

      } else {
        return new Response(JSON.stringify({ ok: true, note: "unhandled event" }), {
          status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (env.NOTIFY_DEBUG) console.log(message);

      const tgRes = await fetch(TG_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
      const tgData = await tgRes.json();

      if (emailSubject) await sendEmailCopy(env, emailSubject, message);

      return new Response(JSON.stringify({ ok: tgData.ok }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: String(err) }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
