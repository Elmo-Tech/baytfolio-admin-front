import { useCommercialOverview } from "../hooks/use-commercial-overview";

export default function CommercialOverview() {
  const stats = useCommercialOverview();

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 rounded-full bg-brand-navy" />
          <h2 className="font-bold text-text-primary">الحالة التجارية</h2>
        </div>

        <p className="text-xs text-text-muted">
          قيم العقود والمعاملات المسجلة رسميًا
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.iconComponent;
          return (
            <article
              key={stat.id}
              className="flex min-h-[185px] flex-col justify-between rounded-lg border border-border-subtle bg-card p-4 shadow-sm"
            >
              <div className="flex flex-row-reverse items-center justify-between gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-md ${stat.iconBoxClass}`}
                >
                  <Icon size={21} strokeWidth={1.9} />
                </div>

                <span className="text-sm font-medium text-text-secondary-strong">
                  {stat.label}
                </span>
              </div>

              <div className="flex flex-row-reverse items-baseline justify-end gap-2">
                <strong
                  className={`text-[36px] font-bold leading-none tabular-nums ${stat.valueClass}`}
                >
                  {stat.value}
                </strong>

                <span className="text-sm font-medium text-text-muted">
                  {stat.unit}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-border-divider pt-3">
                <span className="text-xs text-text-secondary">
                  {stat.description}
                </span>

                <span
                  className={`shrink-0 text-xs font-medium ${stat.detailClass}`}
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
