import { SalesTransaction, SalesFilterQuery, SalesQueryResult, SaleReturnLineInput, SaleReturnResult } from '../types';
import { getCurrentUserAuthorization, listTenantSales } from '@omniretail/sql-connect';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';

export interface ISalesService {
  getSales(query: SalesFilterQuery): Promise<SalesQueryResult>;
  getSale(id: string): Promise<SalesTransaction | null>;
  issueReturn(input: { saleId: string; lines: SaleReturnLineInput[]; reason: string }): Promise<SaleReturnResult>;
}

type TenantSaleRow = Awaited<ReturnType<typeof listTenantSales>>['data']['sales'][number];

function mapTenantSale(row: TenantSaleRow): SalesTransaction {
  const items = row.saleLines_on_sale.map((line) => {
    const returnedQuantity = Number((line as typeof line & { refundedQty?: number | null }).refundedQty ?? 0);
    return { id: line.id, name: line.product?.name ?? line.itemName ?? 'Custom Item', sku: line.product?.sku ?? '', quantity: line.quantity, returnedQuantity, returnableQuantity: Math.max(0, line.quantity - returnedQuantity), unitPrice: line.unitPrice, subtotal: line.subtotal };
  });
  return {
    id: row.id, receiptNumber: row.receiptNumber, source: 'Data Connect', timestamp: row.saleTimestamp,
    displayDate: new Date(row.saleTimestamp).toLocaleDateString(), displayTime: new Date(row.saleTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    customer: { id: row.customer?.id, name: row.customerName, phone: row.customer?.phone ?? undefined, email: row.customer?.email ?? undefined, isWalkIn: !row.customer },
    staff: { id: '', name: row.staffName }, channel: row.channel ?? '', terminalId: row.terminalId, terminalName: row.terminalId,
    items,
    itemsSummary: row.saleLines_on_sale.map((line) => line.product?.name ?? line.itemName ?? 'Custom Item').join(', '),
    skuSummary: row.saleLines_on_sale.map((line) => line.product?.sku ?? '').filter(Boolean).join(', '),
    tender: { type: row.tenderType.toLowerCase() as SalesTransaction['tender']['type'], label: row.tenderType },
    tax: row.tax, taxLabel: '', discount: row.discount, discountLabel: '', subtotal: row.subtotal, totalNet: row.totalNet, status: row.status, shiftNote: undefined,
  };
}

function inSalesDateRange(timestamp: string, query: SalesFilterQuery): boolean {
  const time = Date.parse(timestamp);
  if (!Number.isFinite(time) || !query.dateRange || (query.dateRange === 'custom' && !query.customStartDate && !query.customEndDate)) return true;
  const now = new Date();
  const start = query.dateRange === 'custom' ? (query.customStartDate ? Date.parse(query.customStartDate) : -Infinity) : query.dateRange === 'today' ? new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() : query.dateRange === 'yesterday' ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).getTime() : query.dateRange === 'last7days' ? Date.now() - 7 * 86400000 : new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const end = query.dateRange === 'custom' ? (query.customEndDate ? Date.parse(query.customEndDate) + 86400000 : Infinity) : query.dateRange === 'today' || query.dateRange === 'yesterday' ? start + 86400000 : Infinity;
  return time >= start && time < end;
}

export function matchesSalesFilter(transaction: SalesTransaction, query: SalesFilterQuery): boolean {
  const channel = query.channel?.trim().toLowerCase();
  const paymentMethod = query.paymentMethod?.trim().toLowerCase();
  const status = query.status?.trim().toLowerCase();
  const cashier = query.cashier?.trim().toLowerCase();
  const channelMatches = !channel || channel.startsWith('all ') ||
    (channel.includes('register 01') && transaction.terminalId.toLowerCase() === 'pos-01') ||
    (channel.includes('register 02') && transaction.terminalId.toLowerCase() === 'pos-02') ||
    (channel.includes('online store') && transaction.channel.toLowerCase().includes('online')) ||
    (channel.includes('direct dispatch') && transaction.channel.toLowerCase().includes('dispatch')) ||
    transaction.channel.toLowerCase() === channel || transaction.terminalId.toLowerCase() === channel;
  const paymentMatches = !paymentMethod || paymentMethod.startsWith('all ') || (paymentMethod.includes('visa') && ['visa', 'mastercard'].includes(transaction.tender.type)) || (paymentMethod.includes('cash') && transaction.tender.type === 'cash') || (paymentMethod.includes('split') && transaction.tender.type === 'split') || (paymentMethod.includes('gift') && ['none', 'apple_pay'].includes(transaction.tender.type)) || transaction.tender.type === paymentMethod;
  const statusMatches = !status || status.startsWith('all ') || (status === 'completed' && transaction.status === 'COMPLETED') || (status.includes('partially') && transaction.status === 'PARTIAL_REFUND') || (status.includes('refunded') && transaction.status === 'REFUNDED') || (status.includes('voided') && transaction.status === 'VOIDED');
  const cashierName = cashier?.replace(/\s*\([^)]*\)\s*$/, '');
  const cashierMatches = !cashier || cashier.startsWith('all ') || transaction.staff.id.toLowerCase() === cashier || transaction.staff.name.toLowerCase() === cashier || (!!cashierName && transaction.staff.name.toLowerCase().includes(cashierName));
  const search = query.searchQuery?.trim().toLowerCase() ?? '';
  const searchable = `${transaction.receiptNumber} ${transaction.customer.name} ${transaction.staff.name} ${transaction.itemsSummary} ${transaction.skuSummary}`.toLowerCase();
  return (!search || searchable.includes(search)) && inSalesDateRange(transaction.timestamp, query) && channelMatches && paymentMatches && statusMatches && cashierMatches && (query.minAmount === undefined || transaction.totalNet >= query.minAmount) && (query.maxAmount === undefined || transaction.totalNet <= query.maxAmount);
}

