import { Clock } from "lucide-react";

import { Badge } from "@/shared/components/ui";

import type { ContractStepValues } from "../../types/showroom-join-requests.types";
import { ContractInputField } from "./contract-form-fields";

interface Props {
  startDate: string;
  endDate: string;
  baseValue: string;
  duration: number;
  validDates: boolean;
  onStartDateChange: (val: string) => void;
  onEndDateChange: (val: string) => void;
  onUpdate: <K extends keyof ContractStepValues>(
    k: K,
    v: ContractStepValues[K],
  ) => void;
}

export default function ContractDatesSection({
  startDate,
  endDate,
  baseValue,
  duration,
  validDates,
  onStartDateChange,
  onEndDateChange,
  onUpdate,
}: Props) {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-text-primary">بيانات العقد</h2>
          <p className="mt-1 text-sm text-text-muted">
            سجل بيانات الاتفاق التجاري المعتمد ومدة سريان العقد.
          </p>
        </div>
        <Badge
          variant="secondary"
          className="border-transparent bg-warning/10 text-warning"
        >
          <span className="ml-1 size-1.5 rounded-full bg-warning" />
          حالة العقد: مسودة أولية (Draft)
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-5 border-b border-border-subtle pb-7 md:grid-cols-3">
        <ContractInputField
          label="تاريخ بداية العقد"
          type="date"
          value={startDate}
          onChange={onStartDateChange}
          hint="أول يوم في دورة التعاقد التشغيلي"
          dir="ltr"
        />

        <div className="min-w-0 space-y-2">
          <ContractInputField
            label="تاريخ نهاية العقد"
            type="date"
            value={endDate}
            onChange={onEndDateChange}
            dir="ltr"
          />
          <div className="flex flex-wrap items-center gap-2 text-[11px] leading-5">
            {validDates ? (
              <>
                <Clock size={13} className="shrink-0 text-text-muted" />
                <span className="text-text-muted">
                  مدة العقد: {duration} شهرًا
                </span>
              </>
            ) : (
              <span className="text-destructive">
                تاريخ النهاية يجب أن يكون بعد البداية وألا يتجاوز 12 شهرًا.
              </span>
            )}
          </div>
        </div>

        <ContractInputField
          label="قيمة العقد الأساسية"
          value={baseValue}
          onChange={(v) => onUpdate("baseValue", v)}
          type="number"
          min={1}
          prefix="ج.م"
          hint="العملة ثابتة (جنيه مصري)."
          dir="ltr"
        />
      </div>
    </section>
  );
}
