import {
  Product,
  ProductQuery,
  ProductQueryResult,
  CreateProductInput,
  UpdateProductInput,
  ProductStatus,
  ProductType,
  ProductsKpiSummary,
} from '../types';
import { INITIAL_PRODUCTS } from './mockData';
import { getCurrentUserAuthorization, listTenantProducts } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { assertCallableEntity } from '@/shared/utils/callableResponse';

export interface IProductService {
  getAllProducts(): Promise<Product[]>;
  getProducts(query?: ProductQuery): Promise<ProductQueryResult>;
  getProduct(id: string): Promise<Product | null>;
  createProduct(input: CreateProductInput): Promise<Product>;
  updateProduct(id: string, input: UpdateProductInput): Promise<Product>;
  changeProductStatus(id: string, status: ProductStatus): Promise<Product>;
  checkSkuUnique(sku: string, excludeId?: string): Promise<boolean>;
  checkBarcodeUnique(barcode?: string, excludeId?: string): Promise<boolean>;
  getNextProductCode(): Promise<string>;
  getCategories(): Promise<string[]>;
  getBrands(): Promise<string[]>;
}

class MockProductService implements IProductService {
  private products: Product[] = [...INITIAL_PRODUCTS];

  public async getAllProducts(): Promise<Product[]> {
    return [...this.products];
  }

  private calculateKpis(): ProductsKpiSummary {
    const total = this.products.length;
    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;
    let stockableCount = 0;

    for (const p of this.products) {
      if (p.type === 'service') {
        // Services are always fulfilled on demand, counted as in-stock catalog availability
        inStock++;
        continue;
      }

      stockableCount++;
      const stock = p.stockSummary;
      if (!stock || stock.onHandTotal === 0) {
        outOfStock++;
      } else if (stock.onHandTotal <= (stock.reorderLevel || 10)) {
        lowStock++;
      } else {
        inStock++;
      }
    }

    const pct = total > 0 ? Number(((inStock / total) * 100).toFixed(1)) : 0;

    return {
      totalCatalogued: total,
      addedThisFiscalCycle: 14,
      inStockCount: inStock,
      inStockPercentage: pct,
      lowStockCount: lowStock,
      outOfStockCount: outOfStock,
    };
  }

