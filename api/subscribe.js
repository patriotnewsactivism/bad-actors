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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, name, source } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });

  const supabaseUrl = process.env.SUPABASE_URL;
  // Use service_role for the insert -- RLS blocks anon inserts on this table (confirmed 42501),
  // and this is a trusted server-side route validating input itself.
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[API] Supabase not configured');
    return res.status(500).json({ error: 'Database not configured' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const resendKey = process.env.RESEND_API_KEY;

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/bad_actors_subscribers`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        email: cleanEmail,
        name: name || null,
        source: source || 'website',
      }),
    });

    if (response.ok) {
      if (resendKey) {
        void sendResend(
          resendKey,
          cleanEmail,
          "Your free download: Bad Actors - Volume 1",
          `<p>Hey${name ? " " + name : ""},</p>
           <p>Thanks for checking out <strong>Bad Actors - Volume 1</strong>. Here's your free download — all 17 tracks, in order, zipped up and ready to go:</p>
           <p><a href="${ZIP_URL}">${ZIP_URL}</a></p>
           <p>Truth. Justice. Accountability.<br/>— Don Matthews</p>`
        );
        void sendResend(
          resendKey,
          NOTIFY_EMAIL,
          "New Bad Actors download signup",
          `<p>${cleanEmail}${name ? ` (${name})` : ""} just downloaded Bad Actors - Volume 1 from badactors.online (source: ${source || 'website'}).</p>`
        );
      }
      void forwardLeadToBuildMyBot(cleanEmail, source || "badactors.online/subscribe", name);
      return res.status(200).json({ success: true, duplicate: false, downloadUrl: ZIP_URL });
    }

    const errText = await response.text();
    if (response.status === 409 || errText.includes('23505') || errText.includes('duplicate')) {
      return res.status(200).json({ success: true, duplicate: true, downloadUrl: ZIP_URL });
    }

    console.error('[API] Supabase error:', errText);
    return res.status(500).json({ error: 'Failed to save subscriber' });
  } catch (error) {
    console.error('[API] Error:', error.message);
    return res.status(500).json({ error: 'Failed to save subscriber' });
  }
}
