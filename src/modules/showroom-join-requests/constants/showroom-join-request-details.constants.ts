import { Building2, Factory, Store } from "lucide-react";

import type {
  ShowroomActivityType,
  ShowroomJoinRequestStatus,
} from "../types/showroom-join-requests.types";

export const REQUEST_STATUSES = [
  "new",
  "under_review",
  "pending_agreement",
  "approved",
  "contacted",
  "qualified",
  "rejected",
  "closed",
] as const satisfies readonly ShowroomJoinRequestStatus[];

export const REQUEST_DETAILS_STATUS_CONFIG: Record<
  ShowroomJoinRequestStatus,
  { label: string; className: string }
> = {
  new: { label: "طلب جديد", className: "bg-muted text-text-secondary" },
  under_review: { label: "قيد المراجعة", className: "bg-info/10 text-info" },
  pending_agreement: {
    label: "بانتظار الاتفاق",
    className: "bg-warning/10 text-warning",
  },
  approved: {
    label: "معتمد لبدء التجهيز",
    className: "bg-success/10 text-success",
  },
  contacted: { label: "تم التواصل", className: "bg-info/10 text-info" },
  qualified: { label: "مؤهل", className: "bg-success/10 text-success" },
  rejected: {
    label: "مرفوض",
    className: "bg-destructive/10 text-destructive",
  },
  closed: { label: "مغلق", className: "bg-muted text-text-secondary" },
};

export const REQUEST_DETAILS_ACTIVITY_CONFIG: Record<
  ShowroomActivityType,
  { label: string; icon: typeof Store }
> = {
  showroom: { label: "معرض ومصنع", icon: Store },
  commercial_display: { label: "صالة عرض تجارية", icon: Building2 },
  factory: { label: "مصنع أثاث وخزائن", icon: Factory },
  design_studio: { label: "استوديو تصميم وتصنيع", icon: Building2 },
};

export const DEFAULT_REJECTION_REASON =
  "البيانات المقدمة لا تتوافق حاليًا مع متطلبات الانضمام إلى المنصة.";
