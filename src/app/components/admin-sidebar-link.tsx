import { NavLink } from "react-router";

import {
  SIDEBAR_BADGE_STYLES,
  type SidebarNavItem,
} from "../constants/sidebar-navigation";

interface AdminSidebarLinkProps {
  item: SidebarNavItem;
}

export default function AdminSidebarLink({ item }: AdminSidebarLinkProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.to !== "/users"}
      className={({ isActive }) =>
        [
          "flex min-h-[42px] items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-200",
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
              className={`flex h-[22px] min-w-[23px] shrink-0 items-center justify-center rounded px-1 text-xs font-semibold ${SIDEBAR_BADGE_STYLES[item.badgeVariant]}`}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
