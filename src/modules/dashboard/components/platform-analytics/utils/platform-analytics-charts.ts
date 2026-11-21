import {
  CONTENT_GROWTH_CHART,
  SHOWROOM_DONUT_CHART,
} from "../constants/platform-analytics-charts";
import type { ShowroomStatus } from "../types/platform-analytics.types";

export function getContentGrowthCoordinates(values: number[]) {
  const { width, height, padding, maxValue } = CONTENT_GROWTH_CHART;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  return values.map((value, index) => {
    const x =
      padding.left + (index * innerWidth) / Math.max(values.length - 1, 1);
    const y = padding.top + innerHeight - (value / maxValue) * innerHeight;
    return `${x},${y}`;
  });
}

export function getContentGrowthGridY(lineIndex: number) {
  const { height, padding } = CONTENT_GROWTH_CHART;
  const innerHeight = height - padding.top - padding.bottom;
  return padding.top + (lineIndex * innerHeight) / 3;
}

export function getContentGrowthLabelX(index: number, totalPoints: number) {
  const { width, padding } = CONTENT_GROWTH_CHART;
  const innerWidth = width - padding.left - padding.right;
  return padding.left + (index * innerWidth) / Math.max(totalPoints - 1, 1);
}

export function buildShowroomDonutSegments(statuses: ShowroomStatus[]) {
  return statuses.reduce<
    Array<{
      key: string;
      colorClassName: string;
      dashLength: number;
      offset: number;
    }>
  >((acc, status) => {
    const dashLength =
      (status.percentage / 100) * SHOWROOM_DONUT_CHART.circumference;
    const previous = acc.at(-1);
    const offset = (previous?.offset ?? 0) + (previous?.dashLength ?? 0);

    return [
      ...acc,
      {
        key: status.key,
        colorClassName: status.colorClassName,
        dashLength,
        offset,
      },
    ];
  }, []);
}
