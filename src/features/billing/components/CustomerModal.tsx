import React, { useState } from 'react';
import { Customer } from '../types';
import { MOCK_CUSTOMERS } from '../services/mockData';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCustomer: Customer;
  onSelectCustomer: (customer: Customer) => void;
}

export function CustomerModal({
  isOpen,
  onClose,
  currentCustomer,
  onSelectCustomer,
}: CustomerModalProps) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = MOCK_CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.tier.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone && c.phone.includes(search))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-md shadow-xl border border-outline-variant/40 w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-space-lg py-3 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">person_search</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Select Customer (F1)
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

        {/* Search */}
        <div className="p-space-base border-b border-outline-variant/20">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[18px] text-on-surface-variant pointer-events-none">
              search
            </span>
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name, phone, or tier..."
              className="w-full h-10 pl-10 pr-4 rounded bg-surface-container-low font-body-default text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/40 focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Customer List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-outline-variant/15 p-space-xs">
          {filtered.map((customer) => {
            const isCurrent = customer.id === currentCustomer.id;
            return (
              <button
                key={customer.id}
                type="button"
                onClick={() => {
                  onSelectCustomer(customer);
                  onClose();
                }}
                className={`w-full p-space-base rounded text-left flex items-center justify-between transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-primary-fixed/20 border border-primary/40'
                    : 'hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-body-medium text-body-medium font-bold text-on-surface">
                        {customer.name}
                      </span>
                      {isCurrent && (
                        <span className="font-micro-label text-micro-label px-1.5 py-0.5 rounded bg-primary text-on-primary font-bold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="font-caption text-caption text-on-surface-variant flex items-center gap-2 mt-0.5">
                      <span className="text-secondary font-semibold">{customer.tier}</span>
                      <span>·</span>
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-body-mono-num text-body-medium font-bold text-primary block">
                    {customer.points} pts
                  </span>
                  <span className="font-caption text-caption text-secondary">
                    {customer.memberDiscount > 0 ? `-$${customer.memberDiscount.toFixed(2)} benefit` : 'No discount'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-space-base bg-surface-container-low/50 border-t border-outline-variant/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium transition-colors cursor-pointer"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
