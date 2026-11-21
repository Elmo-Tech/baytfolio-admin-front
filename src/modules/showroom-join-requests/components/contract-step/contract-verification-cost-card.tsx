import { VERIFICATION_MONTHLY_PRICE } from "../../constants/contract-step.constants";
import { formatContractCurrency } from "../../utils/contract-step.utils";

interface Props {
  enabled: boolean;
  effectiveMonths: number;
  verificationValid: boolean;
  verificationCost: number;
}

export default function ContractVerificationCostCard({
  enabled,
  effectiveMonths,
  verificationValid,
  verificationCost,
}: Props) {
  if (!enabled) return null;

  return (
    <div className="mt-3 rounded-lg border border-border-subtle bg-card p-4">
      <p className="text-xs text-text-muted">إجمالي التوثيق المحتسب</p>
      <p className="mt-1 text-2xl font-bold text-text-primary">
        {formatContractCurrency(verificationCost)}{" "}
        <span className="text-sm font-medium">ج.م</span>
      </p>
      <p className="mt-1 text-xs text-text-muted">
        {effectiveMonths} شهر ×{" "}
        {formatContractCurrency(VERIFICATION_MONTHLY_PRICE)} ج.م
      </p>
      {!verificationValid && (
        <p className="mt-1 text-xs text-destructive">
          مدة التوثيق غير مطابقة لمدة العقد.
        </p>
      )}
    </div>
  );
}
