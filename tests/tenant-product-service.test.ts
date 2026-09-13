import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

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
});
