import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type AnalyticsCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footerLabel: string;
  footerValue: string;
  headerBadge?: ReactNode;
  className?: string;
};

export default function AnalyticsCard({
  title,
  description,
  children,
  footerLabel,
  footerValue,
  headerBadge,
  className,
}: AnalyticsCardProps) {
  return (
    <article
      className={cn(
        "@container/card flex min-h-[316px] flex-col rounded-md border border-users-panel-border bg-users-surface p-5 shadow-sm",
        className,
      )}
    >
      <header className="border-b border-users-panel-divider pb-4">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <h2 className="min-w-0 text-sm font-bold text-users-text-primary">
            {title}
          </h2>
          {headerBadge}
        </div>
        <p className="mt-1 text-xs leading-5 text-users-text-muted">
          {description}
        </p>
      </header>

      <div className="min-h-0 flex-1 py-4">{children}</div>

      <footer className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-users-panel-divider pt-3 text-xs">
        <span className="min-w-0 text-users-text-muted">{footerLabel}</span>
        <strong className="font-bold text-users-status-active-fg">
          {footerValue}
        </strong>
      </footer>
    </article>
  );
}
