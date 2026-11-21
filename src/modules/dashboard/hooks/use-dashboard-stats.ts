import { dashboardMock } from "../api/dashboard.mock";
import {
  METRIC_DESCRIPTION_STYLES,
  METRIC_ICONS,
  METRIC_ICON_STYLES,
} from "../constants/dashboard-stats";
import { scaleDashboardMetrics } from "../utils/apply-dashboard-filters";
import { useDashboardFilters } from "./use-dashboard-filters";

export function useDashboardStats() {
  const { scaleFactor } = useDashboardFilters();
  const scaledMetrics = scaleDashboardMetrics(
    dashboardMock.metrics,
    scaleFactor,
  );

  return scaledMetrics.map((metric) => ({
    ...metric,
    icon: METRIC_ICONS[metric.id],
    iconClassName: METRIC_ICON_STYLES[metric.id],
    descriptionClassName: METRIC_DESCRIPTION_STYLES[metric.descriptionTone],
  }));
}
