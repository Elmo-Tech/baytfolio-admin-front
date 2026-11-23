import { mockUsersStats } from "../api/users.mock";
import { USER_STATS_CONFIG } from "../constants/user-stats";

export function getUsersStats() {
  return USER_STATS_CONFIG.map((item) => ({
    ...item,
    value: mockUsersStats[item.key],
  }));
}
