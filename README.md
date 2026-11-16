# BaytFolio Admin Frontend

BaytFolio Admin Frontend is an Arabic-first, right-to-left React application for managing the BaytFolio platform.

It provides a responsive administrative interface with authentication screens, Dashboard, Analytics, Users Management, Showrooms and Factories Management, and CMS tools for managing customer-facing content.

The project uses a modular, feature-based architecture built with React, TypeScript, Vite, and React Router. Feature data is currently based primarily on typed local mock data.

---

## Project Overview

The application is organized into three main layers:

- **App:** Application routing, layouts, providers, and administrative navigation.
- **Modules:** Independent business features such as Authentication, Dashboard, Analytics, Users, Showrooms, and CMS.
- **Shared:** Reusable UI components, utilities, configuration, and common infrastructure.

The interface is optimized for Arabic content and RTL navigation. Inter is the primary typeface for Latin text, with Noto Sans Arabic used for Arabic text.

Global styling and design tokens are centralized in `src/index.css`.

## Technologies and Dependencies

### Runtime

- React 19 and React DOM
- TypeScript
- Vite
- React Router 7
- Tailwind CSS v4
- `nuqs` for URL-based search, filters, sorting, and pagination
- TanStack React Query 5
- React Hook Form
- Zod
- Lucide React
- Sonner
- Base UI and Radix UI
- Class Variance Authority
- `clsx`
- `tailwind-merge`
- Inter and Noto Sans Arabic

### Development and Testing

- ESLint
- TypeScript and `typescript-eslint`
- Prettier
- Vitest
- JSDOM
- React Testing Library
- Husky
- lint-staged

Axios, Zustand, and Motion are declared dependencies for potential future use and are not currently connected to the main feature workflows.

---

## Project Features

### 1. Responsive Admin Layout

- Responsive administrative layout.
- RTL sidebar navigation.
- Mobile navigation drawer.
- Admin header.
- Breadcrumb navigation.
- Notification menu.
- Profile menu.
- Shared application providers.

### 2. Authentication

Client-side authentication screens include:

- Login.
- Forgot Password.
- OTP Verification.
- Reset Password.
- Form validation using Zod.
- Backend-unavailable states for operations that require authentication services.

Authentication is currently frontend-only and is not connected to a backend authentication service.

### 3. Dashboard

The Dashboard provides an overview of platform operations.

- KPI statistics cards.
- Period filters.
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

Dashboard data currently comes from local mock data.

### 4. Analytics

A dedicated Analytics module provides a separate view for reviewing platform performance and commercial activity.

- Analytics header.
- Overview statistics.
- Commercial overview.
- Platform activity chart.
- Most Active Showrooms table.
- Contracts Needing Attention table.
- Typed mock analytics data.
- Showroom navigation from analytics tables.
- Contract status and remaining-time information.

Analytics is implemented as an independent feature module under `src/modules/analytics`.

The current implementation uses local mock data and is not connected to analytics APIs.

### 5. Users Management

Provides tools for reviewing and managing platform user accounts.

- Users listing.
- User details page.
- Search by name, email, and phone number.
- Account-status filtering.
- Login-method filtering.
- Registration-date sorting.
- URL-backed pagination.
- Page-size selection.
- CSV export.
- User statistics.
- Account-status badges.
- Login-method information.
- Registration and last-login information.
- Responsive RTL table layout.

The current implementation uses typed mock user data.

### 6. Showrooms and Factories Management

Provides listing and details interfaces for showrooms and factories.

- Showrooms and Factories listing.
- Showroom and Factory details pages.
- Typed mock data.
- Activity and status filters.
- Reference sorting.
- URL-backed pagination.
- Statistics cards.
- Verification badges.
- Contract-status badges.
- Row-level navigation.

The details page includes three tabs:

- Overview.
- Content.
- Commercial Contract.

The listing and details views currently use local mock data.

### 7. Content Management System (CMS)

The CMS module provides a centralized area for managing customer-facing platform content.

#### CMS Dashboard

