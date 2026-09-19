import { Purchase, PurchaseQuery, PurchaseQueryResult, CreatePurchaseInput, PurchaseReceiptLine, RecordPurchasePaymentInput, PurchaseRefund, PurchaseRefundSummary, RecordPurchaseRefundInput } from '../types';
import { calculateOutstandingAmount, calculatePurchaseTotals, derivePurchasePaymentStatus } from '../utils/calculations';
import { getCurrentUserAuthorization, listTenantPurchases, listTenantOutlets, listTenantSuppliers } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { formatProductCode } from '@/features/products/utils/formatProductCode';
import { validatePurchaseReceiptLines } from '../utils/receiving';
import { mapPurchaseRefund, normalizePurchaseRefundResponse, PurchaseRefundCallableResponse } from '../utils/refunds';

export interface SupplierOption { id: string; name: string; taxId?: string; note?: string; contact?: string; }
export interface OutletOption { id: string; name: string; isOrgWide?: boolean; }

export interface IPurchaseService {
  getPurchases(query?: PurchaseQuery): Promise<PurchaseQueryResult>;
  getPurchase(id: string): Promise<Purchase | null>;
  createPurchase(input: CreatePurchaseInput): Promise<Purchase>;
  cancelPurchase(id: string): Promise<Purchase>;
  closePurchaseWithPartialReceipt(id: string): Promise<Purchase>;
  receiveItems(purchaseId: string, receipts: PurchaseReceiptLine[]): Promise<Purchase>;
  recordPayment(purchaseId: string, input: RecordPurchasePaymentInput): Promise<Purchase>;
  getPurchaseRefunds(purchaseId: string): Promise<{ refunds: PurchaseRefund[]; summary: PurchaseRefundSummary }>;
  recordRefund(purchaseId: string, input: RecordPurchaseRefundInput): Promise<{ refund: PurchaseRefund; summary: PurchaseRefundSummary }>;
  getSuppliers(): Promise<SupplierOption[]>;
  getOutlets(): Promise<OutletOption[]>;
}

type TenantPurchaseRow = Awaited<ReturnType<typeof listTenantPurchases>>['data']['purchases'][number];

function mapTenantPurchase(row: TenantPurchaseRow): Purchase {
  const status = row.status.toLowerCase() as Purchase['status'];
  return {
    id: row.id, purchaseNumber: row.purchaseNumber, purchaseOrderNumber: row.purchaseOrderNumber ?? undefined,
    invoiceNumber: row.invoiceNumber ?? undefined, date: row.purchaseDate, time: '', timestamp: Date.parse(row.purchaseDate),
    supplierId: row.supplier.id, supplierName: row.supplier.name, supplierTaxId: row.supplier.taxId,
    outletId: row.outlet?.id, outletName: row.outlet?.name ?? 'Organization-wide', scope: row.scope as Purchase['scope'],
    items: row.purchaseLines_on_purchase.map((line) => ({ id: line.id, productId: line.product.id, productCode: formatProductCode(line.product.productCode), productName: line.product.name, sku: line.product.sku, quantityOrdered: line.quantityOrdered, quantityReceived: line.quantityReceived, unitCost: line.unitCost, discountPercent: line.discountPercent, taxRate: line.taxRate, taxAmount: line.taxAmount, lineTotal: line.lineTotal })),
    totalUnits: row.purchaseLines_on_purchase.reduce((sum, line) => sum + line.quantityOrdered, 0), subtotal: row.subtotal,
    shippingFee: row.shippingFee, handlingFee: row.handlingFee, tax: row.tax, totalAmount: row.totalAmount, amountPaid: row.amountPaid,
    outstandingAmount: status === 'cancelled' ? 0 : calculateOutstandingAmount(row.totalAmount, row.amountPaid), paymentStatus: derivePurchasePaymentStatus(row.totalAmount, row.amountPaid), receiptStatus: row.receiptStatus,
    payments: row.paymentHistory?.map((payment) => ({ id: payment.id, amount: payment.amount, paymentDate: payment.paymentDate, paymentMethod: payment.paymentMethod, reference: payment.reference ?? undefined, notes: payment.notes ?? undefined, recordedBy: payment.recordedBy, createdAt: payment.createdAt })) ?? [],
    status, receivingNotes: row.receivingNotes ?? undefined,
    batchNumber: row.batchNumber ?? undefined, mfgDate: row.mfgDate ?? undefined, expiryDate: row.expiryDate ?? undefined,
    paymentTerms: row.paymentTerms ?? undefined, createdBy: row.createdBy, creatorRole: '', createdAt: row.createdAt, updatedAt: row.updatedAt,
  };
}

