import React from 'react';

interface CustomersPaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  filteredCount: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

export function CustomersPagination({
  page,
  pageSize,
  filteredCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: CustomersPaginationProps) {
  const fromIndex = filteredCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const toIndex = Math.min(page * pageSize, filteredCount);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="px-space-base py-3 bg-surface-container-low border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-space-base select-none">
      {/* Result range and page size selector */}
      <div className="flex items-center gap-space-sm text-caption text-on-surface-variant">
        <span>
          Showing <strong className="text-on-surface">{fromIndex}-{toIndex}</strong> of{' '}
          <strong className="text-on-surface">{filteredCount}</strong> customers
        </span>
        <div className="h-3 w-px bg-outline-variant/40" />
        <div className="flex items-center gap-space-xs">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-surface-container rounded px-1.5 py-0.5 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={`px-2.5 py-1 rounded border border-outline-variant/30 font-caption transition-colors ${
            page <= 1
              ? 'bg-surface-container text-on-surface-variant opacity-50 cursor-not-allowed'
              : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
          }`}
        >
          Previous
        </button>

        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-1 text-caption text-on-surface-variant">
                ...
              </span>
            );
          }
          const isCurrent = p === page;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(Number(p))}
              className={`px-2.5 py-1 rounded border font-caption transition-colors ${
                isCurrent
                  ? 'border-primary bg-primary text-on-primary font-semibold'
                  : 'border-outline-variant/30 bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={`px-2.5 py-1 rounded border border-outline-variant/30 font-caption transition-colors ${
            page >= totalPages
              ? 'bg-surface-container text-on-surface-variant opacity-50 cursor-not-allowed'
              : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
