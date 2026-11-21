import { useQueryStates } from "nuqs";

import { getDashboardScaleFactor } from "../utils/apply-dashboard-filters";
import { dashboardSearchParams } from "../utils/dashboard-search-params";

export function useDashboardFilters() {
  const [filters, setFilters] = useQueryStates(dashboardSearchParams);
  const startDate = filters.startDate ?? "";
  const endDate = filters.endDate ?? "";
  const scaleFactor = getDashboardScaleFactor(
    filters.period,
    startDate,
    endDate,
    filters.v,
  );

  return {
    filters,
    setFilters,
    startDate,
    endDate,
    scaleFactor,
  };
}
