import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type StatCardIconProps = {
  icon: LucideIcon;
  className?: string;
};

export function StatCardIcon({ icon: Icon, className }: StatCardIconProps) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-sm",
        className,
      )}
    >
      <Icon size={20} strokeWidth={1.9} />
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
  valueAdornment?: ReactNode;
  titleClassName?: string;
  valueClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

export function StatCard({
  title,
  value,
  description,
  icon,
  iconClassName,
  valueAdornment,
  titleClassName,
  valueClassName,
  descriptionClassName,
  className,
}: StatCardProps) {
  return (
    <article
      className={cn(
        "flex min-h-[108px] flex-col justify-between rounded-md border border-users-panel-border bg-users-surface p-4 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={cn(
              "text-xs font-medium text-text-muted",
              titleClassName,
            )}
          >
            {title}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <h3
              className={cn(
                "text-2xl font-bold leading-none text-users-text-primary",
                valueClassName,
              )}
            >
              {value.toLocaleString("en-US")}
            </h3>

            {valueAdornment}
          </div>
        </div>

        <StatCardIcon icon={icon} className={iconClassName} />
      </div>

      <p
        className={cn("mt-4 text-[11px] text-text-muted", descriptionClassName)}
      >
        {description}
      </p>
    </article>
  );
}
