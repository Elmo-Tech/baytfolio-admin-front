import { createContext, useContext } from "react";
import type { DemoAuthService } from "@/modules/auth/api/demo-auth-service";
export const ServiceContext = createContext<DemoAuthService | null>(null);
export function useAuthService(): DemoAuthService {
  const service = useContext(ServiceContext);
  if (!service) throw new Error("AuthProvider is required.");
  return service;
}
