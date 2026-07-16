// Prefer function env (supabase secrets set TG_BOT_TOKEN=… TG_CHAT_ID=…);
// hardcoded values remain as fallback so a redeploy without env keeps working.
const BOT_TOKEN = Deno.env.get("TG_BOT_TOKEN") || "8796675484:AAFmoa8ouMNPMpvnzV10tLiXsp9Xuq9nv6o";
const CHAT_ID = Deno.env.get("TG_CHAT_ID") || "-1003805212766";
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  // Wildcard so emerging client-injected headers like `signature-agent`
  // (Web Bot Auth, RFC 9421) don't trip preflight. Origin is `*` and the
  // function takes no credentials, so widening this is safe.
  "Access-Control-Allow-Headers": "*",
};

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

function visitorId(ip: string): { name: string; emoji: string; hash: string } {
  // Simple hash from IP string
  let h = 0;
  for (let i = 0; i < ip.length; i++) {
    h = ((h << 5) - h + ip.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(h);
  const adj = ADJECTIVES[idx % ADJECTIVES.length];
  const animal = ANIMALS[(idx >> 4) % ANIMALS.length];
  const emoji = EMOJIS[(idx >> 4) % EMOJIS.length];
  // Short hash for identification
  const short = Math.abs(h).toString(36).slice(0, 4).toUpperCase();
  return { name: `${adj} ${animal}`, emoji, hash: short };
}

// ── Geo lookup ───────────────────────────────────────
async function geoLookup(ip: string): Promise<string> {
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

function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    ""
  );
}

// ── Lead enrichment (email domain → company info) ────
// Free/personal mailbox providers — no company behind the domain.
const FREE_MAIL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.es", "yahoo.com.mx",
  "yahoo.com.ar", "yahoo.com.br", "hotmail.com", "hotmail.es", "outlook.com",
  "outlook.es", "live.com", "msn.com", "icloud.com", "me.com", "mac.com",
  "proton.me", "protonmail.com", "pm.me", "aol.com", "gmx.com", "gmx.de",
  "gmx.net", "web.de", "zoho.com", "tutanota.com", "tuta.io", "mail.com",
  "mail.ru", "bk.ru", "list.ru", "inbox.ru", "internet.ru", "yandex.ru",
  "yandex.com", "ya.ru", "rambler.ru", "ukr.net",
]);

function emailDomain(email: string): string | null {
  const m = String(email || "").toLowerCase().trim().match(/@([a-z0-9][a-z0-9.-]*\.[a-z]{2,})$/);
  if (!m) return null;
  return FREE_MAIL.has(m[1]) ? null : m[1];
}

