import type { PlatformAnalyticsOverview } from "../types/platform-analytics.types";

export const platformAnalyticsMock: PlatformAnalyticsOverview = {
  contentGrowth: {
    points: [
      { month: "يونيو", rooms: 92, packages: 76 },
      { month: "يوليو", rooms: 118, packages: 91 },
      { month: "أغسطس", rooms: 136, packages: 108 },
      { month: "سبتمبر", rooms: 154, packages: 122 },
      { month: "أكتوبر", rooms: 177, packages: 143 },
      { month: "نوفمبر", rooms: 210, packages: 168 },
    ],
    series: [
      {
        key: "rooms",
        label: "الغرف",
        colorClassName: "text-brand-navy",
      },
      {
        key: "packages",
        label: "الباقات",
        colorClassName: "text-brand-gold-strong",
      },
    ],
    footerLabel: "معدل الإضافة الشهري",
    footerValue: "+310 أصل جديد / شهر",
  },
  showroomStatus: {
    total: 176,
    statuses: [
      {
        key: "active",
        label: "نشطة",
        count: 138,
        percentage: 78,
        colorClassName: "text-success",
        dotClassName: "bg-success",
      },
      {
        key: "pending",
        label: "قيد التفعيل",
        count: 21,
        percentage: 12,
        colorClassName: "text-info",
        dotClassName: "bg-info",
      },
      {
        key: "suspended",
        label: "موقوفة",
        count: 11,
        percentage: 6,
        colorClassName: "text-destructive",
        dotClassName: "bg-destructive",
      },
      {
        key: "closed",
        label: "مغلقة",
        count: 6,
        percentage: 4,
        colorClassName: "text-text-muted",
        dotClassName: "bg-text-muted",
      },
    ],
    footerLabel: "نسبة الامتثال للسياسات",
    footerValue: "94.2%",
  },
  contractStatus: {
    total: 142,
    statuses: [
      {
        key: "active",
        label: "سارية",
        count: 118,
        percentage: 83,
        colorClassName: "text-success",
        trackClassName: "bg-success",
      },
      {
        key: "expiring",
        label: "قاربة على الانتهاء (14 يوم)",
        count: 14,
        percentage: 10,
        colorClassName: "text-warning",
        trackClassName: "bg-warning",
      },
      {
        key: "expired",
        label: "منتهية",
        count: 6,
        percentage: 4,
        colorClassName: "text-destructive",
        trackClassName: "bg-destructive",
      },
      {
        key: "under-review",
        label: "معلقة / قيد المراجعة",
        count: 4,
        percentage: 3,
        colorClassName: "text-info",
        trackClassName: "bg-info",
      },
    ],
    footerLabel: "معدل تجديد العقود",
    footerValue: "91.8%",
  },
};
