import { InventoryItem, InventoryQuery, InventoryQueryResult, InventoryStatus, StockAdjustmentInput, InventoryLocation, SupplierSummary } from '../types';
import { getCurrentUserAuthorization, listTenantInventory } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { productService } from '@/features/products/services/productService';
import { outletService } from '@/features/outlets/services/outletService';
import { formatOutletCode } from '@/features/outlets/utils/formatOutletCode';
import { supplierService } from '@/features/suppliers/services/supplierService';
import { formatSupplierCode } from '@/features/suppliers/utils/formatSupplierCode';

export async function getInventoryLocations(): Promise<InventoryLocation[]> {
  const outlets = await outletService.getAllActiveOutlets();
  return [{ id: 'all', name: 'All Locations', code: 'ALL', subLabel: 'All active outlets' }, ...outlets.map((outlet) => ({ id: outlet.id, name: outlet.name, code: formatOutletCode(outlet.outletCode), subLabel: formatOutletCode(outlet.outletCode) }))];
}

export async function getInventorySuppliers(): Promise<SupplierSummary[]> {
  const result = await supplierService.getSuppliers({ page: 1, pageSize: 1000 });
  return [{ id: 'all', name: 'All Suppliers', code: 'ALL' }, ...result.items.map((supplier) => ({ id: supplier.id, name: supplier.name, code: formatSupplierCode(supplier.supplierCode) }))];
}

export function deriveStockStatus(onHandQty: number, reorderLevel: number, overstockThreshold: number): InventoryStatus {
  if (onHandQty === 0) return 'OUT_OF_STOCK';
  if (onHandQty > 0 && onHandQty <= reorderLevel) return 'LOW_STOCK';
  if (onHandQty >= overstockThreshold) return 'OVERSTOCKED';
  return 'IN_STOCK';
}

export function calculateMarginPercent(retailPrice: number, cost: number): number {
  if (retailPrice <= 0) return 0;
  return Math.round(((retailPrice - cost) / retailPrice) * 1000) / 10;
}

type TenantInventoryRow = Awaited<ReturnType<typeof listTenantInventory>>['data']['inventoryStocks'][number];

function mapTenantInventory(row: TenantInventoryRow): InventoryItem {
  return {
    id: String(row._id), productId: row.product.id, sku: row.product.sku, barcode: row.product.barcode ?? '', name: row.product.name,
    department: row.product.brand, category: row.product.category.value, imageUrl: '', locationId: row.outlet.id, locationName: row.outlet.name,
    supplierId: row.product.primarySupplier ?? '', supplierName: row.product.primarySupplier ?? row.product.brand, binRack: row.binRack ?? undefined,
    onHandQty: row.onHandQty, reorderLevel: row.reorderLevel, overstockThreshold: row.overstockThreshold, mrp: row.product.sellingPrice,
    cost: row.product.cost ?? 0, retailPrice: row.product.sellingPrice, incomingPurchaseOrder: row.incomingPurchaseOrder ?? undefined,
  };
}

class ProductionInventoryService {
  private async organizationId(): Promise<string> {
    const result = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = result.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    return membership.organization.id;
  }

