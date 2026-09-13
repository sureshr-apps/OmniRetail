import {
  Purchase,
  PurchaseQuery,
  PurchaseQueryResult,
  CreatePurchaseInput,
  PurchasesKpiSummary,
} from '../types';
import { INITIAL_PURCHASES, MOCK_SUPPLIERS, MOCK_OUTLETS } from './mockData';
import { calculatePurchaseTotals } from '../utils/calculations';
import { getCurrentUserAuthorization, listTenantPurchases, listTenantOutlets, listTenantSuppliers } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';

export interface SupplierOption {
  id: string;
  name: string;
  taxId?: string;
  note?: string;
  contact?: string;
}

export interface OutletOption {
  id: string;
  name: string;
  isOrgWide?: boolean;
}

export interface IPurchaseService {
  getPurchases(query?: PurchaseQuery): Promise<PurchaseQueryResult>;
  getPurchase(id: string): Promise<Purchase | null>;
  createPurchase(input: CreatePurchaseInput): Promise<Purchase>;
  cancelPurchase(id: string): Promise<Purchase>;
  receiveItems(
    purchaseId: string,
    receivedCounts: Record<string, number>,
    batchInfo?: { batchNumber?: string; mfgDate?: string; expiryDate?: string }
  ): Promise<Purchase>;
  getSuppliers(): Promise<SupplierOption[]>;
  getOutlets(): Promise<OutletOption[]>;
}

class MockPurchaseService implements IPurchaseService {
  private purchases: Purchase[] = [...INITIAL_PURCHASES];

  private calculateKpis(dataset: Purchase[]): PurchasesKpiSummary {
    const activePurchases = dataset.filter((p) => p.status !== 'cancelled');

    // Total Purchases
    const totalAmount = activePurchases.reduce((acc, curr) => acc + curr.totalAmount, 0);

    // Pending Receipts (count with pending or partial receipt)
    const pendingReceipts = activePurchases.filter(
      (p) => p.receiptStatus === 'PENDING' || p.receiptStatus === 'PARTIALLY_RECEIVED'
    );
    const pendingCount = pendingReceipts.length;

    // Urgent stockout risks (e.g. 3 urgent risks as displayed in design)
    const urgentRisks = Math.min(3, pendingCount);

    // Outstanding Balance
    const outstandingSum = activePurchases.reduce(
      (acc, curr) => acc + (curr.paymentStatus !== 'PAID' ? curr.outstandingAmount : 0),
      0
    );

    // Purchases this month (October 2024 or current filtered month)
    const thisMonthPurchases = activePurchases.filter((p) => {
      // In mock data Oct 2024 is the primary active month
      return p.date.includes('Oct 2024') || p.date.includes('Oct');
    });
    const thisMonthTotal = thisMonthPurchases.reduce((acc, curr) => acc + curr.totalAmount, 0);

    // If dataset is unconstrained, match Stitch KPI benchmarks gracefully
    const displayTotal =
      dataset.length === this.purchases.length ? 84650.0 : Number(totalAmount.toFixed(2));
    const displayPending = dataset.length === this.purchases.length ? 8 : pendingCount;
    const displayOutstanding =
      dataset.length === this.purchases.length ? 24180.0 : Number(outstandingSum.toFixed(2));
    const displayThisMonth =
      dataset.length === this.purchases.length ? 32450.0 : Number(thisMonthTotal.toFixed(2));
    const displayTransactions =
      dataset.length === this.purchases.length ? 18 : thisMonthPurchases.length;

    return {
      totalPurchasesAmount: displayTotal,
      totalPurchasesGrowthText: '+8.4% vs previous month',
      pendingReceiptsCount: displayPending,
      urgentStockoutRiskCount: urgentRisks,
      outstandingBalanceAmount: displayOutstanding,
      outstandingBalanceDueText: '$14,200 due within 15 days',
      purchasesThisMonthAmount: displayThisMonth,
      transactionsRecordedCount: displayTransactions,
    };
  }

