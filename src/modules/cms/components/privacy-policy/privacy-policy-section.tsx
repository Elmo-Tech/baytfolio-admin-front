import { FileText } from "lucide-react";

import type { PrivacyPolicy } from "../../types/privacy-policy";
import { privacyPolicySectionFields } from "../../constants/privacy-policy.constants";

type Section = PrivacyPolicy["sections"][number];
type Fields =
  (typeof privacyPolicySectionFields)[keyof typeof privacyPolicySectionFields];
type Field = "titleAr" | "titleEn" | "contentAr" | "contentEn";

interface Props {
  section: Section;
  isArabic: boolean;
  fields: Fields;
  onChange: (id: number, field: Field, value: string) => void;
}

export default function PrivacyPolicySection({
  section,
  isArabic,
  fields,
  onChange,
}: Props) {
  return (
    <section className="space-y-4 rounded-xl border border-users-panel-border bg-users-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-users-text-muted">
          <FileText size={15} />
          <span>
            {isArabic
              ? `البند الأساسي ${String(section.id).padStart(2, "0")}`
              : `MAIN SECTION ${String(section.id).padStart(2, "0")}`}
          </span>
        </div>

        <span className="text-xs text-users-text-muted">{section.label}</span>
      </div>

      <div className="space-y-2">
        <label
          htmlFor={`privacy-title-${section.id}`}
          className="block text-xs font-medium text-users-text-primary"
        >
          {fields.titleLabel}
        </label>

        <input
          id={`privacy-title-${section.id}`}
          dir={isArabic ? "rtl" : "ltr"}
          value={section[fields.title]}
          onChange={(event) =>
            onChange(section.id, fields.title, event.target.value)
          }
          className="h-10 w-full rounded-md border border-transparent bg-users-table-header px-3 text-sm font-semibold text-users-text-primary outline-none transition focus:border-users-panel-divider focus:ring-2 focus:ring-users-panel-divider/30"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor={`privacy-content-${section.id}`}
          className="block text-xs font-medium text-users-text-primary"
        >
          {fields.contentLabel}
        </label>

        <textarea
          id={`privacy-content-${section.id}`}
          dir={isArabic ? "rtl" : "ltr"}
          value={section[fields.content]}
          onChange={(event) =>
            onChange(section.id, fields.content, event.target.value)
          }
          rows={section.id === 1 ? 4 : 5}
          className="min-h-28 w-full resize-y rounded-md border border-transparent bg-users-table-header px-3 py-3 text-sm leading-7 text-users-text-secondary outline-none transition focus:border-users-panel-divider focus:ring-2 focus:ring-users-panel-divider/30"
        />
      </div>
    </section>
  );
}
