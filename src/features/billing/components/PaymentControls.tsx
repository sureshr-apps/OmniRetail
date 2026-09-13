import React from 'react';
import { PaymentMethod } from '../types';

interface PaymentControlsProps {
  selectedMode: PaymentMethod;
  onSelectMode: (mode: PaymentMethod) => void;
  totalPayable: number;
  onCancelOrder: () => void;
  onCompleteSale: () => void;
  disabled?: boolean;
}

export function PaymentControls({
  selectedMode,
  onSelectMode,
  totalPayable,
  onCancelOrder,
  onCompleteSale,
  disabled = false,
}: PaymentControlsProps) {
  const modes: {
    id: PaymentMethod;
    label: string;
    icon: string;
    shortcut: string;
    iconColor?: string;
  }[] = [
    { id: 'card', label: 'Card', icon: 'credit_card', shortcut: 'F5' },
    { id: 'cash', label: 'Cash', icon: 'payments', shortcut: 'F6', iconColor: 'text-secondary' },
    { id: 'digital', label: 'Digital', icon: 'qr_code_2', shortcut: 'F7', iconColor: 'text-primary' },
    { id: 'split', label: 'Split', icon: 'call_split', shortcut: 'F8', iconColor: 'text-on-surface-variant' },
  ];

  return (
    <div className="p-space-base flex flex-col justify-between gap-space-sm bg-surface-container-lowest">
      {/* Payment Mode Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-caption font-medium text-on-surface-variant">
          <span className="font-micro-label text-micro-label uppercase font-bold tracking-wider">
            Payment Mode
          </span>
          <span className="font-caption text-caption text-secondary font-medium">
            Select Mode (F5-F8)
          </span>
        </div>

        {/* 4 Mode Buttons Grid */}
        <div className="grid grid-cols-4 gap-space-xs">
          {modes.map((m) => {
            const isSelected = selectedMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                disabled={disabled}
                onClick={() => onSelectMode(m.id)}
                className={`h-9 px-2 rounded font-body-medium flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-95 disabled:opacity-50 ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-xs border border-primary'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    isSelected ? 'text-on-primary' : m.iconColor || 'text-on-surface-variant'
                  }`}
                >
                  {m.icon}
                </span>
                <span className={`text-caption ${isSelected ? 'font-semibold' : 'font-medium'}`}>
                  {m.label}
                </span>
                <span
                  className={`font-body-mono-num text-micro-label px-1 py-0.2 rounded font-bold ${
                    isSelected
                      ? 'bg-primary-container/80 text-on-primary'
                      : 'bg-surface-container-highest text-on-surface'
                  }`}
                >
                  {m.shortcut}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons: Cancel Order & Save Order */}
      <div className="flex items-center gap-space-sm w-full">
        {/* Cancel Order [Esc] */}
        <button
          type="button"
          onClick={onCancelOrder}
          className="h-12 px-space-base rounded bg-error-container/40 hover:bg-error-container border border-error/30 text-on-error-container flex items-center justify-between gap-space-sm transition-colors shadow-xs group active:scale-[0.99] flex-1 cursor-pointer"
          title="Cancel current order (Esc)"
        >
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-error">cancel</span>
            <span className="font-body-medium text-body-medium font-bold text-error">
              Cancel Order
            </span>
          </div>
          <span className="font-body-mono-num text-micro-label px-1.5 py-0.5 rounded bg-error/20 text-on-error-container font-bold">
            Esc
          </span>
        </button>

        {/* Save Order [Enter] */}
        <button
          type="button"
          disabled={disabled || totalPayable <= 0}
          onClick={onCompleteSale}
          className="flex-1 h-12 bg-primary hover:bg-primary-container text-on-primary rounded flex items-center justify-between px-space-base transition-colors shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          title="Save Order (Enter)"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="font-body-medium text-body-medium font-bold">Save Order</span>
          </div>
          <span className="font-body-mono-num text-micro-label px-1.5 py-0.5 rounded bg-primary-container/80 text-on-primary font-bold">
            Enter
          </span>
        </button>
      </div>
    </div>
  );
}
