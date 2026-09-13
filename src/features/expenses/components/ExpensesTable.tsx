import React from 'react';
import { Expense, ExpenseCategory } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ExpensesTableProps {
  expenses: Expense[];
  onSelectExpense: (expense: Expense) => void;
  isLoading?: boolean;
}

export function ExpensesTable({
  expenses,
  onSelectExpense,
  isLoading,
}: ExpensesTableProps) {
  const getCategoryConfig = (category: ExpenseCategory) => {
    switch (category) {
      case 'Utilities':
        return { icon: 'bolt', iconColor: 'text-primary', label: 'Utilities' };
      case 'Store Supplies':
        return { icon: 'inventory_2', iconColor: 'text-tertiary', label: 'Store Supplies' };
      case 'Equipment Maintenance':
        return { icon: 'build', iconColor: 'text-on-surface-variant', label: 'Equip Maint.' };
      case 'Marketing':
        return { icon: 'campaign', iconColor: 'text-tertiary', label: 'Marketing' };
      case 'Logistics':
        return { icon: 'local_shipping', iconColor: 'text-on-surface-variant', label: 'Logistics' };
      case 'Professional Services':
        return { icon: 'verified_user', iconColor: 'text-outline', label: 'Prof. Services' };
      default:
        return { icon: 'receipt', iconColor: 'text-outline', label: category };
    }
  };

  const getStatusDot = (expense: Expense) => {
    if (expense.status === 'Voided') {
      return 'bg-outline';
    }
    if (expense.approvalStatus === 'Rejected') {
      return 'bg-error';
    }
    if (expense.approvalStatus === 'Pending Approval') {
      return 'bg-tertiary';
    }
    if (expense.approvalStatus === 'Approved') {
      return 'bg-secondary';
    }
    return 'bg-outline';
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-xl rounded-lg shadow-sm border border-outline-variant/30">
        <div className="flex items-center gap-space-base mb-space-base">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Synchronizing Ledger Rows...
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              Querying multi-outlet expense partitions and tax reconciliations
            </span>
          </div>
        </div>
        <div className="h-10 bg-surface-container-low rounded animate-pulse w-full" />
        <div className="h-14 bg-surface-container-low/60 rounded animate-pulse w-full" />
        <div className="h-14 bg-surface-container-low/60 rounded animate-pulse w-full" />
        <div className="h-14 bg-surface-container-low/60 rounded animate-pulse w-full" />
        <div className="h-14 bg-surface-container-low/60 rounded animate-pulse w-full" />
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-space-2xl bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 text-center">
        <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-base">
          <span className="material-symbols-outlined text-[32px]">receipt_long</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
          No Expense Records Found
        </h3>
        <p className="font-body-default text-body-default text-on-surface-variant max-w-md mt-1 mb-space-lg">
          No expenditures match the current filter selection or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body-default text-body-default">
          <thead className="bg-surface-container-low/70 text-on-surface-variant font-micro-label text-micro-label uppercase tracking-wider select-none border-b border-outline-variant/30">
            <tr>
              <th className="py-2.5 px-space-base font-semibold" scope="col">
                Expense #
              </th>
              <th className="py-2.5 px-space-base font-semibold" scope="col">
                Date
              </th>
              <th className="py-2.5 px-space-base font-semibold" scope="col">
                Category
              </th>
              <th className="py-2.5 px-space-base font-semibold min-w-[240px]" scope="col">
                Description
              </th>
              <th className="py-2.5 px-space-base font-semibold" scope="col">
                Outlet
              </th>
              <th className="py-2.5 px-space-base font-semibold text-right" scope="col">
                Amount
              </th>
              <th className="py-2.5 px-space-base font-semibold" scope="col">
                Submitted By
              </th>
              <th className="py-2.5 px-space-base font-semibold text-right" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-on-surface divide-y divide-outline-variant/20">
            {expenses.map((expense) => {
              const cat = getCategoryConfig(expense.category);
              const isRejected = expense.approvalStatus === 'Rejected';
              const isVoided = expense.status === 'Voided';

              return (
                <tr
                  key={expense.id}
                  onClick={() => onSelectExpense(expense)}
                  className={`hover:bg-surface-container-low/60 transition-colors group cursor-pointer ${
                    isVoided ? 'opacity-60 bg-surface-container-low/20' : ''
                  }`}
                >
                  {/* Expense # with status dot */}
                  <td className="py-3 px-space-base font-body-mono-num text-body-mono-num whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusDot(expense)}`} />
                      <span
                        className={`font-semibold ${
                          isRejected
                            ? 'text-error'
                            : isVoided
                            ? 'text-outline line-through'
                            : 'text-primary'
                        }`}
                      >
                        {expense.expenseNumber}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-space-base whitespace-nowrap text-on-surface-variant font-body-mono-num text-body-mono-num">
                    {expense.date}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-space-base whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-caption text-caption font-medium border border-outline-variant/20">
                      <span className={`material-symbols-outlined text-[14px] ${cat.iconColor}`}>
                        {cat.icon}
                      </span>
                      <span>{cat.label}</span>
                    </span>
                  </td>

                  {/* Description + Reference / Subtitle */}
                  <td className="py-3 px-space-base">
                    <div className="font-medium text-on-surface truncate max-w-xs md:max-w-md">
                      {expense.description}
                    </div>

                    {isRejected ? (
                      <div className="font-caption text-caption text-error font-medium truncate flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        <span>
                          Rejection: {expense.rejectionReason || 'Missing vendor tax invoice'}
                        </span>
                      </div>
                    ) : (
                      <div className="font-caption text-caption text-on-surface-variant truncate mt-0.5">
                        {expense.reference ? (
                          <span>{expense.reference}</span>
                        ) : expense.vendorName ? (
                          <span>Vendor: {expense.vendorName}</span>
                        ) : (
                          <span className="text-outline">No reference</span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Outlet */}
                  <td className="py-3 px-space-base whitespace-nowrap text-on-surface-variant font-caption text-caption">
                    {expense.outletName}
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-space-base whitespace-nowrap text-right font-body-mono-num text-body-mono-num font-semibold text-on-surface">
                    <span className={isVoided ? 'line-through text-outline' : ''}>
                      {formatCurrency(expense.amount)}
                    </span>
                  </td>

                  {/* Submitted By */}
                  <td className="py-3 px-space-base whitespace-nowrap">
                    <div className="font-medium text-on-surface leading-tight">
                      {expense.submittedBy}
                    </div>
                    <span
                      className={`font-micro-label text-micro-label uppercase ${
                        expense.submittedByRole?.includes('Mgr')
                          ? 'text-primary font-bold'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {expense.submittedByRole || 'Staff'}
                    </span>
                  </td>

                  {/* Actions: View Details Icon */}
                  <td
                    className="py-3 px-space-base whitespace-nowrap text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => onSelectExpense(expense)}
                        title="View Details"
                        className="p-1.5 hover:text-primary hover:bg-surface-container-low rounded transition-colors text-on-surface-variant cursor-pointer inline-flex items-center justify-center"
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