class ProductionPurchaseService implements IPurchaseService {
  private async organizationId(): Promise<string> {
    const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    return membership.organization.id;
  }

  private async all(): Promise<Purchase[]> {
    const organizationId = await this.organizationId();
    const result = await listTenantPurchases(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.purchases.map(mapTenantPurchase);
  }

  async getPurchases(query: PurchaseQuery = { page: 1, pageSize: 10 }): Promise<PurchaseQueryResult> {
    const all = await this.all(); const search = query.search?.trim().toLowerCase() ?? '';
    const parsedStart = query.customStartDate ? Date.parse(query.customStartDate) : Number.NaN;
    const parsedEnd = query.customEndDate ? Date.parse(query.customEndDate) : Number.NaN;
    const periodStart = Number.isFinite(parsedStart) ? parsedStart : -Infinity;
    const periodEnd = Number.isFinite(parsedEnd) ? parsedEnd + 86400000 : Infinity;
    const purchases = all.filter((purchase) => (!search || `${purchase.purchaseNumber} ${purchase.purchaseOrderNumber ?? ''} ${purchase.supplierName} ${purchase.invoiceNumber ?? ''}`.toLowerCase().includes(search)) && (!query.outlet || query.outlet === 'All Outlets' || purchase.outletId === query.outlet || purchase.outletName === query.outlet) && (!query.supplier || query.supplier === 'All Suppliers' || purchase.supplierId === query.supplier || purchase.supplierName === query.supplier) && (!query.paymentStatus || query.paymentStatus === 'ALL' || purchase.paymentStatus === query.paymentStatus) && purchase.timestamp >= periodStart && purchase.timestamp < periodEnd);
    const page = Math.max(1, query.page ?? 1); const pageSize = Math.max(1, query.pageSize ?? 10); const totalPages = Math.max(1, Math.ceil(purchases.length / pageSize)); const validPage = Math.min(page, totalPages); const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
    return { items: purchases.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: purchases.length, filteredCount: purchases.length, page: validPage, pageSize, totalPages, kpis: { totalPurchasesAmount: purchases.reduce((sum, p) => sum + p.totalAmount, 0), totalPurchasesGrowthText: '', pendingReceiptsCount: purchases.filter((p) => p.receiptStatus !== 'RECEIVED').length, urgentStockoutRiskCount: purchases.filter((p) => p.receiptStatus !== 'RECEIVED' && p.outstandingAmount > 0).length, outstandingBalanceAmount: purchases.reduce((sum, p) => sum + p.outstandingAmount, 0), outstandingBalanceDueText: '', purchasesThisMonthAmount: purchases.filter((p) => p.timestamp >= monthStart).reduce((sum, p) => sum + p.totalAmount, 0), transactionsRecordedCount: purchases.length } };
  }

  async getPurchase(id: string): Promise<Purchase | null> { return (await this.all()).find((purchase) => purchase.id === id || purchase.purchaseNumber === id) ?? null; }

  async getSuppliers(): Promise<SupplierOption[]> {
    const organizationId = await this.organizationId(); const result = await listTenantSuppliers(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.suppliers.filter((supplier) => supplier.status === 'ACTIVE').map((supplier) => ({ id: supplier.id, name: supplier.name, taxId: supplier.taxId, contact: supplier.contactPerson }));
  }

  async getOutlets(): Promise<OutletOption[]> {
    const organizationId = await this.organizationId(); const result = await listTenantOutlets(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.outlets.filter((outlet) => outlet.status === 'ACTIVE').map((outlet) => ({ id: outlet.id, name: outlet.name }));
  }

  async createPurchase(input: CreatePurchaseInput): Promise<Purchase> {
    const organizationId = await this.organizationId(); const outletResult = await listTenantOutlets(getFirebaseClientServices().dataConnect, { organizationId });
    const outlet = outletResult.data.outlets.find((candidate) => input.outletId ? candidate.id === input.outletId : candidate.name === input.outletName); if ((!outlet || outlet.status !== 'ACTIVE') && input.scope !== 'organization') throw new Error('Selected outlet was not found or is inactive.');
    const totals = calculatePurchaseTotals(input.items.map((item) => ({ quantity: item.quantity, unitCost: item.unitCost, discountPercent: item.discountPercent, taxRate: item.taxRate })), input.shippingFee, input.handlingFee, input.initialPaymentRecorded);
    const purchaseNumber = input.purchaseOrderNumber ?? `PO-${globalThis.crypto.randomUUID().replaceAll('-', '').slice(0, 16).toUpperCase()}`;
    await httpsCallable(getFirebaseClientServices().functions, 'createTenantPurchaseRecord')({ organizationId, purchaseNumber, purchaseDate: input.purchaseDate, supplierId: input.supplierId, outletId: outlet?.id ?? null, scope: input.scope, paymentTerms: input.paymentTerms, subtotal: totals.subtotal, shippingFee: input.shippingFee, handlingFee: input.handlingFee, tax: totals.totalTax, totalAmount: totals.grandTotal, amountPaid: input.initialPaymentRecorded, outstandingAmount: totals.outstandingAmount, paymentStatus: totals.derivedPaymentStatus, receiptStatus: 'PENDING', status: input.status.toUpperCase(), createdBy: 'Current operator', lines: input.items.map((item) => ({ productId: item.productId, quantity: item.quantity, unitCost: item.unitCost, discountPercent: item.discountPercent, taxRate: item.taxRate, taxAmount: item.quantity * item.unitCost * item.taxRate / 100, lineTotal: item.quantity * item.unitCost * (1 - item.discountPercent / 100) })), requestId: globalThis.crypto.randomUUID() });
    const created = (await this.all()).find((purchase) => purchase.purchaseNumber === purchaseNumber); if (!created) throw new Error('Purchase was created but could not be loaded.'); return created;
  }

  async cancelPurchase(id: string): Promise<Purchase> {
    const purchase = await this.getPurchase(id); if (!purchase) throw new Error('Purchase not found.'); const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'changeTenantPurchaseStatus')({ organizationId, id: purchase.id, status: 'CANCELLED', reason: 'Cancelled by operator', requestId: globalThis.crypto.randomUUID() });
    const updated = await this.getPurchase(id); if (!updated) throw new Error('Purchase was cancelled but could not be loaded.'); return updated;
  }

  async closePurchaseWithPartialReceipt(id: string): Promise<Purchase> {
    const purchase = await this.getPurchase(id);
    if (!purchase) throw new Error('Purchase not found.');
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'closeTenantPurchaseWithPartialReceipt')({
      organizationId,
      purchaseId: purchase.id,
      requestId: globalThis.crypto.randomUUID(),
    });
    const updated = await this.getPurchase(id);
    if (!updated) throw new Error('Purchase was closed but could not be loaded.');
    return updated;
  }

  async receiveItems(purchaseId: string, receipts: PurchaseReceiptLine[]): Promise<Purchase> {
    const purchase = await this.getPurchase(purchaseId); if (!purchase) throw new Error('Purchase not found.'); const organizationId = await this.organizationId(); if (!purchase.outletId) throw new Error('Purchase has no outlet for inventory receipt.');
    const validationError = validatePurchaseReceiptLines(purchase.items, receipts);
    if (validationError) throw new Error(validationError);
    for (const receipt of receipts) {
      const line = purchase.items.find((item) => item.id === receipt.lineId);
      if (!line) throw new Error('Purchase line not found.');
      const pending = Math.max(0, line.quantityOrdered - line.quantityReceived);
      let requested = 0;
      for (const batch of receipt.batches) {
        const quantity = Number(batch.quantity);
        if (!Number.isFinite(quantity) || quantity <= 0) continue;
        requested += quantity;
        if (requested > pending + 0.000001) throw new Error(`Received quantity cannot exceed the pending quantity for ${line.productName}.`);
        await httpsCallable(getFirebaseClientServices().functions, 'receiveTenantPurchaseLineRecord')({ organizationId, purchaseId: purchase.id, lineId: line.id, quantityReceived: quantity, batchNumber: batch.batchNumber.trim() || null, mfgDate: batch.mfgDate || null, expiryDate: batch.expiryDate || null, requestId: globalThis.crypto.randomUUID() });
      }
    }
    const updated = await this.getPurchase(purchaseId); if (!updated) throw new Error('Purchase was received but could not be loaded.'); return updated;
  }

  async recordPayment(purchaseId: string, input: RecordPurchasePaymentInput): Promise<Purchase> {
    const purchase = await this.getPurchase(purchaseId);
    if (!purchase) throw new Error('Purchase not found.');
    if (!Number.isFinite(input.amount) || input.amount <= 0 || input.amount > purchase.outstandingAmount + 0.000001) {
      throw new Error('Payment amount must be greater than zero and cannot exceed the balance due.');
    }
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'recordTenantPurchasePayment')({
      organizationId,
      purchaseId: purchase.id,
      amount: input.amount,
      paymentDate: input.paymentDate,
      paymentMethod: input.paymentMethod,
      reference: input.reference?.trim() || null,
      notes: input.notes?.trim() || null,
      requestId: globalThis.crypto.randomUUID(),
    });
    const updated = await this.getPurchase(purchaseId);
    if (!updated) throw new Error('Payment was recorded but purchase could not be loaded.');
    return updated;
  }

