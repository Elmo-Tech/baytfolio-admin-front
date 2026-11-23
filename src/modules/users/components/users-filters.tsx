import { RotateCcw, Search } from "lucide-react";

import { Button, Input } from "@/shared/components/ui";
import {
  LOGIN_METHOD_FILTER_OPTIONS,
  SORT_ORDER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from "../constants/user-filters";
import UserFilterSelect from "./user-filter-select";

interface UsersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  loginMethod: string;
  onLoginMethodChange: (value: string) => void;
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
  onReset: () => void;
}

export default function UsersFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  loginMethod,
  onLoginMethodChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}: UsersFiltersProps) {
  return (
    <section
      dir="rtl"
      className="flex flex-col gap-3 rounded-md border border-users-panel-border bg-users-surface p-4 lg:flex-row lg:items-center"
    >
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
          placeholder="ابحث بالاسم أو البريد الإلكتروني أو رقم الهاتف..."
          presentation="table-search"
        />
      </div>

      <div className="flex shrink-0 flex-nowrap items-center gap-3">
        <UserFilterSelect
          value={status}
          onValueChange={onStatusChange}
          placeholder="كل الحالات"
          options={STATUS_FILTER_OPTIONS}
          triggerClassName="w-[145px]"
        />
        <UserFilterSelect
          value={loginMethod}
          onValueChange={onLoginMethodChange}
          placeholder="كل طرق الدخول"
          options={LOGIN_METHOD_FILTER_OPTIONS}
        />
        <UserFilterSelect
          value={sortOrder}
          onValueChange={onSortOrderChange}
          placeholder="الأحدث تسجيلًا"
          options={SORT_ORDER_OPTIONS}
        />
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onReset}
          presentation="filter-reset"
        >
          <RotateCcw size={17} />
          إعادة ضبط
        </Button>
      </div>
    </section>
  );
}
