import { useState } from "react";
import { ArrowRight, Info, ShieldCheck } from "lucide-react";

import { Button } from "@/shared/components/ui";

import {
  initialContactInformation,
  saveContactInformationMock,
} from "../api/contact-information.mock";

import ContactInformationForm from "../components/contact-information/contact-information-form";
import ContactInformationPreview from "../components/contact-information/contact-information-preview";
import ContactInformationStats from "../components/contact-information/contact-information-stats";

import type {
  ContactInformation,
  ContactInformationField,
} from "../types/contact-information";

export default function ContactInformationPage() {
  const [settings, setSettings] = useState<ContactInformation>(
    initialContactInformation,
  );

  const [savedSettings, setSavedSettings] = useState<ContactInformation>(
    initialContactInformation,
  );

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: ContactInformationField, value: string) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));

    setIsSaved(false);
  };

  const handleSave = () => {
    const savedData = saveContactInformationMock(settings);

    setSettings(savedData);
    setSavedSettings(savedData);
    setIsSaved(true);
  };

  const handleReset = () => {
    setSettings({ ...savedSettings });
    setIsSaved(false);
  };

  return (
    <div dir="rtl" className="space-y-6 pb-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-users-text-muted">
              CMS SETTINGS
            </span>

            <span className="text-xs text-users-text-muted">•</span>

            <span className="text-xs text-users-text-muted">
              آخر تحديث: {isSaved ? "الآن" : "بيانات المعاينة"}
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

      {/* Sync Notice */}
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

      {/* Main Content */}
      <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {/* Settings Form */}
        <ContactInformationForm
          settings={settings}
          onChange={handleChange}
          onSave={handleSave}
          onReset={handleReset}
          isSaved={isSaved}
        />

        {/* Preview & Stats */}
        <aside className="min-w-0 space-y-5">
          <ContactInformationPreview settings={settings} />

          <ContactInformationStats />
        </aside>
      </div>

      {/* Security Notice */}
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
            وتاريخ التغيير، مع تحديث البيانات المنشورة وفق آلية الاعتماد
            المعتمدة.
          </p>
        </div>
      </div>
    </div>
  );
}
