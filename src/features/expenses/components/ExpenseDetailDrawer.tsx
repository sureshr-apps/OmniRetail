import React from 'react';
import { Expense } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ExpenseDetailDrawerProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onEditExpense: (expense: Expense) => void;
  onVoidExpense: (expense: Expense) => void;
  onApproveExpense?: (expense: Expense) => void;
  onRejectExpense?: (expense: Expense) => void;
}

export function ExpenseDetailDrawer({
  expense,
  isOpen,
  onClose,
  onEditExpense,
  onVoidExpense,
  onApproveExpense,
  onRejectExpense,
}: ExpenseDetailDrawerProps) {
  if (!isOpen || !expense) return null;

  const canEdit =
    expense.status === 'Active' &&
    (expense.approvalStatus === 'Draft' || expense.approvalStatus === 'Pending Approval');
  const canVoid = expense.status === 'Active';
  const isPending = expense.status === 'Active' && expense.approvalStatus === 'Pending Approval';

  const getStatusBadge = () => {
    if (expense.status === 'Voided') {
      return (
        <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-outline font-micro-label text-micro-label uppercase font-bold border border-outline-variant/40">
          VOIDED
        </span>
      );
    }
    switch (expense.approvalStatus) {
      case 'Approved':
        return (
          <span className="px-2 py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-micro-label text-micro-label uppercase font-bold border border-secondary/30">
            APPROVED
          </span>
        );
      case 'Pending Approval':
        return (
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-micro-label text-micro-label uppercase font-bold border border-tertiary/30">
            SUBMITTED
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-2 py-0.5 rounded-full bg-error-container/60 text-error font-micro-label text-micro-label uppercase font-bold border border-error/30">
            REJECTED
          </span>
        );
      case 'Draft':
        return (
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-micro-label text-micro-label uppercase font-bold">
            DRAFT
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-50 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="absolute top-0 right-0 bottom-0 w-full max-w-lg bg-surface-container-lowest shadow-2xl flex flex-col justify-between border-l border-outline-variant/30 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-space-base bg-surface-container-lowest flex items-center justify-between shadow-xs border-b border-outline-variant/30">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                Expense Details
              </span>
              {getStatusBadge()}
            </div>
            <span className="font-body-mono-num text-body-mono-num font-semibold text-primary mt-0.5">
              {expense.expenseNumber}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-space-base flex flex-col gap-space-base">
          {/* Edit Permission Notice Banner */}
          <div className="p-space-sm rounded-lg bg-surface-container-low border border-primary/20 flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-xs text-caption">
              <span className="material-symbols-outlined text-primary text-[16px]">lock_open</span>
              <span className="text-on-surface-variant">
                Edit Permission:{' '}
                <strong className="text-on-surface font-semibold">Org Admin</strong> &amp; Submitter (
                <strong className="text-on-surface font-semibold">{expense.submittedBy}</strong>)
              </span>
            </div>
            <span className="px-1.5 py-0.2 rounded font-micro-label text-micro-label uppercase bg-secondary-container/60 text-on-secondary-container font-bold shrink-0">
              {canEdit ? 'Authorized' : 'Locked'}
            </span>
          </div>

          {/* Rejection Alert Box if Rejected */}
          {expense.approvalStatus === 'Rejected' && (
            <div className="p-space-base rounded-lg bg-error-container/40 border border-error/30 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-error font-semibold text-caption">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>Audit Exception &amp; Rejection</span>
              </div>
              <p className="text-on-surface text-caption">
                {expense.rejectionReason || 'Missing vendor tax invoice. Please review voucher.'}
              </p>
            </div>
          )}

          {/* Amount Breakdown Valuation Card */}
          <div className="bg-surface-container-low p-space-base rounded-lg border border-outline-variant/30 flex flex-col gap-space-xs">
            <span className="font-micro-label text-micro-label uppercase tracking-widest text-on-surface-variant font-bold">
              EXPENDITURE VALUATION
            </span>
            <div className="flex items-baseline justify-between pt-space-xs">
              <span className="font-caption text-caption text-on-surface-variant">Base Outlay:</span>
              <span className="font-body-mono-num text-body-mono-num text-on-surface font-medium">
                {formatCurrency(expense.baseAmount)}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-caption text-caption text-on-surface-variant">
                Tax Provision (GST / VAT 9%):
              </span>
              <span className="font-body-mono-num text-body-mono-num text-on-surface font-medium">
                {formatCurrency(expense.taxAmount)}
              </span>
            </div>
            <div className="h-px bg-surface-container-high my-space-2xs" />
            <div className="flex items-baseline justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Total Reimbursable:
              </span>
              <span className="font-display-currency text-[24px] leading-tight font-bold text-primary font-body-mono-num">
                {formatCurrency(expense.amount)}
              </span>
            </div>
          </div>

          {/* Store & Payee Ledger */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-micro-label text-micro-label uppercase tracking-wider text-outline font-bold">
              STORE &amp; PAYEE LEDGER
            </span>
            <div className="bg-surface-container-lowest p-space-sm rounded-lg border border-outline-variant/30 flex flex-col gap-space-xs">
              <div className="flex items-start justify-between">
                <span className="text-on-surface-variant font-caption text-caption">Target Outlet:</span>
                <span className="font-body-medium text-body-medium text-on-surface text-right">
                  {expense.outletName}
                  {expense.outletAddress && (
                    <>
                      <br />
                      <span className="font-caption text-caption text-outline">
                        {expense.outletAddress}
                      </span>
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-on-surface-variant font-caption text-caption">Vendor / Payee:</span>
                <span className="font-body-medium text-body-medium text-primary font-semibold">
                  {expense.vendorName || 'Not specified'}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-on-surface-variant font-caption text-caption">
                  Vendor Invoice #:
                </span>
                <span className="font-body-mono-num text-body-mono-num font-semibold text-on-surface">
                  {expense.reference || 'N/A'}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-on-surface-variant font-caption text-caption">
                  Category Allocation:
                </span>
                <span className="font-caption text-caption px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-medium border border-outline-variant/20">
                  {expense.category}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-on-surface-variant font-caption text-caption">Description:</span>
                <span className="font-body-default text-body-default text-on-surface text-right max-w-[260px]">
                  {expense.description}
                </span>
              </div>
            </div>
          </div>

          {/* Settlement Details */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-micro-label text-micro-label uppercase tracking-wider text-outline font-bold">
              SETTLEMENT DETAILS
            </span>
            <div className="bg-surface-container-lowest p-space-sm rounded-lg border border-outline-variant/30 flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant font-caption text-caption">
                  Disbursement Method:
                </span>
                <span className="font-caption text-caption font-semibold text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    credit_card
                  </span>
                  {expense.paymentMethod}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant font-caption text-caption">
                  Paid By Employee:
                </span>
                <span className="font-caption text-caption text-on-surface font-medium">
                  {expense.paidByEmployee}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant font-caption text-caption">
                  Settlement Date:
                </span>
                <span className="font-body-mono-num text-body-mono-num font-caption text-caption text-on-surface">
                  {expense.settlementDate || expense.date}
                </span>
              </div>
            </div>
          </div>

          {/* Supporting Documents & Receipts */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-micro-label text-micro-label uppercase tracking-wider text-outline font-bold">
                SUPPORTING INVOICES ({expense.attachments?.length || 1})
              </span>
              <span className="text-primary font-caption text-caption cursor-pointer hover:underline">
                + Attach More
              </span>
            </div>
            <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded bg-error-container/40 text-error flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-medium text-body-medium text-on-surface truncate font-semibold">
                    {expense.attachments?.[0]?.name || `Invoice_${expense.expenseNumber}.pdf`}
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    {expense.attachments?.[0]?.size || '1.2 MB'} · Certified Upload
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => alert(`Previewing invoice document for ${expense.expenseNumber}`)}
                  className="px-2 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-primary font-caption text-caption font-semibold transition-colors border border-outline-variant/30 cursor-pointer"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Downloading invoice receipt for ${expense.expenseNumber}`)}
                  className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  title="Download"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Audit Trail & Timeline */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-micro-label text-micro-label uppercase tracking-wider text-outline font-bold">
              AUDIT TRAIL &amp; TIMELINE
            </span>
            <div className="relative pl-5 flex flex-col gap-space-base before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
              {expense.auditTrail && expense.auditTrail.length > 0 ? (
                expense.auditTrail.map((entry, idx) => (
                  <div key={entry.id || idx} className="relative flex flex-col">
                    <span
                      className={`absolute -left-5 top-1 w-2.5 h-2.5 rounded-full ${
                        entry.status === 'Approved'
                          ? 'bg-secondary'
                          : entry.status === 'Rejected'
                          ? 'bg-error'
                          : entry.status === 'Voided'
                          ? 'bg-outline'
                          : 'bg-tertiary'
                      }`}
                    />
                    <span className="font-body-medium text-body-medium text-on-surface font-semibold">
                      {entry.title}
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      {entry.actor} ({entry.actorRole}) · {entry.timestamp}
                    </span>
                    {entry.note && (
                      <span className="font-caption text-caption text-outline italic mt-0.5">
                        "{entry.note}"
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div className="relative flex flex-col">
                    <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-secondary" />
                    <span className="font-body-medium text-body-medium text-on-surface font-semibold">
                      Submitted for Review
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      {expense.submittedBy} on {expense.date}
                    </span>
                  </div>
                  {expense.approvalStatus === 'Pending Approval' && (
                    <div className="relative flex flex-col">
                      <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
                      <span className="font-body-medium text-body-medium text-tertiary font-semibold">
                        Pending Store Manager Sign-Off
                      </span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        Assigned to Sarah Jenkins (Store Mgr #04)
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-space-base bg-surface-container-lowest flex items-center justify-between gap-space-sm shadow-sm border-t border-outline-variant/30 flex-wrap">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-space-base rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium transition-colors border border-outline-variant/30 cursor-pointer"
          >
            Dismiss
          </button>

          <div className="flex items-center gap-space-xs flex-wrap">
            {/* Void Expense button */}
            {canVoid && (
              <button
                type="button"
                onClick={() => onVoidExpense(expense)}
                className="h-9 px-space-sm rounded-lg bg-surface-container-lowest hover:bg-error-container/20 text-error border border-error/30 font-caption text-caption font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
                <span>Void Expense</span>
              </button>
            )}

            {/* Manager Approve/Reject simulation if pending */}
            {isPending && onApproveExpense && (
              <button
                type="button"
                onClick={() => onApproveExpense(expense)}
                className="h-9 px-space-sm rounded-lg bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container font-caption text-caption font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Approve</span>
              </button>
            )}

            {isPending && onRejectExpense && (
              <button
                type="button"
                onClick={() => onRejectExpense(expense)}
                className="h-9 px-space-sm rounded-lg bg-error-container/60 hover:bg-error-container text-error font-caption text-caption font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">block</span>
                <span>Reject</span>
              </button>
            )}

            {/* Edit button */}
            <button
              type="button"
              disabled={!canEdit}
              onClick={() => onEditExpense(expense)}
              title={
                canEdit
                  ? `Edit ${expense.expenseNumber}`
                  : 'Approved or Voided expenses cannot be edited'
              }
              className={`h-9 px-space-base rounded-lg font-headline-sm text-headline-sm flex items-center gap-space-xs shadow-sm transition-colors cursor-pointer ${
                canEdit
                  ? 'bg-primary-container hover:bg-primary text-on-primary'
                  : 'bg-surface-container-low text-outline cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              <span>Edit Expense</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
