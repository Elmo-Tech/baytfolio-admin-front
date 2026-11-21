import AdminLayoutWithNuqs from "@/app/layouts/admin-layout-with-nuqs";
import AnalyticsPage from "@/modules/analytics/pages/analytics-page";
import CMSPage from "@/modules/cms/pages/cms-page";
import ContactInformationPage from "@/modules/cms/pages/contact-information-page";
import HelpCenterPage from "@/modules/cms/pages/help-center-page";
import PrivacyPolicyPage from "@/modules/cms/pages/privacy-policy-page";
import TermsAndConditionsPage from "@/modules/cms/pages/terms-and-conditions-page";
import { DashboardPage } from "@/modules/dashboard";
import ShowroomJoinRequestDetailsPage from "@/modules/showroom-join-requests/pages/showroom-join-request-details-page";
import ShowroomJoinRequestsPage from "@/modules/showroom-join-requests/pages/showroom-join-requests-page";
import ShowroomOnboardingWizardPage from "@/modules/showroom-join-requests/pages/showroom-onboarding-wizard-page";
import { ShowroomDetailsPage, ShowroomsPage } from "@/modules/showrooms";
import { UserDetailsPage, UsersPage } from "@/modules/users";

export const adminRoutes = [
  {
    path: "/",
    Component: AdminLayoutWithNuqs,
    children: [
      { path: "dashboard", Component: DashboardPage },
      { path: "users", Component: UsersPage },
      { path: "users/:userId", Component: UserDetailsPage },
      { path: "showrooms", Component: ShowroomsPage },
      { path: "showrooms/:showroomId", Component: ShowroomDetailsPage },
      { path: "cms", Component: CMSPage },
      { path: "cms/help-center", Component: HelpCenterPage },
      { path: "cms/contact-information", Component: ContactInformationPage },
      { path: "cms/privacy-policy", Component: PrivacyPolicyPage },
      { path: "cms/terms-and-conditions", Component: TermsAndConditionsPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "showroom-join-requests", Component: ShowroomJoinRequestsPage },
      {
        path: "showroom-join-requests/:requestId",
        Component: ShowroomJoinRequestDetailsPage,
      },
      {
        path: "showroom-join-requests/:requestId/setup",
        Component: ShowroomOnboardingWizardPage,
      },
    ],
  },
];
