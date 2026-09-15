import {
  Product,
  ProductQuery,
  ProductQueryResult,
  CreateProductInput,
  UpdateProductInput,
  ProductStatus,
  ProductType,
  ProductsKpiSummary,
  ProductCategoryOption,
} from '../types';
import { getCurrentUserAuthorization, listTenantCategories, listTenantProducts, listTenantInventory } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { assertCallableEntity, MalformedCallableResponseError } from '@/shared/utils/callableResponse';
import { formatProductCode } from '../utils/formatProductCode';

export interface IProductService {
  getAllProducts(): Promise<Product[]>;
  getProducts(query?: ProductQuery): Promise<ProductQueryResult>;
  getProduct(id: string): Promise<Product | null>;
  createProduct(input: CreateProductInput): Promise<Product>;
  createProducts(inputs: CreateProductInput[]): Promise<Product[]>;
  updateProduct(id: string, input: UpdateProductInput): Promise<Product>;
  changeProductStatus(id: string, status: ProductStatus): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  checkSkuUnique(sku: string, excludeId?: string): Promise<boolean>;
  checkBarcodeUnique(barcode?: string, excludeId?: string): Promise<boolean>;
  getCategories(): Promise<string[]>;
  getCategoryOptions(): Promise<ProductCategoryOption[]>;
  getBrands(): Promise<string[]>;
  createCategory(value: string): Promise<ProductCategoryOption>;
  updateCategory(id: string, value: string): Promise<ProductCategoryOption>;
  createSubcategory(categoryId: string, value: string): Promise<{ id: string; value: string }>;
  updateSubcategory(id: string, value: string): Promise<{ id: string; value: string }>;
  deleteCategory(id: string): Promise<void>;
  deleteSubcategory(id: string): Promise<void>;
}

type TenantProductRow = Awaited<ReturnType<typeof listTenantProducts>>['data']['products'][number];

interface ProductMutationResponse {
  id: string;
  productCode: number;
  name: string;
  brand: string;
  category: { id: string; value: string };
  subcategory?: { id: string; value: string } | null;
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
  description?: string | null;
}

interface ProductBatchMutationResponse {
  success: boolean;
  organizationId: string;
  products: unknown[];
}

interface TaxonomyMutationResponse {
  id: string;
  value: string;
  categoryId?: string;
}

const PRODUCT_MUTATION_RESPONSE_KEYS: (keyof ProductMutationResponse)[] = [
  'id', 'productCode', 'name', 'brand', 'category', 'type', 'sku',
  'sellingPrice', 'discountAllowed', 'status',
];

