import { Copy } from "lucide-react";

import { CONTACT_INFORMATION_PREVIEW as CONTENT } from "../../constants/contact-information-preview.constants";

export default function ContactInformationPreviewFooter() {
  return (
    <>
      <div className="border-t border-users-panel-divider pt-4 text-center">
        <p className="text-xs text-users-text-muted">{CONTENT.footer}</p>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-users-table-header p-3">
        <Copy size={15} className="mt-1 shrink-0 text-users-text-muted" />

        <p className="text-xs leading-6 text-users-text-muted">
          {CONTENT.notice}
        </p>
      </div>
    </>
  );
}
