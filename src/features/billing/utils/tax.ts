const GST_RATE_PATTERN = /(?:GST\s*)?(\d+(?:\.\d+)?)\s*%?/i;

export function getGstRate(taxCategory?: string | null): number {
  if (!taxCategory || /exempt|zero.?rated|nil/i.test(taxCategory)) return 0;
  const match = taxCategory.match(GST_RATE_PATTERN);
  const rate = match ? Number(match[1]) : 0;
  return Number.isFinite(rate) && rate >= 0 && rate <= 100 ? rate / 100 : 0;
}

export function calculateGstTax(
  items: Array<{ quantity: number; effectiveRate: number; taxCategory?: string | null }>,
  discount: number,
): number {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.effectiveRate, 0);
  if (subtotal <= 0) return 0;
  const discountRatio = Math.min(1, Math.max(0, discount) / subtotal);
  return Math.round(items.reduce((sum, item) => {
    const discountedLine = item.quantity * item.effectiveRate * (1 - discountRatio);
    return sum + discountedLine * getGstRate(item.taxCategory);
  }, 0) * 100) / 100;
}
