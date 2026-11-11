import { RotateCcw, Search } from "lucide-react";

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

import { helpCenterCategories } from "../../api/help-center.mock";

interface HelpCenterFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export default function HelpCenterFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  onReset,
}: HelpCenterFiltersProps) {
  return (
    <section
      dir="rtl"
      className="flex flex-col gap-3 rounded-md border border-users-panel-border bg-users-surface p-4 lg:flex-row lg:items-center"
    >
      {/* Search */}
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          aria-hidden="true"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
        />

        <Input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="ابحث في الأسئلة..."
          className="h-11 w-full rounded-md border-users-panel-divider bg-users-surface-input pr-10 pl-4 text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0"
        />
      </div>

      {/* Category */}
      <div className="flex shrink-0 items-center gap-2">
        <span className="whitespace-nowrap text-sm text-users-text-secondary">
          التصنيف:
        </span>

        <Select dir="rtl" value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-11 w-[155px] shrink-0 cursor-pointer rounded-md border-users-panel-divider bg-users-surface px-3 text-sm text-users-text-secondary shadow-none">
            <SelectValue placeholder="كل التصنيفات" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">كل التصنيفات</SelectItem>

            {helpCenterCategories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="flex shrink-0 items-center gap-2">
        <span className="whitespace-nowrap text-sm text-users-text-secondary">
          الحالة:
        </span>

        <Select dir="rtl" value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-11 w-[130px] shrink-0 cursor-pointer rounded-md border-users-panel-divider bg-users-surface px-3 text-sm text-users-text-secondary shadow-none">
            <SelectValue placeholder="كل الحالات" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">كل الحالات</SelectItem>
            <SelectItem value="active">نشط</SelectItem>
            <SelectItem value="draft">مسودة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onReset}
        className="h-11 min-w-[105px] shrink-0 cursor-pointer gap-2 rounded-md border-users-panel-divider px-4 text-sm text-users-text-secondary shadow-none transition hover:bg-background"
      >
        <RotateCcw size={17} />
        إعادة ضبط
      </Button>
    </section>
  );
}
