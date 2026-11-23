# Preservation refactor

This is the historical implementation report. The current source acceptance,
corrections and evidence limitations are in [acceptance-review.md](acceptance-review.md).
verification.json now records that review; counts below describe the earlier run.

## Baseline and plan

The checkout has no applicable AGENTS.md. Existing npm/package-lock, React Router
browser-router mode, feature modules and shared/components/ui are authoritative.
The pre-existing package-lock.json modification is preserved. No deployment,
reset, data import or live mutation is part of this work.

Before implementation: typecheck, ESLint, Vitest, Prettier and production build
all passed (logs in /private/tmp/baytfolio-baseline-*.log).

Files initially over 150 physical lines:

| File                                                                  | Lines |
| --------------------------------------------------------------------- | ----: |
| src/index.css                                                         |   411 |
| src/shared/components/ui/field.tsx                                    |   246 |
| src/shared/components/ui/select.tsx                                   |   190 |
| src/modules/cms/components/help-center/help-center-pagination.tsx     |   164 |
| src/modules/cms/components/help-center/help-center-table.tsx          |   152 |
| src/modules/cms/components/help-center/add-question-modal.tsx         |   325 |
| src/modules/showroom-join-requests/api/showroom-join-requests.mock.ts |   313 |

Implementation order: capture route/state baselines, split styles and compound
UI implementations, centralize remaining colors, introduce native-compatible
local UI adapters, extract CMS rows/pagination and mock fixtures, enforce limits
in CI, run checks and compare the exact same browser harness.

## Screen and contract inventory

Public routes: / (home), /login, /forgot-password, /verify-otp,
/reset-password. Admin children: /dashboard, /analytics, /users,
/users/:userId, /showrooms, /showrooms/:showroomId, /cms,
/cms/help-center, /cms/contact-information, /cms/privacy-policy,
/cms/terms-and-conditions, /showroom-join-requests,
/showroom-join-requests/:requestId, /showroom-join-requests/:requestId/setup.
The wildcard remains the not-found page. No URL migration is authorized.
The duplicate root routes and existing links/redirects remain intact.

Data is local typed mock data. Authentication is frontend-only; no actual
permission guard or authenticated backend is available to validate. Axios,
Zustand and Motion are declared but not used in the current feature workflows.
Keep this behavior; do not introduce auth or transport as part of refactoring.

Arabic RTL is the application direction. CMS editors contain Arabic/English
content tabs and LTR field islands. The existing .dark selector is retained;
there is no application theme switcher or global locale switcher.
Fonts remain Inter Variable and Noto Sans Arabic with unchanged imports.

URL ownership stays with nuqs: dashboard period/startDate/endDate/v;
users search/status/loginMethod/sortOrder/page/pageSize;
showrooms search/activity/showroomStatus/contractStatus/sort/page/pageSize;
join requests search/status/activityType/date/sortOrder/page/pageSize and wizard step;
help center search/category/status/page/pageSize. Existing parsers, defaults,
history options, query keys and invalidations are not migrated.
CMS localStorage keys and serialization remain unchanged.

## Coverage checklist

- [x] Inspect routes, providers, UI foundation, CI, tests and storage.
- [x] Run all five existing checks before changes.
- [x] Capture same fixtures at 390, 768 and 1440 pixels, device scale 1.
- [x] Compare all reachable routes, missing records, empty searches, dark scope.
- [x] Compare Help Center modal, content language tabs and form validation.
- [x] Verify native controls, keyboard focus, links and URL back/forward.
- [x] Run final typecheck/lint/tests/format/build/line limit.

Base UI Button and Radix Select/Label/Separator coexist in the current local
shadcn layer. Preserve their implementations. Native behavior adapters will be
explicitly documented as custom adapters rather than official shadcn primitives.

## Implementation and naming map

The existing feature-first boundaries were sound and are retained. No public
pathname, parameter, hash, route nesting, router mode or redirect was renamed.
No URL migration is proposed in this change.

