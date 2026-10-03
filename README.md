# BaytFolio Dashboard Foundation

Setup only: Vite + React + TypeScript + React Router. The customer website uses Next.js separately; all dashboards use Vite. This foundation intentionally leaves the dashboard audience unspecified until product implementation is requested.

## Getting started

Use Node 24 LTS (`.nvmrc`) and npm 11. Dependency versions are recorded in `package-lock.json`.

```sh
npm ci
cp .env.example .env.local
# Edit .env.local: set VITE_API_URL to the actual Laravel API origin ending in /api/v1.
npm run dev
```

`VITE_API_URL` is required for development, preview, and production builds. Zod checks HTTP(S), the `/api/v1` path, and absence of credentials, query strings, and fragments. A trailing slash is normalized. Missing/invalid settings fail immediately, including at build time. Production deployments must supply their own HTTPS API URL before building; Vite embeds public environment values in the output. Never put secrets in `VITE_*`.

The example file deliberately has no guessed backend address. Unit/E2E tests supply a loopback URL as an isolated fixture and make no backend calls. No local backend is required for smoke tests.

## Structure

```text
src/
├── app/
│   ├── pages/                 # Foundation placeholder + 404 only
│   ├── providers/             # Query provider, dev-only Devtools, Sonner
│   ├── router.tsx
│   ├── styles.css             # Tailwind v4 imports + neutral shared tokens
│   └── foundation.test.tsx
├── modules/                   # Empty; future feature-owned APIs, hooks, schemas, types
├── shared/
│   ├── api/                   # Axios client + generic transport error normalization
│   ├── components/ui/         # Empty destination for future shadcn components
│   ├── config/                # Zod environment validation + QueryClient factory
│   ├── constants/
│   ├── hooks/
│   ├── types/
│   └── utils/                 # cn() for shadcn class composition
├── assets/
├── test/setup.ts              # jest-dom matchers + RTL cleanup
├── vite-env.d.ts
└── main.tsx
e2e/smoke.spec.ts
```

Empty folders have `.gitkeep` files. Feature-specific code belongs in its module; only reusable cross-feature code belongs in `shared`. Do not create product modules until their work is authorized.

## Installed packages

