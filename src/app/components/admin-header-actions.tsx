import { PopoverPanel } from "@/shared/components/ui/popover-panel";
import { Button } from "@/shared/components/ui/button";
import type { RefCallback } from "react";
import { Bell } from "lucide-react";

interface AdminHeaderActionsProps {
  isNotificationsOpen: boolean;
  isProfileMenuOpen: boolean;
  notificationsRef: RefCallback<HTMLDivElement>;
  profileMenuRef: RefCallback<HTMLDivElement>;
  onToggleNotifications: () => void;
  onToggleProfileMenu: () => void;
  onCloseProfileMenu: () => void;
}

export default function AdminHeaderActions({
  isNotificationsOpen,
  isProfileMenuOpen,
  notificationsRef,
  profileMenuRef,
  onToggleNotifications,
  onToggleProfileMenu,
  onCloseProfileMenu,
}: AdminHeaderActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">
      <div ref={notificationsRef} className="relative">
        <Button
          unstyled
          type="button"
          aria-label="الإشعارات"
          aria-expanded={isNotificationsOpen}
          aria-haspopup="true"
          onClick={onToggleNotifications}
          className="relative flex size-9 cursor-pointer items-center justify-center rounded-full border border-border-divider text-text-secondary-strong transition-colors hover:bg-background sm:size-10"
        >
          <Bell size={18} strokeWidth={1.8} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-notification-unread ring-2 ring-card" />
        </Button>

        {isNotificationsOpen && (
          <PopoverPanel dir="rtl" presentation="notifications">
            <h3 className="mb-2 font-semibold text-text-primary">الإشعارات</h3>
            <p className="text-sm text-text-muted">
              سيتم عرض إشعارات النظام هنا عند ربطها.
            </p>
          </PopoverPanel>
        )}
      </div>

      <div
        ref={profileMenuRef}
        className="relative border-r border-border-divider pr-2 sm:pr-4 lg:pr-5"
      >
        <Button
          unstyled
          type="button"
          aria-label="قائمة حساب المدير"
          aria-expanded={isProfileMenuOpen}
          aria-haspopup="true"
          onClick={onToggleProfileMenu}
          className="flex cursor-pointer items-center gap-2 sm:gap-3"
        >
          <div className="hidden flex-col items-start gap-1 sm:flex">
            <p className="whitespace-nowrap text-xs font-semibold leading-5 text-text-primary sm:text-sm">
              إبراهيم المهدي
            </p>
            <p className="whitespace-nowrap text-[10px] leading-5 text-text-muted sm:text-xs">
              المسؤول الأعلى
            </p>
          </div>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-brand-gold sm:size-11">
            م
          </div>
        </Button>

        {isProfileMenuOpen && (
          <PopoverPanel dir="ltr" presentation="profile-menu">
            <Button
              unstyled
              type="button"
              onClick={onCloseProfileMenu}
              className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-logout transition-colors hover:bg-logout-hover"
            >
              Log out
            </Button>
          </PopoverPanel>
        )}
      </div>
    </div>
  );
}
