import type { PromotionPricing } from "../types/promotions.types";

export const promotionsPricingData: PromotionPricing[] = [
  {
    type: "غرفة",
    title: "سعر ترويج الغرفة / اليوم",
    description:
      "التعرفة المطبقة عند ترويج غرفة مفردة ظاهرة في مقدمة قوائم التصفح مع شارة «مُروج».",
    price: 200,
  },
  {
    type: "باقة",
    title: "سعر ترويج الباقة / اليوم",
    description:
      "التعرفة المطبقة عند ترويج باقة أثاث متكاملة لزيادة وصول المعرض للمستخدمين.",
    price: 250,
  },
  {
    type: "Banner",
    title: "سعر إعلان Banner / اليوم",
    description:
      "التعرفة المطبقة على إعلانات البانر في المساحات الإعلانية المعتمدة في تطبيق وموقع Baytfolio.",
    price: 500,
  },
];
