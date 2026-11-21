import { Store } from "lucide-react";

import {
  ReviewDataItem,
  ReviewSectionCard,
} from "./onboarding-review-primitives";

interface Props {
  showroomName: string;
  activityLabel: string;
  location: string;
  description?: string;
  onEdit: () => void;
}

export default function OnboardingShowroomCard({
  showroomName,
  activityLabel,
  location,
  description,
  onEdit,
}: Props) {
  return (
    <ReviewSectionCard
      title="بيانات المعرض"
      subtitle="البيانات الأساسية"
      icon={Store}
      onEdit={onEdit}
    >
      <div className="flex flex-col gap-6">
        <ReviewDataItem label="اسم المعرض" value={showroomName} />
        <ReviewDataItem label="نوع النشاط" value={activityLabel} />
        <ReviewDataItem label="الموقع" value={location} />
        <ReviewDataItem label="النبذة / الوصف" value={description} />
      </div>
    </ReviewSectionCard>
  );
}
