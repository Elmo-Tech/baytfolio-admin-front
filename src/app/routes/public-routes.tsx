import {
  LoginPage,
  ForgotPasswordPage,
  VerifyOtpPage,
  ResetPasswordPage,
} from "@/modules/auth";
import { HomePage, NotFoundPage } from "@/modules/app-pages";

export const publicRoutes = [
  {
    path: "/",
    Component: HomePage,
  },
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
  {
    path: "*",
    Component: NotFoundPage,
  },
];
