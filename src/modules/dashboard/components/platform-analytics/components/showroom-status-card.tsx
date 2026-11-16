import AnalyticsCard from "./analytics-card";
import { platformAnalyticsMock } from "../api/platform-analytics.mock";

const donutRadius = 50;
const donutCircumference = 2 * Math.PI * donutRadius;

export default function ShowroomStatusCard() {
  const { showroomStatus } = platformAnalyticsMock;
  const segments = showroomStatus.statuses.reduce<
    Array<{
      key: string;
      colorClassName: string;
      dashLength: number;
      offset: number;
    }>
  >((segments, status) => {
    const dashLength = (status.percentage / 100) * donutCircumference;
    const previousOffset = segments.at(-1)?.offset ?? 0;
    const previousLength = segments.at(-1)?.dashLength ?? 0;

    return [
      ...segments,
      {
        key: status.key,
        colorClassName: status.colorClassName,
        dashLength,
        offset: previousOffset + previousLength,
      },
    ];
  }, []);

  return (
    <AnalyticsCard
      title="حالة المعارض"
      description="توزيع المعارض المسجلة حسب الوضع التشغيلي"
      footerLabel={showroomStatus.footerLabel}
      footerValue={showroomStatus.footerValue}
      headerBadge={
        <span className="shrink-0 whitespace-nowrap rounded border border-users-panel-border bg-users-table-divider px-2 py-0.5 text-[11px] font-medium text-users-text-muted">
          {showroomStatus.total} معرض
        </span>
      }
    >
      <div className="flex h-full min-w-0 flex-col items-center justify-center gap-5 @sm/card:flex-row min-[1022px]:max-[1279px]:flex-row min-[1023px]:max-[1180px]:!flex-col">
        <div className="relative size-32 shrink-0 @sm/card:size-36 min-[1022px]:max-[1279px]:size-36 min-[1023px]:max-[1180px]:!size-32">
          <svg
            className="size-full -rotate-90"
            viewBox="0 0 120 120"
            role="img"
            aria-label={`توزيع ${showroomStatus.total} معرض`}
          >
            <circle
              cx="60"
              cy="60"
              r={donutRadius}
              fill="none"
              className="stroke-users-table-divider"
              strokeWidth="14"
            />
            {segments.map((segment) => {
              return (
                <circle
                  key={segment.key}
                  cx="60"
                  cy="60"
                  r={donutRadius}
                  fill="none"
                  className={`stroke-current ${segment.colorClassName}`}
                  strokeWidth="14"
                  strokeDasharray={`${segment.dashLength} ${donutCircumference - segment.dashLength}`}
                  strokeDashoffset={-segment.offset}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <strong className="text-xl font-bold text-users-text-primary">
              {showroomStatus.total}
            </strong>
            <span className="text-[10px] text-users-text-muted">معرض</span>
          </div>
        </div>

        <div className="grid w-full min-w-0 max-w-full grid-cols-1 gap-3 @sm/card:w-auto @sm/card:min-w-[180px] min-[1022px]:max-[1279px]:w-auto min-[1022px]:max-[1279px]:min-w-[180px] min-[1023px]:max-[1180px]:!w-full min-[1023px]:max-[1180px]:!min-w-0">
          {showroomStatus.statuses.map((status) => (
            <div
              key={status.key}
              className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 text-xs"
            >
              <span
                className={`size-2 shrink-0 rounded-full ${status.dotClassName}`}
              />
              <span
                dir="rtl"
                className="min-w-16 max-w-full text-right text-users-text-muted"
              >
                {status.label}
              </span>
              <strong
                dir="ltr"
                className="whitespace-nowrap text-left text-users-text-primary"
              >
                {status.percentage}% ({status.count})
              </strong>
            </div>
          ))}
        </div>
      </div>
    </AnalyticsCard>
  );
}
