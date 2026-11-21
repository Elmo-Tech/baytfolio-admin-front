import type { Building2 } from "lucide-react";

interface Props {
  label: string;
  value: string;
  icon: typeof Building2;
  className?: string;
  dir?: "rtl" | "ltr";
}

export default function WizardShowroomReadonlyItem({
  label,
  value,
  icon: Icon,
  className = "",
  dir = "rtl",
}: Props) {
  return (
    <div
      className={`rounded-lg border border-border-subtle bg-background p-4 ${className}`}
    >
      <p className="text-xs text-text-muted">{label}</p>
      <div className="mt-2 flex items-center gap-2">
        <Icon size={17} className="shrink-0 text-text-secondary" />
        <p
          dir={dir}
          className="min-w-0 break-words text-sm font-semibold text-text-primary"
        >
          {value || "غير متوفر"}
        </p>
      </div>
    </div>
  );
}
