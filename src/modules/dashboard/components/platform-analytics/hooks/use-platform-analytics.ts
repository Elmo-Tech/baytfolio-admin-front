import { platformAnalyticsMock } from "../api/platform-analytics.mock";
import {
  buildShowroomDonutSegments,
  getContentGrowthCoordinates,
} from "../utils/platform-analytics-charts";

export function usePlatformAnalytics() {
  const { contentGrowth, showroomStatus, contractStatus } =
    platformAnalyticsMock;

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
