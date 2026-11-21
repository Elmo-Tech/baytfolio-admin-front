import QuestionMetadataFields from "./question-metadata-fields";
import QuestionTextFields from "./question-text-fields";

interface Props {
  category: string;
  setCategory: (value: string) => void;
  status: "active" | "draft";
  setStatus: (value: "active" | "draft") => void;
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

export default function QuestionFormFields(props: Props) {
  return (
    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
      <QuestionMetadataFields
        category={props.category}
        setCategory={props.setCategory}
        status={props.status}
        setStatus={props.setStatus}
      />

      <QuestionTextFields {...props} />
    </div>
  );
}
