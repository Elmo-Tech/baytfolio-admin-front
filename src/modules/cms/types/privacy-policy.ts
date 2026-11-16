export type PrivacyPolicyLanguage = "ar" | "en";

export interface PrivacyPolicySection {
  id: number;
  label: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
}

export interface PrivacyPolicy {
  documentId: string;
  status: "published" | "draft";
  lastUpdated: string;
  sections: PrivacyPolicySection[];
}
