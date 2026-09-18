import { PaymentStatus, PurchaseItem } from '../types';

export function calculateLineTotal(
  quantity: number,
  unitCost: number,
  discountPercent: number = 0,
  taxRate: number = 0
): { baseSubtotal: number; taxAmount: number; lineTotal: number } {
  const discountMultiplier = Math.max(0, 1 - discountPercent / 100);
  const baseSubtotal = Number((quantity * unitCost * discountMultiplier).toFixed(2));
  const taxAmount = Number(((baseSubtotal * taxRate) / 100).toFixed(2));
  const lineTotal = Number((baseSubtotal + taxAmount).toFixed(2));

  return { baseSubtotal, taxAmount, lineTotal };
}

export function calculateOutstandingAmount(totalAmount: number, amountPaid: number): number {
  const total = Number(totalAmount) || 0;
  const paid = Number(amountPaid) || 0;
  return Math.max(0, Number((total - paid).toFixed(2)));
}

export function calculatePurchaseTotals(
  items: Array<{
    quantity: number;
    unitCost: number;
    discountPercent?: number;
    taxRate?: number;
  }>,
  shippingFee: number = 0,
  handlingFee: number = 0,
  amountPaid: number = 0
): {
  totalUnits: number;
  subtotal: number;
  totalTax: number;
  grandTotal: number;
  outstandingAmount: number;
  derivedPaymentStatus: PaymentStatus;
} {
  let totalUnits = 0;
  let subtotal = 0;
  let totalTax = 0;

  for (const item of items) {
    const qty = Number(item.quantity) || 0;
    const cost = Number(item.unitCost) || 0;
    const discount = Number(item.discountPercent) || 0;
    const taxRate = Number(item.taxRate) || 0;

    totalUnits += qty;
    const { baseSubtotal, taxAmount } = calculateLineTotal(qty, cost, discount, taxRate);
    subtotal += baseSubtotal;
    totalTax += taxAmount;
  }

  const grandTotal = Number((subtotal + totalTax + shippingFee + handlingFee).toFixed(2));
  const outstandingAmount = calculateOutstandingAmount(grandTotal, amountPaid);

  let derivedPaymentStatus: PaymentStatus = 'UNPAID';
  if (amountPaid >= grandTotal && grandTotal > 0) {
    derivedPaymentStatus = 'PAID';
  } else if (amountPaid > 0) {
    derivedPaymentStatus = 'PARTIALLY_PAID';
  }

  return {
    totalUnits,
    subtotal: Number(subtotal.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    grandTotal,
    outstandingAmount,
    derivedPaymentStatus,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
