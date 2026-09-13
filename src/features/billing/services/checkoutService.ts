import { getCurrentUserAuthorization, listTenantOutlets } from '@omniretail/sql-connect';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { CartItem, Customer, OrderTotals, PaymentMethod } from '../types';

export async function completeTenantCheckout(input: { orderNumber: string; items: CartItem[]; customer: Customer; totals: OrderTotals; paymentMethod: PaymentMethod }): Promise<void> {
  const services = getFirebaseClientServices();
  const authorization = await getCurrentUserAuthorization(services.dataConnect);
  const membership = authorization.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
  if (!membership) throw new Error('No active organization membership.');
  const outlets = await listTenantOutlets(services.dataConnect, { organizationId: membership.organization.id });
  const outlet = outlets.data.outlets.find((item) => item.status === 'ACTIVE');
  if (!outlet) throw new Error('No active outlet is available for checkout.');
  const receiptNumber = input.orderNumber.replace(/^#/, '');
  const sale = await httpsCallable(services.functions, 'completeTenantSale')({ organizationId: membership.organization.id, outletId: outlet.id, customerId: undefined, receiptNumber, customerName: input.customer.name, staffName: 'Current cashier', channel: 'POS', terminalId: 'POS-01', tenderType: input.paymentMethod === 'cash' || input.paymentMethod === 'fast_cash' ? 'CASH' : input.paymentMethod === 'card' ? 'VISA' : input.paymentMethod === 'digital' ? 'NONE' : 'SPLIT', tax: input.totals.tax, discount: input.totals.memberDiscount, subtotal: input.totals.subtotal, totalNet: input.totals.totalPayable, requestId: globalThis.crypto.randomUUID() });
  const saleId = (sale.data as { saleId?: string }).saleId;
  if (!saleId) throw new Error('Sale was created without an identifier.');
  try {
    for (const item of input.items) {
      await httpsCallable(services.functions, 'addTenantSaleLineRecord')({ organizationId: membership.organization.id, saleId, outletId: outlet.id, productId: item.product.id, quantity: item.quantity, unitPrice: item.effectiveRate, subtotal: item.quantity * item.effectiveRate, requestId: globalThis.crypto.randomUUID() });
    }
  } catch (error) {
    await httpsCallable(services.functions, 'voidTenantSaleRecord')({ organizationId: membership.organization.id, saleId, reason: 'Checkout line persistence failed', requestId: globalThis.crypto.randomUUID() }).catch(() => undefined);
    throw error;
  }
}
