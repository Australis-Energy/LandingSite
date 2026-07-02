# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm i              # install dependencies
npm run dev        # start Vite dev server on http://localhost:8080
npm run build      # production build to dist/ (strips console.*/debugger)
npm run build:dev  # build with --mode development (keeps console/debugger, lighter minification)
npm run lint       # ESLint over the repo
npm run preview    # serve the built dist/ locally
```

There is **no test runner configured** — no Vitest/Jest, no `test` script. "Testing" (see `DEPLOYMENT.md`) means a clean `npm run build` plus manual smoke-testing in the browser. In development, [src/lib/debug-config.ts](src/lib/debug-config.ts) auto-logs the resolved config to the console (guarded by `import.meta.env.DEV`).

## Project context

This is the **Australis Energy** marketing landing site + early-access app: a Vite + React + TypeScript SPA built on the `vite_react_shadcn_ts` template.

- The repo was originally scaffolded with [Lovable](https://lovable.dev), but is **no longer maintained through Lovable** — edit it directly. The `lovable-tagger` Vite plugin has been removed, and design work is now done in-repo (the current design was refactored via Fable 5). The only Lovable remnant is the `docs/lovable-uploads/` image asset folder.
- `src/integrations/supabase/client.ts` and `src/integrations/supabase/types.ts` are marked auto-generated — prefer regenerating `types.ts` over hand-editing it.

## Architecture

### Two app zones in one SPA
Routing lives in [src/App.tsx](src/App.tsx) (React Router). Non-index routes are **lazy-loaded** (`React.lazy` + `Suspense`) so the maps/Turf/PDF-generation deps stay out of the marketing-page bundle. The app splits into:
- **Public marketing site** — the `/` route renders [src/pages/Index.tsx](src/pages/Index.tsx), which composes section components in order: `Header`, `HeroSection`, `ProblemSection`, `BenefitsSection`, `FeaturesSection`, `SocialProofSection`, `DemoSection`, `ExpertPanel`, `CtaSection`, `FaqSection`, `Footer`. Plus standalone pages: `/pricing`, `/privacy-policy`, `/terms-of-service`, `/cookie-policy`.
- **Authenticated app** — `/dashboard` and `/project/:id`, wrapped in `ProtectedRoute`. `ProtectedRoute` (defined in `App.tsx`) gates on `supabase.auth` state and redirects to `/auth` when unauthenticated. The same auth-guard pattern is duplicated inside [src/hooks/useDashboard.ts](src/hooks/useDashboard.ts).

### Configuration is centralized and build-time
All runtime configuration flows through [src/lib/config.ts](src/lib/config.ts), which reads `VITE_`-prefixed env vars via `import.meta.env` and exposes a single typed `config` object plus header helpers (`getApiHeaders`, `getFunctionHeaders`). **These vars are injected at build time, not runtime, and are public in the shipped bundle** — never put real secrets here. Only `VITE_COMMUNICATIONS_FUNCTION_URL` / `VITE_COMMUNICATIONS_FUNCTION_KEY` are treated as required (the rest only warn if missing). See [CONFIGURATION.md](CONFIGURATION.md) and [.env.example](.env.example) for the full variable list, and [DEPLOYMENT.md](DEPLOYMENT.md) for deployment (Vercel via `vercel.json`, GitHub Pages via `docs/`, Netlify via `netlify.toml`).

### Service layer — three singleton backend clients
Each wraps a different backend and is exported as a singleton from `src/services/`:
- [apiService](src/services/apiService.ts) → the **.NET Web API** (`config.api.baseUrl`). CRUD for projects, reports, and file uploads. Returns a uniform `ApiResponse<T>` envelope.
- [geoServicesClient](src/services/geoServices.ts) → **Python Azure Functions** for geospatial "developability" calculations. Supports long-running jobs via `startCalculation` + `pollForCompletion`/`getCalculationStatus`.
- [communicationsService](src/services/communicationsService.ts) → **Azure Communications Function** for all outbound email (contact, demo request, waiting list, expert panel, CTA). Note the dual API: standard `send*` methods await the function, while `send*Optimistic` variants return success immediately and process in the background with exponential-backoff retry. The `useEmailSending` hook defaults to optimistic. The function key is passed as a `?code=` query param, not a header.

### Data layer — Supabase + TanStack Query
[Supabase](src/integrations/supabase/client.ts) provides auth and a Postgres DB (`projects`, `project_reports` tables). Most data fetching is done by calling `supabase.from(...)` directly inside hooks/pages (e.g. `useDashboard`, `ProjectDetail`) rather than through a repository abstraction. `QueryClientProvider` (TanStack Query) wraps the app in `App.tsx`, but is lightly used so far. The supabase client has **hardcoded fallback URL + anon key** for when env vars are absent.

### Project / developability feature
`/project/:id` → [ProjectDetail](src/pages/ProjectDetail.tsx) → `ConsolidatedProjectView` (in [src/components/project/](src/components/project/)), which drives the geospatial analysis UI — an interactive **Mapbox GL** map ([FunctionalMap.tsx](src/components/project/FunctionalMap.tsx)), Turf.js geometry ([src/utils/geometryUtils.ts](src/utils/geometryUtils.ts)), constraint analysis (`ConstraintCategories.ts`, `ConstraintChatInterface.tsx`), developability scoring (`DevelopabilityScore.tsx`), file upload/parsing, and PDF report generation (`PDFReportGenerator.tsx`). Note: `config.azure.maps.key` exists but there is no Azure Maps control library installed — maps run on Mapbox GL.

### UI conventions
- **shadcn/ui** components live in [src/components/ui/](src/components/ui/) (~47 primitives; config in `components.json`, base color `slate`). Build new primitives by composing Radix + `class-variance-authority`, matching the existing files there.
- **Tailwind** with a custom `australis` brand color palette and `Poppins` font defined in [tailwind.config.ts](tailwind.config.ts). Use tokens like `australis-navy`, `australis-aqua`, `australis-indigo`, `australis-darkBlue` rather than raw hex. Custom keyframes/animations (`fade-in-up`, `float`, `shimmer`, `typewriter`, etc.) are defined there too.
- Toasts: both `@/components/ui/toaster` (Radix) and `sonner` are mounted; `@/hooks/use-toast` is the primary toast API.
- Path alias: `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig`).

### TypeScript strictness is intentionally loose
`tsconfig.json` disables `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`, and `noUnusedParameters`; ESLint turns `@typescript-eslint/no-unused-vars` off. Much app state is typed as `any` (e.g. `user`, `project`). Don't assume strict-null safety holds; match the surrounding loose style rather than introducing strict typing piecemeal.
