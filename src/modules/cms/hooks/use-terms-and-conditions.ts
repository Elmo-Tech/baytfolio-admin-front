import { useState } from "react";
import { toast } from "sonner";

import {
  initialTermsAndConditions,
  saveTermsAndConditionsMock,
} from "../api/terms-and-conditions.mock";
import { termsSectionFields } from "../constants/terms-and-conditions.constants";
import type {
  TermsAndConditions,
  TermsLanguage,
} from "../types/terms-and-conditions";
import { loadCmsStorage, saveCmsStorage } from "../utils/cms-storage";
import { cloneTerms } from "../utils/terms-and-conditions.utils";

type EditableField = "titleAr" | "titleEn" | "contentAr" | "contentEn";
const STORAGE_KEY = "baytfolio:cms:terms-and-conditions";

export function useTermsAndConditions() {
  const [terms, setTerms] = useState<TermsAndConditions>(() =>
    cloneTerms(loadCmsStorage(STORAGE_KEY, initialTermsAndConditions)),
  );
  const [savedTerms, setSavedTerms] = useState<TermsAndConditions>(() =>
    cloneTerms(loadCmsStorage(STORAGE_KEY, initialTermsAndConditions)),
  );
  const [language, setLanguage] = useState<TermsLanguage>("ar");
  const [isSaved, setIsSaved] = useState(false);

  const isArabic = language === "ar";
  const fields = termsSectionFields[language];

  const handleSectionChange = (
    sectionId: number,
    field: EditableField,
    value: string,
  ) => {
    setTerms((previous) => ({
      ...previous,
      sections: previous.sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section,
      ),
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    const savedData = saveTermsAndConditionsMock(terms);
    const persisted = saveCmsStorage(STORAGE_KEY, savedData);
    if (!persisted) {
      toast.error("تعذر حفظ الشروط والأحكام في التخزين المحلي");
      return;
    }
    setTerms(cloneTerms(savedData));
    setSavedTerms(cloneTerms(savedData));
    setIsSaved(true);
    toast.success("تم حفظ ونشر الشروط والأحكام بنجاح");
  };

  const handleReset = () => {
    setTerms(cloneTerms(savedTerms));
    setIsSaved(false);
  };

  return {
    terms,
    language,
    setLanguage,
    isArabic,
    fields,
    isSaved,
    handleSectionChange,
    handleSave,
    handleReset,
  };
}