async function fetchWithTimeout(url: string, ms: number): Promise<Response | null> {
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

/** Decode the handful of HTML entities that show up in titles/descriptions. */
function decodeEntities(s: string): string {
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

/** Pull title/description/visible text out of an HTML page. */
function parsePage(html: string): { title: string; description: string; text: string } {
  const pick = (re: RegExp) => decodeEntities((html.match(re)?.[1] || "").replace(/\s+/g, " ").trim());
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

/** Optional: 2-3 sentence Russian company summary via Claude, if key is set. */
async function llmCompanySummary(domain: string, pageText: string): Promise<string | null> {
  const key = Deno.env.get("ANTHROPIC_API_KEY");
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
      const out = data?.content?.[0]?.text;
      return typeof out === "string" ? out.trim() : null;
    } finally {
      clearTimeout(timer);
    }
  } catch {
    return null;
  }
}

/**
 * Enrich a lead by work-email domain: fetch the company homepage, return
 * ready-to-post HTML lines for the Telegram message. Never throws.
 */
async function enrichByEmail(email: string): Promise<string[]> {
  try {
    const domain = emailDomain(email);
    if (!domain) {
      return email ? [`🏢 Личная почта (${esc(email.split("@")[1] || "")}) — компанию по домену не определить`] : [];
    }
    const lines: string[] = [];
    const res = await fetchWithTimeout(`https://${domain}`, 8000);
    if (res && res.ok) {
      const { title, description, text } = parsePage(await res.text());
      const summary = await llmCompanySummary(domain, text);
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
const TZ_COUNTRY: Record<string, string> = {
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

function countryFromTz(tz: string | undefined): string | null {
  if (!tz) return null;
  return TZ_COUNTRY[tz] || null;
}

// ── Auto-invite the team to new bookings ─────────────
// Set CAL_API_KEY (cal_… key from cal.com Settings → Developer → API keys)
// and CAL_AUTO_GUESTS="vlad@…,sasha@…" in the function env: every new
// Cal.com booking gets those people added as guests — they receive the
// calendar invite automatically. Silent no-op when unset; never throws.
async function addTeamGuests(payload: Record<string, unknown>): Promise<void> {
  const key = Deno.env.get("CAL_API_KEY");
  const guestsEnv = Deno.env.get("CAL_AUTO_GUESTS");
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
    if (Deno.env.get("NOTIFY_DEBUG")) {
      console.log(`addTeamGuests ${uid}: ${res.status} ${await res.text()}`);
    }
  } catch { /* never break the notification */ }
}

// ── Optional email copy via Resend ───────────────────
// Set RESEND_API_KEY (+ optionally NOTIFY_EMAIL_TO / NOTIFY_EMAIL_FROM) in the
// function env to also receive booking/lead notifications by email. Silent
// no-op when the key is absent.
async function sendEmailCopy(subject: string, tgHtmlMessage: string): Promise<void> {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) return;
  const to = (Deno.env.get("NOTIFY_EMAIL_TO") || "alexey@ventolabs.com").split(",").map((s) => s.trim());
  const from = Deno.env.get("NOTIFY_EMAIL_FROM") || "Vento Labs Notify <notify@ventolabs.com>";
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

function utmLine(utm: Record<string, string> | null | undefined): string {
  if (!utm) return "";
  return Object.entries(utm).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(", ");
}

/** Escape user-supplied text for Telegram parse_mode=HTML. */
function esc(s: unknown): string {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Main handler ─────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    // Parse body — support both application/json and text/plain (sendBeacon)
    const raw = await req.text();
    const body = JSON.parse(raw);
    const { type } = body;

    const ip = getClientIp(req);
    const geo = await geoLookup(ip);
    const utm = utmLine(body.utm);
    const visitor = visitorId(ip);
    const visitorTag = `${visitor.emoji} <b>${visitor.name}</b> <code>#${visitor.hash}</code>`;

    let message = "";
    // Subject for the optional email copy — set only for lead/booking events.
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
      const { page, ts } = body;
      message = [
        `🎉 <b>NEW BOOKING!</b> — ${visitorTag}`,
        "",
        `📄 Page: <code>${page || "/"}</code>`,
        `📍 ${geo}`,
        ip ? `🌐 IP: <code>${ip}</code>` : "",
        utm ? `🏷 UTM: <code>${utm}</code>` : "",
        `🕐 ${ts || new Date().toISOString()}`,
        "",
        "👤 @defi_defiler @vlacomor",
      ].join("\n");

    } else if (type === "lead") {
      // Lead-form submission from the site (name + work email + free text).
      const { name, email, message: ask, page, ts } = body;
      const enrichment = email ? await enrichByEmail(email) : [];
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
        ? (pages as string[]).map((p: string) => p.split("?")[0]).join(" → ")
        : "(no pages)";

      const clickList = (clicks || []).length > 0
        ? (clicks as Array<{ label: string; section: string; time: number }>)
            .map((c) => `  • "${c.label}" <i>(${c.section}, ${c.time}s)</i>`)
            .join("\n")
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

      // Cal.com responses are { label, value } objects — extract value safely
      const respValue = (v: unknown): string => {
        if (!v) return "";
        if (typeof v === "string") return v;
        if (typeof v === "object" && v !== null && "value" in v) {
          const inner = (v as { value: unknown }).value;
          return typeof inner === "string" ? inner : "";
        }
        return "";
      };

      const attendeeName = respValue(responses.name) || attendee.name || "";
      const attendeeEmail = respValue(responses.email) || attendee.email || "";
      const who = [attendeeName, attendeeEmail].filter(Boolean).join(" — ");

      const title = payload.title || payload.eventTitle || "Meeting";
      const fmt = (tz: string) =>
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

      // Invite the team as guests on brand-new bookings (not reschedules —
      // guests already persist across a reschedule).
      if (body.triggerEvent === "BOOKING_CREATED") {
        await addTeamGuests(payload);
      }

      // Where the booker is: cal.com webhook has no client IP, but the
      // attendee's own timezone is a solid location signal.
      const attendeeTz: string | undefined = attendee.timeZone;
      const country = countryFromTz(attendeeTz);
      const enrichment = attendeeEmail ? await enrichByEmail(attendeeEmail) : [];

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

    if (Deno.env.get("NOTIFY_DEBUG")) console.log(message);

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

    if (emailSubject) await sendEmailCopy(emailSubject, message);

    return new Response(JSON.stringify({ ok: tgData.ok }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
