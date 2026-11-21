import { useDashboardFilters } from "../../../hooks/use-dashboard-filters";
import { scalePlatformAnalytics } from "../../../utils/apply-dashboard-filters";
import { platformAnalyticsMock } from "../api/platform-analytics.mock";
import {
  buildShowroomDonutSegments,
  getContentGrowthCoordinates,
} from "../utils/platform-analytics-charts";

export function usePlatformAnalytics() {
  const { scaleFactor } = useDashboardFilters();
  const { contentGrowth, showroomStatus, contractStatus } =
    scalePlatformAnalytics(platformAnalyticsMock, scaleFactor);

  return {
    contentGrowth: {
      ...contentGrowth,
      roomPoints: getContentGrowthCoordinates(
        contentGrowth.points.map((point) => point.rooms),
      ).join(" "),
      packagePoints: getContentGrowthCoordinates(
        contentGrowth.points.map((point) => point.packages),
      ).join(" "),
    },
    showroomStatus: {
      ...showroomStatus,
      segments: buildShowroomDonutSegments(showroomStatus.statuses),
    },
    contractStatus,
  };
}
