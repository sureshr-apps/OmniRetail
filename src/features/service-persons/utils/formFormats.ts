export function formatIndianPhone(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, '');
  const hasCountryCode = trimmed.startsWith('+91') || (digits.length > 10 && digits.startsWith('91'));
  const localDigits = (hasCountryCode ? digits.slice(2) : digits.startsWith('0') ? digits.slice(1) : digits).slice(0, 10);
  if (!localDigits) return '';
  return `+91 ${localDigits.slice(0, 5)}${localDigits.length > 5 ? ` ${localDigits.slice(5)}` : ''}`;
}

export function isValidIndianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  const localDigits = digits.startsWith('91') && digits.length > 10
    ? digits.slice(2)
    : digits.startsWith('0') && digits.length > 10
      ? digits.slice(1)
      : digits;
  return /^[6-9]\d{9}$/.test(localDigits);
}
