import React, { useState } from 'react';
import { Employee } from '../types';
import { formatEmployeeCode } from '../utils/formatEmployeeCode';

interface EmployeeDetailDrawerProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  onToggleStatus: (employee: Employee) => void;
  onToggleLoginAccess: (employee: Employee) => void;
}

export function EmployeeDetailDrawer({
  employee,
  isOpen,
  onClose,
  onEdit,
  onToggleStatus,
  onToggleLoginAccess,
}: EmployeeDetailDrawerProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!isOpen || !employee) return null;

  const isInactive = employee.employmentStatus === 'Inactive';
  const isLoginEnabled = employee.loginAccess === 'Enabled';
  const initials = `${employee.firstName[0] || ''}${employee.lastName[0] || ''}`.toUpperCase();

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/30 backdrop-blur-xs flex justify-end select-none animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest w-full max-w-lg h-full shadow-2xl border-l border-outline-variant/40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Panel Header */}
        <div className="px-space-xl py-space-base bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-body-mono-num text-caption font-semibold px-2 py-0.5 rounded bg-primary-container/10 text-primary">
              {formatEmployeeCode(employee.employeeCode)}
            </span>
            <span className="font-micro-label text-micro-label uppercase text-on-surface-variant font-bold">
              Personnel Dossier
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-space-xl space-y-space-xl">
          {/* Profile Banner Card */}
          <div className="p-space-lg rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center gap-space-lg">
            {!employee.avatarUrl || imgFailed ? (
              <div className="w-16 h-16 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold text-xl ring-2 ring-primary shrink-0">
                {initials || <span className="material-symbols-outlined text-[32px]">person</span>}
              </div>
            ) : (
              <img
                src={employee.avatarUrl}
                alt={employee.displayName}
                onError={() => setImgFailed(true)}
                referrerPolicy="no-referrer"
                className={`w-16 h-16 rounded-full object-cover ring-2 ring-primary shrink-0 ${
                  isInactive ? 'grayscale' : ''
                }`}
              />
            )}

            <div className="flex flex-col min-w-0">
              <h3 className="font-headline-md text-headline-md text-on-surface truncate font-bold">
                {employee.displayName}
              </h3>
              <p className="font-body-medium text-body-medium text-primary font-semibold">
                {employee.designation}
              </p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                {employee.employmentStatus === 'Active' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-micro-label font-bold">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-micro-label font-bold">
                    Inactive
                  </span>
                )}

                {isLoginEnabled ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-micro-label font-bold border border-emerald-200">
                    Login Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-micro-label font-bold border border-outline-variant/30">
                    Login Disabled
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contact & Metadata */}
          <div className="space-y-space-sm">
            <h4 className="font-micro-label text-micro-label text-on-surface-variant uppercase tracking-wider font-bold">
              Contact &amp; Metadata
            </h4>
            <div className="grid grid-cols-2 gap-2.5 bg-surface-container-low p-space-base rounded border border-outline-variant/20">
              <div>
                <span className="font-caption text-caption text-on-surface-variant block">Phone</span>
                <span className="font-body-mono-num text-caption text-on-surface font-semibold">
                  {employee.phone}
                </span>
              </div>
              <div>
                <span className="font-caption text-caption text-on-surface-variant block">Email</span>
                <span className="font-body-default text-body-default text-on-surface font-medium truncate block">
                  {employee.email}
                </span>
              </div>
              <div>
                <span className="font-caption text-caption text-on-surface-variant block">Department</span>
                <span className="font-body-default text-caption text-on-surface font-medium">
                  {employee.department || 'Retail Operations & Sales'}
                </span>
              </div>
              <div>
                <span className="font-caption text-caption text-on-surface-variant block">Date of Joining</span>
                <span className="font-body-mono-num text-caption text-on-surface">
                  {employee.dateOfJoining || '15 Jan 2022'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="font-caption text-caption text-on-surface-variant block">Assigned Outlet</span>
                <div className="mt-0.5">
                  {employee.assignmentScope === 'Entire Organization' ? (
                    <span className="inline-flex items-center gap-1 font-body-medium text-body-medium text-primary font-semibold">
                      <span className="material-symbols-outlined text-[15px]">domain</span>
                      Organization-wide (All Outlets)
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {employee.outletAssignment.map((outlet) => (
                        <span
                          key={outlet}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-primary font-caption font-semibold"
                        >
                          <span className="material-symbols-outlined text-[13px]">store</span>
                          {outlet}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {employee.residentialAddress && (
                <div className="col-span-2 border-t border-outline-variant/20 pt-2 mt-1">
                  <span className="font-caption text-caption text-on-surface-variant block">Residential Address</span>
                  <span className="font-body-default text-caption text-on-surface">
                    {employee.residentialAddress}
                    {employee.city ? `, ${employee.city}` : ''}
                    {employee.state ? `, ${employee.state}` : ''}
                    {employee.postalCode ? ` ${employee.postalCode}` : ''}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Access & Permission Profile */}
          <div className="space-y-space-sm">
            <h4 className="font-micro-label text-micro-label text-on-surface-variant uppercase tracking-wider font-bold">
              Security &amp; POS Permissions
            </h4>
            <div className="p-space-base rounded bg-surface-container-low border border-outline-variant/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption text-on-surface-variant">Permission Profile:</span>
                <span className="font-body-medium text-body-medium font-semibold text-on-surface">
                  {employee.permissionProfile || 'Cashier / Standard POS'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption text-on-surface-variant">Username / Terminal ID:</span>
                <span className="font-body-mono-num text-caption text-on-surface">
                  {employee.username || employee.email.split('@')[0]}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption text-on-surface-variant">Terminal Override PIN:</span>
                <span className="font-body-mono-num text-caption text-on-surface">
                  {employee.terminalPinConfigured ? '•••• (Configured)' : 'None (Cashier Only)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption text-on-surface-variant">Last Active Session:</span>
                <span className="font-body-mono-num text-caption text-on-surface">
                  {employee.lastActiveSession || 'Today, 08:30 AM (Shift #104)'}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="space-y-space-sm">
            <h4 className="font-micro-label text-micro-label text-on-surface-variant uppercase tracking-wider font-bold">
              Recent Activity Log
            </h4>
            <div className="space-y-2">
              {employee.recentActivity && employee.recentActivity.length > 0 ? (
                employee.recentActivity.map((act) => (
                  <div
                    key={act.id}
                    className="p-2.5 rounded bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] mt-0.5 ${
                        act.iconColor || 'text-primary'
                      }`}
                    >
                      {act.icon || 'history'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-body-medium text-body-medium text-on-surface font-semibold truncate">
                          {act.title}
                        </span>
                        <span className="font-body-mono-num text-micro-label text-on-surface-variant shrink-0 ml-2">
                          {act.timestamp}
                        </span>
                      </div>
                      <p className="font-caption text-caption text-on-surface-variant mt-0.5">
                        {act.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded bg-surface-container-low border border-outline-variant/20 text-center text-caption text-on-surface-variant">
                  No logged security or shift events recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel Footer Actions */}
        <div className="px-space-xl py-space-base bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between gap-space-sm shrink-0">
          <button
            type="button"
            onClick={() => onToggleStatus(employee)}
            className={`h-9 px-3 rounded border font-body-medium text-body-medium flex items-center gap-1 transition-colors cursor-pointer ${
              isInactive
                ? 'border-emerald-600/30 text-emerald-700 hover:bg-emerald-50'
                : 'border-error/30 text-error hover:bg-error-container/20'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isInactive ? 'power_settings_new' : 'person_off'}
            </span>
            <span>{isInactive ? 'Activate' : 'Deactivate'}</span>
          </button>

          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              onClick={() => onToggleLoginAccess(employee)}
              className="h-9 px-3 rounded border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container font-body-medium text-body-medium text-on-surface transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">key</span>
              <span>{isLoginEnabled ? 'Disable Access' : 'Enable Access'}</span>
            </button>
            <button
              type="button"
              onClick={() => onEdit(employee)}
              className="h-9 px-space-lg rounded bg-primary hover:bg-primary-container text-on-primary font-body-medium text-body-medium font-semibold shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>Edit Employee</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
