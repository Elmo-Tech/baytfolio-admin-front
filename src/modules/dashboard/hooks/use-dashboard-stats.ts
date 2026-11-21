import { dashboardMock } from "../api/dashboard.mock";
import {
  METRIC_DESCRIPTION_STYLES,
  METRIC_ICONS,
  METRIC_ICON_STYLES,
} from "../constants/dashboard-stats";

export function useDashboardStats() {
  return dashboardMock.metrics.map((metric) => ({
    ...metric,
    icon: METRIC_ICONS[metric.id],
    iconClassName: METRIC_ICON_STYLES[metric.id],
    descriptionClassName: METRIC_DESCRIPTION_STYLES[metric.descriptionTone],
  }));
}
