import { createBrowserRouter } from "react-router";

import { adminRoutes, publicRoutes } from "./routes";
import NotFoundPage from "./pages/not-found-page";

export function createAppRouter() {
  return createBrowserRouter([
    ...publicRoutes,
    ...adminRoutes,
    {
      path: "*",
      Component: NotFoundPage,
    },
  ]);
}

export const router = createAppRouter();
