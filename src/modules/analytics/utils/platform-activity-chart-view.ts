import { activityData } from "../api/analytics.mock";
import { buildActivityWeekGroups } from "../utils/platform-activity-chart";

export function getPlatformActivityChart() {
  return {
    weekGroups: buildActivityWeekGroups(activityData),
  };
}
