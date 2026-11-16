import { Clock3, FileText, Megaphone, ShieldCheck } from "lucide-react";
import { commercialStats } from "../api/analytics.mock";

const icons = {
  contracts: FileText,
  services: ShieldCheck,
  promotions: Megaphone,
  expiring: Clock3,
};

const descriptions = {
  contracts: "العقود النشطة بالمنظومة",
  services: "طلبات التصوير والفحص",
  promotions: "الحملات المدفوعة خلال مايو",
  expiring: "تتطلب متابعة تشغيلية للتجديد",
};

export default function CommercialOverview() {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 rounded-full bg-brand-navy" />
          <h2 className="font-bold text-text-primary">الحالة التجارية</h2>
        </div>

        <p className="text-xs text-text-muted">
          قيم العقود والمعاملات المسجلة رسميًا
        </p>
      </div>

      {/* Commercial Statistics */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {commercialStats.map((stat) => {
          const Icon = icons[stat.icon];
          const isExpiring = stat.id === "expiring";

          const iconColor = {
            contracts: "text-brand-navy",
            services: "text-info",
            promotions: "text-brand-gold-strong",
            expiring: "text-warning",
          }[stat.id];

          return (
            <article
              key={stat.id}
              className="flex min-h-[185px] flex-col justify-between rounded-lg border border-border-subtle bg-card p-4 shadow-sm"
            >
              {/* Card Header */}
              <div className="flex flex-row-reverse items-center justify-between gap-3">
                <div
                  className={[
                    "flex size-10 shrink-0 items-center justify-center rounded-md",
                    isExpiring ? "bg-badge-warning-bg" : "bg-background",
                    iconColor,
                  ].join(" ")}
                >
                  <Icon size={21} strokeWidth={1.9} />
                </div>

                <span className="text-sm font-medium text-text-secondary-strong">
                  {stat.label}
                </span>
              </div>

              {/* Card Value */}
              <div className="flex flex-row-reverse items-baseline justify-end gap-2">
                <strong
                  className={[
                    "text-[36px] font-bold leading-none tabular-nums",
                    isExpiring ? "text-warning" : "text-text-primary",
                  ].join(" ")}
                >
                  {stat.value}
                </strong>

                <span className="text-sm font-medium text-text-muted">
                  {stat.unit}
                </span>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between gap-2 border-t border-border-divider pt-3">
                <span className="text-xs text-text-secondary">
                  {descriptions[stat.id]}
                </span>

                <span
                  className={[
                    "shrink-0 text-xs font-medium",
                    isExpiring ? "text-destructive" : "text-text-primary",
                  ].join(" ")}
                >
                  {stat.detail}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
