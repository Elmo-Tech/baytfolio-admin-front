export { default as DashboardStats } from "./components/dashboard-stats";
export { default as DashboardHeader } from "./components/dashboard-header";
export { default as DashboardPage } from "./pages/dashboard-page";
export {
  ContentGrowthCard,
  ContractStatusCard,
  ShowroomStatusCard,
} from "./components/platform-analytics";
export { default as NeedsAttention } from "./components/needs-attention";
export { default as PriorityItems } from "./components/priority-items";

export type {
  DashboardMetricId,
  DashboardMetric,
  DashboardMetricTone,
  DashboardOverview,
  DashboardTrend,
} from "./types/dashboard.types";
