import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const tableSource = readFileSync(new URL('../src/features/products/components/ProductsTable.tsx', import.meta.url), 'utf8');
const addSource = readFileSync(new URL('../src/features/products/components/AddProductModal.tsx', import.meta.url), 'utf8');
const taxonomySource = readFileSync(new URL('../src/features/products/components/ManageProductTaxonomyModal.tsx', import.meta.url), 'utf8');

describe('product UI contract', () => {
  it('keeps only view details in the product table actions', () => {
    expect(tableSource).toContain('title="View Details"');
    for (const removedAction of ['onEditProduct', 'onToggleStatus', 'more_vert', 'View Multi-Store Stock Status']) {
      expect(tableSource).not.toContain(removedAction);
    }
  });

  it('does not prefill HSN and supports variant creation in the add form', () => {
    expect(addSource).toContain("useState('')");
    expect(addSource).toContain('Variants (optional)');
    expect(addSource).toContain('parseProductVariants');
    expect(addSource).not.toContain("useState('6205.20.00')");
  });

  it('does not generate shared synthetic barcodes for variants', () => {
    const variantSource = readFileSync(new URL('../src/features/products/utils/variants.ts', import.meta.url), 'utf8');
    expect(variantSource).toContain('barcode: undefined');
    expect(variantSource).not.toContain('barcode: input.barcode?.trim() ?');
  });

  it('offers add, edit, and delete controls for categories and subcategories', () => {
    for (const callback of ['onCreateCategory', 'onUpdateCategory', 'onDeleteCategory', 'onCreateSubcategory', 'onUpdateSubcategory', 'onDeleteSubcategory']) {
      expect(taxonomySource).toContain(callback);
    }
    expect(taxonomySource).toContain('Add Category');
    expect(taxonomySource).toContain('New subcategory');
  });
});
