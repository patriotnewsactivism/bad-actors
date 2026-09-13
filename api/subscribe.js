const ZIP_URL = "https://badactors.online/bad-actors-volume-1.zip";
const NOTIFY_EMAIL = "don@donmatthews.live";
const FROM = "Bad Actors <downloads@donmatthews.live>";

async function forwardLeadToBuildMyBot(email, source, name) {
  const secret = process.env.PORTFOLIO_INTAKE_SECRET;
  if (!secret) return;
  try {
    await fetch(
      process.env.BUILDMYBOT_INTAKE_URL || "https://www.buildmybot.app/api/leads/capture",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-portfolio-secret": secret },
        body: JSON.stringify({ portfolio: true, email, name: name || "", source }),
        signal: AbortSignal.timeout(8000),
      }
    );
  } catch (err) {
    console.error("[BuildMyBot forward] error:", err.message);
  }
}

async function sendResend(apiKey, to, subject, html) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
    signal: AbortSignal.timeout(10000),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = body?.message || body?.error || `Resend returned HTTP ${response.status}`;
    throw new Error(message);
  }

  return body;
}

function albumEmailHtml(name) {
  return `<p>Hey${name ? " " + name : ""},</p>
    <p>Thanks for checking out <strong>Bad Actors - Volume 1</strong>. Here's your free download — all 17 tracks, in order, zipped up and ready to go:</p>
    <p><a href="${ZIP_URL}">${ZIP_URL}</a></p>
    <p>Truth. Justice. Accountability.<br/>— Don Matthews</p>`;
}

async function deliverAlbumEmail(resendKey, email, name) {
  if (!resendKey) {
    console.error("[Resend] RESEND_API_KEY is not configured");
    return { sent: false, error: "Email delivery is temporarily unavailable" };
  }

  try {
    const result = await sendResend(
      resendKey,
      email,
      "Your free download: Bad Actors - Volume 1",
      albumEmailHtml(name)
    );
    console.log(`[Resend] album email accepted for ${email}; id=${result?.id || "unknown"}`);
    return { sent: true, id: result?.id || null };
  } catch (error) {
    console.error(`[Resend] album email failed for ${email}:`, error.message);
    return { sent: false, error: error.message };
  }
}

async function notifyOwner(resendKey, email, name, source, duplicate) {
  if (!resendKey) return;
  try {
    await sendResend(
      resendKey,
      NOTIFY_EMAIL,
      duplicate ? "Repeat Bad Actors download request" : "New Bad Actors download signup",
      `<p>${email}${name ? ` (${name})` : ""} ${duplicate ? "requested" : "downloaded"} Bad Actors - Volume 1 from badactors.online (source: ${source || "website"}).</p>`
    );
  } catch (error) {
    // Owner notification must never block the subscriber's download/email response.
    console.error("[Resend] owner notification failed:", error.message);
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, name, source } = req.body || {};
  if (!email) return res.status(400).json({ error: "Email is required" });

  const cleanEmail = String(email).toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) return res.status(400).json({ error: "Invalid email format" });

  const cleanName = typeof name === "string" ? name.trim().slice(0, 120) : "";
  const cleanSource = typeof source === "string" && source.trim() ? source.trim().slice(0, 160) : "website";
  const resendKey = process.env.RESEND_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  let duplicate = false;
  let subscriberSaved = false;
  let databaseWarning = null;

  if (!supabaseUrl || !supabaseKey) {
    databaseWarning = "Subscriber database not configured";
    console.error("[API] Supabase not configured — album delivery will still be attempted");
  } else {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/bad_actors_subscribers`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          email: cleanEmail,
          name: cleanName || null,
          source: cleanSource,
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (response.ok) {
        subscriberSaved = true;
      } else {
        const errText = await response.text();
        if (response.status === 409 || errText.includes("23505") || errText.toLowerCase().includes("duplicate")) {
          duplicate = true;
          subscriberSaved = true;
        } else {
          databaseWarning = "Subscriber signup could not be saved";
          console.error("[API] Supabase error:", errText);
        }
      }
    } catch (error) {
      databaseWarning = "Subscriber signup could not be saved";
      console.error("[API] Subscriber save error:", error.message);
    }
  }

  // Critical: await the delivery provider before ending the HTTP request. Cloud/serverless
  // runtimes are allowed to terminate outstanding work after the response is returned.
  const delivery = await deliverAlbumEmail(resendKey, cleanEmail, cleanName);

  // These are non-critical side effects. Still await them so logs are deterministic.
  await Promise.allSettled([
    notifyOwner(resendKey, cleanEmail, cleanName, cleanSource, duplicate),
    forwardLeadToBuildMyBot(cleanEmail, cleanSource || "badactors.online/subscribe", cleanName),
  ]);

  return res.status(200).json({
    success: true,
    duplicate,
    subscriberSaved,
    downloadUrl: ZIP_URL,
    emailSent: delivery.sent,
    emailError: delivery.sent ? null : delivery.error,
    warning: databaseWarning,
  });
}
