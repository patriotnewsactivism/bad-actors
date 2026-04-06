import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, source } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!process.env.DATABASE_URL) {
    console.error('[API] DATABASE_URL not configured');
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO subscribers (email, name, source)
      VALUES (${email}, ${name || null}, ${source || 'website'})
      ON CONFLICT (email)
      DO UPDATE SET
        name = COALESCE(EXCLUDED.name, subscribers.name),
        source = EXCLUDED.source
    `;

    return res.status(200).json({ success: true, duplicate: false });
  } catch (error) {
    console.error('[API] Failed to save subscriber:', error.message);
    return res.status(500).json({ error: 'Failed to save subscriber' });
  }
}
