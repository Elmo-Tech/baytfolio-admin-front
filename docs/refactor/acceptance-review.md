# Final refactor acceptance review

The current code passes the inspected preservation-refactor requirements and the
33 current browser scenarios, subject to the evidence limitations below. This is
not a backend or production-readiness approval. Review date: 2026-11-23.

## Source being accepted

Baseline commit `39e1a00995494df1cc36790249b3fe6c1095bde5` exists and remains HEAD.
All work is uncommitted. No applicable AGENTS.md was found in the checkout or
its ancestor locations. The pre-review source was copied before corrections;
each reference `src` file was verified against its recorded SHA-256.

- Current full source/tooling digest: `b812bbf253e2d6707dfb1fbb44e009e2b1bb666ff95abc164a55ceca14237e0d`.
- Application/config/test digest: `f04194f4f9d73d3a358afa79e20566ced0e2c52d9039d47f743af0fa1e99524e`.
- Manifest: `/private/tmp/baytfolio-acceptance/accepted-source.json` (429 files).
- Reproduce: `node scripts/source-snapshot.mjs <manifest-output.json>`.

The full digest includes src/assets, src/tests, verification scripts, structured
root config, CI and authored Husky hooks. The application digest omits scripts,
so a harness-only locator correction does not invalidate unchanged application
captures. Scope excludes docs/README, generated output/dependencies, .git and
Husky-generated stubs. Plain ignore configs are inspected and line-checked.

The primary browser run and gates preceded a harness-only locator fix. Their
application digest was recomputed from the saved manifest and matches the
accepted application exactly. Subsequent changes affected tooling/docs only.
The final manifest distinguishes that tooling revision explicitly.

## Requirement decisions

| Requirement                                               | Inspected evidence                                                                                                   | Result  | Correction                                                                                                                 | Remaining limitation                                                               |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Preserve the working tree and reference                   | Git HEAD/object, pre-review file manifest, lockfile SHA, source-proof.json                                           | PASS    | None to user changes                                                                                                       | Uncommitted working tree, not a published artifact                                 |
| Canonical UI and genuine consolidation                    | All local adapters/call sites; 118 exact presentation migrations checked with AST, native/form tests, browser styles | PASS    | Added typed existing-pattern presentations and shared language/return-link compositions                                    | Deliberate one-off visual composition remains in features                          |
| Focused domain logic throughout                           | 175-page/component inventory, 31 remaining hook files, schemas/API/utils/storage inspection                          | PASS    | Nine non-hook functions renamed/moved; showroom detail lookup/tab state and request browser actions moved to focused hooks | Mock-only transport; immediate navigation/print/event forwarding can stay in views |
| Meaningful internal route names                           | Router/route files, route components, navigation config and generated-ID usage                                       | PASS    | No rename needed; inventory below                                                                                          | Existing unimplemented sidebar destinations still reach wildcard                   |
| Exact centralized colors/theme                            | 145 root values and 157 mappings against Git baseline; dark/base CSS byte comparison; source scan                    | PASS    | No palette changes in this review                                                                                          | Assets are preserved data; no global locale switcher exists                        |
| Every applicable code file <=150 lines                    | Actual checker, formatted tree, ten 150/151 boundary fixture types                                                   | PASS    | Added extensionless authored hook, ignore config, .mts/.cts/.sh coverage                                                   | Generated npm lock/dependencies/build/coverage/Husky stubs excluded explicitly     |
| Current gates and affected behavior                       | Fresh typecheck/lint/default npm test/build/format/line gate; 33 state/style scenarios and repeat PNG evidence       | PASS    | Added selected-tab retention regression test                                                                               | Existing bundle-size warning remains; first-pass pixels are not all identical      |
| Historical measurements are accurately reported           | Recomputed original raw PNG/JSON comparisons and repeat directories                                                  | PASS    | Marked one stale comparison report and narrowed portal-style claim                                                         | Historical results have no capture-time source digest                              |
| Bind historical full matrix retroactively to current code | Previous verification.json/scripts/artifact metadata                                                                 | BLOCKED | New captures/gates have explicit current source identity                                                                   | A missing old capture-time manifest cannot be reconstructed as evidence            |
| Backend/production readiness                              | No HTTP transport, actual auth guard, server permissions or mutation integration                                     | BLOCKED | None, outside authorized scope                                                                                             | Real backend and permission-dependent responses are not verified                   |

## UI ownership and compatibility

Counts are authored JSX call sites outside local UI implementation/tests, not
runtime row counts. Styled Base UI/Radix paths remain as installed: Base UI
1.9.0 and radix-ui 1.8.1. No foundation migration or shadcn preset was applied.

