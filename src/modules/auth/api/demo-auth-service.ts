import {
  DEMO_PASSWORD,
  DEMO_RECOVERY_CODE,
  DEMO_INVITATION_TOKEN,
  demoAccounts,
} from "@/modules/auth/constants/demo-accounts";
import type {
  DemoAccount,
  DemoInvitation,
  DemoSession,
  RecoveryChallenge,
} from "@/modules/auth/types/auth";
import type { LoginValues } from "@/modules/auth/schemas/login-schema";

export class DemoAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DemoAuthError";
  }
}

/** Isolated, intentionally simulated auth; no HTTP, browser storage, or Laravel contracts. */
export function createDemoAuthService(delayMs = 150) {
  const accounts: DemoAccount[] = demoAccounts.map((account) => ({
    ...account,
  }));
  const passwords = new Map(
    accounts.map((account) => [account.email, DEMO_PASSWORD]),
  );
  const recovery = new Map<string, RecoveryChallenge>();
  const invitation: DemoInvitation = {
    token: DEMO_INVITATION_TOKEN,
    email: "invited@vendor.example",
    role: "Content Editor",
    expiresAt: Date.now() + 30 * 60_000,
    used: false,
  };
  let session: DemoSession | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const listeners = new Set<() => void>();
  const wait = () =>
    new Promise<void>((resolve) => setTimeout(resolve, delayMs));
  const notify = () => listeners.forEach((listener) => listener());
  function expireSession() {
    if (timer) clearTimeout(timer);
    timer = undefined;
    session = null;
    notify();
  }
  function peekSession(): DemoSession | null {
    if (session && session.expiresAt <= Date.now()) expireSession();
    return session;
  }
  return {
    peekSession,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    async readSession(): Promise<DemoSession | null> {
      await wait();
      return peekSession();
    },
    async login(values: LoginValues): Promise<DemoSession> {
      await wait();
      const account = accounts.find(
        (candidate) => candidate.email === values.email,
      );
      if (!account || passwords.get(values.email) !== values.password)
        throw new DemoAuthError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      if (
        !account.active ||
        (account.scope === "vendor" && !account.organizationActive)
      )
        throw new DemoAuthError(
          "هذا الحساب أو المعرض غير مفعّل. تواصل مع إدارة BaytFolio.",
        );
      if (timer) clearTimeout(timer);
      const { id, email, name, scope, role } = account;
      session = {
        user: { id, email, name, scope, role },
        expiresAt: Date.now() + 20 * 60_000,
      };
      timer = setTimeout(expireSession, 20 * 60_000);
      notify();
      return session;
    },
    async logout(): Promise<void> {
      await wait();
      expireSession();
    },
    expireSession,
    async requestRecovery(email: string): Promise<void> {
      await wait();
      if (accounts.some((account) => account.email === email && account.active))
        recovery.set(email, {
          email,
          code: DEMO_RECOVERY_CODE,
          expiresAt: Date.now() + 5 * 60_000,
          verified: false,
        });
      // Same outcome for known/unknown accounts; the demo does not send email.
    },
    async verifyRecovery(email: string, code: string): Promise<void> {
      await wait();
      const challenge = recovery.get(email);
      if (
        !challenge ||
        challenge.expiresAt <= Date.now() ||
        challenge.code !== code
      )
        throw new DemoAuthError("رمز الاسترجاع غير صحيح أو انتهت صلاحيته.");
      challenge.verified = true;
    },
    async resetPassword(email: string, password: string): Promise<void> {
      await wait();
      const challenge = recovery.get(email);
      if (!challenge?.verified || challenge.expiresAt <= Date.now())
        throw new DemoAuthError("انتهت صلاحية الاسترجاع. ابدأ من جديد.");
      passwords.set(email, password);
      recovery.delete(email);
      expireSession();
    },
    async readInvitation(token: string): Promise<DemoInvitation> {
      await wait();
      if (
        token !== invitation.token ||
        invitation.used ||
        invitation.expiresAt <= Date.now()
      )
        throw new DemoAuthError("الدعوة غير صالحة أو انتهت صلاحيتها.");
      return { ...invitation };
    },
    async acceptInvitation(
      token: string,
      name: string,
      password: string,
    ): Promise<void> {
      await wait();
      if (
        token !== invitation.token ||
        invitation.used ||
        invitation.expiresAt <= Date.now()
      )
        throw new DemoAuthError("الدعوة غير صالحة أو انتهت صلاحيتها.");
      accounts.push({
        id: "vendor-invited",
        email: invitation.email,
        name,
        scope: "vendor",
        role: invitation.role,
        active: true,
        organizationActive: true,
      });
      passwords.set(invitation.email, password);
      invitation.used = true;
    },
  };
}
export type DemoAuthService = ReturnType<typeof createDemoAuthService>;
export const demoAuthService = createDemoAuthService();
