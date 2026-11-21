import type { DashboardPeriod } from "../constants/dashboard-periods";
import type { DashboardMetric } from "../types/dashboard.types";
import type {
  ActiveShowroom,
  ExpiringContract,
} from "../types/dashboard-insights.types";
import type { PlatformAnalyticsOverview } from "../components/platform-analytics/types/platform-analytics.types";

const PERIOD_MULTIPLIERS: Record<DashboardPeriod, number> = {
  today: 0.14,
  "last-7-days": 0.42,
  "this-month": 1,
  custom: 0.68,
};

export function getDashboardScaleFactor(
  period: DashboardPeriod,
  startDate: string,
  endDate: string,
  refreshVersion: number,
): number {
  let base = PERIOD_MULTIPLIERS[period];

  if (period === "custom" && startDate && endDate && startDate <= endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const days = Math.max(1, Math.round((end - start) / 86_400_000) + 1);
    base = Math.min(2.5, Math.max(0.12, days / 30));
  }

  const refreshJitter =
    refreshVersion === 0 ? 1 : 1 + ((refreshVersion % 5) + 1) * 0.02;
  return Number((base * refreshJitter).toFixed(2));
}

export function scaleDashboardMetrics(
  metrics: DashboardMetric[],
  factor: number,
): DashboardMetric[] {
  return metrics.map((metric) => ({
    ...metric,
    value: Math.max(1, Math.round(metric.value * factor)),
  }));
}

export function scalePlatformAnalytics(
  analytics: PlatformAnalyticsOverview,
  factor: number,
): PlatformAnalyticsOverview {
  return {
    ...analytics,
    contentGrowth: {
      ...analytics.contentGrowth,
      points: analytics.contentGrowth.points.map((point) => ({
        ...point,
        rooms: Math.max(5, Math.round(point.rooms * factor)),
        packages: Math.max(4, Math.round(point.packages * factor)),
      })),
    },
    showroomStatus: {
      ...analytics.showroomStatus,
      total: Math.max(1, Math.round(analytics.showroomStatus.total * factor)),
      statuses: analytics.showroomStatus.statuses.map((item) => ({
        ...item,
        count: Math.max(1, Math.round(item.count * factor)),
      })),
    },
    contractStatus: {
      ...analytics.contractStatus,
      total: Math.max(1, Math.round(analytics.contractStatus.total * factor)),
      statuses: analytics.contractStatus.statuses.map((item) => ({
        ...item,
        count: Math.max(1, Math.round(item.count * factor)),
      })),
    },
  };
}

export function scaleActiveShowrooms(
  showrooms: ActiveShowroom[],
  factor: number,
): ActiveShowroom[] {
  return showrooms.map((showroom) => ({
    ...showroom,
    rooms: Math.max(1, Math.round(showroom.rooms * factor)),
    packages: Math.max(1, Math.round(showroom.packages * factor)),
  }));
}

export function filterExpiringContracts(
  contracts: ExpiringContract[],
  period: DashboardPeriod,
): ExpiringContract[] {
  if (period === "today") return contracts.slice(0, 1);
  if (period === "last-7-days")
    return contracts.filter((c) => c.remainingDays <= 10);
  return contracts;
}
