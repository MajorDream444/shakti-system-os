export function hasUsableContact(email?: string, phone?: string) {
  return Boolean(email?.trim() || phone?.trim());
}

export function normalizeEmail(email?: string) {
  return email?.trim().toLowerCase() || undefined;
}

export function normalizePhone(phone?: string) {
  return phone?.trim().replace(/\s+/g, " ") || undefined;
}
