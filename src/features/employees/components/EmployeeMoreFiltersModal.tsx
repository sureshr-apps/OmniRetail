import React, { useState, useEffect } from 'react';

interface EmployeeMoreFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentFilter: string;
  onDepartmentFilterChange: (dept: string) => void;
  availableDepartments: string[];
  onResetAllFilters: () => void;
}

export function EmployeeMoreFiltersModal({
  isOpen,
  onClose,
  departmentFilter,
  onDepartmentFilterChange,
  availableDepartments,
  onResetAllFilters,
}: EmployeeMoreFiltersModalProps) {
  const [tempDepartment, setTempDepartment] = useState(departmentFilter);

  useEffect(() => {
    setTempDepartment(departmentFilter);
  }, [departmentFilter, isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onDepartmentFilterChange(tempDepartment);
    onClose();
  };

  const handleReset = () => {
    setTempDepartment('');
    onDepartmentFilterChange('');
    onResetAllFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-lg shadow-xl border border-outline-variant/40 p-space-xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">filter_list</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Advanced Filters
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
              Department
            </label>
            <select
              value={tempDepartment}
              onChange={(e) => setTempDepartment(e.target.value)}
              className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 font-caption text-caption text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="">All Departments</option>
              {availableDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-space-sm mt-6 pt-4 border-t border-outline-variant/20">
          <button
            type="button"
            onClick={handleReset}
            className="h-9 px-3 text-caption text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Reset All
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container font-body-medium text-body-medium text-on-surface transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="h-9 px-space-lg rounded bg-primary hover:bg-primary-container text-on-primary font-body-medium text-body-medium font-semibold shadow-xs transition-all cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
