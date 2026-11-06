import {
  ContentGrowthCard,
  ContractStatusCard,
  ShowroomStatusCard,
} from "../components/platform-analytics";

import DashboardHeader from "../components/dashboard-header";
import NeedsAttention from "../components/needs-attention";
import DashboardStats from "../components/dashboard-stats";
import PriorityItems from "../components/priority-items";
import DashboardInsights from "../components/dashboard-insights";

export default function DashboardPage() {
  return (
    <div dir="rtl" className="space-y-6">
      <DashboardHeader />
      <DashboardStats />

      <section
        aria-labelledby="platform-analytics-heading"
        className="space-y-4"
      >
        <header>
          <h2
            id="platform-analytics-heading"
            className="text-xl font-bold text-text-primary"
          >
            مؤشرات المنصة
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            تحليلات نمو المنصة وتوزيع حالاتها التشغيلية
          </p>
        </header>

        <div
          aria-label="مؤشرات المنصة"
          className="grid grid-cols-1 gap-4 min-[1025px]:max-[1280px]:grid-cols-2 min-[1281px]:grid-cols-4"
        >
          <ContentGrowthCard />
          <ShowroomStatusCard />
          <ContractStatusCard />
        </div>
      </section>

      <NeedsAttention />
      <PriorityItems />
      <DashboardInsights />
    </div>
  );
}
