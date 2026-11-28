import {
  Badge,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui";
import {
  BtnV2,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FiltersBox,
} from "@/shared/components/common";

import { RotateCcw, Search, Star } from "lucide-react";

import { useQueryStates } from "nuqs";
import { reviewsParams } from "../utils/reviews-params";

export const ReviewsFilters = () => {
  const [{ search, status, rating }, setParams] = useQueryStates(reviewsParams);

  return (
    <section className="reviews-filters">
      <FiltersBox className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <InputGroup className="h-10 min-h-10 min-w-0 flex-1">
          <InputGroupAddon
            align="inline-start"
            className="px-3 text-text-muted"
          >
            <Search size={18} aria-hidden="true" />
          </InputGroupAddon>

          <InputGroupInput
            type="search"
            value={search}
            onChange={(event) => setParams({ search: event.target.value })}
            placeholder="ابحث باسم المستخدم أو التعليق..."
          />
        </InputGroup>

        <div className="flex flex-col min-[540px]:flex-row flex-wrap min-[540px]:items-center gap-3">
          <Select
            value={status}
            onValueChange={(value) => setParams({ status: value })}
          >
            <SelectTrigger selectLabel="الحالة:">
              <SelectValue placeholder="كل الحالات" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="بانتظار المراجعة">بانتظار المراجعة</SelectItem>
              <SelectItem value="منشور">منشور</SelectItem>
              <SelectItem value="مرفوض">مرفوض</SelectItem>
              <SelectItem value="مخفي">مخفي</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={rating}
            onValueChange={(value) => setParams({ rating: value })}
          >
            <SelectTrigger
              selectLabel="التقييم:"
              selectIcon={<Star className="fill-accent text-accent size-4" />}
            >
              <SelectValue placeholder="كل التقييمات" />
            </SelectTrigger>

            <SelectContent>
              {[5, 4, 3, 2, 1].map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value} نجوم
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <BtnV2
            type="button"
            variant="outline"
            size="lg"
            onClick={() =>
              setParams({ search: "", status: "", rating: "", page: 1 })
            }
            className="rounded-md"
          >
            <RotateCcw className="size-3.5" />
            إعادة ضبط
          </BtnV2>

          <div className="max-[540px]:flex max-[540px]:justify-center">
            <Badge variant="secondary" className="px-3 py-1.5">
              النتائج: 12
            </Badge>
          </div>
        </div>
      </FiltersBox>
    </section>
  );
};
