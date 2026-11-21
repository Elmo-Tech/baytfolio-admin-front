import { Languages, RotateCcw, Save } from "lucide-react";

import { Button } from "@/shared/components/ui";

interface Props {
  isArabic: boolean;
  isSaved: boolean;
  onSave: () => void;
  onReset: () => void;
}

export default function PrivacyPolicyActions({
  isArabic,
  isSaved,
  onSave,
  onReset,
}: Props) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-users-panel-divider bg-users-surface/95 px-4 py-3 backdrop-blur sm:px-8 xl:right-[280px]">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={onSave}
            className="h-10 gap-2 bg-users-brand-navy px-5 text-primary-foreground hover:opacity-90"
          >
            <Save size={16} />
            {isArabic ? "حفظ التغييرات" : "Save Changes"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            className="h-10 gap-2 text-users-text-secondary"
          >
            <RotateCcw size={15} />
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
        </div>

        <div className="hidden items-center gap-2 text-xs text-users-text-muted sm:flex">
          <Languages size={15} />
          {isSaved
            ? isArabic
              ? "تم حفظ التغييرات محليًا"
              : "Changes saved locally"
            : isArabic
              ? "آخر تعديل للوثيقة"
              : "Document editing"}
        </div>
      </div>
    </footer>
  );
}
