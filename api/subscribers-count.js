import { neon } from '@neondatabase/serverless';

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

  if (!process.env.DATABASE_URL) {
    return res.status(200).json({ count: 0 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT COUNT(*) as count FROM subscribers`;
    return res.status(200).json({ count: parseInt(result[0].count, 10) || 0 });
  } catch (error) {
    console.error('[API] Failed to get subscriber count:', error.message);
    return res.status(200).json({ count: 0 });
  }
}
