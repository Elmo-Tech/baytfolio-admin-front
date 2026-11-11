export interface CMSContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  workingHours: string;
}

export interface CMSLegalContent {
  status: "published" | "draft";
  lastUpdated: string;
  languages: string[];
  scope: string;
}

export interface CMSOverviewData {
  helpCenter: {
    publishedQuestions: number;
    categories: string[];
  };
  contactInfo: CMSContactInfo;
  privacyPolicy: CMSLegalContent;
  termsConditions: CMSLegalContent;
}
