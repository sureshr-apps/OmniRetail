import { PurchaseItem, PurchaseReceiptLine } from '../types';

const EPSILON = 0.000001;

export function validatePurchaseReceiptLines(
  items: readonly PurchaseItem[],
  receipts: readonly PurchaseReceiptLine[],
): string | null {
  if (receipts.length === 0) return 'Enter a quantity for at least one product before confirming stock inward.';

  const itemsById = new Map(items.map((item) => [item.id, item]));
  const seenLineIds = new Set<string>();
  let hasQuantity = false;

  for (const receipt of receipts) {
    const item = itemsById.get(receipt.lineId);
    if (!item) return 'One of the selected purchase lines could not be found.';
    if (seenLineIds.has(receipt.lineId)) return `Receipt details for ${item.productName} were provided more than once.`;
    seenLineIds.add(receipt.lineId);

    const pending = Math.max(0, item.quantityOrdered - item.quantityReceived);
    let quantity = 0;
    for (const batch of receipt.batches) {
      if (!Number.isFinite(batch.quantity) || batch.quantity < 0) {
        return `${item.productName} has an invalid receipt quantity.`;
      }
      if (batch.quantity === 0) continue;
      if (batch.mfgDate && batch.expiryDate && batch.mfgDate > batch.expiryDate) {
        return `${item.productName}: manufacturing date cannot be after the expiry date.`;
      }
      quantity += batch.quantity;
      hasQuantity = true;
    }

    if (quantity > pending + EPSILON) {
      return `${item.productName} cannot receive more than ${pending} pending units.`;
    }
  }

  return hasQuantity ? null : 'Enter a quantity for at least one product before confirming stock inward.';
}
