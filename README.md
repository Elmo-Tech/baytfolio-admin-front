# BaytFolio Admin Frontend

BaytFolio Admin Frontend is an Arabic-first, right-to-left React single-page application for administering the BaytFolio real estate platform.

The application provides a responsive administrative interface with Dashboard analytics, client-side authentication screens, Users Management, Showrooms and Factories Management, and CMS tools for managing customer-facing content.

This repository is a frontend foundation. Authentication, authorization, backend APIs, persistent storage, and production server-state integration are not implemented yet. Current feature data is primarily powered by local mock data.

---

## Project Overview

The application is organized as a Vite-powered React 19 application with a modular, feature-based architecture.

- **Application layer:** Routing, layouts, providers, and shared application components under `src/app`.
- **Feature modules:** Authentication, Dashboard, Users, Showrooms, and CMS under `src/modules`.
- **Shared layer:** Reusable UI components, utilities, API infrastructure, hooks, and configuration under `src/shared`.

The interface is optimized for Arabic content and RTL navigation. IBM Plex Sans Arabic is the primary Arabic font, with IBM Plex Sans available for Latin text.

Design tokens and Tailwind CSS v4 utilities are centralized in `src/index.css`.

## Technologies and Dependencies

### Runtime

- React 19 and React DOM
- TypeScript
- Vite
- React Router 7
- Tailwind CSS v4 with `@tailwindcss/vite`
- `nuqs` for URL-backed search, filters, sorting, and pagination state
- TanStack React Query 5 provider and development tools
- React Hook Form and Zod for form state and validation
- Lucide React for icons
- Sonner for development feedback and toast infrastructure
- Base UI and Radix UI
- Class Variance Authority
- `clsx` and `tailwind-merge`
- IBM Plex Sans and IBM Plex Sans Arabic font packages

### Development and Testing

- TypeScript and `typescript-eslint`
- ESLint with React Hooks and React Refresh plugins
- Vitest
- JSDOM
- React Testing Library
- Prettier
- Husky
- lint-staged

The dependency manifest also declares Axios, Zustand, and Motion for future development. They are not currently connected to application feature flows.

---

## Project Features

### 1. Responsive Admin Layout

- Responsive RTL administrative layout.
- Desktop sidebar navigation.
- Mobile navigation drawer.
- Admin header with breadcrumbs.
- Notification menu.
- Profile menu.
- Shared application layout and providers.

### 2. Authentication

Client-side authentication screens include:

- Login.
- Forgot Password.
- OTP Verification.
- Reset Password.
- Zod-based form validation.
- Explicit unavailable-service states for backend-dependent operations.

Authentication is currently frontend-only and is not connected to a backend authentication service.

### 3. Dashboard

The Dashboard provides an administrative overview of platform operations.

- KPI statistics cards.
- Period and date filters.
- Custom date-range selection.
- Platform analytics.
- Content-growth visualizations.
- Showroom-status visualizations.
- Contract-status visualizations.
- Operational attention cards.
- Priority items table.
- Dashboard insights.
- Active-showroom rankings.
- Recent activity.
- Expiring-contract information.

All Dashboard data currently comes from local mock data.

### 4. Users Management

Provides tools for managing and reviewing platform user accounts.

- Users listing.
- User details page.
- Search by name, email, and phone number.
- Filter by account status.
- Filter by login method.
- Sort by registration date.
- URL-backed pagination.
- Page-size selection.
- CSV export.
- User statistics.
- Account status badges.
- Login method information.
- Registration date and last login information.
- Responsive RTL table layout.

The current implementation uses typed mock user data.

### 5. Showrooms and Factories Management

Provides management views for showrooms and factories.

- Showrooms and Factories listing.
- Showroom and Factory details page.
- Typed mock data.
- Activity and status filters.
- Reference sorting.
- URL-backed pagination.
- Statistics cards.
- Verification badges.
- Contract badges.
- Row-level navigation.
- Details tabs:
  - Overview.
  - Content.
  - Commercial Contract.

The listing and details views currently use local mock data.

### 6. Content Management System (CMS)

The CMS module provides a centralized area for managing customer-facing platform content.

#### CMS Dashboard

- Centralized CMS entry point.
- Navigation to content management sections.

#### Help Center Management

Provides FAQ management for questions displayed on the BaytFolio website and mobile application.

Features include:

