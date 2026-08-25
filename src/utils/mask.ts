export function maskEmail(email: string): string {
  const trimmed = email.trim();
  const [local, domain] = trimmed.split('@');
  if (!local || !domain) return trimmed;
  const head = local.slice(0, 1);
  return `${head}${'*'.repeat(Math.max(local.length - 1, 2))}@${domain}`;
}

export function maskPhone(countryCode: string, phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 3) return `${countryCode} ${'*'.repeat(digits.length)}`;
  const tail = digits.slice(-3);
  return `${countryCode} ${'*'.repeat(Math.max(digits.length - 3, 3))}${tail}`;
}