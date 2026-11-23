// Exact existing control patterns; feature-specific composition stays at call sites.
export const tableCellPresentations = {
  standard: "px-5 py-4",
  secondary: "whitespace-nowrap px-5 py-4 text-sm text-users-text-secondary",
  muted: "whitespace-nowrap px-5 py-4 text-sm text-users-text-muted",
  center: "px-5 py-4 text-center",
  empty: "px-5 py-12 text-center text-sm text-users-text-subtle",
  request: "whitespace-nowrap px-4 py-4",
  "request-details": "px-4 py-4",
  "analytics-leading": "px-5 py-5",
  "analytics-number":
    "px-3 py-5 text-center text-base tabular-nums text-text-secondary",
  "analytics-center": "px-3 py-5 text-center",
} as const;
export type TableCellPresentation = keyof typeof tableCellPresentations;
