import { useState } from "react";

import type { AnalyticsPeriod } from "../constants/analytics-overview";

export function useAnalyticsHeader() {
  const [period, setPeriod] = useState<AnalyticsPeriod>("month");
  const [startDate, setStartDate] = useState("2025-05-01");
  const [endDate, setEndDate] = useState("2025-05-31");
  const [refreshed, setRefreshed] = useState(false);

  return {
    period,
    startDate,
    endDate,
    refreshed,
    onPeriodChange: setPeriod,
    onStartDateChange: setStartDate,
    onEndDateChange: setEndDate,
    onRefresh: () => setRefreshed((prev) => !prev),
  };
}
