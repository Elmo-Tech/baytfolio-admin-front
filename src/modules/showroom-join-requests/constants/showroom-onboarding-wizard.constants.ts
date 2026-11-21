import type {
  OnboardingContractData,
  ShowroomJoinRequest,
} from "../types/showroom-join-requests.types";

export const ONBOARDING_WIZARD_STEPS = [
  { id: "1", title: "بيانات المعرض" },
  { id: "2", title: "حساب المالك" },
  { id: "3", title: "العقد والحدود" },
  { id: "4", title: "المراجعة والإنشاء" },
] as const;

export const INITIAL_ONBOARDING_CONTRACT_DATA: OnboardingContractData = {
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

export const ONBOARDING_ACTIVITY_LABELS: Record<
  ShowroomJoinRequest["activityType"],
  string
> = {
  showroom: "معرض ومصنع",
  commercial_display: "صالة عرض تجارية",
  factory: "مصنع",
  design_studio: "استوديو تصميم",
};
