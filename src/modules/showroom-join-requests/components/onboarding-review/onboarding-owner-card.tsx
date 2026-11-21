import { UserRound } from "lucide-react";

import {
  ReviewDataItem,
  ReviewSectionCard,
} from "./onboarding-review-primitives";
import type { OnboardingOwnerData } from "../../types/showroom-join-requests.types";
interface Props {
  owner: OnboardingOwnerData;
  onEdit: () => void;
}

export default function OnboardingOwnerCard({ owner, onEdit }: Props) {
  return (
    <ReviewSectionCard
      title="حساب المالك"
      subtitle="الإدارة التشغيلية"
      icon={UserRound}
      onEdit={onEdit}
    >
      <div className="flex flex-col gap-6">
        <ReviewDataItem label="الاسم الكامل" value={owner.name} />
        <ReviewDataItem label="الدور الإداري" value="Owner — مالك المعرض" />
        <ReviewDataItem
          label="البريد الإلكتروني"
          value={owner.email}
          dir="ltr"
        />
        <ReviewDataItem label="رقم الهاتف" value={owner.phone} dir="ltr" />
      </div>
      <div className="mt-5 rounded-md border border-border-subtle bg-background p-3">
        <p className="text-[11px] leading-6 text-text-secondary">
          سيتم إنشاء حساب المالك وإرسال رابط آمن لتعيين كلمة المرور عند تنفيذ
          عملية الإنشاء من خلال النظام.
        </p>
      </div>
    </ReviewSectionCard>
  );
}
