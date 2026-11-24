import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui";

import { Bell } from "lucide-react";

export const NotificationsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          unstyled
          type="button"
          aria-label="الإشعارات"
          className="relative flex size-9 cursor-pointer items-center justify-center rounded-full border border-border-divider text-text-secondary-strong transition-colors hover:bg-background sm:size-10"
        >
          <Bell size={18} strokeWidth={1.8} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-notification-unread ring-2 ring-card" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <div className="p-2">
          <h3 className="mb-2 font-semibold text-text-primary">الإشعارات</h3>
          <p className="text-sm text-text-muted">
            سيتم عرض إشعارات النظام هنا عند ربطها.
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
