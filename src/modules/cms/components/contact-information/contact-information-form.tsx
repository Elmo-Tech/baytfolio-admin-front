import { Phone, RotateCcw, Save } from "lucide-react";

import { Button } from "@/shared/components/ui";

import { CONTACT_INFORMATION_FIELDS } from "../../constants/contact-information";
import type {
  ContactInformation,
  ContactInformationField,
} from "../../types/contact-information";
import ContactInformationFieldItem from "./contact-information-field";

interface ContactInformationFormProps {
  settings: ContactInformation;
  onChange: (field: ContactInformationField, value: string) => void;
  onSave: () => void;
  onReset: () => void;
  isSaved: boolean;
  isValid: boolean;
}

export default function ContactInformationForm({
  settings,
  onChange,
  onSave,
  onReset,
  isSaved,
  isValid,
}: ContactInformationFormProps) {
  return (
    <section
      dir="rtl"
      className="min-w-0 rounded-xl border border-users-panel-border bg-users-surface p-5 sm:p-6"
    >
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
        {CONTACT_INFORMATION_FIELDS.map((config) => (
          <ContactInformationFieldItem
            key={config.field}
            config={config}
            value={settings[config.field]}
            onChange={(value) => onChange(config.field, value)}
          />
        ))}
      </div>

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
            disabled={!isValid}
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
