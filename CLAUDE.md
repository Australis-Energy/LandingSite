# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm i              # install dependencies
npm run dev        # start Vite dev server on http://localhost:8080
npm run build      # production build to dist/
npm run build:dev  # build with development mode (keeps componentTagger, lighter minification)
npm run lint       # ESLint over the repo
npm run preview    # serve the built dist/ locally
```

There is **no test runner configured** — no Vitest/Jest, no `test` script. Manual verification routes exist instead: `/debug` (`DebugPage`, env/config inspection) and `/test/expert-panel` (`ExpertPanelTest`). "Testing" in `DEPLOYMENT.md` means a clean `npm run build` plus manual smoke-testing in the browser.

## Project context

This is the **Australis Energy** marketing landing site + early-access app, generated and maintained via [Lovable](https://lovable.dev). Two important consequences:

- Edits made in the Lovable web editor are auto-committed to this repo, and pushes here are reflected back in Lovable. Expect Lovable-style commits in the history.
- `lovable-tagger` runs as a Vite plugin **only in development mode** (tags components for the Lovable editor); it is stripped from production builds.
- `src/integrations/supabase/client.ts` and `src/integrations/supabase/types.ts` are marked auto-generated — prefer regenerating over hand-editing `types.ts`.

## Architecture

### Two app zones in one SPA
Routing lives in [src/App.tsx](src/App.tsx) (React Router). The app splits into:
- **Public marketing site** — the `/` route renders [src/pages/Index.tsx](src/pages/Index.tsx), which composes section components (`HeroSection`, `ProblemSection`, `BenefitsSection`, `FeaturesSection`, `ExpertPanel`, `CtaSection`, `FaqSection`, etc.). Plus standalone pages: `/pricing`, `/privacy-policy`, `/terms-of-service`, `/cookie-policy`.
- **Authenticated app** — `/dashboard` and `/project/:id`, wrapped in `ProtectedRoute`. `ProtectedRoute` (defined in `App.tsx`) gates on `supabase.auth` state and redirects to `/auth` when unauthenticated. The same auth-guard pattern is duplicated inside [src/hooks/useDashboard.ts](src/hooks/useDashboard.ts).

### Configuration is centralized and build-time
All runtime configuration flows through [src/lib/config.ts](src/lib/config.ts), which reads `VITE_`-prefixed env vars via `import.meta.env` and exposes a single typed `config` object plus header helpers (`getApiHeaders`, `getFunctionHeaders`). **These vars are injected at build time, not runtime, and are public in the shipped bundle** — never put real secrets here. Only `VITE_COMMUNICATIONS_FUNCTION_URL` / `VITE_COMMUNICATIONS_FUNCTION_KEY` are treated as required (the rest only warn if missing). See [CONFIGURATION.md](CONFIGURATION.md) for the full variable list and [DEPLOYMENT.md](DEPLOYMENT.md) for deployment (Vercel via `vercel.json`, GitHub Pages, Netlify).

### Service layer — three singleton backend clients
Each wraps a different backend and is exported as a singleton from `src/services/`:
- [apiService](src/services/apiService.ts) → the **.NET Web API** (`config.api.baseUrl`). CRUD for projects, reports, and file uploads. Returns a uniform `ApiResponse<T>` envelope.
- [geoServicesClient](src/services/geoServices.ts) → **Python Azure Functions** for geospatial "developability" calculations. Supports long-running jobs via `startCalculation` + `pollForCompletion`/`getCalculationStatus`.
- [communicationsService](src/services/communicationsService.ts) → **Azure Communications Function** for all outbound email (contact, demo request, waiting list, expert panel, CTA). Note the dual API: standard `send*` methods await the function, while `send*Optimistic` variants return success immediately and process in the background with exponential-backoff retry. The `useEmailSending` hook defaults to optimistic. The function key is passed as a `?code=` query param, not a header.

### Data layer — Supabase + TanStack Query
[Supabase](src/integrations/supabase/client.ts) provides auth and a Postgres DB (`projects`, `project_reports` tables). Most data fetching is done by calling `supabase.from(...)` directly inside hooks/pages (e.g. `useDashboard`, `ProjectDetail`) rather than through a repository abstraction. `QueryClientProvider` (TanStack Query) wraps the app in `App.tsx`, but is lightly used so far. The supabase client has **hardcoded fallback URL + anon key** for when env vars are absent.

### Project / developability feature
`/project/:id` → [ProjectDetail](src/pages/ProjectDetail.tsx) → `ConsolidatedProjectView`, which drives the geospatial analysis UI under [src/components/project/](src/components/project/) — interactive maps (Azure Maps `azure-maps-control`, Mapbox GL, Turf.js geometry), constraint analysis, developability scoring, and PDF report generation.

### UI conventions
- **shadcn/ui** components live in [src/components/ui/](src/components/ui/) (config in `components.json`, base color `slate`). Build new primitives by composing Radix + `class-variance-authority`, matching the existing files there.
- **Tailwind** with a custom `australis-*` brand color palette and `Poppins` font defined in [tailwind.config.ts](tailwind.config.ts). Use the `australis-navy`, `australis-aqua`, `australis-blue`, etc. tokens rather than raw hex.
- Toasts: both `@/components/ui/toaster` (Radix) and `sonner` are mounted; `@/hooks/use-toast` is the primary toast API.
- Path alias: `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig`).

### TypeScript strictness is intentionally loose
`tsconfig.json` disables `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`, and `noUnusedParameters`; ESLint turns `@typescript-eslint/no-unused-vars` off. Much app state is typed as `any` (e.g. `user`, `project`). Don't assume strict-null safety holds; match the surrounding loose style rather than introducing strict typing piecemeal.
