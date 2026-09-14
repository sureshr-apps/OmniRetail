import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const root = new URL('../src/features/', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');

describe('tenant production service boundaries', () => {
  it('does not construct production tenant services from mock implementations', () => {
    const serviceSources = [
      'customers/services/customerService.ts',
      'employees/services/employeeService.ts',
      'expenses/services/expenseService.ts',
      'inventory/services/inventoryService.ts',
      'outlets/services/outletService.ts',
      'products/services/productService.ts',
      'purchases/services/purchaseService.ts',
      'sales/services/salesService.ts',
      'service-persons/services/servicePersonService.ts',
      'suppliers/services/supplierService.ts',
      'organizations/services/OrganizationAdminService.ts',
    ];

    for (const path of serviceSources) {
      const source = read(path);
      expect(source).not.toMatch(/class Production\w+ extends Mock/);
      expect(source).not.toMatch(/new Mock\w+Service/);
    }
  });

  it('uses live product catalog metadata in product and purchase controls', () => {
    expect(read('products/components/ProductsFilterToolbar.tsx')).not.toContain("services/mockData");
    expect(read('purchases/components/CreatePurchaseModal.tsx')).not.toContain('PRODUCT_SUGGESTIONS');
    expect(read('purchases/components/CreatePurchaseModal.tsx')).toContain('productService');
    expect(read('purchases/components/CreatePurchaseModal.tsx')).toContain('.getProducts');
  });

  it('validates the required outlet address before calling the backend', () => {
    const source = read('outlets/components/OutletModal.tsx');
    expect(source).toContain("nextErrors.address = 'Street address is required for outlet operations.'");
    expect(source).toContain('Street Address <span className="text-rose-500">*</span>');
  });

  it('keeps outlet creation limited to persisted India-market fields', () => {
    const modal = read('outlets/components/OutletModal.tsx');
    const service = read('outlets/services/outletService.ts');
    expect(modal).not.toContain('generatedOutletCode');
    expect(modal).not.toContain('setCity');
    expect(modal).not.toContain('setState');
    expect(modal).not.toContain('setPostalCode');
    expect(modal).not.toContain('setCountry');
    expect(modal).not.toContain('registerCount');
    expect(modal).not.toContain('setTimezone');
    expect(modal).not.toContain('setCurrency');
    expect(service).toContain("'createTenantOutlet'");
    const createMethod = service.match(/async createOutlet[\s\S]*?\n  async updateOutlet/)?.[0] ?? '';
    const createPayload = createMethod.match(/await callable\(\{[\s\S]*?\}\);/)?.[0] ?? '';
    expect(createPayload).not.toContain('outletCode');
    expect(service).not.toContain('city:');
    expect(service).not.toContain('timezone: input');
    expect(service).not.toContain('currency: input');
    expect(service).not.toContain("timezone: 'Asia/Kolkata'");
    expect(service).not.toContain("currency: 'INR'");
    expect(service).not.toContain('createdAt: row.createdAt');
    expect(service).not.toContain('updatedAt: row.updatedAt');
  });

  it('returns the callable-provided canonical outlet directly after a mutation, with no follow-up list query', () => {
    const source = read('outlets/services/outletService.ts');
    expect(source).not.toContain('QueryFetchPolicy.SERVER_ONLY');
    expect(source).not.toContain('o.id === returnedOutletId');
    expect(source).toContain('assertCallableEntity<OutletMutationResponse>');
    expect(source).toContain('formatOutletCode(o.outletCode)');
  });
});
