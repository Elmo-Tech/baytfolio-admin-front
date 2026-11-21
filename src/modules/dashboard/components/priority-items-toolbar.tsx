import { Filter, Search } from "lucide-react";

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";
import { PRIORITY_STATUS_OPTIONS } from "../constants/priority-items";
import type { PriorityItemStatus } from "../types/priority-items.types";

interface PriorityItemsToolbarProps {
  search: string;
  statusFilter: PriorityItemStatus | "all";
  isFilterOpen: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onToggleFilter: () => void;
}

export default function PriorityItemsToolbar({
  search,
  statusFilter,
  isFilterOpen,
  onSearchChange,
  onStatusChange,
  onToggleFilter,
}: PriorityItemsToolbarProps) {
  return (
    <>
      <div className="flex flex-col gap-3 border-b border-users-panel-divider p-4 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            size={17}
            aria-hidden="true"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="ابحث في العناصر ذات الأولوية..."
            aria-label="البحث في العناصر ذات الأولوية"
            className="h-10 w-full border-users-panel-divider bg-users-surface-input pr-10 text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onToggleFilter}
          aria-expanded={isFilterOpen}
          className="h-10 gap-2 border-users-panel-divider px-4 text-sm text-users-text-secondary shadow-none hover:bg-background"
        >
          <Filter size={16} aria-hidden="true" />
          تصفية
        </Button>
      </div>

      {isFilterOpen && (
        <div className="flex flex-col gap-2 border-b border-users-panel-divider bg-users-table-header p-4 sm:flex-row sm:items-center">
          <label
            htmlFor="priority-status-filter"
            className="text-sm text-users-text-secondary"
          >
            الحالة
          </label>
          <Select dir="rtl" value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger
              id="priority-status-filter"
              className="h-9 w-full border-users-panel-divider bg-users-surface text-sm sm:w-48"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRIORITY_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
