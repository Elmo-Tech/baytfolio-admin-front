import { LockKeyhole } from "lucide-react";

import { Badge, Label } from "@/shared/components/ui";

export default function WizardOwnerRoleField() {
  return (
    <div className="space-y-2">
      <Label presentation="owner-label">الدور والصلاحية</Label>
      <div className="flex h-11 items-center justify-between rounded-md border border-border-subtle bg-background px-3">
        <div className="flex items-center gap-2">
          <LockKeyhole size={16} className="text-text-muted" />
          <span className="text-sm font-semibold text-text-primary">
            مالك المعرض (Owner)
          </span>
        </div>
        <Badge
          variant="secondary"
          className="border-transparent bg-brand-navy text-surface-white"
        >
          صلاحية إدارية
        </Badge>
      </div>
    </div>
  );
}
