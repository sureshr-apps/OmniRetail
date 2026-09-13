export type InventoryStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'OVERSTOCKED';

export type StockStatusTab = 'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'OVERSTOCKED';

export type SortOption =
  | 'STOCK_ASC'
  | 'STOCK_DESC'
  | 'NAME_ASC'
  | 'RETAIL_PRICE_ASC'
  | 'RETAIL_PRICE_DESC'
  | 'MARGIN_DESC';

export interface InventoryLocation {
  id: string;
  name: string;
  code: string;
  subLabel: string;
}

export interface SupplierSummary {
  id: string;
  name: string;
  code: string;
}

export interface InventoryMovementLog {
  id: string;
  type: 'sale' | 'purchase_order' | 'adjustment';
  title: string;
  subtitle: string;
  timeAgo: string;
  delta: number;
  balanceAfter: number;
}

export interface InventoryItem {
  id: string;
  productId?: string;
  sku: string;
  barcode: string;
  name: string;
  department: string;
  category: string;
  imageUrl: string;
  imageAlt?: string;
  locationId: string;
  locationName: string;
  binRack?: string;
  supplierId: string;
  supplierName: string;
  onHandQty: number;
  reorderLevel: number;
  overstockThreshold: number;
  mrp: number;
  cost: number;
  retailPrice: number;
  lotNumber?: string;
  incomingPurchaseOrder?: string;
  badgeMetadata?: string; // e.g., 'Precision Series', 'Serial Tracking', 'Fast Mover'
  recentMovements?: InventoryMovementLog[];
}

export interface InventoryKpiSummary {
  totalValuation: number;
  lowStockCount: number;
  outOfStockCount: number;
  incomingPoCount: number;
}

export interface InventoryTabCounts {
  all: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  overstocked: number;
}

export interface InventoryQuery {
  search?: string;
  statusTab?: StockStatusTab;
  locationId?: string;
  supplierId?: string;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface InventoryQueryResult {
  items: InventoryItem[];
  totalCount: number;
  filteredCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  kpis: InventoryKpiSummary;
  tabCounts: InventoryTabCounts;
}

export type AdjustMode = 'decrease' | 'increase' | 'reconcile';

export interface StockAdjustmentInput {
  itemId: string;
  sku: string;
  mode: AdjustMode;
  quantity: number;
  reasonCode: string;
  storageLocation: string;
  auditNote?: string;
  operatorName: string;
}
