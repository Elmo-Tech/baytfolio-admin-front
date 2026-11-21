import type {
  OnboardingContractData,
  OnboardingOwnerData,
  ShowroomJoinRequest,
} from "../../types/showroom-join-requests.types";
import OnboardingContractCard from "./onboarding-contract-card";
import OnboardingLegalCard from "./onboarding-legal-card";
import OnboardingLimitsCard from "./onboarding-limits-card";
import OnboardingOwnerCard from "./onboarding-owner-card";
import OnboardingShowroomCard from "./onboarding-showroom-card";
import OnboardingVerificationCard from "./onboarding-verification-card";

interface Props {
  request: ShowroomJoinRequest;
  owner: OnboardingOwnerData;
  contract: OnboardingContractData;
  activityLabel: string;
  startDateFormatted: string;
  endDateFormatted: string;
  contractDuration: number;
  baseValueFormatted: string;
  verificationMonths: number;
  verificationTotalFormatted: string;
  hasLegalInformation: boolean;
  hasSpecialTerms: boolean;
  onEditShowroom: () => void;
  onEditOwner: () => void;
  onEditContract: () => void;
}

export default function OnboardingReviewSections({
  request,
  owner,
  contract,
  activityLabel,
  startDateFormatted,
  endDateFormatted,
  contractDuration,
  baseValueFormatted,
  verificationMonths,
  verificationTotalFormatted,
  hasLegalInformation,
  hasSpecialTerms,
  onEditShowroom,
  onEditOwner,
  onEditContract,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <OnboardingShowroomCard
          showroomName={request.showroomName}
          activityLabel={activityLabel}
          location={request.location}
          description={request.description}
          onEdit={onEditShowroom}
        />
        <OnboardingOwnerCard owner={owner} onEdit={onEditOwner} />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <OnboardingContractCard
          startDateFormatted={startDateFormatted}
          endDateFormatted={endDateFormatted}
          contractDuration={contractDuration}
          baseValueFormatted={baseValueFormatted}
          onEdit={onEditContract}
        />
        <OnboardingLimitsCard
          roomsLimit={contract.roomsLimit}
          packagesLimit={contract.packagesLimit}
          onEdit={onEditContract}
        />
      </div>
      <OnboardingVerificationCard
        contract={contract}
        verificationMonths={verificationMonths}
        verificationTotalFormatted={verificationTotalFormatted}
        onEditContract={onEditContract}
      />
      <OnboardingLegalCard
        contract={contract}
        hasLegalInformation={hasLegalInformation}
        hasSpecialTerms={hasSpecialTerms}
        onEditContract={onEditContract}
      />
    </>
  );
}
