import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Save,
} from "lucide-react";

import { Badge, Button } from "@/shared/components/ui";

import type { ShowroomJoinRequest } from "../../types/showroom-join-requests.types";
import WizardShowroomFields from "./wizard-showroom-fields";

interface Props {
  request: ShowroomJoinRequest;
  onCancel: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
}

export default function WizardStepShowroom({
  request,
  onCancel,
  onSaveDraft,
  onNext,
}: Props) {
  return (
    <section className="rounded-xl border border-border-subtle bg-card p-5 sm:p-7">
      <div className="flex flex-col justify-between gap-3 border-b border-border-subtle pb-5 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-brand-navy" />
            <h2 className="text-lg font-bold text-text-primary">
              بيانات المعرض
            </h2>
          </div>
          <p className="mt-2 text-sm text-text-muted">
            مراجعة البيانات المعتمدة من طلب الانضمام.
          </p>
        </div>
        <Badge
          variant="secondary"
          className="w-fit border-transparent bg-success/10 text-success"
        >
          <CheckCircle2 size={13} className="ml-1" />
          بيانات الطلب
        </Badge>
      </div>

      <WizardShowroomFields request={request} />

      <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-border-subtle pt-5 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="gap-2"
        >
          <ArrowRight size={16} />
          إلغاء والعودة للطلب
        </Button>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            className="gap-2"
          >
            <Save size={16} />
            حفظ كمسودة
          </Button>
          <Button
            type="button"
            onClick={onNext}
            presentation="onboarding-primary"
          >
            التالي — حساب المالك
            <ArrowLeft size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
