import { Label } from "@/shared/components/ui/label";
import { CalendarDays, ShieldCheck } from "lucide-react";

import type { TermsLanguage } from "../../types/terms-and-conditions";

interface Props {
  lastUpdated: string;
  language: TermsLanguage;
}

export default function TermsAndConditionsLastUpdated({
  lastUpdated,
  language,
}: Props) {
  const isArabic = language === "ar";

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-users-panel-border bg-users-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <CalendarDays
          size={19}
          className="mt-0.5 shrink-0 text-users-text-muted"
        />

        <div>
          <h2 className="text-sm font-semibold text-users-text-primary">
            {isArabic ? "تاريخ آخر تحديث" : "Last Updated"}
          </h2>

          <p className="mt-1 text-xs leading-6 text-users-text-muted">
            {isArabic
              ? "يظهر هذا التاريخ في تذييل صفحة الشروط والأحكام العامة للعملاء لتأكيد أحدث نسخة سارية."
              : "This date appears on the public terms and conditions page to indicate the latest effective version."}
          </p>

          <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-status-active-bg px-2 py-1 text-[10px] text-status-active-fg">
            <ShieldCheck size={12} />
            {isArabic
              ? "البيانات معتمدة وتخضع للمراجعة القانونية والإدارية"
              : "Subject to legal and administrative review"}
          </div>
        </div>
      </div>

      <div className="space-y-2 sm:min-w-56">
        <Label
          unstyled
          htmlFor="terms-last-updated"
          className="block text-xs text-users-text-muted"
        >
          {isArabic ? "تاريخ النفاذ المعتمد" : "Effective Date"}
        </Label>

        <div className="flex items-center gap-2 rounded-md bg-users-table-header px-3 py-3">
          <CalendarDays size={15} className="text-users-text-muted" />
          <span
            id="terms-last-updated"
            dir="ltr"
            className="text-sm font-medium text-users-text-detail"
          >
            {lastUpdated}
          </span>
        </div>
      </div>
    </section>
  );
}
