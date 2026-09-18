export function formatPurchaseDateForDisplay(value?: string | null): string {
  if (!value) return '';
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : value;
}

export function parsePurchaseDate(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const displayMatch = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!displayMatch) return undefined;

  const [, day, month, year] = displayMatch;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return undefined;
  }

  return `${year}-${month}-${day}`;
}
