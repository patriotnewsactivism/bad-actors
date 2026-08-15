// Read-only "X of 100 claimed" counter for the single-download promo page.
// No email/claim side effects — just reports current remaining count.

const CAP = 100;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const trackSlug = req.query?.track || "happy-fuck-the-cops-day";
  const supabaseUrl = process.env.SINGLES_SUPABASE_URL;
  const supabaseKey = process.env.SINGLES_SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Database not configured" });
  }

  try {
    const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/get_single_download_remaining`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_track_slug: trackSlug, p_cap: CAP }),
    });
    if (!rpcRes.ok) {
      console.error("[API] count RPC error:", await rpcRes.text());
      return res.status(500).json({ error: "Failed to fetch count" });
    }
    const result = await rpcRes.json();
    return res.status(200).json({ remaining: result.remaining, cap: CAP });
  } catch (error) {
    console.error("[API] Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch count" });
  }
}
