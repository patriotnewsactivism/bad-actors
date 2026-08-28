# Bad Actors

Official web experience for **Bad Actors** by Don Matthews: music playback, evidence/story pages, subscriber/download flows, and release promotion.

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Node HTTP server for Cloud Run (`server.mjs`), including Vercel-handler compatibility for the existing API modules
- Docker image built through Google Cloud Build

## Local development

```bash
npm ci
npm run dev
```

Production-quality checks:

```bash
npm run lint
npm run build
```

The independent `.github/workflows/ci.yml` workflow runs those checks for pull requests and pushes.

## Production deployment

The repository is prepared for deployment to **Google Cloud Run** through `.github/workflows/deploy.yml`.

The deployment workflow is deliberately fail-closed:

- code must pass lint/build before a release;
- deployment runs only when repository variable `GCP_DEPLOY_ENABLED` is exactly `true`;
- Google Workload Identity Federation is preferred;
- a legacy `GCP_SA_KEY` JSON secret is supported only as a migration fallback;
- the configured Cloud Run service must already exist;
- the workflow reads that existing service before building;
- images are tagged with the full Git commit SHA rather than `latest`;
- release uses `gcloud run services update`, so it cannot silently create a substitute service;
- `/health` must report the exact deployed commit SHA before the workflow succeeds.

Required non-secret deployment settings should normally be repository/environment variables:

```text
GCP_DEPLOY_ENABLED=true
GCP_PROJECT_ID=<existing Google Cloud project>
GCP_CLOUD_RUN_REGION=<existing service region>
GCP_CLOUD_RUN_SERVICE=<existing service name>
GCP_WORKLOAD_IDENTITY_PROVIDER=<GitHub WIF provider resource>
GCP_SERVICE_ACCOUNT=<deploy service-account email>
```

If Workload Identity is not yet configured, `GCP_SA_KEY` may be used temporarily as a GitHub secret. Do not commit credential JSON to this repository.

## Release verification

The server exposes `GET /health` and returns the release provenance:

```json
{
  "status": "ok",
  "build": { "sha": "<git sha>" },
  "service": "bad-actors"
}
```

A green Cloud Build or Ready Cloud Run revision is not enough by itself; the deployment workflow verifies that the running service reports the exact release SHA.

## Domains

Domain/DNS ownership is external to this repository. A domain pointing at an older or paused host does not prove that the current Cloud Run release failed. Verify the configured Cloud Run custom-domain mapping and DNS independently when moving production traffic.

## Editing with Lovable

The original Lovable project remains useful as an editing surface. Changes made there may commit back to this repository, but **Lovable publishing is not the canonical production release path once Cloud Run is enabled**. GitHub `main`, CI, and the Cloud Run deploy workflow are the release source of truth.
