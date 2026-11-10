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

import type {
  ContractStatus,
  ShowroomActivity,
  ShowroomStatus,
} from "../types/showroom";

export type ShowroomsFiltersState = {
  search: string;
  activity: "all" | ShowroomActivity;
  showroomStatus: "all" | ShowroomStatus;
  contractStatus: "all" | ContractStatus;
  sort: "latest" | "oldest" | "name";
};

type ShowroomsFiltersProps = {
  filters: ShowroomsFiltersState;
  onFiltersChange: (filters: ShowroomsFiltersState) => void;
  onReset: () => void;
};

export default function ShowroomsFilters({
  filters,
  onFiltersChange,
  onReset,
}: ShowroomsFiltersProps) {
  const updateFilter = (key: keyof ShowroomsFiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <section
      dir="rtl"
      className="flex flex-col gap-3 rounded-lg border border-border-warm bg-card p-3 shadow-sm xl:flex-row xl:items-center"
    >
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted-icon" />

        <Input
          type="search"
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
          placeholder="ابحث باسم المعرض، الرقم المرجعي، أو المسؤول..."
          aria-label="البحث عن معرض أو مصنع"
          className="h-9 border-border-warm bg-users-surface-input pr-10 text-xs placeholder:text-text-muted"
        />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:flex xl:shrink-0">
        <Select
          dir="rtl"
          value={filters.activity}
          onValueChange={(value) => updateFilter("activity", value)}
        >
          <SelectTrigger className="h-9 w-full border-border-warm bg-users-surface-input text-xs xl:w-[130px]">
            <SelectValue placeholder="نوع النشاط: الكل" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">نوع النشاط: الكل</SelectItem>
            <SelectItem value="showroom">معرض</SelectItem>
            <SelectItem value="factory">مصنع</SelectItem>
            <SelectItem value="showroom_factory">معرض ومصنع</SelectItem>
            <SelectItem value="studio_manufacturing">استوديو وتصنيع</SelectItem>
          </SelectContent>
        </Select>

        <Select
          dir="rtl"
          value={filters.showroomStatus}
          onValueChange={(value) => updateFilter("showroomStatus", value)}
        >
          <SelectTrigger className="h-9 w-full border-border-warm bg-users-surface-input text-xs xl:w-[145px]">
            <SelectValue placeholder="حالة المعرض: الكل" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">حالة المعرض: الكل</SelectItem>
            <SelectItem value="active">نشط</SelectItem>
            <SelectItem value="suspended">موقوف</SelectItem>
          </SelectContent>
        </Select>

        <Select
          dir="rtl"
          value={filters.contractStatus}
          onValueChange={(value) => updateFilter("contractStatus", value)}
        >
          <SelectTrigger className="h-9 w-full border-border-warm bg-users-surface-input text-xs xl:w-[145px]">
            <SelectValue placeholder="حالة العقد: الكل" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">حالة العقد: الكل</SelectItem>
            <SelectItem value="active">ساري</SelectItem>
            <SelectItem value="expiring">قارب على الانتهاء</SelectItem>
            <SelectItem value="expired">منتهي</SelectItem>
          </SelectContent>
        </Select>

        <Select
          dir="rtl"
          value={filters.sort}
          onValueChange={(value) => updateFilter("sort", value)}
        >
          <SelectTrigger className="h-9 w-full border-border-warm bg-users-surface-input text-xs xl:w-[120px]">
            <SelectValue placeholder="الترتيب: الأحدث" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">الترتيب: الأحدث</SelectItem>
            <SelectItem value="oldest">الأقدم</SelectItem>
            <SelectItem value="name">الاسم</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="lg"
        onClick={onReset}
        className="h-9 shrink-0 gap-1.5 px-2 text-xs font-medium text-text-secondary hover:bg-muted"
      >
        <RotateCcw className="size-3.5 text-text-muted-icon" />
        إعادة ضبط
      </Button>
    </section>
  );
}
