import { ContentLanguageButton } from "@/shared/components/content-language-button";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router";

import type { TermsLanguage } from "../../types/terms-and-conditions";

interface Props {
  documentId: string;
  language: TermsLanguage;
  setLanguage: (language: TermsLanguage) => void;
}

export default function TermsAndConditionsHeader({
  documentId,
  language,
  setLanguage,
}: Props) {
  const isArabic = language === "ar";

  return (
    <section className="rounded-xl border border-users-panel-border bg-users-surface p-4 sm:p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/admin/cms"
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
            {documentId}
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
          <ContentLanguageButton
            active={language === "en"}
            onClick={() => setLanguage("en")}
          >
            English
          </ContentLanguageButton>

          <ContentLanguageButton
            active={language === "ar"}
            onClick={() => setLanguage("ar")}
          >
            العربية
          </ContentLanguageButton>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-users-table-header px-3 py-2 text-xs leading-6 text-users-text-muted">
        {isArabic
          ? "يتم عرض الشروط والأحكام للمستخدمين وفق لغة الواجهة المختارة في الموقع أو التطبيق."
          : "Terms and conditions are displayed according to the selected interface language."}
      </div>
    </section>
  );
}
