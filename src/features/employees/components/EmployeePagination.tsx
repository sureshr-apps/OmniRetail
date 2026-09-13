import React from 'react';

interface EmployeePaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function EmployeePagination({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: EmployeePaginationProps) {
  if (totalItems === 0) return null;

  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="px-space-lg py-3 bg-surface-container-low border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
      {/* Summary and rows per page */}
      <div className="flex items-center gap-space-sm font-caption text-caption text-on-surface-variant">
        <span>
          Showing <strong className="text-on-surface">{startItem} to {endItem}</strong> of{' '}
          <strong className="text-on-surface">{totalItems}</strong> employees
        </span>
        <span className="text-outline-variant">•</span>
        <div className="flex items-center gap-1.5">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-7 px-1.5 rounded bg-surface-container-lowest border border-outline-variant/40 font-caption text-caption text-on-surface focus:outline-none cursor-pointer"
          >
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-2.5 py-1 rounded border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container font-caption text-caption disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
              className={`px-2.5 py-1 rounded font-caption text-caption transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary font-semibold shadow-2xs'
                  : 'border border-outline-variant/40 bg-surface-container-lowest text-on-surface hover:bg-surface-container'
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
          className="px-2.5 py-1 rounded border border-outline-variant/40 bg-surface-container-lowest text-on-surface hover:bg-surface-container font-caption text-caption disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
