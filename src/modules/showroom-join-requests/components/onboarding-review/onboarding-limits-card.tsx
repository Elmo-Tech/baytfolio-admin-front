import { Building2, Package, SlidersHorizontal } from "lucide-react";

import { ReviewSectionCard } from "./onboarding-review-primitives";

interface Props {
  roomsLimit: string;
  packagesLimit: string;
  onEdit: () => void;
}

export default function OnboardingLimitsCard({
  roomsLimit,
  packagesLimit,
  onEdit,
}: Props) {
  return (
    <ReviewSectionCard
      title="الحدود التشغيلية"
      subtitle="الطاقة الاستيعابية"
      icon={SlidersHorizontal}
      onEdit={onEdit}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex min-w-0 items-center justify-between gap-3 rounded-lg border border-border-subtle bg-background p-4">
          <div className="flex min-w-0 items-center gap-2">
            <Building2 size={17} className="shrink-0 text-text-secondary" />
            <span className="text-xs text-text-secondary">حد الغرف</span>
          </div>
          <strong className="text-base font-bold text-text-primary" dir="ltr">
            {roomsLimit || "0"}
          </strong>
        </div>

        <div className="flex min-w-0 items-center justify-between gap-3 rounded-lg border border-border-subtle bg-background p-4">
          <div className="flex min-w-0 items-center gap-2">
            <Package size={17} className="shrink-0 text-text-secondary" />
            <span className="text-xs text-text-secondary">حد الباقات</span>
          </div>
          <strong className="text-base font-bold text-text-primary" dir="ltr">
            {packagesLimit || "0"}
          </strong>
        </div>
      </div>
    </ReviewSectionCard>
  );
}
