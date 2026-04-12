const BOT_TOKEN = "8796675484:AAFmoa8ouMNPMpvnzV10tLiXsp9Xuq9nv6o";
const CHAT_ID = "-1003805212766";
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/** Look up IP geolocation via ip-api.com (free, no key needed, 45 req/min) */
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

/** Extract client IP from Supabase/CF headers */
function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    ""
  );
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

    let message = "";

    if (type === "visit") {
      const { page, referrer, utm, ts } = body;
      const utmLine = Object.entries(utm || {})
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ");

      message = [
        "👁 <b>New visitor</b>",
        "",
        `📄 Page: <code>${page || "/"}</code>`,
        referrer && referrer !== "(direct)" ? `🔗 Referrer: ${referrer}` : "🔗 Referrer: (direct)",
        `📍 Location: ${geo}`,
        utmLine ? `🏷 UTM: <code>${utmLine}</code>` : "",
        `🕐 ${ts || new Date().toISOString()}`,
      ]
        .filter(Boolean)
        .join("\n");
    } else if (type === "booking") {
      const { page, utm, ts } = body;
      const utmLine = Object.entries(utm || {})
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ");

      message = [
        "🎉 <b>NEW BOOKING!</b>",
        "",
        `📄 Page: <code>${page || "/"}</code>`,
        `📍 Location: ${geo}`,
        utmLine ? `🏷 UTM: <code>${utmLine}</code>` : "",
        `🕐 ${ts || new Date().toISOString()}`,
        "",
        "👤 @defi_defiler @vlacomor",
      ].join("\n");
    } else {
      return new Response(JSON.stringify({ error: "Unknown event type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
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
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
