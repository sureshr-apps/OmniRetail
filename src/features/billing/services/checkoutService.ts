import { getCurrentUserAuthorization, listTenantOutlets } from '@omniretail/sql-connect';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { CartItem, Customer, OrderTotals, PaymentMethod } from '../types';

export async function completeTenantCheckout(input: { orderNumber: string; items: CartItem[]; customer: Customer; totals: OrderTotals; paymentMethod: PaymentMethod; cashAmount?: number }): Promise<void> {
  const services = getFirebaseClientServices();
  const authorization = await getCurrentUserAuthorization(services.dataConnect);
  const membership = authorization.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
  if (!membership) throw new Error('No active organization membership.');
  const outlets = await listTenantOutlets(services.dataConnect, { organizationId: membership.organization.id });
  const activeOutlets = outlets.data.outlets.filter((item) => item.status === 'ACTIVE');
  const configuredOutletId = typeof window !== 'undefined' ? window.sessionStorage.getItem('omniretail.activeOutletId') : null;
  if (!configuredOutletId) throw new Error('Please select an outlet before completing the sale.');
  const outlet = activeOutlets.find((item) => item.id === configuredOutletId);
  if (!outlet) throw new Error('No active outlet is available for checkout.');
  const receiptNumber = input.orderNumber.replace(/^#/, '');
  const staffName = authorization.data.appUsers[0]?.displayName || authorization.data.appUsers[0]?.username || 'Current cashier';
  const terminalId = typeof window !== 'undefined' ? window.sessionStorage.getItem('omniretail.activeTerminalId')?.trim() || 'POS-01' : 'POS-01';
  await httpsCallable(services.functions, 'completeTenantCheckout')({ organizationId: membership.organization.id, outletId: outlet.id, customerId: input.customer.id || null, receiptNumber, customerName: input.customer.name, staffName, channel: 'POS', terminalId, tenderType: input.paymentMethod === 'cash' || input.paymentMethod === 'fast_cash' ? 'CASH' : input.paymentMethod === 'card' ? 'VISA' : input.paymentMethod === 'digital' ? 'NONE' : 'SPLIT', cashAmount: input.cashAmount ?? 0, tax: input.totals.tax, discount: input.totals.memberDiscount, subtotal: input.totals.subtotal, totalNet: input.totals.totalPayable, lines: input.items.map((item) => ({ productId: item.isCustom ? null : item.product.id, itemName: item.product.name, quantity: item.quantity, unitPrice: item.effectiveRate, subtotal: item.quantity * item.effectiveRate })), requestId: globalThis.crypto.randomUUID() });
}
