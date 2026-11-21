import type { RecentActivity } from "../types/dashboard-insights.types";

export const ACTIVITY_STATUS_COLORS: Record<RecentActivity["status"], string> =
  {
    success: "bg-users-stat-success-fg",
    info: "bg-info",
    error: "bg-users-stat-error-fg",
    warning: "bg-warning",
  };
