# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`: `pages/` hosts router targets (Index, NotFound) and should only orchestrate feature modules. Reusable UI plus shadcn primitives stay in `components/` (`components/ui` mirrors the generated library), cross-cutting hooks in `hooks/`, and utilities under `lib/`. Static assets and HTML shells belong in `public/`; `dist/` stores build artifacts. Use the `@/` alias from `tsconfig.json` whenever referencing files in `src/` to avoid brittle relative paths.

## Build, Test, and Development Commands
- `npm install` – install dependencies; rerun after touching `components.json`.
- `npm run dev` – launch Vite with hot reload at `localhost:5173`.
- `npm run build` – produce the optimized bundle in `dist/` for Lovable deploys.
- `npm run build:dev` – emit a debuggable bundle that keeps sourcemaps readable.
- `npm run preview` – serve the last build locally to smoke-test production behavior.
- `npm run lint` – execute ESLint across the repo; fix violations before pushing.

## Coding Style & Naming Conventions
Code is TypeScript-first with React function components. Follow the 2-space indentation in `src/App.tsx`, keep exports typed, and prefer `const` declarations for components. Components and pages use `PascalCase`, hooks are prefixed with `use`, and utilities stay `camelCase`. Tailwind classes live inline inside JSX; if you need extra styles, co-locate them with the feature. Run `npm run lint` to apply the ESLint config (TypeScript, React Hooks, Refresh). Format with your editor defaults but never bypass ESLint's findings.

## Testing Guidelines
Automated tests are absent right now; new work should introduce Vitest plus React Testing Library (Vite-native). Place specs beside the unit they cover or under `src/__tests__/`, name them `<Component>.test.tsx`, and describe behaviors (`it("shows empty state on 404")`). Keep tests deterministic, mock network access through the shared QueryClient, and target coverage on shared hooks, data mappers, and high-impact pages.

## Commit & Pull Request Guidelines
Recent commits are short present-tense statements (`Update Index.tsx`, `Fix track list titles 9-16`). Keep that tone but add meaningful scope tags: `[scope]: imperative summary` (for example `ui: add artist radar chart`). Pull requests should include a crisp problem/solution summary, screenshots or GIFs for UI work, linked Lovable or GitHub issues, the list of checks you ran (`npm run lint`, manual flows), and notes on migrations or env vars. Wait for green checks and one review before merging.

## Security & Configuration Tips
Keep secrets in untracked `.env.local` files and access them via `import.meta.env`. Tailwind and shadcn tokens live in `tailwind.config.ts` and `components.json`; regenerate UI via `npx shadcn@latest add <component>` rather than editing generated files under `components/ui`. Strip debugging logs before release builds so the shipped bundle stays small.
