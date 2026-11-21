export const DASHBOARD_PERIODS = [
  { label: "اليوم", value: "today" },
  { label: "آخر 7 أيام", value: "last-7-days" },
  { label: "هذا الشهر", value: "this-month" },
  { label: "مخصص", value: "custom" },
] as const;

export type DashboardPeriod = (typeof DASHBOARD_PERIODS)[number]["value"];
