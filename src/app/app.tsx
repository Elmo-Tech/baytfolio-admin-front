import { RouterProvider } from "react-router";
import { router } from "@/app/router";
import { AppProviders } from "@/app/providers/app-providers";

type AppProps = {
  routerInstance?: typeof router;
};

export default function App({ routerInstance = router }: AppProps) {
  return (
    <AppProviders>
      <RouterProvider router={routerInstance} />
    </AppProviders>
  );
}
