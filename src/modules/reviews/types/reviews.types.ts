export interface ReviewUser {
  name: string;
  username: string;
  initial: string;
}

export type ReviewStatus = "بانتظار المراجعة" | "منشور" | "مرفوض" | "مخفي";

export interface Review {
  id: number;
  user: ReviewUser;
  rating: number;
  category: string;
  item: string;
  supplier: string;
  comment: string;
  status: ReviewStatus;
  date: string;
}
