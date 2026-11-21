import { ArrowLeft, type LucideIcon } from "lucide-react";

interface NeedsAttentionCardProps {
  title: string;
  description: string;
  value: string | number;
  detail: string;
  secondary: string;
  action: string;
  icon: LucideIcon;
  classes: { border: string; icon: string; value: string; action: string };
  detailClass: string;
  secondaryClass: string;
  onAction: (action: string) => void;
}

export default function NeedsAttentionCard({
  title,
  description,
  value,
  detail,
  secondary,
  action,
  icon: Icon,
  classes,
  detailClass,
  secondaryClass,
  onAction,
}: NeedsAttentionCardProps) {
  return (
    <article
      className={`flex min-h-[228px] flex-col rounded-md border border-users-panel-border border-t-4 bg-users-surface p-6 shadow-sm ${classes.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-6 text-users-text-primary">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-5 text-users-text-muted">
            {description}
          </p>
        </div>

        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${classes.icon}`}
        >
          <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <strong className={`text-3xl font-bold leading-none ${classes.value}`}>
          {value}
        </strong>
      </div>

      <p className={`mt-3 text-sm leading-5 ${detailClass}`}>{detail}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-users-panel-divider pt-5">
        <span className={`text-sm ${secondaryClass}`}>{secondary}</span>

        <button
          type="button"
          onClick={() => onAction(action)}
          className={`inline-flex cursor-pointer items-center gap-1 text-sm font-semibold transition-colors hover:opacity-75 ${classes.action}`}
        >
          {action}
          <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
