import { render, screen, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { expect, it } from "vitest";
import { createQueryClient } from "@/shared/config/query-client";
import { AuthProvider, RequireSession } from "@/modules/auth";
import { LoginPage } from "@/modules/auth/pages/login-page";
import { SessionPage } from "@/modules/auth/pages/session-page";
import { createDemoAuthService } from "@/modules/auth/api/demo-auth-service";
import { DEMO_PASSWORD } from "@/modules/auth/constants/demo-accounts";

it("protects private routes, preserves return context and clears private cache on expiration", async () => {
  const service = createDemoAuthService(0);
  const client = createQueryClient();
  const router = createMemoryRouter(
    [
      { path: "/login", element: <LoginPage /> },
      {
        element: <RequireSession scope="vendor" />,
        children: [{ path: "/vendor", element: <SessionPage /> }],
      },
    ],
    { initialEntries: ["/vendor?tab=demo"] },
  );
  render(
    <QueryClientProvider client={client}>
      <AuthProvider service={service}>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>,
  );
  await screen.findByRole("button", { name: "تسجيل الدخول" });
  expect(router.state.location.pathname).toBe("/login");
  expect(
    new URLSearchParams(router.state.location.search).get("returnTo"),
  ).toBe("/vendor?tab=demo");
  await service.login({
    email: "owner@vendor.example",
    password: DEMO_PASSWORD,
  });
  await router.navigate("/vendor");
  await screen.findByRole("heading", { name: "جلسة Vendor التجريبية" });
  client.setQueryData(["private", "example"], { sensitive: true });
  service.expireSession();
  await waitFor(() =>
    expect(client.getQueryData(["private", "example"])).toBeUndefined(),
  );
  await screen.findByRole("button", { name: "تسجيل الدخول" });
  expect(router.state.location.pathname).toBe("/login");
});
