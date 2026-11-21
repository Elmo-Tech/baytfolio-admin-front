import type { LucideIcon } from "lucide-react";

import { Input, Label } from "@/shared/components/ui";

export function ContractSectionHeading({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="mb-5 flex items-start gap-3 border-b border-border-subtle pb-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy/5 text-brand-navy">
        <Icon size={19} />
      </div>
      <div>
        <h3 className="font-bold text-text-primary">{title}</h3>
        <p className="mt-1 text-xs leading-6 text-text-muted">{description}</p>
      </div>
    </div>
  );
}

export function ContractInputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  prefix,
  hint,
  dir = "rtl",
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  prefix?: string;
  hint?: string;
  dir?: "rtl" | "ltr";
  min?: number;
  max?: number;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <Label className="text-xs font-semibold text-text-primary">{label}</Label>
      <div className="flex min-w-0 overflow-hidden rounded-md border border-border-subtle bg-card focus-within:border-brand-navy">
        {prefix && (
          <span className="flex shrink-0 items-center border-l border-border-subtle bg-muted px-3 text-xs text-text-muted">
            {prefix}
          </span>
        )}
        <Input
          type={type}
          dir={dir}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 min-w-0 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>
      {hint && <p className="text-[11px] leading-5 text-text-muted">{hint}</p>}
    </div>
  );
}
