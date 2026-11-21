import { useTermsAndConditions } from "../hooks/use-terms-and-conditions";

import TermsAndConditionsHeader from "../components/terms-and-conditions/terms-and-conditions-header";
import TermsAndConditionsSection from "../components/terms-and-conditions/terms-and-conditions-section";
import TermsAndConditionsLastUpdated from "../components/terms-and-conditions/terms-and-conditions-last-updated";
import TermsAndConditionsActions from "../components/terms-and-conditions/terms-and-conditions-actions";

export default function TermsAndConditionsPage() {
  const {
    terms,
    language,
    setLanguage,
    fields,
    isSaved,
    handleSectionChange,
    handleSave,
    handleReset,
  } = useTermsAndConditions();

  return (
    <div dir="rtl" className="space-y-5 pb-24">
      <TermsAndConditionsHeader
        documentId={terms.documentId}
        language={language}
        setLanguage={setLanguage}
      />

      {terms.sections.map((section) => (
        <TermsAndConditionsSection
          key={section.id}
          section={section}
          language={language}
          fields={fields}
          onChange={handleSectionChange}
        />
      ))}

      <TermsAndConditionsLastUpdated
        lastUpdated={terms.lastUpdated}
        language={language}
      />

      <TermsAndConditionsActions
        language={language}
        isSaved={isSaved}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
}
