import { createBrowserRouter } from "react-router";

import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";
import AdminLayout from "./layouts/admin-layout";

import ForgotPasswordPage from "@/modules/auth/pages/forgot-password-page";
import LoginPage from "@/modules/auth/pages/login-page";
import ResetPasswordPage from "@/modules/auth/pages/reset-password-page";
import VerifyOtpPage from "@/modules/auth/pages/verify-otp-page";

import UsersPage from "@/modules/users/pages/users-page";
import UserDetailsPage from "@/modules/users/pages/user-details-page";

export function createAppRouter() {
  return createBrowserRouter([
    // Public Routes
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

    // Admin Routes
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

    // Not Found
    {
      path: "*",
      Component: NotFoundPage,
    },
  ]);
}

export const router = createAppRouter();
