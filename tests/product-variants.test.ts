import { describe, expect, it } from 'vitest';
import { expandProductVariants, parseProductVariants } from '../src/features/products/utils/variants';

const baseProduct = {
  name: 'Lays Onion',
  brand: 'Lays',
  categoryName: 'Snacks',
  type: 'stockable' as const,
  sku: 'LAYS-ONION',
  barcode: '890123',
  sellingPrice: 20,
};

describe('product variant expansion', () => {
  it('parses comma or newline separated variants and removes duplicates', () => {
    expect(parseProductVariants('S, M\nL, s, M')).toEqual(['S', 'M', 'L']);
  });

  it('creates one product input per variant with unique names, SKUs, and barcodes', () => {
    expect(expandProductVariants(baseProduct, ['S', 'M', 'L'])).toMatchObject([
      { name: 'Lays Onion - S', sku: 'LAYS-ONION-S', barcode: '890123-1', variantsConfigured: 'S' },
      { name: 'Lays Onion - M', sku: 'LAYS-ONION-M', barcode: '890123-2', variantsConfigured: 'M' },
      { name: 'Lays Onion - L', sku: 'LAYS-ONION-L', barcode: '890123-3', variantsConfigured: 'L' },
    ]);
  });

  it('keeps a single product unchanged when no variants are supplied', () => {
    expect(expandProductVariants(baseProduct, [])).toEqual([baseProduct]);
  });
});
