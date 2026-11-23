import { Input, Label } from "@/shared/components/ui";
import { Textarea } from "@/shared/components/ui/textarea";
import type { StandaloneQuestionForm } from "../../hooks/use-standalone-question-form";

export default function StandaloneQuestionTextFields({
  isArabic,
  questionAr,
  questionEn,
  answerAr,
  answerEn,
  setQuestionAr,
  setQuestionEn,
  setAnswerAr,
  setAnswerEn,
  setValidationError,
}: StandaloneQuestionForm) {
  return (
    <>
      {/* Question */}
      <div className="space-y-2">
        <Label htmlFor="help-question" presentation="question-label">
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
        <Label htmlFor="help-answer" presentation="question-label">
          الإجابة ({isArabic ? "باللغة العربية" : "باللغة الإنجليزية"})
          {isArabic && <span className="text-destructive"> *</span>}
        </Label>

        <Textarea
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
          يظهر هذا النص مباشرة في مركز المساعدة والتطبيق عند النقر على السؤال.
        </p>
      </div>
    </>
  );
}
