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

  it('creates one product input per variant with unique names and SKUs', () => {
    expect(expandProductVariants(baseProduct, ['S', 'M', 'L'])).toMatchObject([
      { name: 'Lays Onion - S', sku: 'LAYS-ONION-S', barcode: undefined, variantsConfigured: 'S' },
      { name: 'Lays Onion - M', sku: 'LAYS-ONION-M', barcode: undefined, variantsConfigured: 'M' },
      { name: 'Lays Onion - L', sku: 'LAYS-ONION-L', barcode: undefined, variantsConfigured: 'L' },
    ]);
  });

  it('expands a single variant consistently and preserves total opening stock', () => {
    const expanded = expandProductVariants({ ...baseProduct, openingStock: 100 }, ['S', 'M', 'L', 'XL']);
    expect(expanded.map((product) => [product.name, product.sku, product.openingStock])).toEqual([
      ['Lays Onion - S', 'LAYS-ONION-S', 25],
      ['Lays Onion - M', 'LAYS-ONION-M', 25],
      ['Lays Onion - L', 'LAYS-ONION-L', 25],
      ['Lays Onion - XL', 'LAYS-ONION-XL', 25],
    ]);
  });

  it('keeps generated SKU suffixes unique when variant text normalizes to the same value', () => {
    const expanded = expandProductVariants(baseProduct, ['Blue/Green', 'Blue-Green']);
    expect(expanded.map((product) => product.sku)).toEqual(['LAYS-ONION-BLUE-GREEN', 'LAYS-ONION-BLUE-GREEN-2']);
  });

  it('keeps a single product unchanged when no variants are supplied', () => {
    expect(expandProductVariants(baseProduct, [])).toEqual([baseProduct]);
  });
});
