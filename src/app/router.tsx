import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";
import LoginPage from "@/modules/auth/pages/login-page";

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
      path: "*",
      Component: NotFoundPage,
    },
  ]);
}

export const router = createAppRouter();