- Help Center listing page.
- Search questions in Arabic and English.
- Search across question and answer content.
- Filter by category.
- Filter by status.
- URL-backed search and filters.
- Pagination and page-size selection.
- Add new questions.
- Edit existing questions.
- Arabic and English question fields.
- Arabic and English answer fields.
- Question category selection.
- Active and Draft statuses.
- Activate and deactivate questions.
- Status indicators.
- Modal-based question creation and editing.
- Navigation back to the CMS dashboard.

#### Contact Information Settings

Provides an administrative interface for managing official BaytFolio contact information.

Features include:

- Contact Information settings page.
- Direct phone number management.
- WhatsApp number management.
- Support email management.
- Official working-hours management.
- Editable contact settings form.
- Save changes functionality.
- Reset unsaved changes.
- Live customer-facing preview.
- Phone, WhatsApp, and email preview links.
- Working-hours preview.
- Synchronization status notice.
- Centralized update-security notice.
- Responsive two-column settings and preview layout.

The preview reflects local form state. Actual publication and synchronization with the customer-facing website and mobile application require backend integration.

---

## Dashboard Sections

The `/dashboard` route renders the following sections:

1. **Dashboard Header** — Arabic overview text, URL-backed period filters, optional custom date range, and local refresh feedback.
2. **Dashboard Stats** — Six typed KPI cards using mock metrics.
3. **Platform Analytics** — Content-growth, showroom-status, and contract-status visualizations.
4. **Needs Attention** — Six responsive operational attention cards with typed mock data, semantic tones, and toast feedback for unfinished destinations.
5. **Priority Items** — Typed mock-data table with search, status filtering, semantic statuses/actions, RTL support, and six-item pagination.
6. **Dashboard Insights** — Active-showroom rankings, recent activity, and expiring-contract cards with mock data and development-only toast actions.

All Dashboard data is local mock data. No Dashboard API calls or server-state queries are currently made.

---

## Project Architecture and Folder Structure

