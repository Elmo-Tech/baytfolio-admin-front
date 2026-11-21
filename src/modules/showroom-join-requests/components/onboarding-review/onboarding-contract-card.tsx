import { FileText } from "lucide-react";

import {
  ReviewDataItem,
  ReviewSectionCard,
} from "./onboarding-review-primitives";

interface Props {
  startDateFormatted: string;
  endDateFormatted: string;
  contractDuration: number;
  baseValueFormatted: string;
  onEdit: () => void;
}

export default function OnboardingContractCard({
  startDateFormatted,
  endDateFormatted,
  contractDuration,
  baseValueFormatted,
  onEdit,
}: Props) {
  return (
    <ReviewSectionCard
      title="العقد التجاري"
      subtitle="الاتفاقية المالية"
      icon={FileText}
      onEdit={onEdit}
    >
      <div className="flex flex-col gap-6">
        <ReviewDataItem
          label="تاريخ البداية"
          value={startDateFormatted}
          dir="ltr"
        />
        <ReviewDataItem
          label="تاريخ النهاية"
          value={endDateFormatted}
          dir="ltr"
        />
        <ReviewDataItem label="مدة العقد" value={`${contractDuration} شهر`} />
        <ReviewDataItem
          label="قيمة العقد الأساسية"
          value={`${baseValueFormatted} ج.م`}
        />
      </div>
    </ReviewSectionCard>
  );
}
