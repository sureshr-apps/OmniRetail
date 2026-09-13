import React from 'react';
import { InventoryItem } from '../types';

interface StockAuditHistoryModalProps {
  item: InventoryItem;
  onClose: () => void;
}

export function StockAuditHistoryModal({
  item,
  onClose,
}: StockAuditHistoryModalProps) {
  const movements = item.recentMovements || [
    {
      id: 'DEF-1',
      type: 'sale' as const,
      title: 'Sale Receipt #POS-9812',
      subtitle: 'Terminal 01 • Cashier: Alex K. • 12 mins ago',
      timeAgo: '12 mins ago',
      delta: -2,
      balanceAfter: item.onHandQty,
    },
    {
      id: 'DEF-2',
      type: 'purchase_order' as const,
      title: 'PO Receipt #PO-2024-044',
      subtitle: 'Whse Inbound • Verified by Sarah J. • Yesterday',
      timeAgo: 'Yesterday',
      delta: 25,
      balanceAfter: item.onHandQty + 2,
    },
    {
      id: 'DEF-3',
      type: 'adjustment' as const,
      title: 'Manual Adjustment - Cycle Count',
      subtitle: 'Stock verification • 3 days ago',
      timeAgo: '3 days ago',
      delta: -1,
      balanceAfter: item.onHandQty - 23,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-xl shadow-xl border border-outline-variant/30 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-space-lg py-space-base border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-surface-container text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">history</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Stock Movement Audit Trail
              </h3>
              <p className="font-caption text-caption text-on-surface-variant">
                {item.sku} • {item.name} (On-Hand: {item.onHandQty})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-space-lg overflow-y-auto max-h-[60vh] space-y-3">
          <div className="text-xs text-on-surface-variant flex items-center justify-between px-1 pb-1 border-b border-outline-variant/20 font-semibold uppercase tracking-wider">
            <span>Transaction &amp; Source</span>
            <span>Delta &amp; Balance</span>
          </div>

          {movements.map((mov) => {
            const isPositive = mov.delta > 0;
            return (
              <div
                key={mov.id}
                className="flex items-start justify-between p-2.5 rounded-lg bg-surface-container-low"
              >
                <div className="flex items-start gap-2.5">
                  {mov.type === 'sale' ? (
                    <div className="w-7 h-7 rounded-full bg-error-container/60 text-error flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[15px]">point_of_sale</span>
                    </div>
                  ) : mov.type === 'purchase_order' ? (
                    <div className="w-7 h-7 rounded-full bg-primary-fixed/60 text-on-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[15px]">inbox</span>
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[15px]">tune</span>
                    </div>
                  )}
                  <div>
                    <p className="font-body-medium text-body-medium font-semibold text-on-surface">
                      {mov.title}
                    </p>
                    <p className="font-caption text-caption text-on-surface-variant">
                      {mov.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-body-mono-num font-bold text-caption ${
                      isPositive ? 'text-primary' : 'text-error'
                    }`}
                  >
                    {isPositive ? `+${mov.delta}` : mov.delta} units
                  </span>
                  <p className="font-body-mono-num text-[11px] text-on-surface-variant">
                    Bal: {mov.balanceAfter}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-space-lg py-space-sm border-t border-outline-variant/20 bg-surface-container-low flex items-center justify-between">
          <span className="font-caption text-caption text-on-surface-variant">
            Showing last {movements.length} logged ledger movements
          </span>
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-space-base bg-surface-container hover:bg-surface-container-high text-on-surface rounded font-body-medium text-body-medium transition-colors cursor-pointer"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
}
