import type { LoginRole } from "../types/login.types";

export const getAuthPath = (path: string, role: LoginRole) => {
  const searchParams = new URLSearchParams({ role });
  return `${path}?${searchParams.toString()}`;
};
