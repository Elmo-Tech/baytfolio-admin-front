export type DashboardTrend = "up" | "down" | "neutral";

export type DashboardMetricId =
  | "active-showrooms"
  | "registered-users"
  | "published-rooms"
  | "published-packages"
  | "active-promotions"
  | "pending-reviews";

export type DashboardMetricTone = "success" | "warning" | "danger" | "muted";

export interface DashboardMetric {
  id: DashboardMetricId;
  label: string;
  value: number;
  trend?: DashboardTrend;
  changePercentage?: number;
  description: string;
  descriptionTone: DashboardMetricTone;
}

export interface DashboardOverview {
  metrics: DashboardMetric[];
}
