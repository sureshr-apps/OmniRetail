import React from 'react';
import { Supplier } from '../types';
import { formatCurrency } from '../utils/calculations';
import { formatSupplierCode } from '../utils/formatSupplierCode';

interface SuppliersTableProps {
  suppliers: Supplier[];
  onSelectSupplier: (supplier: Supplier) => void;
  onToggleStatus?: (id: string, e: React.MouseEvent) => void;
  isLoading?: boolean;
}

export function SuppliersTable({
  suppliers,
  onSelectSupplier,
  onToggleStatus,
  isLoading,
}: SuppliersTableProps) {
  if (isLoading) {
    return (
      <div className="flex-1 min-h-[360px] flex flex-col items-center justify-center bg-surface-container-lowest border border-outline-variant/40 rounded">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        <span className="text-sm text-on-surface-variant mt-3 font-medium">
          Loading suppliers directory...
        </span>
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="flex-1 min-h-[360px] flex flex-col items-center justify-center bg-surface-container-lowest border border-outline-variant/40 rounded p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-3">
          <span className="material-symbols-outlined text-[26px]">local_shipping</span>
        </div>
        <h3 className="text-base font-semibold text-on-surface">No suppliers found</h3>
        <p className="text-sm text-on-surface-variant max-w-sm mt-1">
          No matching records found with current filters. Try resetting search or adjusting status and category.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-x-auto bg-surface-container-lowest border border-outline-variant/40 rounded shadow-xs min-h-0">
      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-surface-container/60 border-b border-outline-variant/40 text-caption font-semibold uppercase tracking-wider text-on-surface-variant sticky top-0 z-10 select-none">
          <tr>
            <th scope="col" className="py-3 px-4 w-[130px]">
              Supplier Code
            </th>
            <th scope="col" className="py-3 px-4 min-w-[200px]">
              Supplier Name
            </th>
            <th scope="col" className="py-3 px-4 min-w-[180px]">
              Contact Person
            </th>
            <th scope="col" className="py-3 px-4 text-right min-w-[140px]">
              Outstanding
            </th>
            <th scope="col" className="py-3 px-4 text-center min-w-[110px]">
              Status
            </th>
            <th scope="col" className="py-3 px-4 text-right min-w-[90px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {suppliers.map((supplier) => {
            const isInactive = supplier.status === 'Inactive';

            return (
              <tr
                key={supplier.id}
                onClick={() => onSelectSupplier(supplier)}
                className={`group cursor-pointer transition-colors hover:bg-surface-container-high/60 ${
                  isInactive ? 'opacity-65 hover:opacity-100 bg-surface-container/20' : ''
                }`}
              >
                {/* Supplier Code */}
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="font-body-mono-num font-semibold text-primary hover:underline">
                    {formatSupplierCode(supplier.supplierCode)}
                  </span>
                </td>

                {/* Supplier Name */}
                <td className="py-3 px-4">
                  <div className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {supplier.name}
                  </div>
                  <div className="text-caption text-on-surface-variant line-clamp-1 mt-0.5">
                    {supplier.category}
                  </div>
                </td>

                {/* Contact Person */}
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="text-on-surface font-medium">{supplier.contactPerson}</div>
                  <div className="text-caption font-body-mono-num text-on-surface-variant">
                    {supplier.phone}
                  </div>
                </td>

                {/* Outstanding Balance (Right Aligned) */}
                <td className="py-3 px-4 whitespace-nowrap text-right">
                  <div
                    className={`font-body-mono-num font-semibold ${
                      supplier.outstandingBalance > 0
                        ? 'text-on-surface font-bold'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {formatCurrency(supplier.outstandingBalance)}
                  </div>
                  {supplier.pendingDeliveriesCount > 0 && (
                    <div className="text-[11px] text-tertiary font-medium">
                      {supplier.pendingDeliveriesCount} pending PO{supplier.pendingDeliveriesCount > 1 ? 's' : ''}
                    </div>
                  )}
                </td>

                {/* Status (Center Aligned) */}
                <td className="py-3 px-4 whitespace-nowrap text-center">
                  {supplier.status === 'Active' ? (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full font-micro-label text-micro-label uppercase font-bold bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full font-micro-label text-micro-label uppercase font-bold bg-surface-container text-on-surface-variant">
                      Inactive
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => onSelectSupplier(supplier)}
                      className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                      title="View details"
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
