// Exact existing control patterns; feature-specific composition stays at call sites.
export const selectTriggerPresentations = {
  "filled-form":
    "h-11 w-full cursor-pointer rounded-md border-users-panel-divider bg-users-surface-input px-3 text-sm text-users-text-primary shadow-none",
  form: "h-11 w-full",
  "compact-filter":
    "h-9 w-full border-border-warm bg-users-surface-input text-xs xl:w-[145px]",
} as const;
export type SelectTriggerPresentation = keyof typeof selectTriggerPresentations;
