export function getProductCreationErrorMessage(error: unknown): string {
  const value = error as { code?: unknown; message?: unknown } | null;
  const code = typeof value?.code === 'string' ? value.code : '';
  const message = typeof value?.message === 'string' ? value.message : '';
  const combined = `${code} ${message}`.toLowerCase();

  if (combined.includes('already-exists') || /unique|duplicate|already exists/.test(combined)) {
    return 'A product with this SKU, barcode, or product code already exists.';
  }
  if (combined.includes('unauthenticated')) {
    return 'Your session has expired. Please sign in again and retry.';
  }
  if (combined.includes('permission-denied') || combined.includes('permission')) {
    return 'You do not have permission to create products in this organization.';
  }
  if (combined.includes('invalid-argument') || combined.includes('invalid input')) {
    return 'Some product details are invalid. Please review the form and retry.';
  }

  return 'Unable to create the product right now. Please try again.';
}
