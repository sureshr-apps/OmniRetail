// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProductSearchArea } from '@/features/billing/components/ProductSearchArea';
import type { Product } from '@/features/billing/types';

afterEach(cleanup);

const products: Product[] = [
  { id: 'product-1', sku: 'SKU-1', name: 'Lays Classic', category: 'snacks', stock: 10, mrp: 20, discount: 0, rate: 20, barcode: '111' },
  { id: 'product-2', sku: 'SKU-2', name: 'Lays Onion', category: 'snacks', stock: 8, mrp: 25, discount: 0, rate: 25, barcode: '222' },
  { id: 'product-3', sku: 'SKU-3', name: 'Lays Masala', category: 'snacks', stock: 6, mrp: 30, discount: 0, rate: 30, barcode: '333' },
];

function renderSearch() {
  return render(
    <ProductSearchArea
      searchQuery="lays"
      onSearchChange={vi.fn()}
      selectedCategory="all"
      onCategorySelect={vi.fn()}
      categories={[]}
      filteredProducts={products}
      onAddProduct={vi.fn()}
      onOpenPriceCheck={vi.fn()}
    />,
  );
}

describe('Billing product search keyboard navigation', () => {
  it('moves the active result with ArrowDown and ArrowUp and selects it with Enter', () => {
    const addProduct = vi.fn();
    render(
      <ProductSearchArea
        searchQuery="lays"
        onSearchChange={vi.fn()}
        selectedCategory="all"
        onCategorySelect={vi.fn()}
        categories={[]}
        filteredProducts={products}
        onAddProduct={addProduct}
        onOpenPriceCheck={vi.fn()}
      />,
    );

    const input = screen.getByPlaceholderText('Scan barcode or press / to search items...');
    fireEvent.focus(input);
    const results = screen.getAllByRole('option');
    expect(results[0]).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(results[1]).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(results[2]).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(results[1]).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(addProduct).toHaveBeenCalledWith(products[1]);
  });

  it('wraps ArrowUp from the first result to the last result', () => {
    renderSearch();
    const input = screen.getByPlaceholderText('Scan barcode or press / to search items...');
    fireEvent.focus(input);
    const results = screen.getAllByRole('option');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(results[2]).toHaveAttribute('aria-selected', 'true');
  });
});