The application follows a modular, feature-based architecture.

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
│
├── assets/
│   ├── icons/
│   ├── baytfolio-icon.png
│   ├── baytfolio-logo-full.png
│   ├── baytfolio-logo-horizontal.png
│   └── index.ts
│
├── modules/
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   └── schemas/
│   │
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
│   │
│   ├── users/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
│   │
│   ├── showrooms/
│   │   ├── api/
│   │   ├── components/
│   │   │   └── details/
│   │   ├── pages/
│   │   └── types/
│   │
│   └── cms/
│       ├── api/
│       ├── components/
│       │   ├── contact-information/
│       │   │   ├── contact-information-form.tsx
│       │   │   ├── contact-information-preview.tsx
│       │   │   └── contact-information-stats.tsx
│       │   │
│       │   └── help-center/
│       │       ├── add-question-modal.tsx
│       │       ├── help-center-filters.tsx
│       │       ├── help-center-pagination.tsx
│       │       └── help-center-table.tsx
│       │
│       ├── pages/
│       │   ├── cms-page.tsx
│       │   ├── contact-information-page.tsx
│       │   ├── help-center-page.tsx
│       │   └── help-center-search-params.ts
│       │
│       └── types/
│           ├── cms.ts
│           ├── contact-information.ts
│           ├── help-center.ts
│           └── index.ts
│
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
│
├── test/
│   └── setup.ts
│
├── index.css
└── main.tsx
```

The `@/*` TypeScript and Vite alias resolves to `src/*`.

---

## Routing Structure

| Route                      | Implementation                           |
| -------------------------- | ---------------------------------------- |
| `/`                        | Foundation home screen                   |
| `/login`                   | Login form with client-side validation   |
| `/forgot-password`         | Forgot-password form                     |
| `/verify-otp`              | OTP verification and resend-countdown UI |
| `/reset-password`          | Reset-password form                      |
| `/dashboard`               | Admin Dashboard                          |
| `/users`                   | Users Management listing                 |
| `/users/:userId`           | Mock user details                        |
| `/showrooms`               | Showrooms and Factories Management       |
| `/showrooms/:showroomId`   | Mock showroom/factory details            |
| `/cms`                     | CMS Dashboard                            |
| `/cms/help-center`         | Help Center Management                   |
| `/cms/contact-information` | Contact Information Settings             |
| `*`                        | Not-found page                           |

All administrative routes are rendered through the shared administrative layout.

---

## State Management

- React component state manages local interface concerns, modal visibility, form values, and other interactive UI states.
- `nuqs` stores Users, Showrooms, and Help Center search, filters, sorting, and pagination in URL query parameters.
- TanStack React Query is configured as provider infrastructure for future server state, but feature-level server queries and mutations are not implemented.
- CMS Help Center currently manages questions using local React state and mock initial data.
- Contact Information currently uses local React state and mock save functionality.
- No global client store is currently used; Zustand remains a declared dependency for future integration.

---

## Styling and Design Tokens

Tailwind CSS v4 is configured through `@tailwindcss/vite`.

Global design tokens are defined in `src/index.css`, including:

- Semantic colors.
- Surface colors.
- Border colors.
- Status colors.
- Typography.
- Font families.
- Border radii.
- Shadows.

Components consume these tokens through Tailwind utility classes.

The application uses IBM Plex Sans Arabic as its primary Arabic typeface and supports RTL layouts at page and component boundaries, with LTR handling for English text and international contact information where appropriate.

Shared UI primitives are maintained under `src/shared/components/ui`.

---

## Installation and Setup

### Prerequisites

- Node.js and npm compatible with the checked-in `package-lock.json`.
- No environment variables are currently required.

### Install Dependencies

```bash
npm ci
```

### Start Development Server

```bash
npm run dev
```

Vite prints the local development URL after startup.

### Build and Preview

```bash
npm run build
npm run preview
```

---

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

---

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

---

## Mock Data and Backend Integration Status

The current application uses typed local mock data from feature `api` folders and local component state.

Backend integration and persistent storage are not implemented yet.

### Current Mock-Based Features

- Dashboard metrics, attention items, priority items, analytics, activities, showrooms, factories, and contracts.
- Users, user statistics, and user details.
- Showrooms and Factories listing and details.
- Help Center questions and category data.
- Contact Information initial settings and mock save behavior.

### Backend Integration Pending

- Authentication sessions and backend authentication.
- Admin authorization and role-based access control.
- API endpoints and server-side data persistence.
- Server-side filtering, sorting, and pagination.
- CMS content persistence and publishing workflows.
- Contact Information publication and synchronization.
- Production server-state queries and mutations.
- Audit logging for administrative changes.

TanStack React Query is configured as provider infrastructure, but feature-level queries and mutations are not currently connected.

Axios and Zustand are declared for future integration but are not currently used by application flows.

---

## Current Project Status

### Implemented

- Responsive RTL admin shell and navigation.
- Client-side authentication screens and schema validation.
- Dashboard sections with typed mock data.
- Users listing, filtering, sorting, pagination, CSV export, statistics, and details UI.
- Showrooms and Factories listing, filtering, sorting, pagination, badges, and details UI.
- CMS Dashboard.
- Help Center management interface.
- Help Center search, category/status filters, pagination, and URL state.
- Add and edit FAQ functionality.
- Activate and deactivate FAQ questions.
- Arabic and English FAQ fields.
- Contact Information settings interface.
- Phone, WhatsApp, email, and working-hours form fields.
- Live customer-facing contact preview.
- Local save and reset interactions.
- CMS navigation and administrative route integration.
- Shared UI primitives and semantic design tokens.

### Known Limitations

- Authentication and admin authorization are not connected to a backend.
- Feature data is currently mock-based and does not persist to a backend.
- Help Center changes are maintained in local component state.
- Contact Information changes use mock save behavior and are not published to production customer applications.
- Showrooms add/export actions, detail-page action buttons, and backend-driven filtering are not implemented.
- Dashboard, analytics, and responsive-layout coverage is primarily manual.
- CMS features still require backend integration, API validation, and production workflow testing.
- The production build previously reported a non-blocking warning about a JavaScript chunk larger than 500 kB. Code splitting can be considered as feature scope grows.

---

## Testing

Vitest runs in JSDOM with `src/test/setup.ts`.

The existing baseline test suite contains five test files and eleven tests covering:

- Routing.
- Application providers.
- OTP interactions.
- Password reset behavior.
- Users URL-state behavior.

There is no coverage script or coverage configuration.

New CMS features should receive dedicated automated tests as the implementation progresses.

---

## Development Conventions

- Keep business-domain code inside its feature module.
- Expose intended public module surfaces through `index.ts` files.
- Keep shared UI primitives in `src/shared/components/ui`.
- Reuse shared controls instead of duplicating UI implementations.
- Use typed mock data in feature `api` folders until backend integration is implemented.
- Avoid `useEffect` and `any` in `src`; preserve strict TypeScript checks.
- Use semantic design tokens from `src/index.css` instead of hardcoded component colors or font families.
- Preserve accessible controls and responsive behavior.
- Maintain RTL layouts and use LTR direction where English or international contact data requires it.
- Keep URL-backed filters and pagination consistent across listing pages.

---

**BaytFolio Admin Frontend**  
A modular administrative interface for the BaytFolio platform.
