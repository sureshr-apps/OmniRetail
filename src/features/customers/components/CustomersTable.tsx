import React from 'react';
import { Customer } from '../types';
import { formatCurrency } from '../utils/calculations';

interface CustomersTableProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onEditCustomer?: (customer: Customer) => void;
  onToggleStatus?: (customer: Customer) => void;
  isLoading?: boolean;
  onAddFirst?: () => void;
}

export function CustomersTable({
  customers,
  onSelectCustomer,
  isLoading,
  onAddFirst,
}: CustomersTableProps) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest rounded border border-outline-variant/30 p-12 text-center shadow-xs">
        <div className="flex flex-col items-center justify-center space-y-space-base">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="font-headline-sm text-headline-sm text-on-surface">Synchronizing Customer Directory...</p>
          <p className="font-caption text-caption text-on-surface-variant">
            Fetching live tier data and multi-store balances securely.
          </p>
        </div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded border border-outline-variant/30 p-16 text-center shadow-xs">
        <div className="flex flex-col items-center justify-center space-y-space-base max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[24px]">group_off</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">No Customers Found</h3>
          <p className="font-body-default text-body-default text-on-surface-variant">
            We couldn't find any customer records matching your current filter criteria or search query. Try
            clearing filters or create a new profile.
          </p>
          {onAddFirst && (
            <button
              type="button"
              onClick={onAddFirst}
              className="mt-2 h-9 px-space-base bg-primary hover:bg-primary-container text-on-primary rounded font-body-medium text-body-medium transition-colors"
            >
              + Add First Customer
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded border border-outline-variant/30 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="h-8 bg-surface-container-low border-b border-outline-variant/30 font-micro-label text-micro-label text-on-surface-variant uppercase px-space-base tracking-wider">
              <th scope="col" className="py-2 px-space-base font-bold">
                Customer Code
              </th>
              <th scope="col" className="py-2 px-space-base font-bold">
                Customer
              </th>
              <th scope="col" className="py-2 px-space-base font-bold">
                Phone / Email
              </th>
              <th scope="col" className="py-2 px-space-base font-bold">
                City
              </th>
              <th scope="col" className="py-2 px-space-base font-bold text-right">
                Total Purchases
              </th>
              <th scope="col" className="py-2 px-space-base font-bold text-right">
                Balance
              </th>
              <th scope="col" className="py-2 px-space-base font-bold text-center">
                Status
              </th>
              <th scope="col" className="py-2 px-space-base font-bold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 font-body-default text-body-default text-on-surface">
            {customers.map((customer) => {
              const isInactive = customer.status === 'Inactive';
              const cityDisplay = customer.state
                ? `${customer.city}, ${customer.state}`
                : customer.city;

              return (
                <tr
                  key={customer.id}
                  onClick={() => onSelectCustomer(customer)}
                  className={`hover:bg-surface-container-low/60 cursor-pointer transition-colors group ${
                    isInactive ? 'opacity-75 bg-surface-container/20' : ''
                  }`}
                >
                  {/* Customer Code */}
                  <td className="py-3 px-space-base font-body-mono-num font-semibold text-primary whitespace-nowrap">
                    {customer.customerCode}
                  </td>

                  {/* Customer Name & Type */}
                  <td className="py-3 px-space-base whitespace-nowrap">
                    <div className="flex items-center gap-space-sm">
                      <div className="flex flex-col">
                        <span className="font-body-medium text-on-surface leading-tight">
                          {customer.name}
                        </span>
                        <span className="font-micro-label text-micro-label text-on-surface-variant/70 uppercase tracking-wide">
                          {customer.type}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Phone / Email */}
                  <td className="py-3 px-space-base whitespace-nowrap">
                    <div className="text-caption text-on-surface font-body-mono-num">
                      {customer.phone}
                    </div>
                    <div className="text-caption text-on-surface-variant truncate max-w-[200px]">
                      {customer.email}
                    </div>
                  </td>

                  {/* City */}
                  <td className="py-3 px-space-base text-caption text-on-surface-variant whitespace-nowrap">
                    {cityDisplay}
                  </td>

                  {/* Total Purchases (Right Aligned) */}
                  <td className="py-3 px-space-base font-body-mono-num text-right font-semibold text-on-surface whitespace-nowrap">
                    {formatCurrency(customer.totalPurchases)}
                  </td>

                  {/* Balance (Right Aligned) */}
                  <td
                    className={`py-3 px-space-base font-body-mono-num text-right whitespace-nowrap ${
                      customer.balance > 0
                        ? 'text-primary font-semibold'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {formatCurrency(customer.balance)}
                  </td>

                  {/* Status (Center Aligned) */}
                  <td className="py-3 px-space-base text-center whitespace-nowrap">
                    {customer.status === 'Active' ? (
                      <span className="font-micro-label text-micro-label px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase inline-flex items-center justify-center">
                        Active
                      </span>
                    ) : (
                      <span className="font-micro-label text-micro-label px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-bold uppercase inline-flex items-center justify-center">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions: Only View Details Icon */}
                  <td
                    className="py-3 px-space-base text-right whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => onSelectCustomer(customer)}
                        className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors inline-flex items-center justify-center"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
