import React from 'react';
import { SalesTransaction, ColumnVisibility } from '../types';
import { formatCurrency as formatInrCurrency } from '@/shared/utils/currency';

interface SalesLedgerTableProps {
  transactions: SalesTransaction[];
  columns: ColumnVisibility;
  onViewTransaction: (tx: SalesTransaction) => void;
  isLoading?: boolean;
}

export function SalesLedgerTable({
  transactions,
  columns,
  onViewTransaction,
  isLoading,
}: SalesLedgerTableProps) {
  const formatCurrency = (val: number, isVoided: boolean) => {
    const formatted = formatInrCurrency(Math.abs(val));
    if (isVoided) {
      return formatted;
    }
    return val < 0 ? `-${formatted}` : formatted;
  };

  const renderStatusBadge = (status: SalesTransaction['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="font-micro-label text-micro-label px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold inline-flex items-center justify-center min-w-0 w-28 text-center">
            COMPLETED
          </span>
        );
      case 'PARTIAL_REFUND':
        return (
          <span className="font-micro-label text-micro-label px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold inline-flex items-center justify-center min-w-0 w-28 text-center">
            PARTIAL REFUND
          </span>
        );
      case 'REFUNDED':
        return (
          <span className="font-micro-label text-micro-label px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-bold inline-flex items-center justify-center min-w-0 w-28 text-center">
            REFUNDED
          </span>
        );
      case 'VOIDED':
        return (
          <span className="font-micro-label text-micro-label px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-bold inline-flex items-center justify-center min-w-0 w-28 text-center">
            VOIDED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left font-body-default text-body-default border-collapse">
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant h-9 font-micro-label text-micro-label uppercase tracking-wider select-none">
            <th className="py-2 px-space-base font-bold whitespace-nowrap">
              Transaction / Rec #
            </th>
            {columns.timestamp && (
              <th className="py-2 px-space-base font-bold whitespace-nowrap">Timestamp</th>
            )}
            {columns.customer && (
              <th className="py-2 px-space-base font-bold whitespace-nowrap">Customer Profile</th>
            )}
            {columns.staff && (
              <th className="py-2 px-space-base font-bold whitespace-nowrap">Staff</th>
            )}
            {columns.itemsCount && (
              <th className="py-2 px-space-base font-bold whitespace-nowrap">Items Count</th>
            )}
            {columns.tender && (
              <th className="py-2 px-space-base font-bold whitespace-nowrap">Tender</th>
            )}
            {columns.taxDiscount && (
              <th className="py-2 px-space-base font-bold text-right whitespace-nowrap">
                Tax &amp; Disc
              </th>
            )}
            <th className="py-2 px-space-base font-bold text-right whitespace-nowrap">
              Total Net
            </th>
            {columns.status && (
              <th className="py-2 px-space-base font-bold text-center whitespace-nowrap">
                Status
              </th>
            )}
            <th className="py-2 px-space-base font-bold text-right whitespace-nowrap">
              Ledger Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y-0 text-on-surface font-body-default">
          {isLoading ? (
            <tr>
              <td colSpan={10} className="py-12 text-center text-on-surface-variant">
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Loading transactions...</span>
                </div>
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan={10} className="py-12 text-center text-on-surface-variant">
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[32px] text-on-surface-variant/60">
                    search_off
                  </span>
                  <p className="font-body-medium font-semibold text-on-surface">
                    No transactions match the selected filters
                  </p>
                  <p className="text-caption text-on-surface-variant">
                    Try broadening your search or adjusting the date range and dropdown filters.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            transactions.map((tx, idx) => {
              const isEven = idx % 2 === 0;
              const isRefunded = tx.status === 'REFUNDED';
              const isVoided = tx.status === 'VOIDED';
              const isCancelled = isVoided && tx.source === 'Cancelled';
              const totalUnits = tx.items.reduce((acc, i) => acc + i.quantity, 0);
              const itemsCountText = totalUnits === 1 ? '1 Item' : `${totalUnits} Items`;

              return (
                <tr
                  key={tx.id}
                  onClick={() => onViewTransaction(tx)}
                  className={`cursor-pointer hover:bg-surface-container-low transition-colors group ${
                    isEven ? 'bg-surface-container-lowest' : 'bg-surface-container-lowest/70'
                  }`}
                >
                  {/* Transaction / Rec # */}
                  <td className="py-space-sm px-space-base whitespace-nowrap">
                    <div className="flex flex-col">
                      <span
                        className={`font-body-mono-num font-bold text-body-default group-hover:underline ${
                          isRefunded
                            ? 'text-error'
                            : isCancelled
                            ? 'text-on-surface-variant'
                            : 'text-primary'
                        }`}
                      >
                        #{tx.id}
                      </span>
                      <span
                        className={`font-micro-label text-micro-label ${
                          isRefunded ? 'text-error' : 'text-on-surface-variant'
                        }`}
                      >
                        Rec #{tx.receiptNumber} · {tx.source}
                      </span>
                    </div>
                  </td>

                  {/* Timestamp */}
                  {columns.timestamp && (
                    <td className="py-space-sm px-space-base whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-body-medium text-body-medium">{tx.displayDate}</span>
                        <span className="font-body-mono-num text-caption text-on-surface-variant">
                          {tx.displayTime}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* Customer Profile */}
                  {columns.customer && (
                    <td className="py-space-sm px-space-base">
                      <div className="flex items-center gap-space-xs">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1">
                            <span
                              className={`font-body-medium text-body-medium truncate font-semibold ${
                                isCancelled ? 'text-on-surface-variant' : 'text-on-surface'
                              }`}
                            >
                              {tx.customer.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  )}

                  {/* Staff */}
                  {columns.staff && (
                    <td className="py-space-sm px-space-base whitespace-nowrap">
                      <span
                        className={`font-body-medium text-body-medium font-semibold ${
                          isCancelled ? 'text-on-surface-variant' : 'text-on-surface'
                        }`}
                      >
                        {tx.staff.name}
                      </span>
                    </td>
                  )}

                  {/* Items Count */}
                  {columns.itemsCount && (
                    <td className="py-space-sm px-space-base max-w-[220px]">
                      <span
                        className={`font-body-medium text-body-medium font-semibold ${
                          isRefunded
                            ? 'text-error'
                            : isCancelled
                            ? 'text-on-surface-variant opacity-60 line-through'
                            : 'text-on-surface'
                        }`}
                      >
                        {itemsCountText}
                      </span>
                    </td>
                  )}

                  {/* Optional Tender column if toggled */}
                  {columns.tender && (
                    <td className="py-space-sm px-space-base whitespace-nowrap">
                      <span className="font-body-mono-num text-caption font-semibold text-on-surface">
                        {tx.tender.label}
                      </span>
                    </td>
                  )}

                  {/* Tax & Disc */}
                  {columns.taxDiscount && (
                    <td className="py-space-sm px-space-base text-right font-body-mono-num whitespace-nowrap">
                      <div className={`flex flex-col ${isCancelled ? 'text-on-surface-variant opacity-60' : ''}`}>
                        <span
                          className={`text-caption ${
                            isRefunded
                              ? 'text-error font-medium'
                              : isCancelled
                              ? 'text-caption'
                              : 'text-on-surface-variant'
                          }`}
                        >
                          {tx.taxLabel}
                        </span>
                        <span
                          className={`text-micro-label ${
                            isRefunded
                              ? 'text-error'
                              : tx.discountLabel.includes('Part')
                              ? 'text-error font-semibold'
                              : tx.discountLabel.includes('VIP')
                              ? 'text-primary font-semibold'
                              : isCancelled
                              ? 'text-micro-label'
                              : 'text-on-surface-variant'
                          }`}
                        >
                          {tx.discountLabel}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* Total Net */}
                  <td className="py-space-sm px-space-base text-right whitespace-nowrap">
                    <span
                      className={`font-body-mono-num font-bold text-headline-sm ${
                        isRefunded
                          ? 'text-error'
                          : isCancelled
                          ? 'text-on-surface-variant opacity-60 line-through'
                          : 'text-on-surface'
                      }`}
                    >
                      {formatCurrency(tx.totalNet, isVoided)}
                    </span>
                  </td>

                  {/* Status */}
                  {columns.status && (
                    <td className="py-space-sm px-space-base text-center whitespace-nowrap">
                      {renderStatusBadge(tx.status)}
                    </td>
                  )}

                  {/* Ledger Actions */}
                  <td
                    className="py-space-sm px-space-base text-right whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => onViewTransaction(tx)}
                        title="View Details"
                        className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