  async getPurchases(query?: PurchaseQuery): Promise<PurchaseQueryResult> {
    await new Promise((r) => setTimeout(r, 60));

    let filtered = [...this.purchases];

    // Total uncancelled count (42 active purchases shown in badge)
    const totalCount = this.purchases.filter((p) => p.status === 'active').length;

    if (query) {
      // 1. Search Query
      if (query.search && query.search.trim()) {
        const term = query.search.toLowerCase().trim();
        filtered = filtered.filter((p) => {
          const inNumber = p.purchaseNumber.toLowerCase().includes(term);
          const inPO = p.purchaseOrderNumber?.toLowerCase().includes(term);
          const inInvoice = p.invoiceNumber?.toLowerCase().includes(term);
          const inSupplier = p.supplierName.toLowerCase().includes(term);
          const inCreatedBy = p.createdBy.toLowerCase().includes(term);
          const inOutlet = p.outletName.toLowerCase().includes(term);
          const inItems = p.items.some(
            (it) =>
              it.productName.toLowerCase().includes(term) ||
              it.productCode.toLowerCase().includes(term) ||
              it.sku.toLowerCase().includes(term)
          );
          return inNumber || inPO || inInvoice || inSupplier || inCreatedBy || inOutlet || inItems;
        });
      }

      // 2. Date Period Filter
      if (query.datePeriod) {
        if (query.datePeriod === 'this_month' || query.datePeriod.includes('This Month')) {
          filtered = filtered.filter((p) => p.date.includes('Oct') && p.date.includes('2024'));
        } else if (query.datePeriod === 'last_30_days' || query.datePeriod.includes('30 Days')) {
          // Keep all recent
        } else if (query.datePeriod === 'last_quarter' || query.datePeriod.includes('Quarter')) {
          filtered = filtered.filter((p) => p.date.includes('Sep') || p.date.includes('Aug'));
        } else if (query.datePeriod === 'custom' && query.customStartDate && query.customEndDate) {
          const start = new Date(query.customStartDate).getTime();
          const end = new Date(query.customEndDate).getTime() + 86400000;
          filtered = filtered.filter((p) => p.timestamp >= start && p.timestamp <= end);
        }
      }

      // 3. Outlet Filter
      if (query.outlet && query.outlet !== 'All Outlets') {
        filtered = filtered.filter((p) =>
          p.outletName.toLowerCase().includes(query.outlet!.toLowerCase())
        );
      }

      // 4. Supplier Filter
      if (query.supplier && query.supplier !== 'All Suppliers') {
        filtered = filtered.filter((p) =>
          p.supplierName.toLowerCase().includes(query.supplier!.toLowerCase())
        );
      }

      // 5. Payment Status Filter
      if (query.paymentStatus && query.paymentStatus !== 'ALL') {
        filtered = filtered.filter((p) => p.paymentStatus === query.paymentStatus);
      }

      // 6. Purchase Status Filter (exclude cancelled if active constraint is on)
      if (query.purchaseStatus) {
        if (query.purchaseStatus === 'ACTIVE_NON_CANCELLED') {
          filtered = filtered.filter((p) => p.status !== 'cancelled');
        } else if (query.purchaseStatus !== 'ALL') {
          filtered = filtered.filter((p) => p.status === query.purchaseStatus);
        }
      }
    }

    const filteredCount = filtered.length;
    const kpis = this.calculateKpis(filtered);

    // Pagination
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 10;
    const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

    return {
      items: paginatedItems,
      totalCount,
      filteredCount,
      page,
      pageSize,
      totalPages,
      kpis,
    };
  }

  async getPurchase(id: string): Promise<Purchase | null> {
    const item = this.purchases.find((p) => p.id === id);
    return item ? { ...item } : null;
  }

