export type TabValues = "categories" | "tags";

export type CateAndTagsTab = { value: TabValues; label: string };

export type CateAndTagsStatus = "نشط" | "معطل";

export interface CateAndTagsItem {
  id: number;
  nameAr: string;
  nameEn: string;
  order: number;
  status: CateAndTagsStatus;
  image: string;
}