- Centralized CMS entry point.
- Navigation to content management sections.
- Content management overview cards.
- Navigation to individual CMS pages.

#### Help Center Management

Provides FAQ management for questions displayed on the BaytFolio website and mobile application.

- Help Center listing.
- Search in Arabic and English.
- Search across question and answer content.
- Category filtering.
- Status filtering.
- URL-backed search and filters.
- Pagination and page-size selection.
- Add and edit questions.
- Arabic and English question fields.
- Arabic and English answer fields.
- Question category selection.
- Active and Draft statuses.
- Activate and deactivate questions.
- Modal-based question creation and editing.

#### Contact Information Settings

Provides an interface for managing official BaytFolio contact information.

- Phone number management.
- WhatsApp number management.
- Support email management.
- Working-hours management.
- Editable contact settings form.
- Save changes interaction.
- Reset unsaved changes.
- Live customer-facing preview.
- Phone, WhatsApp, and email preview links.
- Working-hours preview.
- Synchronization and update-security notices.

The preview reflects local form state. Publishing and synchronization require backend integration.

#### Privacy Policy Management

Provides an interface for editing the privacy policy displayed on the customer-facing applications.

- Privacy Policy management page.
- Document identification.
- Published document status display.
- Arabic and English language switching.
- Editable policy section titles and content.
- Multiple policy sections.
- Last-updated date display.
- Save changes interaction.
- Reset unsaved changes.
- Fixed bottom action bar.

The current implementation uses typed mock data and local component state.

#### Terms and Conditions Management

Provides an interface for editing the terms and conditions displayed on the customer-facing applications.

- Terms and Conditions management page.
- Document identification.
- Published document status display.
- Arabic and English language switching.
- Six editable terms sections.
- Section descriptions and explanatory notes.
- Editable legal and operational text.
- Character count for each section.
- Highlighted key section.
- Last-updated date display.
- Save changes interaction.
- Reset unsaved changes.
- Fixed bottom action bar.

The current implementation uses typed mock data and local component state. Legal content requires appropriate review and approval before publication.

---

## Dashboard Sections

The Dashboard includes the following sections:

1. **Dashboard Header:** Overview text, period filters, custom date range, and local refresh feedback.
2. **Dashboard Stats:** KPI cards using typed mock metrics.
3. **Platform Analytics:** Content-growth, showroom-status, and contract-status visualizations.
4. **Needs Attention:** Operational attention cards with typed mock data.
5. **Priority Items:** Searchable and filterable table with status indicators and pagination.
6. **Dashboard Insights:** Active-showroom rankings, recent activity, and expiring-contract information.

All Dashboard data is currently local mock data.

---

## Project Architecture

The project follows a modular, feature-based architecture.

