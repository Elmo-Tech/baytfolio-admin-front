import { DemoAuthError } from "@/modules/auth/api/demo-auth-service";
export function authErrorMessage(error: unknown): string {
  return error instanceof DemoAuthError
    ? error.message
    : "تعذّر إكمال الطلب. حاول مرة أخرى.";
}
