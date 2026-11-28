import type { Promotion } from "../types/promotions.types";

import content1 from "../assets/content-1.jpg";
import content2 from "../assets/content-2.jpg";
import content3 from "../assets/content-3.jpg";
import content4 from "../assets/content-4.jpg";
import content5 from "../assets/content-5.jpg";
import content6 from "../assets/content-6.jpg";

export const promotionsCurrentData: Promotion[] = [
  {
    id: 1,
    type: "غرفة",
    content: {
      title: "غرفة نوم مودرن Master Suite",
      code: "PRM-1029",
      image: content1,
    },
    showroom: "Track Furniture",
    startDate: "10/10/2026",
    endDate: "20/10/2026",
    remaining: "7 أيام",
    dailyPrice: 200,
    totalValue: 2000,
    status: "نشط",
  },
  {
    id: 2,
    type: "Banner",
    content: {
      title: "عرض الصيف الترويجي - كلاسيك هـ",
      code: "PRM-1030",
      image: content2,
    },
    showroom: "كلاسيك هوم",
    startDate: "12/10/2026",
    endDate: "17/10/2026",
    remaining: "4 أيام",
    dailyPrice: 500,
    totalValue: 2500,
    status: "نشط",
  },
  {
    id: 3,
    type: "باقة",
    content: {
      title: "باقة صالون كلاسيك ملك",
      code: "PRM-1031",
      image: content3,
    },
    showroom: "مفروشات المطلق",
    startDate: "08/10/2026",
    endDate: "15/10/2026",
    remaining: "يوم واحد",
    dailyPrice: 250,
    totalValue: 1750,
    status: "نشط",
  },
  {
    id: 4,
    type: "غرفة",
    content: {
      title: "طقم سفرة أركان مودرن 8 مقاعد",
      code: "PRM-1032",
      image: content4,
    },
    showroom: "أركان للمفروشات",
    startDate: "11/10/2026",
    endDate: "23/10/2026",
    remaining: "12 يوماً",
    dailyPrice: 200,
    totalValue: 2400,
    status: "نشط",
  },
  {
    id: 5,
    type: "باقة",
    content: {
      title: "تجهيزات مطابخ ألمانية بلت-",
      code: "PRM-1033",
      image: content5,
    },
    showroom: "Track Furniture",
    startDate: "09/10/2026",
    endDate: "19/10/2026",
    remaining: "6 أيام",
    dailyPrice: 300,
    totalValue: 3000,
    status: "نشط",
  },
  {
    id: 6,
    type: "Banner",
    content: {
      title: "بانر الصفحة الرئيسية: تشكيلة الخزر",
      code: "PRM-1034",
      image: content6,
    },
    showroom: "أركان للمفروشات",
    startDate: "13/10/2026",
    endDate: "27/10/2026",
    remaining: "14 يوماً",
    dailyPrice: 500,
    totalValue: 7000,
    status: "نشط",
  },
  {
    id: 7,
    type: "غرفة",
    content: {
      title: "غرفة أطفال بتصميم إسكندنا",
      code: "PRM-1035",
      image: content1,
    },
    showroom: "كلاسيك هوم",
    startDate: "05/10/2026",
    endDate: "15/10/2026",
    remaining: "يومان",
    dailyPrice: 200,
    totalValue: 2000,
    status: "نشط",
  },
  {
    id: 8,
    type: "غرفة",
    content: {
      title: "مكتب إداري من خشب البلوط الطبيعي",
      code: "PRM-1036",
      image: content2,
    },
    showroom: "مفروشات المطلق",
    startDate: "07/10/2026",
    endDate: "18/10/2026",
    remaining: "5 أيام",
    dailyPrice: 220,
    totalValue: 2420,
    status: "نشط",
  },
];