```text
src/
├── app/
│   ├── app.tsx
│   ├── router.tsx
│   ├── router.test.tsx
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
│   │   └── auth-shield-user.svg
│   ├── baytfolio-icon.png
│   ├── baytfolio-logo-full.png
│   ├── baytfolio-logo-horizontal.png
│   └── index.ts
│
├── modules/
│   ├── analytics/
│   │   ├── api/
│   │   │   └── analytics.mock.ts
│   │   ├── components/
│   │   │   ├── analytics-header.tsx
│   │   │   ├── analytics-overview.tsx
│   │   │   ├── analytics-tables.tsx
│   │   │   ├── commercial-overview.tsx
│   │   │   └── platform-activity-chart.tsx
│   │   └── pages/
│   │       └── analytics-page.tsx
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   ├── auth-brand.tsx
│   │   │   ├── auth-card.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── forgot-password-form.tsx
│   │   │   ├── login-form.tsx
│   │   │   ├── otp-verification-form.tsx
│   │   │   ├── otp-verification-form.test.tsx
│   │   │   ├── reset-password-form.tsx
│   │   │   └── reset-password-form.test.tsx
│   │   ├── pages/
│   │   │   ├── forgot-password-page.tsx
│   │   │   ├── login-page.tsx
│   │   │   ├── reset-password-page.tsx
│   │   │   └── verify-otp-page.tsx
│   │   └── schemas/
│   │       ├── forgot-password.schema.ts
│   │       ├── login.schema.ts
│   │       ├── otp-verification.schema.ts
│   │       └── reset-password.schema.ts
│   │
│   ├── cms/
│   │   ├── api/
│   │   │   ├── cms.mock.ts
│   │   │   ├── contact-information.mock.ts
│   │   │   ├── help-center.mock.ts
│   │   │   ├── privacy-policy.mock.ts
│   │   │   └── terms-and-conditions.mock.ts
│   │   ├── components/
│   │   │   ├── contact-information/
│   │   │   │   ├── contact-information-form.tsx
│   │   │   │   ├── contact-information-preview.tsx
│   │   │   │   └── contact-information-stats.tsx
│   │   │   ├── help-center/
│   │   │   │   ├── add-question-modal.tsx
│   │   │   │   ├── help-center-filters.tsx
│   │   │   │   ├── help-center-pagination.tsx
│   │   │   │   └── help-center-table.tsx
│   │   │   └── overview/
│   │   │       └── cms-overview-card.tsx
│   │   ├── pages/
│   │   │   ├── cms-page.tsx
│   │   │   ├── contact-information-page.tsx
│   │   │   ├── help-center-page.tsx
│   │   │   ├── help-center-search-params.ts
│   │   │   ├── privacy-policy-page.tsx
│   │   │   └── terms-and-conditions-page.tsx
│   │   ├── types/
│   │   │   ├── cms.ts
│   │   │   ├── contact-information.ts
│   │   │   ├── help-center.ts
│   │   │   ├── privacy-policy.ts
│   │   │   └── terms-and-conditions.ts
│   │   └── index.ts
│   │
│   ├── dashboard/
│   │   ├── api/
│   │   │   ├── dashboard-insights.mock.ts
│   │   │   ├── dashboard.mock.ts
│   │   │   ├── needs-attention.mock.ts
│   │   │   └── priority-items.mock.ts
│   │   ├── components/
│   │   │   ├── dashboard-header.tsx
│   │   │   ├── dashboard-insights.tsx
│   │   │   ├── dashboard-stats.tsx
│   │   │   ├── needs-attention.tsx
│   │   │   ├── priority-items.tsx
│   │   │   └── platform-analytics/
│   │   │       ├── api/
│   │   │       │   └── platform-analytics.mock.ts
│   │   │       ├── components/
│   │   │       │   ├── analytics-card.tsx
│   │   │       │   ├── content-growth-card.tsx
│   │   │       │   ├── contract-status-card.tsx
│   │   │       │   └── showroom-status-card.tsx
│   │   │       ├── types/
│   │   │       │   └── platform-analytics.types.ts
│   │   │       └── index.ts
│   │   ├── pages/
│   │   │   └── dashboard-page.tsx
│   │   ├── types/
│   │   │   ├── dashboard-insights.types.ts
│   │   │   ├── dashboard.types.ts
│   │   │   ├── needs-attention.types.ts
│   │   │   └── priority-items.types.ts
│   │   └── index.ts
│   │
│   ├── showrooms/
│   │   ├── api/
│   │   │   ├── showroom-details.mock.ts
│   │   │   └── showrooms.mock.ts
│   │   ├── components/
│   │   │   ├── contract-status-badge.tsx
│   │   │   ├── showroom-status-badge.tsx
│   │   │   ├── showrooms-filters.tsx
│   │   │   ├── showrooms-header.tsx
│   │   │   ├── showrooms-pagination.tsx
│   │   │   ├── showrooms-stats.tsx
│   │   │   ├── showrooms-table.tsx
│   │   │   ├── index.ts
│   │   │   └── details/
│   │   │       ├── showroom-content-card.tsx
│   │   │       ├── showroom-contract-card.tsx
│   │   │       ├── showroom-detail-field.tsx
│   │   │       ├── showroom-details-header.tsx
│   │   │       ├── showroom-details-not-found.tsx
│   │   │       ├── showroom-info-card.tsx
│   │   │       ├── showroom-owner-card.tsx
│   │   │       ├── showroom-promotion-card.tsx
│   │   │       └── index.ts
│   │   ├── pages/
│   │   │   ├── showroom-details-page.tsx
│   │   │   ├── showrooms-page.tsx
│   │   │   └── showrooms-search-params.ts
│   │   ├── types/
│   │   │   ├── showroom-details.ts
│   │   │   └── showroom.ts
│   │   └── index.ts
│   │
│   └── users/
│       ├── api/
│       │   └── users.mock.ts
│       ├── components/
│       │   ├── user-account-status-card.tsx
│       │   ├── user-details-card.tsx
│       │   ├── users-filters.tsx
│       │   ├── users-pagination.tsx
│       │   ├── users-stats.tsx
│       │   └── users-table.tsx
│       ├── pages/
│       │   ├── user-details-page.tsx
│       │   ├── users-page.test.tsx
│       │   ├── users-page.tsx
│       │   └── users-search-params.ts
│       ├── types/
│       │   └── user.ts
│       └── index.ts
│
├── shared/
│   ├── api/
│   │   └── .gitkeep
│   ├── components/
│   │   ├── common/
│   │   │   └── .gitkeep
│   │   └── ui/
│   │       ├── arrow-icon.tsx
│   │       ├── async-submit-button.tsx
│   │       ├── badge-variants.ts
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── field.tsx
│   │       ├── form-alert.tsx
│   │       ├── index.ts
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── password-input.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       └── stat-card.tsx
│   ├── config/
│   │   └── query-client.ts
│   ├── constants/
│   │   └── .gitkeep
│   ├── hooks/
│   │   └── .gitkeep
│   ├── types/
│   │   └── .gitkeep
│   └── utils/
│       └── cn.ts
│
├── test/
│   └── setup.ts
│
├── index.css
└── main.tsx
```

