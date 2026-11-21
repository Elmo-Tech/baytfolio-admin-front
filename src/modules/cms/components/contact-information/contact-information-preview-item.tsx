import type { ReactNode } from "react";

interface ContactInformationPreviewItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  trailing?: ReactNode;
  external?: boolean;
}

export default function ContactInformationPreviewItem({
  icon,
  label,
  value,
  href,
  trailing,
  external = false,
}: ContactInformationPreviewItemProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex min-w-0 items-center gap-3 rounded-md bg-users-surface p-3 transition-colors hover:bg-users-surface-row-hover"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-users-table-header text-users-text-secondary">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-users-text-muted">{label}</p>
        <p
          dir="ltr"
          className="mt-1 truncate text-sm font-semibold text-users-text-primary"
        >
          {value}
        </p>
      </div>

      {trailing}
    </a>
  );
}
