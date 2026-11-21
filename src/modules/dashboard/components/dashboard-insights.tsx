import { useDashboardInsights } from "../hooks/use-dashboard-insights";
import ExpiringContractsCard from "./expiring-contracts-card";
import RecentActivityCard from "./recent-activity-card";
import TopActiveShowroomsCard from "./top-active-showrooms-card";

export default function DashboardInsights() {
  const {
    activeShowrooms,
    recentActivities,
    expiringContracts,
    onShowAllShowrooms,
    onShowAllActivities,
    onShowAllContracts,
  } = useDashboardInsights();

  return (
    <section
      aria-label="تفاصيل نشاط المنصة والعقود"
      className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      <TopActiveShowroomsCard
        showrooms={activeShowrooms}
        onShowAll={onShowAllShowrooms}
      />
      <RecentActivityCard
        activities={recentActivities}
        onShowAll={onShowAllActivities}
      />
      <ExpiringContractsCard
        contracts={expiringContracts}
        onShowAll={onShowAllContracts}
      />
    </section>
  );
}
