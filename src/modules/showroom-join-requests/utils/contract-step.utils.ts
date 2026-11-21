import {
  CONTRACT_MAX_MONTHS,
  VERIFICATION_MONTHLY_PRICE,
} from "../constants/contract-step.constants";
import type { ContractStepValues } from "../types/showroom-join-requests.types";

export const formatContractCurrency = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getContractEndDate(startDate: string) {
  const [year, month, day] = startDate.split("-").map(Number);
  if (!year || !month || !day) return "";
  const endDate = new Date(year, month - 1 + CONTRACT_MAX_MONTHS, day);
  endDate.setDate(endDate.getDate() - 1);
  return formatIsoDate(endDate);
}

export function getContractDuration(startDate: string, endDate: string) {
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
  const monthDiff =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth();
  const inclusive = end.getDate() >= start.getDate() - 1 ? 1 : 0;
  return Math.min(CONTRACT_MAX_MONTHS, monthDiff + inclusive);
}

export function calculateContractSummary(values: ContractStepValues) {
  const baseValue = Math.max(0, Number(values.baseValue) || 0);
  const maxEndDate = getContractEndDate(values.startDate);
  const duration = getContractDuration(values.startDate, values.endDate);
  const validDates =
    Boolean(values.startDate) &&
    Boolean(values.endDate) &&
    values.endDate > values.startDate &&
    values.endDate <= maxEndDate &&
    duration > 0;
  const effectiveMonths =
    values.verificationDuration === "full"
      ? duration
      : Math.max(1, Number(values.verificationMonths) || 1);
  const verificationValid =
    !values.verificationEnabled ||
    (validDates && effectiveMonths >= 1 && effectiveMonths <= duration);
  const verificationCost = values.verificationEnabled
    ? effectiveMonths * VERIFICATION_MONTHLY_PRICE
    : 0;
  const canContinue =
    validDates &&
    baseValue > 0 &&
    Number(values.roomsLimit) > 0 &&
    Number(values.packagesLimit) > 0 &&
    verificationValid;

  return {
    baseValue,
    maxEndDate,
    duration,
    validDates,
    effectiveMonths,
    verificationValid,
    verificationCost,
    total: baseValue + verificationCost,
    canContinue,
  };
}
