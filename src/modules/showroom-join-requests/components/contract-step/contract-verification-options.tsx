import { Button, Label } from "@/shared/components/ui";

import { CONTRACT_MAX_MONTHS } from "../../constants/contract-step.constants";
import type { ContractStepValues } from "../../types/showroom-join-requests.types";
import { ContractInputField } from "./contract-form-fields";

interface Props {
  values: ContractStepValues;
  duration: number;
  onUpdate: <K extends keyof ContractStepValues>(
    k: K,
    v: ContractStepValues[K],
  ) => void;
  onVerificationMonthsChange: (val: string) => void;
}

export default function ContractVerificationOptions({
  values,
  duration,
  onUpdate,
  onVerificationMonthsChange,
}: Props) {
  return (
    <div className="mt-5 space-y-3 rounded-lg border border-border-subtle bg-card p-4">
      <Label className="text-xs font-semibold">مدة التوثيق</Label>
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          size="sm"
          variant={
            values.verificationDuration === "full" ? "default" : "outline"
          }
          onClick={() => onUpdate("verificationDuration", "full")}
        >
          طوال مدة العقد
        </Button>
        <Button
          type="button"
          size="sm"
          variant={
            values.verificationDuration === "fixed" ? "default" : "outline"
          }
          onClick={() => onUpdate("verificationDuration", "fixed")}
        >
          مدة محددة بالشهور
        </Button>
      </div>
      {values.verificationDuration === "fixed" && (
        <ContractInputField
          label="عدد أشهر التوثيق"
          value={values.verificationMonths}
          onChange={onVerificationMonthsChange}
          type="number"
          min={1}
          max={duration || CONTRACT_MAX_MONTHS}
          dir="ltr"
        />
      )}
    </div>
  );
}
