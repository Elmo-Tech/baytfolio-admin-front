import { Lock } from "lucide-react";

import { formatMoney } from "../../utils/promotions-formatters";

import type { PromotionRequest } from "../../types/promotions.types";

interface PromotionsRequestFinanceProps {
  request: PromotionRequest;
}

export const PromotionsRequestFinance = ({
  request,
}: PromotionsRequestFinanceProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Lock className="size-3.5 min-w-3.5 text-primary" />

          <p className="text-xs font-semibold text-primary">
            الحسبة التجارية والمالية
          </p>
        </div>

        <p className="text-[10px] text-text-secondary">
          سعر اليوم محفوظ في سجل الطلب
        </p>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-background/40 p-3 text-center">
          <p className="text-[11px] text-text-secondary">عدد الأيام المطلوبة</p>

          <p className="mt-2 text-sm font-bold text-primary">
            {request.durationLabel}
          </p>

          <p className="mt-1 text-[10px] text-text-secondary">
            مدة العرض المتواصل
          </p>
        </div>

        <div className="rounded-lg border border-border bg-background/40 p-3 text-center">
          <p className="text-[11px] text-text-secondary">سعر اليوم المعتمد</p>

          <p className="mt-2 text-sm font-bold text-primary">
            {formatMoney(request.dailyPrice)}
          </p>

          <p className="mt-1 text-[10px] text-text-secondary">
            وفق تعرفة ترويج الغرف
          </p>
        </div>

        <div className="rounded-lg border border-primary bg-primary p-3 text-center text-primary-foreground">
          <p className="text-[11px] text-white/70">القيمة الإجمالية المستحقة</p>

          <p className="mt-2 text-sm font-bold">
            {formatMoney(request.totalValue)}
          </p>

          <p className="mt-1 text-[10px] text-white/70">
            مسحوبة ومستحقة من الرصيد
          </p>
        </div>
      </div>
    </div>
  );
};
