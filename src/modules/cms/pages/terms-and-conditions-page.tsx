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
  initialTermsAndConditions,
  saveTermsAndConditionsMock,
} from "../api/terms-and-conditions.mock";

import type {
  TermsAndConditions,
  TermsLanguage,
  TermsSection,
} from "../types/terms-and-conditions";

const sectionFields = {
  ar: {
    title: "titleAr",
    content: "contentAr",
    titleLabel: "عنوان البند",
    contentLabel: "النص المعتمد للنسخة التشغيلية",
    description: "وصف البند",
    note: "ملاحظة البند",
  },
  en: {
    title: "titleEn",
    content: "contentEn",
    titleLabel: "Section Title",
    contentLabel: "Approved Operational Text",
    description: "Section Description",
    note: "Section Note",
  },
} as const;

type EditableField = "titleAr" | "titleEn" | "contentAr" | "contentEn";

const cloneTerms = (terms: TermsAndConditions): TermsAndConditions => ({
  ...terms,
  sections: terms.sections.map((section) => ({ ...section })),
});

export default function TermsAndConditionsPage() {
  const [terms, setTerms] = useState<TermsAndConditions>(() =>
    cloneTerms(initialTermsAndConditions),
  );

  const [savedTerms, setSavedTerms] = useState<TermsAndConditions>(() =>
    cloneTerms(initialTermsAndConditions),
  );

  const [language, setLanguage] = useState<TermsLanguage>("ar");
  const [isSaved, setIsSaved] = useState(false);

  const isArabic = language === "ar";
  const fields = sectionFields[language];

  const handleSectionChange = (
    sectionId: number,
    field: EditableField,
    value: string,
  ) => {
    setTerms((previous) => ({
      ...previous,
      sections: previous.sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section,
      ),
    }));

    setIsSaved(false);
  };

  const getSectionTitle = (section: TermsSection) =>
    isArabic ? section.titleAr : section.titleEn;

  const getSectionDescription = (section: TermsSection) =>
    isArabic ? section.descriptionAr : section.descriptionEn;

  const getSectionNote = (section: TermsSection) =>
    isArabic ? section.noteAr : section.noteEn;

  const handleSave = () => {
    const savedData = saveTermsAndConditionsMock(terms);

    setTerms(savedData);
    setSavedTerms(cloneTerms(savedData));
    setIsSaved(true);
  };

  const handleReset = () => {
    setTerms(cloneTerms(savedTerms));
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
            {isArabic ? "العودة إلى إدارة المحتوى" : "Back to CMS"}
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-xs text-users-text-muted">
            <span>{isArabic ? "معرف الوثيقة المعتمد" : "Document ID"}</span>
            <span
              dir="ltr"
              className="rounded-md bg-users-table-header px-2 py-1 font-medium text-users-text-detail"
            >
              {terms.documentId}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-users-brand-navy text-primary-foreground">
              <FileText size={23} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-users-text-primary">
                  {isArabic ? "الشروط والأحكام" : "Terms & Conditions"}
                </h1>

                <span className="inline-flex items-center gap-1 rounded-md bg-status-active-bg px-2 py-1 text-xs font-medium text-status-active-fg">
                  <span className="size-1.5 rounded-full bg-status-active-fg" />
                  {isArabic ? "منشورة ونشطة" : "Published and Active"}
                </span>
              </div>

              <p className="mt-2 text-sm text-users-text-muted">
                {isArabic
                  ? "تعديل محتوى الشروط والأحكام الظاهر في موقع وتطبيق BaytFolio."
                  : "Manage the terms and conditions displayed on BaytFolio website and application."}
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
            ? "يتم عرض الشروط والأحكام للمستخدمين وفق لغة الواجهة المختارة في الموقع أو التطبيق."
            : "Terms and conditions are displayed according to the selected interface language."}
        </div>
      </section>

      {/* Terms Sections */}
      {terms.sections.map((section) => {
        const content =
          language === "ar" ? section.contentAr : section.contentEn;

        return (
          <section
            key={section.id}
            className={`space-y-4 rounded-xl border border-users-panel-border bg-users-surface p-4 sm:p-5 ${
              section.id === 4 ? "border-r-4 border-r-badge-warning-fg" : ""
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-users-table-header text-sm font-bold text-users-text-primary">
                  {section.id}
                </span>

                <h2 className="text-sm font-bold text-users-text-primary">
                  {section.id}. {getSectionTitle(section)}
                </h2>

                {section.id === 4 && (
                  <span className="rounded-md bg-status-active-bg px-2 py-1 text-[10px] font-medium text-status-active-fg">
                    {isArabic ? "بند محوري" : "Key Section"}
                  </span>
                )}
              </div>

              <span className="rounded-sm bg-users-table-header px-2 py-1 text-[10px] text-users-text-muted">
                {isArabic
                  ? `البند الأساسي ${String(section.id).padStart(2, "0")} – ${section.label}`
                  : `MAIN SECTION ${String(section.id).padStart(2, "0")}`}
              </span>
            </div>

            <p className="text-xs leading-6 text-users-text-muted">
              {getSectionDescription(section)}
            </p>

            <div className="space-y-2">
              <label
                htmlFor={`terms-content-${section.id}`}
                className="block text-xs font-medium text-users-text-primary"
              >
                {fields.contentLabel}
              </label>

              <textarea
                id={`terms-content-${section.id}`}
                dir={isArabic ? "rtl" : "ltr"}
                value={content}
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

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-users-text-muted">
              <span dir="ltr">{content.length} chars</span>
              <span>{getSectionNote(section)}</span>
            </div>
          </section>
        );
      })}

      {/* Last Updated */}
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
          <label
            htmlFor="terms-last-updated"
            className="block text-xs text-users-text-muted"
          >
            {isArabic ? "تاريخ النفاذ المعتمد" : "Effective Date"}
          </label>

          <div className="flex items-center gap-2 rounded-md bg-users-table-header px-3 py-3">
            <CalendarDays size={15} className="text-users-text-muted" />
            <span
              id="terms-last-updated"
              dir="ltr"
              className="text-sm font-medium text-users-text-detail"
            >
              {terms.lastUpdated}
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Actions */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-users-panel-divider bg-users-surface/95 px-4 py-3 backdrop-blur sm:px-8 xl:right-[280px]">
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
