import {
  Product,
  ProductQuery,
  ProductQueryResult,
  CreateProductInput,
  UpdateProductInput,
  ProductStatus,
  ProductsKpiSummary,
} from '../types';
import { INITIAL_PRODUCTS } from './mockData';

export interface IProductService {
  getProducts(query?: ProductQuery): Promise<ProductQueryResult>;
  getProduct(id: string): Promise<Product | null>;
  createProduct(input: CreateProductInput): Promise<Product>;
  updateProduct(id: string, input: UpdateProductInput): Promise<Product>;
  changeProductStatus(id: string, status: ProductStatus): Promise<Product>;
  checkSkuUnique(sku: string, excludeId?: string): boolean;
  checkBarcodeUnique(barcode?: string, excludeId?: string): boolean;
  getNextProductCode(): string;
}

class MockProductService implements IProductService {
  private products: Product[] = [...INITIAL_PRODUCTS];

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

  public getNextProductCode(): string {
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

  public checkSkuUnique(sku: string, excludeId?: string): boolean {
    const cleanSku = sku.trim().toLowerCase();
    return !this.products.some(
      (p) => p.sku.toLowerCase() === cleanSku && p.id !== excludeId
    );
  }

  public checkBarcodeUnique(barcode?: string, excludeId?: string): boolean {
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

    const nextCode = this.getNextProductCode();
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

export const productService = new MockProductService();
