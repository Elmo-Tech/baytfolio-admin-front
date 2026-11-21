import { CalendarDays, Clock } from "lucide-react";

import { CONTACT_INFORMATION_PREVIEW as CONTENT } from "../../constants/contact-information-preview.constants";

interface ContactInformationPreviewHoursProps {
  serviceHours: string;
}

export default function ContactInformationPreviewHours({
  serviceHours,
}: ContactInformationPreviewHoursProps) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-md bg-users-surface p-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-users-table-header text-users-text-secondary">
        <Clock size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-users-text-muted">
          {CONTENT.serviceHours.label}
        </p>

        <p className="mt-1 text-sm leading-6 text-users-text-primary">
          {serviceHours || CONTENT.serviceHours.empty}
        </p>
      </div>

      <CalendarDays size={16} className="mt-1 shrink-0 text-users-text-muted" />
    </div>
  );
}
