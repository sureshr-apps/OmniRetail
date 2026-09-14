import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dataConnect: {},
  functions: {},
  getCurrentUserAuthorization: vi.fn(),
  listTenantProducts: vi.fn(),
  httpsCallable: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  getCurrentUserAuthorization: mocks.getCurrentUserAuthorization,
  listTenantProducts: mocks.listTenantProducts,
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
  categoryId: 'apparel',
  categoryName: 'Apparel',
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
  supplierProductCode: null,
  description: null,
  imageUrl: null,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

const createInput = (overrides: Record<string, unknown> = {}) => ({
  name: 'New Tee',
  brand: 'Acme',
  categoryId: 'apparel',
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
});

describe('productService mutations return the canonical entity directly', () => {
  it('createProduct returns the enriched entity from the callable, with no follow-up list query after the mutation', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...productRow({ id: 'prod-2', productCode: 1031, name: 'New Tee', sku: 'AP-TEE-002' }) },
    }));
    const created = await productService.createProduct(createInput());
    expect(created).toMatchObject({ id: 'prod-2', productCode: 1031, name: 'New Tee' });
    // productCode is now a server-assigned serial, so create never needs an
    // up-front (or follow-up) listTenantProducts call to compute or locate it.
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
});
