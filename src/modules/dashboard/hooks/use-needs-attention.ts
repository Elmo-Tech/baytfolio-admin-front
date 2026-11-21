import { toast } from "sonner";

import { needsAttentionMock } from "../api/needs-attention.mock";
import {
  NEEDS_ATTENTION_DETAIL_CLASSES,
  NEEDS_ATTENTION_ICONS,
  NEEDS_ATTENTION_TONE_CLASSES,
} from "../constants/needs-attention";

export function useNeedsAttention() {
  const items = needsAttentionMock.map((item) => ({
    ...item,
    iconComponent: NEEDS_ATTENTION_ICONS[item.icon],
    classes: NEEDS_ATTENTION_TONE_CLASSES[item.tone],
    detailClass: item.detailTone
      ? NEEDS_ATTENTION_DETAIL_CLASSES[item.detailTone]
      : "text-users-text-muted",
    secondaryClass:
      item.secondaryTone === "success"
        ? "text-users-stat-success-fg"
        : "text-users-text-muted",
  }));

  return {
    items,
    onAction: (action: string) => toast.info(`صفحة ${action} قيد التطوير`),
  };
}
