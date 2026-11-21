interface Props {
  language: "ar" | "en";
  onChange: (language: "ar" | "en") => void;
}

export default function QuestionLanguageSwitcher({
  language,
  onChange,
}: Props) {
  const isArabic = language === "ar";

  return (
    <div className="flex flex-col gap-3 border-b border-users-panel-divider pb-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-1 rounded-md border border-users-panel-divider bg-users-surface-input p-1">
        <button
          type="button"
          onClick={() => onChange("ar")}
          aria-pressed={isArabic}
          className={`h-8 rounded-sm px-3 text-xs font-medium transition-colors ${
            isArabic
              ? "bg-brand-navy text-primary-foreground"
              : "text-users-text-secondary hover:bg-background"
          }`}
        >
          العربية (الافتراضي) <span className="text-destructive">*</span>
        </button>

        <button
          type="button"
          onClick={() => onChange("en")}
          aria-pressed={!isArabic}
          className={`h-8 rounded-sm px-3 text-xs font-medium transition-colors ${
            !isArabic
              ? "bg-brand-navy text-primary-foreground"
              : "text-users-text-secondary hover:bg-background"
          }`}
        >
          English
        </button>
      </div>

      <p className="text-xs text-users-text-muted">
        {isArabic
          ? "المحتوى الأساسي للعرض باللغة العربية"
          : "English content for international users"}
      </p>
    </div>
  );
}
