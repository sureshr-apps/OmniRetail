import React from 'react';
import { Customer } from '../types';
import { formatCurrency, getInitials } from '../utils/calculations';
import { formatCustomerCode } from '../utils/formatCustomerCode';

interface CustomerDetailDrawerProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onToggleStatus: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function CustomerDetailDrawer({
  customer,
  isOpen,
  onClose,
  onEdit,
  onToggleStatus,
  onDelete,
}: CustomerDetailDrawerProps) {
  if (!isOpen || !customer) return null;

  const initials = getInitials(customer.name);
  const cityState = customer.state ? `${customer.city}, ${customer.state}` : customer.city;
  const fullAddress = [
    customer.address,
    customer.city,
    customer.state,
    customer.postalCode,
  ]
    .filter(Boolean)
    .join(', ');

  const recentOrders = customer.recentOrders || [
    { orderId: 'ORD-8942', date: 'Oct 14, 2023', store: 'Downtown #04', amount: 340.0 },
    { orderId: 'ORD-8510', date: 'Sep 28, 2023', store: 'North Mall #02', amount: 1250.0 },
    { orderId: 'ORD-7934', date: 'Aug 12, 2023', store: 'Downtown #04', amount: 420.0 },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-inverse-surface/30 backdrop-blur-xs flex justify-end transition-all"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-outline-variant/30 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Slide-Over Header */}
        <div className="px-space-2xl py-space-base bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-headline-sm font-bold shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">{customer.name}</h2>
                {customer.status === 'Active' ? (
                  <span className="font-micro-label text-micro-label px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase inline-flex items-center justify-center">
                    Active
                  </span>
                ) : (
                  <span className="font-micro-label text-micro-label px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-bold uppercase inline-flex items-center justify-center">
                    Inactive
                  </span>
                )}
              </div>
              <span className="font-body-mono-num text-caption text-primary font-semibold">
                {formatCustomerCode(customer.customerCode)} · {customer.type} · {cityState}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
            title="Close Drawer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Slide-Over Content Body */}
        <div className="p-space-2xl overflow-y-auto space-y-space-xl flex-1">
          {/* Summary Financial Cards */}
          <div className="grid grid-cols-2 gap-space-base">
            <div className="bg-surface-container-low p-space-base rounded border border-outline-variant/30">
              <span className="font-micro-label text-micro-label text-on-surface-variant uppercase">
                Total Purchases
              </span>
              <div className="font-display-currency text-display-currency text-on-surface mt-1">
                {formatCurrency(customer.totalPurchases)}
              </div>
              <span className="font-caption text-caption text-primary font-semibold mt-1 block">
                {customer.completedOrdersCount} Completed Order{customer.completedOrdersCount === 1 ? '' : 's'}
              </span>
            </div>
            <div className="bg-surface-container-low p-space-base rounded border border-outline-variant/30">
              <span className="font-micro-label text-micro-label text-on-surface-variant uppercase">
                Outstanding Balance
              </span>
              <div
                className={`font-display-currency text-display-currency mt-1 ${
                  customer.balance > 0 ? 'text-primary' : 'text-on-surface'
                }`}
              >
                {formatCurrency(customer.balance)}
              </div>
              <span
                className={`font-caption text-caption font-semibold mt-1 block ${
                  customer.balance > 0 ? 'text-amber-700' : 'text-emerald-700'
                }`}
              >
                {customer.balance > 0 ? 'Payment Outstanding' : 'Account Fully Settled'}
              </span>
            </div>
          </div>

          {/* Contact & Profile Details */}
          <div className="space-y-space-sm bg-surface-container-lowest border border-outline-variant/30 p-space-base rounded">
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2 flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[16px] text-primary">contact_page</span>
              <span>Contact Information</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-caption">
              <div>
                <span className="text-on-surface-variant block">Phone Number:</span>
                <strong className="text-on-surface font-body-mono-num">{customer.phone}</strong>
              </div>
              <div>
                <span className="text-on-surface-variant block">Email Address:</span>
                <strong className="text-on-surface truncate block" title={customer.email}>
                  {customer.email}
                </strong>
              </div>
              <div className="col-span-2">
                <span className="text-on-surface-variant block">Billing Address:</span>
                <strong className="text-on-surface">{fullAddress || 'None provided'}</strong>
              </div>
              <div>
                <span className="text-on-surface-variant block">Preferred Contact:</span>
                <strong className="text-on-surface">{customer.preferredContact || 'Email & SMS'}</strong>
              </div>
              {customer.taxId && (
                <div>
                  <span className="text-on-surface-variant block">Tax Registration (EIN/VAT):</span>
                  <strong className="text-on-surface font-body-mono-num">{customer.taxId}</strong>
                </div>
              )}
              {customer.creditLimit !== undefined && (
                <div>
                  <span className="text-on-surface-variant block">Credit Limit:</span>
                  <strong className="text-on-surface font-body-mono-num">
                    {formatCurrency(customer.creditLimit)}
                  </strong>
                </div>
              )}
              {customer.tier && (
                <div>
                  <span className="text-on-surface-variant block">Membership Tier:</span>
                  <strong className="text-secondary">{customer.tier}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Recent Sales Table */}
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">receipt_long</span>
                <span>Recent Purchase History</span>
              </h4>
              <span className="font-caption text-caption text-on-surface-variant font-medium">
                Linked Transactions
              </span>
            </div>
            <div className="border border-outline-variant/30 rounded overflow-hidden">
              <table className="w-full text-left text-caption">
                <tbody>
                  <tr className="bg-surface-container-low border-b border-outline-variant/30 font-micro-label text-on-surface-variant uppercase">
                    <th className="p-2">Order ID</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Store</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                  {recentOrders.map((order, i) => (
                    <tr
                      key={order.orderId || i}
                      className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors"
                    >
                      <td className="p-2 font-body-mono-num text-primary font-medium">{order.orderId}</td>
                      <td className="p-2 text-on-surface-variant">{order.date}</td>
                      <td className="p-2 text-on-surface-variant">{order.store}</td>
                      <td className="p-2 font-body-mono-num text-right font-semibold text-on-surface">
                        {formatCurrency(order.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Service & Alteration History */}
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">support_agent</span>
                <span>Service & Alteration History</span>
              </h4>
            </div>
            <div className="border border-outline-variant/30 rounded overflow-hidden">
              <table className="w-full text-left text-caption">
                <tbody>
                  <tr className="bg-surface-container-low border-b border-outline-variant/30 font-micro-label text-on-surface-variant uppercase">
                    <th className="p-2">Ticket #</th>
                    <th className="p-2">Service Type</th>
                    <th className="p-2">Status</th>
                  </tr>
                  {customer.serviceHistory && customer.serviceHistory.length > 0 ? (
                    customer.serviceHistory.map((srv, idx) => (
                      <tr
                        key={srv.ticketId || idx}
                        className="border-b border-outline-variant/20 hover:bg-surface-container-low/50"
                      >
                        <td className="p-2 font-body-mono-num text-primary">{srv.ticketId}</td>
                        <td className="p-2 text-on-surface">{srv.serviceType}</td>
                        <td className="p-2">
                          <span className="font-micro-label px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase font-bold">
                            {srv.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50">
                      <td className="p-2 font-body-mono-num text-primary">SRV-201</td>
                      <td className="p-2 text-on-surface">Custom Hemming & Tailoring</td>
                      <td className="p-2">
                        <span className="font-micro-label px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase font-bold">
                          Completed
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes & Preferences */}
          <div className="bg-surface-container-low p-space-base rounded border border-outline-variant/30 space-y-1">
            <span className="font-micro-label text-micro-label text-on-surface-variant uppercase font-bold">
              Internal Account Notes
            </span>
            <p className="font-caption text-caption text-on-surface">
              {customer.notes ||
                'No internal notes added. Click Edit Profile to record specific sizing or preferences.'}
            </p>
          </div>
        </div>

        {/* Slide-Over Footer Actions */}
        <div className="px-space-2xl py-space-base bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between gap-space-base">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-space-base bg-surface-container hover:bg-surface-container-high text-on-surface rounded font-body-medium text-body-medium transition-colors"
          >
            Close Panel
          </button>
          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(customer);
              }}
              className="h-9 px-space-base bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/50 rounded font-body-medium text-body-medium transition-colors"
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={() => onToggleStatus(customer)}
              className={`h-9 px-space-base rounded font-body-medium text-body-medium transition-colors ${
                customer.status === 'Active'
                  ? 'bg-error hover:bg-error/90 text-on-error'
                  : 'bg-primary hover:bg-primary-container text-on-primary'
              }`}
            >
              {customer.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
            <button
              type="button"
              onClick={() => onDelete(customer)}
              className="h-9 px-space-base rounded border border-error/30 font-body-medium text-body-medium text-error transition-colors hover:bg-error-container/20 flex items-center gap-1 cursor-pointer"
              title="Delete Customer"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
