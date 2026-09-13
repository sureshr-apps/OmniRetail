import React from 'react';

interface ExpensesPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  filteredCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function ExpensesPagination({
  currentPage,
  totalPages,
  pageSize,
  filteredCount,
  onPageChange,
  onPageSizeChange,
}: ExpensesPaginationProps) {
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
    <div className="p-space-base bg-surface-container-low/40 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-space-sm font-caption text-caption text-on-surface-variant">
      <div className="flex items-center gap-space-md flex-wrap">
        <span>
          Showing <strong className="text-on-surface">{startItem} to {endItem}</strong> of{' '}
          <strong className="text-on-surface">{filteredCount}</strong> expenses
        </span>
        <span className="text-outline-variant hidden sm:inline">|</span>
        <div className="flex items-center gap-1.5">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-7 px-1.5 rounded bg-surface-container-lowest text-on-surface font-body-mono-num text-body-mono-num border border-outline-variant/30 outline-none cursor-pointer"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-7 px-2 rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface disabled:opacity-40 transition-colors font-medium border border-outline-variant/30 cursor-pointer disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {getPageNumbers().map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-1 text-outline select-none">
                ...
              </span>
            );
          }
          const pageNum = Number(page);
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`h-7 w-7 rounded font-body-mono-num text-body-mono-num font-bold transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low border border-outline-variant/30'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
          className="h-7 px-2 rounded bg-surface-container-lowest text-on-surface hover:text-primary disabled:opacity-40 transition-colors font-medium border border-outline-variant/30 cursor-pointer disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
