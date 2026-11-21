import { BadgeCheck } from "lucide-react";

import type { OnboardingContractData } from "../../types/showroom-join-requests.types";
import {
  ReviewDataItem,
  ReviewSectionCard,
} from "./onboarding-review-primitives";

interface Props {
  contract: OnboardingContractData;
  verificationMonths: number;
  verificationTotalFormatted: string;
  onEditContract: () => void;
}

export default function OnboardingVerificationCard({
  contract,
  verificationMonths,
  verificationTotalFormatted,
  onEditContract,
}: Props) {
  return (
    <div className="mt-5">
      <ReviewSectionCard
        title="التوثيق الرسمي للمعرض"
        subtitle="شارة موثّق"
        icon={BadgeCheck}
        onEdit={onEditContract}
      >
        <div className="flex flex-col gap-5">
          <ReviewDataItem
            label="حالة التوثيق"
            value={contract.verificationEnabled ? "مفعّل" : "غير مفعّل"}
          />
          {contract.verificationEnabled && (
            <>
              <ReviewDataItem
                label="مدة التوثيق"
                value={
                  contract.verificationDuration === "full"
                    ? "طوال مدة العقد"
                    : `${verificationMonths} أشهر`
                }
              />
              <ReviewDataItem
                label="إجمالي تكلفة التوثيق"
                value={`${verificationTotalFormatted} ج.م`}
              />
            </>
          )}
        </div>
      </ReviewSectionCard>
    </div>
  );
}
