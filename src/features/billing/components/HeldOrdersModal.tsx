import React from 'react';
import { HeldOrder } from '../types';

interface HeldOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  heldOrders: HeldOrder[];
  onResumeOrder: (order: HeldOrder) => Promise<void>;
}

export function HeldOrdersModal({
  isOpen,
  onClose,
  heldOrders,
  onResumeOrder,
}: HeldOrdersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-md shadow-xl border border-outline-variant/40 w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="px-space-lg py-3 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-secondary">pause_circle</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Held Transactions ({heldOrders.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-space-base max-h-96 overflow-y-auto divide-y divide-outline-variant/15">
          {heldOrders.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant font-body-default">
              No orders are currently on hold.
            </div>
          ) : (
            heldOrders.map((held) => (
              <div
                key={held.id}
                className="py-3 px-2 flex items-center justify-between hover:bg-surface-container-low transition-colors rounded"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body-mono-num text-headline-sm font-bold text-on-surface">
                      {held.orderNumber}
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Held at {held.heldAt}
                    </span>
                  </div>
                  <div className="font-caption text-caption text-on-surface-variant mt-0.5">
                    Customer: <strong className="text-on-surface">{held.customer.name}</strong> ({held.customer.tier})
                  </div>
                  <div className="font-body-mono-num text-micro-label text-on-surface-variant mt-0.5">
                    {held.itemCount} items ({held.unitCount} units) · Total ${held.totalPayable.toFixed(2)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    await onResumeOrder(held);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded bg-primary hover:bg-primary-container text-on-primary font-body-medium text-body-medium transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Resume</span>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-space-base bg-surface-container-low/50 border-t border-outline-variant/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
