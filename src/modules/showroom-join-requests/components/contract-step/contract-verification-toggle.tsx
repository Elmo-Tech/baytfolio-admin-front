import { Button } from "@/shared/components/ui/button";
import { BadgeCheck } from "lucide-react";

import type { ContractStepValues } from "../../types/showroom-join-requests.types";
import { ContractSectionHeading } from "./contract-form-fields";
import ContractVerificationOptions from "./contract-verification-options";

interface Props {
  values: ContractStepValues;
  duration: number;
  onUpdate: <K extends keyof ContractStepValues>(
    k: K,
    v: ContractStepValues[K],
  ) => void;
  onVerificationMonthsChange: (val: string) => void;
}

export default function ContractVerificationToggle({
  values,
  duration,
  onUpdate,
  onVerificationMonthsChange,
}: Props) {
  return (
    <section className="mt-8 border-t border-border-subtle pt-7">
      <ContractSectionHeading
        title="الخدمات الإضافية"
        description="خدمات القيمة المضافة الاختيارية لهذا العقد."
        icon={BadgeCheck}
      />

      <div className="rounded-lg border border-border-subtle bg-background p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-text-primary">
              إضافة التوثيق الرسمي لهذا العقد (شارة موثّق)
            </h4>
            <p className="mt-1 text-xs text-text-muted">
              تفعيل شارة التوثيق لزيادة موثوقية المعرض أمام العملاء.
            </p>
          </div>
          <Button
            unstyled
            type="button"
            role="switch"
            aria-checked={values.verificationEnabled}
            aria-label="تفعيل التوثيق الرسمي"
            onClick={() =>
              onUpdate("verificationEnabled", !values.verificationEnabled)
            }
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              values.verificationEnabled
                ? "bg-success"
                : "bg-muted-foreground/40"
            }`}
          >
            <span
              className={`absolute top-1 size-5 rounded-full bg-surface-white transition-all ${
                values.verificationEnabled ? "right-1" : "right-6"
              }`}
            />
          </Button>
        </div>

        {values.verificationEnabled && (
          <ContractVerificationOptions
            values={values}
            duration={duration}
            onUpdate={onUpdate}
            onVerificationMonthsChange={onVerificationMonthsChange}
          />
        )}
      </div>
    </section>
  );
}
