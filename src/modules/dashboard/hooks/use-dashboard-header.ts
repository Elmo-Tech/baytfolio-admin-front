import { useState } from "react";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

import {
  DASHBOARD_PERIODS,
  type DashboardPeriod,
} from "../constants/dashboard-periods";
import { getFormattedCurrentTime } from "../utils/format-dashboard-time";

export function useDashboardHeader() {
  const [filters, setFilters] = useQueryStates({
    period: parseAsStringEnum<DashboardPeriod>(
      DASHBOARD_PERIODS.map((period) => period.value),
    ).withDefault("this-month"),
    startDate: parseAsString,
    endDate: parseAsString,
  });

  const [showCustomPicker, setShowCustomPicker] = useState(
    filters.period === "custom",
  );
  const [lastUpdated, setLastUpdated] = useState(getFormattedCurrentTime);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const startDate = filters.startDate ?? "";
  const endDate = filters.endDate ?? "";
  const isInvalidRange = Boolean(startDate && endDate && startDate > endDate);

  function handlePeriodChange(period: DashboardPeriod) {
    setShowCustomPicker(period === "custom");
    if (period === "custom") {
      void setFilters({ period });
      return;
    }
    void setFilters({ period, startDate: null, endDate: null });
  }

  function handleApplyRange() {
    if (!startDate || !endDate || isInvalidRange) return;
    setShowCustomPicker(false);
  }

  function handleRefresh() {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(getFormattedCurrentTime());
      setIsRefreshing(false);
    }, 800);
  }

  return {
    period: filters.period,
    startDate,
    endDate,
    isInvalidRange,
    showCustomPicker,
    lastUpdated,
    isRefreshing,
    onPeriodChange: handlePeriodChange,
    onStartDateChange: (value: string) =>
      void setFilters({ startDate: value || null }),
    onEndDateChange: (value: string) =>
      void setFilters({ endDate: value || null }),
    onApplyRange: handleApplyRange,
    onRefresh: handleRefresh,
  };
}
