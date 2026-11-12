import {
  ArrowLeft,
  FilePenLine,
  FileText,
  Gavel,
  Headset,
  Info,
  Shield,
} from "lucide-react";
import { Link } from "react-router";

import { cmsOverviewMock } from "../api/cms.mock";
import CMSOverviewCard from "../components/overview/cms-overview-card";

function LegalContentDetails({
  content,
}: {
  content: (typeof cmsOverviewMock)["privacyPolicy"];
}) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-text-muted">آخر اعتماد وتحديث</span>
        <span className="font-medium text-text-primary">
          {content.lastUpdated}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-text-muted">اللغات المنشورة</span>

        <div className="flex gap-2">
          {content.languages.map((language) => (
            <span
              key={language}
              className="rounded-sm bg-card px-2 py-1 text-xs text-text-secondary"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-text-muted">الامتثال القانوني</span>
        <span className="text-xs text-text-primary">{content.scope}</span>
      </div>
    </div>
  );
}

export default function CMSPage() {
  const { helpCenter, contactInfo, privacyPolicy, termsConditions } =
    cmsOverviewMock;

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

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <CMSOverviewCard
          title="مركز المساعدة"
          description="إدارة الأسئلة الشائعة ومحتوى مركز المساعدة."
          icon={FileText}
          badge={`${helpCenter.publishedQuestions} سؤالًا منشورًا`}
          action={
            <Link
              to="/cms/help-center"
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
            >
              إدارة المحتوى
              <ArrowLeft size={16} />
            </Link>
          }
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-text-muted">التصنيفات المعتمدة</span>

            <span className="font-semibold text-text-primary">
              {helpCenter.categories.length} Categories
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {helpCenter.categories.map((category) => (
              <span
                key={category}
                className="rounded-sm bg-card px-2 py-1 text-xs text-text-secondary"
              >
                {category}
              </span>
            ))}
          </div>
        </CMSOverviewCard>

        <CMSOverviewCard
          title="تواصل معنا"
          description="إدارة بيانات التواصل الظاهرة للعملاء."
          icon={Headset}
          badge="قنوات الاتصال المباشرة"
          action={
            <Link
              to="/cms/contact-information"
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
            >
              <FilePenLine size={16} />
              تعديل البيانات
            </Link>
          }
        >
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted">الهاتف المعتمد</span>
              <span dir="ltr" className="font-medium text-text-primary">
                {contactInfo.phone}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted">WhatsApp</span>
              <span dir="ltr" className="font-medium text-success">
                {contactInfo.whatsapp}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted">البريد الإلكتروني</span>
              <span className="font-medium text-text-primary">
                {contactInfo.email}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted">أوقات العمل</span>
              <span className="text-xs text-text-primary">
                {contactInfo.workingHours}
              </span>
            </div>
          </div>
        </CMSOverviewCard>

        <CMSOverviewCard
          title="سياسة الخصوصية"
          description="تعديل محتوى سياسة الخصوصية وتاريخ آخر تحديث."
          icon={Shield}
          badge="الحالة: منشور"
          action={
            <Link
              to="/cms/privacy-policy"
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
            >
              <FilePenLine size={16} />
              تعديل المحتوى
            </Link>
          }
        >
          <LegalContentDetails content={privacyPolicy} />
        </CMSOverviewCard>

        <CMSOverviewCard
          title="الشروط والأحكام"
          description="تعديل محتوى الشروط والأحكام وتاريخ آخر تحديث."
          icon={Gavel}
          badge="الحالة: منشور"
          action={
            <button
              type="button"
              disabled
              className="inline-flex min-h-10 cursor-not-allowed items-center gap-2 rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-primary-foreground opacity-60"
            >
              <FilePenLine size={16} />
              تعديل المحتوى
            </button>
          }
        >
          <LegalContentDetails content={termsConditions} />
        </CMSOverviewCard>
      </div>

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
