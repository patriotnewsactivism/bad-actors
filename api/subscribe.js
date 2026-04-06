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
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[API] Supabase not configured');
    return res.status(500).json({ error: 'Database not configured' });
  }

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
        email: email.toLowerCase().trim(),
        name: name || null,
        source: source || 'website',
      }),
    });

    if (response.ok) return res.status(200).json({ success: true, duplicate: false });

    const errText = await response.text();
    if (response.status === 409 || errText.includes('23505') || errText.includes('duplicate')) {
      return res.status(200).json({ success: true, duplicate: true });
    }

    console.error('[API] Supabase error:', errText);
    return res.status(500).json({ error: 'Failed to save subscriber' });
  } catch (error) {
    console.error('[API] Error:', error.message);
    return res.status(500).json({ error: 'Failed to save subscriber' });
  }
}