| Control/adapter            | Implementation and usages                                           | Shared ownership / compatibility decision                                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button / AsyncSubmitButton | Base UI styled path or native unstyled path; 99 / 4 call sites      | Nine presentation patterns own recurring styles. Native mode retains implicit submit, refs, disabled behavior and original events; no new SVG/focus defaults                                 |
| Input                      | Existing native shadcn input; 21 sites                              | Four presentations own repeated search/date/owner fields. Names, types, autocomplete, refs, controlled values and validation timing remain forwarded                                         |
| Label                      | Existing Radix path or native unstyled label; 23 sites              | Four presentations own repeated labels. Native mode avoids introducing Radix selection suppression to original labels                                                                        |
| Textarea                   | Custom native-compatible adapter; 5 sites                           | content-editor owns the duplicated legal-editor styling; native resize/read-only/refs/events remain intact                                                                                   |
| Table family               | Custom class-neutral native table API; 7 tables, 29 heads, 48 cells | Four head and ten cell presentations own repeated spacing/status/empty patterns. Existing DOM, overflow containers, row events/keys and table logic remain                                   |
| SelectTrigger              | Existing Radix compound API; 18 sites                               | Three presentation patterns centralize repeated triggers. Root/context/portal/ref/event composition remains Radix; open/Escape dismissal checked in the scoped dialog                        |
| DialogSurface              | Custom createPortal adapter; 2 sites                                | Two explicit existing surfaces own overlay/content styles. Different blur/border/scroll-policy contracts remain distinct; caller owns dismissal/labels. No focus trap or Escape policy added |
| PopoverPanel               | Custom non-modal div adapter; 2 sites                               | Notification/profile presentations own exact existing panel styles. Outside dismissal and callback-ref cleanup remain in useAdminHeader                                                      |
| SheetSurface               | Custom persistent mobile sheet; 1 site                              | Already owns overlay/width/opacity/transform/breakpoint styles. Children remain mounted while closed, with unchanged dismissal                                                               |
| ContentLanguageButton      | Shared composition of local native Button; 4 sites                  | Owns the identical legal-content selected/unselected styles; children/order/click semantics remain unchanged                                                                                 |
| AuthReturnLink             | Domain composition of Router Link; 3 sites                          | Owns one exact repeated return-link pattern; preserves anchor semantics and /login destination                                                                                               |

Custom compatibility adapters are not described as official generated shadcn
components. Feature-specific widths, statuses, typography and layout remain
where their responsibility differs. Small repeated layout utilities alone are
not a reason to introduce a configurable workflow or wrappers for semantic HTML.

The 118 migrated literals are checked by `acceptance-source-proof.mjs`: each
presentation resolves to the exact prior literal, and every other JSX prop is
AST-equivalent. This includes refs, handlers, types, names, disabled and read-only
attributes when present. Additional compositions are checked in browser/form
contracts. No primitive/event policy changed to achieve consolidation.

## Logic separation across actual domains

The complete file classification is [logic-inventory.csv](logic-inventory.csv).
It records 175 feature pages/components and their domain hook/utility imports.
No feature TSX retains form setup, query/mutation orchestration, persistence or
HTTP transport. Simple event/value forwarding, conditional rendering, config
lookup, maps, pagination display arithmetic, navigation and direct print/link
commands are legitimate view glue and were retained where no orchestration exists.

| Domain                                  | Already separated                                                                                                             | Correction / reason                                                                                                |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Auth                                    | Four form hooks, OTP digit/ref hook, countdown store, Zod schemas; request states/defaults remain                             | Only repeated submit/return-link presentation was consolidated                                                     |
| Dashboard, including platform analytics | URL filters, header refresh/range, priority actions, insights and scaling helpers                                             | useNeedsAttention had no React hook call; renamed getNeedsAttention in utils                                       |
| Analytics                               | Header date/period/refresh state in useAnalyticsHeader; chart math in utils                                                   | Four use-prefixed pure view functions moved to named get* utilities                                                |
| Users                                   | useUsersList owns nuqs/filter/sort/export; useUserDetails owns blocking; useUsersTable owns route actions                     | Stats and pagination functions are ordinary utilities now; pagination reuses the identical shared algorithm        |
| Showrooms                               | Listing filters/sort/page owned by useShowroomsPage                                                                           | New focused useShowroomDetails owns lookup/tab state; tab retention across showroomId changes is tested            |
| CMS                                     | Existing content hooks own draft/saved state, language, storage and submissions; prior dialog hooks remain                    | Pure overview accessor renamed getCmsOverview; separate modal defaults/contracts remain unchanged                  |
| Join requests                           | List/query/export, detail query/URL override, owner form/wizard, contract state and memoized filter options already separated | Detail clipboard/print callbacks moved to existing detail hook; pure review formatting renamed getOnboardingReview |

