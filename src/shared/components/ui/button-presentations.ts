// Exact existing control patterns; feature-specific composition stays at call sites.
export const buttonPresentations = {
  "auth-submit":
    "h-10 w-full rounded-md bg-auth-navy text-base text-primary-foreground shadow-sm hover:bg-auth-navy-hover focus-visible:border-auth-focus focus-visible:ring-auth-focus/40",
  "onboarding-primary":
    "gap-2 bg-brand-navy text-surface-white hover:bg-brand-navy/90",
  "pagination-arrow":
    "size-8 rounded-md border-border bg-background text-muted-foreground shadow-none hover:bg-muted",
  "filter-reset":
    "h-11 min-w-[105px] shrink-0 cursor-pointer gap-2 rounded-md border-users-panel-divider px-4 text-sm text-users-text-secondary shadow-none transition hover:bg-background",
  "content-publish":
    "h-10 gap-2 bg-users-brand-navy px-5 text-primary-foreground hover:opacity-90",
  "content-reset": "h-10 gap-2 text-users-text-secondary",
  "showroom-header-action":
    "inline-flex cursor-pointer items-center gap-2 rounded-xl border border-users-panel-border px-4 py-3 text-sm font-medium text-users-text-primary transition-colors hover:bg-users-stat-neutral-bg",
  "request-header-action":
    "h-12 gap-2 border-transparent bg-muted text-sm hover:bg-users-surface-row-hover",
  "request-toolbar-action":
    "h-10 gap-2 rounded-lg border-border-subtle bg-background px-4 text-xs font-normal shadow-none",
} as const;
export type ButtonPresentation = keyof typeof buttonPresentations;
