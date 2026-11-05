# BaytFolio Admin Frontend

BaytFolio Admin Frontend is an Arabic-first, right-to-left React single-page application for administering the BaytFolio platform. The current implementation provides an admin shell, authentication screens, Dashboard, Platform Analytics, Users Management, and mock-data-driven user and dashboard experiences.

The application is a frontend foundation. Authentication, authorization, persistence, and feature API integration are not implemented yet.

## Technology Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS v4 with the Tailwind Vite plugin
- React Router 7
- `nuqs` for URL-backed search and filter state
- TanStack React Query 5 provider and devtools infrastructure
- React Hook Form and Zod for authentication form validation
- Lucide React for icons
- Sonner for toast infrastructure
- Vitest, JSDOM, and React Testing Library
- IBM Plex Sans for Latin text and IBM Plex Sans Arabic for Arabic glyph rendering

The repository also declares packages for future work, including Axios, Zustand, Motion, and additional font packages. No Axios client, Zustand store, or Motion-based application flow is currently implemented.

## Getting Started

Prerequisites: Node.js and npm compatible with the checked-in lockfile. The project does not declare a Node.js `engines` requirement.

```bash
npm ci
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

No environment variables are currently required.

## Available Scripts

| Command                | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Start the Vite development server.                        |
| `npm run build`        | Run TypeScript checks and create a Vite production build. |
| `npm run typecheck`    | Run the TypeScript project build without bundling.        |
| `npm run lint`         | Run ESLint.                                               |
| `npm run test`         | Run Vitest once.                                          |
| `npm run test:watch`   | Run Vitest in watch mode.                                 |
| `npm run format`       | Format the repository with Prettier.                      |
| `npm run format:check` | Check repository formatting with Prettier.                |
| `npm run preview`      | Serve the built application with Vite preview.            |
| `npm run prepare`      | Run Husky setup after installation.                       |

## Application Architecture

### Entry points and providers

- `src/main.tsx` creates the React root, enables `StrictMode`, and imports global CSS.
- `src/app/app.tsx` composes `AppProviders` and `RouterProvider`.
- `src/app/providers/app-providers.tsx` provides the TanStack Query client, React Query devtools in development, and Sonner.
- `src/app/router.tsx` creates the browser router from public routes, admin routes, and the wildcard not-found route.
- `src/app/layouts/admin-layout-with-nuqs.tsx` mounts the single `NuqsAdapter` around the admin layout.
- `src/app/layouts/admin-layout.tsx` provides the responsive sidebar, header, page content area, and nested route outlet.

### Route structure

| Route              | Implementation                                                           |
| ------------------ | ------------------------------------------------------------------------ |
| `/`                | `HomePage` foundation screen                                             |
| `/login`           | Login form with client-side validation                                   |
| `/forgot-password` | Forgot-password form                                                     |
| `/verify-otp`      | OTP verification and resend-countdown UI                                 |
| `/reset-password`  | Reset-password form                                                      |
| `/dashboard`       | Dashboard Header, six KPI cards, Platform Analytics, and Needs Attention |
| `/users`           | Users Management listing                                                 |
| `/users/:userId`   | Mock user details                                                        |
| `*`                | Not-found page                                                           |

The sidebar includes destinations for future modules such as showroom applications, showrooms, categories, promotions, commercial accounts, CMS, admin users, settings, and activity logs. Most of those destinations do not currently have matching routes or feature modules.

### Feature modules

Feature code is organized under `src/modules/<feature>`. Modules generally separate pages, components, API/mock data, types, and validation schemas.

#### Authentication — `src/modules/auth`

Contains authentication pages, form components, and Zod schemas for login, password recovery, OTP verification, and password reset. Submissions are currently placeholders; there is no session, token, or authorization integration.

#### Dashboard — `src/modules/dashboard`

The Dashboard is the primary admin overview and is composed in this order:

1. `DashboardHeader`
   - Arabic title and description.
   - Period selection using `nuqs`.
   - Optional custom date range.
   - Local mock refresh state and timestamp.
2. `DashboardStats`
   - Six typed KPI cards using the shared `StatCard`.
   - Mock metrics are defined in `src/modules/dashboard/api/dashboard.mock.ts`.
3. Platform Analytics
   - Content Growth line chart.
   - Showroom Status donut chart.
   - Contract Status progress bars.
   - Components and mock data are under `src/modules/dashboard/components/platform-analytics/`.
   - Platform Analytics is a Dashboard section, not a standalone route.
4. `NeedsAttention`
   - Six typed operational attention cards.
   - Data is defined in `src/modules/dashboard/api/needs-attention.mock.ts`.
   - Uses Lucide icons, semantic tones, contextual message colors, footer actions, and responsive one/two/three-column layout.

Dashboard sections use mock data only. No dashboard API calls or server-state queries exist.

#### Users — `src/modules/users`

Provides mock user listing, filtering, sorting, URL-backed pagination state, CSV export, statistics, user details, account status UI, and reusable table/filter components. User data is defined in `src/modules/users/api/users.mock.ts` and is not persisted.

### Shared code — `src/shared`

- `components/ui/`: reusable shadcn/ui-style primitives, form components, badges, buttons, inputs, selects, separators, and the shared `StatCard`/`StatCardIcon`.
- `config/`: shared TanStack Query client configuration.
- `utils/`: shared utilities such as the `cn` class-name helper.
- `api/`, `components/common/`, `constants/`, `hooks/`, and `types/`: reserved shared locations; several currently contain only `.gitkeep` placeholders.

Feature modules import shared UI primitives and utilities through the `@/shared` alias. Dashboard imports its own Platform Analytics components through the Dashboard module boundary. There is no global event bus, shared store, or API service layer.

## State and Data Fetching

- Local component state uses React `useState` for menus, refresh UI, and local form/display interactions.
- URL state uses `nuqs` in the Dashboard Header and Users page.
- TanStack Query is configured globally but no current feature uses `useQuery`, mutations, or query-backed server data.
- Zustand is installed but no store is implemented.
- Axios is installed but no API client is implemented.
- Current feature data comes from typed mock modules.
- No `useEffect` is used under `src`.

## Styling and Design System

- `src/index.css` is the central Tailwind CSS v4 theme and semantic token file.
- The UI is Arabic-first and uses RTL containers (`dir="rtl"`) throughout the admin shell and feature pages.
- IBM Plex Sans Arabic is loaded for Arabic glyph coverage, with IBM Plex Sans as the Latin fallback.
- Semantic tokens define brand colors, surfaces, borders, text colors, status colors, dashboard colors, authentication colors, radii, and shadows.
- Shared cards use existing surface, border, radius, padding, and shadow tokens/classes rather than module-specific hardcoded colors.
- Lucide React supplies icons across navigation, cards, charts, and actions.

## Project Structure

```text
src/
├── app/
│   ├── app.tsx
│   ├── router.tsx
│   ├── components/
│   │   ├── admin-header.tsx
│   │   └── admin-sidebar.tsx
│   ├── layouts/
│   │   ├── admin-layout.tsx
│   │   └── admin-layout-with-nuqs.tsx
│   ├── pages/
│   │   ├── home-page.tsx
│   │   └── not-found-page.tsx
│   ├── providers/
│   │   ├── app-providers.tsx
│   │   └── app-providers.test.tsx
│   └── routes/
│       ├── admin-routes.tsx
│       ├── index.ts
│       └── public-routes.tsx
├── assets/
│   ├── icons/
│   ├── baytfolio-icon.png
│   ├── baytfolio-logo-full.png
│   ├── baytfolio-logo-horizontal.png
│   └── index.ts
├── modules/
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   └── schemas/
│   ├── dashboard/
│   │   ├── api/
│   │   ├── components/
│   │   │   └── platform-analytics/
│   │   │       ├── api/
│   │   │       ├── components/
│   │   │       ├── pages/
│   │   │       └── types/
│   │   ├── pages/
│   │   └── types/
│   └── users/
│       ├── api/
│       ├── components/
│       ├── pages/
│       └── types/
├── shared/
│   ├── api/
│   ├── components/
│   │   ├── common/
│   │   └── ui/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── types/
│   └── utils/
├── test/
│   └── setup.ts
├── index.css
└── main.tsx
```

The `@/*` TypeScript/Vite alias resolves to `src/*`.

## Current Implementation Status

Implemented:

- Responsive RTL admin shell with desktop sidebar and mobile drawer.
- Header breadcrumbs, notifications menu, profile menu, and temporary admin display.
- Client-side authentication screens and validation.
- Dashboard Header with URL-backed period filters and local refresh UI.
- Six Dashboard KPI cards.
- Platform Analytics charts using responsive SVG/CSS rendering and typed mock data.
- Six Needs Attention cards with semantic colors, contextual messages, and responsive layout.
- Users Management filtering, sorting, URL-backed pagination, CSV export, statistics, and mock user details.
- Shared UI primitives and shared statistics-card components.
- TanStack Query provider infrastructure and React Query devtools configuration.

Not implemented:

- Production authentication, sessions, authorization, and protected routes.
- Backend API client, API endpoints, persistence, and server-state integration.
- Real Dashboard, Analytics, or Users data.
- Most sidebar destinations outside Dashboard, Users, and Analytics.
- Role-based access control and authenticated-admin profile data.
- Broad feature-level test coverage for Dashboard and Platform Analytics.

## Architecture Findings and Technical Debt

- The feature/module separation is clear for Authentication and Users. Dashboard-specific Platform Analytics is now correctly colocated under Dashboard because it is rendered as part of the Dashboard composition, while retaining its own internal API, types, pages, and components.
- Shared UI primitives are centralized, and `StatCard` is reused by Dashboard and Users. Analytics cards have a local shared wrapper because their chart-specific content differs from KPI cards.
- Mock data is separated from presentation in Dashboard and Users, which supports future API replacement without changing component contracts.
- The application has infrastructure for TanStack Query, Axios, and Zustand, but those dependencies are not connected to feature data. They should be introduced into feature flows only when backend contracts are available.
- Authentication form submission is currently a placeholder, and the Admin Header uses a temporary profile display because no authenticated-admin state exists.
- The sidebar advertises several routes that are not implemented. Navigation and route coverage should be reconciled before those destinations are exposed as production functionality.
- The root route is a foundation page rather than an authenticated redirect. Production routing will need an authentication-aware entry and protected admin route boundary.
- Current test coverage focuses on routing, providers, authentication form interactions, and Users URL parsing. Dashboard, analytics visualizations, and most responsive layouts require additional focused tests or visual regression coverage.
- The production build currently reports a non-blocking warning for a JavaScript chunk larger than 500 kB. Code splitting can be considered when feature scope expands.

## Testing

Vitest uses JSDOM with `src/test/setup.ts`. The current suite contains five test files and eleven tests covering routing, providers, OTP interactions, password reset behavior, and Users URL parameter/page behavior.

Run the main validation commands:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

There is currently no coverage script or coverage configuration.
