import React, { useState } from 'react';
import { Employee } from '../types';
import { formatEmployeeCode } from '../utils/formatEmployeeCode';

interface EmployeeTableProps {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  onViewDetails: (employee: Employee) => void;
  onRetry: () => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onAddEmployee: () => void;
}

function EmployeeAvatar({ employee }: { employee: Employee }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = `${employee.firstName[0] || ''}${employee.lastName[0] || ''}`.toUpperCase();
  const isInactive = employee.employmentStatus === 'Inactive';

  if (!employee.avatarUrl || imgFailed) {
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-outline-variant/40 ${
          isInactive
            ? 'bg-slate-200 text-slate-500'
            : 'bg-primary-container/20 text-primary'
        }`}
      >
        {initials || <span className="material-symbols-outlined text-[16px]">person</span>}
      </div>
    );
  }

  return (
    <img
      src={employee.avatarUrl}
      alt={employee.displayName}
      onError={() => setImgFailed(true)}
      referrerPolicy="no-referrer"
      className={`w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/40 shrink-0 ${
        isInactive ? 'grayscale' : ''
      }`}
    />
  );
}

export function EmployeeTable({
  employees,
  isLoading,
  error,
  onViewDetails,
  onRetry,
  hasActiveFilters,
  onClearFilters,
  onAddEmployee,
}: EmployeeTableProps) {
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center bg-surface-container-lowest select-none">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mb-space-base" />
        <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          Fetching employee records &amp; outlet permissions...
        </p>
        <p className="font-caption text-caption text-on-surface-variant mt-1">
          Syncing with organization personnel directory
        </p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="py-16 px-space-lg text-center flex flex-col items-center justify-center bg-surface-container-lowest select-none">
        <div className="h-16 w-16 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-space-base">
          <span className="material-symbols-outlined text-[32px]">error</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
          Failed to load employee directory
        </h3>
        <p className="font-body-default text-body-default text-on-surface-variant max-w-md mt-1 mb-space-lg">
          {error}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="h-9 px-space-lg bg-primary text-on-primary rounded font-body-medium text-body-medium hover:bg-primary-container transition-colors flex items-center gap-space-xs cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  // 3. Empty State
  if (employees.length === 0) {
    if (hasActiveFilters) {
      return (
        <div className="py-20 px-space-lg text-center flex flex-col items-center justify-center bg-surface-container-lowest select-none">
          <div className="h-16 w-16 rounded-full bg-surface-container flex items-center justify-center text-primary mb-space-base">
            <span className="material-symbols-outlined text-[32px]">group_off</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
            No employees found matching filter
          </h3>
          <p className="font-body-default text-body-default text-on-surface-variant max-w-md mt-1 mb-space-lg">
            There are no personnel records matching your search query or selected store assignment filters. Try resetting your search parameters.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="h-9 px-space-lg bg-primary text-on-primary rounded font-body-medium text-body-medium hover:bg-primary-container transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      );
    }

    return (
      <div className="py-20 px-space-lg text-center flex flex-col items-center justify-center bg-surface-container-lowest select-none">
        <div className="h-16 w-16 rounded-full bg-surface-container flex items-center justify-center text-primary mb-space-base">
          <span className="material-symbols-outlined text-[32px]">badge</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
          No personnel configured yet
        </h3>
        <p className="font-body-default text-body-default text-on-surface-variant max-w-md mt-1 mb-space-lg">
          Add your first store manager, cashier, or inventory specialist to assign outlet coverage and configure terminal access.
        </p>
        <button
          type="button"
          onClick={onAddEmployee}
          className="h-9 px-space-lg bg-primary text-on-primary rounded font-body-medium text-body-medium hover:bg-primary-container transition-colors flex items-center gap-space-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Add Employee</span>
        </button>
      </div>
    );
  }

  // 4. Normal Data Table View
  return (
    <div className="overflow-x-auto select-none">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-low font-caption text-caption text-on-surface-variant uppercase tracking-wider">
            <th className="p-space-base font-semibold">Employee</th>
            <th className="p-space-base font-semibold">Designation</th>
            <th className="p-space-base font-semibold">Assigned Outlet</th>
            <th className="p-space-base font-semibold">Phone</th>
            <th className="p-space-base font-semibold">Login Access</th>
            <th className="p-space-base font-semibold">Status</th>
            <th className="p-space-base font-semibold text-right pr-6">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/15 font-body-default text-on-surface">
          {employees.map((employee) => {
            const isInactive = employee.employmentStatus === 'Inactive';
            const isOrgWide = employee.assignmentScope === 'Entire Organization';
            const outletPrimaryName =
              employee.outletAssignment && employee.outletAssignment.length > 0
                ? employee.outletAssignment[0]
                : 'Unassigned';
            const additionalOutletsCount =
              employee.outletAssignment && employee.outletAssignment.length > 1
                ? employee.outletAssignment.length - 1
                : 0;

            return (
              <tr
                key={employee.id}
                onClick={() => onViewDetails(employee)}
                className={`hover:bg-surface-container-low transition-colors cursor-pointer group ${
                  isInactive ? 'opacity-75' : ''
                }`}
              >
                {/* 1. EMPLOYEE */}
                <td className="p-space-base">
                  <div className="flex items-center gap-2.5">
                    <EmployeeAvatar employee={employee} />
                    <div className="min-w-0">
                      <span className="font-body-medium font-semibold text-on-surface block leading-tight truncate group-hover:text-primary transition-colors">
                        {employee.displayName}
                      </span>
                      <span className="font-body-mono-num text-micro-label font-semibold text-primary">
                        {formatEmployeeCode(employee.employeeCode)}
                      </span>
                    </div>
                  </div>
                </td>

                {/* 2. DESIGNATION */}
                <td className="p-space-base text-caption text-on-surface-variant whitespace-nowrap">
                  {employee.designation}
                </td>

                {/* 3. ASSIGNED OUTLET */}
                <td className="p-space-base">
                  {isOrgWide ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/10 text-primary font-caption font-semibold truncate max-w-[220px]">
                      <span className="material-symbols-outlined text-[13px]">domain</span>
                      <span>Organization-wide</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface font-caption truncate max-w-[220px]">
                      <span className="material-symbols-outlined text-[13px] text-primary">store</span>
                      <span className="truncate">{outletPrimaryName}</span>
                      {additionalOutletsCount > 0 && (
                        <span className="text-[10px] text-on-surface-variant font-bold bg-surface-container-high px-1 rounded">
                          +{additionalOutletsCount}
                        </span>
                      )}
                    </span>
                  )}
                </td>

                {/* 4. PHONE */}
                <td className="p-space-base font-body-mono-num text-caption text-on-surface-variant whitespace-nowrap">
                  {employee.phone}
                </td>

                {/* 5. LOGIN ACCESS */}
                <td className="p-space-base">
                  {employee.loginAccess === 'Enabled' ? (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-micro-label font-bold border border-emerald-200 tracking-wider">
                      ENABLED
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-micro-label font-bold border border-outline-variant/30 tracking-wider">
                      DISABLED
                    </span>
                  )}
                </td>

                {/* 6. STATUS */}
                <td className="p-space-base">
                  {employee.employmentStatus === 'Active' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-micro-label font-bold">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-micro-label font-bold">
                      Inactive
                    </span>
                  )}
                </td>

                {/* 7. ACTIONS (View Details Only) */}
                <td className="p-space-base text-right pr-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(employee);
                    }}
                    className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant hover:text-primary transition-colors cursor-pointer inline-flex items-center justify-center"
                    title="View Personnel Dossier"
                    aria-label={`View dossier for ${employee.displayName}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
