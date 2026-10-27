import { useMutation, useQuery } from "@tanstack/react-query";
import type { LoginValues } from "@/modules/auth/schemas/login-schema";
import { useAuthService } from "@/modules/auth/providers/service-context";
import { authQueryKeys } from "@/modules/auth/constants/demo-accounts";

export function useSession() {
  const service = useAuthService();
  return useQuery({
    queryKey: authQueryKeys.session,
    queryFn: () => service.readSession(),
    retry: false,
  });
}
export function useLogin() {
  const service = useAuthService();
  return useMutation({
    mutationFn: (values: LoginValues) => service.login(values),
    gcTime: 0,
    retry: false,
  });
}
export function useLogout() {
  const service = useAuthService();
  return useMutation({
    mutationFn: () => service.logout(),
    gcTime: 0,
    retry: false,
  });
}
