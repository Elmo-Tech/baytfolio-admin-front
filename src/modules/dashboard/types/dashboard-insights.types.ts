export interface ExpiringContract {
  id: string;
  organization: string;
  expiryDate: string;
  remainingDays: number;
}

export interface RecentActivity {
  id: string;
  title: string;
  user: string;
  time: string;
  status: "success" | "info" | "error" | "warning";
}

export interface ActiveShowroom {
  id: string;
  name: string;
  rooms: number;
  packages: number;
  views: string;
  interactions: string;
  growth: number;
}
