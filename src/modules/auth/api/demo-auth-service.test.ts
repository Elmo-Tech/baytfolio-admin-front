import { afterEach, describe, expect, it, vi } from "vitest";
import { createDemoAuthService } from "./demo-auth-service";
import {
  demoAccounts,
  DEMO_PASSWORD,
  DEMO_INVITATION_TOKEN,
} from "@/modules/auth/constants/demo-accounts";

const service = createDemoAuthService(0);
afterEach(() => {
  service.expireSession();
  vi.restoreAllMocks();
});
describe("isolated demonstration auth service", () => {
  it.each(
    demoAccounts.filter(
      (account) => account.active && account.organizationActive,
    ),
  )("logs in $scope / $role", async (account) => {
    const session = await service.login({
      email: account.email,
      password: DEMO_PASSWORD,
    });
    expect(session.user.role).toBe(account.role);
    expect(session.user.scope).toBe(account.scope);
    expect(session.user).not.toHaveProperty("password");
    expect(await service.readSession()).toEqual(session);
  });
  it.each(["suspended@vendor.example", "disabled@vendor.example"])(
    "rejects inactive access: %s",
    async (email) => {
      await expect(
        service.login({ email, password: DEMO_PASSWORD }),
      ).rejects.toThrow("غير مفعّل");
      expect(await service.readSession()).toBeNull();
    },
  );
  it("rejects bad credentials and clears the session on logout", async () => {
    await expect(
      service.login({ email: "owner@vendor.example", password: "wrong" }),
    ).rejects.toThrow("غير صحيحة");
    await service.login({
      email: "owner@vendor.example",
      password: DEMO_PASSWORD,
    });
    await service.logout();
    expect(await service.readSession()).toBeNull();
  });
  it("expires sessions when their lifetime has elapsed", async () => {
    const now = Date.now();
    await service.login({
      email: "owner@vendor.example",
      password: DEMO_PASSWORD,
    });
    vi.spyOn(Date, "now").mockReturnValue(now + 21 * 60_000);
    expect(await service.readSession()).toBeNull();
  });
  it("requires verification, rejects wrong/expired codes and consumes successful recovery", async () => {
    const isolated = createDemoAuthService(0);
    await isolated.requestRecovery("owner@vendor.example");
    await expect(
      isolated.resetPassword("owner@vendor.example", "UpdatedDemo!"),
    ).rejects.toThrow();
    await expect(
      isolated.verifyRecovery("owner@vendor.example", "000000"),
    ).rejects.toThrow();
    await isolated.verifyRecovery("owner@vendor.example", "123456");
    await isolated.resetPassword("owner@vendor.example", "UpdatedDemo!");
    await expect(
      isolated.resetPassword("owner@vendor.example", "SecondDemo!"),
    ).rejects.toThrow();
    await expect(
      isolated.login({
        email: "owner@vendor.example",
        password: DEMO_PASSWORD,
      }),
    ).rejects.toThrow();
    await isolated.login({
      email: "owner@vendor.example",
      password: "UpdatedDemo!",
    });
    isolated.expireSession();
    await isolated.requestRecovery("owner@vendor.example");
    const now = Date.now();
    vi.spyOn(Date, "now").mockReturnValue(now + 6 * 60_000);
    await expect(
      isolated.verifyRecovery("owner@vendor.example", "123456"),
    ).rejects.toThrow();
  });
  it("keeps the same request outcome for an unknown recovery email", async () => {
    await expect(
      service.requestRecovery("missing@example.test"),
    ).resolves.toBeUndefined();
    await expect(
      service.verifyRecovery("missing@example.test", "123456"),
    ).rejects.toThrow();
  });
  it("accepts only a valid unused Vendor invitation", async () => {
    const isolated = createDemoAuthService(0);
    await expect(isolated.readInvitation("invalid")).rejects.toThrow();
    const invitation = await isolated.readInvitation(DEMO_INVITATION_TOKEN);
    await isolated.acceptInvitation(
      DEMO_INVITATION_TOKEN,
      "Invited member",
      "InvitedDemo!",
    );
    await expect(
      isolated.acceptInvitation(DEMO_INVITATION_TOKEN, "Again", "InvitedDemo!"),
    ).rejects.toThrow();
    await expect(
      isolated.readInvitation(DEMO_INVITATION_TOKEN),
    ).rejects.toThrow();
    const session = await isolated.login({
      email: invitation.email,
      password: "InvitedDemo!",
    });
    expect(session.user.scope).toBe("vendor");
    expect(session.user.role).toBe("Content Editor");
    isolated.expireSession();
  });
  it("rejects expired invitations", async () => {
    const isolated = createDemoAuthService(0);
    const now = Date.now();
    vi.spyOn(Date, "now").mockReturnValue(now + 31 * 60_000);
    await expect(
      isolated.readInvitation(DEMO_INVITATION_TOKEN),
    ).rejects.toThrow();
    await expect(
      isolated.acceptInvitation(DEMO_INVITATION_TOKEN, "Name", "DemoPassword!"),
    ).rejects.toThrow();
  });
});
