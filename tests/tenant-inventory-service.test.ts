import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../src/features/inventory/services/inventoryService.ts', import.meta.url), 'utf8');

describe('tenant inventory service adapter', () => {
  it('uses tenant authorization and the outlet-scoped inventory query', () => {
    expect(source).toContain('getCachedCurrentUserAuthorization');
    expect(source).toContain('listTenantInventory');
    expect(source).toContain('getMovementHistory');
    expect(source).toContain("'listTenantInventoryMovementHistory'");
    expect(source).toContain('No active organization membership.');
    expect(source).toContain('export const inventoryService = new ProductionInventoryService()');
  });
});
