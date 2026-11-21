export function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function getPhoneHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function getWhatsAppHref(phone: string): string {
  return `https://wa.me/${normalizePhoneNumber(phone)}`;
}

export function getEmailHref(email: string): string {
  return `mailto:${email}`;
}
