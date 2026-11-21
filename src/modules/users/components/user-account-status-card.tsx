import { Ban, ShieldCheck } from "lucide-react";

import { USER_STATUS_CONFIG } from "../constants/user-labels";
import type { UserStatus } from "../types/user";

interface UserAccountStatusCardProps {
  status: UserStatus;
  onBlock: () => void;
}

export default function UserAccountStatusCard({
  status,
  onBlock,
}: UserAccountStatusCardProps) {
  const config = USER_STATUS_CONFIG[status];

  return (
    <section className="flex min-h-[376px] flex-col rounded-lg border border-border-subtle bg-card p-5">
      <div className="mb-4 flex items-center gap-2 border-b border-users-panel-divider pb-4">
        <div className="rounded-md bg-background p-1.5">
          <ShieldCheck size={17} className="text-users-text-secondary" />
        </div>
        <h2 className="font-semibold text-users-text-primary">حالة الحساب</h2>
      </div>

      <div className="rounded-md border border-users-panel-divider bg-users-surface-input p-4">
        <p className="mb-3 text-xs text-users-text-subtle">الحالة التشغيلية</p>
        <div
          className={`mb-3 flex items-center gap-2 font-semibold ${config.color}`}
        >
          <span className={`size-2 rounded-full ${config.dot}`} />
          {config.label}
        </div>
        <p className="text-xs leading-6 text-users-text-secondary">
          {config.description}
        </p>
      </div>

      <div className="mt-auto border-t border-users-panel-divider pt-5">
        {status === "active" && (
          <button
            type="button"
            onClick={onBlock}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-users-action-border px-3 text-xs font-medium text-users-action-fg transition hover:bg-users-action-hover"
          >
            <Ban size={14} />
            حظر المستخدم
          </button>
        )}
      </div>
    </section>
  );
}
