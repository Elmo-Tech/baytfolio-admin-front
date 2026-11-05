export type ContentGrowthSeriesKey = "rooms" | "packages";

export interface ContentGrowthPoint {
  month: string;
  rooms: number;
  packages: number;
}

export interface ContentGrowthSeries {
  key: ContentGrowthSeriesKey;
  label: string;
  colorClassName: string;
}

export type ShowroomStatusKey = "active" | "pending" | "suspended" | "closed";

export interface ShowroomStatus {
  key: ShowroomStatusKey;
  label: string;
  count: number;
  percentage: number;
  colorClassName: string;
  dotClassName: string;
}

export type ContractStatusKey =
  "active" | "expiring" | "expired" | "under-review";

export interface ContractStatus {
  key: ContractStatusKey;
  label: string;
  count: number;
  percentage: number;
  colorClassName: string;
  trackClassName: string;
}

export interface PlatformAnalyticsOverview {
  contentGrowth: {
    points: ContentGrowthPoint[];
    series: ContentGrowthSeries[];
    footerLabel: string;
    footerValue: string;
  };
  showroomStatus: {
    total: number;
    statuses: ShowroomStatus[];
    footerLabel: string;
    footerValue: string;
  };
  contractStatus: {
    total: number;
    statuses: ContractStatus[];
    footerLabel: string;
    footerValue: string;
  };
}
