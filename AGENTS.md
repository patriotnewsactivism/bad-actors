# Repository Guidelines

## Canonical production contract

This repository's intended production release path is **Google Cloud Run** through `.github/workflows/deploy.yml` once `GCP_DEPLOY_ENABLED=true` is deliberately configured.

Do not silently replace that path with Lovable, Vercel, Netlify, Railway, or another host because an old deployment or domain still exists. Old hosting can remain during migration, but it is not authority for new release automation.

Production deployment is existing-service-only by default:

- never guess the Google Cloud project, region, or service name;
- require the exact configured existing service to be readable before building or updating it;
- prefer GitHub Workload Identity Federation over long-lived service-account keys;
- never commit credential JSON, API keys, tokens, or private keys;
- use immutable commit-SHA image tags;
- update the existing Cloud Run service rather than creating a substitute;
- verify `/health.build.sha` equals the release commit after deployment;
- do not claim a release is live based only on a successful build or Ready revision.

If production has not yet been bootstrapped on Cloud Run, treat service creation/domain migration as a separate explicit infrastructure change rather than weakening the normal deployment workflow.

## Project structure

Source lives in `src/`: `pages/` hosts router targets and should mainly orchestrate feature modules. Reusable UI and shadcn primitives stay in `components/` (`components/ui` mirrors the generated library), cross-cutting hooks in `hooks/`, and utilities under `lib/`. Static assets and HTML shells belong in `public/`; `dist/` is generated build output. Use the `@/` alias from `tsconfig.json` for source imports.

`server.mjs` is the production Node entry point used by the Docker image. It also adapts the existing Vercel-style API handlers to Node's HTTP server. Preserve that compatibility when changing routing. Keep `/health` lightweight, unauthenticated, non-secret, and stable enough for deployment verification.

## Build, test, and development commands

- `npm ci` — install the locked dependency set.
- `npm run dev` — launch Vite locally.
- `npm run build` — create the optimized production bundle.
- `npm run build:dev` — development-mode bundle.
- `npm run preview` — serve the Vite build locally.
- `npm run lint` — run ESLint.

Before merging runtime or deployment work, `npm run lint` and `npm run build` must pass. `.github/workflows/ci.yml` is the independent quality gate; do not make basic validation depend on production deployment credentials.

## Coding style

Use TypeScript-first React function components. Follow existing two-space indentation, keep exports typed, prefer `const`, use `PascalCase` for components/pages, `use*` for hooks, and `camelCase` for utilities. Tailwind classes stay inline unless a feature genuinely needs co-located styles.

## Tests

Automated component coverage is still limited. New high-impact logic should add deterministic tests with Vitest/React Testing Library when practical. Network behavior should be mocked at shared boundaries. Do not use production deployment as a substitute for tests.

## Git and change control

Normal work should use a feature branch and pull request. Keep commits scoped and present-tense. PRs should state the problem, solution, validation performed, configuration changes, and any deployment/domain implications.

Deployment changes deserve extra scrutiny because a syntactically valid workflow can still target the wrong project or create unintended infrastructure. Preserve fail-closed preflight checks.

## Secrets and configuration

Client-side values accessed through `import.meta.env` are bundled into browser code; never put server secrets there. Server/runtime secrets belong in the deployment platform or secret manager. GitHub Actions should reference secret/variable names only and must not print values.

Current deployment settings are documented in `README.md`. Workload Identity is preferred. `GCP_SA_KEY` is legacy fallback only and should be removed after WIF is working.

## Domain migration

`music.donmatthews.live` and `badactors.online` may temporarily point at different hosting platforms during migration. DNS/custom-domain changes are infrastructure operations outside application source. Verify the actual live hostname after every cutover; never infer it from repository metadata or old provider files.
