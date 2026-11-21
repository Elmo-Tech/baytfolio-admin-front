import { ArrowRight, FileText, Rocket, ShieldCheck } from "lucide-react";

interface Props {
  onBack: () => void;
  onCreate: () => void;
  isCreating: boolean;
}

export default function OnboardingFinancialFooter({
  onBack,
  onCreate,
  isCreating,
}: Props) {
  return (
    <>
      <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onBack}
          disabled={isCreating}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border-subtle bg-background px-5 py-3 text-sm font-medium text-text-secondary"
        >
          <ArrowRight size={16} />
          السابق — العقد والحدود
        </button>

        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border-subtle bg-background px-5 py-3 text-sm font-medium text-text-muted opacity-70"
          >
            <FileText size={16} />
            معاينة العقد
          </button>

          <button
            type="button"
            onClick={onCreate}
            disabled={isCreating}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-navy px-5 py-3 text-sm font-semibold text-white"
          >
            <Rocket size={16} />
            {isCreating ? "جاري التجهيز..." : "إنشاء المعرض"}
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-[11px] text-text-muted">
        <ShieldCheck size={14} className="shrink-0" />
        <span>عملية الإنشاء الفعلية تحتاج إلى Backend API معتمد.</span>
      </div>
    </>
  );
}
