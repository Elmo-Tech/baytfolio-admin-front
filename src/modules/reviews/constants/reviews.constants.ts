import type { ReviewStatus } from "../types/reviews.types";

export const statusStyles: Record<ReviewStatus, string> = {
  "بانتظار المراجعة": "bg-status-pending-bg text-status-pending-fg",
  منشور: "bg-status-active-bg text-status-active-fg",
  مرفوض: "bg-status-suspended-bg text-status-suspended-fg",
  مخفي: "bg-status-deleted-bg text-status-deleted-fg",
};

export const metaStatusLabels: Record<ReviewStatus, string> = {
  "بانتظار المراجعة": "بانتظار المراجعة والاعتماد",
  منشور: "منشور ومعتمد",
  مرفوض: "مرفوض",
  مخفي: "مخفي",
};
