import { redirect } from "react-router";

import { AdminLayout } from "@/app/admin-layout";
import { AnalyticsPage } from "@/modules/analytics";
import {
  CMSPage,
  ContactInformationPage,
  HelpCenterPage,
  PrivacyPolicyPage,
  TermsAndConditionsPage,
} from "@/modules/cms";
import { DashboardPage } from "@/modules/dashboard";
import {
  ShowroomJoinRequestDetailsPage,
  ShowroomJoinRequestsPage,
  ShowroomOnboardingWizardPage,
} from "@/modules/showroom-join-requests";
import { ShowroomDetailsPage, ShowroomsPage } from "@/modules/showrooms";
import { UserDetailsPage, UsersPage } from "@/modules/users";
import {
  LoginPage,
  ForgotPasswordPage,
  VerifyOtpPage,
  ResetPasswordPage,
} from "@/modules/auth";

export const adminRoutes = [
  {
    path: "admin",
    children: [
      // Dahsboard Pages
      { index: true, loader: () => redirect("/admin/overview") },
      {
        Component: AdminLayout,

        children: [
          { path: "overview", Component: DashboardPage },
          {
            path: "users",
            children: [
              { index: true, Component: UsersPage },
              { path: ":userId", Component: UserDetailsPage },
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
          { path: "analytics", Component: AnalyticsPage },
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
        ],
      },

      // Auth Pages
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "forgot-password",
        children: [
          { index: true, Component: ForgotPasswordPage },
          { path: "otp", Component: VerifyOtpPage },
          { path: "reset", Component: ResetPasswordPage },
        ],
      },
    ],
  },
];
