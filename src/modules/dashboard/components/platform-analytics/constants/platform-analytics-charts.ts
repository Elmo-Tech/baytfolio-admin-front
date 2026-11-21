export const CONTENT_GROWTH_CHART = {
  width: 520,
  height: 170,
  padding: { top: 12, right: 8, bottom: 24, left: 8 },
  maxValue: 240,
  gridLines: [0, 1, 2, 3],
} as const;

export const SHOWROOM_DONUT_CHART = {
  radius: 50,
  circumference: 2 * Math.PI * 50,
} as const;
