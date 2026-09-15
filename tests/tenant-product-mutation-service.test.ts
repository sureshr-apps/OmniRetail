import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dataConnect: {},
  functions: {},
  getCurrentUserAuthorization: vi.fn(),
  listTenantCategories: vi.fn(),
  listTenantProducts: vi.fn(),
  listTenantInventory: vi.fn(),
  httpsCallable: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  getCurrentUserAuthorization: mocks.getCurrentUserAuthorization,
  listTenantCategories: mocks.listTenantCategories,
  listTenantProducts: mocks.listTenantProducts,
  listTenantInventory: mocks.listTenantInventory,
}));
vi.mock('@/infrastructure/firebase/client', () => ({
  getFirebaseClientServices: () => ({ dataConnect: mocks.dataConnect, functions: mocks.functions }),
}));
vi.mock('firebase/functions', () => ({ httpsCallable: mocks.httpsCallable }));

import { productService } from '@/features/products/services/productService';
import { MalformedCallableResponseError } from '@/shared/utils/callableResponse';

const productRow = (overrides: Record<string, unknown> = {}) => ({
  id: 'prod-1',
  organization: { id: 'org-1' },
  productCode: 1030,
  name: 'Classic Tee',
  brand: 'Acme',
  category: { id: 'category-1', value: 'Apparel' },
  subcategory: null,
  type: 'STOCKABLE',
  sku: 'AP-TEE-001',
  barcode: null,
  hsnCode: null,
  unitOfMeasure: 'Pieces (Pcs)',
  sellingPrice: 499,
  mrp: 599,
  cost: 250,
  minSellingPrice: null,
  discountAllowed: true,
  taxCategory: 'GST 12%',
  status: 'ACTIVE',
  reorderLevel: 15,
  reorderQuantity: 30,
  primarySupplier: null,
  description: null,
  ...overrides,
});

const createInput = (overrides: Record<string, unknown> = {}) => ({
  name: 'New Tee',
  brand: 'Acme',
  categoryName: 'Apparel',
  type: 'stockable' as const,
  sku: 'AP-TEE-002',
  sellingPrice: 499,
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getCurrentUserAuthorization.mockResolvedValue({
    data: { appUsers: [{ organizationMemberships_on_user: [{ status: 'ACTIVE', organization: { id: 'org-1' } }] }] },
  });
  mocks.listTenantProducts.mockResolvedValue({ data: { products: [productRow()] } });
  mocks.listTenantInventory.mockResolvedValue({ data: { inventoryStocks: [] } });
  mocks.listTenantCategories.mockResolvedValue({ data: { categories: [{ id: 'category-1', value: 'Apparel', subcategories_on_category: [{ id: 'subcategory-1', value: 'Tees' }] }] } });
});