| Before                                          | After / responsibility                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| field.tsx implementation                        | field-layout.tsx, field-label.tsx, field-error.tsx; field.tsx preserves exports                              |
| select.tsx implementation                       | select-root.tsx, select-content.tsx, select-item.tsx, select-scroll.tsx; select.tsx preserves exports        |
| HelpCenterTable inline row                      | HelpCenterQuestionRow / help-center-question-row.tsx                                                         |
| HelpCenterPagination local page-number function | shared/utils/pagination.ts; users/utils/pagination.ts preserves exports                                      |
| HelpCenterPage modal state and save callbacks   | useHelpQuestionDialog / use-help-question-dialog.ts                                                          |
| Standalone modal inline state and fields        | useStandaloneQuestionForm and standalone-question-{metadata,language,text-fields}                            |
| One join-request fixture array                  | incoming, agreement, followup and finalized fixture groups, composed in original order                       |
| index.css declarations                          | theme-foundations, theme-auth-users, tokens-foundations, tokens-auth-users, control-tokens and base partials |

The two existing question modal entry points intentionally remain distinct.
The nested add-question/add-question-modal.tsx is the currently routed modal.
The standalone add-question-modal.tsx has different copy, defaults, scrollbar
behavior and styling; its export and behavior are preserved separately.

All native buttons, inputs and labels now consume the canonical local Button,
Input and Label via explicit native-compatible `unstyled` mode. The existing
Base UI and Radix styled paths remain unchanged. That mode preserves implicit
submit types, browser focus, checkbox/date/OTP behavior, refs and authored
classes rather than adding new default spacing, SVG dimensions or key handling.
Textarea and the class-neutral Table compound API are custom compatibility
adapters in the same UI layer, not official generated shadcn components.
Existing overflow containers, table markup and the table engines are unchanged.

## Token mapping

Existing tokens retain their original values and theme scopes. Remaining fixed
Tailwind colors were resolved from this installation's tailwindcss/theme.css:

| Original usage                          | Semantic token             | Exact value                    |
| --------------------------------------- | -------------------------- | ------------------------------ |
| text-white, bg-white and alpha variants | surface-white              | #fff                           |
| bg-black/50 modal overlay               | overlay (existing)         | #000000; original /50 retained |
| bg-blue-50 question category            | help-category-background   | oklch(97% 0.014 254.604)       |
| text-blue-700 question category         | help-category-foreground   | oklch(48.8% 0.243 264.376)     |
| hover:bg-emerald-50 activation          | help-reactivate-background | oklch(97.9% 0.021 166.113)     |
| text-emerald-700 activation             | help-reactivate-foreground | oklch(50.8% 0.118 165.612)     |

surface-white remains white in dark scope; mapping it to primary-foreground
would change the original dark rendering. All alpha suffixes remain unchanged.
Assets and runtime data are preserved. Theme/font imports, base reset, radius,
shadow values and the existing dark selector are unchanged.

## Reproduction and evidence

Reference commit: 39e1a00995494df1cc36790249b3fe6c1095bde5.
Screenshots were captured before source edits. The initial working tree contained
only the user's package-lock.json modification. Its original diff was retained.

The browser scripts accept PLAYWRIGHT_PACKAGE (absolute package.json path for
an installed Playwright) and CHROMIUM_PATH (matching Chromium executable).
They use isolated contexts, scale 1, en-US browser locale, Africa/Cairo timezone,
fixed Date and the actual bundled fonts. Screenshot capture disables animations
in the harness only. A failed required font load now aborts the comparison.

Run the original/reference Vite server on 5174 and current server on 5173.
The reference server needs filesystem read access to its node_modules when those
are symlinked outside its root; otherwise Vite rejects font requests with 403.
This temporary-server allowance is not added to the application configuration.

- `node scripts/visual-baseline.mjs <output-directory>`: all route baselines.
- `node scripts/compare-visuals.mjs <before> <after> <report.json>`: exact decoded PNG and state comparison, exits nonzero on any difference.
- `node scripts/compare-interactions.mjs`: menu hover/focus, mobile navigation,
  custom range, URL filtering/refresh, row navigation/back, wizard steps,
  English editors, question validation/create/edit/reset/persistence,
  checkbox validation and six-digit OTP paste/focus.
- `node scripts/verify-raster-repeatability.mjs`: repeat seven flagged captures
  against unchanged source and compare captured #root element properties.
- `npm run check:lines`: authored code/config/CSS limit. npm's generated
  package-lock.json and build/dependency/coverage directories are excluded.
  Both a 151-line failure and an exact 150-line pass were verified.

