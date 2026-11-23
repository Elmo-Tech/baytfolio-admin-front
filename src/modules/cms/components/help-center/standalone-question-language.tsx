import { Button } from "@/shared/components/ui/button";
import type { StandaloneQuestionForm } from "../../hooks/use-standalone-question-form";

export default function StandaloneQuestionLanguage({
  isArabic,
  setLanguage,
}: StandaloneQuestionForm) {
  return (
    <>
      {/* Language Switcher */}
      <div className="flex flex-col gap-3 border-b border-users-panel-divider pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-md border border-users-panel-divider bg-users-surface-input p-1">
          <Button
            unstyled
            type="button"
            onClick={() => setLanguage("ar")}
            aria-pressed={isArabic}
            className={`h-8 cursor-pointer rounded-sm px-3 text-xs font-medium transition-colors ${
              isArabic
                ? "bg-brand-navy text-primary-foreground"
                : "text-users-text-secondary hover:bg-background"
            }`}
          >
            العربية (الافتراضي)
            <span className="text-destructive"> *</span>
          </Button>

          <Button
            unstyled
            type="button"
            onClick={() => setLanguage("en")}
            aria-pressed={!isArabic}
            className={`h-8 cursor-pointer rounded-sm px-3 text-xs font-medium transition-colors ${
              !isArabic
                ? "bg-brand-navy text-primary-foreground"
                : "text-users-text-secondary hover:bg-background"
            }`}
          >
            English
          </Button>
        </div>

        <p className="text-xs text-users-text-muted">
          {isArabic
            ? "المحتوى الأساسي للعرض باللغة العربية"
            : "English content for international users"}
        </p>
      </div>
    </>
  );
}
