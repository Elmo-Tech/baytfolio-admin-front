import { RotateCcw } from "lucide-react";

import { Button } from "@/shared/components/ui";

import { useJoinRequestFilterOptions } from "../../hooks/use-join-request-filter-options";
import type {
  ShowroomActivityType,
  ShowroomJoinRequestStatus,
} from "../../types/showroom-join-requests.types";
import JoinRequestFilterSelect from "./join-request-filter-select";

interface FilterSelectsProps {
  status: string;
  onStatusChange: (value: ShowroomJoinRequestStatus | "all") => void;
  activityType: string;
  onActivityTypeChange: (value: ShowroomActivityType | "all") => void;
  date: string;
  onDateChange: (value: string) => void;
  sortOrder: "newest" | "oldest";
  onSortOrderChange: (value: "newest" | "oldest") => void;
  onReset: () => void;
}

export default function ShowroomJoinRequestsFilterSelects({
  status,
  onStatusChange,
  activityType,
  onActivityTypeChange,
  date,
  onDateChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}: FilterSelectsProps) {
  const { statusOptions, activityOptions, dateOptions, sortOptions } =
    useJoinRequestFilterOptions();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:flex xl:flex-1">
      <JoinRequestFilterSelect
        ariaLabel="حالة الطلب"
        value={status}
        options={statusOptions}
        onChange={(value) =>
          onStatusChange(value as ShowroomJoinRequestStatus | "all")
        }
      />

      <JoinRequestFilterSelect
        ariaLabel="نوع النشاط"
        value={activityType}
        options={activityOptions}
        onChange={(value) =>
          onActivityTypeChange(value as ShowroomActivityType | "all")
        }
      />

      <JoinRequestFilterSelect
        ariaLabel="تاريخ التقديم"
        value={date}
        options={dateOptions}
        onChange={onDateChange}
      />

      <JoinRequestFilterSelect
        ariaLabel="ترتيب الطلبات"
        value={sortOrder}
        options={sortOptions}
        onChange={(value) => onSortOrderChange(value as "newest" | "oldest")}
      />

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
  );
}
