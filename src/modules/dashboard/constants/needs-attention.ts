import {
  Ban,
  FileText,
  Flag,
  Package,
  Sofa,
  Store,
  type LucideIcon,
} from "lucide-react";

import type {
  NeedsAttentionIcon,
  NeedsAttentionItem,
  NeedsAttentionTone,
} from "../types/needs-attention.types";

export const NEEDS_ATTENTION_ICONS: Record<NeedsAttentionIcon, LucideIcon> = {
  store: Store,
  sofa: Sofa,
  package: Package,
  flag: Flag,
  "file-text": FileText,
  ban: Ban,
};

export const NEEDS_ATTENTION_TONE_CLASSES: Record<
  NeedsAttentionTone,
  { border: string; icon: string; value: string; action: string }
> = {
  warning: {
    border: "border-t-badge-warning-fg",
    icon: "bg-badge-warning-bg text-badge-warning-fg",
    value: "text-brand-navy",
    action: "text-brand-navy",
  },
  info: {
    border: "border-t-badge-info-fg",
    icon: "bg-badge-info-bg text-badge-info-fg",
    value: "text-brand-navy",
    action: "text-brand-navy",
  },
  navy: {
    border: "border-t-brand-navy",
    icon: "bg-users-stat-neutral-bg text-brand-navy",
    value: "text-brand-navy",
    action: "text-brand-navy",
  },
  danger: {
    border: "border-t-badge-error-fg",
    icon: "bg-badge-error-bg text-badge-error-fg",
    value: "text-badge-error-fg",
    action: "text-badge-error-fg",
  },
  muted: {
    border: "border-t-text-muted-icon",
    icon: "bg-users-table-divider text-text-muted",
    value: "text-brand-navy",
    action: "text-brand-navy",
  },
};

export const NEEDS_ATTENTION_DETAIL_CLASSES: Record<
  NonNullable<NeedsAttentionItem["detailTone"]>,
  string
> = {
  danger: "text-badge-error-fg",
  warning: "text-badge-warning-fg",
};
