import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/components/ui";

import ContactInformationForm from "../components/contact-information/contact-information-form";
import {
  ContactSecurityNotice,
  ContactSyncNotice,
} from "../components/contact-information/contact-information-notices";
import ContactInformationPreview from "../components/contact-information/contact-information-preview";
import ContactInformationStats from "../components/contact-information/contact-information-stats";
import { useContactInformation } from "../hooks/use-contact-information";

export const ContactInformationPage = () => {
  const contact = useContactInformation();

  return (
    <div dir="rtl" className="space-y-6 pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-users-text-muted">
              CMS SETTINGS
            </span>
            <span className="text-xs text-users-text-muted">•</span>
            <span className="text-xs text-users-text-muted">
              آخر تحديث: {contact.isSaved ? "الآن" : "بيانات المعاينة"}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-users-text-primary">
            بيانات التواصل الرسمية
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-users-text-muted">
            إدارة وتحديث وسائل الاتصال الرسمية الظاهرة للعملاء في موقع وتطبيق
            BaytFolio. تتضمن هذه المنظومة تحديث شريط الترويسة والتذييل بشكل فوري
            في المعاينة.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          className="h-10 shrink-0 gap-2 border-users-panel-divider"
        >
          <ArrowRight size={16} />
          العودة لإدارة المحتوى
        </Button>
      </div>

      <ContactSyncNotice />

      <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <ContactInformationForm
          settings={contact.settings}
          onChange={contact.handleChange}
          onSave={contact.handleSave}
          onReset={contact.handleReset}
          isSaved={contact.isSaved}
          isValid={contact.isValid}
        />

        <aside className="min-w-0 space-y-5">
          <ContactInformationPreview settings={contact.settings} />
          <ContactInformationStats />
        </aside>
      </div>

      <ContactSecurityNotice />
    </div>
  );
};
