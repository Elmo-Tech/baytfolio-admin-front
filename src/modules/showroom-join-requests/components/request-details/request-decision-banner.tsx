import { CircleX, Store } from "lucide-react";

import { Badge, Button } from "@/shared/components/ui";

import { DEFAULT_REJECTION_REASON } from "../../constants/showroom-join-request-details.constants";
import {
  formatRequestDate,
  formatRequestTime,
} from "../../utils/showroom-join-request-details.utils";

interface Props {
  isRejected: boolean;
  isApproved: boolean;
  rejectionTimestamp?: string;
  onStartSetup: () => void;
}

export default function RequestDecisionBanner({
  isRejected,
  isApproved,
  rejectionTimestamp,
  onStartSetup,
}: Props) {
  if (isRejected) {
    return (
      <section className="overflow-hidden rounded-xl border border-destructive/20 border-r-4 border-r-destructive bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-5 py-4">
          <div className="flex items-center gap-2 text-destructive">
            <CircleX size={19} />
            <h2 className="text-sm font-bold">تم رفض طلب الانضمام</h2>
          </div>
          <span className="text-xs text-text-muted" dir="ltr">
            {rejectionTimestamp
              ? `${formatRequestTime(rejectionTimestamp)} — ${formatRequestDate(rejectionTimestamp.slice(0, 10))}`
              : "لا يوجد تاريخ مسجل للرفض"}
          </span>
        </div>
        <div className="p-5">
          <p className="mb-2 text-xs text-text-muted">سبب الرفض:</p>
          <div className="rounded-lg bg-destructive/5 px-4 py-4 text-sm leading-7 text-destructive">
            {DEFAULT_REJECTION_REASON}
          </div>
        </div>
      </section>
    );
  }

  if (!isApproved) return null;

  return (
    <section className="relative overflow-hidden rounded-xl border border-success/20 bg-primary px-6 py-7 text-primary-foreground shadow-sm">
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-transparent bg-success text-success-foreground">
              المرحلة النهائية: الاعتماد
            </Badge>
            <span className="text-xs text-primary-foreground/70">
              ربط بالمنظومة المركزية
            </span>
          </div>
          <h2 className="text-xl font-bold leading-relaxed">
            معتمد لبدء التجهيز والانضمام
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-primary-foreground/80">
            عند اكتمال كافة متطلبات التحقق والموافقة على الطلب، يتم إنشاء ملف
            المعرض والمصنع مباشرة في منظومة BaytFolio وتوليد حساب المالك
            التشغيلي تلقائياً.
          </p>
        </div>
        <Button
          type="button"
          onClick={onStartSetup}
          className="h-auto min-h-14 shrink-0 gap-2 whitespace-nowrap rounded-lg bg-success px-5 py-4 text-sm font-semibold text-success-foreground shadow-none hover:bg-success/90"
        >
          <Store size={19} />
          إنشاء المعرض وبدء التجهيز
        </Button>
      </div>
    </section>
  );
}
