import React from 'react';
import { Supplier } from '../types';
import { formatCurrency } from '../utils/calculations';
import { formatSupplierCode } from '../utils/formatSupplierCode';

interface SupplierDetailDrawerProps {
  supplier: Supplier | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (supplier: Supplier) => void;
  onToggleStatus: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
  onNewPurchaseOrder?: (supplier: Supplier) => void;
}

export function SupplierDetailDrawer({
  supplier,
  isOpen,
  onClose,
  onEdit,
  onToggleStatus,
  onDelete,
  onNewPurchaseOrder,
}: SupplierDetailDrawerProps) {
  if (!isOpen || !supplier) return null;

  const availableCredit = Math.max(0, supplier.creditLimit - supplier.outstandingBalance);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-surface-container-lowest h-full shadow-2xl z-10 flex flex-col border-l border-outline-variant/40 animate-in slide-in-from-right duration-200">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between shrink-0 bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20">
              {supplier.supplierCode}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface">{supplier.name}</h2>
                <span
                  className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full font-micro-label text-micro-label uppercase font-bold ${
                    supplier.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {supplier.status}
                </span>
              </div>
              <div className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                <span className="font-body-mono-num font-semibold text-primary">
                  {formatSupplierCode(supplier.supplierCode)}
                </span>
                <span>•</span>
                <span>{supplier.category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onNewPurchaseOrder && (
              <button
                type="button"
                onClick={() => onNewPurchaseOrder(supplier)}
                className="h-9 px-space-base rounded-xl bg-surface hover:bg-surface-container-high border border-outline-variant/50 text-on-surface font-body-medium text-caption transition-colors flex items-center justify-center gap-1"
                title="Create a new purchase order"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>New PO</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
              aria-label="Close supplier details"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded bg-surface-container/40 border border-outline-variant/30">
              <div className="text-caption font-semibold uppercase text-on-surface-variant">
                Outstanding Balance
              </div>
              <div className="text-2xl font-bold font-body-mono-num text-on-surface mt-1">
                {formatCurrency(supplier.outstandingBalance)}
              </div>
              <div className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-amber-600">
                  {supplier.outstandingBalance > 0 ? 'schedule' : 'check_circle'}
                </span>
                <span>
                  {supplier.outstandingBalance > 0 ? 'Due in 14 days' : 'Fully Settled / No Debt'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded bg-surface-container/40 border border-outline-variant/30">
              <div className="text-caption font-semibold uppercase text-on-surface-variant">
                Credit Limit
              </div>
              <div className="text-2xl font-bold font-body-mono-num text-on-surface mt-1">
                {formatCurrency(supplier.creditLimit)}
              </div>
              <div className="text-xs text-on-surface-variant mt-1">
                Available:{' '}
                <span className="font-semibold text-on-surface">{formatCurrency(availableCredit)}</span>
              </div>
            </div>
          </div>

          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">contact_phone</span>
              <span>Primary Contact &amp; Location</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2.5 p-3 rounded bg-surface-container/30 border border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">person</span>
                <div>
                  <div className="text-xs text-on-surface-variant font-medium">Contact Person</div>
                  <div className="font-semibold text-on-surface">{supplier.contactPerson}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded bg-surface-container/30 border border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">call</span>
                <div>
                  <div className="text-xs text-on-surface-variant font-medium">Phone</div>
                  <a href={`tel:${supplier.phone}`} className="font-body-mono-num font-semibold text-primary hover:underline">
                    {supplier.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded bg-surface-container/30 border border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">mail</span>
                <div className="truncate">
                  <div className="text-xs text-on-surface-variant font-medium">Email</div>
                  <a href={`mailto:${supplier.email}`} className="font-semibold text-primary hover:underline truncate block">
                    {supplier.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded bg-surface-container/30 border border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">location_on</span>
                <div>
                  <div className="text-xs text-on-surface-variant font-medium">Address</div>
                  <div className="font-semibold text-on-surface">{supplier.address || 'Not provided'}</div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">domain</span>
              <span>Business &amp; Tax Terms</span>
            </h3>
            <div className="p-3.5 rounded bg-surface-container/30 border border-outline-variant/20 space-y-3 text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-xs text-on-surface-variant block">GST</span>
                  <span className="font-body-mono-num font-semibold text-on-surface">{supplier.taxId || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant block">Payment Terms</span>
                  <span className="font-semibold text-on-surface">{supplier.paymentTerms}</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant block">Category</span>
                  <span className="font-semibold text-on-surface">{supplier.category}</span>
                </div>
              </div>
              {supplier.notes && (
                <div className="pt-2 border-t border-outline-variant/20">
                  <span className="text-xs text-on-surface-variant block">Notes &amp; Agreements</span>
                  <p className="text-xs text-on-surface mt-0.5 leading-relaxed">{supplier.notes}</p>
                </div>
              )}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">receipt</span>
                <span>Recent Purchase Orders</span>
              </h3>
              <span className="text-xs text-on-surface-variant">Total Orders: {supplier.totalOrdersCount}</span>
            </div>

            {supplier.recentOrders && supplier.recentOrders.length > 0 ? (
              <div className="border border-outline-variant/30 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container text-on-surface-variant font-semibold uppercase">
                    <tr>
                      <th className="py-2 px-3">PO Number</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Outlet</th>
                      <th className="py-2 px-3 text-right">Amount</th>
                      <th className="py-2 px-3 text-center">Receipt Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 bg-surface-container-lowest">
                    {supplier.recentOrders.map((po) => (
                      <tr key={po.id} className="hover:bg-surface-container/50">
                        <td className="py-2 px-3 font-body-mono-num font-semibold text-primary">{po.poNumber}</td>
                        <td className="py-2 px-3 text-on-surface-variant">{po.date}</td>
                        <td className="py-2 px-3 text-on-surface truncate max-w-[120px]">{po.outletName}</td>
                        <td className="py-2 px-3 text-right font-body-mono-num font-medium text-on-surface">{formatCurrency(po.totalAmount)}</td>
                        <td className="py-2 px-3 text-center">
                          {po.receiptStatus === 'RECEIVED' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Received</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 rounded bg-surface-container/30 border border-outline-variant/20 text-center text-xs text-on-surface-variant">
                No recent purchase orders found for this supplier.
              </div>
            )}
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-space-base bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between gap-space-base shrink-0">
          <div className="flex items-center gap-space-base">
            <button
              type="button"
              onClick={() => onDelete(supplier)}
              className="h-9 px-space-base rounded-xl border border-error/30 bg-surface hover:bg-error-container/20 text-error font-body-medium text-caption transition-colors flex items-center justify-center gap-1 cursor-pointer"
              title="Delete Supplier"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>Delete</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleStatus(supplier)}
              className={`h-9 px-space-base rounded-xl border font-body-medium text-caption transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                supplier.status === 'Active'
                  ? 'bg-surface hover:bg-error-container/20 text-error'
                  : 'bg-surface hover:bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {supplier.status === 'Active' ? 'person_off' : 'power_settings_new'}
              </span>
              <span>{supplier.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onEdit(supplier)}
            className="h-9 px-space-xl rounded-xl bg-primary hover:bg-primary-container text-on-primary border border-primary font-body-medium text-caption transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit Supplier
          </button>
        </div>
      </div>
    </div>
  );
}
