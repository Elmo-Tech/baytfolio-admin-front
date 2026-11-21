import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";
import type { FilterOption } from "../constants/user-filters";

interface UserFilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
  triggerClassName?: string;
}

export default function UserFilterSelect({
  value,
  onValueChange,
  placeholder,
  options,
  triggerClassName = "w-[165px]",
}: UserFilterSelectProps) {
  return (
    <Select dir="rtl" value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`h-11 shrink-0 cursor-pointer rounded-md border-users-panel-divider bg-users-surface px-3 text-sm text-users-text-secondary shadow-none ${triggerClassName}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
