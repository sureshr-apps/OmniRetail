import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const tableSource = readFileSync(new URL('../src/features/products/components/ProductsTable.tsx', import.meta.url), 'utf8');
const addSource = readFileSync(new URL('../src/features/products/components/AddProductModal.tsx', import.meta.url), 'utf8');
const editSource = readFileSync(new URL('../src/features/products/components/EditProductModal.tsx', import.meta.url), 'utf8');
const detailSource = readFileSync(new URL('../src/features/products/components/ProductDetailDrawer.tsx', import.meta.url), 'utf8');
const taxonomySource = readFileSync(new URL('../src/features/products/components/ManageProductTaxonomyModal.tsx', import.meta.url), 'utf8');

describe('product UI contract', () => {
  it('keeps only view details in the product table actions', () => {
    expect(tableSource).toContain('title="View Details"');
    for (const removedAction of ['onEditProduct', 'onToggleStatus', 'more_vert', 'View Multi-Store Stock Status']) {
      expect(tableSource).not.toContain(removedAction);
    }
  });

  it('does not imply that catalogue products belong to a specific outlet', () => {
    expect(detailSource).not.toContain('Downtown Flagship');
    expect(detailSource).not.toContain('Multi-Store Ledger');
  });

  it('does not prefill HSN and supports multi-dimensional variant creation in the add form', () => {
    expect(addSource).toContain("useState('')");
    expect(addSource).toContain('Variant Values (optional)');
    expect(addSource).toContain('+ Add Value Group');
    expect(addSource).toContain('Every combination becomes a separate product and SKU.');
    expect(addSource).toContain('variantCombinationCount');
    expect(addSource).toContain('parseProductVariants');
    expect(addSource).not.toContain('dimension.name');
    expect(addSource).not.toContain('Variant dimension');
    expect(addSource).not.toContain('Opening Master Stock');
    expect(addSource).not.toContain('Opening Receiving Store');
    expect(addSource.indexOf('4. Supplier Linkage')).toBeLessThan(addSource.indexOf('5. Inventory &amp; Reorder Thresholds'));
    expect(addSource).not.toContain("useState('6205.20.00')");
  });

  it('uses organization taxonomy tables as non-editable category and subcategory selects', () => {
    for (const formSource of [addSource, editSource]) {
      expect(formSource).toContain('<select');
      expect(formSource).toContain('categoryOptions.map');
      expect(formSource).toContain('availableSubcategories.map');
      expect(formSource).toContain('Select a category');
      expect(formSource).toContain('No subcategory');
      expect(formSource).not.toContain('datalist id="product-category-options"');
      expect(formSource).not.toContain('datalist id="edit-product-category-options"');
      expect(formSource).not.toContain('datalist id="product-subcategory-options"');
      expect(formSource).not.toContain('datalist id="edit-product-subcategory-options"');
      expect(formSource).not.toContain('categories: string[]');
    }
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
