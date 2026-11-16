import type {
  ActiveShowroom,
  ExpiringContract,
  RecentActivity,
} from "../types/dashboard-insights.types";

export const expiringContractsMock: ExpiringContract[] = [
  {
    id: "contract-1",
    organization: "مصنع الخزف السعودي للأجنحة",
    expiryDate: "15 نوفمبر 2024",
    remainingDays: 6,
  },
  {
    id: "contract-2",
    organization: "شركة أبعاد التصميم المحدودة",
    expiryDate: "19 نوفمبر 2024",
    remainingDays: 10,
  },
  {
    id: "contract-3",
    organization: "صالة إيوان الشرق للأثاث",
    expiryDate: "22 نوفمبر 2024",
    remainingDays: 13,
  },
  {
    id: "contract-4",
    organization: "استوديو فيرنتشر ستايل",
    expiryDate: "28 نوفمبر 2024",
    remainingDays: 19,
  },
];

export const recentActivitiesMock: RecentActivity[] = [
  {
    id: "activity-1",
    title: "اعتماد غرفة معيشة مودرن #RM-8720",
    user: "سارة العتيبي",
    time: "منذ 12 دقيقة",
    status: "success",
  },
  {
    id: "activity-2",
    title: "طلب تعديلات على باقة فيلا أندلسية #PKG-310",
    user: "عبد المحسن",
    time: "منذ 45 دقيقة",
    status: "info",
  },
  {
    id: "activity-3",
    title: "تجديد وتوثيق عقد معرض الدار",
    user: "الإدارة التجارية",
    time: "منذ ساعتين",
    status: "success",
  },
  {
    id: "activity-4",
    title: "تعليق مؤقت لحساب معرض نيو ديزاين",
    user: "عبد الرحمن الشهري",
    time: "منذ 3 ساعات",
    status: "error",
  },
  {
    id: "activity-5",
    title: "تفعيل حملة ترويجية لموسم التأسيس",
    user: "فهد السليمان",
    time: "منذ 4 ساعات",
    status: "warning",
  },
];

export const activeShowroomsMock: ActiveShowroom[] = [
  {
    id: "showroom-1",
    name: "مفروشات المطلق الدولية",
    rooms: 48,
    packages: 12,
    views: "34.2K",
    interactions: "1.2K",
    growth: 32,
  },
  {
    id: "showroom-2",
    name: "دار الأركان للتجهيز والتأثيث",
    rooms: 36,
    packages: 8,
    views: "28.5K",
    interactions: "890",
    growth: 19,
  },
  {
    id: "showroom-3",
    name: "مصنع الخزف السعودي",
    rooms: 29,
    packages: 6,
    views: "21.1K",
    interactions: "640",
    growth: 11,
  },
  {
    id: "showroom-4",
    name: "مفروشات الرائد الحديثة",
    rooms: 24,
    packages: 4,
    views: "16.8K",
    interactions: "490",
    growth: 8,
  },
];
