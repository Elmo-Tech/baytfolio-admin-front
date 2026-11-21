import { analyticsStats } from "../api/analytics.mock";
import { ANALYTICS_STAT_ICONS } from "../constants/analytics-overview";

export function useAnalyticsOverview() {
  return analyticsStats.map((stat) => ({
    ...stat,
    iconComponent: ANALYTICS_STAT_ICONS[stat.icon],
  }));
}
