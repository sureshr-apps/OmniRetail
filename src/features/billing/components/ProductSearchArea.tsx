import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';

interface ProductSearchAreaProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categories: Array<{ id: string; label: string }>;
  filteredProducts: Product[];
  onAddProduct: (product: Product) => void;
  onOpenPriceCheck: () => void;
}

export function ProductSearchArea({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categories,
  filteredProducts,
  onAddProduct,
  onOpenPriceCheck,
}: ProductSearchAreaProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // If exact match or first result exists, add to cart
      if (filteredProducts.length > 0) {
        onAddProduct(filteredProducts[0]);
        onSearchChange('');
        setIsDropdownOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectProduct = (product: Product) => {
    onAddProduct(product);
    onSearchChange('');
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-surface-container-lowest p-space-base rounded shadow-sm border border-outline-variant/30 flex flex-col gap-space-sm shrink-0 relative">
      {/* Search and F4 Price Check button */}
      <div className="flex items-center gap-space-sm relative">
        <div className="relative flex-1 flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[18px] text-primary pointer-events-none">
            barcode_scanner
          </span>
          <input
            ref={inputRef}
            autoFocus
            id="barcodeInput"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => {
              if (searchQuery.trim().length > 0) {
                setIsDropdownOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Scan barcode or press / to search items..."
            className="w-full h-10 pl-10 pr-24 rounded bg-surface-container-low font-body-default text-body-default text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest shadow-inner border border-transparent focus:border-primary/40 transition-colors"
          />
          <div className="absolute right-2.5 flex items-center gap-1.5 pointer-events-none">
            <span className="font-body-mono-num text-caption px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
              /
            </span>
            <span className="font-body-mono-num text-caption px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
              Enter
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenPriceCheck}
          className="h-10 px-space-base rounded bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 flex items-center gap-2 transition-colors shrink-0 text-on-surface select-none shadow-xs cursor-pointer active:scale-95"
          title="Price Check (F4)"
        >
          <span className="font-body-mono-num text-micro-label px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface font-bold border border-outline-variant/40">
            F4
          </span>
          <span className="font-body-medium text-caption font-semibold">Price Check</span>
        </button>

        {/* Live Search & Barcode Matching Dropdown */}
        {isDropdownOpen && searchQuery.trim().length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-0 top-12 w-full max-w-2xl bg-surface-container-lowest rounded-md shadow-xl border border-outline-variant/40 py-1 z-50 max-h-72 overflow-y-auto"
          >
            <div className="px-3 py-1.5 text-micro-label uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/20 flex justify-between">
              <span>Matching Catalog Items ({filteredProducts.length})</span>
              <span>Press Enter or Click to Add</span>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="px-4 py-6 text-center text-on-surface-variant font-body-default">
                No catalog items matching "{searchQuery}".
              </div>
            ) : (
              <div className="divide-y divide-outline-variant/15">
                {filteredProducts.map((prod, idx) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => handleSelectProduct(prod)}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-primary-fixed/20 transition-colors cursor-pointer ${
                      idx === 0 ? 'bg-primary-fixed/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-body-mono-num text-caption text-on-surface-variant font-semibold w-24">
                        {prod.sku}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-body-medium text-body-medium text-on-surface font-semibold">
                          {prod.name}
                        </span>
                        <span className="text-caption text-on-surface-variant">
                          Barcode: {prod.barcode} · {prod.stock} in stock
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-body-mono-num text-body-medium text-primary font-bold">
                        ₹{prod.rate.toFixed(2)}
                      </span>
                      {prod.discount > 0 && (
                        <div className="font-body-mono-num text-micro-label text-outline line-through">
                          MRP ₹{prod.mrp.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-space-xs overflow-x-auto pb-0.5 select-none scrollbar-none">
        {[{ id: 'all', label: 'All Items' }, ...categories].map((category) => (
          <button key={category.id} type="button" onClick={() => onCategorySelect(category.id)} className={`px-3 py-1.5 rounded-full text-caption font-semibold whitespace-nowrap ${selectedCategory === category.id ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
