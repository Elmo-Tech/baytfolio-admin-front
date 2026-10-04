# Auth demo — Vendor and Admin

The user approved a frontend-only demonstration for both dashboard audiences on 4 October 2026. All types, fixtures, and service operations in this module are demo examples, not approved Laravel API contracts.

## Implemented flows

- Email/password login for all three Vendor and five Admin roles.
- No public registration. Vendor invitation acceptance uses a seeded invite for an already activated example organization; Admin accounts are seeded internally.
- Wrong credentials, disabled membership, and inactive organization feedback.
- Query-backed session bootstrap, guest-only auth pages, protected routes, and Vendor/Admin scope separation.
- Logout and simulated/automatic expiry clear the private query cache and preserve a safe local return path. External URLs, encoded slash/backslash tricks, and auth redirect loops are rejected.
- Email recovery: request → demo verification code → new password/confirmation → login. Request feedback is identical for known/unknown addresses. No email is sent.
- Vendor invitation loading, invalid/expired/used feedback, password setup, and one-time acceptance.
- RTL Arabic forms with labels, accessible validation feedback, show/hide password, pending/disabled states, password-manager autocomplete, and reduced-motion loading feedback.
- Lazy-loaded auth pages. No dashboard sidebar, product feature, role/permission matrix, or customer auth has been added.

## Demo accounts

All initial passwords are `DemoPass123!`.

| Audience | Role                 | Email                      |
| -------- | -------------------- | -------------------------- |
| Vendor   | Owner                | `owner@vendor.example`     |
| Vendor   | Manager              | `manager@vendor.example`   |
| Vendor   | Content Editor       | `editor@vendor.example`    |
| Admin    | Super Admin          | `super@admin.example`      |
| Admin    | Moderator            | `moderator@admin.example`  |
| Admin    | Content / CMS Admin  | `content@admin.example`    |
| Admin    | Commercial Admin     | `commercial@admin.example` |
| Admin    | Support / Operations | `support@admin.example`    |

Failure examples: `suspended@vendor.example` represents an inactive organization; `disabled@vendor.example` represents a disabled team member. The initial password is the same.

Recovery code: `123456`. Vendor invitation: `/invite/vendor-demo-invite`; invited address: `invited@vendor.example`; role: Content Editor. After acceptance, use the password selected in the invitation form.

Only fictitious credentials should be entered. In-memory service state and password changes disappear on a full refresh; sessions also disappear on refresh. Route navigation preserves them within the current tab. Tabs are independent. This is intentional demonstration behavior, not a final browser session strategy.

## Proposed examples

These values are demonstration choices, not PRD/backend rules:

| Demo setting             | Example                                       |
| ------------------------ | --------------------------------------------- |
| Session lifetime         | 20 minutes                                    |
| Recovery code lifetime   | 5 minutes                                     |
| Invitation lifetime      | 30 minutes from app startup                   |
| New password validation  | At least 8 characters + matching confirmation |
| Simulated response delay | 150 milliseconds                              |

Login only checks email format and a non-empty password; it preserves the exact password and does not apply the new-password policy to existing credentials. Laravel must define production password rules, recovery flow, revocation, session persistence, delivery, rate limits, and MFA policy.

Example frontend session model:

```ts
{
  user: {
    id: 'vendor-owner',
    email: 'owner@vendor.example',
    name: 'مالك المعرض',
    scope: 'vendor',
    role: 'Owner',
  },
  expiresAt: 0, // Actual demo value is a Unix time in milliseconds.
}
```

This is an internal view model, not an API response or token. No HTTP endpoints, bearer headers, refresh tokens, cookies, localStorage, or sessionStorage are implemented. The real Laravel API remains under `/api/v1` when its contract is approved. Frontend guards demonstrate navigation behavior; backend authorization and tenant isolation remain mandatory for actual protected data.

## Structure and package usage

```text
auth/
├── api/          # Stateful demo service, isolated from presentation, plus tests
├── components/   # Forms, frame, and route guards
├── constants/    # Fixture accounts and query keys
├── hooks/        # React Query session/mutations
├── pages/        # Login, recovery, invitation, session demonstration
├── providers/    # Service injection and query-cache synchronization
├── schemas/      # Zod login/recovery/invitation validation
├── types/        # Explicit demo view models
├── utils/        # Safe return path and controlled error messages
└── index.ts      # Public infrastructure exports
```

React Hook Form + `zodResolver` handle form state/validation using the [official resolver integration](https://github.com/react-hook-form/resolvers). TanStack React Query handles the asynchronous demo session and mutations; credentials are not mirrored into Zustand. Mutations do not retry. New-password/invitation/login mutation state is reset after completion. Context injects the service, rather than duplicating session state. Sonner handles logout feedback; inline messages handle form errors. Tailwind/shared neutral tokens and Lucide handle styling/icons. No new dependencies were added.

## Verification

Unit/component coverage: all approved roles, inactive access, invalid credentials, session lifetime, private cache clearing, recovery verification/expiration/consumption, invitations, form validation/pending state, exact password preservation, and redirect safety.

Browser coverage: login/logout and scope separation for every role, expiry/return context, refresh behavior, password recovery, invitation acceptance, invalid credentials/inactive organizations, safe redirects, and 404.

Run `npm run check` and `npm run test:e2e` from the application root. See root README for setup. Auth mechanism/MFA decisions and Laravel request/response definitions are intentionally still awaiting the backend team; the demo itself is complete.

## Validation results — 4 October 2026

- Formatting, ESLint (zero warnings), TypeScript, and production build: passed.
- Vitest: 41 tests passed across 5 files, including the existing environment checks.
- Playwright Chromium: 13 tests passed across all eight roles and the auth workflows.
- Lazy loading removed the production chunk-size warning; the largest generated chunk is about 354 kB before gzip.
- `git diff --check`: passed. No package changes, source document changes, or backend calls.
