import { useState, type FormEvent } from "react";
import { helpCenterCategories } from "../api/help-center.mock";
import type {
  HelpCenterQuestion,
  HelpCenterQuestionInput,
} from "../types/help-center";

type Language = "ar" | "en";
export function useStandaloneQuestionForm(
  question: HelpCenterQuestion | undefined,
  onSubmit: (data: HelpCenterQuestionInput) => void,
) {
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

  return {
    category,
    setCategory,
    status,
    setStatus,
    language,
    setLanguage,
    questionAr,
    setQuestionAr,
    questionEn,
    setQuestionEn,
    answerAr,
    setAnswerAr,
    answerEn,
    setAnswerEn,
    validationError,
    setValidationError,
    handleSubmit,
    isArabic,
  };
}
export type StandaloneQuestionForm = ReturnType<
  typeof useStandaloneQuestionForm
>;
