import {
  Badge,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui";
import {
  FiltersBox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/common";

import { Search } from "lucide-react";

import { useQueryStates } from "nuqs";
import { promotionsParams } from "../utils/promotions-params";

import { promotionTypeOptions } from "../constants/promotions.constants";

export const PromotionsFilters = () => {
  const [{ tab, search, type }, setParams] = useQueryStates(promotionsParams);

  const isCurrent = tab === "current";

  return (
    <FiltersBox className="flex flex-col gap-3 sm:flex-row lg:items-center">
      <InputGroup className="h-10 min-h-10 min-w-0 flex-1">
        <InputGroupAddon align="inline-start" className="px-3 text-text-muted">
          <Search size={18} aria-hidden="true" />
        </InputGroupAddon>

        <InputGroupInput
          type="search"
          value={search}
          onChange={(event) =>
            setParams({ search: event.target.value, page: 1 })
          }
          placeholder="ابحث باسم الغرفة أو الباقة أو المعرض..."
        />
      </InputGroup>

      <div className="flex flex-col gap-3 min-[540px]:flex-row min-[540px]:flex-wrap min-[540px]:items-center">
        <Select
          value={type}
          onValueChange={(value) => setParams({ type: value, page: 1 })}
        >
          <SelectTrigger selectLabel="النوع:">
            <SelectValue placeholder="الكل" />
          </SelectTrigger>

          <SelectContent>
            {promotionTypeOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === "all" ? "الكل" : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Badge
          variant="outline"
          className="gap-1.5 border-border bg-white px-3 py-2 text-[11px] font-medium text-text-secondary"
        >
          <span
            className={`size-1.5 rounded-full ${isCurrent ? "bg-status-active-fg" : "bg-users-status-pending-fg"}`}
          />

          {isCurrent
            ? "إجمالي الترويجات الجارية: 8 نشطة"
            : "إجمالي الطلبات الواردة: 6 طلبات معلقة"}
        </Badge>
      </div>
    </FiltersBox>
  );
};
