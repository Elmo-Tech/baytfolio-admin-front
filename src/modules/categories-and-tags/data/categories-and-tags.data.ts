import type { CateAndTagsItem } from "../types/categories-and-tags.types";

import category1 from "../assets/category1.jpg";
import category2 from "../assets/category2.jpg";
import category3 from "../assets/category3.jpg";
import category4 from "../assets/category4.jpg";
import category5 from "../assets/category5.jpg";
import category6 from "../assets/category6.jpg";
import category7 from "../assets/category7.jpg";

import tag1 from "../assets/tag1.jpg";
import tag2 from "../assets/tag2.jpg";
import tag3 from "../assets/tag3.jpg";
import tag4 from "../assets/tag4.jpg";
import tag5 from "../assets/tag5.jpg";
import tag6 from "../assets/tag6.jpg";
import tag7 from "../assets/tag7.jpg";
import tag8 from "../assets/tag8.jpg";

export const totalItems = 170;
export const pageSize = 10;

export const categoriesData: CateAndTagsItem[] = [
  {
    id: 1,
    nameAr: "غرف النوم",
    nameEn: "Master & Bedrooms",
    order: 1,
    status: "نشط",
    image: category1,
  },
  {
    id: 2,
    nameAr: "غرف المعيشة",
    nameEn: "Living Rooms",
    order: 2,
    status: "نشط",
    image: category2,
  },
  {
    id: 3,
    nameAr: "غرف السفرة",
    nameEn: "Dining Rooms",
    order: 3,
    status: "نشط",
    image: category3,
  },
  {
    id: 4,
    nameAr: "غرف الأطفال",
    nameEn: "Kids & Youth Rooms",
    order: 4,
    status: "نشط",
    image: category4,
  },
  {
    id: 5,
    nameAr: "صالونات ومجالس",
    nameEn: "Salons & Majlis",
    order: 5,
    status: "نشط",
    image: category5,
  },
  {
    id: 6,
    nameAr: "مكاتب منزلية",
    nameEn: "Home Offices",
    order: 6,
    status: "معطل",
    image: category6,
  },
  {
    id: 7,
    nameAr: "أثاث خارجي وحدائق",
    nameEn: "Outdoor & Gardens",
    order: 7,
    status: "معطل",
    image: category7,
  },
];

export const tagsData: CateAndTagsItem[] = [
  {
    id: 1,
    nameAr: "مودرن",
    nameEn: "Modern",
    order: 1,
    status: "نشط",
    image: tag1,
  },
  {
    id: 2,
    nameAr: "كلاسيك",
    nameEn: "Classic",
    order: 2,
    status: "نشط",
    image: tag2,
  },
  {
    id: 3,
    nameAr: "نيو كلاسيك",
    nameEn: "Neo Classic",
    order: 3,
    status: "نشط",
    image: tag3,
  },
  {
    id: 4,
    nameAr: "مينيمال",
    nameEn: "Minimalist",
    order: 4,
    status: "نشط",
    image: tag4,
  },
  {
    id: 5,
    nameAr: "بوهيمي",
    nameEn: "Bohemian",
    order: 5,
    status: "نشط",
    image: tag5,
  },
  {
    id: 6,
    nameAr: "صناعي",
    nameEn: "Industrial",
    order: 6,
    status: "نشط",
    image: tag6,
  },
  {
    id: 7,
    nameAr: "إسكندنافي",
    nameEn: "Scandinavian",
    order: 7,
    status: "معطل",
    image: tag7,
  },
  {
    id: 8,
    nameAr: "ريفي",
    nameEn: "Rustic",
    order: 8,
    status: "معطل",
    image: tag8,
  },
];
