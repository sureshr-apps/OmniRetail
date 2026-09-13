import React, { useState, useRef, useEffect } from 'react';
import {
  StockStatusTab,
  InventoryTabCounts,
  SortOption,
  InventoryLocation,
  SupplierSummary,
} from '../types';

interface InventoryFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeTab: StockStatusTab;
  onTabChange: (tab: StockStatusTab) => void;
  tabCounts: InventoryTabCounts;
  selectedLocation: string;
  onLocationChange: (locId: string) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  selectedSupplier: string;
  onSupplierChange: (supId: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  locations: InventoryLocation[];
  suppliers: SupplierSummary[];
}

export function InventoryFilterBar({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  tabCounts,
  selectedLocation,
  onLocationChange,
  selectedSort,
  onSortChange,
  selectedSupplier,
  onSupplierChange,
  searchInputRef,
  locations,
  suppliers,
}: InventoryFilterBarProps) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);

  const locRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const supRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (locRef.current && !locRef.current.contains(e.target as Node)) {
        setIsLocationOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
      if (supRef.current && !supRef.current.contains(e.target as Node)) {
        setIsSupplierOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLocation =
    locations.find((l) => l.id === selectedLocation) || locations[0] || { id: 'all', name: 'Loading locations', code: '', subLabel: '' };
  const currentSupplier =
    suppliers.find((s) => s.id === selectedSupplier) || suppliers[0] || { id: 'all', name: 'Loading suppliers', code: '' };

  const getSortLabel = (s: SortOption) => {
    switch (s) {
      case 'STOCK_ASC':
        return 'Stock Ascending';
      case 'STOCK_DESC':
        return 'Stock Descending';
      case 'NAME_ASC':
        return 'Item Name';
      case 'RETAIL_PRICE_ASC':
        return 'Price: Low to High';
      case 'RETAIL_PRICE_DESC':
        return 'Price: High to Low';
      case 'MARGIN_DESC':
        return 'Highest Margin';
      default:
        return 'Stock Ascending';
    }
  };

  return (
    <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm space-y-space-base">
      {/* Search Input & Quick Filters Strip */}
      <div className="flex flex-col gap-space-sm w-full">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-2 text-[18px] text-on-surface-variant pointer-events-none">
            barcode_scanner
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by SKU, item name, internal code, or barcode..."
            className="w-full h-8 pl-9 pr-16 rounded bg-surface-container-low font-body-default text-body-default text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-transparent focus:border-primary"
          />
          <span className="absolute right-2 top-1.5 font-body-mono-num text-micro-label px-1 py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold select-none">
            F3
          </span>
        </div>
      </div>

      {/* Status Tabs & Filter Presets */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-base">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-surface-container-low font-body-medium text-body-medium select-none">
          <button
            type="button"
            onClick={() => onTabChange('ALL')}
            className={`px-space-base py-1 rounded transition-colors cursor-pointer ${
              activeTab === 'ALL'
                ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All{' '}
            <span className="font-body-mono-num text-micro-label font-bold text-on-surface-variant ml-1">
              {tabCounts.all.toLocaleString()}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('IN_STOCK')}
            className={`px-space-base py-1 rounded transition-colors cursor-pointer ${
              activeTab === 'IN_STOCK'
                ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            In Stock{' '}
            <span className="font-body-mono-num text-micro-label font-bold text-primary ml-1">
              {tabCounts.inStock.toLocaleString()}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('LOW_STOCK')}
            className={`px-space-base py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === 'LOW_STOCK'
                ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-error" />
            Low Stock{' '}
            <span className="font-body-mono-num text-micro-label font-bold text-error ml-0.5">
              {tabCounts.lowStock}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('OUT_OF_STOCK')}
            className={`px-space-base py-1 rounded transition-colors cursor-pointer ${
              activeTab === 'OUT_OF_STOCK'
                ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Out of Stock{' '}
            <span className="font-body-mono-num text-micro-label font-bold text-on-surface-variant ml-1">
              {tabCounts.outOfStock}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('OVERSTOCKED')}
            className={`px-space-base py-1 rounded transition-colors cursor-pointer ${
              activeTab === 'OVERSTOCKED'
                ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Overstocked{' '}
            <span className="font-body-mono-num text-micro-label font-bold text-tertiary ml-1">
              {tabCounts.overstocked}
            </span>
          </button>
        </div>

        {/* Filter Presets */}
        <div className="flex flex-wrap items-center gap-space-sm justify-start xl:justify-end ml-auto">
          <span className="font-caption text-caption text-on-surface-variant select-none">
            Filter presets:
          </span>

          {/* Location Dropdown */}
          <div className="relative" ref={locRef}>
            <button
              type="button"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="h-7 px-2.5 rounded bg-surface-container-low hover:bg-surface-container-high font-caption text-caption text-on-surface flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px] text-primary">domain</span>
              <span className="font-semibold">{currentLocation.name}</span>
              <span className="font-micro-label text-on-surface-variant">
                ({currentLocation.subLabel})
              </span>
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                arrow_drop_down
              </span>
            </button>

            {isLocationOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant/30 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 font-micro-label uppercase text-on-surface-variant font-bold border-b border-outline-variant/20 mb-1">
                  Filter by Location
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      onLocationChange(loc.id);
                      setIsLocationOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex flex-col hover:bg-surface-container-low transition-colors ${
                      selectedLocation === loc.id
                        ? 'bg-surface-container text-primary font-semibold'
                        : 'text-on-surface'
                    }`}
                  >
                    <span className="font-body-medium text-caption">{loc.name}</span>
                    <span className="text-[10px] text-on-surface-variant">{loc.subLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="h-7 px-2.5 rounded bg-surface-container-low hover:bg-surface-container-high font-caption text-caption text-on-surface flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Sort: {getSortLabel(selectedSort)}</span>
              <span className="material-symbols-outlined text-[14px]">swap_vert</span>
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant/30 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 font-micro-label uppercase text-on-surface-variant font-bold border-b border-outline-variant/20 mb-1">
                  Sort Inventory By
                </div>
                {[
                  { value: 'STOCK_ASC', label: 'Stock: Low to High (Asc)' },
                  { value: 'STOCK_DESC', label: 'Stock: High to Low (Desc)' },
                  { value: 'NAME_ASC', label: 'Item Name (A-Z)' },
                  { value: 'RETAIL_PRICE_ASC', label: 'Retail Price: Low to High' },
                  { value: 'RETAIL_PRICE_DESC', label: 'Retail Price: High to Low' },
                  { value: 'MARGIN_DESC', label: 'Highest Margin %' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSortChange(opt.value as SortOption);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-caption hover:bg-surface-container-low transition-colors ${
                      selectedSort === opt.value
                        ? 'bg-surface-container text-primary font-semibold'
                        : 'text-on-surface'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Supplier Dropdown */}
          <div className="relative" ref={supRef}>
            <button
              type="button"
              onClick={() => setIsSupplierOpen(!isSupplierOpen)}
              className="h-7 px-2.5 rounded bg-surface-container-low hover:bg-surface-container-high font-caption text-caption text-on-surface flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Supplier: {currentSupplier.id === 'all' ? 'All' : currentSupplier.name}</span>
              <span className="material-symbols-outlined text-[14px]">filter_list</span>
            </button>

            {isSupplierOpen && (
              <div className="absolute right-0 mt-1 w-60 bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant/30 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 font-micro-label uppercase text-on-surface-variant font-bold border-b border-outline-variant/20 mb-1">
                  Filter by Supplier
                </div>
                {suppliers.map((sup) => (
                  <button
                    key={sup.id}
                    type="button"
                    onClick={() => {
                      onSupplierChange(sup.id);
                      setIsSupplierOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-caption hover:bg-surface-container-low transition-colors ${
                      selectedSupplier === sup.id
                        ? 'bg-surface-container text-primary font-semibold'
                        : 'text-on-surface'
                    }`}
                  >
                    {sup.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
