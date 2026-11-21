import type { PrivacyPolicy } from "../types/privacy-policy";

export function clonePrivacyPolicy(policy: PrivacyPolicy): PrivacyPolicy {
  return {
    ...policy,
    sections: policy.sections.map((section) => ({
      ...section,
    })),
  };
}
