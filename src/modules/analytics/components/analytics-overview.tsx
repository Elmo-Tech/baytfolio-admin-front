import { TrendingUp } from "lucide-react";

import { useAnalyticsOverview } from "../hooks/use-analytics-overview";

export default function AnalyticsOverview() {
  const stats = useAnalyticsOverview();

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 rounded-full bg-brand-gold" />
          <h2 className="font-bold text-text-primary">ملخص الفترة</h2>
        </div>

        <p className="text-xs text-text-muted">بيانات شهر مايو المعتمدة</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.iconComponent;
          return (
            <article
              key={stat.id}
              className="flex min-h-[185px] min-w-0 flex-col justify-between rounded-lg border border-border-subtle bg-card p-4 shadow-sm"
            >
              <div className="flex flex-row-reverse items-center justify-between gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-background text-text-secondary">
                  <Icon size={21} strokeWidth={1.9} />
                </div>

                <span className="text-sm font-medium text-text-secondary-strong">
                  {stat.label}
                </span>
              </div>

              <div className="flex items-baseline justify-start">
                <strong className="text-[36px] font-bold leading-none tabular-nums text-text-primary">
                  {stat.value}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-border-divider pt-3">
                <span className="truncate text-xs text-text-secondary">
                  {stat.description}
                </span>

                <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-status-active-fg">
                  {stat.change !== "مستقر" && <TrendingUp size={13} />}
                  {stat.change}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
