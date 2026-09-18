import { Purchase, PurchaseQuery, PurchaseQueryResult, CreatePurchaseInput } from '../types';
import { calculatePurchaseTotals } from '../utils/calculations';
import { getCurrentUserAuthorization, listTenantPurchases, listTenantOutlets, listTenantSuppliers } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { formatProductCode } from '@/features/products/utils/formatProductCode';

export interface SupplierOption { id: string; name: string; taxId?: string; note?: string; contact?: string; }
export interface OutletOption { id: string; name: string; isOrgWide?: boolean; }

export interface IPurchaseService {
  getPurchases(query?: PurchaseQuery): Promise<PurchaseQueryResult>;
  getPurchase(id: string): Promise<Purchase | null>;
  createPurchase(input: CreatePurchaseInput): Promise<Purchase>;
  cancelPurchase(id: string): Promise<Purchase>;
  receiveItems(purchaseId: string, receivedCounts: Record<string, number>, batchInfo?: { batchNumber?: string; mfgDate?: string; expiryDate?: string }): Promise<Purchase>;
  getSuppliers(): Promise<SupplierOption[]>;
  getOutlets(): Promise<OutletOption[]>;
}

type TenantPurchaseRow = Awaited<ReturnType<typeof listTenantPurchases>>['data']['purchases'][number];

