// Exact existing control patterns; feature-specific composition stays at call sites.
export const labelPresentations = {
  "question-label": "text-sm text-users-text-primary",
  "owner-label": "text-xs font-medium text-text-secondary",
  "content-label": "block text-xs font-medium text-users-text-primary",
  "date-range": "text-xs font-medium text-text-muted",
} as const;
export type LabelPresentation = keyof typeof labelPresentations;
