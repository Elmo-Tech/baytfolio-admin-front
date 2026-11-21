import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

export interface FilterSelectOption {
  value: string;
  label: string;
}

interface JoinRequestFilterSelectProps {
  ariaLabel: string;
  value: string;
  options: readonly FilterSelectOption[];
  onChange: (value: string) => void;
}

export default function JoinRequestFilterSelect({
  ariaLabel,
  value,
  options,
  onChange,
}: JoinRequestFilterSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={ariaLabel}
        className="h-10 min-w-0 w-full border-border-subtle bg-background text-xs shadow-none"
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
