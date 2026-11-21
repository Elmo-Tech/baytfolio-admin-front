import { useOnboardingReview } from "../../hooks/use-onboarding-review";
import type {
  OnboardingContractData,
  OnboardingOwnerData,
  ShowroomJoinRequest,
} from "../../types/showroom-join-requests.types";
import OnboardingFinancialFooter from "./onboarding-financial-footer";
import OnboardingFinancialSummary from "./onboarding-financial-summary";
import OnboardingReviewHeader from "./onboarding-review-header";
import OnboardingReviewSections from "./onboarding-review-sections";

interface Props {
  request: ShowroomJoinRequest;
  owner: OnboardingOwnerData;
  contract: OnboardingContractData;
  onBack: () => void;
  onEditShowroom: () => void;
  onEditOwner: () => void;
  onEditContract: () => void;
  onCreate: () => void;
  isCreating?: boolean;
}

export default function ShowroomOnboardingReview({
  request,
  owner,
  contract,
  onBack,
  onEditShowroom,
  onEditOwner,
  onEditContract,
  onCreate,
  isCreating = false,
}: Props) {
  const { summary, ...formatted } = useOnboardingReview(request, contract);

  return (
    <section className="rounded-xl border border-border-subtle bg-card p-5 sm:p-7">
      <OnboardingReviewHeader />
      <OnboardingReviewSections
        request={request}
        owner={owner}
        contract={contract}
        activityLabel={formatted.activityLabel}
        startDateFormatted={formatted.startDateFormatted}
        endDateFormatted={formatted.endDateFormatted}
        contractDuration={summary.contractDuration}
        baseValueFormatted={formatted.baseValueFormatted}
        verificationMonths={summary.verificationMonths}
        verificationTotalFormatted={formatted.verificationTotalFormatted}
        hasLegalInformation={summary.hasLegalInformation}
        hasSpecialTerms={summary.hasSpecialTerms}
        onEditShowroom={onEditShowroom}
        onEditOwner={onEditOwner}
        onEditContract={onEditContract}
      />
      <OnboardingFinancialSummary
        request={request}
        verificationMonths={summary.verificationMonths}
        baseValueFormatted={formatted.baseValueFormatted}
        verificationTotalFormatted={formatted.verificationTotalFormatted}
        totalValueFormatted={formatted.totalValueFormatted}
      />
      <OnboardingFinancialFooter
        onBack={onBack}
        onCreate={onCreate}
        isCreating={isCreating}
      />
    </section>
  );
}
