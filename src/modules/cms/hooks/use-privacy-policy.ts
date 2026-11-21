import { useState } from "react";

import {
  initialPrivacyPolicy,
  savePrivacyPolicyMock,
} from "../api/privacy-policy.mock";

import type { PrivacyPolicyLanguage } from "../types/privacy-policy";

import { privacyPolicySectionFields } from "../constants/privacy-policy.constants";
import { clonePrivacyPolicy } from "../utils/privacy-policy.utils";

export function usePrivacyPolicy() {
  const [policy, setPolicy] = useState(() =>
    clonePrivacyPolicy(initialPrivacyPolicy),
  );

  const [savedPolicy, setSavedPolicy] = useState(() =>
    clonePrivacyPolicy(initialPrivacyPolicy),
  );

  const [language, setLanguage] = useState<PrivacyPolicyLanguage>("ar");
  const [isSaved, setIsSaved] = useState(false);

  const isArabic = language === "ar";
  const fields = privacyPolicySectionFields[language];

  const handleSectionChange = (
    sectionId: number,
    field: "titleAr" | "titleEn" | "contentAr" | "contentEn",
    value: string,
  ) => {
    setPolicy((previous) => ({
      ...previous,
      sections: previous.sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section,
      ),
    }));

    setIsSaved(false);
  };

  const handleSave = () => {
    const savedData = savePrivacyPolicyMock(policy);

    setPolicy(clonePrivacyPolicy(savedData));
    setSavedPolicy(clonePrivacyPolicy(savedData));
    setIsSaved(true);
  };

  const handleReset = () => {
    setPolicy(clonePrivacyPolicy(savedPolicy));
    setIsSaved(false);
  };

  return {
    policy,
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
