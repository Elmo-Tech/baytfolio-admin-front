import { Gavel, LockKeyhole } from "lucide-react";

import type { OnboardingContractData } from "../../types/showroom-join-requests.types";
import {
  ReviewDataItem,
  ReviewSectionCard,
} from "./onboarding-review-primitives";

interface Props {
  contract: OnboardingContractData;
  hasLegalInformation: boolean;
  hasSpecialTerms: boolean;
  onEditContract: () => void;
}

export default function OnboardingLegalCard({
  contract,
  hasLegalInformation,
  hasSpecialTerms,
  onEditContract,
}: Props) {
  return (
    <div className="mt-5">
      <ReviewSectionCard
        title="بيانات الطرف المتعاقد والبنود"
        subtitle="التوثيق القانوني"
        icon={Gavel}
        onEdit={onEditContract}
      >
        {hasLegalInformation ? (
          <div className="flex flex-col gap-5">
            <ReviewDataItem
              label="الاسم القانوني للمنشأة"
              value={contract.legalName}
            />
            <ReviewDataItem
              label="المفوض بالتوقيع"
              value={contract.authorizedPerson}
            />
            <ReviewDataItem label="صفة المفوض" value={contract.legalRole} />
            <ReviewDataItem
              label="السجل التجاري / البطاقة الضريبية"
              value={contract.registrationNumber}
            />
            <ReviewDataItem
              label="العنوان القانوني"
              value={contract.legalAddress}
            />
          </div>
        ) : (
          <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
            <p className="text-xs leading-6 text-text-secondary">
              لم يتم إدخال البيانات القانونية للطرف المتعاقد بعد.
            </p>
          </div>
        )}

        {hasSpecialTerms && (
          <p className="mt-4 rounded-md bg-background p-3 text-xs leading-6 text-text-secondary">
            {contract.specialTerms}
          </p>
        )}

        {contract.internalNotes?.trim() && (
          <div className="mt-4 rounded-md border border-border-subtle bg-background p-3">
            <p className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
              <LockKeyhole size={13} />
              ملاحظات داخلية للإدارة
            </p>
            <p className="mt-2 text-xs leading-6 text-text-muted">
              {contract.internalNotes}
            </p>
          </div>
        )}
      </ReviewSectionCard>
    </div>
  );
}
