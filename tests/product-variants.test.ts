import { describe, expect, it } from 'vitest';
import {
  expandProductVariantDimensions,
  expandProductVariants,
  getProductVariantCombinationCount,
  parseProductVariants,
} from '../src/features/products/utils/variants';

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

  it('creates the Cartesian product for multiple variant dimensions', () => {
    const dimensions = [
      { values: ['Red', 'Blue', 'Green'] },
      { values: ['S', 'M', 'L'] },
    ];

    expect(getProductVariantCombinationCount(dimensions)).toBe(9);
    expect(expandProductVariantDimensions(baseProduct, dimensions).map((product) => ({
      name: product.name,
      sku: product.sku,
      variantsConfigured: product.variantsConfigured,
    }))).toEqual([
      { name: 'Lays Onion - Red - S', sku: 'LAYS-ONION-RED-S', variantsConfigured: 'Red / S' },
      { name: 'Lays Onion - Red - M', sku: 'LAYS-ONION-RED-M', variantsConfigured: 'Red / M' },
      { name: 'Lays Onion - Red - L', sku: 'LAYS-ONION-RED-L', variantsConfigured: 'Red / L' },
      { name: 'Lays Onion - Blue - S', sku: 'LAYS-ONION-BLUE-S', variantsConfigured: 'Blue / S' },
      { name: 'Lays Onion - Blue - M', sku: 'LAYS-ONION-BLUE-M', variantsConfigured: 'Blue / M' },
      { name: 'Lays Onion - Blue - L', sku: 'LAYS-ONION-BLUE-L', variantsConfigured: 'Blue / L' },
      { name: 'Lays Onion - Green - S', sku: 'LAYS-ONION-GREEN-S', variantsConfigured: 'Green / S' },
      { name: 'Lays Onion - Green - M', sku: 'LAYS-ONION-GREEN-M', variantsConfigured: 'Green / M' },
      { name: 'Lays Onion - Green - L', sku: 'LAYS-ONION-GREEN-L', variantsConfigured: 'Green / L' },
    ]);
  });

  it('keeps generated SKU suffixes unique when variant text normalizes to the same value', () => {
    const expanded = expandProductVariants(baseProduct, ['Blue/Green', 'Blue-Green']);
    expect(expanded.map((product) => product.sku)).toEqual(['LAYS-ONION-BLUE-GREEN', 'LAYS-ONION-BLUE-GREEN-2']);
  });

  it('keeps a single product unchanged when no variants are supplied', () => {
    expect(expandProductVariants(baseProduct, [])).toEqual([baseProduct]);
  });

  it('ignores empty value groups and rejects combinations over the batch limit', () => {
    expect(expandProductVariantDimensions(baseProduct, [{ values: [] }])).toEqual([baseProduct]);
    expect(() => expandProductVariantDimensions(baseProduct, [
      { values: Array.from({ length: 10 }, (_, index) => `C${index}`) },
      { values: Array.from({ length: 6 }, (_, index) => `S${index}`) },
    ])).toThrow('A maximum of 50 variant combinations');
  });
});
