export type ShowroomActivity =
  "showroom" | "factory" | "showroom_factory" | "studio_manufacturing";

export type ShowroomStatus = "active" | "suspended";

export type ContractStatus = "active" | "expiring" | "expired";

export type Showroom = {
  id: string;
  name: string;
  reference: string;
  activity: ShowroomActivity;
  managerName: string;
  managerPhone: string;
  status: ShowroomStatus;
  isVerified?: boolean;
  contractStatus: ContractStatus;
  rooms: {
    used: number;
    total: number;
  };
  packages: {
    used: number;
    total: number;
  };
  contractEndDate: string;
};
