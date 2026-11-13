import AdminLayoutWithNuqs from "@/app/layouts/admin-layout-with-nuqs";

import { DashboardPage } from "@/modules/dashboard";

import UsersPage from "@/modules/users/pages/users-page";
import UserDetailsPage from "@/modules/users/pages/user-details-page";

import { ShowroomsPage, ShowroomDetailsPage } from "@/modules/showrooms";

import CMSPage from "@/modules/cms/pages/cms-page";
import HelpCenterPage from "@/modules/cms/pages/help-center-page";
import ContactInformationPage from "@/modules/cms/pages/contact-information-page";
import PrivacyPolicyPage from "@/modules/cms/pages/privacy-policy-page";
import TermsAndConditionsPage from "@/modules/cms/pages/terms-and-conditions-page";

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
      {
        path: "cms",
        Component: CMSPage,
      },
      {
        path: "cms/help-center",
        Component: HelpCenterPage,
      },
      {
        path: "cms/contact-information",
        Component: ContactInformationPage,
      },
      {
        path: "cms/privacy-policy",
        Component: PrivacyPolicyPage,
      },
      {
        path: "cms/terms-and-conditions",
        Component: TermsAndConditionsPage,
      },
    ],
  },
];
