export type ProductType = 'stockable' | 'service' | 'consumable';
export type ProductStatus = 'active' | 'inactive';

export interface MultiStoreStockAllocation {
  storeId: string;
  storeName: string;
  locationText: string;
  quantity: number;
  minThreshold: number;
  statusText: string;
  isWarning?: boolean;
}

export interface ProductStockSummary {
  onHandTotal: number;
  reorderLevel: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  storeBreakdown?: MultiStoreStockAllocation[];
}

export interface ProductLedgerActivity {
  id: string;
  title: string;
  reference: string;
  timeAgo: string;
  type: 'sale' | 'replenishment' | 'adjustment';
  units: number;
}

export interface Product {
  id: string;
  productCode: number; // Internal catalogue identifier, e.g., 1024 (displayed as PR-1024)
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string; // e.g. "Apparel / Shirts", "Accessories / Bags", "Service", "Consumables"
  subcategory?: string;
  type: ProductType;
  sku: string; // Sellable stock identifier, e.g., AP-SH-001
  barcode?: string; // External scannable identifier, e.g., 8904512301
  hsnCode?: string;
  unitOfMeasure?: string;
  sellingPrice: number;
  mrp?: number;
  cost?: number;
  minSellingPrice?: number;
  discountAllowed?: boolean;
  taxCategory?: string; // e.g. "GST 12%", "GST 18%", "Tax Exempt"
  status: ProductStatus;
  reorderLevel?: number;
  reorderQuantity?: number;
  openingStock?: number;
  openingStoreOutlet?: string;
  primarySupplier?: string;
  supplierProductCode?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  variantsConfigured?: string;
  stockSummary?: ProductStockSummary;
  recentActivity?: ProductLedgerActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsKpiSummary {
  totalCatalogued: number;
  addedThisFiscalCycle: number;
  inStockCount: number;
  inStockPercentage: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export type StatusFilterOption = 'ALL' | 'ACTIVE' | 'INACTIVE';

export interface ProductQuery {
  search?: string;
  status?: StatusFilterOption;
  category?: string;
  brand?: string;
  type?: ProductType | 'ALL';
  page?: number;
  pageSize?: number;
}

export interface ProductQueryResult {
  items: Product[];
  totalCount: number;
  filteredCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  kpis: ProductsKpiSummary;
}

export interface CreateProductInput {
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  subcategory?: string;
  type: ProductType;
  sku: string;
  barcode?: string;
  hsnCode?: string;
  unitOfMeasure?: string;
  sellingPrice: number;
  mrp?: number;
  cost?: number;
  minSellingPrice?: number;
  discountAllowed?: boolean;
  taxCategory?: string;
  status?: ProductStatus;
  reorderLevel?: number;
  reorderQuantity?: number;
  openingStock?: number;
  openingStoreOutlet?: string;
  primarySupplier?: string;
  supplierProductCode?: string;
  description?: string;
  imageUrl?: string;
  variantsConfigured?: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}
