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

function openingStockForVariant(total: number | undefined, variantCount: number, index: number): number | undefined {
  if (total === undefined || !Number.isFinite(total) || total < 0) return undefined;
  const totalCents = Math.round(total * 100);
  const baseCents = Math.floor(totalCents / variantCount);
  const remainderCents = totalCents % variantCount;
  return (baseCents + (index < remainderCents ? 1 : 0)) / 100;
}

export function expandProductVariants(input: CreateProductInput, variants: string[]): CreateProductInput[] {
  const normalizedVariants = variants.map((variant) => variant.trim()).filter(Boolean);
  if (normalizedVariants.length === 0) return [input];
  const usedSuffixes = new Set<string>();

  return normalizedVariants.map((variant, index) => {
    const suffix = variantSuffix(variant, index, usedSuffixes);
    return {
      ...input,
      name: `${input.name.trim()} - ${variant}`,
      sku: `${input.sku.trim()}-${suffix}`,
      // A shared master barcode cannot identify a specific variant. Leave it
      // unset instead of creating a non-standard value such as 890123-1.
      barcode: undefined,
      openingStock: openingStockForVariant(input.openingStock, normalizedVariants.length, index),
      variantsConfigured: variant,
    };
  });
}
