import { Calculator } from "lucide-react";

import { Badge } from "@/shared/components/ui";

import { formatContractCurrency } from "../../utils/contract-step.utils";

interface Props {
  duration: number;
  baseValue: number;
  verificationCost: number;
  total: number;
}

export default function ContractFinancialSummaryCard({
  duration,
  baseValue,
  verificationCost,
  total,
}: Props) {
  return (
    <section className="mt-6 rounded-xl border border-border-subtle bg-background p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calculator size={19} className="text-brand-navy" />
          <h3 className="font-bold text-text-primary">
            الملخص المالي للاتفاق التجاري
          </h3>
        </div>
        <Badge
          variant="secondary"
          className="border-transparent bg-brand-gold/20 text-text-primary"
        >
          حساب العقد التشغيلي
        </Badge>
      </div>

      <div className="space-y-4 border-b border-border-subtle pb-5 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-text-secondary">
            قيمة العقد الأساسية ({duration} شهرًا)
          </span>
          <strong className="text-text-primary">
            {formatContractCurrency(baseValue)} ج.م
          </strong>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-text-secondary">خدمة التوثيق المعتمدة</span>
          <strong className="text-text-primary">
            {formatContractCurrency(verificationCost)} ج.م
          </strong>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 pt-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-bold text-text-primary">
            إجمالي الاتفاق التجاري المستحق
          </p>
          <p className="mt-1 text-xs text-text-muted">
            شامل الترخيص التشغيلي وتوثيق المعرض للمدة المحددة.
          </p>
        </div>
        <p className="text-3xl font-bold text-text-primary">
          {formatContractCurrency(total)}{" "}
          <span className="text-base font-medium">ج.م</span>
        </p>
      </div>
    </section>
  );
}
