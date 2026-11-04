import AdminLayout from "@/app/layouts/admin-layout";

import UsersPage from "@/modules/users/pages/users-page";
import UserDetailsPage from "@/modules/users/pages/user-details-page";

export const adminRoutes = [
  {
    path: "/",
    Component: AdminLayout,
    children: [
      {
        path: "users",
        Component: UsersPage,
      },
      {
        path: "users/:userId",
        Component: UserDetailsPage,
      },
    ],
  },
];
