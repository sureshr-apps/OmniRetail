import React from 'react';

interface ServicePersonPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function ServicePersonPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ServicePersonPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="px-space-lg py-space-base bg-surface-container-low border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-space-base select-none">
      {/* Summary and rows per page */}
      <div className="flex items-center gap-space-base">
        <span className="font-caption text-caption text-on-surface-variant">
          Showing <strong className="text-on-surface">{startItem} to {endItem}</strong> of{' '}
          <strong className="text-on-surface">{totalItems}</strong> service persons
        </span>
        <div className="flex items-center gap-space-xs">
          <span className="font-caption text-caption text-on-surface-variant">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-7 px-2 rounded bg-surface border border-outline-variant/40 font-caption text-caption text-on-surface focus:outline-none focus:border-primary"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 h-7 rounded border border-outline-variant/40 bg-surface text-caption text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 rounded font-caption text-caption flex items-center justify-center transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'hover:bg-surface-container-high text-on-surface'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 h-7 rounded border border-outline-variant/40 bg-surface text-caption text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
