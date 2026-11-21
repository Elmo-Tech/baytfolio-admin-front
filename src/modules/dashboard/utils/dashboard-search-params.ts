import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";

import {
  DASHBOARD_PERIODS,
  type DashboardPeriod,
} from "../constants/dashboard-periods";

export const dashboardSearchParams = {
  period: parseAsStringEnum<DashboardPeriod>(
    DASHBOARD_PERIODS.map((period) => period.value),
  ).withDefault("this-month"),
  startDate: parseAsString,
  endDate: parseAsString,
  v: parseAsInteger.withDefault(0),
};
