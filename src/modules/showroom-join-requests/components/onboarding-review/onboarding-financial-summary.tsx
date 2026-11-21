import { ClipboardCheck } from "lucide-react";

import type { ShowroomJoinRequest } from "../../types/showroom-join-requests.types";
import {
  ReviewCheckItem,
  ReviewSectionCard,
} from "./onboarding-review-primitives";

interface Props {
  request: ShowroomJoinRequest;
  verificationMonths: number;
  baseValueFormatted: string;
  verificationTotalFormatted: string;
  totalValueFormatted: string;
}

export default function OnboardingFinancialSummary({
  request,
  verificationMonths,
  baseValueFormatted,
  verificationTotalFormatted,
  totalValueFormatted,
}: Props) {
  return (
    <>
      <div className="mt-5">
        <ReviewSectionCard
          title="الملخص المالي والاتفاق"
          subtitle="الحسابات المالية"
          icon={ClipboardCheck}
        >
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-secondary">قيمة العقد الأساسية</span>
              <strong className="text-text-primary">
                {baseValueFormatted} ج.م
              </strong>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-secondary">
                التوثيق المضاف ({verificationMonths} أشهر)
              </span>
              <strong className="text-text-primary">
                {verificationTotalFormatted} ج.م
              </strong>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
              <p className="font-bold text-text-primary">
                إجمالي الاتفاق المالي
              </p>
              <p className="text-2xl font-bold text-text-primary" dir="ltr">
                {totalValueFormatted}
                <span className="mr-1 text-sm font-medium">ج.م</span>
              </p>
            </div>
          </div>
        </ReviewSectionCard>
      </div>

      <section className="mt-6 rounded-xl border-2 border-brand-navy bg-background p-5 sm:p-6">
        <h3 className="font-bold text-text-primary">
          ماذا سيحدث عند إنشاء المعرض؟
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <ReviewCheckItem>
            إنشاء Showroom داخل منظومة BaytFolio.
          </ReviewCheckItem>
          <ReviewCheckItem>إنشاء حساب Owner وربطه بالمعرض.</ReviewCheckItem>
          <ReviewCheckItem>
            إنشاء Commercial Profile والعقد التشغيلي.
          </ReviewCheckItem>
          <ReviewCheckItem>
            ربط المعرض بطلب الانضمام {request.reference}.
          </ReviewCheckItem>
        </div>
      </section>
    </>
  );
}
