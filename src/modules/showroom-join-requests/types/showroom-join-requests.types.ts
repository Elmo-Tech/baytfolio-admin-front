export type ShowroomJoinRequestStatus =
  | "new"
  | "under_review"
  | "pending_agreement"
  | "approved"
  | "contacted"
  | "qualified"
  | "rejected"
  | "closed";

export type ShowroomActivityType =
  "showroom" | "commercial_display" | "factory" | "design_studio";

export type ShowroomJoinRequestHistoryEvent = {
  id: string;
  status: ShowroomJoinRequestStatus;
  description: string;
  timestamp: string;
  performedBy?: string;
  source?: "system" | "admin";
};

export type ShowroomJoinRequestLegalInformation = {
  legalName?: string;
  authorizedPerson?: string;
  legalRole?: string;
  registrationNumber?: string;
  legalAddress?: string;
};

export type ShowroomJoinRequest = {
  id: string;
  reference: string;
  showroomName: string;
  location: string;
  description?: string;
  activityType: ShowroomActivityType;
  contactPerson: string;
  phone: string;
  email: string;
  submittedAt: string;
  status: ShowroomJoinRequestStatus;
  history?: ShowroomJoinRequestHistoryEvent[];
  rejectionReason?: string;
  legalInformation?: ShowroomJoinRequestLegalInformation;
};

export type OnboardingOwnerData = {
  name: string;
  email: string;
  phone: string;
};

export type OnboardingContractData = {
  startDate: string;
  endDate: string;
  baseValue: string;
  roomsLimit: string;
  packagesLimit: string;
  verificationEnabled: boolean;
  verificationDuration: "full" | "fixed";
  verificationMonths: string;
  specialTerms: string;
  internalNotes: string;
  legalName: string;
  authorizedPerson: string;
  legalRole: string;
  registrationNumber: string;
  legalAddress: string;
};

export type ContractStepLegalInfo = ShowroomJoinRequestLegalInformation;
export type ContractStepValues = OnboardingContractData;
