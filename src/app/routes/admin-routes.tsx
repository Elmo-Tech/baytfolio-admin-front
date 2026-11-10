import AdminLayoutWithNuqs from "@/app/layouts/admin-layout-with-nuqs";

import { DashboardPage } from "@/modules/dashboard";
import UsersPage from "@/modules/users/pages/users-page";
import UserDetailsPage from "@/modules/users/pages/user-details-page";
import { ShowroomsPage, ShowroomDetailsPage } from "@/modules/showrooms";

export const adminRoutes = [
  {
    path: "/",
    Component: AdminLayoutWithNuqs,
    children: [
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "users",
        Component: UsersPage,
      },
      {
        path: "users/:userId",
        Component: UserDetailsPage,
      },
      {
        path: "showrooms",
        Component: ShowroomsPage,
      },
      {
        path: "showrooms/:showroomId",
        Component: ShowroomDetailsPage,
      },
    ],
  },
];
