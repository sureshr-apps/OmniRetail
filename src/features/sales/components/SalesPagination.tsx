import React from 'react';

interface SalesPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function SalesPagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: SalesPaginationProps) {
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  // Generate page numbers array with ellipsis if needed
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="p-space-base bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-base select-none">
      {/* Left: item range counter */}
      <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
        <span>Showing</span>
        <span className="font-body-mono-num font-bold text-on-surface">
          {startItem} - {endItem}
        </span>
        <span>of</span>
        <span className="font-body-mono-num font-bold text-on-surface">{totalCount}</span>
        <span>transactions logged</span>
      </div>

      {/* Right: rows selector and page buttons */}
      <div className="flex items-center gap-space-xs">
        <div className="flex items-center gap-1 font-caption text-caption text-on-surface-variant mr-2">
          <span>Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-7 px-1.5 bg-surface-container rounded text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Previous button */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center disabled:opacity-40 transition-colors shadow-xs cursor-pointer disabled:cursor-not-allowed"
          title="Previous Page"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>

        {/* Page buttons */}
        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="text-on-surface-variant text-caption px-1">
                ...
              </span>
            );
          }
          const pageNum = Number(p);
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`h-8 px-3 rounded font-body-mono-num text-caption flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface font-medium'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next button */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center disabled:opacity-40 transition-colors shadow-xs cursor-pointer disabled:cursor-not-allowed"
          title="Next Page"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
