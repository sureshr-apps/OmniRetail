import React, { RefObject } from 'react';
import { StatusFilterOption, ProductType } from '../types';

interface ProductsFilterToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: StatusFilterOption;
  onStatusFilterChange: (st: StatusFilterOption) => void;
  categoryFilter: string;
  onCategoryFilterChange: (cat: string) => void;
  brandFilter: string;
  onBrandFilterChange: (b: string) => void;
  typeFilter: ProductType | 'ALL';
  onTypeFilterChange: (t: ProductType | 'ALL') => void;
  onRefresh: () => void;
  onResetFilters: () => void;
  searchInputRef: RefObject<HTMLInputElement>;
  categories: string[];
  brands: string[];
}

export function ProductsFilterToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  brandFilter,
  onBrandFilterChange,
  typeFilter,
  onTypeFilterChange,
  onRefresh,
  onResetFilters,
  searchInputRef,
  categories,
  brands,
}: ProductsFilterToolbarProps) {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    categoryFilter !== 'All Categories' ||
    brandFilter !== 'All Brands' ||
    typeFilter !== 'ALL';

  return (
    <div className="bg-surface-container-lowest rounded-lg p-space-base shadow-sm flex flex-col gap-space-sm border border-outline-variant/20 select-none">
      {/* Search and Refresh Row */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-space-base justify-between">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-space-base top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
            search
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by product name, product code, SKU, barcode, brand, or category..."
            className="w-full h-10 pl-9 pr-16 bg-surface-container-low hover:bg-surface-container-low/90 focus:bg-surface-container-lowest text-on-surface placeholder:text-outline text-body-default font-body-default rounded-lg outline-none focus:ring-1 focus:ring-primary transition-all border border-outline-variant/30"
          />
          <div className="absolute right-space-sm top-1/2 -translate-y-1/2 pointer-events-none">
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-body-mono-num font-semibold bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
              Ctrl+F
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-space-xs self-end lg:self-auto">
          <button
            type="button"
            onClick={onRefresh}
            className="h-10 px-space-base rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center gap-space-xs transition-colors cursor-pointer border border-outline-variant/20"
            title="Reload catalogue list"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span className="font-body-medium text-body-medium">Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter Dropdown Matrix & Chips */}
      <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
        {/* Status Filter */}
        <div className="flex items-center rounded-lg bg-surface-container-low px-space-sm py-1 border border-outline-variant/20">
          <span className="font-caption text-caption text-on-surface-variant mr-1">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as StatusFilterOption)}
            className="bg-transparent text-body-default font-body-medium text-on-surface outline-none cursor-pointer text-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="INACTIVE">Inactive Only</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center rounded-lg bg-surface-container-low px-space-sm py-1 border border-outline-variant/20">
          <span className="font-caption text-caption text-on-surface-variant mr-1">
            Category:
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="bg-transparent text-body-default font-body-medium text-on-surface outline-none cursor-pointer text-xs"
          >
            {['All Categories', ...categories].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div className="flex items-center rounded-lg bg-surface-container-low px-space-sm py-1 border border-outline-variant/20">
          <span className="font-caption text-caption text-on-surface-variant mr-1">
            Brand:
          </span>
          <select
            value={brandFilter}
            onChange={(e) => onBrandFilterChange(e.target.value)}
            className="bg-transparent text-body-default font-body-medium text-on-surface outline-none cursor-pointer text-xs"
          >
            {['All Brands', ...brands].map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Product Type Filter */}
        <div className="flex items-center rounded-lg bg-surface-container-low px-space-sm py-1 border border-outline-variant/20">
          <span className="font-caption text-caption text-on-surface-variant mr-1">
            Type:
          </span>
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value as ProductType | 'ALL')}
            className="bg-transparent text-body-default font-body-medium text-on-surface outline-none cursor-pointer text-xs"
          >
            <option value="ALL">All Types</option>
            <option value="stockable">Stockable</option>
            <option value="service">Service</option>
            <option value="consumable">Consumable</option>
          </select>
        </div>

        <div className="h-5 w-[1px] bg-outline-variant mx-1 hidden sm:block" />

        {/* Active Filter Chips */}
        {statusFilter !== 'ALL' && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-caption text-caption">
            <span>Status: {statusFilter === 'ACTIVE' ? 'Active' : 'Inactive'}</span>
            <button
              type="button"
              onClick={() => onStatusFilterChange('ALL')}
              className="hover:text-primary cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        )}

        {categoryFilter !== 'All Categories' && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-caption text-caption">
            <span>Category: {categoryFilter}</span>
            <button
              type="button"
              onClick={() => onCategoryFilterChange('All Categories')}
              className="hover:text-primary cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        )}

        {brandFilter !== 'All Brands' && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-caption text-caption">
            <span>Brand: {brandFilter}</span>
            <button
              type="button"
              onClick={() => onBrandFilterChange('All Brands')}
              className="hover:text-primary cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        )}

        {typeFilter !== 'ALL' && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-caption text-caption">
            <span className="capitalize">Type: {typeFilter}</span>
            <button
              type="button"
              onClick={() => onTypeFilterChange('ALL')}
              className="hover:text-primary cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        )}

        {searchQuery.trim() !== '' && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-caption text-caption">
            <span>Search: "{searchQuery}"</span>
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="hover:text-primary cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-caption font-caption text-primary hover:underline font-semibold ml-auto cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
