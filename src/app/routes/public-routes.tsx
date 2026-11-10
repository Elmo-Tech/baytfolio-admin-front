import HomePage from "@/app/pages/home-page";

import ForgotPasswordPage from "@/modules/auth/pages/forgot-password-page";
import LoginPage from "@/modules/auth/pages/login-page";
import ResetPasswordPage from "@/modules/auth/pages/reset-password-page";
import VerifyOtpPage from "@/modules/auth/pages/verify-otp-page";

export const publicRoutes = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "/verify-otp",
    Component: VerifyOtpPage,
  },
  {
    path: "/reset-password",
    Component: ResetPasswordPage,
  },
];