class ProductionSalesService implements ISalesService {
  private async organizationId(): Promise<string> {
    const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    return membership.organization.id;
  }

  private async all(): Promise<SalesTransaction[]> {
    const result = await listTenantSales(getFirebaseClientServices().dataConnect, { organizationId: await this.organizationId() });
    return result.data.sales.map(mapTenantSale);
  }

  async getSales(query: SalesFilterQuery): Promise<SalesQueryResult> {
    const all = await this.all();
    const filtered = all.filter((transaction) => matchesSalesFilter(transaction, query));
    const page = Math.max(1, query.page); const pageSize = Math.max(1, query.pageSize); const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize)); const validPage = Math.min(page, totalPages);
    const cash = filtered.filter((t) => t.tender.type === 'cash'); const cardDigital = filtered.filter((t) => ['visa', 'mastercard', 'apple_pay', 'none'].includes(t.tender.type)); const returns = filtered.filter((t) => ['PARTIAL_REFUND', 'REFUNDED', 'VOIDED'].includes(t.status));
    const yesterday = all.filter((t) => { const d = new Date(t.timestamp); const now = new Date(); return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate() - 1; }).reduce((sum, t) => sum + t.totalNet, 0);
    const today = all.filter((t) => new Date(t.timestamp).toDateString() === new Date().toDateString()).reduce((sum, t) => sum + t.totalNet, 0);
    const kpiTotal = filtered.reduce((sum, t) => sum + t.totalNet, 0); const cashTotal = cash.reduce((sum, t) => sum + t.totalNet, 0); const cardTotal = cardDigital.reduce((sum, t) => sum + t.totalNet, 0);
    return { transactions: filtered.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: filtered.length, page: validPage, pageSize, totalPages, kpis: { filteredSalesTotal: kpiTotal, recordedSalesCount: filtered.length, vsYesterdayPct: yesterday ? Math.round(((today - yesterday) / yesterday) * 1000) / 10 : 0, cashDrawerBalance: 0, cashVolumePct: kpiTotal ? Math.round((cashTotal / kpiTotal) * 1000) / 10 : 0, cardAndDigitalTender: cardTotal, cardCount: cardDigital.length, contactlessCount: filtered.filter((t) => t.tender.type === 'apple_pay').length, cardVolumePct: kpiTotal ? Math.round((cardTotal / kpiTotal) * 1000) / 10 : 0, totalReturnsAndVoids: returns.reduce((sum, t) => sum + t.totalNet, 0), refundEventsCount: returns.length, returnRatePct: filtered.length ? Math.round((returns.length / filtered.length) * 1000) / 10 : 0 } };
  }

  async getSale(id: string): Promise<SalesTransaction | null> { return (await this.all()).find((transaction) => transaction.id === id || transaction.receiptNumber === id) ?? null; }

  async issueReturn(input: { saleId: string; lines: SaleReturnLineInput[]; reason: string }): Promise<SaleReturnResult> {
    const response = await httpsCallable<Record<string, unknown>, SaleReturnResult & { success: boolean }>(getFirebaseClientServices().functions, 'returnTenantSaleRecord')({ organizationId: await this.organizationId(), ...input, requestId: globalThis.crypto.randomUUID() });
    return response.data;
  }
}

export const salesService = new ProductionSalesService();
