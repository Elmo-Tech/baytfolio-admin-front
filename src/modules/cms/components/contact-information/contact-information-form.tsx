import {
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Save,
  RotateCcw,
} from "lucide-react";

import { Button, Input, Label } from "@/shared/components/ui";

import type {
  ContactInformation,
  ContactInformationField,
} from "../../types/contact-information";
interface ContactSettingsFormProps {
  settings: ContactInformation;
  onChange: (field: ContactInformationField, value: string) => void;
  onSave: () => void;
  onReset: () => void;
  isSaved: boolean;
}

export default function ContactSettingsForm({
  settings,
  onChange,
  onSave,
  onReset,
  isSaved,
}: ContactSettingsFormProps) {
  return (
    <section
      dir="rtl"
      className="min-w-0 rounded-xl border border-users-panel-border bg-users-surface p-5 sm:p-6"
    >
      {/* Card Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-users-panel-divider pb-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-users-panel-border text-users-text-primary">
            <Phone size={20} />
          </div>

          <div>
            <h2 className="text-base font-bold text-users-text-primary">
              قنوات الاتصال المباشرة
            </h2>

            <p className="mt-1 text-xs text-users-text-muted">
              تعديل الأرقام والبيانات المعروضة لزوار المنصة
            </p>
          </div>
        </div>

        <span className="rounded-md bg-users-table-header px-3 py-1.5 text-xs text-users-text-muted">
          4 حقول أساسية
        </span>
      </div>

      <div className="space-y-6">
        {/* Phone */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label
              htmlFor="contact-phone"
              className="flex items-center gap-2 text-sm font-semibold text-users-text-primary"
            >
              <Phone size={16} className="text-users-text-secondary" />
              رقم الهاتف المباشر
            </Label>

            <span className="text-xs text-users-text-muted">
              إلزامي · ترويسة وتذييل
            </span>
          </div>

          <div className="relative">
            <Input
              id="contact-phone"
              type="tel"
              dir="ltr"
              value={settings.phone}
              onChange={(event) => onChange("phone", event.target.value)}
              placeholder="+20 2 0000 0000"
              className="h-12 border-users-panel-divider bg-users-surface-input pl-11 text-left text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0"
              required
            />

            <Phone
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-users-text-muted"
            />
          </div>

          <p className="text-xs leading-6 text-users-text-muted">
            يظهر في ترويسة وتذييل الموقع وصفحة اتصل بنا بشكل رئيسي.
          </p>
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label
              htmlFor="contact-whatsapp"
              className="flex items-center gap-2 text-sm font-semibold text-users-text-primary"
            >
              <MessageSquare size={16} className="text-users-text-secondary" />
              رقم WhatsApp المخصص
            </Label>

            <span className="text-xs text-users-text-muted">
              إلزامي · الدعم الفوري
            </span>
          </div>

          <div className="relative">
            <Input
              id="contact-whatsapp"
              type="tel"
              dir="ltr"
              value={settings.whatsapp}
              onChange={(event) => onChange("whatsapp", event.target.value)}
              placeholder="+20 10 0000 0000"
              className="h-12 border-users-panel-divider bg-users-surface-input pl-11 text-left text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0"
              required
            />

            <MessageSquare
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-users-text-muted"
            />
          </div>

          <p className="text-xs leading-6 text-users-text-muted">
            يستخدم في أيقونة واتساب السريعة في الواجهة العامة والتطبيق.
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label
              htmlFor="contact-email"
              className="flex items-center gap-2 text-sm font-semibold text-users-text-primary"
            >
              <Mail size={16} className="text-users-text-secondary" />
              البريد الإلكتروني للدعم
            </Label>

            <span className="text-xs text-users-text-muted">
              إلزامي · المراسلات الرسمية
            </span>
          </div>

          <div className="relative">
            <Input
              id="contact-email"
              type="email"
              dir="ltr"
              value={settings.email}
              onChange={(event) => onChange("email", event.target.value)}
              placeholder="support@example.com"
              className="h-12 border-users-panel-divider bg-users-surface-input pl-11 text-left text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0"
              required
            />

            <Mail
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-users-text-muted"
            />
          </div>

          <p className="text-xs leading-6 text-users-text-muted">
            يستقبل استفسارات العملاء العامة ورسائل المراجعة والتوثيق المالي.
          </p>
        </div>

        {/* Service Hours */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label
              htmlFor="contact-hours"
              className="flex items-center gap-2 text-sm font-semibold text-users-text-primary"
            >
              <Clock size={16} className="text-users-text-secondary" />
              مواعيد تقديم الدعم والخدمة
            </Label>

            <span className="text-xs text-users-text-muted">
              إلزامي · الجدولة المؤسسية
            </span>
          </div>

          <div className="relative">
            <Input
              id="contact-hours"
              value={settings.serviceHours}
              onChange={(event) => onChange("serviceHours", event.target.value)}
              placeholder="أدخل مواعيد العمل الرسمية"
              className="h-12 border-users-panel-divider bg-users-surface-input pl-11 text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0"
              required
            />

            <Clock
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-users-text-muted"
            />
          </div>

          <p className="text-xs leading-6 text-users-text-muted">
            يظهر للعملاء في قسم تواصل معنا في الموقع والتطبيق لبيان وقت
            الاستجابة المعتمد.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-7 flex flex-col gap-4 border-t border-users-panel-divider pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-users-text-muted">
          <span className="text-destructive">*</span> جميع الحقول إلزامية.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            className="h-10 gap-2 border-users-panel-divider text-users-text-secondary"
          >
            <RotateCcw size={16} />
            إلغاء التغييرات
          </Button>

          <Button
            type="button"
            onClick={onSave}
            disabled={
              !settings.phone.trim() ||
              !settings.whatsapp.trim() ||
              !settings.email.trim() ||
              !settings.serviceHours.trim()
            }
            className="h-10 gap-2 bg-brand-navy px-5 text-white hover:bg-brand-navy/90"
          >
            <Save size={17} />
            {isSaved ? "تم الحفظ" : "حفظ التغييرات"}
          </Button>
        </div>
      </div>
    </section>
  );
}