  public async getNextProductCode(): Promise<string> {
    let maxNum = 1029;
    for (const p of this.products) {
      const match = p.productCode.match(/PRD-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    return `PRD-${maxNum + 1}`;
  }

  public async getCategories(): Promise<string[]> {
    return Array.from(new Set(this.products.map((product) => product.categoryName))).sort();
  }

  public async getBrands(): Promise<string[]> {
    return Array.from(new Set(this.products.map((product) => product.brand))).sort();
  }

  public async checkSkuUnique(sku: string, excludeId?: string): Promise<boolean> {
    const cleanSku = sku.trim().toLowerCase();
    return !this.products.some(
      (p) => p.sku.toLowerCase() === cleanSku && p.id !== excludeId
    );
  }

  public async checkBarcodeUnique(barcode?: string, excludeId?: string): Promise<boolean> {
    if (!barcode || !barcode.trim()) return true;
    const cleanBarcode = barcode.trim().toLowerCase();
    return !this.products.some(
      (p) => p.barcode && p.barcode.toLowerCase() === cleanBarcode && p.id !== excludeId
    );
  }

  public async getProducts(query: ProductQuery = {}): Promise<ProductQueryResult> {
    await new Promise((res) => setTimeout(res, 60));

    const {
      search = '',
      status = 'ALL',
      category = 'All Categories',
      brand = 'All Brands',
      type = 'ALL',
      page = 1,
      pageSize = 10,
    } = query;

    let filtered = [...this.products];

    // Status Filter
    if (status === 'ACTIVE') {
      filtered = filtered.filter((p) => p.status === 'active');
    } else if (status === 'INACTIVE') {
      filtered = filtered.filter((p) => p.status === 'inactive');
    }

    // Category Filter
    if (category && category !== 'All Categories') {
      const cleanCat = category.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.categoryName.toLowerCase().includes(cleanCat) ||
          p.categoryId.toLowerCase().includes(cleanCat)
      );
    }

    // Brand Filter
    if (brand && brand !== 'All Brands') {
      const cleanBrand = brand.toLowerCase();
      filtered = filtered.filter((p) => p.brand.toLowerCase() === cleanBrand);
    }

    // Product Type Filter
    if (type && type !== 'ALL') {
      filtered = filtered.filter((p) => p.type === type);
    }

    // Search Query (name, productCode, SKU, barcode, brand, category)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.productCode.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.barcode && p.barcode.toLowerCase().includes(q)) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    const filteredCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
    const validPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (validPage - 1) * pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

    return {
      items: paginatedItems,
      totalCount: this.products.length,
      filteredCount,
      page: validPage,
      pageSize,
      totalPages,
      kpis: this.calculateKpis(),
    };
  }

  public async getProduct(id: string): Promise<Product | null> {
    await new Promise((res) => setTimeout(res, 40));
    const found = this.products.find((p) => p.id === id);
    return found ? { ...found } : null;
  }

  public async createProduct(input: CreateProductInput): Promise<Product> {
    await new Promise((res) => setTimeout(res, 80));

    const nextCode = await this.getNextProductCode();
    const newId = `prod-${Date.now().toString().slice(-5)}`;

    const newProduct: Product = {
      id: newId,
      productCode: nextCode,
      name: input.name.trim(),
      brand: input.brand.trim() || 'Punarva Studio',
      categoryId: input.categoryId || input.categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      categoryName: input.categoryName,
      subcategory: input.subcategory,
      type: input.type,
      sku: input.sku.trim(),
      barcode: input.barcode?.trim() || undefined,
      hsnCode: input.hsnCode?.trim() || '6205.20.00',
      unitOfMeasure: input.unitOfMeasure || (input.type === 'service' ? 'Job / Service' : 'Pieces (Pcs)'),
      sellingPrice: Number(input.sellingPrice) || 0,
      mrp: input.mrp !== undefined ? Number(input.mrp) : undefined,
      cost: input.cost !== undefined ? Number(input.cost) : undefined,
      minSellingPrice: input.minSellingPrice !== undefined ? Number(input.minSellingPrice) : undefined,
      discountAllowed: input.discountAllowed ?? true,
      taxCategory: input.taxCategory || 'GST 12% (Standard Apparel)',
      status: input.status || 'active',
      reorderLevel: input.type !== 'service' ? Number(input.reorderLevel) || 15 : undefined,
      reorderQuantity: input.type !== 'service' ? Number(input.reorderQuantity) || 30 : undefined,
      openingStock: input.type !== 'service' ? Number(input.openingStock) || 0 : undefined,
      openingStoreOutlet: input.openingStoreOutlet || 'Downtown Flagship #01',
      primarySupplier: input.primarySupplier || 'Zenith Textile Mills (SUP-102)',
      supplierProductCode: input.supplierProductCode,
      description: input.description,
      imageUrl:
        input.imageUrl ||
        (input.type === 'service'
          ? 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=400&auto=format&fit=crop&q=80'),
      imageAlt: input.name,
      variantsConfigured: input.variantsConfigured,
      stockSummary:
        input.type === 'service'
          ? undefined
          : {
              onHandTotal: Number(input.openingStock) || 0,
              reorderLevel: Number(input.reorderLevel) || 15,
              status:
                (Number(input.openingStock) || 0) === 0
                  ? 'OUT_OF_STOCK'
                  : (Number(input.openingStock) || 0) <= (Number(input.reorderLevel) || 15)
                  ? 'LOW_STOCK'
                  : 'IN_STOCK',
              storeBreakdown: [
                {
                  storeId: 'store-01',
                  storeName: input.openingStoreOutlet || 'Downtown Flagship #01',
                  locationText: 'Main Storage Room',
                  quantity: Number(input.openingStock) || 0,
                  minThreshold: Number(input.reorderLevel) || 15,
                  statusText: (Number(input.openingStock) || 0) === 0 ? 'Depleted' : 'Initial Stock',
                },
              ],
            },
      recentActivity: [
        {
          id: `act-new-${Date.now()}`,
          title: 'Product Catalogued',
          reference: 'Initial Catalogue Entry',
          timeAgo: 'Just now',
          type: 'adjustment',
          units: Number(input.openingStock) || 0,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert at beginning of catalogue
    this.products.unshift(newProduct);
    return newProduct;
  }

  public async updateProduct(id: string, input: UpdateProductInput): Promise<Product> {
    await new Promise((res) => setTimeout(res, 80));

    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    const current = this.products[index];
    const updated: Product = {
      ...current,
      name: input.name !== undefined ? input.name.trim() : current.name,
      brand: input.brand !== undefined ? input.brand.trim() : current.brand,
      categoryName: input.categoryName !== undefined ? input.categoryName : current.categoryName,
      subcategory: input.subcategory !== undefined ? input.subcategory : current.subcategory,
      type: input.type !== undefined ? input.type : current.type,
      sku: input.sku !== undefined ? input.sku.trim() : current.sku,
      barcode: input.barcode !== undefined ? input.barcode.trim() || undefined : current.barcode,
      hsnCode: input.hsnCode !== undefined ? input.hsnCode.trim() : current.hsnCode,
      unitOfMeasure: input.unitOfMeasure !== undefined ? input.unitOfMeasure : current.unitOfMeasure,
      sellingPrice: input.sellingPrice !== undefined ? Number(input.sellingPrice) : current.sellingPrice,
      mrp: input.mrp !== undefined ? Number(input.mrp) : current.mrp,
      cost: input.cost !== undefined ? Number(input.cost) : current.cost,
      minSellingPrice: input.minSellingPrice !== undefined ? Number(input.minSellingPrice) : current.minSellingPrice,
      discountAllowed: input.discountAllowed !== undefined ? input.discountAllowed : current.discountAllowed,
      taxCategory: input.taxCategory !== undefined ? input.taxCategory : current.taxCategory,
      status: input.status !== undefined ? input.status : current.status,
      reorderLevel: input.reorderLevel !== undefined ? Number(input.reorderLevel) : current.reorderLevel,
      reorderQuantity: input.reorderQuantity !== undefined ? Number(input.reorderQuantity) : current.reorderQuantity,
      primarySupplier: input.primarySupplier !== undefined ? input.primarySupplier : current.primarySupplier,
      supplierProductCode: input.supplierProductCode !== undefined ? input.supplierProductCode : current.supplierProductCode,
      description: input.description !== undefined ? input.description : current.description,
      variantsConfigured: input.variantsConfigured !== undefined ? input.variantsConfigured : current.variantsConfigured,
      updatedAt: new Date().toISOString(),
    };

    this.products[index] = updated;
    return updated;
  }

  public async changeProductStatus(id: string, status: ProductStatus): Promise<Product> {
    await new Promise((res) => setTimeout(res, 60));

    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    const current = this.products[index];
    const updated: Product = {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
      recentActivity: [
        {
          id: `act-stat-${Date.now()}`,
          title: `Status Changed to ${status.toUpperCase()}`,
          reference: 'Store Manager Sarah Jenkins',
          timeAgo: 'Just now',
          type: 'adjustment',
          units: 0,
        },
        ...(current.recentActivity || []),
      ],
    };

    this.products[index] = updated;
    return updated;
  }
}

type TenantProductRow = Awaited<ReturnType<typeof listTenantProducts>>['data']['products'][number];

interface ProductMutationResponse {
  id: string;
  productCode: string;
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  subcategory?: string | null;
  type: string;
  sku: string;
  barcode?: string | null;
  hsnCode?: string | null;
  unitOfMeasure?: string | null;
  sellingPrice: number;
  mrp?: number | null;
  cost?: number | null;
  minSellingPrice?: number | null;
  discountAllowed: boolean;
  taxCategory?: string | null;
  status: string;
  reorderLevel?: number | null;
  reorderQuantity?: number | null;
  primarySupplier?: string | null;
  supplierProductCode?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

const PRODUCT_MUTATION_RESPONSE_KEYS: (keyof ProductMutationResponse)[] = [
  'id', 'productCode', 'name', 'brand', 'categoryId', 'categoryName', 'type', 'sku',
  'sellingPrice', 'discountAllowed', 'status', 'createdAt', 'updatedAt',
];

function mapTenantProduct(row: TenantProductRow | ProductMutationResponse): Product {
  return {
    id: row.id,
    productCode: row.productCode,
    name: row.name,
    brand: row.brand,
    categoryId: row.categoryId,
    categoryName: row.categoryName,
    subcategory: row.subcategory ?? undefined,
    type: row.type.toLowerCase() as ProductType,
    sku: row.sku,
    barcode: row.barcode ?? undefined,
    hsnCode: row.hsnCode ?? undefined,
    unitOfMeasure: row.unitOfMeasure ?? undefined,
    sellingPrice: row.sellingPrice,
    mrp: row.mrp ?? undefined,
    cost: row.cost ?? undefined,
    minSellingPrice: row.minSellingPrice ?? undefined,
    discountAllowed: row.discountAllowed,
    taxCategory: row.taxCategory ?? undefined,
    status: row.status.toLowerCase() as ProductStatus,
    reorderLevel: row.reorderLevel ?? undefined,
    reorderQuantity: row.reorderQuantity ?? undefined,
    primarySupplier: row.primarySupplier ?? undefined,
    supplierProductCode: row.supplierProductCode ?? undefined,
    description: row.description ?? undefined,
    imageUrl: row.imageUrl ?? undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Pure filter/sort/paginate derivation, shared by the server-fetch path here and
 * by pages that recompute a view locally after a mutation without refetching.
 */
export function deriveProductView(all: Product[], query: ProductQuery = {}): ProductQueryResult {
  const search = query.search?.trim().toLowerCase() ?? '';
  const filtered = all.filter((product) => {
    if (query.status === 'ACTIVE' && product.status !== 'active') return false;
    if (query.status === 'INACTIVE' && product.status !== 'inactive') return false;
    if (query.type && query.type !== 'ALL' && product.type !== query.type) return false;
    if (query.category && query.category !== 'All Categories' && !product.categoryName.toLowerCase().includes(query.category.toLowerCase())) return false;
    if (query.brand && query.brand !== 'All Brands' && product.brand.toLowerCase() !== query.brand.toLowerCase()) return false;
    return !search || `${product.productCode} ${product.name} ${product.sku} ${product.barcode ?? ''} ${product.brand} ${product.categoryName}`.toLowerCase().includes(search);
  });
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.max(1, query.pageSize ?? 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const validPage = Math.min(page, totalPages);
  const inStockCount = all.filter((p) => p.type === 'service' || (p.stockSummary?.onHandTotal ?? 0) > (p.stockSummary?.reorderLevel ?? 0)).length;
  return {
    items: filtered.slice((validPage - 1) * pageSize, validPage * pageSize),
    totalCount: all.length,
    filteredCount: filtered.length,
    page: validPage,
    pageSize,
    totalPages,
    kpis: {
      totalCatalogued: all.length,
      addedThisFiscalCycle: all.length,
      inStockCount,
      inStockPercentage: all.length ? Number(((inStockCount / all.length) * 100).toFixed(1)) : 0,
      lowStockCount: all.filter((p) => p.stockSummary?.status === 'LOW_STOCK').length,
      outOfStockCount: all.filter((p) => p.stockSummary?.status === 'OUT_OF_STOCK').length,
    },
  };
}

class ProductionProductService implements IProductService {
  private async organizationId(): Promise<string> {
    const result = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = result.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    return membership.organization.id;
  }

  /** Full org-scoped, unfiltered/unpaginated set — the authoritative array pages hold in state. */
  public async getAllProducts(): Promise<Product[]> {
    const organizationId = await this.organizationId();
    const result = await listTenantProducts(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.products.map(mapTenantProduct);
  }

  public async getNextProductCode(): Promise<string> {
    const products = await this.getAllProducts();
    const maxNumber = products.reduce((max, product) => {
      const match = product.productCode.match(/PRD-(\d+)/i);
      return match ? Math.max(max, Number(match[1])) : max;
    }, 1029);
    return `PRD-${maxNumber + 1}`;
  }
  public async getCategories(): Promise<string[]> {
    return Array.from(new Set((await this.getAllProducts()).map((product) => product.categoryName))).sort();
  }
  public async getBrands(): Promise<string[]> {
    return Array.from(new Set((await this.getAllProducts()).map((product) => product.brand))).sort();
  }
  public async checkSkuUnique(sku: string, excludeId?: string): Promise<boolean> {
    const normalized = sku.trim().toLowerCase();
    return !(await this.getAllProducts()).some((product) => product.id !== excludeId && product.sku.toLowerCase() === normalized);
  }
  public async checkBarcodeUnique(barcode?: string, excludeId?: string): Promise<boolean> {
    const normalized = barcode?.trim().toLowerCase();
    if (!normalized) return true;
    return !(await this.getAllProducts()).some((product) => product.id !== excludeId && product.barcode?.toLowerCase() === normalized);
  }

  public async getProducts(query: ProductQuery = {}): Promise<ProductQueryResult> {
    return deriveProductView(await this.getAllProducts(), query);
  }

  public async getProduct(id: string): Promise<Product | null> {
    return (await this.getAllProducts()).find((product) => product.id === id || product.productCode === id) ?? null;
  }

  private async context(): Promise<string> { return this.organizationId(); }
  public async createProduct(input: CreateProductInput): Promise<Product> {
    const organizationId = await this.context();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'createTenantProductRecord')({
      organizationId,
      productCode: await this.getNextProductCode(),
      ...input,
      type: input.type.toUpperCase(),
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<ProductMutationResponse>(response.data, PRODUCT_MUTATION_RESPONSE_KEYS, 'createProduct');
    return mapTenantProduct(row);
  }
  public async updateProduct(id: string, input: UpdateProductInput): Promise<Product> {
    const current = await this.getProduct(id);
    if (!current) throw new Error('Product not found.');
    const organizationId = await this.context();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'updateTenantProductRecord')({
      organizationId,
      id,
      ...current,
      ...input,
      requestId: globalThis.crypto.randomUUID(),
      type: (input.type ?? current.type).toUpperCase(),
    });
    const row = assertCallableEntity<ProductMutationResponse>(response.data, PRODUCT_MUTATION_RESPONSE_KEYS, 'updateProduct');
    return mapTenantProduct(row);
  }
  public async changeProductStatus(id: string, status: ProductStatus): Promise<Product> {
    const organizationId = await this.context();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'changeTenantProductStatus')({
      organizationId,
      id,
      status: status.toUpperCase(),
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<ProductMutationResponse>(response.data, PRODUCT_MUTATION_RESPONSE_KEYS, 'changeProductStatus');
    return mapTenantProduct(row);
  }
}

export const productService: IProductService = new ProductionProductService();
