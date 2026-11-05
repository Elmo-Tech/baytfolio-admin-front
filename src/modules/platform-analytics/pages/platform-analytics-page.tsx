import ContentGrowthCard from "../components/content-growth-card";
import ContractStatusCard from "../components/contract-status-card";
import ShowroomStatusCard from "../components/showroom-status-card";

export default function PlatformAnalyticsPage() {
  return (
    <div dir="rtl" className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-text-primary">
          التحليلات والتقارير
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          تحليلات نمو المنصة وتوزيع حالاتها التشغيلية
        </p>
      </header>

      <section
        aria-label="تحليلات المنصة"
        className="grid grid-cols-1 gap-4 min-[1025px]:max-[1280px]:grid-cols-2 min-[1281px]:grid-cols-4"
      >
        <ContentGrowthCard />
        <ShowroomStatusCard />
        <ContractStatusCard />
      </section>
    </div>
  );
}
