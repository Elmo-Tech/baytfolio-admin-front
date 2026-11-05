# BaytFolio Admin Frontend

## Project Overview

BaytFolio Admin Frontend is a React single-page application for the BaytFolio administration interface. It currently provides Arabic, right-to-left authentication screens, an admin application shell, and a Users Management interface.

The project is a frontend foundation. Authentication and Users data are currently local/mock-based and are not connected to a production backend.

## Tech Stack

### Actively used

- React 19 and TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui-style shared components
- React Router 7
- nuqs for Users URL search parameters
- React Hook Form and Zod for authentication form validation
- Sonner for toast infrastructure
- Lucide React for icons
- Vitest, JSDOM, and React Testing Library

### Configured but not currently used for feature data

- TanStack React Query 5: the query client provider and development tools are configured, but no feature currently uses queries or mutations.

### Installed for future development

- Zustand: no store is currently implemented.
- Axios: no API client is currently implemented.
- Motion and other declared dependencies are available but are not part of the current application flows.

## Features and Current Modules

- **Admin App Shell:** responsive desktop sidebar, mobile sidebar drawer, header, breadcrumbs, notifications/profile menu UI, and RTL layout.
- **Authentication UI:** login, forgot password, OTP verification, and password reset pages with client-side validation.
- **Users Management:** mock user listing with search, status/login-method filters, registration-date sorting, reset controls, CSV export, and pagination.
- **User details:** detail view for a mock user with local-only account status interaction.
- **Shared UI:** Button, Input, Select, Field, Badge, PasswordInput, FormAlert, AsyncSubmitButton, Separator, and related primitives.

Authentication submissions are placeholders. The Users listing and statistics use data from `src/modules/users/api/users.mock.ts`; updates are not persisted.

## Routes

| Route              | Current implementation            |
| ------------------ | --------------------------------- |
| `/`                | Dashboard foundation home page    |
| `/login`           | Login form                        |
| `/forgot-password` | Password recovery form            |
| `/verify-otp`      | OTP entry and resend-countdown UI |
| `/reset-password`  | Password reset form               |
| `/users`           | Users Management listing          |
| `/users/:userId`   | Mock user details                 |
| `*`                | Not-found page                    |

The sidebar also displays navigation destinations that do not yet have matching routes or feature modules.

## Project Structure

```text
src/
├── app/
│   ├── components/       # Admin header and sidebar
│   ├── layouts/          # Admin layout and responsive shell
│   ├── pages/            # Home and not-found pages
│   ├── providers/        # Query client, toaster, and devtools providers
│   └── routes/           # Public and admin route definitions
├── assets/               # Logos and authentication artwork
├── modules/
│   ├── auth/             # Auth pages, forms, and Zod schemas
│   └── users/            # Users pages, components, types, and mock data
├── shared/
│   ├── components/ui/    # Reusable UI primitives
│   ├── config/           # Shared configuration
│   └── utils/            # Shared utilities
├── test/                 # Vitest setup
├── index.css             # Global styles and design tokens
└── main.tsx              # Application entry point
```

The `@/*` alias resolves to `src/*`.

## Design System

- `src/index.css` is the central Tailwind CSS v4 theme and design-token file.
- Semantic tokens cover App Shell, authentication, Users, dashboard text, status colors, surfaces, borders, and shadows.
- Shared UI components are built on the project’s shadcn/ui configuration in `components.json`.
- RTL support is enabled in the shadcn configuration and applied throughout the Arabic UI.
- Inter and Noto Sans Arabic variable fonts are loaded for Latin and Arabic text.

## Getting Started

Prerequisites: a Node.js and npm version compatible with the checked-in lockfile. The project does not declare a Node.js `engines` requirement.

```bash
npm ci
npm run dev
```

To build and preview the production bundle:

```bash
npm run build
npm run preview
```

No environment variables are currently required by the application.

## Available Scripts

| Command                | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `npm run dev`          | Start the Vite development server.                              |
| `npm run build`        | Run TypeScript build checks and create a Vite production build. |
| `npm run typecheck`    | Run the TypeScript project build without bundling.              |
| `npm run lint`         | Run ESLint.                                                     |
| `npm run test`         | Run the Vitest suite once.                                      |
| `npm run test:watch`   | Run Vitest in watch mode.                                       |
| `npm run format`       | Format the repository with Prettier.                            |
| `npm run format:check` | Check repository formatting with Prettier.                      |
| `npm run preview`      | Serve the built application with Vite preview.                  |
| `npm run prepare`      | Run Husky setup after installation.                             |

## Testing

Vitest uses a JSDOM environment and `src/test/setup.ts`. The current suite contains five test files and eleven tests covering routing, providers, OTP interactions, password reset behavior, and Users URL parameter parsing.

There is no coverage script or coverage configuration.

## Current Development Status

Implemented:

- Responsive admin shell and RTL navigation UI.
- Client-side authentication forms and validation.
- Users filtering, sorting, URL-backed search state, pagination, CSV export, and detail UI.
- Shared UI primitives and centralized design tokens.

Future work:

- Connect authentication and Users features to backend APIs.
- Implement production authentication, sessions, authorization, and protected admin routes.
- Replace mock Users data and local status updates with server state.
- Add the unfinished dashboard and sidebar destinations.
- Expand interaction and feature test coverage.

The application currently builds and has a passing test suite. TanStack Query is ready for future server-state integration, while Zustand and Axios remain installed but unused in the current source.
