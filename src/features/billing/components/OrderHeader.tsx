import React from 'react';
import { Customer } from '../types';
import { useAuth } from '@/app/context/AuthContext';
import { useTenantOutlet } from '@/app/context/TenantOutletContext';

interface OrderHeaderProps {
  orderNumber: string;
  registerId?: string;
  customer: Customer;
  onChangeCustomer: () => void;
  onPrintDraft: () => void;
  onClearOrder: () => void;
}

export function OrderHeader({
  orderNumber,
  registerId = 'REG-01',
  customer,
  onChangeCustomer,
  onPrintDraft,
  onClearOrder,
}: OrderHeaderProps) {
  const { user } = useAuth();
  const outletSelection = useTenantOutlet();
  const activeUserName = user?.displayName?.trim() || user?.username?.trim() || 'Authenticated user';
  const activeOutletName = outletSelection?.selectedOutlet?.name ?? 'No outlet selected';

  return (
    <div className="bg-surface-container-lowest rounded shadow-sm border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between p-space-base gap-space-sm shrink-0">
      {/* Left: Order & Terminal identification */}
      <div className="flex items-center gap-space-base">
        <div className="h-9 w-9 rounded bg-primary text-on-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">receipt</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              {orderNumber}
            </span>
            <span className="font-micro-label text-micro-label px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">
              {registerId}
            </span>
            <span className="font-caption text-caption text-on-surface-variant font-mono ml-1">
              {activeUserName} · {activeOutletName}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Customer chip & Action utilities */}
      <div className="flex items-center gap-space-base self-end md:self-auto">
        <div className="px-space-base py-1.5 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[14px]">person</span>
          </div>
          <span className="font-body-medium text-body-medium text-on-surface font-semibold">
            {customer.name}
          </span>
          <span className="font-caption text-caption text-secondary font-medium">
            {customer.tier} · {customer.points} pts
          </span>
          <button
            type="button"
            onClick={onChangeCustomer}
            className="font-caption text-caption text-primary font-bold hover:underline ml-1 cursor-pointer focus:outline-none"
          >
            Change (F1)
          </button>
        </div>

        <div className="flex items-center gap-1 border-l border-outline-variant/30 pl-space-sm">
          <button
            type="button"
            onClick={onPrintDraft}
            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            title="Print Draft"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
          </button>
          <button
            type="button"
            onClick={onClearOrder}
            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            title="Full Clear"
          >
            <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
          </button>
        </div>
      </div>
    </div>
  );
}
