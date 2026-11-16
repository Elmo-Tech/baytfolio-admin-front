import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface CMSOverviewCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function CMSOverviewCard({
  title,
  description,
  icon: Icon,
  badge,
  children,
  action,
}: CMSOverviewCardProps) {
  return (
    <section className="flex min-w-0 flex-col rounded-lg border border-border-subtle bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-muted text-text-primary">
          <Icon size={21} strokeWidth={1.8} />
        </div>

        {badge && (
          <span className="rounded-sm bg-status-active-bg px-2 py-1 text-xs font-medium text-status-active-fg">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>

        <p className="mt-1 text-sm leading-6 text-text-secondary">
          {description}
        </p>
      </div>

      <div className="mt-4 flex-1 rounded-md bg-surface-admin p-3">
        {children}
      </div>

      {action && <div className="mt-4">{action}</div>}
    </section>
  );
}
