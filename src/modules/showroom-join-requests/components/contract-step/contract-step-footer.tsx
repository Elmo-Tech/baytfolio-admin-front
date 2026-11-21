import { ArrowLeft, ArrowRight, LockKeyhole, Printer } from "lucide-react";

import { Button } from "@/shared/components/ui";

interface Props {
  canContinue: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ContractStepFooter({
  canContinue,
  onPrevious,
  onNext,
}: Props) {
  return (
    <>
      <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-border-subtle pt-6 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="gap-2"
        >
          <ArrowRight size={16} />
          السابق: حساب المالك
        </Button>

        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.print()}
            className="gap-2"
          >
            <Printer size={16} />
            معاينة العقد المطبوع
          </Button>
          <Button
            type="button"
            disabled={!canContinue}
            onClick={onNext}
            className="gap-2 bg-brand-navy text-white hover:bg-brand-navy/90"
          >
            التالي: المراجعة والإنشاء
            <ArrowLeft size={16} />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
        <LockKeyhole size={14} />
        <span>بيانات العقد والحدود المعروضة حاليًا نموذج أولي محلي.</span>
      </div>
    </>
  );
}
