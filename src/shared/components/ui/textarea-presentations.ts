// Exact existing control patterns; feature-specific composition stays at call sites.
export const textareaPresentations = {
  "content-editor":
    "min-h-28 w-full resize-y rounded-md border border-transparent bg-users-table-header px-3 py-3 text-sm leading-7 text-users-text-secondary outline-none transition focus:border-users-panel-divider focus:ring-2 focus:ring-users-panel-divider/30",
} as const;
export type TextareaPresentation = keyof typeof textareaPresentations;
