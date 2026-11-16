import { mockShowrooms } from "../../showrooms/api/showrooms.mock";

export const analyticsStats = [
  {
    id: "users",
    label: "مستخدمون جدد",
    value: "1,248",
    change: "+18.4%",
    description: "حساب مسجل جديد خلال الفترة",
    icon: "users",
  },
  {
    id: "showrooms",
    label: "معارض جديدة",
    value: "12",
    change: "+2",
    description: "معرض ومصنع معتمد جديد",
    icon: "store",
  },
  {
    id: "rooms",
    label: "غرف منشورة",
    value: "186",
    change: "+12%",
    description: "غرفة جديدة معتمدة للعرض",
    icon: "images",
  },
  {
    id: "packages",
    label: "باقات منشورة",
    value: "34",
    change: "مستقر",
    description: "باقة تأثيث كاملة منسقة",
    icon: "package",
  },
  {
    id: "reviews",
    label: "تقييمات منشورة",
    value: "92",
    change: "+15",
    description: "تقييم عملاء موثق ومفتوح",
    icon: "reviews",
  },
  {
    id: "promotions",
    label: "ترويجات بدأت",
    value: "28",
    change: "+6",
    description: "حملة ترويجية مفعلة في الفترة",
    icon: "megaphone",
  },
] as const;

export const activityData = [
  { week: "الأسبوع 1", users: 28, rooms: 38, packages: 6, showrooms: 2 },
  { week: "الأسبوع 2", users: 32, rooms: 44, packages: 9, showrooms: 3 },
  { week: "الأسبوع 3", users: 29, rooms: 52, packages: 11, showrooms: 4 },
  { week: "الأسبوع 4", users: 36, rooms: 52, packages: 8, showrooms: 3 },
];

export const commercialStats = [
  {
    id: "contracts",
    label: "قيمة العقود المسجلة",
    value: "420,000",
    unit: "ج.م",
    detail: "38 عقد",
    icon: "contracts",
  },
  {
    id: "services",
    label: "قيمة خدمات التوثيق المسجلة",
    value: "36,000",
    unit: "ج.م",
    detail: "18 طلب",
    icon: "services",
  },
  {
    id: "promotions",
    label: "قيمة الترويجات المسجلة",
    value: "58,400",
    unit: "ج.م",
    detail: "28 حملة",
    icon: "promotions",
  },
  {
    id: "expiring",
    label: "عقود قريبة من الانتهاء",
    value: "6",
    unit: "عقود",
    detail: "1 منتهي",
    icon: "expiring",
  },
] as const;

export const expiringContracts = [
  {
    id: "CNT-2026-0142",
    name: "Track Furniture",
    expiry: "31/10/2026",
    remaining: "متبقي 15 يوم",
    status: "قرب الانتهاء",
  },
  {
    id: "CNT-2024-0118",
    name: "موبليا مصر الحديثة",
    expiry: "15/08/2025",
    remaining: "منتهي منذ 27 يوم",
    status: "قرب الانتهاء",
  },
  {
    id: "CNT-2024-0119",
    name: "دار التصميم والأثاث",
    expiry: "22/06/2026",
    remaining: "متبقي 24 يوم",
    status: "قرب الانتهاء",
  },
  {
    id: "CNT-2024-0125",
    name: "رويال للأثاث المكتبي",
    expiry: "28/06/2026",
    remaining: "متبقي 30 يوم",
    status: "قرب الانتهاء",
  },
  {
    id: "CNT-2024-0071",
    name: "أوتليت ستايل",
    expiry: "25/05/2025",
    remaining: "منتهي منذ 6 أيام",
    status: "بانتظار التجديد",
  },
];

// Derived from the actual showroom records.
// IDs are shared with /showrooms/:showroomId.
export const activeShowrooms = mockShowrooms
  .map((showroom) => ({
    id: showroom.id,
    name: showroom.name,
    managerName: showroom.managerName,
    rooms: showroom.rooms.used,
    packages: showroom.packages.used,
    total: showroom.rooms.used + showroom.packages.used,
  }))
  .sort((a, b) => b.total - a.total)
  .slice(0, 5);
