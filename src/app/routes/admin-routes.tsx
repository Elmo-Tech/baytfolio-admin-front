import { redirect } from "react-router";

import { AdminLayout } from "@/app/admin-layout";
import { DashboardPage } from "@/modules/dashboard";
import {
  ShowroomJoinRequestDetailsPage,
  ShowroomJoinRequestsPage,
  ShowroomOnboardingWizardPage,
} from "@/modules/showroom-join-requests";
import { ShowroomDetailsPage, ShowroomsPage } from "@/modules/showrooms";
import { UserDetailsPage, UsersPage } from "@/modules/users";
import { CategoriesAndTagsPage } from "@/modules/categories-and-tags";
import { ReviewsPage } from "@/modules/reviews";
import { AnalyticsPage } from "@/modules/analytics";
import {
  CMSPage,
  ContactInformationPage,
  HelpCenterPage,
  PrivacyPolicyPage,
  TermsAndConditionsPage,
} from "@/modules/cms";

export const adminRoutes = [
  {
    path: "admin",
    children: [
      // Dahsboard Pages
      { index: true, loader: () => redirect("/admin/dashboard") },
      {
        Component: AdminLayout,

        children: [
          { path: "dashboard", Component: DashboardPage },
          {
            path: "showroom-join-requests",
            children: [
              { index: true, Component: ShowroomJoinRequestsPage },
              {
                path: ":requestId",
                children: [
                  { index: true, Component: ShowroomJoinRequestDetailsPage },
                  {
                    path: "setup",
                    Component: ShowroomOnboardingWizardPage,
                  },
                ],
              },
            ],
          },
          {
            path: "showrooms",
            children: [
              { index: true, Component: ShowroomsPage },
              { path: ":showroomId", Component: ShowroomDetailsPage },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, Component: UsersPage },
              { path: ":userId", Component: UserDetailsPage },
            ],
          },
          {
            path: "categories-and-tags",
            Component: CategoriesAndTagsPage,
          },
          {
            path: "reviews",
            Component: ReviewsPage,
          },
          { path: "analytics", Component: AnalyticsPage },
          {
            path: "cms",
            children: [
              { index: true, Component: CMSPage },
              { path: "help-center", Component: HelpCenterPage },
              {
                path: "contact-information",
                Component: ContactInformationPage,
              },
              { path: "privacy-policy", Component: PrivacyPolicyPage },
              {
                path: "terms-and-conditions",
                Component: TermsAndConditionsPage,
              },
            ],
          },
        ],
      },
    ],
  },
];
