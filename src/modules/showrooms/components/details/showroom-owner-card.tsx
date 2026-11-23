import { Button } from "@/shared/components/ui/button";
import { KeyRound } from "lucide-react";

import type { ShowroomDetails } from "../../types/showroom-details";
import ShowroomDetailField from "./showroom-detail-field";

interface ShowroomOwnerCardProps {
  showroom: ShowroomDetails;
}

export default function ShowroomOwnerCard({
  showroom,
}: ShowroomOwnerCardProps) {
  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-users-panel-border bg-users-surface p-6 sm:p-7"
    >
      <div className="mb-6 border-b border-users-table-divider pb-5">
        <h2 className="text-lg font-bold text-users-text-primary sm:text-xl">
          حساب المالك (Owner Account)
        </h2>

        <p className="mt-2 text-sm text-users-text-muted">
          بيانات اعتماد المالك للوصول إلى لوحة التاجر
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ShowroomDetailField label="اسم المالك" value={showroom.owner.name} />

        <ShowroomDetailField
          label="البريد الإلكتروني لحساب العمليات"
          value={showroom.owner.accountEmail}
          dir="ltr"
        />
      </div>

      <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-xl border border-border-warm bg-surface-admin p-4 sm:flex-row sm:items-center sm:p-5">
        <p className="text-sm leading-relaxed text-users-text-secondary">
          رابط إعداد كلمة المرور تم إرساله لبريد المالك للدخول إلى لوحة تحكم
          التاجر.
        </p>

        <Button
          unstyled
          type="button"
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-users-panel-border bg-users-surface px-4 py-3 text-sm font-semibold text-users-text-primary shadow-sm transition-colors hover:bg-users-stat-neutral-bg"
        >
          <KeyRound size={17} />
          إعادة إرسال رابط إعداد كلمة المرور
        </Button>
      </div>
    </section>
  );
}
