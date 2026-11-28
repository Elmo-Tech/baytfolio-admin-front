import type { LucideIcon } from "lucide-react";

export type PromotionsTab = "current" | "requests" | "pricing";

export interface PromotionsTabItem {
  value: PromotionsTab;
  label: string;
  count?: number;
  icon: LucideIcon;
}

export type PromotionType = "غرفة" | "باقة" | "Banner";

export type PromotionStatus = "نشط" | "بانتظار المراجعة" | "مرفوض" | "مخفي";

export interface PromotionContent {
  title: string;
  code: string;
  image: string;
}

export interface Promotion {
  id: number;
  type: PromotionType;
  content: PromotionContent;
  showroom: string;
  startDate: string;
  endDate: string;
  remaining: string;
  dailyPrice: number;
  totalValue: number;
  status: PromotionStatus;
}

export interface PromotionRequest {
  id: number;
  requestCode: string;
  type: PromotionType;
  content: PromotionContent;
  targetTitle: string;
  showroom: string;
  showroomCode: string;
  categoryPath: string;
  durationDays: number;
  durationLabel: string;
  dailyPrice: number;
  totalValue: number;
  requestDate: string;
  requestedAt: string;
  status: PromotionStatus;
}

export interface PromotionPricing {
  type: PromotionType;
  title: string;
  description: string;
  price: number;
}
