import { usePrivacyPolicy } from "../hooks/use-privacy-policy";

import PrivacyPolicyHeader from "../components/privacy-policy/privacy-policy-header";
import PrivacyPolicySection from "../components/privacy-policy/privacy-policy-section";
import PrivacyPolicyLastUpdated from "../components/privacy-policy/privacy-policy-last-updated";
import PrivacyPolicyActions from "../components/privacy-policy/privacy-policy-actions";

export default function PrivacyPolicyPage() {
  const {
    policy,
    language,
    setLanguage,
    isArabic,
    fields,
    isSaved,
    handleSectionChange,
    handleSave,
    handleReset,
  } = usePrivacyPolicy();

  return (
    <div dir="rtl" className="space-y-5 pb-24">
      <PrivacyPolicyHeader
        documentId={policy.documentId}
        language={language}
        setLanguage={setLanguage}
      />

      {policy.sections.map((section) => (
        <PrivacyPolicySection
          key={section.id}
          section={section}
          isArabic={isArabic}
          fields={fields}
          onChange={handleSectionChange}
        />
      ))}

      <PrivacyPolicyLastUpdated lastUpdated={policy.lastUpdated} />

      <PrivacyPolicyActions
        isArabic={isArabic}
        isSaved={isSaved}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
}
