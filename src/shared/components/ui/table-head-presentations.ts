// Exact existing control patterns; feature-specific composition stays at call sites.
export const tableHeadPresentations = {
  standard: "px-5 py-4 font-medium",
  center: "px-5 py-4 text-center font-medium",
  analytics: "px-3 py-4 text-center text-base font-semibold",
  "analytics-leading": "px-5 py-4 text-base font-semibold",
} as const;
export type TableHeadPresentation = keyof typeof tableHeadPresentations;
