# BaytFolio Admin Frontend

The frontend foundation for the BaytFolio admin dashboard, built with React, TypeScript, Vite, and Tailwind CSS v4.

## Overview

This project establishes the initial frontend architecture and development environment for the BaytFolio admin dashboard.

It provides the foundational setup for application routing, shared providers, UI components, testing, and code quality tooling.

Product features and backend integration are outside the scope of this foundation stage.

## Tech Stack

- **React 19** — UI development.
- **TypeScript** — Static typing with strict type checking.
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
npm install
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

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Runs TypeScript project checks and builds the application. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint. |
| `npm run lint:fix` | Automatically fixes supported ESLint issues. |
| `npm run typecheck` | Runs TypeScript project checks independently. |
| `npm run test` | Runs Vitest tests once. |
| `npm run test:watch` | Runs Vitest in watch mode. |
| `npm run test:e2e` | Runs Playwright end-to-end tests. |
| `npm run test:e2e:ui` | Opens the Playwright UI test runner. |
| `npm run format` | Formats project files with Prettier. |
| `npm run format:check` | Checks formatting without modifying files. |
| `npm run check` | Runs the configured formatting, linting, type checking, tests, and build checks. |

**Note:** The `typecheck`, `lint:fix`, `test:e2e`, `test:e2e:ui`, and `check` commands must exist in `package.json` for these commands to work.

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
├── App.tsx
├── index.css
└── main.tsx
```

The structure above describes the intended organization of the frontend foundation. Some directories may remain empty until their corresponding features are implemented.

### Architecture

- **`app/`** — Application-level routing, pages, and providers.
- **`modules/`** — Feature-specific modules as the application grows.
- **`shared/`** — Reusable components, configuration, API utilities, and helpers.
- **`assets/`** — Static assets used by the application.
- **`test/`** — Shared test setup and utilities.

## Code Quality

Before submitting changes, run the relevant checks:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Run `npm run format` to apply Prettier formatting when necessary.

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

End-to-end tests use Playwright when corresponding test files and configuration are available.

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
