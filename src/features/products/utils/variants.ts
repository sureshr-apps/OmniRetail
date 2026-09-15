import { CreateProductInput } from '../types';

export const PRODUCT_VARIANT_COMBINATION_LIMIT = 50;

export interface ProductVariantDimension {
  name: string;
  values: string[];
}

export function parseProductVariants(value: string): string[] {
  const seen = new Set<string>();
  return value
    .split(/[\n,]+/)
    .map((variant) => variant.trim())
    .filter((variant) => {
      const normalized = variant.toLowerCase();
      if (!variant || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });
}

export function getProductVariantCombinationCount(dimensions: ProductVariantDimension[]): number {
  if (dimensions.length === 0) return 1;
  return dimensions.reduce((count, dimension) => count * dimension.values.length, 1);
}

function variantSuffix(variant: string, index: number, usedSuffixes: Set<string>): string {
  const baseSuffix = variant
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);
  const base = baseSuffix || `VARIANT-${index + 1}`;
  let suffix = base;
  if (usedSuffixes.has(suffix)) {
    const sequence = String(index + 1);
    suffix = `${base.slice(0, Math.max(1, 32 - sequence.length - 1))}-${sequence}`;
  }
  while (usedSuffixes.has(suffix)) suffix = `${suffix}-${index + 1}`;
  usedSuffixes.add(suffix);
  return suffix;
}

export function expandProductVariants(input: CreateProductInput, variants: string[]): CreateProductInput[] {
  return expandProductVariantDimensions(input, variants.length > 0 ? [{ name: 'Variant', values: variants }] : []);
}

export function expandProductVariantDimensions(
  input: CreateProductInput,
  dimensions: ProductVariantDimension[],
): CreateProductInput[] {
  const normalizedDimensions = dimensions
    .map((dimension) => ({
      name: dimension.name.trim(),
      values: parseProductVariants(dimension.values.join(',')).map((value) => value.trim()),
    }))
    .filter((dimension) => dimension.name || dimension.values.length > 0);

  if (normalizedDimensions.length === 0) return [input];
  if (normalizedDimensions.some((dimension) => !dimension.name || dimension.values.length === 0)) {
    throw new Error('Each variant dimension must have a name and at least one value.');
  }

  const combinationCount = getProductVariantCombinationCount(normalizedDimensions);
  if (combinationCount > PRODUCT_VARIANT_COMBINATION_LIMIT) {
    throw new Error(`A maximum of ${PRODUCT_VARIANT_COMBINATION_LIMIT} variant combinations can be created at once.`);
  }

  const combinations = normalizedDimensions.reduce<string[][]>(
    (accumulator, dimension) => accumulator.flatMap((combination) => dimension.values.map((value) => [...combination, value])),
    [[]],
  );
  const usedSuffixes = new Set<string>();

  return combinations.map((combination, index) => {
    const suffix = variantSuffix(combination.join('-'), index, usedSuffixes);
    const variantDescription = normalizedDimensions.length === 1
      ? combination[0]
      : normalizedDimensions.map((dimension, dimensionIndex) => `${dimension.name}: ${combination[dimensionIndex]}`).join(' / ');
    return {
      ...input,
      name: `${input.name.trim()} - ${combination.join(' - ')}`,
      sku: `${input.sku.trim()}-${suffix}`,
      // A shared master barcode cannot identify a specific variant. Leave it
      // unset instead of creating a non-standard value such as 890123-1.
      barcode: undefined,
      variantsConfigured: variantDescription,
    };
  });
}
