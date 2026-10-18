# BaytFolio Admin Frontend

The frontend foundation for the BaytFolio admin dashboard, built with React, TypeScript, Vite, and Tailwind CSS v4.

## Overview

This project establishes the initial frontend architecture and development environment for the BaytFolio admin dashboard.

It includes application routing, shared providers, UI component configuration, testing, and code quality tooling. Product features and backend integration are outside the scope of this foundation stage.

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
- **React Hook Form and Zod** — Form management and validation.
- **Sonner** — Toast notifications.
- **Lucide React** — Icons.
- **Vitest and Testing Library** — Testing.
- **ESLint and Prettier** — Code quality and formatting.
- **Husky and lint-staged** — Pre-commit checks.

## Requirements

- Node.js compatible with the installed Vite version.
- npm.

Use the Node.js version supported by the project's installed dependencies. Check the official Vite documentation if you need to verify version compatibility.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

## Available Scripts

| Command                | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Starts the development server.                             |
| `npm run build`        | Runs TypeScript project checks and builds the application. |
| `npm run preview`      | Previews the production build.                             |
| `npm run lint`         | Runs ESLint.                                               |
| `npm run test`         | Runs tests once with Vitest.                               |
| `npm run test:watch`   | Runs Vitest in watch mode.                                 |
| `npm run format`       | Formats supported project files with Prettier.             |
| `npm run format:check` | Checks formatting without modifying files.                 |

## Project Structure

```text
src/
├── app/
│   ├── pages/
│   ├── providers/
│   ├── router.tsx
│   └── styles.css
├── assets/
├── modules/
├── shared/
│   ├── api/
│   ├── components/
│   │   ├── common/
│   │
```
