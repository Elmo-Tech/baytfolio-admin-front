import {
  CalendarDays,
  Clock,
  Copy,
  Headset,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";

import type { ContactInformation } from "../../types/contact-information";

interface ContactInformationPreviewProps {
  settings: ContactInformation;
}

export default function ContactInformationPreview({
  settings,
}: ContactInformationPreviewProps) {
  const whatsappNumber = settings.whatsapp.replace(/\D/g, "");

  return (
    <section
      dir="rtl"
      className="min-w-0 rounded-xl border border-users-panel-border bg-users-surface p-5 sm:p-6"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-users-panel-divider pb-4">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-status-active-fg" />

          <h2 className="font-bold text-users-text-primary">
            المعاينة الحية للعميل
          </h2>
        </div>

        <span className="text-xs text-users-text-muted">Public Preview</span>
      </div>

      <p className="mb-4 text-sm leading-7 text-users-text-secondary">
        هكذا تظهر البيانات مباشرة لزوار المنصة ومستخدمي تطبيق BaytFolio العقاري.
      </p>

      {/* Browser Preview */}
      <div className="overflow-hidden rounded-lg border border-users-panel-border bg-users-table-header">
        {/* Browser Toolbar */}
        <div className="flex h-10 items-center justify-between gap-2 border-b border-users-panel-divider px-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-users-panel-divider" />
            <span className="size-2 rounded-full bg-users-panel-divider" />
            <span className="size-2 rounded-full bg-users-panel-divider" />
          </div>

          <span className="truncate text-xs text-users-text-muted">
            baytfolio.com/contact
          </span>

          <span className="rounded bg-users-surface px-2 py-1 text-[10px] text-users-text-secondary">
            نسخة العميل
          </span>
        </div>

        {/* Preview Content */}
        <div className="space-y-3 p-3 sm:p-4">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-lg bg-brand-navy p-4 text-white sm:p-5">
            <div className="absolute -right-8 -top-10 size-36 rounded-full bg-white/5" />

            <div className="relative flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Headset size={23} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-white/60">مركز مساعدة المستثمرين</p>

                <h3 className="mt-1 text-sm font-semibold sm:text-base">
                  نحن هنا للإجابة على استفساراتكم
                </h3>
              </div>
            </div>
          </div>

          {/* Phone */}
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="flex min-w-0 items-center gap-3 rounded-md bg-users-surface p-3 transition-colors hover:bg-users-surface-row-hover"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-users-table-header text-users-text-secondary">
              <Phone size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-users-text-muted">
                الخط المباشر الموحد
              </p>

              <p
                dir="ltr"
                className="mt-1 truncate text-sm font-semibold text-users-text-primary"
              >
                {settings.phone || "لم يتم إدخال رقم الهاتف"}
              </p>
            </div>

            <Phone size={16} className="shrink-0 text-users-text-muted" />
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="flex min-w-0 items-center gap-3 rounded-md bg-users-surface p-3 transition-colors hover:bg-users-surface-row-hover"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-users-table-header text-users-text-secondary">
              <MessageSquare size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-users-text-muted">
                محادثة واتساب فورية
              </p>

              <p
                dir="ltr"
                className="mt-1 truncate text-sm font-semibold text-users-text-primary"
              >
                {settings.whatsapp || "لم يتم إدخال رقم WhatsApp"}
              </p>
            </div>

            <span className="shrink-0 rounded-sm bg-status-active-bg px-2 py-1 text-[10px] font-medium text-status-active-fg">
              متصل
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${settings.email}`}
            className="flex min-w-0 items-center gap-3 rounded-md bg-users-surface p-3 transition-colors hover:bg-users-surface-row-hover"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-users-table-header text-users-text-secondary">
              <Mail size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-users-text-muted">
                البريد الإلكتروني للخدمة
              </p>

              <p
                dir="ltr"
                className="mt-1 truncate text-sm font-semibold text-users-text-primary"
              >
                {settings.email || "لم يتم إدخال البريد الإلكتروني"}
              </p>
            </div>

            <Mail size={16} className="shrink-0 text-users-text-muted" />
          </a>

          {/* Working Hours */}
          <div className="flex min-w-0 items-start gap-3 rounded-md bg-users-surface p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-users-table-header text-users-text-secondary">
              <Clock size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-users-text-muted">
                أوقات العمل الرسمية
              </p>

              <p className="mt-1 text-sm leading-6 text-users-text-primary">
                {settings.serviceHours || "لم يتم تحديد مواعيد العمل"}
              </p>
            </div>

            <CalendarDays
              size={16}
              className="mt-1 shrink-0 text-users-text-muted"
            />
          </div>

          {/* Preview Footer */}
          <div className="border-t border-users-panel-divider pt-4 text-center">
            <p className="text-xs text-users-text-muted">
              BaytFolio Asset Management © 2026
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-users-table-header p-3">
        <Copy size={15} className="mt-1 shrink-0 text-users-text-muted" />

        <p className="text-xs leading-6 text-users-text-muted">
          هذه معاينة توضيحية لكيفية ظهور بيانات التواصل للعملاء بعد اعتماد
          التغييرات ونشرها.
        </p>
      </div>
    </section>
  );
}
