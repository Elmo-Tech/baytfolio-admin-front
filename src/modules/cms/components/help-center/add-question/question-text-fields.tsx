import { Textarea } from "@/shared/components/ui/textarea";
import { Input, Label } from "@/shared/components/ui";
import QuestionLanguageSwitcher from "./question-language-switcher";

interface Props {
  language: "ar" | "en";
  setLanguage: (value: "ar" | "en") => void;
  questionAr: string;
  setQuestionAr: (value: string) => void;
  questionEn: string;
  setQuestionEn: (value: string) => void;
  answerAr: string;
  setAnswerAr: (value: string) => void;
  answerEn: string;
  setAnswerEn: (value: string) => void;
  validationError: string;
  clearValidationError: () => void;
}

export default function QuestionTextFields(props: Props) {
  const isArabic = props.language === "ar";

  const update = (value: string, setter: (value: string) => void) => {
    setter(value);
    props.clearValidationError();
  };

  return (
    <div className="space-y-4">
      <QuestionLanguageSwitcher
        language={props.language}
        onChange={props.setLanguage}
      />

      <div className="space-y-2">
        <Label htmlFor="help-question">
          السؤال ({isArabic ? "العربية" : "English"})
          {isArabic && <span className="text-destructive"> *</span>}
        </Label>

        <Input
          id="help-question"
          dir={isArabic ? "rtl" : "ltr"}
          value={isArabic ? props.questionAr : props.questionEn}
          onChange={(event) =>
            update(
              event.target.value,
              isArabic ? props.setQuestionAr : props.setQuestionEn,
            )
          }
          placeholder={
            isArabic ? "اكتب السؤال باللغة العربية" : "Enter the question"
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="help-answer">
          الإجابة ({isArabic ? "العربية" : "English"})
          {isArabic && <span className="text-destructive"> *</span>}
        </Label>

        <Textarea
          id="help-answer"
          dir={isArabic ? "rtl" : "ltr"}
          rows={4}
          value={isArabic ? props.answerAr : props.answerEn}
          onChange={(event) =>
            update(
              event.target.value,
              isArabic ? props.setAnswerAr : props.setAnswerEn,
            )
          }
          placeholder={
            isArabic ? "اكتب الإجابة باللغة العربية" : "Enter the answer"
          }
          className="min-h-[110px] w-full resize-y rounded-md border border-users-panel-divider bg-users-surface-input px-3 py-3 text-sm outline-none focus:border-brand-navy"
        />

        <p className="text-xs text-users-text-muted">
          يظهر هذا النص في مركز المساعدة والتطبيق عند النقر على السؤال.
        </p>
      </div>

      {props.validationError && (
        <p
          role="alert"
          className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive"
        >
          {props.validationError}
        </p>
      )}
    </div>
  );
}