function mapTenantProduct(row: TenantProductRow | ProductMutationResponse, stockSummary?: Product['stockSummary']): Product {
  return {
    id: row.id,
    productCode: row.productCode,
    name: row.name,
    brand: row.brand,
    categoryId: row.category.id,
    categoryName: row.category.value,
    subcategoryId: row.subcategory?.id,
    subcategory: row.subcategory?.value,
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
    description: row.description ?? undefined,
    stockSummary,
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
    return !search || `${formatProductCode(product.productCode)} ${product.name} ${product.sku} ${product.barcode ?? ''} ${product.brand} ${product.categoryName}`.toLowerCase().includes(search);
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
      // Product timestamps were intentionally retired from the schema; do not
      // pretend that every loaded product was added this fiscal cycle.
      addedThisFiscalCycle: 0,
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
    const [result, inventory] = await Promise.all([
      listTenantProducts(getFirebaseClientServices().dataConnect, { organizationId }),
      listTenantInventory(getFirebaseClientServices().dataConnect, { organizationId }).catch(() => null),
    ]);
    const stockByProduct = new Map<string, { onHand: number; reorderLevel: number }>();
    for (const row of inventory?.data.inventoryStocks ?? []) {
      const previous = stockByProduct.get(row.product.id) ?? { onHand: 0, reorderLevel: row.reorderLevel };
      stockByProduct.set(row.product.id, { onHand: previous.onHand + row.onHandQty, reorderLevel: Math.max(previous.reorderLevel, row.reorderLevel) });
    }
    return result.data.products.map((row) => {
      const stock = stockByProduct.get(row.id);
      const status = !stock || stock.onHand === 0 ? 'OUT_OF_STOCK' : stock.onHand <= stock.reorderLevel ? 'LOW_STOCK' : 'IN_STOCK';
      return mapTenantProduct(row, stock ? { onHandTotal: stock.onHand, reorderLevel: stock.reorderLevel, status } : undefined);
    });
  }

  public async getCategories(): Promise<string[]> {
    return (await this.getCategoryOptions()).map((category) => category.value);
  }
  public async getCategoryOptions(): Promise<ProductCategoryOption[]> {
    const organizationId = await this.organizationId();
    const result = await listTenantCategories(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.categories.map((category) => ({
      id: category.id,
      value: category.value,
      subcategories: category.subcategories_on_category.map((subcategory) => ({ id: subcategory.id, value: subcategory.value })),
    }));
  }
  public async getBrands(): Promise<string[]> {
    return Array.from(new Set((await this.getAllProducts()).map((product) => product.brand))).sort();
  }
  public async createCategory(value: string): Promise<ProductCategoryOption> {
    const organizationId = await this.context();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'createTenantCategory')({
      organizationId,
      value: value.trim(),
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<TaxonomyMutationResponse>(response.data, ['id', 'value'], 'createCategory');
    return { id: row.id, value: row.value, subcategories: [] };
  }
  public async updateCategory(id: string, value: string): Promise<ProductCategoryOption> {
    const organizationId = await this.context();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'updateTenantCategory')({
      organizationId,
      id,
      value: value.trim(),
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<TaxonomyMutationResponse>(response.data, ['id', 'value'], 'updateCategory');
    return { id: row.id, value: row.value, subcategories: [] };
  }
  public async createSubcategory(categoryId: string, value: string): Promise<{ id: string; value: string }> {
    const organizationId = await this.context();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'createTenantSubcategory')({
      organizationId,
      categoryId,
      value: value.trim(),
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<TaxonomyMutationResponse>(response.data, ['id', 'value'], 'createSubcategory');
    return { id: row.id, value: row.value };
  }
  public async updateSubcategory(id: string, value: string): Promise<{ id: string; value: string }> {
    const organizationId = await this.context();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'updateTenantSubcategory')({
      organizationId,
      id,
      value: value.trim(),
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<TaxonomyMutationResponse>(response.data, ['id', 'value'], 'updateSubcategory');
    return { id: row.id, value: row.value };
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
    return (await this.getAllProducts()).find((product) => product.id === id || String(product.productCode) === id || formatProductCode(product.productCode) === id) ?? null;
  }

  private async context(): Promise<string> { return this.organizationId(); }
  public async createProduct(input: CreateProductInput): Promise<Product> {
    const organizationId = await this.context();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'createTenantProductRecord')({
      organizationId,
      ...input,
      type: input.type.toUpperCase(),
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<ProductMutationResponse>(response.data, PRODUCT_MUTATION_RESPONSE_KEYS, 'createProduct');
    return mapTenantProduct(row);
  }
  public async createProducts(inputs: CreateProductInput[]): Promise<Product[]> {
    if (inputs.length === 0) return [];
    if (inputs.length === 1) return [await this.createProduct(inputs[0])];
    const organizationId = await this.context();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'createTenantProductBatchRecord')({
      organizationId,
      products: inputs.map((input) => ({ ...input, type: input.type.toUpperCase() })),
      requestId: globalThis.crypto.randomUUID(),
    });
    const data = response.data as ProductBatchMutationResponse;
    if (!data || typeof data !== 'object' || !Array.isArray(data.products)) {
      throw new MalformedCallableResponseError('createProducts', ['products']);
    }
    return data.products.map((product, index) => mapTenantProduct(
      assertCallableEntity<ProductMutationResponse>(product, PRODUCT_MUTATION_RESPONSE_KEYS, `createProducts[${index}]`),
    ));
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

  public async deleteProduct(id: string): Promise<void> {
    const organizationId = await this.context();
    await httpsCallable(getFirebaseClientServices().functions, 'deleteTenantProduct')({
      organizationId,
      id,
      requestId: globalThis.crypto.randomUUID(),
    });
  }

  public async deleteCategory(id: string): Promise<void> {
    const organizationId = await this.context();
    await httpsCallable(getFirebaseClientServices().functions, 'deleteTenantCategory')({
      organizationId,
      id,
      requestId: globalThis.crypto.randomUUID(),
    });
  }

  public async deleteSubcategory(id: string): Promise<void> {
    const organizationId = await this.context();
    await httpsCallable(getFirebaseClientServices().functions, 'deleteTenantSubcategory')({
      organizationId,
      id,
      requestId: globalThis.crypto.randomUUID(),
    });
  }
}

export const productService: IProductService = new ProductionProductService();
