import { useState } from "react";
import { toast } from "sonner";

import {
  initialPrivacyPolicy,
  savePrivacyPolicyMock,
} from "../api/privacy-policy.mock";
import { privacyPolicySectionFields } from "../constants/privacy-policy.constants";
import type { PrivacyPolicyLanguage } from "../types/privacy-policy";
import { loadCmsStorage, saveCmsStorage } from "../utils/cms-storage";
import { clonePrivacyPolicy } from "../utils/privacy-policy.utils";

const STORAGE_KEY = "baytfolio:cms:privacy-policy";

export function usePrivacyPolicy() {
  const [policy, setPolicy] = useState(() =>
    clonePrivacyPolicy(loadCmsStorage(STORAGE_KEY, initialPrivacyPolicy)),
  );
  const [savedPolicy, setSavedPolicy] = useState(() =>
    clonePrivacyPolicy(loadCmsStorage(STORAGE_KEY, initialPrivacyPolicy)),
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
    const persisted = saveCmsStorage(STORAGE_KEY, savedData);
    if (!persisted) {
      toast.error("تعذر حفظ سياسة الخصوصية في التخزين المحلي");
      return;
    }
    setPolicy(clonePrivacyPolicy(savedData));
    setSavedPolicy(clonePrivacyPolicy(savedData));
    setIsSaved(true);
    toast.success("تم حفظ ونشر سياسة الخصوصية بنجاح");
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
