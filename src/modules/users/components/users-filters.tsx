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
          placeholder="ابحث بالاسم أو البريد الإلكتروني أو رقم الهاتف..."
          className="h-11 w-full rounded-md border-users-panel-divider bg-users-surface-input pr-10 pl-4 text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0"
        />
      </div>

      {/* Filters */}
      <div className="flex shrink-0 flex-nowrap items-center gap-3">
        {/* Status */}
        <Select dir="rtl" value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-11 w-[145px] shrink-0 cursor-pointer rounded-md border-users-panel-divider bg-users-surface px-3 text-sm text-users-text-secondary shadow-none">
            <SelectValue placeholder="كل الحالات" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">كل الحالات</SelectItem>
            <SelectItem value="active">نشط</SelectItem>
            <SelectItem value="suspended">محظور</SelectItem>
            <SelectItem value="pending_deletion">طلب حذف</SelectItem>
            <SelectItem value="deleted">محذوف</SelectItem>
          </SelectContent>
        </Select>

        {/* Login Method */}
        <Select
          dir="rtl"
          value={loginMethod}
          onValueChange={onLoginMethodChange}
        >
          <SelectTrigger className="h-11 w-[165px] shrink-0 cursor-pointer rounded-md border-users-panel-divider bg-users-surface px-3 text-sm text-users-text-secondary shadow-none">
            <SelectValue placeholder="كل طرق الدخول" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">كل طرق الدخول</SelectItem>
            <SelectItem value="phone_password">الهاتف وكلمة المرور</SelectItem>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select dir="rtl" value={sortOrder} onValueChange={onSortOrderChange}>
          <SelectTrigger className="h-11 w-[165px] shrink-0 cursor-pointer rounded-md border-users-panel-divider bg-users-surface px-3 text-sm text-users-text-secondary shadow-none">
            <SelectValue placeholder="الأحدث تسجيلًا" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">الأحدث تسجيلًا</SelectItem>
            <SelectItem value="oldest">الأقدم تسجيلًا</SelectItem>
          </SelectContent>
        </Select>

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
      </div>
    </section>
  );
}
