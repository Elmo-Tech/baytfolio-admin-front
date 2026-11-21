import { CONTENT_GROWTH_CHART } from "../constants/platform-analytics-charts";
import { usePlatformAnalytics } from "../hooks/use-platform-analytics";
import {
  getContentGrowthGridY,
  getContentGrowthLabelX,
} from "../utils/platform-analytics-charts";
import AnalyticsCard from "./analytics-card";

export default function ContentGrowthCard() {
  const { contentGrowth } = usePlatformAnalytics();
  const { width, height, padding, gridLines } = CONTENT_GROWTH_CHART;

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
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label="مخطط نمو الغرف والباقات المنشورة"
            preserveAspectRatio="none"
          >
            {gridLines.map((line) => {
              const y = getContentGrowthGridY(line);
              return (
                <line
                  key={line}
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  className="stroke-users-table-divider"
                  strokeDasharray="3 4"
                  strokeWidth="1"
                />
              );
            })}

            <polyline
              points={contentGrowth.roomPoints}
              fill="none"
              className="stroke-brand-navy"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={contentGrowth.packagePoints}
              fill="none"
              className="stroke-brand-gold-strong"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {contentGrowth.points.map((point, index) => (
              <text
                key={point.month}
                x={getContentGrowthLabelX(index, contentGrowth.points.length)}
                y={height - 4}
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
