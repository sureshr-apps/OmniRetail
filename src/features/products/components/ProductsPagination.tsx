import React from 'react';

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  filteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function ProductsPagination({
  currentPage,
  totalPages,
  totalCount,
  filteredCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ProductsPaginationProps) {
  const startItem = filteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, filteredCount);

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
    <div className="px-space-base py-space-sm bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-t border-outline-variant/20 select-none">
      <div className="flex items-center gap-space-base">
        <span className="font-caption text-caption text-on-surface-variant">
          Showing{' '}
          <span className="font-semibold text-on-surface font-body-mono-num">
            {startItem}-{endItem}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-on-surface font-body-mono-num">
            {filteredCount.toLocaleString()}
          </span>{' '}
          products
        </span>

        <div className="h-4 w-[1px] bg-surface-container-high hidden sm:block" />

        <div className="flex items-center gap-space-xs font-caption text-caption text-on-surface-variant">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface font-body-mono-num text-caption outline-none cursor-pointer border border-outline-variant/30"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-space-2xs self-end sm:self-auto">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="First Page"
        >
          <span className="material-symbols-outlined text-[18px]">first_page</span>
        </button>

        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="Previous Page"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellip-${idx}`}
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
                className={`w-8 h-8 rounded font-body-mono-num text-body-mono-num font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-surface-container-low'
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
          className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="Next Page"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="Last Page"
        >
          <span className="material-symbols-outlined text-[18px]">last_page</span>
        </button>
      </div>
    </div>
  );
}
