import { CONTACT_INFORMATION_PREVIEW as CONTENT } from "../../constants/contact-information-preview.constants";

export default function ContactInformationPreviewHeader() {
  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-users-panel-divider pb-4">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-status-active-fg" />
          <h2 className="font-bold text-users-text-primary">
            {CONTENT.pageTitle}
          </h2>
        </div>

        <span className="text-xs text-users-text-muted">
          {CONTENT.publicPreviewLabel}
        </span>
      </div>

      <p className="mb-4 text-sm leading-7 text-users-text-secondary">
        {CONTENT.description}
      </p>
    </>
  );
}
