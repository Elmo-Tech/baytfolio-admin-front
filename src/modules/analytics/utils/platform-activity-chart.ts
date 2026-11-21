import {
  ACTIVITY_CHART_LAYOUT,
  ACTIVITY_CHART_SERIES,
} from "../constants/platform-activity-chart";

interface ActivityWeekItem {
  week: string;
  users: number;
  rooms: number;
  packages: number;
  showrooms: number;
}

export function getActivityTickY(tick: number) {
  const { topOffset, height, maxValue } = ACTIVITY_CHART_LAYOUT;
  return topOffset + height - (tick / maxValue) * height;
}

export function buildActivityWeekGroups(data: ActivityWeekItem[]) {
  const {
    topOffset,
    leftOffset,
    height,
    maxValue,
    groupWidth,
    barWidth,
    barGap,
  } = ACTIVITY_CHART_LAYOUT;

  return data.map((week, weekIndex) => {
    const values = [week.users, week.rooms, week.packages, week.showrooms];
    const center = leftOffset + 60 + weekIndex * groupWidth;

    const bars = values.map((value, seriesIndex) => {
      const barHeight = (value / maxValue) * height;
      return {
        key: ACTIVITY_CHART_SERIES[seriesIndex].key,
        color: ACTIVITY_CHART_SERIES[seriesIndex].color,
        x: center - 37 + seriesIndex * (barWidth + barGap),
        y: topOffset + height - barHeight,
        width: barWidth,
        height: barHeight,
      };
    });

    return { week: week.week, center, labelY: topOffset + height + 23, bars };
  });
}
