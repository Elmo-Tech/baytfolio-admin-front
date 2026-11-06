export type PriorityItemType =
  | "join-request"
  | "room-review"
  | "ownership-dispute"
  | "promotion-request"
  | "contract-renewal"
  | "suspended-showroom";

export type PriorityItemStatus =
  | "documents-complete"
  | "dimensions-review"
  | "urgent-dispute-closed"
  | "eligibility-verified"
  | "notification-sent"
  | "awaiting-update";

export type PriorityItemAction =
  | "review-approve"
  | "inspect-room"
  | "handle-report"
  | "schedule-publish"
  | "review-contract"
  | "inspect-showroom";

export interface PriorityItem {
  id: string;
  type: PriorityItemType;
  item: string;
  detail: string;
  organization: string;
  organizationDetail: string;
  status: PriorityItemStatus;
  updatedAt: string;
  action: PriorityItemAction;
}
