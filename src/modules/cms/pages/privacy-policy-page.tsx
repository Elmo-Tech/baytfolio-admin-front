import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Languages,
  RotateCcw,
  Save,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/shared/components/ui";

import {
  initialPrivacyPolicy,
  savePrivacyPolicyMock,
} from "../api/privacy-policy.mock";

import type {
  PrivacyPolicy,
  PrivacyPolicyLanguage,
} from "../types/privacy-policy";

const sectionFields = {
  ar: {
    title: "titleAr",
    content: "contentAr",
    titleLabel: "عنوان القسم",
    contentLabel: "النص القانوني والتنفيذي",
  },
  en: {
    title: "titleEn",
    content: "contentEn",
    titleLabel: "Section Title",
    contentLabel: "Legal and Executive Text",
  },
} as const;

export default function PrivacyPolicyPage() {
  const [policy, setPolicy] = useState<PrivacyPolicy>(() => ({
    ...initialPrivacyPolicy,
    sections: initialPrivacyPolicy.sections.map((section) => ({
      ...section,
    })),
  }));

  const [savedPolicy, setSavedPolicy] = useState<PrivacyPolicy>(() => ({
    ...initialPrivacyPolicy,
    sections: initialPrivacyPolicy.sections.map((section) => ({
      ...section,
    })),
  }));

  const [language, setLanguage] = useState<PrivacyPolicyLanguage>("ar");

  const [isSaved, setIsSaved] = useState(false);

  const isArabic = language === "ar";
  const fields = sectionFields[language];

  const handleSectionChange = (
    sectionId: number,
    field: "titleAr" | "titleEn" | "contentAr" | "contentEn",
    value: string,
  ) => {
    setPolicy((previous) => ({
      ...previous,
      sections: previous.sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section,
      ),
    }));

    setIsSaved(false);
  };

  const handleSave = () => {
    const savedData = savePrivacyPolicyMock(policy);

    setPolicy(savedData);
    setSavedPolicy(savedData);
    setIsSaved(true);
  };

  const handleReset = () => {
    setPolicy({
      ...savedPolicy,
      sections: savedPolicy.sections.map((section) => ({
        ...section,
      })),
    });

    setIsSaved(false);
  };

  return (
    <div dir="rtl" className="space-y-5 pb-24">
      {/* Document Header */}
      <section className="rounded-xl border border-users-panel-border bg-users-surface p-4 sm:p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/cms"
            className="inline-flex items-center gap-2 text-sm text-users-text-secondary transition hover:text-users-text-primary"
          >
            <ArrowRight size={17} />
            العودة إلى إدارة المحتوى
          </Link>

          <div className="flex items-center gap-2 text-xs text-users-text-muted">
            <span>معرف الوثيقة:</span>
            <span dir="ltr" className="font-medium text-users-text-detail">
              {policy.documentId}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-users-brand-navy text-primary-foreground">
              <ShieldCheck size={23} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-users-text-primary">
                  سياسة الخصوصية
                </h1>

                <span className="inline-flex items-center gap-1 rounded-md bg-status-active-bg px-2 py-1 text-xs font-medium text-status-active-fg">
                  <span className="size-1.5 rounded-full bg-status-active-fg" />
                  حالة الوثيقة: منشورة ونشطة
                </span>
              </div>

              <p className="mt-2 text-sm text-users-text-muted">
                تعديل محتوى سياسة الخصوصية الظاهر في موقع وتطبيق BaytFolio.
              </p>
            </div>
          </div>

          <div
            dir="ltr"
            className="inline-flex w-fit items-center gap-1 rounded-md border border-users-panel-divider bg-users-table-header p-1"
          >
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded px-4 py-2 text-xs font-medium transition ${
                language === "en"
                  ? "bg-users-brand-navy text-primary-foreground"
                  : "text-users-text-secondary hover:bg-users-surface"
              }`}
            >
              English
            </button>

            <button
              type="button"
              onClick={() => setLanguage("ar")}
              className={`rounded px-4 py-2 text-xs font-medium transition ${
                language === "ar"
                  ? "bg-users-brand-navy text-primary-foreground"
                  : "text-users-text-secondary hover:bg-users-surface"
              }`}
            >
              العربية
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-md bg-users-table-header px-3 py-2 text-xs leading-6 text-users-text-muted">
          {isArabic
            ? "يتم عرض محتوى سياسة الخصوصية للمستخدمين وفق لغة الواجهة المختارة في الموقع أو التطبيق."
            : "The privacy policy is displayed to users according to the selected interface language on the website or application."}
        </div>
      </section>

      {/* Policy Sections */}
      {policy.sections.map((section) => (
        <section
          key={section.id}
          className="space-y-4 rounded-xl border border-users-panel-border bg-users-surface p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-users-text-muted">
              <FileText size={15} />
              <span>
                {isArabic
                  ? `البند الأساسي ${String(section.id).padStart(2, "0")}`
                  : `MAIN SECTION ${String(section.id).padStart(2, "0")}`}
              </span>
            </div>

            <span className="text-xs text-users-text-muted">
              {section.label}
            </span>
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`privacy-title-${section.id}`}
              className="block text-xs font-medium text-users-text-primary"
            >
              {fields.titleLabel}
            </label>

            <input
              id={`privacy-title-${section.id}`}
              dir={isArabic ? "rtl" : "ltr"}
              value={section[fields.title]}
              onChange={(event) =>
                handleSectionChange(
                  section.id,
                  fields.title,
                  event.target.value,
                )
              }
              className="h-10 w-full rounded-md border border-transparent bg-users-table-header px-3 text-sm font-semibold text-users-text-primary outline-none transition focus:border-users-panel-divider focus:ring-2 focus:ring-users-panel-divider/30"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`privacy-content-${section.id}`}
              className="block text-xs font-medium text-users-text-primary"
            >
              {fields.contentLabel}
            </label>

            <textarea
              id={`privacy-content-${section.id}`}
              dir={isArabic ? "rtl" : "ltr"}
              value={section[fields.content]}
              onChange={(event) =>
                handleSectionChange(
                  section.id,
                  fields.content,
                  event.target.value,
                )
              }
              rows={section.id === 1 ? 4 : 5}
              className="min-h-28 w-full resize-y rounded-md border border-transparent bg-users-table-header px-3 py-3 text-sm leading-7 text-users-text-secondary outline-none transition focus:border-users-panel-divider focus:ring-2 focus:ring-users-panel-divider/30"
            />
          </div>
        </section>
      ))}

      {/* Last Updated */}
      <section className="flex flex-col gap-3 rounded-xl border border-users-panel-border bg-users-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays size={19} className="shrink-0 text-users-text-muted" />

          <div>
            <h2 className="text-sm font-semibold text-users-text-primary">
              تاريخ آخر تحديث
            </h2>
            <p className="mt-1 text-xs text-users-text-muted">
              يظهر هذا التاريخ في صفحة سياسة الخصوصية العامة للعملاء.
            </p>
          </div>
        </div>

        <span
          dir="ltr"
          className="rounded-md bg-users-table-header px-4 py-3 text-sm text-users-text-detail"
        >
          {policy.lastUpdated}
        </span>
      </section>

      {/* Bottom Actions */}
      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-users-panel-divider bg-users-surface/95 px-4 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={handleSave}
              className="h-10 gap-2 bg-users-brand-navy px-5 text-primary-foreground hover:opacity-90"
            >
              <Save size={16} />
              {isArabic ? "حفظ التغييرات" : "Save Changes"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              className="h-10 gap-2 text-users-text-secondary"
            >
              <RotateCcw size={15} />
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
          </div>

          <div className="hidden items-center gap-2 text-xs text-users-text-muted sm:flex">
            <Languages size={15} />
            {isSaved
              ? isArabic
                ? "تم حفظ التغييرات محليًا"
                : "Changes saved locally"
              : isArabic
                ? "آخر تعديل للوثيقة"
                : "Document editing"}
          </div>
        </div>
      </footer>
    </div>
  );
}
