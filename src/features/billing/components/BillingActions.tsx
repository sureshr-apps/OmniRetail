import React from 'react';

interface BillingActionsProps {
  heldCount: number;
  onCustomer: () => void;
  onDiscount: () => void;
  onHoldList: () => void;
  onPriceCheck: () => void;
  onDrawerOpen: () => void;
  onVoidItem: () => void;
  onHoldCurrentOrder: () => void;
  onCustomItem: () => void;
}

export function BillingActions({
  heldCount,
  onCustomer,
  onDiscount,
  onHoldList,
  onPriceCheck,
  onDrawerOpen,
  onVoidItem,
  onHoldCurrentOrder,
  onCustomItem,
}: BillingActionsProps) {
  return (
    <div className="flex flex-col gap-space-sm">
      {/* 6 Action Shortcut Buttons with Header */}
      <div className="bg-surface-container-lowest p-space-sm rounded shadow-sm border border-outline-variant/30 flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-micro-label text-micro-label uppercase tracking-wider text-on-surface-variant font-bold">
            FUNCTION KEYS (F1-F9)
          </span>
          <span className="font-caption text-micro-label text-on-surface-variant font-medium">
            Active Register Shortcuts
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-space-xs text-center">
          {/* F1: Customer */}
          <button
            type="button"
            onClick={onCustomer}
            className="p-2 rounded bg-surface-container-low hover:bg-surface-container flex flex-col items-center gap-1 transition-colors group cursor-pointer border border-outline-variant/20 shadow-xs active:scale-95"
            title="Customer Lookup (F1)"
          >
            <span className="font-body-mono-num text-caption px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors border border-outline-variant/40">
              F1
            </span>
            <span className="font-caption text-caption text-on-surface font-medium truncate w-full">
              Customer
            </span>
          </button>

          {/* F2: Discount */}
          <button
            type="button"
            onClick={onDiscount}
            className="p-2 rounded bg-surface-container-low hover:bg-surface-container flex flex-col items-center gap-1 transition-colors group cursor-pointer border border-outline-variant/20 shadow-xs active:scale-95"
            title="Apply Discount (F2)"
          >
            <span className="font-body-mono-num text-caption px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors border border-outline-variant/40">
              F2
            </span>
            <span className="font-caption text-caption text-on-surface font-medium truncate w-full">
              Discount
            </span>
          </button>

          {/* F3: Hold List */}
          <button
            type="button"
            onClick={onHoldList}
            className="p-2 rounded bg-surface-container-low hover:bg-surface-container flex flex-col items-center gap-1 transition-colors group relative cursor-pointer border border-outline-variant/20 shadow-xs active:scale-95"
            title="Held Orders (F3)"
          >
            {heldCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary ring-1 ring-surface-container-lowest" />
            )}
            <span className="font-body-mono-num text-caption px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors border border-outline-variant/40">
              F3
            </span>
            <span className="font-caption text-caption text-on-surface font-medium truncate w-full">
              Hold ({heldCount})
            </span>
          </button>

          {/* F4: Price Check */}
          <button
            type="button"
            onClick={onPriceCheck}
            className="p-2 rounded bg-surface-container-low hover:bg-surface-container flex flex-col items-center gap-1 transition-colors group cursor-pointer border border-outline-variant/20 shadow-xs active:scale-95"
            title="Price Check (F4)"
          >
            <span className="font-body-mono-num text-caption px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors border border-outline-variant/40">
              F4
            </span>
            <span className="font-caption text-caption text-on-surface font-medium truncate w-full">
              Price Check
            </span>
          </button>

          {/* F8: Drawer Open */}
          <button
            type="button"
            onClick={onDrawerOpen}
            className="p-2 rounded bg-surface-container-low hover:bg-surface-container flex flex-col items-center gap-1 transition-colors group cursor-pointer border border-outline-variant/20 shadow-xs active:scale-95"
            title="Open Cash Drawer (F8)"
          >
            <span className="font-body-mono-num text-caption px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors border border-outline-variant/40">
              F8
            </span>
            <span className="font-caption text-caption text-on-surface font-medium truncate w-full">
              Drawer Open
            </span>
          </button>

          {/* F9: Void Item */}
          <button
            type="button"
            onClick={onVoidItem}
            className="p-2 rounded bg-error-container/40 hover:bg-error-container text-on-error-container flex flex-col items-center gap-1 transition-colors group cursor-pointer border border-error/30 shadow-xs active:scale-95"
            title="Void Selected Item (F9)"
          >
            <span className="font-body-mono-num text-caption px-1.5 py-0.2 rounded bg-error/20 text-on-error-container font-bold">
              F9
            </span>
            <span className="font-caption text-caption font-semibold truncate w-full text-on-error-container">
              Void Item
            </span>
          </button>
        </div>
      </div>

      {/* Action Row: Hold Order & Custom Item */}
      <div className="grid grid-cols-2 gap-space-sm">
        <button
          type="button"
          onClick={onHoldCurrentOrder}
          className="h-11 px-space-base rounded bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/40 text-on-surface flex items-center justify-between transition-colors shadow-xs group cursor-pointer active:scale-98"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              pause_circle
            </span>
            <span className="font-body-medium text-body-medium font-semibold">Hold Order</span>
          </div>
          <span className="font-body-mono-num text-micro-label px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-bold border border-outline-variant/30">
            Hold (F3)
          </span>
        </button>

        <button
          type="button"
          onClick={onCustomItem}
          className="h-11 px-space-base rounded bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/40 text-on-surface flex items-center justify-between transition-colors shadow-xs group cursor-pointer active:scale-98"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">
              add_circle
            </span>
            <span className="font-body-medium text-body-medium font-semibold">Custom Item</span>
          </div>
          <span className="font-body-mono-num text-micro-label px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-bold border border-outline-variant/30">
            F10
          </span>
        </button>
      </div>
    </div>
  );
}
