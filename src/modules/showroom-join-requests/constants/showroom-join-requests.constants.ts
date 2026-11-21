import { Building2, Factory, Palette, Store } from "lucide-react";

import type {
  ShowroomActivityType,
  ShowroomJoinRequestStatus,
} from "../types/showroom-join-requests.types";

export const JOIN_REQUEST_STATUS_CONFIG: Record<
  ShowroomJoinRequestStatus,
  { label: string; filterLabel: string; className: string }
> = {
  new: {
    label: "طلب جديد",
    filterLabel: "طلب جديد",
    className: "border-transparent bg-info/10 text-info",
  },
  under_review: {
    label: "قيد المراجعة",
    filterLabel: "قيد المراجعة",
    className: "border-transparent bg-info/10 text-info",
  },
  pending_agreement: {
    label: "بانتظار الاتفاق",
    filterLabel: "بانتظار الاتفاق",
    className: "border-transparent bg-warning/10 text-warning",
  },
  approved: {
    label: "معتمد لبدء التجهيز",
    filterLabel: "معتمد لبدء التجهيز",
    className: "border-transparent bg-success/10 text-success",
  },
  contacted: {
    label: "تم التواصل",
    filterLabel: "تم التواصل",
    className: "border-transparent bg-muted text-muted-foreground",
  },
  qualified: {
    label: "مؤهل",
    filterLabel: "مؤهل",
    className: "border-transparent bg-success/10 text-success",
  },
  rejected: {
    label: "مرفوض",
    filterLabel: "مرفوض",
    className: "border-transparent bg-destructive/10 text-destructive",
  },
  closed: {
    label: "مغلق",
    filterLabel: "مغلق",
    className: "border-transparent bg-muted text-muted-foreground",
  },
};

export const JOIN_REQUEST_ACTIVITY_CONFIG: Record<
  ShowroomActivityType,
  { label: string; filterLabel: string; icon: typeof Store }
> = {
  showroom: {
    label: "معرض ومصنع",
    filterLabel: "معرض",
    icon: Store,
  },
  commercial_display: {
    label: "صالة عرض تجارية",
    filterLabel: "صالة عرض تجارية",
    icon: Building2,
  },
  factory: {
    label: "مصنع أثاث وخزائن",
    filterLabel: "مصنع",
    icon: Factory,
  },
  design_studio: {
    label: "استوديو تصميم وتصنيع",
    filterLabel: "استوديو تصميم",
    icon: Palette,
  },
};
