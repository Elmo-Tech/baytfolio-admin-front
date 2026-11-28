import { Zap } from "lucide-react";

import { addDaysToDate } from "../../utils/promotions-formatters";

import type { PromotionRequest } from "../../types/promotions.types";

interface PromotionsRequestRuleProps {
  request: PromotionRequest;
}

export const PromotionsRequestRule = ({
  request,
}: PromotionsRequestRuleProps) => {
  const endDate = addDaysToDate(request.requestDate, request.durationDays);

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-info/5 p-4">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-accent">
        <Zap className="size-4" />
      </span>

      <div>
        <p className="text-xs font-bold text-primary">
          قاعدة التفعيل والبدء الفوري (Instant Start Rule)
        </p>

        <p className="mt-1 text-[11px] leading-6 text-text-secondary">
          عند اعتماد الطلب، يبدأ الترويج فوراً بتاريخ البدء (
          {request.requestDate}) وينتهي تلقائياً بتاريخ {endDate} دون جدولة
          مسبقة، مع إخطار المعرض عبر الرسائل الفورية والتطبيق.
        </p>
      </div>
    </div>
  );
};
