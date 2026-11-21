import { Input, Label } from "@/shared/components/ui";

import type { ContactFieldConfig } from "../../constants/contact-information";

interface ContactInformationFieldItemProps {
  config: ContactFieldConfig;
  value: string;
  onChange: (value: string) => void;
}

export default function ContactInformationFieldItem({
  config,
  value,
  onChange,
}: ContactInformationFieldItemProps) {
  const Icon = config.icon;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label
          htmlFor={config.id}
          className="flex items-center gap-2 text-sm font-semibold text-users-text-primary"
        >
          <Icon size={16} className="text-users-text-secondary" />
          {config.label}
        </Label>

        <span className="text-xs text-users-text-muted">{config.badge}</span>
      </div>

      <div className="relative">
        <Input
          id={config.id}
          type={config.type}
          dir={config.dir}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={config.placeholder}
          className={[
            "h-12 border-users-panel-divider bg-users-surface-input pl-11 text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0",
            config.dir === "ltr" ? "text-left" : "",
          ].join(" ")}
          required
        />

        <Icon
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-users-text-muted"
        />
      </div>

      <p className="text-xs leading-6 text-users-text-muted">
        {config.helperText}
      </p>
    </div>
  );
}
