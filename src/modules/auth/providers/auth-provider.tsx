import { useEffect, type PropsWithChildren } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  demoAuthService,
  type DemoAuthService,
} from "@/modules/auth/api/demo-auth-service";
import { authQueryKeys } from "@/modules/auth/constants/demo-accounts";

import { ServiceContext } from "@/modules/auth/providers/service-context";
export function AuthProvider({
  children,
  service = demoAuthService,
}: PropsWithChildren<{ service?: DemoAuthService }>) {
  const queryClient = useQueryClient();
  useEffect(
    () =>
      service.subscribe(() => {
        void queryClient.cancelQueries().then(() => {
          queryClient.removeQueries({
            predicate: (query) =>
              query.queryKey[0] !== "auth" || query.queryKey[1] !== "session",
          });
          queryClient.setQueryData(
            authQueryKeys.session,
            service.peekSession(),
          );
        });
      }),
    [queryClient, service],
  );
  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
}