function mapTenantPurchase(row: TenantPurchaseRow): Purchase {
  return {
    id: row.id, purchaseNumber: row.purchaseNumber, purchaseOrderNumber: row.purchaseOrderNumber ?? undefined,
    invoiceNumber: row.invoiceNumber ?? undefined, date: row.purchaseDate, time: '', timestamp: Date.parse(row.purchaseDate),
    supplierId: row.supplier.id, supplierName: row.supplier.name, supplierTaxId: row.supplier.taxId,
    outletId: row.outlet?.id, outletName: row.outlet?.name ?? 'Organization-wide', scope: row.scope as Purchase['scope'],
    items: row.purchaseLines_on_purchase.map((line) => ({ id: line.id, productId: line.product.id, productCode: formatProductCode(line.product.productCode), productName: line.product.name, sku: line.product.sku, quantityOrdered: line.quantityOrdered, quantityReceived: line.quantityReceived, unitCost: line.unitCost, discountPercent: line.discountPercent, taxRate: line.taxRate, taxAmount: line.taxAmount, lineTotal: line.lineTotal })),
    totalUnits: row.purchaseLines_on_purchase.reduce((sum, line) => sum + line.quantityOrdered, 0), subtotal: row.subtotal,
    shippingFee: row.shippingFee, handlingFee: row.handlingFee, tax: row.tax, totalAmount: row.totalAmount, amountPaid: row.amountPaid,
    outstandingAmount: row.outstandingAmount, paymentStatus: row.paymentStatus, receiptStatus: row.receiptStatus,
    status: row.status.toLowerCase() as Purchase['status'], receivingNotes: row.receivingNotes ?? undefined,
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
    const periodStart = query.datePeriod === 'this_month' || query.datePeriod === 'month_to_date' ? new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime() : query.datePeriod === 'last_30_days' ? Date.now() - 30 * 86400000 : query.datePeriod === 'last_quarter' ? Date.now() - 90 * 86400000 : query.customStartDate ? Date.parse(query.customStartDate) : -Infinity;
    const periodEnd = query.customEndDate ? Date.parse(query.customEndDate) + 86400000 : Infinity;
    const purchases = all.filter((purchase) => (!search || `${purchase.purchaseNumber} ${purchase.purchaseOrderNumber ?? ''} ${purchase.supplierName} ${purchase.invoiceNumber ?? ''}`.toLowerCase().includes(search)) && (!query.outlet || query.outlet === 'All Outlets' || purchase.outletId === query.outlet || purchase.outletName === query.outlet) && (!query.supplier || query.supplier === 'All Suppliers' || purchase.supplierId === query.supplier || purchase.supplierName === query.supplier) && (!query.paymentStatus || query.paymentStatus === 'ALL' || purchase.paymentStatus === query.paymentStatus) && (!query.purchaseStatus || query.purchaseStatus === 'ALL' || query.purchaseStatus === 'ACTIVE_NON_CANCELLED' && purchase.status !== 'cancelled' || purchase.status === query.purchaseStatus) && purchase.timestamp >= periodStart && purchase.timestamp < periodEnd);
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
    const totals = calculatePurchaseTotals(input.items.map((item) => ({ quantity: item.quantity, unitCost: item.unitCost, discountPercent: item.discountPercent, taxRate: item.taxRate })), input.shippingFee, input.handlingFee);
    const purchaseNumber = input.purchaseOrderNumber ?? `PO-${globalThis.crypto.randomUUID().replaceAll('-', '').slice(0, 16).toUpperCase()}`;
    await httpsCallable(getFirebaseClientServices().functions, 'createTenantPurchaseRecord')({ organizationId, purchaseNumber, purchaseDate: input.purchaseDate, supplierId: input.supplierId, outletId: outlet?.id ?? null, scope: input.scope, paymentTerms: input.paymentTerms, subtotal: totals.subtotal, shippingFee: input.shippingFee, handlingFee: input.handlingFee, tax: totals.totalTax, totalAmount: totals.grandTotal, amountPaid: input.initialPaymentRecorded, outstandingAmount: totals.outstandingAmount, paymentStatus: input.paymentOption, receiptStatus: 'PENDING', status: input.status.toUpperCase(), createdBy: 'Current operator', lines: input.items.map((item) => ({ productId: item.productId, quantity: item.quantity, unitCost: item.unitCost, discountPercent: item.discountPercent, taxRate: item.taxRate, taxAmount: item.quantity * item.unitCost * item.taxRate / 100, lineTotal: item.quantity * item.unitCost * (1 - item.discountPercent / 100) })), requestId: globalThis.crypto.randomUUID() });
    const created = (await this.all()).find((purchase) => purchase.purchaseNumber === purchaseNumber); if (!created) throw new Error('Purchase was created but could not be loaded.'); return created;
  }

  async cancelPurchase(id: string): Promise<Purchase> {
    const purchase = await this.getPurchase(id); if (!purchase) throw new Error('Purchase not found.'); const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'changeTenantPurchaseStatus')({ organizationId, id: purchase.id, status: 'CANCELLED', reason: 'Cancelled by operator', requestId: globalThis.crypto.randomUUID() });
    const updated = await this.getPurchase(id); if (!updated) throw new Error('Purchase was cancelled but could not be loaded.'); return updated;
  }

  async receiveItems(purchaseId: string, receivedCounts: Record<string, number>, batchInfo?: { batchNumber?: string; mfgDate?: string; expiryDate?: string }): Promise<Purchase> {
    const purchase = await this.getPurchase(purchaseId); if (!purchase) throw new Error('Purchase not found.'); const organizationId = await this.organizationId(); if (!purchase.outletId) throw new Error('Purchase has no outlet for inventory receipt.');
    for (const line of purchase.items) { const received = receivedCounts[line.id]; if (received === undefined) continue; await httpsCallable(getFirebaseClientServices().functions, 'receiveTenantPurchaseLineRecord')({ organizationId, purchaseId: purchase.id, lineId: line.id, outletId: purchase.outletId, productId: line.productId, quantityReceived: received, receiptStatus: received >= line.quantityOrdered ? 'RECEIVED' : 'PARTIALLY_RECEIVED', batchNumber: batchInfo?.batchNumber, mfgDate: batchInfo?.mfgDate, expiryDate: batchInfo?.expiryDate, requestId: globalThis.crypto.randomUUID() }); }
    const updated = await this.getPurchase(purchaseId); if (!updated) throw new Error('Purchase was received but could not be loaded.'); return updated;
  }
}

export const purchaseService: IPurchaseService = new ProductionPurchaseService();