Baseline artifacts: /private/tmp/baytfolio-before and baytfolio-after.
Interaction artifacts: /private/tmp/baytfolio-interactions and
/private/tmp/baytfolio-interactions-software.
Raster-repeat artifacts: /private/tmp/baytfolio-raster.
These are local verification artifacts; nothing was published or deployed.

DialogSurface, PopoverPanel and SheetSurface are also explicitly custom local
compatibility adapters. They preserve the original portal/backdrop policy and
non-modal menu behavior. Sheet children stay mounted while closed and retain
the original transform/opacity transitions. No new focus trap, Escape handler,
scroll lock or dismissal behavior was introduced. Both dialog entry points have
contract tests for Arabic validation, trimming, defaults and backdrop dismissal.

Unavailable coverage: actual backend authentication, permission-dependent
server responses and real API mutation/loading/error behavior cannot be tested
against this mock-only application. Immediate local mock queries do not provide
a reproducible network-error fixture. These integrations were not claimed as
verified or changed. The existing oversized-bundle build warning remains.

## Final checks

| Check            | Before                       | After                                      |
| ---------------- | ---------------------------- | ------------------------------------------ |
| TypeScript       | PASS                         | PASS                                       |
| ESLint           | PASS                         | PASS                                       |
| Vitest           | 22 tests / 10 files          | 28 tests / 12 files, default npm test PASS |
| Prettier         | PASS                         | PASS                                       |
| Production build | PASS, existing chunk warning | PASS, same warning category                |
| 150-line check   | 7 oversized source files     | PASS, largest maintained source 146 lines  |

The final source adds native-form and both-dialog contract tests. A concurrent
run timed out under browser/test-worker load; a two-worker rerun passed, and
the final default `npm test` also passed. No test timeout was relaxed.

The original 162-image matrix had 155 exact matches and seven small raster
differences, with identical route/control snapshots throughout. All seven
flagged states subsequently matched exactly against the unchanged reference
server, including captured #root element properties. Portal appearance was
compared by PNG; those portal elements were outside that style collector. One repeated
original capture itself varied by 18 edge pixels; the after image matched the
other original repeat exactly. No pixel tolerance was used to mark a pass.

The interaction run captured 65 states per version (130 captures), with zero
scenario errors and 65/65 identical text, field, focus and URL snapshots.
Hardware-rendered images had 56/65 exact matches; remaining differences are
retained in baytfolio-interaction-comparison.json, rather than hidden by a
threshold. The software-rendered repetition is recorded separately.

Sonner's singleton toast API now has a shared/lib/toast.ts entry point, with
its Toaster behind the local UI layer. Message text and provider options remain
unchanged. No application preset, route, dependency version or product workflow
was migrated. The user's pre-existing lockfile diff remains 31 additions and
56 deletions. Nothing was committed, pushed, published or deployed.

The sidebar also contains existing links to /categories, /reviews-reports,
/promotions, /commercial-accounts, /admin-users, /settings and /activity-log.
Those paths have no dedicated route in this checkout and retain the wildcard
not-found behavior. User detail links retain prefix-active navigation; other
sidebar links retain their existing `end` matching. No ScrollRestoration or
new redirect was introduced. Existing global smooth scrolling is preserved.

Static preservation checks additionally confirmed all 145 original root token
values, all 157 original theme mappings, and every join-request record/history
and its array order against the reference source. These checks use exact values,
not palette approximations. Native controls and low-level primitive imports
are confined to the canonical UI layer and the shared Sonner API entry point.

The final software-rendered interaction matrix has 63/65 exact PNG matches
and 65/65 identical observable-state snapshots, with zero scenario errors.
The two remaining captures (OTP paste/focus on desktop and the empty users
filter on mobile) were rechecked with frozen timers and CSS transition
endpoints stabilized in the harness only. Both PNGs and every captured computed
style then matched the unchanged reference exactly. An old repeat-comparison
report for the earlier 22/27-pixel run is stale relative to the final raw captures;
it is excluded as evidence in the acceptance review. No production timer,
transition duration, CSS value or motion behavior was changed for testing.

The additional reproduction is `node scripts/verify-interaction-repeatability.mjs`.
Its artifacts are in /private/tmp/baytfolio-interaction-repeat. Raw non-matching
first-pass screenshots remain available alongside the exact repeat results.
The final checks and coverage counts are also saved in verification.json.
