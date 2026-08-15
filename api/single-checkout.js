// Creates a Stripe Checkout Session for the $1.99 paid digital download of a
// single, once its first-100-free cap has been claimed out. Payment is
// verified server-side on return (api/single-checkout-verify.js) — never
// trust the client, and never deliver the file until Stripe confirms paid.

const TRACKS = {
  "happy-fuck-the-cops-day": { title: "Happy Fuck The Cops Day" },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, track } = req.body || {};
  const trackSlug = track || "happy-fuck-the-cops-day";
  const trackInfo = TRACKS[trackSlug];
  if (!trackInfo) return res.status(400).json({ error: "Unknown track" });

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.SINGLE_DOWNLOAD_PRICE_ID;
  if (!stripeKey || !priceId) {
    console.error("[single-checkout] Stripe not configured");
    return res.status(500).json({ error: "Payments not configured" });
  }

  const origin = req.headers.origin || "https://badactors.online";

  try {
    const params = new URLSearchParams({
      mode: "payment",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      success_url: `${origin}/?single_checkout_session_id={CHECKOUT_SESSION_ID}&track=${trackSlug}#single-release`,
      cancel_url: `${origin}/?checkout=cancelled&track=${trackSlug}#single-release`,
      "metadata[track_slug]": trackSlug,
    });
    if (email) {
      params.append("customer_email", email);
    }

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!stripeRes.ok) {
      console.error("[single-checkout] Stripe error:", await stripeRes.text());
      return res.status(500).json({ error: "Failed to create checkout session" });
    }

    const session = await stripeRes.json();
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("[single-checkout] Error:", error.message);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
