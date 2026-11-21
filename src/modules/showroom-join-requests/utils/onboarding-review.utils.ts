import type { OnboardingContractData } from "../types/showroom-join-requests.types";
import type { ShowroomJoinRequest } from "../types/showroom-join-requests.types";

export const VERIFICATION_MONTHLY_PRICE = 1000;

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatOnboardingDate(value: string): string {
  if (!value) return "غير محدد";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function getActivityLabel(
  activityType: ShowroomJoinRequest["activityType"],
): string {
  const labels: Record<ShowroomJoinRequest["activityType"], string> = {
    showroom: "معرض ومصنع",
    commercial_display: "صالة عرض تجارية",
    factory: "مصنع",
    design_studio: "استوديو تصميم",
  };
  return labels[activityType];
}

export function getContractDuration(
  startDate: string,
  endDate: string,
): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < start
  ) {
    return 0;
  }
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth();
  return Math.max(1, months + (end.getDate() >= start.getDate() ? 1 : 0));
}

export function calculateOnboardingSummary(contract: OnboardingContractData) {
  const contractDuration = getContractDuration(
    contract.startDate,
    contract.endDate,
  );
  const verificationMonths = contract.verificationEnabled
    ? contract.verificationDuration === "full"
      ? contractDuration
      : Number(contract.verificationMonths) || 0
    : 0;
  const verificationTotal = verificationMonths * VERIFICATION_MONTHLY_PRICE;
  const baseValue = Math.max(0, Number(contract.baseValue) || 0);
  const totalValue = baseValue + verificationTotal;
  const hasLegalInformation = [
    contract.legalName,
    contract.authorizedPerson,
    contract.legalRole,
    contract.registrationNumber,
    contract.legalAddress,
  ].some((value) => Boolean(value?.trim()));

  return {
    contractDuration,
    verificationMonths,
    verificationTotal,
    baseValue,
    totalValue,
    hasSpecialTerms: Boolean(contract.specialTerms.trim()),
    hasLegalInformation,
  };
}