  private async all(query: InventoryQuery = {}): Promise<InventoryItem[]> {
    const organizationId = await this.organizationId(); const outletId = query.locationId && query.locationId !== 'all' ? query.locationId : undefined;
    const result = outletId ? await listTenantInventory(getFirebaseClientServices().dataConnect, { organizationId, outletId }) : await listTenantInventory(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.inventoryStocks.map(mapTenantInventory);
  }

  async getInventory(query: InventoryQuery = {}): Promise<InventoryQueryResult> {
    let items = await this.all(query); const search = query.search?.trim().toLowerCase() ?? '';
    if (search) items = items.filter((item) => `${item.sku} ${item.name} ${item.barcode} ${item.department} ${item.lotNumber ?? ''}`.toLowerCase().includes(search));
    if (query.supplierId && query.supplierId !== 'all') { const supplier = await supplierService.getSupplierById(query.supplierId); const names = new Set([query.supplierId, supplier?.name, supplier ? formatSupplierCode(supplier.supplierCode) : undefined].filter(Boolean)); items = items.filter((item) => names.has(item.supplierId) || names.has(item.supplierName)); }
    const countsSource = items;
    if (query.statusTab && query.statusTab !== 'ALL') items = items.filter((item) => deriveStockStatus(item.onHandQty, item.reorderLevel, item.overstockThreshold) === query.statusTab);
    items.sort((a, b) => query.sort === 'NAME_ASC' ? a.name.localeCompare(b.name) : query.sort === 'STOCK_DESC' ? b.onHandQty - a.onHandQty : a.onHandQty - b.onHandQty);
    const counts = { all: countsSource.length, inStock: 0, lowStock: 0, outOfStock: 0, overstocked: 0 };
    countsSource.forEach((item) => { const status = deriveStockStatus(item.onHandQty, item.reorderLevel, item.overstockThreshold); if (status === 'IN_STOCK') counts.inStock++; else if (status === 'LOW_STOCK') counts.lowStock++; else if (status === 'OUT_OF_STOCK') counts.outOfStock++; else counts.overstocked++; });
    const page = Math.max(1, query.page ?? 1); const pageSize = Math.max(1, query.pageSize ?? 25); const totalPages = Math.max(1, Math.ceil(items.length / pageSize)); const validPage = Math.min(page, totalPages);
    return { items: items.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: items.length, filteredCount: items.length, page: validPage, pageSize, totalPages, tabCounts: counts, kpis: { totalValuation: items.reduce((sum, item) => sum + item.onHandQty * item.cost, 0), lowStockCount: counts.lowStock, outOfStockCount: counts.outOfStock, incomingPoCount: items.filter((item) => item.incomingPurchaseOrder).length } };
  }

  async getInventoryItem(id: string): Promise<InventoryItem | null> { return (await this.all()).find((item) => item.id === id || item.sku === id) ?? null; }

  async addProduct(newItem: Partial<InventoryItem>): Promise<InventoryItem> {
    const organizationId = await this.organizationId(); const outlets = await outletService.getAllActiveOutlets(); const outlet = outlets.find((candidate) => candidate.id === newItem.locationId || candidate.name === newItem.locationName);
    if (!outlet) throw new Error('Select an active outlet before creating inventory.'); const name = newItem.name?.trim(); const sku = newItem.sku?.trim(); if (!name || !sku) throw new Error('Product name and SKU are required.');
    const created = await productService.createProduct({ name, brand: newItem.department?.trim() || 'General', categoryName: newItem.category?.trim() || 'General', type: 'stockable', sku, barcode: newItem.barcode?.trim() || undefined, sellingPrice: newItem.retailPrice ?? 0, mrp: newItem.mrp ?? newItem.retailPrice ?? 0, cost: newItem.cost ?? 0, reorderLevel: newItem.reorderLevel ?? 0, reorderQuantity: 0 });
    await httpsCallable(getFirebaseClientServices().functions, 'createTenantInventoryStockRecord')({ organizationId, outletId: outlet.id, productId: created.id, onHandQty: newItem.onHandQty ?? 0, reorderLevel: newItem.reorderLevel ?? 0, overstockThreshold: newItem.overstockThreshold ?? Math.max(100, (newItem.reorderLevel ?? 0) * 10), requestId: globalThis.crypto.randomUUID() });
    const inventory = (await this.all({ locationId: outlet.id })).find((item) => item.productId === created.id); if (!inventory) throw new Error('Inventory was created but could not be loaded.'); return inventory;
  }

  async adjustStock(input: StockAdjustmentInput): Promise<{ item: InventoryItem; previousQty: number; newQty: number }> {
    const item = await this.getInventoryItem(input.itemId) ?? await this.getInventoryItem(input.sku); if (!item?.productId) throw new Error(`Item with SKU ${input.sku} not found`);
    const organizationId = await this.organizationId(); const previousQty = item.onHandQty; const newQty = input.mode === 'increase' ? previousQty + input.quantity : input.mode === 'decrease' ? Math.max(0, previousQty - input.quantity) : Math.max(0, input.quantity);
    await httpsCallable(getFirebaseClientServices().functions, 'adjustTenantInventoryStock')({ organizationId, outletId: item.locationId, productId: item.productId, mode: input.mode.toUpperCase(), quantity: input.quantity, previousQty, newQty, reasonCode: input.reasonCode, auditNote: input.auditNote ?? null, requestId: globalThis.crypto.randomUUID() });
    const updated = await this.getInventoryItem(input.itemId); if (!updated) throw new Error('Inventory was adjusted but could not be loaded.'); return { item: updated, previousQty, newQty };
  }
}

export const inventoryService = new ProductionInventoryService();
