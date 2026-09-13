import React from 'react';

interface InventoryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  filteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function InventoryPagination({
  currentPage,
  totalPages,
  totalCount,
  filteredCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: InventoryPaginationProps) {
  const startItem = filteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, filteredCount);

  // Generate pagination buttons
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="px-space-base py-space-sm bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm select-none border-t border-outline-variant/20">
      {/* Left: Range and items per page */}
      <div className="flex items-center gap-space-sm">
        <span className="font-caption text-caption text-on-surface-variant">
          Showing{' '}
          <span className="font-body-mono-num font-semibold text-on-surface">
            {startItem}
          </span>{' '}
          to{' '}
          <span className="font-body-mono-num font-semibold text-on-surface">
            {endItem}
          </span>{' '}
          of{' '}
          <span className="font-body-mono-num font-semibold text-on-surface">
            {totalCount.toLocaleString()}
          </span>{' '}
          SKUs
        </span>

        <div className="h-3 w-px bg-outline-variant/30" />

        <div className="flex items-center gap-1">
          <span className="font-caption text-caption text-on-surface-variant">
            Items per page:
          </span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-6 px-1.5 rounded bg-surface-container font-body-mono-num text-caption text-on-surface border-0 focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Page Controller */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          className="h-7 w-7 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="First Page"
        >
          <span className="material-symbols-outlined text-[16px]">first_page</span>
        </button>

        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-7 w-7 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="Previous Page"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>

        <div className="flex items-center gap-1 px-1">
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1 text-on-surface-variant font-caption text-caption"
                >
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
                className={`h-7 w-7 rounded font-body-mono-num text-caption transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-7 w-7 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="Next Page"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          className="h-7 w-7 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="Last Page"
        >
          <span className="material-symbols-outlined text-[16px]">last_page</span>
        </button>
      </div>
    </div>
  );
}
