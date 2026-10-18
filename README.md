# BaytFolio Admin Frontend

The frontend foundation for the BaytFolio admin dashboard, built with React, TypeScript, Vite, and Tailwind CSS v4.

## Overview

This project establishes the initial frontend architecture and development environment for the BaytFolio admin dashboard.

It provides the foundational setup for application routing, shared providers, UI components, testing, and code quality tooling.

Product features and backend integration are outside the scope of this foundation stage.

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

- Node.js version compatible with the project's declared engine requirements.
- npm version compatible with the project's declared engine requirements.

Check the `engines` field in `package.json` for the exact supported versions.

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

| Command                | Description                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run dev`          | Starts the Vite development server.                                                             |
| `npm run build`        | Runs TypeScript project checks and builds the application.                                      |
| `npm run preview`      | Previews the production build locally.                                                          |
| `npm run lint`         | Runs ESLint.                                                                                    |
| `npm run lint:fix`     | Automatically fixes supported ESLint issues, if configured.                                     |
| `npm run typecheck`    | Runs TypeScript project checks independently.                                                   |
| `npm run test`         | Runs Vitest tests once.                                                                         |
| `npm run test:watch`   | Runs Vitest in watch mode.                                                                      |
| `npm run format`       | Formats project files with Prettier.                                                            |
| `npm run format:check` | Checks formatting without modifying files.                                                      |
| `npm run check`        | Runs the configured formatting, linting, type checking, tests, and build checks, if configured. |

Only use commands that are defined in `package.json`.

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
├── modules/
├── shared/
│   ├── api/
│   ├── components/
│   │   ├── common/
│   │   └── ui/
│   │       └── button.tsx
│   ├── config/
│   │   └── query-client.ts
│   └── utils/
│       └── cn.ts
├── test/
│   └── setup.ts
├── index.css
└── main.tsx
```

The structure above describes the intended organization of the frontend foundation. Some directories may remain empty until their corresponding features are implemented.

## Architecture

- **`app/`** — Application-level routing, pages, and providers.
- **`modules/`** — Feature-specific modules as the application grows.
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

Examples:

```bash
git add .
git commit -m "chore: update frontend foundation"
git push origin starter
```

The project includes Husky and lint-staged for pre-commit tooling. The exact checks performed before each commit depend on the current hook configuration.

## Scope

This stage focuses on the frontend foundation:

- Application routing and the not-found page.
- Shared application providers.
- TanStack Query configuration.
- UI component setup.
- TypeScript and Vite configuration.
- Testing infrastructure.
- Code formatting and linting tools.

Feature-specific UI, business logic, and backend integration will be implemented in subsequent development stages.

## License

Internal project. Refer to the repository owner for licensing and distribution requirements.
