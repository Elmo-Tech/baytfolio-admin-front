export const ACTIVITY_CHART_SERIES = [
  {
    key: "users",
    label: "مستخدمون جدد (×10)",
    color: "var(--color-brand-navy)",
  },
  { key: "rooms", label: "غرف منشورة", color: "var(--color-info)" },
  { key: "packages", label: "باقات منشورة", color: "var(--color-brand-gold)" },
  {
    key: "showrooms",
    label: "معارض جديدة",
    color: "var(--color-users-stat-success-fg)",
  },
] as const;

export const ACTIVITY_CHART_LAYOUT = {
  maxValue: 60,
  height: 180,
  width: 680,
  topOffset: 18,
  leftOffset: 42,
  groupWidth: 130,
  barWidth: 16,
  barGap: 4,
  ticks: [0, 15, 30, 45, 60],
} as const;
