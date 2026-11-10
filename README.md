# BaytFolio Admin Frontend

BaytFolio Admin Frontend is an Arabic-first, right-to-left React single-page
application for administering the BaytFolio platform. It currently provides
the responsive admin shell, client-side authentication screens, Dashboard
views, and mock-data-driven Users Management flows.

This repository is a frontend foundation. Authentication, authorization,
persistence, backend APIs, and production server-state integration are not
implemented.

## Project Overview

The application is organized as a Vite-powered React 19 application with
feature modules under `src/modules`, shared UI primitives under `src/shared`,
and application-level routing/layout/providers under `src/app`.

The interface is optimized for Arabic content and RTL navigation. IBM Plex Sans
Arabic is the primary Arabic font, with IBM Plex Sans available for Latin text.
Design tokens and Tailwind CSS v4 utilities are centralized in
`src/index.css`.

## Technologies and Dependencies

### Runtime

- React 19 and React DOM
- TypeScript
- Vite
- React Router 7
- Tailwind CSS v4 with `@tailwindcss/vite`
- `nuqs` for URL-backed search, filter, and pagination state
- TanStack React Query 5 provider and development tools
- React Hook Form and Zod for form state and validation
- Lucide React for icons
- Sonner for development feedback/toast infrastructure
- Base UI, Radix UI, Class Variance Authority, `clsx`, and `tailwind-merge`
- IBM Plex Sans and IBM Plex Sans Arabic font packages

### Development and testing

- TypeScript and `typescript-eslint`
- ESLint with React Hooks and React Refresh plugins
- Vitest, JSDOM, and React Testing Library
- Prettier
- Husky and lint-staged

The dependency manifest also declares Axios, Zustand, and Motion for future
work. They are not currently connected to application flows.

## Project Features

- Responsive RTL admin shell with desktop sidebar and mobile drawer.
- Admin header with breadcrumbs, notification menu, profile menu, and mobile
  menu support.
- Client-side login, forgot-password, OTP verification, and reset-password
  screens with Zod validation and explicit unavailable-service states.
- Dashboard KPI cards, period/date filters, local refresh state, platform
  analytics, operational attention cards, priority-item table, and dashboard
  insight cards.
- Users Management with search, status/login-method filters, sorting,
  URL-backed pagination, CSV export, statistics, and mock user details.
- Showrooms and Factories Management with typed mock data, activity/status
  filters, reference sorting, URL-backed pagination, statistics, verification
  badges, contract badges, and row-level navigation to the reserved details
  route.
- Shared UI primitives for buttons, inputs, selects, badges, fields, alerts,
  password inputs, separators, and statistic cards.
- Centralized semantic color, surface, border, typography, radius, and shadow
  tokens.

## Dashboard Sections

The `/dashboard` route renders these sections in order:

1. **Dashboard Header** — Arabic overview text, URL-backed period filters,
   optional custom date range, and local refresh feedback.
2. **Dashboard Stats** — six typed KPI cards using mock metrics.
3. **Platform Analytics** — content-growth, showroom-status, and
   contract-status visualizations.
4. **Needs Attention** — six responsive operational attention cards with typed
   mock data, semantic tones, and toast feedback for unfinished destinations.
5. **Priority Items** — typed mock-data table with search, status filtering,
   semantic statuses/actions, RTL support, and six-item pagination.
6. **Dashboard Insights** — active-showroom rankings, recent activity, and
   expiring-contract cards with mock data and development-only toast actions.

All Dashboard data is local mock data. No Dashboard API calls or server-state
queries are currently made.

## Project Architecture and Folder Structure

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
│   │   │       ├── index.ts
│   │   │       └── types/
│   │   ├── pages/
│   │   └── types/
│   ├── users/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
│   └── showrooms/
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

The `@/*` TypeScript and Vite alias resolves to `src/*`.

## Routing Structure

