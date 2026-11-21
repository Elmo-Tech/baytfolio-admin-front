import type { TermsAndConditions } from "../types/terms-and-conditions";

export function cloneTerms(terms: TermsAndConditions): TermsAndConditions {
  return {
    ...terms,
    sections: terms.sections.map((section) => ({
      ...section,
    })),
  };
}
