import { ClipboardCheck } from "lucide-react";

import { Badge } from "@/shared/components/ui";

interface Props {
  currentStep: string;
  reference: string;
  showroomName: string;
}

export default function WizardHeader({
  currentStep,
  reference,
  showroomName,
}: Props) {
  return (
    <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border-transparent bg-info/10 text-info"
          >
            <ClipboardCheck size={13} className="ml-1" />
            معالج التجهيز والاعتماد
          </Badge>
          <span className="text-xs text-text-muted">
            الخطوة {currentStep} من 4
          </span>
        </div>

        <h1 className="text-2xl font-bold text-text-primary">
          إنشاء وتجهيز المعرض
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          إعداد بيانات المعرض وحساب المالك والعقد قبل إطلاق الحساب التشغيلي على
          المنظومة.
        </p>
      </div>

      <div className="flex min-w-[300px] items-center gap-4 rounded-xl border border-border-subtle bg-card px-5 py-4 sm:min-w-[340px]">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-brand-gold">
          <ClipboardCheck size={24} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-text-muted">
            مرجع الطلب المعتمد
          </p>
          <p
            className="mt-1 text-sm font-bold text-text-primary sm:text-base"
            dir="ltr"
          >
            {reference}
          </p>
          <p className="mt-1 truncate text-sm font-medium text-text-secondary">
            {showroomName}
          </p>
        </div>
      </div>
    </header>
  );
}
