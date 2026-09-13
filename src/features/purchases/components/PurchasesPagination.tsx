import React from 'react';

interface PurchasesPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  filteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function PurchasesPagination({
  currentPage,
  totalPages,
  totalCount,
  filteredCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PurchasesPaginationProps) {
  const startItem = filteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, filteredCount);

  // Generate page numbers
  const pages: number[] = [];
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="px-4 py-3 border-t border-outline-variant/30 bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      {/* Left: Summary & Rows per page */}
      <div className="flex items-center gap-3 text-on-surface-variant">
        <span>
          Showing{' '}
          <strong className="text-on-surface font-semibold">
            {startItem}-{endItem}
          </strong>{' '}
          of <strong className="text-on-surface font-semibold">{filteredCount}</strong> purchases
          {filteredCount !== totalCount && ` (filtered from ${totalCount})`}
        </span>

        <div className="flex items-center gap-1 pl-3 border-l border-outline-variant/40">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="py-1 px-2 bg-surface-container-lowest border border-outline-variant/50 rounded text-xs font-medium text-on-surface focus:ring-0 focus:border-primary cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Right: Page Navigation Buttons */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1 rounded border border-outline-variant/50 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="Previous Page"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>

        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`size-7 rounded text-xs font-medium flex items-center justify-center cursor-pointer transition-colors ${
                isActive
                  ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                  : 'border border-outline-variant/40 hover:bg-surface-container text-on-surface'
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
          className="p-1 rounded border border-outline-variant/50 bg-surface-container-lowest text-on-surface hover:bg-surface-container disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          title="Next Page"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
