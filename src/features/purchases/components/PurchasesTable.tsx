import React from 'react';
import { Purchase } from '../types';
import { formatCurrency } from '../utils/calculations';

interface PurchasesTableProps {
  items: Purchase[];
  selectedIds: Set<string>;
  onToggleSelectRow: (id: string) => void;
  onToggleSelectAll: () => void;
  onViewPurchase: (purchase: Purchase) => void;
  isLoading: boolean;
}

export function PurchasesTable({
  items,
  selectedIds,
  onToggleSelectRow,
  onToggleSelectAll,
  onViewPurchase,
  isLoading,
}: PurchasesTableProps) {
  const allSelected = items.length > 0 && items.every((p) => selectedIds.has(p.id));
  const someSelected = items.some((p) => selectedIds.has(p.id)) && !allSelected;

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3">
        <span className="material-symbols-outlined text-primary text-[36px] animate-spin">
          progress_activity
        </span>
        <p className="text-sm font-semibold text-on-surface">
          Fetching Purchases Ledger &amp; Invoices...
        </p>
        <p className="text-caption text-on-surface-variant">
          Connecting with Enterprise ERP &amp; Store Database
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <div className="size-14 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center mx-auto mb-3">
          <span className="material-symbols-outlined text-[32px]">shopping_cart_off</span>
        </div>
        <h3 className="text-sm font-bold text-on-surface">No Purchase Records Found</h3>
        <p className="text-caption text-on-surface-variant max-w-sm mx-auto mt-1 mb-4">
          No purchases match your applied filters or no supplier orders have been registered in
          this period.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant/30 bg-surface-container-low/60 text-on-surface-variant text-[11px] uppercase tracking-wider font-semibold">
            <th className="py-3 px-4 w-10">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={onToggleSelectAll}
                className="rounded border-outline-variant text-primary focus:ring-primary size-3.5 cursor-pointer"
              />
            </th>
            <th className="py-3 px-3">Purchase Number</th>
            <th className="py-3 px-3">Date</th>
            <th className="py-3 px-3">Supplier</th>
            <th className="py-3 px-3">Outlet</th>
            <th className="py-3 px-3">Items / Volume</th>
            <th className="py-3 px-3 text-right">Total Amount</th>
            <th className="py-3 px-3">Payment Status</th>
            <th className="py-3 px-3">Created By</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20 text-xs">
          {items.map((purchase) => {
            const isSelected = selectedIds.has(purchase.id);
            const isCancelled = purchase.status === 'cancelled';
            const skuCount = purchase.items.length;

            return (
              <tr
                key={purchase.id}
                className={`hover:bg-surface-container-low/40 transition-colors group ${
                  isCancelled ? 'opacity-75' : ''
                } ${isSelected ? 'bg-primary/5' : ''}`}
              >
                {/* 1. Selection Checkbox */}
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelectRow(purchase.id)}
                    className="rounded border-outline-variant text-primary focus:ring-primary size-3.5 cursor-pointer"
                  />
                </td>

                {/* 2. Purchase Number */}
                <td className="py-3 px-3">
                  {isCancelled ? (
                    <div
                      onClick={() => onViewPurchase(purchase)}
                      className="font-bold text-on-surface line-through cursor-pointer hover:underline"
                    >
                      {purchase.purchaseNumber}
                    </div>
                  ) : (
                    <div
                      onClick={() => onViewPurchase(purchase)}
                      className="font-bold text-primary hover:underline cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{purchase.purchaseNumber}</span>
                    </div>
                  )}
                  {purchase.purchaseOrderNumber && (
                    <span className="text-[10px] text-on-surface-variant font-mono">
                      {purchase.purchaseOrderNumber}
                    </span>
                  )}
                </td>

                {/* 3. Date & Time */}
                <td className="py-3 px-3 text-on-surface font-medium whitespace-nowrap">
                  {purchase.date}
                  <div className="text-[10px] text-on-surface-variant">{purchase.time}</div>
                </td>

                {/* 4. Supplier */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-semibold text-on-surface">
                        {purchase.supplierName}
                      </div>
                      <div className="text-[10px] text-on-surface-variant">
                        {purchase.supplierTaxId ||
                          purchase.supplierContact ||
                          purchase.supplierNote ||
                          'Vendor Account'}
                      </div>
                    </div>
                  </div>
                </td>

                {/* 5. Outlet */}
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 text-on-surface whitespace-nowrap">
                    <span
                      className={`size-1.5 rounded-full ${
                        purchase.outletName.includes('Downtown')
                          ? 'bg-primary'
                          : 'bg-outline-variant'
                      }`}
                    ></span>
                    {purchase.outletName}
                  </span>
                </td>

                {/* 6. Items / Volume */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="font-medium text-on-surface">
                    {skuCount} {skuCount === 1 ? 'SKU' : 'SKUs'}
                  </div>
                  <div className="text-[10px] text-on-surface-variant">
                    {purchase.totalUnits} Units total
                  </div>
                </td>

                {/* 7. Total Amount */}
                <td className="py-3 px-3 text-right whitespace-nowrap">
                  {isCancelled ? (
                    <>
                      <div className="font-body-mono-num font-bold text-on-surface-variant line-through">
                        {formatCurrency(purchase.totalAmount)}
                      </div>
                      <div className="text-[10px] text-error font-semibold">Voided</div>
                    </>
                  ) : (
                    <>
                      <div className="font-body-mono-num font-bold text-on-surface">
                        {formatCurrency(purchase.totalAmount)}
                      </div>
                      <div
                        className={`text-[10px] ${
                          purchase.paymentMethodNote?.includes('Due')
                            ? 'text-error font-medium'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        {purchase.paymentMethodNote || 'Standard Billing'}
                      </div>
                    </>
                  )}
                </td>

                {/* 8. Payment Status */}
                <td className="py-3 px-3 whitespace-nowrap">
                  {isCancelled ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-300">
                      <span className="size-1.5 rounded-full bg-slate-400"></span>
                      Cancelled
                    </span>
                  ) : purchase.paymentStatus === 'PAID' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <span className="size-1.5 rounded-full bg-emerald-600"></span>
                      Paid
                    </span>
                  ) : purchase.paymentStatus === 'PARTIALLY_PAID' ? (
                    <div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                        <span className="size-1.5 rounded-full bg-amber-600"></span>
                        Partially Paid
                      </span>
                      {purchase.paidNote && (
                        <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                          {purchase.paidNote}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                      <span className="size-1.5 rounded-full bg-rose-600"></span>
                      Unpaid
                    </span>
                  )}
                </td>

                {/* 9. Created By */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="font-medium text-on-surface">{purchase.createdBy}</div>
                  <div className="text-[10px] text-on-surface-variant">{purchase.creatorRole}</div>
                </td>

                {/* 10. Actions */}
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => onViewPurchase(purchase)}
                      className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
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
  );
}
