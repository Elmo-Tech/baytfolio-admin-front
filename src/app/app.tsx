import { RouterProvider } from "react-router";
import { router } from "@/app/router";
import { AppProviders } from "@/app/providers/app-providers";

export default function App({
  routerInstance = router,
}: {
  routerInstance?: typeof router;
}) {
  return (
    <AppProviders>
      <RouterProvider router={routerInstance} />
    </AppProviders>
  );
}
