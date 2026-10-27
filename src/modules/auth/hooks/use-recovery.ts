import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "@/modules/auth/providers/service-context";
export function useRecovery() {
  const service = useAuthService();
  const request = useMutation({
    mutationFn: (email: string) => service.requestRecovery(email),
    gcTime: 0,
    retry: false,
  });
  const verify = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      service.verifyRecovery(email, code),
    gcTime: 0,
    retry: false,
  });
  const reset = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      service.resetPassword(email, password),
    gcTime: 0,
    retry: false,
  });
  return { request, verify, reset };
}
