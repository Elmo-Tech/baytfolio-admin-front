import { Button } from "@/shared/components/ui/button";
import { CheckCircle2, Pencil, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function ReviewSectionCard({
  title,
  subtitle,
  icon: Icon,
  onEdit,
  children,
  className = "",
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  onEdit?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-border-subtle bg-card p-5 ${className}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-text-primary">
            <Icon size={19} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-text-muted">{subtitle}</p>
            <h3 className="mt-1 truncate text-sm font-bold text-text-primary">
              {title}
            </h3>
          </div>
        </div>
        {onEdit && (
          <Button
            unstyled
            type="button"
            onClick={onEdit}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-brand-navy transition-colors hover:bg-muted"
          >
            <Pencil size={13} />
            تعديل
          </Button>
        )}
      </div>
      {children}
    </section>
  );
}

export function ReviewDataItem({
  label,
  value,
  dir = "rtl",
  className = "",
}: {
  label: string;
  value?: string | number | null;
  dir?: "rtl" | "ltr";
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 text-right ${className}`}>
      <p className="text-[11px] text-text-muted">{label}</p>
      <p
        dir={dir}
        className="break-words text-right text-sm font-semibold leading-6 text-text-primary"
      >
        {value || "غير متوفر"}
      </p>
    </div>
  );
}

export function ReviewCheckItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-xs leading-6 text-text-secondary">
      <CheckCircle2 size={15} className="mt-1 shrink-0 text-success" />
      <span>{children}</span>
    </div>
  );
}
