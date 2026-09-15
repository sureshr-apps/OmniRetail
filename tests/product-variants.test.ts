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
      { name: 'Color', values: ['Red', 'Blue', 'Green'] },
      { name: 'Size', values: ['S', 'M', 'L'] },
    ];

    expect(getProductVariantCombinationCount(dimensions)).toBe(9);
    expect(expandProductVariantDimensions(baseProduct, dimensions).map((product) => ({
      name: product.name,
      sku: product.sku,
      variantsConfigured: product.variantsConfigured,
    }))).toEqual([
      { name: 'Lays Onion - Red - S', sku: 'LAYS-ONION-RED-S', variantsConfigured: 'Color: Red / Size: S' },
      { name: 'Lays Onion - Red - M', sku: 'LAYS-ONION-RED-M', variantsConfigured: 'Color: Red / Size: M' },
      { name: 'Lays Onion - Red - L', sku: 'LAYS-ONION-RED-L', variantsConfigured: 'Color: Red / Size: L' },
      { name: 'Lays Onion - Blue - S', sku: 'LAYS-ONION-BLUE-S', variantsConfigured: 'Color: Blue / Size: S' },
      { name: 'Lays Onion - Blue - M', sku: 'LAYS-ONION-BLUE-M', variantsConfigured: 'Color: Blue / Size: M' },
      { name: 'Lays Onion - Blue - L', sku: 'LAYS-ONION-BLUE-L', variantsConfigured: 'Color: Blue / Size: L' },
      { name: 'Lays Onion - Green - S', sku: 'LAYS-ONION-GREEN-S', variantsConfigured: 'Color: Green / Size: S' },
      { name: 'Lays Onion - Green - M', sku: 'LAYS-ONION-GREEN-M', variantsConfigured: 'Color: Green / Size: M' },
      { name: 'Lays Onion - Green - L', sku: 'LAYS-ONION-GREEN-L', variantsConfigured: 'Color: Green / Size: L' },
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

  it('splits opening stock across every generated combination without losing units', () => {
    const expanded = expandProductVariantDimensions({ ...baseProduct, openingStock: 100 }, [
      { name: 'Color', values: ['Red', 'Blue'] },
      { name: 'Size', values: ['S', 'M', 'L'] },
    ]);

    expect(expanded).toHaveLength(6);
    expect(expanded.map((product) => product.openingStock)).toEqual([16.67, 16.67, 16.67, 16.67, 16.66, 16.66]);
    expect(expanded.reduce((total, product) => total + (product.openingStock ?? 0), 0)).toBe(100);
  });

  it('rejects incomplete dimensions and combinations over the batch limit', () => {
    expect(() => expandProductVariantDimensions(baseProduct, [{ name: 'Color', values: [] }]))
      .toThrow('Each variant dimension must have a name and at least one value.');
    expect(() => expandProductVariantDimensions(baseProduct, [
      { name: 'Color', values: Array.from({ length: 10 }, (_, index) => `C${index}`) },
      { name: 'Size', values: Array.from({ length: 6 }, (_, index) => `S${index}`) },
    ])).toThrow('A maximum of 50 variant combinations');
  });
});
