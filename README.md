# BaytFolio Admin Frontend

BaytFolio Admin Frontend is a React single-page application for the BaytFolio administration interface. The current implementation provides Arabic, right-to-left authentication screens and a Users Management interface, including locally mocked user data and client-side interactions.

This repository is a frontend foundation. It does not currently connect to a backend service, and its authentication and user-management data are not production data.

## Current status

Implemented:

- Public home and not-found pages.
- Arabic, RTL authentication screens with local form validation.
- An admin shell with desktop navigation and a mobile sidebar drawer.
- Users listing and user-details pages backed by local mock data.
- Client-side search, filters, registration-date sorting, pagination controls, and CSV export for users.
- Vitest and React Testing Library tests for the app router, providers, OTP form, and reset-password form.

Not implemented or not connected:

- Backend API integration, including a shared API client or endpoint calls.
- Authentication, sessions, authorization, email delivery, OTP verification/resend, and password-reset completion.
- Persistent user updates. The status action on a user detail page changes local component state only.
- The other sidebar destinations; they are navigation items without matching application routes at present.

## Technology

The application is built with:

- [React](https://react.dev/) 19 and TypeScript.
- [Vite](https://vite.dev/) 8 with `@vitejs/plugin-react`.
- [React Router](https://reactrouter.com/) 7 for browser routing.
- [Tailwind CSS](https://tailwindcss.com/) 4, configured through the Vite plugin, with `tw-animate-css` and shadcn styling support.
- [TanStack Query](https://tanstack.com/query) and its development tools. The shared query client is configured with one retry and no refetch on window focus; no feature currently fetches server data.
- React Hook Form, Zod, and `@hookform/resolvers` for authentication-form validation.
- Sonner for the application toast provider, Lucide React for icons, and Geist Variable for typography.
- Vitest, JSDOM, and React Testing Library for tests.
- ESLint, Prettier, Husky, and lint-staged for code quality and Git hooks.

`axios` and `zustand` are declared dependencies, but the current source tree does not contain an API client or Zustand store that uses them.

## Prerequisites

Use Node.js and npm versions compatible with the checked-in `package-lock.json`. The repository does not declare a Node `engines` version.

```bash
node --version
npm --version
```

## Setup

```bash
git clone <repository-url>
cd baytfolio-admin-front
npm ci
npm run dev
```

Vite prints the local development URL after starting. To create and preview a production build:

```bash
npm run build
npm run preview
```

## Environment variables

No `.env` files, environment-variable documentation, or `import.meta.env` application configuration are present in this repository. No environment variables are currently required for the documented setup.

## Scripts

All scripts below are defined in `package.json`.

| Command                | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Starts the Vite development server.                         |
| `npm run build`        | Runs `tsc -b` and creates a Vite production build.          |
| `npm run typecheck`    | Runs `tsc -b` without building application assets.          |
| `npm run lint`         | Runs ESLint over the project.                               |
| `npm run test`         | Runs the Vitest suite once.                                 |
| `npm run test:watch`   | Starts Vitest in watch mode.                                |
| `npm run format`       | Formats matched files with Prettier.                        |
| `npm run format:check` | Checks matched files with Prettier without writing changes. |
| `npm run preview`      | Serves the built application through Vite preview.          |
| `npm run prepare`      | Runs Husky's setup command after installation.              |

The tracked pre-commit hook runs `npx lint-staged` followed by `npm run typecheck`. lint-staged fixes staged JavaScript/TypeScript files with ESLint and Prettier, and formats staged JSON, CSS, Markdown, and HTML with Prettier.

## Architecture

The application uses a feature-oriented structure under `src/`.

```text
src/
├── app/
│   ├── components/          # Admin header and sidebar
│   ├── layouts/             # Admin layout with responsive sidebar behavior
│   ├── pages/               # Home and not-found pages
│   ├── providers/           # Query client, toaster, and query devtools providers
│   ├── app.tsx              # Application provider and router composition
│   └── router.tsx           # Browser router definition
├── assets/                  # BaytFolio logos and authentication artwork
├── modules/
│   ├── auth/                # Authentication pages, forms, schemas, and form tests
│   └── users/               # Users pages, components, types, and mock data
├── shared/
│   ├── components/ui/       # Reusable UI primitives
│   ├── config/              # Shared TanStack Query client
│   └── utils/               # Shared class-name utility
├── test/                    # Vitest setup
├── index.css                # Tailwind imports, theme tokens, and global styles
└── main.tsx                 # React entry point
```

### `app/`

`app/` owns application-wide composition: the React Router instance, `AppProviders`, shared admin chrome, top-level pages, and the `AdminLayout`. `main.tsx` mounts `App` inside React Strict Mode.

### `modules/`

`modules/` contains feature-specific code. `auth/` contains the authentication layouts, pages, React Hook Form components, Zod schemas, and component tests. `users/` contains the listing and detail experiences, presentation components, user types, and `api/users.mock.ts` local data.

### `shared/`

`shared/` holds reusable, cross-feature pieces currently present in the codebase: UI primitives, the TanStack Query client configuration, and the `cn` class-name utility.

The `@/*` TypeScript and Vite alias resolves to `src/*`.

## Routes and layouts

| Route              | Layout / page                                | Current behavior                                                                                              |
| ------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `/`                | `HomePage`                                   | Minimal dashboard-foundation landing page.                                                                    |
| `/login`           | Authentication layout / login page           | Validates email and password locally; submission currently logs form values in the browser console.           |
| `/forgot-password` | Authentication layout / forgot-password page | Validates an email address; submission displays an unavailable-service state.                                 |
| `/verify-otp`      | Authentication layout / OTP page             | Accepts a six-digit code with focus, paste, and resend-countdown interactions; no code is verified or resent. |
| `/reset-password`  | Authentication layout / reset-password page  | Validates password requirements and confirmation; submission displays an unavailable-service state.           |
| `/users`           | `AdminLayout` / users page                   | Users Management listing backed by local mock data.                                                           |
| `/users/:userId`   | `AdminLayout` / user-details page            | Shows a matching mock user or a local “user not found” state.                                                 |
| `*`                | `NotFoundPage`                               | Displays the application 404 page.                                                                            |

`AdminLayout` is RTL and provides the desktop sidebar at `lg` widths and above. On smaller widths it renders a mobile header with a menu control, overlay, and right-side drawer. The main content area renders the active child route through `Outlet`.

The sidebar visually includes additional operational and administrative destinations, but routes for those destinations are not defined in `src/app/router.tsx`; they should be treated as navigation placeholders rather than implemented modules.

## Implemented features

### Authentication UI

The authentication module includes login, password recovery, OTP verification, and password reset views. Its forms use React Hook Form and Zod for client-side validation. Password fields provide visibility toggles, and the OTP form supports individual-digit entry, paste, backspace focus movement, and a 47-second resend countdown.

These views are UI and validation only. No authentication provider, API request, token/session persistence, email delivery, or OTP/password-reset backend flow exists in the source tree.

### Users Management

The Users Management module is available at `/users` and has the following client-side behavior:

- Renders summary cards using `mockUsersStats`.
- Displays `mockUsers`, a static local sample dataset with masked contact details and user status/login-method fields.
- Searches the loaded mock records by name, email, or phone number.
- Filters by account status and login method.
- Sorts by registration date, newest or oldest first.
- Provides reset controls for the current search, filters, and sort selection.
- Paginates the filtered in-memory collection, with page-size controls for 10, 20, or 50 records; the initial page size is 20.
- Exports the currently filtered collection to a browser-generated UTF-8 CSV file named `baytfolio-users.csv`.
- Links each row to `/users/:userId`.

The detail page shows account data and an account-status card for the selected mock user. For an initially active user, the **block user** action changes that page's local state to suspended. It does not update `mockUsers`, make an API call, or persist after the page component is unmounted.

## Data and integration status

There is no implemented backend integration. `src/modules/users/api/users.mock.ts` is the Users module's current data source, and its separate aggregate statistics are also static mock values. The listing, filters, pagination, CSV export, and detail page operate only on this in-memory data.

The project includes a shared TanStack Query client provider and declares Axios and Zustand dependencies, but no API service, request layer, query hook, or Zustand store is currently implemented. Future work should replace mock data with a defined backend contract and add authentication/session handling before treating these screens as operational.

## Responsive design

The interface uses Tailwind responsive utilities. The users statistics grid changes from one column to two columns at `sm` and four columns at `xl`; its table keeps a minimum width and can scroll horizontally. The admin navigation is hidden below `lg` and becomes the dismissible mobile drawer described in [Routes and layouts](#routes-and-layouts).

## Testing and quality checks

Vitest is configured in `vite.config.ts` with a JSDOM environment, `src/test/setup.ts`, and automatic mock restoration. The current suite contains four test files and eight tests covering:

- Home and not-found routing.
- Rendering of application providers.
- OTP entry focus, paste, validation, and resend countdown behavior.
- Reset-password visibility toggles and validation feedback.

Run the suite with:

```bash
npm run test
```

The repository has no coverage script or coverage configuration, so no coverage percentage is available from the current tooling. The Users Management module has no test file at present.

Run the available quality checks with:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

## Next development work

The code supports a clear next step, but the following work is not implemented yet:

- Define and integrate backend APIs for authentication and users.
- Replace mock user records and aggregate statistics with server data.
- Add authorization and persistent session handling.
- Implement the sidebar destinations that do not yet have routes or feature modules.
- Add test coverage for the Users Management flow and any backend integration.

## License

Internal project. Refer to the repository owner for licensing and distribution requirements.
