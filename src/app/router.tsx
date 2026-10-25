import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";
import ForgotPasswordPage from "@/modules/auth/pages/forgot-password-page";
import LoginPage from "@/modules/auth/pages/login-page";
import ResetPasswordPage from "@/modules/auth/pages/reset-password-page";
import VerifyOtpPage from "@/modules/auth/pages/verify-otp-page";

export function createAppRouter() {
  return createBrowserRouter([
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
    {
      path: "*",
      Component: NotFoundPage,
    },
  ]);
}

export const router = createAppRouter();
