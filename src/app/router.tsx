import { createBrowserRouter } from "react-router";

import { adminRoutes } from "./routes";
import NotFoundPage from "./pages/not-found-page";

export function createAppRouter() {
  return createBrowserRouter([
    ...adminRoutes,
    {
      path: "*",
      Component: NotFoundPage,
    },
  ]);
}

export const router = createAppRouter();
