const BOT_TOKEN = "8796675484:AAFmoa8ouMNPMpvnzV10tLiXsp9Xuq9nv6o";
const CHAT_ID = "-1003805212766";
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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
  return Object.entries(utm)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type } = body;
    const ip = getClientIp(req);
    const geo = await geoLookup(ip);
    const utm = utmLine(body.utm);

    let message = "";

    if (type === "visit") {
      const { page, referrer, ts } = body;
      message = [
        "👁 <b>New visitor</b>",
        "",
        `📄 Page: <code>${page || "/"}</code>`,
        referrer && referrer !== "(direct)" ? `🔗 Referrer: ${referrer}` : "🔗 Referrer: (direct)",
        `📍 ${geo}`,
        utm ? `🏷 UTM: <code>${utm}</code>` : "",
        `🕐 ${ts || new Date().toISOString()}`,
      ].filter(Boolean).join("\n");

    } else if (type === "booking") {
      const { page, ts } = body;
      message = [
        "🎉 <b>NEW BOOKING!</b>",
        "",
        `📄 Page: <code>${page || "/"}</code>`,
        `📍 ${geo}`,
        utm ? `🏷 UTM: <code>${utm}</code>` : "",
        `🕐 ${ts || new Date().toISOString()}`,
        "",
        "👤 @defi_defiler @vlacomor",
      ].join("\n");

    } else if (type === "session") {
      const { activeTime, pages, clicks, maxScroll, ts } = body;

      // Format page journey
      const journey = (pages || []).length > 0
        ? (pages as string[]).map((p: string) => p.split("?")[0]).join(" → ")
        : "(no pages)";

      // Format clicks
      const clickList = (clicks || []).length > 0
        ? (clicks as Array<{ label: string; section: string; time: number }>)
            .map((c) => `• "${c.label}" <i>(${c.section}, ${c.time}s)</i>`)
            .join("\n")
        : "(no clicks)";

      message = [
        "📊 <b>Session ended</b>",
        "",
        `⏱ Active time: <b>${activeTime || "?"}</b>`,
        `📄 Pages (${(pages || []).length}): <code>${journey}</code>`,
        `📜 Scroll depth: ${maxScroll || 0}%`,
        `📍 ${geo}`,
        utm ? `🏷 UTM: <code>${utm}</code>` : "",
        "",
        `🖱 <b>Clicks:</b>`,
        clickList,
        "",
        `🕐 ${ts || new Date().toISOString()}`,
      ].filter(Boolean).join("\n");

    } else if (
      // Cal.com webhook: triggerEvent = BOOKING_CREATED
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
      const notes = responses.notes || responses.rescheduleReason || "";

      message = [
        "🎉 <b>NEW BOOKING via Cal.com!</b>",
        "",
        `👤 <b>${name || "Unknown"}</b>`,
        `📅 ${title}`,
        `🕐 ${startTime}`,
        notes ? `📝 Notes: ${String(notes).slice(0, 200)}` : "",
        `📍 ${geo}`,
        "",
        "👤 @defi_defiler @vlacomor",
      ].filter(Boolean).join("\n");

    } else {
      // Unknown type — return 200 so Cal.com ping test passes
      return new Response(JSON.stringify({ ok: true, note: "unhandled event type" }), {
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
