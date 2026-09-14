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

export function formatIndianDate(value: string): string {
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (isoMatch) return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
  return /^(\d{2})\/(\d{2})\/(\d{4})$/.test(value) ? value : '';
}

export function formatIndianDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function parseIndianDate(value: string): string | undefined {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return undefined;
  const [, day, month, year] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (date.getUTCFullYear() !== Number(year) || date.getUTCMonth() !== Number(month) - 1 || date.getUTCDate() !== Number(day)) {
    return undefined;
  }
  return `${year}-${month}-${day}`;
}

export function todayInIndia(): string {
  const parts = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.day}/${values.month}/${values.year}`;
}
