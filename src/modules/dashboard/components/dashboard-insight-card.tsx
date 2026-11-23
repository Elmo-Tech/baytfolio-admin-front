import { Button } from "@/shared/components/ui/button";
import type { ReactNode } from "react";

interface DashboardInsightCardProps {
  title: string;
  icon: ReactNode;
  action?: string;
  onAction?: () => void;
  footerLabel: string;
  footerAction: string;
  onFooterAction: () => void;
  children: ReactNode;
}

export default function DashboardInsightCard({
  title,
  icon,
  action,
  onAction,
  footerLabel,
  footerAction,
  onFooterAction,
  children,
}: DashboardInsightCardProps) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-border-warm bg-card p-5 shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-border-divider pb-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-brand-gold-strong">{icon}</span>
          <h3 className="truncate text-base font-bold text-text-primary">
            {title}
          </h3>
        </div>

        {action && (
          <Button
            unstyled
            type="button"
            onClick={onAction}
            className="shrink-0 cursor-pointer text-sm font-semibold text-brand-navy transition-colors hover:text-brand-gold-strong"
          >
            {action}
          </Button>
        )}
      </div>

      <div className="flex flex-1 flex-col">{children}</div>

      <div className="flex items-center justify-between gap-3 border-t border-border-divider pt-4 text-sm">
        <span className="text-text-muted">{footerLabel}</span>
        <Button
          unstyled
          type="button"
          onClick={onFooterAction}
          className="shrink-0 cursor-pointer font-semibold text-brand-navy transition-colors hover:text-brand-gold-strong"
        >
          {footerAction}
        </Button>
      </div>
    </article>
  );
}
