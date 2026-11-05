import {
  Ban,
  ArrowLeft,
  Flag,
  FileText,
  Package,
  Sofa,
  Store,
  type LucideIcon,
} from "lucide-react";

import { needsAttentionMock } from "../api/needs-attention.mock";
import type {
  NeedsAttentionIcon,
  NeedsAttentionTone,
} from "../types/needs-attention.types";

const iconMap: Record<NeedsAttentionIcon, LucideIcon> = {
  store: Store,
  sofa: Sofa,
  package: Package,
  flag: Flag,
  "file-text": FileText,
  ban: Ban,
};

const toneClasses: Record<
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

export default function NeedsAttention() {
  return (
    <section aria-labelledby="needs-attention-heading" className="space-y-4">
      <header className="flex items-center justify-between gap-4">
        <h2
          id="needs-attention-heading"
          className="flex min-w-0 items-center gap-2 text-xl font-bold text-text-primary"
        >
          <span className="h-5 w-1 shrink-0 rounded-full bg-notification-unread" />
          <span>يحتاج إلى إجراء فوري (Needs Attention)</span>
        </h2>
        <p className="min-w-0 text-left text-xs leading-5 text-text-muted sm:text-sm">
          مهام تتطلب تخطيطًا واهتمامًا رسميًا
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[1025px]:grid-cols-3">
        {needsAttentionMock.map((item) => {
          const Icon = iconMap[item.icon];
          const classes = toneClasses[item.tone];

          return (
            <article
              key={item.id}
              className={`flex min-h-[228px] flex-col rounded-md border border-users-panel-border border-t-4 bg-users-surface p-6 shadow-sm ${classes.border}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-6 text-users-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-users-text-muted">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${classes.icon}`}
                >
                  <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                </div>
              </div>

              <div className="mt-6 flex items-end gap-2">
                <strong
                  className={`text-3xl font-bold leading-none ${classes.value}`}
                >
                  {item.value}
                </strong>
              </div>
              <p
                className={`mt-3 text-sm leading-5 ${
                  item.detailTone === "danger"
                    ? "text-badge-error-fg"
                    : item.detailTone === "warning"
                      ? "text-badge-warning-fg"
                      : "text-users-text-muted"
                }`}
              >
                {item.detail}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-users-panel-divider pt-5">
                <span
                  className={`text-sm ${
                    item.secondaryTone === "success"
                      ? "text-users-stat-success-fg"
                      : "text-users-text-muted"
                  }`}
                >
                  {item.secondary}
                </span>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${classes.action}`}
                >
                  {item.action}
                  <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
