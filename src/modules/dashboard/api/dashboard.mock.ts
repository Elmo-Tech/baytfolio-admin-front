import type { DashboardOverview } from "../types/dashboard.types";

export const dashboardMock: DashboardOverview = {
  metrics: [
    {
      id: "active-showrooms",
      label: "المعارض النشطة",
      value: 1240,
      trend: "up",
      changePercentage: 5.2,
      description: "↗ 5.2% نمو شهري",
      descriptionTone: "success",
    },
    {
      id: "registered-users",
      label: "المستخدمون المسجلون",
      value: 24800,
      trend: "up",
      changePercentage: 8.4,
      description: "↗ 8.4% نمو نشط",
      descriptionTone: "success",
    },
    {
      id: "published-rooms",
      label: "الغرف المنشورة",
      value: 3680,
      trend: "up",
      description: "الغرف المنشورة على المنصة",
      descriptionTone: "success",
    },
    {
      id: "published-packages",
      label: "الباقات المنشورة",
      value: 420,
      trend: "neutral",
      description: "→ نمو مستقر",
      descriptionTone: "muted",
    },
    {
      id: "active-promotions",
      label: "الترويجات النشطة",
      value: 6,
      trend: "up",
      changePercentage: 12,
      description: "● حملة مفعلة حاليا",
      descriptionTone: "warning",
    },
    {
      id: "pending-reviews",
      label: "التقييمات المعلقة",
      value: 7,
      trend: "neutral",
      description: "● يتطلب اتخاذ إجراء",
      descriptionTone: "danger",
    },
  ],
};