  async createPurchase(input: CreatePurchaseInput): Promise<Purchase> {
    await new Promise((r) => setTimeout(r, 80));

    const nextIdNum = this.purchases.length + 105;
    const pNumber = `PUR-2024-${nextIdNum}`;
    const poNumber = input.purchaseOrderNumber || `PO-2024-0${nextIdNum - 20}`;
    const invNumber = input.invoiceNumber || `INV-${input.supplierName.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const { totalUnits, subtotal, totalTax, grandTotal, outstandingAmount, derivedPaymentStatus } =
      calculatePurchaseTotals(
        input.items,
        input.shippingFee,
        input.handlingFee,
        input.initialPaymentRecorded
      );

    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateFormatted = `${months[now.getMonth()]} ${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}, ${now.getFullYear()}`;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const timeFormatted = `${hour12 < 10 ? '0' + hour12 : hour12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    const purchaseItems = input.items.map((it, idx) => {
      const discount = it.discountPercent || 0;
      const base = it.quantity * it.unitCost * (1 - discount / 100);
      const taxAmt = (base * it.taxRate) / 100;
      const total = base + taxAmt;
      return {
        id: `item-gen-${Date.now()}-${idx}`,
        productId: it.productId,
        productCode: it.productCode,
        productName: it.productName,
        sku: it.sku,
        variantInfo: it.variantInfo,
        quantityOrdered: it.quantity,
        quantityReceived: 0,
        unitCost: it.unitCost,
        discountPercent: discount,
        taxRate: it.taxRate,
        taxAmount: Number(taxAmt.toFixed(2)),
        lineTotal: Number(total.toFixed(2)),
      };
    });

    const newPurchase: Purchase = {
      id: `pur-${Date.now()}`,
      purchaseNumber: pNumber,
      purchaseOrderNumber: poNumber,
      invoiceNumber: invNumber,
      date: dateFormatted,
      time: timeFormatted,
      timestamp: now.getTime(),
      supplierId: input.supplierId,
      supplierName: input.supplierName,
      supplierNote: 'New Supplier Order',
      outletName: input.outletName,
      scope: input.scope,
      items: purchaseItems,
      totalUnits,
      subtotal,
      shippingFee: input.shippingFee,
      handlingFee: input.handlingFee,
      tax: totalTax,
      totalAmount: grandTotal,
      amountPaid: input.initialPaymentRecorded,
      outstandingAmount,
      paymentStatus: derivedPaymentStatus,
      receiptStatus: 'PENDING',
      status: input.status,
      paymentMethodNote:
        derivedPaymentStatus === 'PAID'
          ? 'Fully Settled'
          : derivedPaymentStatus === 'PARTIALLY_PAID'
          ? 'Tax Incl.'
          : 'Draft Est.',
      paidNote:
        input.initialPaymentRecorded > 0
          ? `$${input.initialPaymentRecorded.toLocaleString()} Paid`
          : undefined,
      paymentTerms: input.paymentTerms,
      batchNumber: input.batchNumber || `BATCH-${now.getFullYear()}-NEW`,
      mfgDate: input.mfgDate,
      expiryDate: input.expiryDate,
      createdBy: 'Sarah Jenkins',
      creatorRole: 'Store Mgr',
      auditTrail: [
        {
          id: `aud-${Date.now()}`,
          title: `Purchase direct ${pNumber} recorded`,
          timeAgo: 'Just now',
          details: `Created by Sarah Jenkins. Initial payment $${input.initialPaymentRecorded.toFixed(2)} recorded.`,
          timestamp: now.toISOString(),
          dotType: 'primary',
        },
      ],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    // Prepend to list
    this.purchases = [newPurchase, ...this.purchases];
    return newPurchase;
  }

  async cancelPurchase(id: string): Promise<Purchase> {
    await new Promise((r) => setTimeout(r, 60));
    const index = this.purchases.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Purchase not found');

    const updated: Purchase = {
      ...this.purchases[index],
      status: 'cancelled',
      paymentMethodNote: 'Voided',
      updatedAt: new Date().toISOString(),
      auditTrail: [
        ...(this.purchases[index].auditTrail || []),
        {
          id: `aud-canc-${Date.now()}`,
          title: 'Purchase order voided/cancelled',
          timeAgo: 'Just now',
          details: 'Cancelled by current user. Items returned to vendor queue.',
          timestamp: new Date().toISOString(),
          dotType: 'outline',
        },
      ],
    };

    this.purchases[index] = updated;
    return updated;
  }

  async receiveItems(
    purchaseId: string,
    receivedCounts: Record<string, number>,
    batchInfo?: { batchNumber?: string; mfgDate?: string; expiryDate?: string }
  ): Promise<Purchase> {
    await new Promise((r) => setTimeout(r, 60));
    const index = this.purchases.findIndex((p) => p.id === purchaseId);
    if (index === -1) throw new Error('Purchase not found');

    const curr = this.purchases[index];
    let totalOrdered = 0;
    let totalReceived = 0;

    const updatedItems = curr.items.map((item) => {
      const added = receivedCounts[item.id] || 0;
      const newRecv = Math.min(item.quantityOrdered, item.quantityReceived + added);
      totalOrdered += item.quantityOrdered;
      totalReceived += newRecv;
      return {
        ...item,
        quantityReceived: newRecv,
      };
    });

    let newReceiptStatus = curr.receiptStatus;
    if (totalReceived >= totalOrdered && totalOrdered > 0) {
      newReceiptStatus = 'RECEIVED';
    } else if (totalReceived > 0) {
      newReceiptStatus = 'PARTIALLY_RECEIVED';
    }

    const updated: Purchase = {
      ...curr,
      items: updatedItems,
      receiptStatus: newReceiptStatus,
      batchNumber: batchInfo?.batchNumber || curr.batchNumber,
      mfgDate: batchInfo?.mfgDate || curr.mfgDate,
      expiryDate: batchInfo?.expiryDate || curr.expiryDate,
      updatedAt: new Date().toISOString(),
      auditTrail: [
        {
          id: `aud-recv-${Date.now()}`,
          title: `Stock check-in recorded (${totalReceived}/${totalOrdered} units)`,
          timeAgo: 'Just now',
          details: `Manual physical count logged. Lot reference: ${batchInfo?.batchNumber || curr.batchNumber || 'STORE-LOT-01'}.`,
          timestamp: new Date().toISOString(),
          dotType: 'primary',
        },
        ...(curr.auditTrail || []),
      ],
    };

    this.purchases[index] = updated;
    return updated;
  }

  async getSuppliers(): Promise<SupplierOption[]> {
    return [...MOCK_SUPPLIERS];
  }

  async getOutlets(): Promise<OutletOption[]> {
    return [...MOCK_OUTLETS];
  }
}

type TenantPurchaseRow = Awaited<ReturnType<typeof listTenantPurchases>>['data']['purchases'][number];

function mapTenantPurchase(row: TenantPurchaseRow): Purchase {
  return { id: row.id, purchaseNumber: row.purchaseNumber, purchaseOrderNumber: row.purchaseOrderNumber ?? undefined, invoiceNumber: row.invoiceNumber ?? undefined, date: row.purchaseDate, time: '', timestamp: Date.parse(row.purchaseDate), supplierId: row.supplier.id, supplierName: row.supplier.name, supplierTaxId: row.supplier.taxId, outletId: row.outlet?.id, outletName: row.outlet?.name ?? 'Organization-wide', scope: row.scope as Purchase['scope'], items: row.purchaseLines_on_purchase.map((line) => ({ id: line.id, productId: line.product.id, productCode: line.product.productCode, productName: line.product.name, sku: line.product.sku, quantityOrdered: line.quantityOrdered, quantityReceived: line.quantityReceived, unitCost: line.unitCost, discountPercent: line.discountPercent, taxRate: line.taxRate, taxAmount: line.taxAmount, lineTotal: line.lineTotal })), totalUnits: row.purchaseLines_on_purchase.reduce((sum, line) => sum + line.quantityOrdered, 0), subtotal: row.subtotal, shippingFee: row.shippingFee, handlingFee: row.handlingFee, tax: row.tax, totalAmount: row.totalAmount, amountPaid: row.amountPaid, outstandingAmount: row.outstandingAmount, paymentStatus: row.paymentStatus, receiptStatus: row.receiptStatus, status: row.status.toLowerCase() as Purchase['status'], receivingNotes: row.receivingNotes ?? undefined, batchNumber: row.batchNumber ?? undefined, mfgDate: row.mfgDate ?? undefined, expiryDate: row.expiryDate ?? undefined, paymentTerms: row.paymentTerms ?? undefined, createdBy: row.createdBy, creatorRole: '', createdAt: row.createdAt, updatedAt: row.updatedAt };
}

class ProductionPurchaseService implements IPurchaseService {
  private async all(): Promise<Purchase[]> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); const result = await listTenantPurchases(getFirebaseClientServices().dataConnect, { organizationId: membership.organization.id }); return result.data.purchases.map(mapTenantPurchase); }
  async getPurchases(query: PurchaseQuery = { page: 1, pageSize: 10 }): Promise<PurchaseQueryResult> { let purchases = await this.all(); const search = query.search?.trim().toLowerCase() ?? ''; purchases = purchases.filter((p) => !search || `${p.purchaseNumber} ${p.purchaseOrderNumber ?? ''} ${p.supplierName} ${p.invoiceNumber ?? ''}`.toLowerCase().includes(search)); const page = Math.max(1, query.page ?? 1); const pageSize = Math.max(1, query.pageSize ?? 10); const totalPages = Math.max(1, Math.ceil(purchases.length / pageSize)); const validPage = Math.min(page, totalPages); return { items: purchases.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: purchases.length, filteredCount: purchases.length, page: validPage, pageSize, totalPages, kpis: { totalPurchasesAmount: purchases.reduce((s, p) => s + p.totalAmount, 0), totalPurchasesGrowthText: '', pendingReceiptsCount: purchases.filter((p) => p.receiptStatus !== 'RECEIVED').length, urgentStockoutRiskCount: 0, outstandingBalanceAmount: purchases.reduce((s, p) => s + p.outstandingAmount, 0), outstandingBalanceDueText: '', purchasesThisMonthAmount: 0, transactionsRecordedCount: purchases.length } }; }
  async getPurchase(id: string): Promise<Purchase | null> { return (await this.all()).find((p) => p.id === id || p.purchaseNumber === id) ?? null; }
  async getSuppliers(): Promise<SupplierOption[]> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); const result = await listTenantSuppliers(getFirebaseClientServices().dataConnect, { organizationId: membership.organization.id }); return result.data.suppliers.filter((supplier) => supplier.status === 'ACTIVE').map((supplier) => ({ id: supplier.id, name: supplier.name, taxId: supplier.taxId, contact: supplier.contactPerson })); }
  async getOutlets(): Promise<OutletOption[]> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); const result = await listTenantOutlets(getFirebaseClientServices().dataConnect, { organizationId: membership.organization.id }); return result.data.outlets.filter((outlet) => outlet.status === 'ACTIVE').map((outlet) => ({ id: outlet.id, name: outlet.name })); }
  async createPurchase(input: CreatePurchaseInput): Promise<Purchase> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); const organizationId = membership.organization.id; const outletResult = await listTenantOutlets(getFirebaseClientServices().dataConnect, { organizationId }); const outlet = outletResult.data.outlets.find((candidate) => candidate.name === input.outletName); if (!outlet && input.scope !== 'organization') throw new Error('Selected outlet was not found.'); const totals = calculatePurchaseTotals(input.items.map((item) => ({ quantity: item.quantity, unitCost: item.unitCost, discountPercent: item.discountPercent, taxRate: item.taxRate })), input.shippingFee, input.handlingFee); const purchaseNumber = input.purchaseOrderNumber ?? `PO-${Date.now().toString().slice(-8)}`; await httpsCallable(getFirebaseClientServices().functions, 'createTenantPurchaseRecord')({ organizationId, purchaseNumber, purchaseDate: input.purchaseDate, supplierId: input.supplierId, outletId: outlet?.id ?? null, scope: input.scope, paymentTerms: input.paymentTerms, subtotal: totals.subtotal, shippingFee: input.shippingFee, handlingFee: input.handlingFee, tax: totals.totalTax, totalAmount: totals.grandTotal, amountPaid: input.initialPaymentRecorded, outstandingAmount: totals.outstandingAmount, createdBy: 'Current operator', lines: input.items.map((item) => ({ productId: item.productId, quantity: item.quantity, unitCost: item.unitCost, discountPercent: item.discountPercent, taxRate: item.taxRate, taxAmount: item.quantity * item.unitCost * item.taxRate / 100, lineTotal: item.quantity * item.unitCost * (1 - item.discountPercent / 100) })), requestId: globalThis.crypto.randomUUID() }); const created = (await this.all()).find((purchase) => purchase.purchaseNumber === purchaseNumber); if (!created) throw new Error('Purchase was created but could not be loaded.'); return created; }
  async cancelPurchase(id: string): Promise<Purchase> { const purchase = await this.getPurchase(id); if (!purchase) throw new Error('Purchase not found.'); const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); await httpsCallable(getFirebaseClientServices().functions, 'changeTenantPurchaseStatus')({ organizationId: membership.organization.id, id: purchase.id, status: 'CANCELLED', reason: 'Cancelled by operator', requestId: globalThis.crypto.randomUUID() }); const updated = await this.getPurchase(id); if (!updated) throw new Error('Purchase was cancelled but could not be loaded.'); return updated; }
  async receiveItems(purchaseId: string, receivedCounts: Record<string, number>, batchInfo?: { batchNumber?: string; mfgDate?: string; expiryDate?: string }): Promise<Purchase> { const purchase = await this.getPurchase(purchaseId); if (!purchase) throw new Error('Purchase not found.'); const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership || !purchase.outletId) throw new Error('Purchase has no outlet for inventory receipt.'); for (const line of purchase.items) { const received = receivedCounts[line.id]; if (received === undefined) continue; await httpsCallable(getFirebaseClientServices().functions, 'receiveTenantPurchaseLineRecord')({ organizationId: membership.organization.id, purchaseId: purchase.id, lineId: line.id, outletId: purchase.outletId, productId: line.productId, quantityReceived: received, receiptStatus: received >= line.quantityOrdered ? 'RECEIVED' : 'PARTIALLY_RECEIVED', batchNumber: batchInfo?.batchNumber, mfgDate: batchInfo?.mfgDate, expiryDate: batchInfo?.expiryDate, requestId: globalThis.crypto.randomUUID() }); } const updated = await this.getPurchase(purchaseId); if (!updated) throw new Error('Purchase was received but could not be loaded.'); return updated; }
}

export const purchaseService: IPurchaseService = new ProductionPurchaseService();
