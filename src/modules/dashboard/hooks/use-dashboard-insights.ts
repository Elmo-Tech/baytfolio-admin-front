import { useNavigate } from "react-router";
import { toast } from "@/shared/lib/toast";

import {
  activeShowroomsMock,
  expiringContractsMock,
  recentActivitiesMock,
} from "../api/dashboard-insights.mock";
import {
  filterExpiringContracts,
  scaleActiveShowrooms,
} from "../utils/apply-dashboard-filters";
import { useDashboardFilters } from "./use-dashboard-filters";

export function useDashboardInsights() {
  const navigate = useNavigate();
  const { filters, scaleFactor } = useDashboardFilters();

  return {
    activeShowrooms: scaleActiveShowrooms(activeShowroomsMock, scaleFactor),
    recentActivities: recentActivitiesMock,
    expiringContracts: filterExpiringContracts(
      expiringContractsMock,
      filters.period,
    ),
    onShowAllShowrooms: () => void navigate("/showrooms"),
    onShowAllActivities: () => toast.info("سجل العمليات الكامل قيد التطوير"),
    onShowAllContracts: () => void navigate("/showrooms"),
  };
}
