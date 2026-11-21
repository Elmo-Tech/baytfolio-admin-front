import { StatCard } from "@/shared/components/ui";
import { useDashboardStats } from "../hooks/use-dashboard-stats";

export default function DashboardStats() {
  const metrics = useDashboardStats();

  return (
    <section
      dir="rtl"
      aria-label="إحصائيات لوحة التحكم"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6"
    >
      {metrics.map((metric) => (
        <StatCard
          key={metric.id}
          title={metric.label}
          value={metric.value}
          description={metric.description}
          icon={metric.icon}
          iconClassName={metric.iconClassName}
          titleClassName="text-dashboard-label font-semibold text-text-primary"
          valueClassName="text-dashboard-value text-text-primary"
          descriptionClassName={metric.descriptionClassName}
          className="min-h-[120px] border-border-subtle bg-card shadow-card"
        />
      ))}
    </section>
  );
}
