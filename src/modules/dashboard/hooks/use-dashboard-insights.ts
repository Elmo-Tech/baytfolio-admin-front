import { toast } from "sonner";

import {
  activeShowroomsMock,
  expiringContractsMock,
  recentActivitiesMock,
} from "../api/dashboard-insights.mock";

export function useDashboardInsights() {
  return {
    activeShowrooms: activeShowroomsMock,
    recentActivities: recentActivitiesMock,
    expiringContracts: expiringContractsMock,
    onShowAllShowrooms: () =>
      toast.info("صفحة المعارض الأكثر نشاطًا قيد التطوير"),
    onShowAllActivities: () => toast.info("صفحة سجل العمليات قيد التطوير"),
    onShowAllContracts: () =>
      toast.info("صفحة الحسابات التجارية والعقود قيد التطوير"),
  };
}
