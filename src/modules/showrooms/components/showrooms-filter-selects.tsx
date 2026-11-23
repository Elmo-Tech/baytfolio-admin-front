import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

import type { ShowroomsFiltersState } from "./showrooms-filters";

interface ShowroomsFilterSelectsProps {
  filters: ShowroomsFiltersState;
  onChange: (key: keyof ShowroomsFiltersState, value: string) => void;
}

export default function ShowroomsFilterSelects({
  filters,
  onChange,
}: ShowroomsFilterSelectsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:flex xl:shrink-0">
      <Select
        dir="rtl"
        value={filters.activity}
        onValueChange={(value) => onChange("activity", value)}
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
        onValueChange={(value) => onChange("showroomStatus", value)}
      >
        <SelectTrigger presentation="compact-filter">
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
        onValueChange={(value) => onChange("contractStatus", value)}
      >
        <SelectTrigger presentation="compact-filter">
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
        onValueChange={(value) => onChange("sort", value)}
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
  );
}
