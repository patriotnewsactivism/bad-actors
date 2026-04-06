export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(200).json({ count: 0 });
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/bad_actors_subscribers?select=id`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'count=exact',
          'Range-Unit': 'items',
          'Range': '0-0',
        },
      }
    );

    const countHeader = response.headers.get('content-range');
    const count = countHeader ? parseInt(countHeader.split('/')[1]) || 0 : 0;
    return res.status(200).json({ count });
  } catch {
    return res.status(200).json({ count: 0 });
  }
}
