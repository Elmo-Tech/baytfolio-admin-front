import type { ShowroomJoinRequest } from "../types/showroom-join-requests.types";

export const incomingRequests: ShowroomJoinRequest[] = [
  {
    id: "1",
    reference: "APP-2026-0142",
    showroomName: "Track Furniture",
    location: "الرياض",
    description:
      "معرض ومصنع متخصص في تصميم وتنفيذ وتوريد الأثاث المنزلي والمكتبي العصري بأعلى معايير الجودة.",
    activityType: "showroom",
    contactPerson: "أحمد محمود البواردي",
    phone: "+966 50 812 4321",
    email: "a.mahmoud@alraed.sa",
    submittedAt: "2026-10-07",
    status: "under_review",
    legalInformation: {},
    history: [
      {
        id: "event-2",
        status: "under_review",
        description: "تم فتح الطلب للمراجعة التشغيلية وتدقيق البيانات",
        timestamp: "2026-10-07T10:45:00",
        performedBy: "إبراهيم المهدي (Super Admin)",
        source: "admin",
      },
      {
        id: "event-1",
        status: "new",
        description: "تم استلام الطلب رسميًا من بوابة الشركاء",
        timestamp: "2026-10-07T09:12:00",
        performedBy: "النظام المركزي (System Automated)",
        source: "system",
      },
    ],
  },
  {
    id: "2",
    reference: "APP-2026-0141",
    showroomName: "صالون إيوان الشرق للأثاث الراقي",
    location: "جدة",
    activityType: "commercial_display",
    contactPerson: "م. طارق العتيبي",
    phone: "+966 55 331 9870",
    email: "tareq@iwan-east.com",
    submittedAt: "2026-10-07",
    status: "new",
    legalInformation: {},
    history: [
      {
        id: "event-3",
        status: "new",
        description: "تم استلام الطلب رسميًا من بوابة الشركاء",
        timestamp: "2026-10-07T09:30:00",
        performedBy: "النظام المركزي (System Automated)",
        source: "system",
      },
    ],
  },
];
