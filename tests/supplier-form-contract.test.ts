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
});
