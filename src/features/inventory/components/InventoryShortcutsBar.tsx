import React from 'react';

interface InventoryShortcutsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onFocusSearch: () => void;
  onAdjustSelected: () => void;
  onPrintBarcodes: () => void;
}

export function InventoryShortcutsBar({
  selectedCount,
  onClearSelection,
  onFocusSearch,
  onAdjustSelected,
  onPrintBarcodes,
}: InventoryShortcutsBarProps) {
  return (
    <div className="p-space-base rounded-lg bg-surface-container-low flex flex-wrap items-center justify-between gap-space-base select-none">
      {/* Left: Selection status */}
      <div className="flex items-center gap-space-base">
        {selectedCount > 0 ? (
          <div className="flex items-center gap-2">
            <span className="font-caption text-caption text-primary font-bold">
              {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
            </span>
            <button
              type="button"
              onClick={onClearSelection}
              className="h-6 px-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-caption text-caption transition-colors cursor-pointer"
            >
              Clear Selection
            </button>
            <button
              type="button"
              onClick={onAdjustSelected}
              className="h-6 px-2.5 rounded bg-primary hover:bg-primary-container text-on-primary font-caption text-caption font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">exposure</span>
              <span>Adjust Stock</span>
            </button>
          </div>
        ) : (
          <span className="font-caption text-caption text-on-surface-variant">
            Select rows to perform terminal actions
          </span>
        )}
      </div>

      {/* Right: Shortcuts */}
      <div className="flex items-center gap-space-base">
        <button
          type="button"
          onClick={onFocusSearch}
          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer text-left"
          title="Focus Search Input (F3)"
        >
          <span className="font-body-mono-num text-micro-label px-1.5 py-0.5 rounded bg-surface-container font-bold text-on-surface border border-outline-variant/30">
            F3
          </span>
          <span className="font-caption text-caption text-on-surface-variant">
            Focus Search
          </span>
        </button>

        <button
          type="button"
          onClick={onAdjustSelected}
          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer text-left"
          title="Adjust Stock for Selected Item (F4)"
        >
          <span className="font-body-mono-num text-micro-label px-1.5 py-0.5 rounded bg-surface-container font-bold text-on-surface border border-outline-variant/30">
            F4
          </span>
          <span className="font-caption text-caption text-on-surface-variant">
            Adjust Selected
          </span>
        </button>

        <button
          type="button"
          onClick={onPrintBarcodes}
          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer text-left"
          title="Print Barcodes (Ctrl+P)"
        >
          <span className="font-body-mono-num text-micro-label px-1.5 py-0.5 rounded bg-surface-container font-bold text-on-surface border border-outline-variant/30">
            Ctrl+P
          </span>
          <span className="font-caption text-caption text-on-surface-variant">
            Print Barcodes
          </span>
        </button>
      </div>
    </div>
  );
}
