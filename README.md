# BaytFolio Admin Frontend

The frontend foundation for the BaytFolio admin dashboard, built with React, TypeScript, Vite, and Tailwind CSS v4.

## Overview

This project contains the current frontend implementation for the BaytFolio admin dashboard.

It includes application routing, shared providers and UI primitives, an Arabic authentication UI, local form validation, component tests, and code quality tooling.

The authentication screens are not connected to backend services yet. API calls, session management, email delivery, OTP verification, and password updates remain future integration work.

## Tech Stack

- **React 19** — UI development.
- **TypeScript** — Static typing and type checking.
- **Vite** — Development server and production build.
- **React Router** — Client-side routing.
- **Tailwind CSS v4** — Utility-first styling.
- **shadcn/ui with Base UI** — UI component foundation.
- **TanStack Query** — Server-state management.
- **Axios** — HTTP client.
- **Zustand** — Client-state management.
- **React Hook Form** — Form management.
- **Zod** — Schema validation.
- **Sonner** — Toast notifications.
- **Lucide React** — Icons.
- **Vitest** — Unit and component testing.
- **React Testing Library** — Component testing utilities.
- **ESLint** — Code linting.
- **Prettier** — Code formatting.
- **Husky and lint-staged** — Git pre-commit tooling.

## Requirements

- **Node.js:** Version 24 or a version supported by the installed dependencies.
- **npm:** Use a version compatible with your Node.js installation. Use `npm ci` to install dependencies from the lockfile.

Verify your installed versions with:

```bash
node --version
npm --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd baytfolio-admin-front
```

Replace `<repository-url>` with the repository URL provided by the team.

### 2. Install dependencies

```bash
npm ci
```

### 3. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

### 4. Build for production

```bash
npm run build
```

This command runs TypeScript project checks and generates the production build.

### 5. Preview the production build

```bash
npm run preview
```

## Available Scripts

| Command                | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Starts the Vite development server.                        |
| `npm run build`        | Runs TypeScript project checks and builds the application. |
| `npm run typecheck`    | Runs TypeScript project checks independently.              |
| `npm run lint`         | Runs ESLint.                                               |
| `npm run test`         | Runs Vitest tests once.                                    |
| `npm run test:watch`   | Runs Vitest in watch mode.                                 |
| `npm run format`       | Formats project files with Prettier.                       |
| `npm run format:check` | Checks formatting without modifying files.                 |
| `npm run preview`      | Previews the production build locally.                     |
| `npm run prepare`      | Initializes Husky after dependencies are installed.        |

## Project Structure

```text
src/
├── app/
│   ├── pages/
│   │   ├── home-page.tsx
│   │   └── not-found-page.tsx
│   ├── providers/
│   │   ├── app-providers.tsx
│   │   └── app-providers.test.tsx
│   ├── app.tsx
│   ├── router.tsx
│   └── router.test.tsx
├── assets/
│   ├── icons/
│   │   └── auth-shield-user.svg
│   └── index.ts
├── modules/
│   └── auth/
│       ├── components/
│       │   ├── auth-brand.tsx
│       │   ├── auth-card.tsx
│       │   ├── auth-layout.tsx
│       │   ├── forgot-password-form.tsx
│       │   ├── login-form.tsx
│       │   ├── otp-verification-form.tsx
│       │   ├── otp-verification-form.test.tsx
│       │   ├── reset-password-form.tsx
│       │   └── reset-password-form.test.tsx
│       ├── pages/
│       │   ├── forgot-password-page.tsx
│       │   ├── login-page.tsx
│       │   ├── reset-password-page.tsx
│       │   └── verify-otp-page.tsx
│       └── schemas/
│           ├── forgot-password.schema.ts
│           ├── login.schema.ts
│           ├── otp-verification.schema.ts
│           └── reset-password.schema.ts
├── shared/
│   ├── api/
│   ├── components/
│   │   ├── common/
│   │   └── ui/
│   │       ├── arrow-icon.tsx
│   │       ├── button.tsx
│   │       ├── field.tsx
│   │       ├── index.ts
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── separator.tsx
│   ├── config/
│   │   └── query-client.ts
│   ├── constants/
│   ├── hooks/
│   ├── types/
│   └── utils/
│       └── cn.ts
├── test/
│   └── setup.ts
├── index.css
└── main.tsx
```

