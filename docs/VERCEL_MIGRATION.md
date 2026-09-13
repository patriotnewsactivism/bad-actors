# Bad Actors — Vercel Production Migration

## Canonical target

Production hosting for `badactors.online` should be Vercel. Google Cloud Run is a temporary legacy origin only until the Vercel deployment passes validation and DNS is cut over.

Repository: `patriotnewsactivism/bad-actors`

The repository is already Vercel-compatible:

- Vite frontend builds with `npm run build`.
- `vercel.json` builds and prerenders into `dist`.
- Files under `api/` are Vercel serverless functions.
- `/api/subscribe` performs subscriber capture and free-album email delivery.

## Required Vercel production environment variables

Set these in the Vercel project for Production before moving the domain:

- `RESEND_API_KEY` — required. Sends the free Bad Actors Volume 1 email.
- `SUPABASE_URL` — subscriber database endpoint.
- `SUPABASE_SERVICE_ROLE_KEY` — preferred server-side database credential.

Optional:

- `SUPABASE_ANON_KEY` — fallback only when intentionally configured with suitable RLS.
- `PORTFOLIO_INTAKE_SECRET` — forwards subscriber leads to BuildMyBot.
- `BUILDMYBOT_INTAKE_URL` — defaults to `https://www.buildmybot.app/api/leads/capture` when omitted.

Do not expose `RESEND_API_KEY` or the Supabase service-role key with a `VITE_` prefix.

## Cutover acceptance tests

Do not switch `badactors.online` until the Vercel production URL passes all of these checks:

1. Home page loads and all 17 tracks/stories render.
2. Static album ZIP is reachable.
3. `POST /api/subscribe` returns HTTP 200.
4. The JSON response contains `emailSent: true`.
5. Resend shows the test message as accepted/delivered.
6. The test inbox receives `Your free download: Bad Actors - Volume 1`.
7. A repeat signup with the same address also resends the email.
8. Track, tracks and about deep links work directly without a client-side 404.
9. Public media/audio assets load successfully.

After those pass, attach `badactors.online` and `www.badactors.online` to the Vercel project and update DNS to Vercel. Keep the old origin available briefly for rollback, then remove the Google Cloud Run mapping/service after DNS has fully propagated and production has remained healthy.

## Retired Google automation

The former Cloud Run deployment and Cloud Run domain-cutover GitHub workflows have been converted to no-op retirement notices. They must not be restored as the canonical production path.
