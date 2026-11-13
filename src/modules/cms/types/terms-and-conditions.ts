export type TermsLanguage = "ar" | "en";

export interface TermsSection {
  id: number;
  label: string;
  descriptionAr: string;
  descriptionEn: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  noteAr: string;
  noteEn: string;
}

export interface TermsAndConditions {
  documentId: string;
  status: "published" | "draft";
  lastUpdated: string;
  sections: TermsSection[];
}