Every remaining use-*.ts file has an actual React/domain hook call (31 files,
AST inspected, including generic hook invocations). No lifecycle wrapper, JSX
hook, new query key, invalidation, persistence key or second source of truth was
introduced. Transport remains absent rather than inventing backend integration.

## Internal route naming inventory

All names below are retained because they identify the actual domain/screen.
There are no explicit route IDs, loaders, actions, lazy route definitions or
useRouteLoaderData/useMatches references to migrate. Generated route IDs retain
array order. Public path strings and navigation files are byte-identical to the
pre-review snapshot, and their diff against the Git baseline is empty.

| Public path                              | Route component / file                                                                               | Naming decision                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| /                                        | HomePage / app/pages/home-page.tsx                                                                   | Clear public entry; duplicate admin layout root retained  |
| /login                                   | LoginPage / auth/pages/login-page.tsx                                                                | Clear auth action                                         |
| /forgot-password                         | ForgotPasswordPage / auth/pages/forgot-password-page.tsx                                             | Clear recovery screen                                     |
| /verify-otp                              | VerifyOtpPage / auth/pages/verify-otp-page.tsx                                                       | Clear verification screen                                 |
| /reset-password                          | ResetPasswordPage / auth/pages/reset-password-page.tsx                                               | Clear reset screen                                        |
| /dashboard                               | DashboardPage / dashboard/pages/dashboard-page.tsx                                                   | Clear overview domain                                     |
| /analytics                               | AnalyticsPage / analytics/pages/analytics-page.tsx                                                   | Clear reporting domain                                    |
| /users                                   | UsersPage / users/pages/users-page.tsx                                                               | Clear list                                                |
| /users/:userId                           | UserDetailsPage / users/pages/user-details-page.tsx                                                  | Clear parameterized detail                                |
| /showrooms                               | ShowroomsPage / showrooms/pages/showrooms-page.tsx                                                   | Clear list                                                |
| /showrooms/:showroomId                   | ShowroomDetailsPage / showrooms/pages/showroom-details-page.tsx                                      | Clear parameterized detail                                |
| /cms                                     | CMSPage / cms/pages/cms-page.tsx                                                                     | Recognizable domain root overview; preserve exported name |
| /cms/help-center                         | HelpCenterPage / cms/pages/help-center-page.tsx                                                      | Clear content tool                                        |
| /cms/contact-information                 | ContactInformationPage / cms/pages/contact-information-page.tsx                                      | Clear content tool                                        |
| /cms/privacy-policy                      | PrivacyPolicyPage / cms/pages/privacy-policy-page.tsx                                                | Clear document editor                                     |
| /cms/terms-and-conditions                | TermsAndConditionsPage / cms/pages/terms-and-conditions-page.tsx                                     | Clear document editor                                     |
| /showroom-join-requests                  | ShowroomJoinRequestsPage / showroom-join-requests/pages/showroom-join-requests-page.tsx              | Clear business list                                       |
| /showroom-join-requests/:requestId       | ShowroomJoinRequestDetailsPage / showroom-join-requests/pages/showroom-join-request-details-page.tsx | Clear request detail                                      |
| /showroom-join-requests/:requestId/setup | ShowroomOnboardingWizardPage / showroom-join-requests/pages/showroom-onboarding-wizard-page.tsx      | Clear setup workflow                                      |
| *                                        | NotFoundPage / app/pages/not-found-page.tsx                                                          | Clear fallback                                            |
| Admin layout root                        | AdminLayoutWithNuqs / app/layouts/admin-layout-with-nuqs.tsx                                         | Explicit layout integration                               |

Router files admin-routes.tsx, public-routes.tsx and router.tsx are already clear.
Sidebar paths without pages remain /categories, /reviews-reports, /promotions,
/commercial-accounts, /admin-users, /settings and /activity-log. Existing active
matching, browser history, query parsers, hashes and scroll behavior remain.
No public URL migration is proposed or applied.

## Line gate and exact tokens

The checker scans .ts/.tsx/.mts/.cts/.js/.jsx/.mjs/.cjs/.sh/.css/.json/.yml/.yaml/
.html, extensionless authored .husky hooks, .gitignore and .prettierignore. It
counts physical lines including imports/comments/blanks after normal formatting,
with no extra line for a final newline. Ten fixture types pass at 150 and fail
at 151. No applicable current authored code/config file remains unscanned.
Markdown, CSV inventories and image assets are documentation/data, not code.
Generated package-lock.json, node_modules, .git, dist, coverage and .husky/_ are
explicit exclusions; the user's lockfile was independently hashed and preserved.

