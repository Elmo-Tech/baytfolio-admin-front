import { Search } from "lucide-react";

import { Input } from "@/shared/components/ui";

import type {
  ShowroomActivityType,
  ShowroomJoinRequestStatus,
} from "../../types/showroom-join-requests.types";
import ShowroomJoinRequestsFilterSelects from "./showroom-join-requests-filter-selects";

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

export default function ShowroomJoinRequestsFilters({
  search,
  onSearchChange,
  ...selectProps
}: Props) {
  return (
    <section className="rounded-lg border border-border-subtle bg-card p-3">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-3">
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

        <ShowroomJoinRequestsFilterSelects {...selectProps} />
      </div>
    </section>
  );
}
