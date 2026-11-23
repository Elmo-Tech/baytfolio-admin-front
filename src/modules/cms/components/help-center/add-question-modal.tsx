import { DialogSurface } from "@/shared/components/ui/dialog-surface";
import { Info, PlusCircle, X } from "lucide-react";

import { Button } from "@/shared/components/ui";

import type {
  HelpCenterQuestion,
  HelpCenterQuestionInput,
} from "../../types/help-center";

import { useStandaloneQuestionForm } from "../../hooks/use-standalone-question-form";
import StandaloneQuestionMetadata from "./standalone-question-metadata";
import StandaloneQuestionLanguage from "./standalone-question-language";
import StandaloneQuestionTextFields from "./standalone-question-text-fields";

interface AddQuestionModalProps {
  question?: HelpCenterQuestion;
  onClose: () => void;
  onSubmit: (data: HelpCenterQuestionInput) => void;
}

export default function AddQuestionModal({
  question,
  onClose,
  onSubmit,
}: AddQuestionModalProps) {
  const form = useStandaloneQuestionForm(question, onSubmit);
  const { handleSubmit, validationError } = form;

  return (
    <DialogSurface
      presentation="standalone-question"
      overlayProps={{
        "data-help-center-modal": true,
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) onClose();
        },
      }}
      surfaceProps={{
        dir: "rtl",
        role: "dialog",
        "aria-modal": true,
        "aria-labelledby": "question-modal-title",
      }}
    >
      <header className="flex shrink-0 items-center justify-between border-b border-users-panel-divider px-5 py-5">
        <div>
          <h2
            id="question-modal-title"
            className="text-lg font-semibold text-users-text-primary"
          >
            {question ? "تعديل السؤال" : "إضافة سؤال جديد"}
          </h2>

          <p className="mt-1 text-xs text-users-text-muted">
            إضافة سؤال وإجابة إلى مركز مساعدة BaytFolio.
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="إغلاق"
          className="text-users-text-muted hover:bg-background"
        >
          <X size={19} />
        </Button>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        {/* Form Content */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <StandaloneQuestionMetadata {...form} />

          <StandaloneQuestionLanguage {...form} />

          <StandaloneQuestionTextFields {...form} />

          {/* Validation */}
          {validationError && (
            <p
              role="alert"
              className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive"
            >
              {validationError}
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 flex-col gap-3 border-t border-users-panel-divider px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-users-text-muted">
            <Info size={14} />
            الحقول المشار إليها بـ (*) إلزامية
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="h-10 cursor-pointer gap-2 rounded-md bg-brand-navy px-5 text-primary-foreground hover:bg-brand-navy/90"
            >
              {question ? "حفظ التعديلات" : "إضافة السؤال"}
              <PlusCircle size={17} />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-10 cursor-pointer rounded-md border-users-panel-divider px-4 text-users-text-secondary"
            >
              إلغاء
            </Button>
          </div>
        </footer>
      </form>
    </DialogSurface>
  );
}
