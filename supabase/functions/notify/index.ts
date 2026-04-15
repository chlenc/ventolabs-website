const BOT_TOKEN = "8796675484:AAFmoa8ouMNPMpvnzV10tLiXsp9Xuq9nv6o";
const CHAT_ID = "-1003805212766";
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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

function utmLine(utm: Record<string, string> | null | undefined): string {
  if (!utm) return "";
  return Object.entries(utm).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(", ");
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
      const name = [payload.name, payload.email].filter(Boolean).join(" — ");
      const title = payload.title || payload.eventTitle || "Meeting";
      const startTime = payload.startTime
        ? new Date(payload.startTime).toLocaleString("en-US", { timeZone: "Europe/Lisbon" })
        : "?";
      const responses = payload.responses || {};
      const notes = responses["what-would-you-like-to-improve-or-automate-with-ai"]?.value
        || responses.notes
        || responses.rescheduleReason
        || "";

      message = [
        "🎉 <b>NEW BOOKING via Cal.com!</b>",
        "",
        `👤 <b>${name || "Unknown"}</b>`,
        `📅 ${title}`,
        `🕐 ${startTime}`,
        notes ? `📝 ${String(notes).slice(0, 300)}` : "",
        `📍 ${geo}`,
        "",
        "👤 @defi_defiler @vlacomor",
      ].filter(Boolean).join("\n");

    } else {
      return new Response(JSON.stringify({ ok: true, note: "unhandled event" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

    return new Response(JSON.stringify({ ok: tgData.ok }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
