import {
  Users,
  Store,
  Images,
  Package,
  MessageSquare,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { analyticsStats } from "../api/analytics.mock";

const icons = {
  users: Users,
  store: Store,
  images: Images,
  package: Package,
  reviews: MessageSquare,
  megaphone: Megaphone,
};

export default function AnalyticsOverview() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="h-5 w-1 rounded-full bg-brand-gold" />
        <h2 className="font-bold text-text-primary">ملخص الفترة</h2>
      </div>

      <p className="text-xs text-text-muted">بيانات شهر مايو المعتمدة</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {analyticsStats.map((stat) => {
          const Icon = icons[stat.icon];

          return (
            <article
              key={stat.id}
              className="min-w-0 rounded-lg border border-border-subtle bg-card p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background text-text-secondary">
                  <Icon size={17} strokeWidth={1.8} />
                </div>

                <span className="truncate text-xs text-text-muted">
                  {stat.label}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <strong className="text-2xl font-bold tabular-nums text-text-primary">
                  {stat.value}
                </strong>

                <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-status-active-fg">
                  {stat.change !== "مستقر" && <TrendingUp size={13} />}
                  {stat.change}
                </span>
              </div>

              <p className="mt-2 truncate text-[11px] text-text-muted">
                {stat.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
