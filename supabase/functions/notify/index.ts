const BOT_TOKEN = "8796675484:AAFmoa8ouMNPMpvnzV10tLiXsp9Xuq9nv6o";
const CHAT_ID = "-1003805212766";
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type } = body;

    let message = "";

    if (type === "visit") {
      const { page, referrer, utm, ua, ts } = body;
      const utmLine = Object.entries(utm || {})
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ");

      message = [
        "👁 <b>New visitor</b>",
        "",
        `📄 Page: <code>${page || "/"}</code>`,
        referrer && referrer !== "(direct)" ? `🔗 Referrer: ${referrer}` : "🔗 Referrer: (direct)",
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

    // Send to Telegram
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