The `@/*` alias resolves to `src/*`.

---

## Routing Structure

The application uses React Router for application navigation.

| Route                       | Page                        |
| --------------------------- | --------------------------- |
| `/`                         | Foundation home page        |
| `/login`                    | Login                       |
| `/forgot-password`          | Forgot Password             |
| `/verify-otp`               | OTP Verification            |
| `/reset-password`           | Reset Password              |
| `/dashboard`                | Dashboard                   |
| `/users`                    | Users Management            |
| `/users/:userId`            | User Details                |
| `/showrooms`                | Showrooms and Factories     |
| `/showrooms/:showroomId`    | Showroom or Factory Details |
| `/cms`                      | CMS Dashboard               |
| `/cms/help-center`          | Help Center                 |
| `/cms/contact-information`  | Contact Information         |
| `/cms/privacy-policy`       | Privacy Policy              |
| `/cms/terms-and-conditions` | Terms and Conditions        |
| `*`                         | Not Found                   |

Administrative route definitions are maintained in `src/app/routes/admin-routes.tsx`.

The Analytics page and its navigation are maintained through the Analytics module and administrative routing configuration. Its exact route should be documented here after confirming the registered path in `admin-routes.tsx`.

---

## State Management

- React component state handles local UI interactions, form values, and modal visibility.
- `nuqs` manages URL-backed search, filters, sorting, and pagination.
- TanStack React Query is configured through the application providers for future server-state integration.
- Feature data currently comes from local mock files and component state.
- Zustand is declared as a dependency but is not currently used for application state.

---

## Styling and Design Tokens

Tailwind CSS v4 is configured through `@tailwindcss/vite`.

Global design tokens are defined in `src/index.css`, including:

- Semantic colors.
- Surface and border colors.
- Status colors.
- Typography and font families.
- Border radii.
- Shadows.

The application uses Inter as its primary typeface for Latin text and Noto Sans Arabic for Arabic content.

Shared UI components are maintained under `src/shared/components/ui`.

The interface supports RTL layouts and LTR content where needed.

---

## Installation and Setup

### Prerequisites

- Node.js
- npm

### Install Dependencies

