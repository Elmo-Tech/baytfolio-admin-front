import {
  ACTIVITY_CHART_LAYOUT,
  ACTIVITY_CHART_SERIES,
} from "../constants/platform-activity-chart";
import { usePlatformActivityChart } from "../hooks/use-platform-activity-chart";
import { getActivityTickY } from "../utils/platform-activity-chart";

export default function PlatformActivityChart() {
  const { weekGroups } = usePlatformActivityChart();
  const { width, height, leftOffset, ticks } = ACTIVITY_CHART_LAYOUT;

  return (
    <section className="rounded-lg border border-border-subtle bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col justify-between gap-3 border-b border-border-divider pb-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-status-info-fg" />
            <h2 className="font-bold text-text-primary">
              نشاط المنصة خلال الفترة
            </h2>
          </div>
          <p className="mt-1 text-xs text-text-muted">
            توزيع النشر، التسجيل، والحملات مقسمة على أسابيع شهر مايو الأربعة
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {ACTIVITY_CHART_SERIES.map((series) => (
            <div
              key={series.key}
              className="flex items-center gap-1.5 text-[11px] text-text-secondary"
            >
              <span
                className="size-2.5 rounded-sm"
                style={{ backgroundColor: series.color }}
              />
              {series.label}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width + leftOffset + 10} ${height + 55}`}
          role="img"
          aria-label="رسم بياني يوضح نشاط المنصة خلال أربعة أسابيع"
          className="h-auto min-w-[560px] w-full"
        >
          {ticks.map((tick) => {
            const y = getActivityTickY(tick);
            return (
              <g key={tick}>
                <line
                  x1={leftOffset}
                  x2={width + leftOffset}
                  y1={y}
                  y2={y}
                  stroke="var(--color-border-divider)"
                  strokeDasharray="3 4"
                />
                <text
                  x={leftOffset - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="var(--color-text-muted)"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {weekGroups.map((group) => (
            <g key={group.week}>
              {group.bars.map((bar) => (
                <rect
                  key={bar.key}
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  rx="2"
                  fill={bar.color}
                />
              ))}
              <text
                x={group.center}
                y={group.labelY}
                textAnchor="middle"
                fontSize="12"
                fill="var(--color-text-secondary)"
              >
                {group.week}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
