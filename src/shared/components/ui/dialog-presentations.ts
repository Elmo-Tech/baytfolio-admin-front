// Separate existing surfaces: the standalone modal has a blur and border variant.
export const dialogPresentations = {
  question: {
    overlay: "fixed inset-0 z-[9999] grid place-items-center bg-overlay/50 p-4",
    surface:
      "flex max-h-[90dvh] w-full max-w-[690px] flex-col overflow-hidden rounded-xl border bg-users-surface shadow-2xl",
  },
  "standalone-question": {
    overlay:
      "fixed inset-0 z-[9999] grid place-items-center overflow-hidden bg-overlay/50 p-4 backdrop-blur-[2px]",
    surface:
      "flex max-h-[90dvh] w-full max-w-[690px] flex-col overflow-hidden rounded-xl border border-users-panel-border bg-users-surface shadow-2xl",
  },
} as const;