| Route              | Current implementation                   |
| ------------------ | ---------------------------------------- |
| `/`                | Foundation home screen                   |
| `/login`           | Login form with client-side validation   |
| `/forgot-password` | Forgot-password form                     |
| `/verify-otp`      | OTP verification and resend-countdown UI |
| `/reset-password`  | Reset-password form                      |
| `/dashboard`       | Admin Dashboard                          |
| `/users`           | Users Management listing                 |
| `/users/:userId`   | Mock user details                        |
| `/showrooms`       | Showrooms and Factories Management       |
| `/showrooms/:id`   | Reserved for the future details page     |
| `*`                | Not-found page                           |

The sidebar includes navigation labels for future modules such as showroom
applications, categories, promotions, commercial accounts, CMS, admin users,
settings, and activity logs. Those destinations do not currently have matching
routes or feature modules. Showrooms is currently the exception and has a
listing route; its details route is intentionally not implemented yet.

## Installation and Setup

### Prerequisites

- Node.js and npm compatible with the checked-in `package-lock.json`.
- No environment variables are currently required.

### Install dependencies

```bash
npm ci
```

### Start development

```bash
npm run dev
```

Vite prints the local development URL after startup.

### Build and preview

```bash
npm run build
npm run preview
```

## Available NPM Scripts

| Command                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the Vite development server.                   |
| `npm run build`        | Run TypeScript checks and create a production build. |
| `npm run typecheck`    | Run the TypeScript project build without bundling.   |
| `npm run lint`         | Run ESLint across the repository.                    |
| `npm run test`         | Run the Vitest suite once.                           |
| `npm run test:watch`   | Run Vitest in watch mode.                            |
| `npm run format`       | Format the repository with Prettier.                 |
| `npm run format:check` | Check repository formatting with Prettier.           |
| `npm run preview`      | Serve the production build with Vite preview.        |
| `npm run prepare`      | Run Husky setup after installation.                  |

## Development Commands

Run the focused checks while developing:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

To run a specific Vitest file:

```bash
npx vitest run src/modules/users/pages/users-page.test.tsx
```

To check formatting for a specific file:

```bash
npx prettier --check path/to/file.tsx
```

## Mock Data and Backend Integration Status

The current application uses typed local mock data from feature `api` folders.
There are no API calls, backend endpoints, persistence, authentication
sessions, authorization checks, or production server-state queries.

- Dashboard metrics, attention items, priority items, analytics, activities,
  showrooms, factories, and contracts are mocked.
- Users, user statistics, and user details are mocked.
- Authentication form submissions intentionally show unavailable-service
  feedback instead of calling a backend.
- TanStack Query is configured as provider infrastructure, but no feature uses
  `useQuery` or mutations yet.
- Axios and Zustand are declared for future integration but are not currently
  used by the application.

## Current Project Status

Implemented and validated:

- Responsive RTL admin shell and navigation.
- Authentication screens and client-side schema validation.
- Dashboard sections listed above with typed mock data.
- Users listing, filtering, sorting, pagination, CSV export, and details UI.
- Showrooms and factories listing, filtering, sorting, pagination, and status
  badges using typed mock data.
- Shared UI primitives and semantic design tokens.
- TypeScript, ESLint, Vitest, and Vite build configuration.

Known limitations:

- Authentication and admin authorization are not connected to a backend.
- Showrooms details, add/export actions, and backend-driven filtering are not
  implemented; the listing and displayed statistics currently use local mock
  data.
- Sidebar destinations outside `/dashboard`, `/users`, `/users/:userId`, and
  `/showrooms` are placeholders and currently resolve to the not-found page.
- Dashboard, analytics, and responsive-layout coverage is primarily manual;
  the existing automated suite focuses on routing, providers, authentication
  form interactions, and Users URL-state parsing.
- The production build reports a non-blocking warning about a JavaScript chunk
  larger than 500 kB. Code splitting can be considered as feature scope grows.

## Testing

Vitest runs in JSDOM with `src/test/setup.ts`. The current suite contains five
test files and eleven tests covering routing, providers, OTP interactions,
password reset behavior, and Users URL-state behavior.

There is no coverage script or coverage configuration.
