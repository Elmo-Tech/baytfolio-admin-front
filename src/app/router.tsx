import { createBrowserRouter } from "react-router";

import { adminRoutes } from "./routes";
import { publicRoutes } from "./routes/public-routes";

export function createAppRouter() {
  return createBrowserRouter([...publicRoutes, ...adminRoutes]);
}

export const router = createAppRouter();
