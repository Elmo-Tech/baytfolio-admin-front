import { Mail, MessageSquare, Phone } from "lucide-react";

import type { ContactInformation } from "../../types/contact-information";

import { CONTACT_INFORMATION_PREVIEW as CONTENT } from "../../constants/contact-information-preview.constants";

import {
  getEmailHref,
  getPhoneHref,
  getWhatsAppHref,
} from "./utils/contact-information.utils";

import ContactInformationPreviewHeader from "./contact-information-preview-header";
import ContactInformationPreviewHero from "./contact-information-preview-hero";
import ContactInformationPreviewItem from "./contact-information-preview-item";
import ContactInformationPreviewHours from "./contact-information-preview-hours";
import ContactInformationPreviewFooter from "./contact-information-preview-footer";

interface ContactInformationPreviewProps {
  settings: ContactInformation;
}

export default function ContactInformationPreview({
  settings,
}: ContactInformationPreviewProps) {
  return (
    <section
      dir="rtl"
      className="min-w-0 rounded-xl border border-users-panel-border bg-users-surface p-5 sm:p-6"
    >
      <ContactInformationPreviewHeader />

      <div className="overflow-hidden rounded-lg border border-users-panel-border bg-users-table-header">
        <div className="flex h-10 items-center justify-between gap-2 border-b border-users-panel-divider px-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-users-panel-divider" />
            <span className="size-2 rounded-full bg-users-panel-divider" />
            <span className="size-2 rounded-full bg-users-panel-divider" />
          </div>

          <span className="truncate text-xs text-users-text-muted">
            {CONTENT.pageUrl}
          </span>

          <span className="rounded bg-users-surface px-2 py-1 text-[10px] text-users-text-secondary">
            نسخة العميل
          </span>
        </div>

        <div className="space-y-3 p-3 sm:p-4">
          <ContactInformationPreviewHero />

          <ContactInformationPreviewItem
            icon={<Phone size={18} />}
            label={CONTENT.phone.label}
            value={settings.phone || CONTENT.phone.empty}
            href={getPhoneHref(settings.phone)}
            trailing={<Phone size={16} className="text-users-text-muted" />}
          />

          <ContactInformationPreviewItem
            icon={<MessageSquare size={18} />}
            label={CONTENT.whatsapp.label}
            value={settings.whatsapp || CONTENT.whatsapp.empty}
            href={getWhatsAppHref(settings.whatsapp)}
            external
            trailing={
              <span className="shrink-0 rounded-sm bg-status-active-bg px-2 py-1 text-[10px] font-medium text-status-active-fg">
                {CONTENT.whatsapp.status}
              </span>
            }
          />

          <ContactInformationPreviewItem
            icon={<Mail size={18} />}
            label={CONTENT.email.label}
            value={settings.email || CONTENT.email.empty}
            href={getEmailHref(settings.email)}
            trailing={<Mail size={16} className="text-users-text-muted" />}
          />

          <ContactInformationPreviewHours
            serviceHours={settings.serviceHours}
          />

          <ContactInformationPreviewFooter />
        </div>
      </div>
    </section>
  );
}
