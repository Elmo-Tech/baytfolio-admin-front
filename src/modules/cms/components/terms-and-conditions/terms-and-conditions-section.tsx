import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import type {
  TermsSection,
  TermsLanguage,
} from "../../types/terms-and-conditions";

import { termsSectionFields } from "../../constants/terms-and-conditions.constants";

type Fields = (typeof termsSectionFields)[keyof typeof termsSectionFields];

type EditableField = "titleAr" | "titleEn" | "contentAr" | "contentEn";

interface Props {
  section: TermsSection;
  language: TermsLanguage;
  fields: Fields;
  onChange: (id: number, field: EditableField, value: string) => void;
}

export default function TermsAndConditionsSection({
  section,
  language,
  fields,
  onChange,
}: Props) {
  const isArabic = language === "ar";
  const content = isArabic ? section.contentAr : section.contentEn;

  const title = isArabic ? section.titleAr : section.titleEn;
  const description = isArabic ? section.descriptionAr : section.descriptionEn;
  const note = isArabic ? section.noteAr : section.noteEn;

  return (
    <section
      className={`space-y-4 rounded-xl border border-users-panel-border bg-users-surface p-4 sm:p-5 ${
        section.id === 4 ? "border-r-4 border-r-badge-warning-fg" : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-users-table-header text-sm font-bold text-users-text-primary">
            {section.id}
          </span>

          <h2 className="text-sm font-bold text-users-text-primary">
            {section.id}. {title}
          </h2>

          {section.id === 4 && (
            <span className="rounded-md bg-status-active-bg px-2 py-1 text-[10px] font-medium text-status-active-fg">
              {isArabic ? "بند محوري" : "Key Section"}
            </span>
          )}
        </div>

        <span className="rounded-sm bg-users-table-header px-2 py-1 text-[10px] text-users-text-muted">
          {isArabic
            ? `البند الأساسي ${String(section.id).padStart(2, "0")} – ${section.label}`
            : `MAIN SECTION ${String(section.id).padStart(2, "0")}`}
        </span>
      </div>

      <p className="text-xs leading-6 text-users-text-muted">{description}</p>

      <div className="space-y-2">
        <Label
          unstyled
          htmlFor={`terms-content-${section.id}`}
          presentation="content-label"
        >
          {fields.contentLabel}
        </Label>

        <Textarea
          id={`terms-content-${section.id}`}
          dir={isArabic ? "rtl" : "ltr"}
          value={content}
          onChange={(event) =>
            onChange(section.id, fields.content, event.target.value)
          }
          rows={section.id === 1 ? 4 : 5}
          presentation="content-editor"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-users-text-muted">
        <span dir="ltr">{content.length} chars</span>
        <span>{note}</span>
      </div>
    </section>
  );
}
