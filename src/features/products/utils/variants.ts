import { CreateProductInput } from '../types';

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

function variantSuffix(variant: string, index: number): string {
  const suffix = variant
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);
  return suffix || `VARIANT-${index + 1}`;
}

export function expandProductVariants(input: CreateProductInput, variants: string[]): CreateProductInput[] {
  const normalizedVariants = variants.map((variant) => variant.trim()).filter(Boolean);
  if (normalizedVariants.length === 0) return [input];
  if (normalizedVariants.length === 1) return [{ ...input, variantsConfigured: normalizedVariants[0] }];

  return normalizedVariants.map((variant, index) => {
    const suffix = variantSuffix(variant, index);
    return {
      ...input,
      name: `${input.name.trim()} - ${variant}`,
      sku: `${input.sku.trim()}-${suffix}`,
      barcode: input.barcode?.trim() ? `${input.barcode.trim()}-${index + 1}` : undefined,
      variantsConfigured: variant,
    };
  });
}
