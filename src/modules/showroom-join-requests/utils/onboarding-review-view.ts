import type { OnboardingContractData } from "../types/showroom-join-requests.types";
import {
  calculateOnboardingSummary,
  formatCurrency,
  formatOnboardingDate,
  getActivityLabel,
} from "../utils/onboarding-review.utils";
import type { ShowroomJoinRequest } from "../types/showroom-join-requests.types";

export function getOnboardingReview(
  request: ShowroomJoinRequest,
  contract: OnboardingContractData,
) {
  const summary = calculateOnboardingSummary(contract);

  return {
    summary,
    activityLabel: getActivityLabel(request.activityType),
    startDateFormatted: formatOnboardingDate(contract.startDate),
    endDateFormatted: formatOnboardingDate(contract.endDate),
    baseValueFormatted: formatCurrency(summary.baseValue),
    verificationTotalFormatted: formatCurrency(summary.verificationTotal),
    totalValueFormatted: formatCurrency(summary.totalValue),
  };
}