describe('productService mutations return the canonical entity directly', () => {
  it('createProduct returns the enriched entity from the callable, with no follow-up list query after the mutation', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...productRow({ id: 'prod-2', productCode: 1031, name: 'New Tee', sku: 'AP-TEE-002' }) },
    }));
    const created = await productService.createProduct(createInput());
    expect(created).toMatchObject({ id: 'prod-2', productCode: 1031, name: 'New Tee', categoryId: 'category-1', categoryName: 'Apparel' });
    // productCode is now a server-assigned serial, so create never needs an
    // up-front (or follow-up) listTenantProducts call to compute or locate it.
    expect(mocks.listTenantProducts).not.toHaveBeenCalled();
  });

  it('creates variants through one transactional batch callable', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', products: [
        productRow({ id: 'prod-2', productCode: 1031, name: 'New Tee - S', sku: 'AP-TEE-002-S' }),
        productRow({ id: 'prod-3', productCode: 1032, name: 'New Tee - M', sku: 'AP-TEE-002-M' }),
      ] },
    }));

    const created = await productService.createProducts([
      createInput({ name: 'New Tee - S', sku: 'AP-TEE-002-S' }),
      createInput({ name: 'New Tee - M', sku: 'AP-TEE-002-M' }),
    ]);

    expect(created.map((product) => product.id)).toEqual(['prod-2', 'prod-3']);
    expect(mocks.httpsCallable).toHaveBeenCalledWith(mocks.functions, 'createTenantProductBatchRecord');
    expect(mocks.listTenantProducts).not.toHaveBeenCalled();
  });

  it('updateProduct returns the enriched entity from the callable, with no follow-up list query after the mutation', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...productRow({ name: 'Renamed Tee' }) },
    }));
    const updated = await productService.updateProduct('prod-1', { id: 'prod-1', name: 'Renamed Tee' });
    expect(updated.name).toBe('Renamed Tee');
    // listTenantProducts is only consulted once, as the pre-mutation merge base — there is no
    // second (post-mutation) call to reload the updated row.
    expect(mocks.listTenantProducts).toHaveBeenCalledTimes(1);
  });

  it('changeProductStatus returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...productRow({ status: 'INACTIVE' }) },
    }));
    const updated = await productService.changeProductStatus('prod-1', 'inactive');
    expect(updated.status).toBe('inactive');
    expect(mocks.listTenantProducts).not.toHaveBeenCalled();
  });

  it('deleteProduct calls the organization-scoped delete callable without reloading the list', async () => {
    const callable = vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'prod-1' } });
    mocks.httpsCallable.mockReturnValue(callable);
    await productService.deleteProduct('prod-1');
    expect(mocks.httpsCallable).toHaveBeenCalledWith(mocks.functions, 'deleteTenantProduct');
    expect(callable).toHaveBeenCalledWith(expect.objectContaining({ organizationId: 'org-1', id: 'prod-1', requestId: expect.any(String) }));
    expect(mocks.listTenantProducts).not.toHaveBeenCalled();
  });

  it('deletes categories and subcategories through admin callables without reloading products', async () => {
    const callable = vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'category-1' } });
    mocks.httpsCallable.mockReturnValue(callable);

    await productService.deleteCategory('category-1');
    expect(mocks.httpsCallable).toHaveBeenCalledWith(mocks.functions, 'deleteTenantCategory');
    expect(callable).toHaveBeenCalledWith(expect.objectContaining({ organizationId: 'org-1', id: 'category-1', requestId: expect.any(String) }));

    await productService.deleteSubcategory('subcategory-1');
    expect(mocks.httpsCallable).toHaveBeenCalledWith(mocks.functions, 'deleteTenantSubcategory');
    expect(callable).toHaveBeenLastCalledWith(expect.objectContaining({ organizationId: 'org-1', id: 'subcategory-1', requestId: expect.any(String) }));
    expect(mocks.listTenantProducts).not.toHaveBeenCalled();
  });

  it('manages categories and subcategories through organization-scoped callables', async () => {
    const callable = vi.fn()
      .mockResolvedValueOnce({ data: { success: true, organizationId: 'org-1', id: 'category-2', value: 'Beverages' } })
      .mockResolvedValueOnce({ data: { success: true, organizationId: 'org-1', id: 'category-2', value: 'Cold Beverages' } })
      .mockResolvedValueOnce({ data: { success: true, organizationId: 'org-1', id: 'subcategory-2', categoryId: 'category-2', value: 'Juices' } })
      .mockResolvedValueOnce({ data: { success: true, organizationId: 'org-1', id: 'subcategory-2', value: 'Fresh Juices' } });
    mocks.httpsCallable.mockReturnValue(callable);

    await expect(productService.createCategory('Beverages')).resolves.toEqual({ id: 'category-2', value: 'Beverages', subcategories: [] });
    await expect(productService.updateCategory('category-2', 'Cold Beverages')).resolves.toEqual({ id: 'category-2', value: 'Cold Beverages', subcategories: [] });
    await expect(productService.createSubcategory('category-2', 'Juices')).resolves.toEqual({ id: 'subcategory-2', value: 'Juices' });
    await expect(productService.updateSubcategory('subcategory-2', 'Fresh Juices')).resolves.toEqual({ id: 'subcategory-2', value: 'Fresh Juices' });

    expect(mocks.httpsCallable).toHaveBeenNthCalledWith(1, mocks.functions, 'createTenantCategory');
    expect(mocks.httpsCallable).toHaveBeenNthCalledWith(2, mocks.functions, 'updateTenantCategory');
    expect(mocks.httpsCallable).toHaveBeenNthCalledWith(3, mocks.functions, 'createTenantSubcategory');
    expect(mocks.httpsCallable).toHaveBeenNthCalledWith(4, mocks.functions, 'updateTenantSubcategory');
  });

  it('rejects a malformed create response instead of returning a partial entity', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'prod-2' } }));
    await expect(productService.createProduct(createInput())).rejects.toBeInstanceOf(MalformedCallableResponseError);
  });

  it('propagates a failed mutation without touching any local/service state', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockRejectedValue(new Error('permission-denied')));
    await expect(productService.changeProductStatus('prod-1', 'inactive')).rejects.toThrow('permission-denied');
    expect(mocks.listTenantProducts).not.toHaveBeenCalled();
  });

  it('applying the same mutation response twice does not duplicate the product (idempotent upsert)', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...productRow({ name: 'Renamed Tee' }) },
    }));
    const first = await productService.updateProduct('prod-1', { id: 'prod-1', name: 'Renamed Tee' });
    const second = await productService.updateProduct('prod-1', { id: 'prod-1', name: 'Renamed Tee' });
    expect(first).toEqual(second);
  });
});

describe('productService.getAllProducts', () => {
  it('fetches the full org-scoped set for pages to hold and derive views from', async () => {
    const products = await productService.getAllProducts();
    expect(products).toHaveLength(1);
    expect(products[0].productCode).toBe(1030);
  });

  it('loads category and subcategory options from the taxonomy masters', async () => {
    const options = await productService.getCategoryOptions();
    expect(options).toEqual([{ id: 'category-1', value: 'Apparel', subcategories: [{ id: 'subcategory-1', value: 'Tees' }] }]);
    expect(mocks.listTenantCategories).toHaveBeenCalledWith(mocks.dataConnect, { organizationId: 'org-1' });
  });
});
