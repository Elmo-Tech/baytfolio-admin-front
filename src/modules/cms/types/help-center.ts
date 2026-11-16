export type HelpCenterStatus = "active" | "draft";

export interface HelpCenterQuestion {
  id: number;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  category: string;
  status: HelpCenterStatus;
}

export interface HelpCenterQuestionInput {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  category: string;
  status: HelpCenterStatus;
}
