import { NavLink } from "react-router";

import { sidebarBadgeStyles } from "../../../constants/sidebar.constants";
import type { SidebarLink as SidebarLinkItem } from "../../../types/sidebar-links.types";

interface SidebarLinkProps {
  item: SidebarLinkItem;
}

export const SidebarLink = ({ item }: SidebarLinkProps) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.to !== "/admin/users"}
      className={({ isActive }) =>
        [
          "flex min-h-10.5 items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-200",
          isActive
            ? "bg-brand-navy font-semibold text-primary-foreground"
            : "text-text-secondary-strong hover:bg-background",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span className="flex min-w-0 items-center gap-3">
            <Icon
              size={19}
              strokeWidth={1.8}
              className={
                isActive ? "text-primary-foreground" : "text-text-muted"
              }
            />
            <span className="truncate">{item.label}</span>
          </span>

          {item.badge !== undefined && item.badgeVariant && (
            <span
              className={`flex h-5.5 min-w-5.75 shrink-0 items-center justify-center rounded px-1 text-xs font-semibold ${sidebarBadgeStyles[item.badgeVariant]}`}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};
