import AnalyticsCard from "./analytics-card";
import { platformAnalyticsMock } from "../api/platform-analytics.mock";

const chartWidth = 520;
const chartHeight = 170;
const chartPadding = { top: 12, right: 8, bottom: 24, left: 8 };
const maxValue = 240;

function getPointCoordinates(values: number[]) {
  const width = chartWidth - chartPadding.left - chartPadding.right;
  const height = chartHeight - chartPadding.top - chartPadding.bottom;

  return values.map((value, index) => {
    const x =
      chartPadding.left + (index * width) / Math.max(values.length - 1, 1);
    const y = chartPadding.top + height - (value / maxValue) * height;

    return `${x},${y}`;
  });
}

export default function ContentGrowthCard() {
  const { contentGrowth } = platformAnalyticsMock;
  const roomPoints = getPointCoordinates(
    contentGrowth.points.map((point) => point.rooms),
  );
  const packagePoints = getPointCoordinates(
    contentGrowth.points.map((point) => point.packages),
  );

  return (
    <AnalyticsCard
      title="نمو المحتوى"
      description="مقارنة الغرف والباقات المنشورة خلال آخر 6 أشهر"
      footerLabel={contentGrowth.footerLabel}
      footerValue={contentGrowth.footerValue}
      className="lg:col-span-2"
    >
      <div className="flex h-full flex-col">
        <div className="mb-3 flex items-center justify-end gap-4 text-xs text-users-text-muted">
          {contentGrowth.series.map((series) => (
            <span key={series.key} className="flex items-center gap-1.5">
              <span
                className={`size-2 rounded-full bg-current ${series.colorClassName}`}
              />
              {series.label}
            </span>
          ))}
        </div>

        <div className="min-h-0 flex-1">
          <svg
            className="h-full min-h-[170px] w-full overflow-visible"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label="مخطط نمو الغرف والباقات المنشورة"
            preserveAspectRatio="none"
          >
            {[0, 1, 2, 3].map((line) => {
              const y =
                chartPadding.top +
                (line *
                  (chartHeight - chartPadding.top - chartPadding.bottom)) /
                  3;

              return (
                <line
                  key={line}
                  x1={chartPadding.left}
                  x2={chartWidth - chartPadding.right}
                  y1={y}
                  y2={y}
                  className="stroke-users-table-divider"
                  strokeDasharray="3 4"
                  strokeWidth="1"
                />
              );
            })}

            <polyline
              points={roomPoints.join(" ")}
              fill="none"
              className="stroke-brand-navy"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={packagePoints.join(" ")}
              fill="none"
              className="stroke-brand-gold-strong"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {contentGrowth.points.map((point, index) => (
              <text
                key={point.month}
                x={
                  chartPadding.left +
                  (index *
                    (chartWidth - chartPadding.left - chartPadding.right)) /
                    Math.max(contentGrowth.points.length - 1, 1)
                }
                y={chartHeight - 4}
                textAnchor="middle"
                className="fill-users-text-subtle text-[10px]"
              >
                {point.month}
              </text>
            ))}
          </svg>
        </div>
      </div>
    </AnalyticsCard>
  );
}
