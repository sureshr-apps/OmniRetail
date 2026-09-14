import React, { useState, useEffect } from 'react';
import { Supplier, UpdateSupplierInput, SupplierCategory, PaymentTerms } from '../types';
import { formatCurrency } from '../utils/calculations';
import { formatSupplierCode } from '../utils/formatSupplierCode';

interface SupplierDetailDrawerProps {
  supplier: Supplier | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: UpdateSupplierInput) => Promise<void>;
  onToggleStatus: (id: string) => Promise<void>;
  onDelete: (supplier: Supplier) => void;
  onNewPurchaseOrder?: (supplier: Supplier) => void;
}

const CATEGORIES: SupplierCategory[] = [
  'Consumer Electronics',
  'Apparel & Textiles',
  'Beverages & Groceries',
  'Tools & Hardware',
  'Office Supplies',
  'Packaging & Shipping',
  'Leather & Accessories',
  'Point of Sale & Tech',
  'General Merchandise',
];

const PAYMENT_TERMS_OPTIONS: PaymentTerms[] = [
  'Net 30 Days',
  'Net 15 Days',
  'Net 45 Days',
  'Net 60 Days',
  'Cash on Delivery (COD)',
  'Immediate Wire',
];

export function SupplierDetailDrawer({
  supplier,
  isOpen,
  onClose,
  onUpdate,
  onToggleStatus,
  onDelete,
  onNewPurchaseOrder,
}: SupplierDetailDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDeactivate, setIsConfirmingDeactivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit fields
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [taxId, setTaxId] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<SupplierCategory>('Consumer Electronics');
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerms>('Net 30 Days');
  const [creditLimit, setCreditLimit] = useState('25000');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (supplier) {
      setName(supplier.name);
      setContactPerson(supplier.contactPerson);
      setPhone(supplier.phone);
      setEmail(supplier.email);
      setTaxId(supplier.taxId);
      setCity(supplier.city);
      setState(supplier.state || '');
      setAddress(supplier.address || '');
      setCategory(supplier.category);
      setPaymentTerms(supplier.paymentTerms);
      setCreditLimit(supplier.creditLimit.toString());
      setNotes(supplier.notes || '');
      setIsEditing(false);
      setIsConfirmingDeactivate(false);
    }
  }, [supplier]);

  if (!isOpen || !supplier) return null;

  const handleSaveEdit = async () => {
    setIsSubmitting(true);
    try {
      await onUpdate(supplier.id, {
        name,
        contactPerson,
        phone,
        email,
        taxId,
        city,
        state,
        address,
        category,
        paymentTerms,
        creditLimit: parseFloat(creditLimit) || supplier.creditLimit,
        notes,
      });
      setIsEditing(false);
    } catch (e) {
      console.error('Failed to update supplier:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusToggle = async () => {
    setIsSubmitting(true);
    try {
      await onToggleStatus(supplier.id);
      setIsConfirmingDeactivate(false);
    } catch (e) {
      console.error('Failed to toggle status:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableCredit = Math.max(0, supplier.creditLimit - supplier.outstandingBalance);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-2xl bg-surface-container-lowest h-full shadow-2xl z-10 flex flex-col border-l border-outline-variant/40 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between shrink-0 bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20">
              {supplier.supplierCode}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface">{supplier.name}</h2>
                {supplier.status === 'Active' ? (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full font-micro-label text-micro-label uppercase font-bold bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full font-micro-label text-micro-label uppercase font-bold bg-surface-container text-on-surface-variant">
                    Inactive
                  </span>
                )}
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
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
                title="Edit supplier details"
              >
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Top Quick Stats */}
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
                <span className="font-semibold text-on-surface">
                  {formatCurrency(availableCredit)}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Mode Alert */}
          {isEditing && (
            <div className="p-3 bg-primary/10 border border-primary/20 rounded flex items-center justify-between text-xs text-primary">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">info</span>
                <span>Editing supplier master record. Internal Code and Ledger Balances are locked.</span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-on-surface underline font-medium hover:text-primary"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Primary Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">contact_phone</span>
              <span>Primary Contact &amp; Location</span>
            </h3>

            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-surface-container/20 rounded border border-outline-variant/30">
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2.5 p-3 rounded bg-surface-container/30 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">
                    person
                  </span>
                  <div>
                    <div className="text-xs text-on-surface-variant font-medium">Contact Person</div>
                    <div className="font-semibold text-on-surface">{supplier.contactPerson}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded bg-surface-container/30 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">
                    call
                  </span>
                  <div>
                    <div className="text-xs text-on-surface-variant font-medium">Phone</div>
                    <a
                      href={`tel:${supplier.phone}`}
                      className="font-body-mono-num font-semibold text-primary hover:underline"
                    >
                      {supplier.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded bg-surface-container/30 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">
                    mail
                  </span>
                  <div className="truncate">
                    <div className="text-xs text-on-surface-variant font-medium">Email</div>
                    <a
                      href={`mailto:${supplier.email}`}
                      className="font-semibold text-primary hover:underline truncate block"
                    >
                      {supplier.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded bg-surface-container/30 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">
                    location_on
                  </span>
                  <div>
                    <div className="text-xs text-on-surface-variant font-medium">Location</div>
                    <div className="font-semibold text-on-surface">{supplier.city}</div>
                    {supplier.address && (
                      <div className="text-xs text-on-surface-variant">{supplier.address}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Business & Tax Terms */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">domain</span>
              <span>Business &amp; Tax Terms</span>
            </h3>

            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-surface-container/20 rounded border border-outline-variant/30">
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Tax ID / EIN
                  </label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value as PaymentTerms)}
                    className="w-full px-3 py-1.5 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    {PAYMENT_TERMS_OPTIONS.map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Credit Limit ($)
                  </label>
                  <input
                    type="number"
                    value={creditLimit}
                    onChange={(e) => setCreditLimit(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Procurement Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded bg-surface-container/30 border border-outline-variant/20 space-y-3 text-sm">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-xs text-on-surface-variant block">Tax ID / EIN</span>
                    <span className="font-body-mono-num font-semibold text-on-surface">
                      {supplier.taxId}
                    </span>
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
                    <p className="text-xs text-on-surface mt-0.5 leading-relaxed">
                      {supplier.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recent Purchase Orders (Linked from Purchases Ledger) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">receipt</span>
                <span>Recent Purchase Orders</span>
              </h3>
              <span className="text-xs text-on-surface-variant">
                Total Orders: {supplier.totalOrdersCount}
              </span>
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
                        <td className="py-2 px-3 font-body-mono-num font-semibold text-primary">
                          {po.poNumber}
                        </td>
                        <td className="py-2 px-3 text-on-surface-variant">{po.date}</td>
                        <td className="py-2 px-3 text-on-surface truncate max-w-[120px]">
                          {po.outletName}
                        </td>
                        <td className="py-2 px-3 text-right font-body-mono-num font-medium text-on-surface">
                          {formatCurrency(po.totalAmount)}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {po.receiptStatus === 'RECEIVED' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Received
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              Pending
                            </span>
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
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between shrink-0 shadow-md">
          {/* Status Toggle / Confirmation */}
          <div>
            {isConfirmingDeactivate ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-error font-medium">Deactivate partner?</span>
                <button
                  type="button"
                  onClick={handleStatusToggle}
                  disabled={isSubmitting}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-error text-on-error hover:bg-error/90 transition-colors"
                >
                  Yes, Deactivate
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmingDeactivate(false)}
                  className="px-2 py-1 text-xs text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (supplier.status === 'Active') {
                    setIsConfirmingDeactivate(true);
                  } else {
                    handleStatusToggle();
                  }
                }}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {supplier.status === 'Active' ? 'do_not_disturb_on' : 'check_circle'}
                </span>
                <span>
                  {supplier.status === 'Active' ? 'Deactivate Supplier' : 'Activate Supplier'}
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-sm font-medium rounded text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-xs"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                {onNewPurchaseOrder && (
                  <button
                    type="button"
                    onClick={() => onNewPurchaseOrder(supplier)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 transition-colors shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    <span>New PO</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDelete(supplier)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded border border-error/30 text-error hover:bg-error-container/20 transition-colors cursor-pointer"
                  title="Delete Supplier"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>Delete</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 text-sm font-medium rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
