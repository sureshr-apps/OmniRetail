import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getProductCreationErrorMessage } from '../src/features/products/services/productError';

const source = readFileSync(new URL('../src/features/products/services/productService.ts', import.meta.url), 'utf8');

describe('tenant product service adapter', () => {
  it('uses the authenticated tenant authorization and Data Connect product query', () => {
    expect(source).toContain('getCurrentUserAuthorization');
    expect(source).toContain('listTenantProducts');
    expect(source).toContain("No active organization membership.");
    expect(source).toContain('export const productService: IProductService = new ProductionProductService()');
    expect(source).toContain("'createTenantProductRecord'");
    expect(source).toContain("'updateTenantProductRecord'");
    expect(source).toContain("'changeTenantProductStatus'");
  });

  it('does not retain the mock service as the exported product service', () => {
    expect(source).not.toMatch(/export const productService\s*=\s*new MockProductService/);
  });

  it('does not mislabel authorization or validation failures as SKU conflicts', () => {
    expect(getProductCreationErrorMessage({ code: 'functions/permission-denied', message: 'Unable to create the product.' }))
      .toBe('You do not have permission to create products in this organization.');
    expect(getProductCreationErrorMessage({ code: 'functions/invalid-argument', message: 'invalid input' }))
      .toBe('Some product details are invalid. Please review the form and retry.');
    expect(getProductCreationErrorMessage({ code: 'functions/already-exists', message: 'duplicate SKU' }))
      .toBe('A product with this SKU, barcode, or product code already exists.');
  });
});
