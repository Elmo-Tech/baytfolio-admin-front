import { activityData } from "../api/analytics.mock";

const chartSeries = [
  { key: "users", label: "مستخدمون جدد (×10)", color: "#172B40" },
  { key: "rooms", label: "غرف منشورة", color: "#477C9A" },
  { key: "packages", label: "باقات منشورة", color: "#D1A052" },
  { key: "showrooms", label: "معارض جديدة", color: "#38856A" },
] as const;

const maxValue = 60;
const chartHeight = 180;
const chartWidth = 680;
const topOffset = 18;
const leftOffset = 42;
const groupWidth = 130;
const barWidth = 16;
const barGap = 4;

export default function PlatformActivityChart() {
  const ticks = [0, 15, 30, 45, 60];

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
          {chartSeries.map((series) => (
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
          viewBox={`0 0 ${chartWidth + leftOffset + 10} ${chartHeight + 55}`}
          role="img"
          aria-label="رسم بياني يوضح نشاط المنصة خلال أربعة أسابيع"
          className="h-auto min-w-[560px] w-full"
        >
          {ticks.map((tick) => {
            const y = topOffset + chartHeight - (tick / maxValue) * chartHeight;

            return (
              <g key={tick}>
                <line
                  x1={leftOffset}
                  x2={chartWidth + leftOffset}
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

          {activityData.map((week, weekIndex) => {
            const values = [
              week.users,
              week.rooms,
              week.packages,
              week.showrooms,
            ];

            const center = leftOffset + 60 + weekIndex * groupWidth;

            return (
              <g key={week.week}>
                {values.map((value, seriesIndex) => {
                  const height = (value / maxValue) * chartHeight;
                  const x = center - 37 + seriesIndex * (barWidth + barGap);
                  const y = topOffset + chartHeight - height;

                  return (
                    <rect
                      key={chartSeries[seriesIndex].key}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={height}
                      rx="2"
                      fill={chartSeries[seriesIndex].color}
                    />
                  );
                })}

                <text
                  x={center}
                  y={topOffset + chartHeight + 23}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--color-text-secondary)"
                >
                  {week.week}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
