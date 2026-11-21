import { Info, ShieldCheck } from "lucide-react";

export function ContactSyncNotice() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-users-panel-border bg-users-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-users-table-header text-users-text-secondary">
          <Info size={18} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-users-text-primary">
            سجل إعدادات الاتصال المعتمد
          </h2>
          <p className="mt-1 text-xs leading-6 text-users-text-muted">
            هذا القسم مخصص حصريًا للمعلومات النصية المباشرة (الهاتف، واتساب،
            البريد، ومواعيد العمل) دون خرائط جغرافية أو أنظمة تذاكر دعم.
          </p>
        </div>
      </div>

      <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-status-active-bg px-3 py-1.5 text-xs font-medium text-status-active-fg">
        <span className="size-2 rounded-full bg-status-active-fg" />
        متزامن مع المعاينة الحية (Live Preview)
      </span>
    </div>
  );
}

export function ContactSecurityNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-users-panel-border bg-users-table-header p-4">
      <ShieldCheck
        size={19}
        className="mt-0.5 shrink-0 text-users-text-muted"
      />
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-users-text-primary">
          سياسة أمان التحديثات المركزية
        </h3>
        <p className="mt-1 text-xs leading-6 text-users-text-muted">
          يجب أن تخضع تعديلات بيانات الاتصال للمراجعة والصلاحيات الإدارية
          المناسبة. عند ربط الـBackend، يجب تسجيل عمليات التعديل باسم المسؤول
          وتاريخ التغيير، مع تحديث البيانات المنشورة وفق آلية الاعتماد المعتمدة.
        </p>
      </div>
    </div>
  );
}
