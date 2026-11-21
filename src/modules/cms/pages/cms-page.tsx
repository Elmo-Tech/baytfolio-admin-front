import { Info } from "lucide-react";

import CMSOverviewGrid from "../components/overview/cms-overview-grid";
import { useCMSOverview } from "../hooks/use-cms-overview";

export default function CMSPage() {
  const overview = useCMSOverview();

  return (
    <div dir="rtl" className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs text-text-muted">
            النظام المركزي للبوابة الرقمية
          </p>
          <h1 className="mt-2 text-xl font-bold text-text-primary">
            إدارة المحتوى
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            تعديل المحتوى العام الظاهر في موقع وتطبيق BaytFolio.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-md border border-border-subtle bg-card px-3 py-2 text-xs text-text-secondary">
          <span className="size-2 rounded-full bg-status-active-fg" />
          المزامنة اللحظية: مفعلة
        </span>
      </header>

      <CMSOverviewGrid data={overview} />

      <section className="flex items-start gap-3 rounded-lg border border-border-subtle bg-card p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-text-secondary">
          <Info size={20} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-text-primary">
            ملاحظة تشغيلية وحوكمة النشر
          </h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            وحدة إدارة المحتوى CMS مخصصة فقط لتعديل النصوص والبيانات العامة
            الحالية الظاهرة للمستخدمين. ولا تعدل تصميم أو تغيير هيكل الصفحات في
            موقع وتطبيق BaytFolio، ولا تدير بيانات أو أخبار أو وسائط متعددة أو
            بناء صفحات.
          </p>
        </div>
      </section>
    </div>
  );
}
