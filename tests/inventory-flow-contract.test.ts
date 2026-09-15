import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const inventoryPage = readFileSync(new URL('../src/features/inventory/pages/InventoryPage.tsx', import.meta.url), 'utf8');
const addInventoryModal = readFileSync(new URL('../src/features/inventory/components/AddInventoryModal.tsx', import.meta.url), 'utf8');
const quickAddModal = readFileSync(new URL('../src/features/inventory/components/AddNewProductModal.tsx', import.meta.url), 'utf8');
const inventoryService = readFileSync(new URL('../src/features/inventory/services/inventoryService.ts', import.meta.url), 'utf8');
const productBatch = readFileSync(new URL('../functions/src/productBatch.ts', import.meta.url), 'utf8');
const outletContext = readFileSync(new URL('../src/app/context/TenantOutletContext.tsx', import.meta.url), 'utf8');
const checkoutService = readFileSync(new URL('../src/features/billing/services/checkoutService.ts', import.meta.url), 'utf8');

describe('inventory receiving flow contract', () => {
  it('offers Add Inventory separately from quick product creation', () => {
    expect(inventoryPage).toContain('AddInventoryModal');
    expect(inventoryPage).toContain('onAddInventory={() => setIsAddInventoryOpen(true)}');
    expect(inventoryPage).toContain('productService.getAllProducts()');
    expect(inventoryPage).toContain("product.status === 'active' && product.type !== 'service'");
    expect(inventoryPage).toContain('useTenantOutlet');
    expect(quickAddModal).toContain('Create a catalogue product and its first inventory record');
    expect(inventoryService).toContain("'createTenantProductWithInventoryRecord'");
    expect(inventoryService).not.toContain("'createTenantProductRecord'");
    expect(productBatch).toContain('persistProductBatchInTransaction');
  });

  it('keeps Add Inventory outlet-scoped through the header and excludes reorder configuration', () => {
    expect(addInventoryModal).toContain('currentOutletId');
    expect(addInventoryModal).toContain('currentOutletName');
    expect(addInventoryModal).toContain('No outlet selected');
    expect(addInventoryModal).toContain('outletId: currentOutletId ?? \'\'');
    expect(addInventoryModal).not.toContain('Reorder');
    expect(addInventoryModal).not.toContain('availableLocations');
    expect(inventoryPage).toContain("Please select an outlet before adding inventory.");
    expect(inventoryService).toContain("httpsCallable(getFirebaseClientServices().functions, 'addTenantInventoryUnits')");
    const checkout = readFileSync(new URL('../functions/src/checkout.ts', import.meta.url), 'utf8');
    expect(checkout).toContain('input.lines.entries()');
    expect(checkout).toContain('operationRequestId(input.requestId ?? randomUUID(), `LINE-${lineIndex + 1}`)');
    expect(checkout).toContain('actorFirebaseUid: input.actorFirebaseUid ?? input.staffName');
  });

  it('captures batch metadata for both initial quick setup and subsequent additions', () => {
    for (const source of [quickAddModal, addInventoryModal, inventoryService]) {
      expect(source).toContain('batchNumber');
      expect(source).toContain('mfgDate');
      expect(source).toContain('expiryDate');
    }
    expect(outletContext).toContain("omniretail.activeOutletId");
    expect(outletContext).toContain('selectOutlet');
    expect(checkoutService).toContain("Please select an outlet before completing the sale.");
    expect(checkoutService).not.toContain('assignedOutletIds');
    expect(checkoutService).not.toContain('activeOutlets.length === 1');
  });
});
