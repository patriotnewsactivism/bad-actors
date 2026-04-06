export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(200).json({ count: 0 });
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/bad_actors_subscribers?select=count`,
      {
        method: 'HEAD',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'count=exact',
        },
      }
    );

    const range = response.headers.get('content-range');
    const count = range ? parseInt(range.split('/')[1], 10) || 0 : 0;

    return res.status(200).json({ count });
  } catch (error) {
    console.error('[API] Failed to get subscriber count:', error.message);
    return res.status(200).json({ count: 0 });
  }
}
