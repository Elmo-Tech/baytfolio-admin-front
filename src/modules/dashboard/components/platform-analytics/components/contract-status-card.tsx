import AnalyticsCard from "./analytics-card";
import { platformAnalyticsMock } from "../api/platform-analytics.mock";

export default function ContractStatusCard() {
  const { contractStatus } = platformAnalyticsMock;

  return (
    <AnalyticsCard
      title="حالة العقود"
      description="الاشتراكات والاتفاقيات التجارية الحالية"
      footerLabel={contractStatus.footerLabel}
      footerValue={`${contractStatus.footerValue} سنوي`}
      headerBadge={
        <span className="shrink-0 rounded border border-users-panel-border bg-users-table-divider px-2 py-0.5 text-[11px] font-medium text-users-text-muted">
          {contractStatus.total} عقد
        </span>
      }
    >
      <div className="min-w-0 space-y-4">
        {contractStatus.statuses.map((status) => (
          <div key={status.key} className="min-w-0 space-y-1.5">
            <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-xs min-[1023px]:max-[1025px]:flex-col min-[1023px]:max-[1025px]:items-stretch">
              <span className={`min-w-0 ${status.colorClassName}`}>
                {status.label}
              </span>
              <strong className="shrink-0 text-users-text-primary">
                {status.count} عقد ({status.percentage}%)
              </strong>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-users-table-divider">
              <div
                className={`h-full rounded-full ${status.trackClassName}`}
                style={{ width: `${status.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
