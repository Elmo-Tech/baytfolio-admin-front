export interface ContactInformation {
  phone: string;
  whatsapp: string;
  email: string;
  serviceHours: string;
}

export type ContactInformationField = keyof ContactInformation;
