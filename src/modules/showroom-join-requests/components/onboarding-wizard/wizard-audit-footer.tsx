import { ShieldCheck } from "lucide-react";

export default function WizardAuditFooter() {
  return (
    <footer
      dir="rtl"
      className="flex flex-col justify-between gap-4 px-2 py-5 text-xs text-text-muted sm:flex-row sm:items-center"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck size={15} className="shrink-0" />
        <span>
          جميع الإجراءات في هذا المعالج تخضع لتدقيق سجل النشاطات الإدارية (Audit
          Trail).
        </span>
      </div>
      <div
        dir="ltr"
        className="flex flex-wrap items-center gap-3 sm:justify-end"
      >
        <span>
          Session ID:{" "}
          <strong className="font-semibold text-text-secondary">
            SES-88219-ADM
          </strong>
        </span>
        <span className="text-text-muted">•</span>
        <span>
          Operator:{" "}
          <strong className="font-semibold text-text-secondary">Admin</strong>
        </span>
      </div>
    </footer>
  );
}
