import type { Phone, Store } from "lucide-react";

import { Button } from "@/shared/components/ui";

export function DetailItem({
  label,
  value,
  icon: Icon,
  dir,
}: {
  label: string;
  value: string;
  icon: typeof Store;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div className="flex min-h-[76px] min-w-0 items-center gap-3 rounded-lg border border-border-subtle bg-card px-4 py-3 transition-colors hover:bg-users-surface-row-hover">
      <Icon size={18} className="shrink-0 text-text-secondary" />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-text-muted">{label}</p>
        <p
          dir={dir}
          className="mt-1 break-words text-sm font-semibold text-text-primary"
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export function SectionHeading({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description?: string;
  icon: typeof Store;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="h-5 w-1 rounded-full bg-primary" />
        <Icon size={17} className="text-primary" />
        <h2 className="text-sm font-bold text-text-primary">{title}</h2>
      </div>
      {description && (
        <span className="text-[11px] text-text-muted">{description}</span>
      )}
    </div>
  );
}

export function ContactAction({
  label,
  href,
  icon: Icon,
  variant = "default",
}: {
  label: string;
  href: string;
  icon: typeof Phone;
  variant?: "default" | "whatsapp";
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={`h-12 min-w-0 flex-1 gap-2 rounded-lg text-sm transition-colors ${
        variant === "whatsapp"
          ? "border-success/15 bg-success/10 text-success hover:bg-success/15"
          : "border-transparent bg-muted text-text-primary hover:bg-users-surface-row-hover"
      }`}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
    >
      <Icon size={17} className="shrink-0" />
      <span className="truncate">{label}</span>
    </Button>
  );
}