  async getPurchaseRefunds(purchaseId: string): Promise<{ refunds: PurchaseRefund[]; summary: PurchaseRefundSummary }> {
    const purchase = await this.getPurchase(purchaseId);
    if (!purchase) throw new Error('Purchase not found.');
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'listTenantPurchaseRefunds')({
      organizationId,
      purchaseId: purchase.id,
    });
    const data = response.data as { refunds?: unknown[]; summary?: PurchaseRefundSummary };
    return {
      refunds: (data.refunds ?? []).map(mapPurchaseRefund),
      summary: data.summary ?? {
        amountPaid: purchase.amountPaid,
        totalRefunded: 0,
        refundDue: purchase.status === 'cancelled'
          ? purchase.amountPaid
          : purchase.status === 'closed' || purchase.receiptStatus === 'RECEIVED'
            ? Math.max(0, purchase.amountPaid - purchase.totalAmount)
            : 0,
      },
    };
  }

  async recordRefund(purchaseId: string, input: RecordPurchaseRefundInput): Promise<{ refund: PurchaseRefund; summary: PurchaseRefundSummary }> {
    const purchase = await this.getPurchase(purchaseId);
    if (!purchase) throw new Error('Purchase not found.');
    if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error('Refund amount must be greater than zero.');
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'recordTenantPurchaseRefund')({
      organizationId,
      purchaseId: purchase.id,
      amount: input.amount,
      refundDate: input.refundDate,
      refundMethod: input.refundMethod,
      reference: input.reference?.trim() || null,
      notes: input.notes?.trim() || null,
      requestId: globalThis.crypto.randomUUID(),
    });
    return normalizePurchaseRefundResponse(response.data as PurchaseRefundCallableResponse);
  }
}

export const purchaseService: IPurchaseService = new ProductionPurchaseService();
