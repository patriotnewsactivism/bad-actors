// Free-download promo for standalone singles (e.g. "Happy Fuck The Cops Day").
// Caps free claims at N (default 100) per track via an atomic Postgres RPC
// (claim_single_download) that advisory-locks per track_slug, so concurrent
// hits near the cap can't overshoot it. Delivers the actual mp3 by email via
// Resend once claimed. Re-submitting the same email just re-sends the link
// (already_claimed=true) instead of eating another slot.

const TRACKS = {
  "happy-fuck-the-cops-day": {
    title: "Happy Fuck The Cops Day",
    fileUrl: "https://badactors.online/audio/happy-fuck-the-cops-day.mp3",
  },
};

const NOTIFY_EMAIL = "don@donmatthews.live";
const FROM = "Bad Actors <downloads@donmatthews.live>";
const CAP = 100;

async function sendResend(apiKey, to, subject, html) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [to], subject, html }),
    });
    if (!res.ok) console.error("[Resend] send failed:", await res.text());
  } catch (err) {
    console.error("[Resend] send error:", err.message);
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, name, source, track } = req.body || {};
  const trackSlug = track || "happy-fuck-the-cops-day";
  const trackInfo = TRACKS[trackSlug];
  if (!trackInfo) return res.status(400).json({ error: "Unknown track" });
  if (!email) return res.status(400).json({ error: "Email is required" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email format" });

  const supabaseUrl = process.env.SINGLES_SUPABASE_URL;
  const supabaseKey = process.env.SINGLES_SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("[API] Singles Supabase not configured");
    return res.status(500).json({ error: "Database not configured" });
  }

  const cleanEmail = email.toLowerCase().trim();
  const resendKey = process.env.RESEND_API_KEY;

  try {
    const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/claim_single_download`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_track_slug: trackSlug,
        p_email: cleanEmail,
        p_name: name || null,
        p_source: source || "website",
        p_cap: CAP,
      }),
    });

    if (!rpcRes.ok) {
      console.error("[API] Supabase RPC error:", await rpcRes.text());
      return res.status(500).json({ error: "Failed to process claim" });
    }

    const result = await rpcRes.json();

    if (!result.claimed) {
      return res.status(200).json({ success: false, soldOut: true, remaining: 0 });
    }

    if (resendKey) {
      void sendResend(
        resendKey,
        cleanEmail,
        `Your free download: ${trackInfo.title}`,
        `<p>Hey${name ? " " + name : ""},</p>
         <p>Thanks for grabbing <strong>${trackInfo.title}</strong> — you're one of the first 100 free downloads. Here's your file:</p>
         <p><a href="${trackInfo.fileUrl}">${trackInfo.fileUrl}</a></p>
         <p>Truth. Justice. Accountability.<br/>— Don Matthews</p>`
      );
      if (!result.already_claimed) {
        void sendResend(
          resendKey,
          NOTIFY_EMAIL,
          `New free download: ${trackInfo.title}`,
          `<p>${cleanEmail}${name ? ` (${name})` : ""} just claimed free download #${CAP - result.remaining} of ${CAP} for "${trackInfo.title}" from badactors.online (source: ${source || "website"}). ${result.remaining} remaining.</p>`
        );
      }
    }

    return res.status(200).json({
      success: true,
      alreadyClaimed: !!result.already_claimed,
      remaining: result.remaining,
      downloadUrl: trackInfo.fileUrl,
    });
  } catch (error) {
    console.error("[API] Error:", error.message);
    return res.status(500).json({ error: "Failed to process claim" });
  }
}
