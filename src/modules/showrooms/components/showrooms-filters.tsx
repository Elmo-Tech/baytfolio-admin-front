import { RotateCcw, Search } from "lucide-react";

import { Button, Input } from "@/shared/components/ui";

import type {
  ContractStatus,
  ShowroomActivity,
  ShowroomStatus,
} from "../types/showroom";
import ShowroomsFilterSelects from "./showrooms-filter-selects";

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

      <ShowroomsFilterSelects filters={filters} onChange={updateFilter} />

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
