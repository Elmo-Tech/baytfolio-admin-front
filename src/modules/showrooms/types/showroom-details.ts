import type { Showroom } from "./showroom";

export type ShowroomDetails = Showroom & {
  email: string;
  description: string;

  contract: {
    number: string;
    startDate: string;
    endDate: string;
    basePrice: number;
    currency: string;
  };

  promotion: {
    status: "active" | "scheduled" | "inactive";
    startDate: string;
    endDate: string;
    durationMonths: number;
    notes: string;
  };

  owner: {
    name: string;
    email: string;
    accountEmail: string;
  };
};
