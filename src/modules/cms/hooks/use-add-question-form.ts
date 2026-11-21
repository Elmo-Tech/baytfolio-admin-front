import { useState, type FormEvent } from "react";
import type {
  HelpCenterQuestion,
  HelpCenterQuestionInput,
} from "../types/help-center";

export function useAddQuestionForm(
  question: HelpCenterQuestion | undefined,
  onSubmit: (data: HelpCenterQuestionInput) => void,
) {
  const [category, setCategory] = useState(question?.category ?? "");
  const [status, setStatus] = useState<"active" | "draft">(
    question?.status ?? "active",
  );
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const [questionAr, setQuestionAr] = useState(question?.question ?? "");
  const [questionEn, setQuestionEn] = useState(question?.questionEn ?? "");
  const [answerAr, setAnswerAr] = useState(question?.answer ?? "");
  const [answerEn, setAnswerEn] = useState(question?.answerEn ?? "");

  const [validationError, setValidationError] = useState("");

  const formData: HelpCenterQuestionInput = {
    category,
    status,
    question: questionAr.trim(),
    questionEn: questionEn.trim(),
    answer: answerAr.trim(),
    answerEn: answerEn.trim(),
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.question || !formData.answer) {
      setLanguage("ar");
      setValidationError("السؤال والإجابة باللغة العربية حقول إلزامية.");
      return;
    }

    onSubmit(formData);
  };

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
    clearValidationError: () => setValidationError(""),
    handleSubmit,
    formData,
  };
}
