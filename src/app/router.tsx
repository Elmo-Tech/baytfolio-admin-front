import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";

export function createAppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      Component: HomePage,
    },
    {
      path: "*",
      Component: NotFoundPage,
    },
  ]);
}

export const router = createAppRouter();