```bash
npm ci
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Available NPM Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start the Vite development server. |
| `npm run build`        | Run the production build.          |
| `npm run typecheck`    | Run TypeScript checks.             |
| `npm run lint`         | Run ESLint.                        |
| `npm run test`         | Run the Vitest test suite.         |
| `npm run test:watch`   | Run Vitest in watch mode.          |
| `npm run format`       | Format files with Prettier.        |
| `npm run format:check` | Check formatting with Prettier.    |
| `npm run preview`      | Preview the production build.      |
| `npm run prepare`      | Set up Husky.                      |

---

## Development and Validation

Run the following checks before committing changes:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Run a specific test file:

```bash
npx vitest run src/modules/users/pages/users-page.test.tsx
```

Check formatting for a specific file:

```bash
npx prettier --check path/to/file.tsx
```

---

## Mock Data and Backend Integration

The current frontend uses typed mock data in feature-specific `api` folders.

### Mock-Based Features

- Dashboard statistics and insights.
- Dashboard platform analytics.
- Analytics overview and commercial data.
- Platform activity chart data.
- Most Active Showrooms and Contracts Needing Attention tables.
- Users and user details.
- Showrooms and factories.
- Showroom details.
- Help Center questions.
- Contact Information settings.
- Privacy Policy content.
- Terms and Conditions content.

### Pending Backend Integration

- Authentication and session management.
- Admin authorization and role-based access control.
- Backend API endpoints.
- Persistent data storage.
- Server-side filtering, sorting, and pagination.
- Analytics data endpoints.
- CMS content persistence.
- Contact Information publishing and synchronization.
- Privacy Policy and Terms and Conditions publishing.
- Server-state queries and mutations.
- Audit logging for administrative changes.

TanStack React Query is configured as application infrastructure, but feature-level API queries and mutations are not yet connected.

---

## Current Project Status

### Implemented

- Responsive RTL administrative layout.
- Authentication screens and form validation.
- Dashboard and platform analytics sections.
- Dedicated Analytics module.
- Analytics overview and commercial sections.
- Platform activity chart.
- Analytics data tables.
- Users listing and details interfaces.
- User search, filters, sorting, and pagination.
- CSV export.
- Showrooms and Factories listing.
- Showroom and Factory details pages.
- CMS Dashboard.
- Help Center management interface.
- FAQ creation and editing.
- FAQ search and filters.
- Contact Information settings.
- Live contact information preview.
- Privacy Policy editing interface.
- Terms and Conditions editing interface.
- Arabic and English content editing.
- Shared UI components.
- Centralized design tokens.

### Known Limitations

- Authentication is not connected to a backend service.
- Admin authorization is not implemented.
- Feature data is primarily mock-based.
- Changes are not persisted to a production backend.
- CMS publishing workflows require backend integration.
- Analytics currently uses mock data.
- Dashboard and Analytics do not use production analytics APIs.
- Some administrative actions are interface-only.
- Production behavior requires API integration and end-to-end validation.

---

## Testing

The project uses Vitest, JSDOM, and React Testing Library.

Test files currently present in the repository include:

- `src/app/router.test.tsx`
- `src/app/providers/app-providers.test.tsx`
- `src/modules/auth/components/otp-verification-form.test.tsx`
- `src/modules/auth/components/reset-password-form.test.tsx`
- `src/modules/users/pages/users-page.test.tsx`

Testing coverage should be expanded as new modules and workflows are implemented.

---

## Development Conventions

- Keep business-specific code inside its feature module.
- Keep shared components inside `src/shared/components`.
- Use typed data and avoid TypeScript `any`.
- Avoid unnecessary `useEffect` usage.
- Use design tokens from `src/index.css`.
- Avoid hardcoded colors and font families inside components.
- Preserve RTL and LTR behavior.
- Maintain responsive layouts.
- Reuse existing shared UI components.
- Keep URL-backed filters and pagination consistent.
- Run TypeScript, lint, tests, and build checks before committing.

---

**BaytFolio Admin Frontend**  
Modular administration interface for the BaytFolio platform.
