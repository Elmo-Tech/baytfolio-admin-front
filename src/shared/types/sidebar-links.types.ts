import { type LucideIcon } from "lucide-react";

type SidebarBadgeVariant = "orange" | "blue" | "red";

export interface SidebarLink {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: number;
  badgeVariant?: SidebarBadgeVariant;
}

export interface SidebarLinks {
  title: string;
  items: SidebarLink[];
}

export type SidebarBadgeStyles = Record<SidebarBadgeVariant, string>;
