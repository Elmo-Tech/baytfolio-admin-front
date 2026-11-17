import { Search, RotateCcw } from "lucide-react";

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
  ShowroomActivityType,
  ShowroomJoinRequestStatus,
} from "../types/showroom-join-requests.types";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: ShowroomJoinRequestStatus | "all") => void;
  activityType: string;
  onActivityTypeChange: (value: ShowroomActivityType | "all") => void;
  date: string;
  onDateChange: (value: string) => void;
  sortOrder: "newest" | "oldest";
  onSortOrderChange: (value: "newest" | "oldest") => void;
  onReset: () => void;
};

const selectTriggerClassName =
  "h-10 min-w-0 w-full border-border-subtle bg-background text-xs shadow-none";

export default function ShowroomJoinRequestsFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  activityType,
  onActivityTypeChange,
  date,
  onDateChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}: Props) {
  return (
    <section className="rounded-lg border border-border-subtle bg-card p-3">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-3">
        {/* Search - Right */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
          />

          <Input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="ابحث باسم المعرض، مسؤول التواصل، البريد أو الهاتف..."
            aria-label="البحث في طلبات الانضمام"
            className="h-10 w-full border-border-subtle bg-background pr-9 text-xs shadow-none"
          />
        </div>

        {/* Filters - Left */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:flex xl:flex-1">
          {/* Status */}
          <Select
            value={status}
            onValueChange={(value) =>
              onStatusChange(value as ShowroomJoinRequestStatus | "all")
            }
          >
            <SelectTrigger
              aria-label="حالة الطلب"
              className={selectTriggerClassName}
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">حالة الطلب: الكل</SelectItem>
              <SelectItem value="new">طلب جديد</SelectItem>
              <SelectItem value="under_review">قيد المراجعة</SelectItem>
              <SelectItem value="pending_agreement">بانتظار الاتفاق</SelectItem>
              <SelectItem value="approved">معتمد لبدء التجهيز</SelectItem>
              <SelectItem value="contacted">تم التواصل</SelectItem>
              <SelectItem value="qualified">مؤهل</SelectItem>
              <SelectItem value="rejected">مرفوض</SelectItem>
              <SelectItem value="closed">مغلق</SelectItem>
            </SelectContent>
          </Select>

          {/* Activity Type */}
          <Select
            value={activityType}
            onValueChange={(value) =>
              onActivityTypeChange(value as ShowroomActivityType | "all")
            }
          >
            <SelectTrigger
              aria-label="نوع النشاط"
              className={selectTriggerClassName}
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">نوع النشاط: الكل</SelectItem>
              <SelectItem value="showroom">معرض</SelectItem>
              <SelectItem value="commercial_display">
                صالة عرض تجارية
              </SelectItem>
              <SelectItem value="factory">مصنع</SelectItem>
              <SelectItem value="design_studio">استوديو تصميم</SelectItem>
            </SelectContent>
          </Select>

          {/* Submission Date */}
          <Select value={date} onValueChange={onDateChange}>
            <SelectTrigger
              aria-label="تاريخ التقديم"
              className={selectTriggerClassName}
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">تاريخ التقديم: الكل</SelectItem>
              <SelectItem value="last7">آخر 7 أيام</SelectItem>
              <SelectItem value="last30">آخر 30 يومًا</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Order */}
          <Select
            value={sortOrder}
            onValueChange={(value) =>
              onSortOrderChange(value as "newest" | "oldest")
            }
          >
            <SelectTrigger
              aria-label="ترتيب الطلبات"
              className={selectTriggerClassName}
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="newest">الترتيب: الأحدث</SelectItem>
              <SelectItem value="oldest">الترتيب: الأقدم</SelectItem>
            </SelectContent>
          </Select>

          {/* Reset */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onReset}
            className="col-span-2 h-10 shrink-0 gap-2 rounded-lg border-border-subtle bg-background px-3 text-xs font-normal text-text-secondary shadow-none hover:bg-muted sm:col-span-4 xl:col-span-1"
          >
            <RotateCcw size={15} className="shrink-0" />
            إعادة ضبط
          </Button>
        </div>
      </div>
    </section>
  );
}
