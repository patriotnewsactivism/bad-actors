// Verifies a returned Stripe Checkout Session server-side (never trusts the
// client) and delivers the download by email exactly once per session_id,
// enforced by a unique constraint on single_purchases.session_id.

const TRACKS = {
  "happy-fuck-the-cops-day": {
    title: "Happy Fuck The Cops Day",
    fileUrl: "https://badactors.online/audio/happy-fuck-the-cops-day.mp3",
  },
};

const NOTIFY_EMAIL = "don@donmatthews.live";
const FROM = "Bad Actors <downloads@donmatthews.live>";

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
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const sessionId = req.query?.session_id;
  if (!sessionId) return res.status(400).json({ error: "session_id is required" });

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.SINGLES_SUPABASE_URL;
  const supabaseKey = process.env.SINGLES_SUPABASE_SERVICE_ROLE_KEY;
  if (!stripeKey || !supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Not configured" });
  }

  try {
    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${stripeKey}` },
    });
    if (!stripeRes.ok) {
      return res.status(400).json({ error: "Invalid session" });
    }
    const session = await stripeRes.json();

    if (session.payment_status !== "paid") {
      return res.status(200).json({ paid: false });
    }

    const trackSlug = session.metadata?.track_slug || "happy-fuck-the-cops-day";
    const trackInfo = TRACKS[trackSlug];
    if (!trackInfo) return res.status(400).json({ error: "Unknown track" });

    const email = session.customer_details?.email || session.customer_email;

    // Insert-or-detect-duplicate: unique constraint on session_id means a
    // second verify call (e.g. page refresh) hits a 409 conflict here and we
    // just re-serve the link without re-sending the email.
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/single_purchases`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        session_id: sessionId,
        track_slug: trackSlug,
        email: email || "unknown",
        amount_cents: session.amount_total,
      }),
    });

    const isFirstDelivery = insertRes.ok;

    if (isFirstDelivery) {
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey && email) {
        void sendResend(
          resendKey,
          email,
          `Your purchase: ${trackInfo.title}`,
          `<p>Thanks for buying <strong>${trackInfo.title}</strong>! Here's your download:</p>
           <p><a href="${trackInfo.fileUrl}">${trackInfo.fileUrl}</a></p>
           <p>Truth. Justice. Accountability.<br/>— Don Matthews</p>`
        );
        void sendResend(
          resendKey,
          NOTIFY_EMAIL,
          `New paid download: ${trackInfo.title}`,
          `<p>${email} just paid $${(session.amount_total / 100).toFixed(2)} for "${trackInfo.title}" on badactors.online.</p>`
        );
      }
    }

    return res.status(200).json({ paid: true, downloadUrl: trackInfo.fileUrl });
  } catch (error) {
    console.error("[single-checkout-verify] Error:", error.message);
    return res.status(500).json({ error: "Verification failed" });
  }
}
