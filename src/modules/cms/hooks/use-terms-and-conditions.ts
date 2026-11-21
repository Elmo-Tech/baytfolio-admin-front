import { useState } from "react";

import {
  initialTermsAndConditions,
  saveTermsAndConditionsMock,
} from "../api/terms-and-conditions.mock";

import type {
  TermsAndConditions,
  TermsLanguage,
} from "../types/terms-and-conditions";

import { termsSectionFields } from "../constants/terms-and-conditions.constants";
import { cloneTerms } from "../utils/terms-and-conditions.utils";

type EditableField = "titleAr" | "titleEn" | "contentAr" | "contentEn";

export function useTermsAndConditions() {
  const [terms, setTerms] = useState<TermsAndConditions>(() =>
    cloneTerms(initialTermsAndConditions),
  );

  const [savedTerms, setSavedTerms] = useState<TermsAndConditions>(() =>
    cloneTerms(initialTermsAndConditions),
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

    setTerms(cloneTerms(savedData));
    setSavedTerms(cloneTerms(savedData));
    setIsSaved(true);
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
