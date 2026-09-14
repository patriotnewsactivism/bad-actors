// Reports integration readiness only; secret values are never returned.
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const integrations = {
    resend: Boolean(process.env.RESEND_API_KEY),
    subscriberDatabase: Boolean(
      process.env.SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)
    ),
    singlesDatabase: Boolean(
      process.env.SINGLES_SUPABASE_URL &&
      process.env.SINGLES_SUPABASE_SERVICE_ROLE_KEY
    ),
    stripe: Boolean(
      process.env.STRIPE_SECRET_KEY &&
      process.env.SINGLE_DOWNLOAD_PRICE_ID
    ),
    resendAudience: Boolean(process.env.RESEND_AUDIENCE_API_KEY),
    buildMyBotForwarding: Boolean(process.env.PORTFOLIO_INTAKE_SECRET),
  };

  const required = ['resend', 'subscriberDatabase', 'singlesDatabase'];
  const ready = required.every((name) => integrations[name]);

  return res.status(ready ? 200 : 503).json({
    status: ready ? 'ok' : 'degraded',
    platform: 'vercel',
    integrations,
  });
}
