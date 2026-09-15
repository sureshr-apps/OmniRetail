import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const formSource = readFileSync(
  new URL('../src/features/suppliers/components/AddSupplierDrawer.tsx', import.meta.url),
  'utf8',
);
const pageSource = readFileSync(
  new URL('../src/features/suppliers/pages/SuppliersPage.tsx', import.meta.url),
  'utf8',
);

describe('supplier add form presentation contract', () => {
  it('uses the centered modal presentation shared by other add forms', () => {
    expect(formSource).toContain('items-center justify-center');
    expect(formSource).toContain('max-w-3xl max-h-[90vh]');
    expect(formSource).toContain('fade-in zoom-in-95');
    expect(formSource).not.toContain('fixed inset-0 z-50 flex justify-end');
    expect(formSource).not.toContain('slide-in-from-right');
  });

  it('tracks the add form as a modal in the supplier page', () => {
    expect(pageSource).toContain("AddSupplierDrawer as AddSupplierModal");
    expect(pageSource).toContain('isAddModalOpen');
    expect(pageSource).toContain('Add Supplier Modal');
    expect(pageSource).not.toContain('isAddDrawerOpen');
  });

  it('uses one address field, optional GST, and an editable category history', () => {
    expect(formSource).toContain('Address');
    expect(formSource).toContain('list="supplier-categories"');
    expect(formSource).toContain('GST');
    expect(formSource).toContain('(optional)');
    for (const removedField of ['setCity', 'setState', 'setPostalCode', 'setCountry', 'City', 'State / Province', 'Postal Code', 'Country', 'Tax ID / EIN']) {
      expect(formSource).not.toContain(removedField);
    }
  });

  it('keeps the supplier data contract limited to address and optional GST', () => {
    const types = readFileSync(new URL('../src/features/suppliers/types/index.ts', import.meta.url), 'utf8');
    const service = readFileSync(new URL('../src/features/suppliers/services/supplierService.ts', import.meta.url), 'utf8');
    for (const removedField of ['city', 'state', 'postalCode', 'country']) {
      expect(types).not.toContain(`${removedField}:`);
      expect(service).not.toContain(`${removedField}:`);
    }
    expect(types).toContain('taxId?: string');
    expect(service).toContain('taxId?: string | null');
  });
});
