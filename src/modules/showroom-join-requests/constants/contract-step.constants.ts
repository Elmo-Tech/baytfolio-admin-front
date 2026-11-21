import type { ContractStepValues } from "../types/showroom-join-requests.types";

export const CONTRACT_MAX_MONTHS = 12;
export const VERIFICATION_MONTHLY_PRICE = 1000;

export const INITIAL_CONTRACT_STEP_VALUES: ContractStepValues = {
  startDate: "2026-11-01",
  endDate: "2027-10-31",
  baseValue: "30000",
  roomsLimit: "100",
  packagesLimit: "20",
  verificationEnabled: false,
  verificationDuration: "full",
  verificationMonths: "3",
  specialTerms: "",
  internalNotes: "",
  legalName: "",
  authorizedPerson: "",
  legalRole: "",
  registrationNumber: "",
  legalAddress: "",
};
