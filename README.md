# BaytFolio Dashboard

Vite + React + strict TypeScript + React Router foundation with an explicitly approved **frontend-only Auth demo for Vendor and Admin**. The customer website remains a separate Next.js application. Synced files under the parent `sources/` remain read-only and unchanged.

## Run locally

Use Node 24 LTS (`.nvmrc`) and npm 11.

```sh
npm ci
npm run dev
```

A local ignored `.env.local` was prepared for this demonstration with `VITE_API_URL=http://127.0.0.1:8000/api/v1`. That address is an unused fixture; the auth demo makes no backend requests and requires no Laravel server. After cloning elsewhere, copy `.env.example` to `.env.local` and supply that demo fixture (or the approved actual API URL for later integration).

Vite validates `VITE_API_URL` with Zod at startup/build. It must be an HTTP(S) origin ending in `/api/v1`, without credentials, query, or hash. Public `VITE_*` variables must never contain secrets. Actual API integration requires approved Laravel contracts and its real deployment URL.

Open `/login`. Example Vendor: `owner@vendor.example`; example Admin: `super@admin.example`; password: `DemoPass123!`. Expand **حسابات التجربة** to see all roles. Full details, examples, and proposed settings: [Auth module README](src/modules/auth/README.md).

## Structure

```text
src/
├── app/
│   ├── pages/not-found-page.tsx
│   ├── providers/app-providers.tsx
│   ├── router.tsx
│   ├── styles.css
│   └── foundation.test.tsx
├── modules/auth/
│   ├── api/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── pages/
│   ├── providers/
│   ├── schemas/
│   ├── types/
│   ├── utils/
│   ├── index.ts
│   └── README.md
├── shared/
│   ├── api/
│   ├── components/ui/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── types/
│   └── utils/
├── assets/
├── test/setup.ts
├── vite-env.d.ts
└── main.tsx
e2e/smoke.spec.ts
```

Feature logic stays in its module. `shared` contains only cross-feature infrastructure. Auth pages load by route. `/` is a minimal session demonstration, `/vendor` and `/admin` are scope-protected session examples; none is a product dashboard layout.

## Installed stack

- React, React DOM, TypeScript, Vite, React Vite plugin, React Router DOM.
- Tailwind CSS v4 + Vite plugin, shadcn/Radix prerequisites, Lucide React, CVA, clsx, tailwind-merge, tw-animate-css.
- Axios, TanStack React Query + development-only Devtools, Zustand.
- React Hook Form, Zod, `@hookform/resolvers`, Motion, Sonner.
- ESLint + TypeScript/React plugins, Prettier, Husky, lint-staged.
- Vitest, React Testing Library, jest-dom, user-event, jsdom, Playwright.

Exact versions are in `package-lock.json`. `components.json` maps future shadcn components into `shared/components/ui`; no generator dependency is needed for runtime/builds. Tailwind uses its Vite plugin and CSS token configuration. Zustand/Motion are available for actual client state/interactions when needed, without demonstration stores or gratuitous animations.

## Configuration

| Area                 | Files                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Dependencies/runtime | `package.json`, `package-lock.json`, `.nvmrc`                                                      |
| TypeScript/aliases   | `tsconfig.base.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`                   |
| Build/unit tests     | `vite.config.ts`, `src/test/setup.ts`                                                              |
| Browser tests        | `playwright.config.ts`, `e2e/smoke.spec.ts`                                                        |
| UI/styles            | `components.json`, `src/app/styles.css`                                                            |
| Environment          | `.env.example`, `src/vite-env.d.ts`, `src/shared/config/env-schema.ts`, `src/shared/config/env.ts` |
| Quality              | `eslint.config.js`, `.prettierrc.json`, `.prettierignore`                                          |
| Git hooks            | `.husky/pre-commit`, `lint-staged.config.js`, `.gitignore`                                         |

Strict mode, exact optional properties, and unchecked indexed access checks apply to application/test/tooling code. `@/*` maps to `src/*` consistently in TypeScript/Vite/Vitest.

The centralized Axios client remains configured with API base URL, JSON Accept header, 15-second timeout, normalized transport errors, and preserved cancellation. Auth does not use it yet; no real API endpoints or token/session integration were assumed. Laravel remains authoritative for business rules, authorization, tenancy, canonical values, and validation.

## Scripts

| Script                     | Purpose                                          |
| -------------------------- | ------------------------------------------------ |
| `dev` / `preview`          | Development / production preview server          |
| `build`                    | Typecheck + production build                     |
| `format` / `format:check`  | Write/check Prettier formatting                  |
| `lint` / `lint:fix`        | ESLint with zero warnings / fix                  |
| `typecheck`                | Application, test, and tooling type checks       |
| `test` / `test:watch`      | Run/watch Vitest                                 |
| `test:e2e` / `test:e2e:ui` | Playwright / interactive browser runner          |
| `check`                    | Format check, lint, typecheck, unit tests, build |
| `prepare`                  | Install Husky hooks                              |

```sh
npm run check
npx playwright install chromium --no-shell
npm run test:e2e
```

Playwright builds fresh production assets, runs Chromium headlessly, and starts a preview on strict port 4173. Its environment uses an isolated loopback fixture; no running unrelated server is reused. Husky runs lint-staged and full typecheck before commits. In CI, hooks can be skipped using `HUSKY=0 npm ci`.

## Deployment and next integration

This application currently demonstrates auth with fictitious in-memory data; it does not provide production authentication. A full refresh resets the demonstration, including its session. Do not use real credentials.

For approved static hosting, deploy `dist/` with SPA fallback to `index.html`; missing static assets must still return 404. Production authentication requires approved API/session/CORS/CSRF/revocation contracts. Browser session strategy and privileged Admin MFA remain open technical decisions. No CI provider or deployment is configured.

The older Technical Specification still names Next.js for dashboards; the explicit approved Vite decision takes precedence. PRD rules were not changed. Development is on `feat/auth-module`; no commit, PR, or deployment was created for this change.

Tooling references: [Tailwind Vite](https://tailwindcss.com/docs/installation/using-vite), [shadcn setup](https://ui.shadcn.com/docs/installation/manual), [Vitest](https://vitest.dev/config/), [React Hook Form resolvers](https://github.com/react-hook-form/resolvers).
