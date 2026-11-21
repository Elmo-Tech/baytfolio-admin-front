import { useCallback, useState } from "react";
import { useLocation } from "react-router";

import { getBreadcrumbs } from "../utils/get-breadcrumbs";

function useOutsideDismiss(isOpen: boolean, onClose: () => void) {
  return useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !isOpen) return;

      const handleOutsideClick = (event: PointerEvent) => {
        if (!node.contains(event.target as Node)) onClose();
      };

      document.addEventListener("pointerdown", handleOutsideClick);
      return () =>
        document.removeEventListener("pointerdown", handleOutsideClick);
    },
    [isOpen, onClose],
  );
}

export function useAdminHeader() {
  const { pathname } = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const closeNotifications = useCallback(
    () => setIsNotificationsOpen(false),
    [],
  );
  const closeProfileMenu = useCallback(() => setIsProfileMenuOpen(false), []);

  const notificationsRef = useOutsideDismiss(
    isNotificationsOpen,
    closeNotifications,
  );
  const profileMenuRef = useOutsideDismiss(isProfileMenuOpen, closeProfileMenu);

  return {
    breadcrumbs: getBreadcrumbs(pathname),
    isNotificationsOpen,
    isProfileMenuOpen,
    notificationsRef,
    profileMenuRef,
    onToggleNotifications: () => {
      setIsNotificationsOpen((prev) => !prev);
      setIsProfileMenuOpen(false);
    },
    onToggleProfileMenu: () => {
      setIsProfileMenuOpen((prev) => !prev);
      setIsNotificationsOpen(false);
    },
    onCloseProfileMenu: closeProfileMenu,
  };
}
