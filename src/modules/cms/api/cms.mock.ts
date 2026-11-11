import type { CMSOverviewData } from "../types/cms";

export const cmsOverviewMock: CMSOverviewData = {
  helpCenter: {
    publishedQuestions: 28,
    categories: [
      "الحساب",
      "الغرف والمعارض",
      "المفضلة",
      "My Home",
      "المقارنة",
      "الباقات",
      "التقييمات",
    ],
  },
  contactInfo: {
    phone: "+966 11 400 9820",
    whatsapp: "+966 55 892 1100",
    email: "support@baytfolio.sa",
    workingHours: "الأحد - الخميس (8 ص - 6 م)",
  },
  privacyPolicy: {
    status: "published",
    lastUpdated: "01/10/2026",
    languages: ["العربية", "English"],
    scope: "نظام حماية البيانات الشخصية (PDPL)",
  },
  termsConditions: {
    status: "published",
    lastUpdated: "01/10/2026",
    languages: ["العربية", "English"],
    scope: "بوابة المستثمرين والمنصة العامة",
  },
};
