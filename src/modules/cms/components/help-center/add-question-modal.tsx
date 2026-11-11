import { useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Info, PlusCircle, X } from "lucide-react";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

import type {
  HelpCenterQuestion,
  HelpCenterQuestionInput,
} from "../../types/help-center";

import { helpCenterCategories } from "../../api/help-center.mock";

interface AddQuestionModalProps {
  question?: HelpCenterQuestion;
  onClose: () => void;
  onSubmit: (data: HelpCenterQuestionInput) => void;
}

type Language = "ar" | "en";

export default function AddQuestionModal({
  question,
  onClose,
  onSubmit,
}: AddQuestionModalProps) {
  const [category, setCategory] = useState(
    question?.category ?? helpCenterCategories[0],
  );

  const [status, setStatus] = useState<"active" | "draft">(
    question?.status ?? "active",
  );

  const [language, setLanguage] = useState<Language>("ar");

  const [questionAr, setQuestionAr] = useState(question?.question ?? "");
  const [questionEn, setQuestionEn] = useState(question?.questionEn ?? "");

  const [answerAr, setAnswerAr] = useState(question?.answer ?? "");
  const [answerEn, setAnswerEn] = useState(question?.answerEn ?? "");

  const [validationError, setValidationError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!questionAr.trim() || !answerAr.trim()) {
      setLanguage("ar");
      setValidationError("السؤال والإجابة باللغة العربية حقول إلزامية.");
      return;
    }

    setValidationError("");

    onSubmit({
      category,
      status,
      question: questionAr.trim(),
      questionEn: questionEn.trim(),
      answer: answerAr.trim(),
      answerEn: answerEn.trim(),
    });
  };

  const isArabic = language === "ar";

  return createPortal(
    <div
      data-help-center-modal
      className="fixed inset-0 z-[9999] grid place-items-center overflow-hidden bg-black/50 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-modal-title"
        className="flex max-h-[90dvh] w-full max-w-[690px] flex-col overflow-hidden rounded-xl border border-users-panel-border bg-users-surface shadow-2xl"
      >
        {/* Header */}
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
            {/* Category & Status */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_180px]">
              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm text-users-text-primary">
                  موضوع السؤال <span className="text-destructive">*</span>
                </Label>

                <Select dir="rtl" value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-11 w-full cursor-pointer rounded-md border-users-panel-divider bg-users-surface-input px-3 text-sm text-users-text-primary shadow-none">
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>

                  <SelectContent>
                    {helpCenterCategories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-sm text-users-text-primary">
                  الحالة <span className="text-destructive">*</span>
                </Label>

                <Select
                  dir="rtl"
                  value={status}
                  onValueChange={(value) =>
                    setStatus(value as "active" | "draft")
                  }
                >
                  <SelectTrigger className="h-11 w-full cursor-pointer rounded-md border-users-panel-divider bg-users-surface-input px-3 text-sm text-users-text-primary shadow-none">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="draft">مسودة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex flex-col gap-3 border-b border-users-panel-divider pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1 rounded-md border border-users-panel-divider bg-users-surface-input p-1">
                <button
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
                </button>

                <button
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
                </button>
              </div>

              <p className="text-xs text-users-text-muted">
                {isArabic
                  ? "المحتوى الأساسي للعرض باللغة العربية"
                  : "English content for international users"}
              </p>
            </div>

            {/* Question */}
            <div className="space-y-2">
              <Label
                htmlFor="help-question"
                className="text-sm text-users-text-primary"
              >
                السؤال ({isArabic ? "باللغة العربية" : "باللغة الإنجليزية"})
                {isArabic && <span className="text-destructive"> *</span>}
              </Label>

              <Input
                id="help-question"
                dir={isArabic ? "rtl" : "ltr"}
                value={isArabic ? questionAr : questionEn}
                onChange={(event) => {
                  if (isArabic) {
                    setQuestionAr(event.target.value);
                  } else {
                    setQuestionEn(event.target.value);
                  }

                  setValidationError("");
                }}
                placeholder={
                  isArabic
                    ? "اكتب السؤال باللغة العربية"
                    : "Enter the question in English"
                }
                className="h-11 rounded-md border-users-panel-divider bg-users-surface-input px-3 text-sm text-users-text-primary shadow-none focus-visible:border-brand-navy focus-visible:ring-0"
              />
            </div>

            {/* Answer */}
            <div className="space-y-2">
              <Label
                htmlFor="help-answer"
                className="text-sm text-users-text-primary"
              >
                الإجابة ({isArabic ? "باللغة العربية" : "باللغة الإنجليزية"})
                {isArabic && <span className="text-destructive"> *</span>}
              </Label>

              <textarea
                id="help-answer"
                dir={isArabic ? "rtl" : "ltr"}
                rows={4}
                value={isArabic ? answerAr : answerEn}
                onChange={(event) => {
                  if (isArabic) {
                    setAnswerAr(event.target.value);
                  } else {
                    setAnswerEn(event.target.value);
                  }

                  setValidationError("");
                }}
                placeholder={
                  isArabic
                    ? "اكتب الإجابة باللغة العربية"
                    : "Enter the answer in English"
                }
                className={`flex min-h-[110px] w-full resize-y rounded-md border border-users-panel-divider bg-users-surface-input px-3 py-3 text-sm text-users-text-primary shadow-none outline-none transition-colors placeholder:text-users-text-muted focus:border-brand-navy focus:ring-0 ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />

              <p className="text-xs text-users-text-muted">
                يظهر هذا النص مباشرة في مركز المساعدة والتطبيق عند النقر على
                السؤال.
              </p>
            </div>

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
      </section>
    </div>,
    document.body,
  );
}