All 145 original root declarations and 157 original theme mappings compare
exactly by value. The original .dark/base CSS suffix is byte-identical to
shared/styles/base.css. Existing import/cascade order and font packages remain.
Remaining TS/TSX fixed-color/low-level primitive scans found no feature literals
or primitive imports outside their allowed layers. The five added semantic
control-color aliases and existing overlay token retain exact original values; no runtime colors or assets
were converted. Installed React is 19.3.1 and TypeScript 6.0.3; nothing was upgraded.

## Historical evidence reconciliation

Raw artifacts were retained and comparisons recomputed into the acceptance
folder. They substantiate these distinct historical results:

| Measurement                       | Recomputed raw result                                                        |
| --------------------------------- | ---------------------------------------------------------------------------- |
| Initial route PNGs                | 155/162 exact; observable controls 156/156 JSON snapshots equal              |
| Hardware interaction PNGs         | 56/65 exact; observable state 65/65 equal                                    |
| Software interaction PNGs         | 63/65 exact; observable state 65/65 equal                                    |
| Seven flagged repeats             | 7/7 exact against one repeated original; all captured #root properties equal |
| Original-source seven-case repeat | 6/7 exact; one original render varied by 18 edge pixels                      |
| Two stabilized repeats            | 2/2 PNGs and captured state/style snapshots exact                            |

Historical capture scripts show the same viewports/scale/fonts/data/locale/theme
and test-only stabilization. The older seven-case style collector excludes body
portals: its PNG covers the dialog, but its #root style snapshot does not. The
new acceptance collector includes body portals and selected computed properties.

`baytfolio-interaction-repeat/repeat-comparison.json` is stale: it says 0/2 and
one state mismatch, while the current raw before/repeat files recompute to 2/2
with no state difference. It is not used as proof of rendering noise. The 18-pixel
original seven-case repeat remains reproducible. Historical scripts did not save
an immutable source digest/browser-version manifest per capture, so these are
historical evidence, not an unconditional current full-matrix claim.

## New evidence for corrected code

`acceptance-browser.mjs` captures the frozen pre-review source on 5184 and the
corrected source on 5173. Both use Chromium 156, the same fonts/local mocks,
scale 1, en-US/Africa-Cairo, fixed clock, viewport height 900, software rendering
and CSS transition endpoints stabilized only in the harness. Cases cover all
seven domains, 390/768/1440 widths, dark scopes, native auth/date controls,
English editors, wizard steps, selected detail tabs, dialog/select portal,
menus and mobile sheet. The capture verifies source identity did not drift.

The primary run had 31 complete pairs. Case 0 encountered a Vite navigation
while capturing; case 21's test selected a background combobox behind the modal.
The scoped locator was corrected and only those two cases rerun separately.
Both follow-up pairs are exact, including Select Escape dismissal. No failed
raw capture or baseline was overwritten. The application digest is unchanged
across the harness-only fixes; manifests identify each tooling revision.

Across 33 complete cases, all observable state and captured geometry/style
properties match exactly. Initial complete-pair PNGs match in 31/33 cases.
The two table cases were repeated without changing application code:

- Showrooms (case 7): repeated before/after PNGs match exactly.
- Join requests (case 13): the primary before PNG equals repeated after, and
  repeated before equals primary after byte-for-byte. The 46-pixel alternate
  raster occurs in both unchanged reference and corrected source. The same-run
  repeat still records that difference; it was not hidden by a tolerance.

These results support preservation for the inspected scenarios; they do not say
all first-pass PNGs matched. State and pixel results remain separate. Exact file
hashes/cross-run evidence and raw manifests are retained in the acceptance folder.

Fresh gates: TypeScript PASS, ESLint PASS, default npm test 29/29 in 12 files,
production build PASS with existing chunk warning, Prettier PASS, line gate PASS,
and git diff --check PASS. No timeout, threshold or production behavior was relaxed.
The new tab-retention regression test passes; existing native and both-dialog
contracts still pass. No reset, commit, push, dependency upgrade or deployment
was performed. The lockfile remains the exact pre-review file.

The evidence index explicitly lists 31 valid primary indices and follow-ups
[0, 21], whose union is exactly cases 0 through 32. Each raw file is hashed;
raw manifests retain the full 33-case catalog even for a filtered run. The
sidecar records actual capture coverage so a filtered run is not mistaken for
a complete execution. Primary and follow-up manifests resolve to the same
application digest, despite different verification-tooling digests.
