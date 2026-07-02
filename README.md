# Australis Energy — Landing Site & Early-Access App

Marketing landing site plus early-access web app for **Australis Energy**. Public visitors land on the marketing site; authenticated users get a dashboard and a geospatial "developability" analysis tool for renewable-energy sites.

Built as a single-page app with **Vite + React + TypeScript**, **Tailwind + shadcn/ui**, **Supabase** (auth + Postgres), and **TanStack Query**. The developability feature uses **Mapbox GL** and **Turf.js**.

## Quick start

```sh
npm i          # install dependencies
npm run dev    # dev server → http://localhost:8080
```

Copy [.env.example](.env.example) to `.env.local` and fill in values before running against real backends. All config is read through [src/lib/config.ts](src/lib/config.ts); see [CONFIGURATION.md](CONFIGURATION.md) for every variable.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 8080 |
| `npm run build` | Production build to `dist/` (strips `console.*`/`debugger`) |
| `npm run build:dev` | Development-mode build (keeps logs, lighter minification) |
| `npm run lint` | Run ESLint over the repo |
| `npm run preview` | Serve the built `dist/` locally |

There is no automated test runner — verification is a clean `npm run build` plus manual browser smoke-testing.

## Structure

```
src/
  pages/         Route components (Index, Auth, Dashboard, ProjectDetail, Pricing, legal pages)
  components/    Marketing sections + feature UI
    ui/          shadcn/ui primitives
    project/     Developability map, constraints, scoring, PDF reports
    dashboard/   Dashboard subcomponents
  services/      Singleton backend clients (.NET API, Azure geo functions, comms function)
  hooks/         useDashboard, useEmailSending, useRecaptcha, ...
  integrations/  Supabase client + generated types
  lib/           config.ts, debug-config.ts, utils.ts
  utils/         geometryUtils.ts (Turf helpers)
```

## Backends

- **Supabase** — auth and Postgres (`projects`, `project_reports`).
- **.NET Web API** — project/report CRUD and file uploads ([apiService](src/services/apiService.ts)).
- **Python Azure Functions** — geospatial developability calculations ([geoServices](src/services/geoServices.ts)).
- **Azure Communications Function** — all outbound email ([communicationsService](src/services/communicationsService.ts)).

## Deployment

Supports Vercel (`vercel.json`), GitHub Pages (`docs/`), and Netlify (`netlify.toml`). See [DEPLOYMENT.md](DEPLOYMENT.md).

## More docs

- [CLAUDE.md](CLAUDE.md) — architecture guide for AI/dev onboarding
- [CONFIGURATION.md](CONFIGURATION.md) — environment variables
- [DEPLOYMENT.md](DEPLOYMENT.md) — build & hosting