- Core: React, React DOM, TypeScript, Vite, React Vite plugin, React Router DOM.
- UI: Tailwind CSS, `@tailwindcss/vite`, shadcn/ui prerequisites, Radix Slot/Direction, Lucide React, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`.
- Data: Axios, TanStack React Query and Devtools; Zustand for genuine client-only shared state when needed.
- Forms: React Hook Form, Zod, `@hookform/resolvers`.
- Interaction: Motion, Sonner.
- Quality: ESLint, TypeScript ESLint, React Hooks/Refresh plugins, globals, Prettier, `eslint-config-prettier`, Husky, lint-staged.
- Testing: Vitest, React Testing Library, jest-dom, user-event, jsdom, Playwright.

shadcn/ui is copied component source, not a runtime component package. `components.json` configures the Radix-based new-york style, Tailwind v4 CSS variables, Lucide icons, and shared aliases. When a component is later approved, invoke its generator with `npx shadcn@latest add <component>` after reviewing the selected release. The generator is intentionally not a pinned project dependency: it is unnecessary for foundation runtime/builds, and the current release adds seven high-severity transitive development dependency findings. No component library demo or product UI has been generated. Radix Direction is available for future approved Arabic UI; no locale flow is invented.

Zustand, form libraries, Motion, and Lucide are installed without demonstration stores/forms/animations. Query Devtools are lazy-loaded only in development and removed from production output. Sonner is mounted once at the application root.

## Infrastructure boundaries

- Browser routes: `/` and wildcard 404 only. No login, layout, sidebar/header, protected routes, permissions, or product features.
- `apiClient` uses the validated API base URL, JSON Accept header, a 15-second transport timeout, and a response interceptor that normalizes transport errors. It preserves Axios cancellation. Feature queries should forward TanStack Query's `AbortSignal` to Axios.
- Error normalization exposes only message/status/code; no backend payload, validation envelope, endpoint, token flow, refresh mechanism, cookie policy, or auth contract is assumed. Auth/session interceptors wait for Laravel's defined contract.
- Laravel REST `/api/v1` remains the business source of truth. Authorization, tenancy, workflow transitions, validation, and canonical values belong to the backend.
- React Query owns server state. Query/mutation retries are disabled globally until each operation establishes retry safety. No requests are made by the placeholder.
- TypeScript strict mode, unchecked index access checks, and exact optional property types are enabled for application/config/test code. The shared `@/*` path mapping is inherited by all TS projects and matched in Vite; Vitest reads the same Vite config.
- Neutral CSS tokens are setup defaults, not approved BaytFolio branding. Product behavior and all PRD rules remain untouched.

## Configuration files

| Area                 | Files                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Dependencies/scripts | `package.json`, `package-lock.json`, `.nvmrc`                                                      |
| TypeScript/aliases   | `tsconfig.base.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`                   |
| Build/unit tests     | `vite.config.ts`, `src/test/setup.ts`                                                              |
| Browser tests        | `playwright.config.ts`, `e2e/smoke.spec.ts`                                                        |
| Styling/components   | `src/app/styles.css`, `components.json`                                                            |
| Environment          | `.env.example`, `src/vite-env.d.ts`, `src/shared/config/env-schema.ts`, `src/shared/config/env.ts` |
| Formatting/linting   | `eslint.config.js`, `.prettierrc.json`, `.prettierignore`                                          |
| Git hooks            | `.husky/pre-commit`, `lint-staged.config.js`, `.gitignore`                                         |

Tailwind v4 uses its Vite plugin and CSS-based configuration; a legacy Tailwind/PostCSS config is unnecessary.

## Scripts and verification

| Script                     | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `dev`                      | Development server                                   |
| `build`                    | Typecheck + production build                         |
| `preview`                  | Preview production output                            |
| `format` / `format:check`  | Write/check formatting                               |
| `lint` / `lint:fix`        | ESLint with zero warnings / apply fixes              |
| `typecheck`                | Check application, tests, and tooling configurations |
| `test` / `test:watch`      | Run/watch Vitest                                     |
| `test:e2e` / `test:e2e:ui` | Run Playwright / interactive runner                  |
| `check`                    | Formatting, lint, typecheck, unit tests, build       |
| `prepare`                  | Install Husky hooks on dependency install            |

```sh
npm run format
npm run check
npx playwright install chromium --no-shell
npm run test:e2e
```

`check` requires the actual `VITE_API_URL` in `.env.local` or deployment environment for its build step. Playwright uses Chromium’s full browser in headless mode, supplies its own fixture, builds production assets, starts a strict-port preview at `127.0.0.1:4173`, and checks the root, a direct unknown route, return navigation, and absence of page errors. It never reuses an unrelated running server. Vitest includes one provider/router smoke test and focused environment validation tests.

Husky runs lint-staged (ESLint/Prettier on staged files), then the full TypeScript check. A Git repository must exist for hooks; install with `npm ci` after cloning. For CI without hooks, use `HUSKY=0 npm ci`. Use short-lived branches and PR review. No remote or CI provider is configured because that decision is still open.

## Static hosting

Deploy `dist/` to the approved server after checks pass. Configure SPA fallback to `index.html` for browser routes; static assets should still return a real 404 when absent. Use HTTPS and coordinate API CORS/auth settings with the Laravel team once its contract is defined. Changing the API origin requires a new build.

## Source decisions

Read-only references are in the parent `sources/`: Project Brief, English PRD, Technical Specification, and `frontend-tools.md`. The parent `AGENTS.md` and current request explicitly approve Vite for every dashboard. The older Technical Specification still names Next.js for Vendor/Admin and leaves the server-state library TBD; this foundation follows the newer explicit Vite/React Query decisions without changing synced source files. The technical document should be reconciled by its owner.

## Foundation validation — 3 October 2026

| Validation                                | Result                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| `npm run format` / `npm run format:check` | Passed                                                                  |
| `npm run lint`                            | Passed with zero warnings                                               |
| `npm run typecheck`                       | Passed                                                                  |
| `npm run test`                            | Passed: 10 tests (one routing/provider smoke + nine environment checks) |
| `npm run build`                           | Passed with an isolated `/api/v1` loopback fixture                      |
| `npm run test:e2e`                        | Passed: one Chromium smoke against a fresh production build             |
| Missing/invalid API URL build checks      | Both rejected with the expected configuration error                     |
| Husky pre-commit                          | Passed lint-staged and typecheck using an isolated Git index            |
| `npm audit` and `npm audit --omit=dev`    | Zero reported vulnerabilities                                           |
| Production Query Devtools check           | Devtools absent from generated output                                   |

No setup failures remain. Before actual API integration, configure the real Laravel URL and obtain its API/auth contracts. Source architecture wording still needs reconciliation by the document owner. The repository is initialized on `feat/dashboard-foundation`; no commit, remote, PR, or deployment has been created. Synced source files were left unchanged.

Tooling references: [Tailwind Vite installation](https://tailwindcss.com/docs/installation/using-vite), [shadcn manual setup](https://ui.shadcn.com/docs/installation/manual), [Vitest configuration](https://vitest.dev/config/).
