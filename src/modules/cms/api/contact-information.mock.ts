import type { ContactInformation } from "../types/contact-information";

export const initialContactInformation: ContactInformation = {
  phone: "+20 2 3344 5566",
  whatsapp: "+20 10 9876 5432",
  email: "support@baytfolio.com",
  serviceHours:
    "من الأحد إلى الخميس - من 9:00 صباحًا حتى 6:00 مساءً (توقيت القاهرة)",
};

export function saveContactInformationMock(
  settings: ContactInformation,
): ContactInformation {
  return { ...settings };
}