Some shared directories are prepared for future implementation and may remain empty until their corresponding functionality is needed.

## Authentication UI

The router currently exposes these authentication pages:

| Route              | Page             | Current behavior                                                                    |
| ------------------ | ---------------- | ----------------------------------------------------------------------------------- |
| `/login`           | Login            | Local form validation; submit values are logged only.                               |
| `/forgot-password` | Forgot Password  | Local email validation; no email is sent.                                           |
| `/verify-otp`      | OTP Verification | Six-digit input, paste/focus handling, and countdown; no OTP is verified or resent. |
| `/reset-password`  | Reset Password   | Local password validation; no password or reset token is sent to a service.         |

The forms use React Hook Form with Zod schemas. The recovery, OTP, and reset flows display an explicit unavailable-service message after submission. No authentication API client, endpoint, session storage, or backend integration is configured in the current codebase.

## Architecture

- **`app/`** — Application-level routing, pages, and providers.
- **`modules/`** — Feature-specific modules. The current `auth` module owns the authentication pages, forms, schemas, and related tests.
- **`shared/`** — Reusable components, configuration, API utilities, and helpers.
- **`assets/`** — Static assets used by the application.
- **`test/`** — Shared test setup and utilities.

## Module Architecture

Feature-specific code belongs in `src/modules/`. Each module should own its related components, hooks, API functions, schemas, types, and utilities when needed.

Shared functionality that is genuinely reusable across multiple modules belongs in `src/shared/`.

### Public API

A module should expose only the functionality that other modules are expected to consume through its `index.ts` entry point.

Example:

```text
modules/
└── example/
    ├── components/
    ├── hooks/
    ├── api/
    ├── schemas/
    ├── types/
    ├── utils/
    └── index.ts
```

The `index.ts` file acts as the module's public API. Consumers should import from that entry point instead of reaching into another module's internal files.

### Import Boundaries

- Keep module implementation details private to their owning module.
- Import cross-module functionality through the exporting module's `index.ts`.
- Put reusable application-wide functionality in `src/shared/`.
- Avoid circular dependencies between modules.
- Keep application routing and provider configuration in `src/app/`.

## Quality Checks

Run the following commands before submitting changes:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Run `npm run format` to apply Prettier formatting when necessary.

All checks should pass before a pull request is considered ready for review.

## Testing

Unit and component tests are implemented with Vitest and React Testing Library.

Run the test suite with:

```bash
npm run test
```

Use watch mode during development:

```bash
npm run test:watch
```

End-to-end testing can be added with Playwright when the corresponding test files and configuration are available.

## Git Workflow

Use descriptive commit messages that reflect the purpose of the changes.

Example:

```bash
git add README.md
git commit -m "docs: align README with project configuration"
git push origin starter
```

The pre-commit hook runs Husky, lint-staged, and the TypeScript typecheck described in [Git Hooks](#git-hooks). Do not bypass the hook when committing changes.

## Scope

This stage focuses on the frontend foundation:

- Application routing, the home and not-found pages, and the authentication routes.
- Shared application providers.
- TanStack Query configuration.
- UI component setup.
- TypeScript and Vite configuration.
- Testing infrastructure.
- Code formatting and linting tools.

The current scope includes the implemented authentication UI and local validation. Backend authentication, account sessions, email/OTP delivery, password-reset token handling, and other business logic are not implemented yet.

## Git Hooks

Husky runs the following commands from `.husky/pre-commit`:

```text
npx lint-staged
npm run typecheck
```

lint-staged runs ESLint with `--fix` followed by Prettier on staged JavaScript and TypeScript files. It runs Prettier on staged JSON, CSS, Markdown, and HTML files. The commands use the Node entrypoints below instead of the Windows `.cmd` shims:

```text
node ./node_modules/eslint/bin/eslint.js --fix
node ./node_modules/prettier/bin/prettier.cjs --write
```

This keeps the pre-commit hook enabled and avoids the Windows child-process hang caused by invoking the bare executable shims.

## License

Internal project. Refer to the repository owner for licensing and distribution requirements.
