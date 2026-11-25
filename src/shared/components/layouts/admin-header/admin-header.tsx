import { MenuIcon } from "./menu-icon";
import { NotificationsMenu } from "./notifications-menu";
import { ProfileMenu } from "./profile-menu";

export const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-40 flex h-22 items-center justify-between gap-3 border-b border-border-subtle bg-card px-6">
      <div className="block xl:hidden">
        <MenuIcon />
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <NotificationsMenu />

        <div className="relative border-r border-border-divider pr-2 sm:pr-4 lg:pr-5">
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};
