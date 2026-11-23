// Exact existing control patterns; feature-specific composition stays at call sites.
export const inputPresentations = {
  "owner-field":
    "h-11 border-border-subtle bg-background pr-10 text-sm shadow-none",
  "date-range":
    "h-10 rounded-md border border-border-subtle bg-background px-3 text-sm text-text-primary outline-none focus:border-primary",
  "table-search":
    "h-11 w-full rounded-md border-users-panel-divider bg-users-surface-input pr-10 pl-4 text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0",
  "analytics-date":
    "h-9 w-[128px] rounded-md border border-border-subtle bg-background px-2 text-xs text-text-primary",
} as const;
export type InputPresentation = keyof typeof inputPresentations;
