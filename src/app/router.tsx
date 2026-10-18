import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
