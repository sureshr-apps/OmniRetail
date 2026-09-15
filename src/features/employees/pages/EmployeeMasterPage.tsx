import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Employee,
  EmployeeStatus,
  AssignmentScope,
  LoginAccessStatus,
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from '../types';
import { employeeService, deriveEmployeeView } from '../services/employeeService';
import { outletService } from '../../outlets/services/outletService';
import { exportEmployeesToCsv } from '../utils/exportCsv';
import { upsertById, removeById } from '@/shared/utils/listState';
import { useDeleteConfirmation } from '@/shared/hooks/useDeleteConfirmation';
import { MasterDeleteConfirmDialog } from '@/shared/components/MasterDeleteConfirmDialog';
import { EmployeeHeader } from '../components/EmployeeHeader';
import { EmployeeFilterBar } from '../components/EmployeeFilterBar';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeePagination } from '../components/EmployeePagination';
import { EmployeeDetailDrawer } from '../components/EmployeeDetailDrawer';
import { EmployeeModal } from '../components/EmployeeModal';
import { EmployeeStatusConfirmDialog } from '../components/EmployeeStatusConfirmDialog';
import { EmployeeMoreFiltersModal } from '../components/EmployeeMoreFiltersModal';

export function EmployeeMasterPage() {
  // Query States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | EmployeeStatus>('All');
  const [scopeFilter, setScopeFilter] = useState<'All' | AssignmentScope>('All');
  const [loginFilter, setLoginFilter] = useState<'All' | LoginAccessStatus>('All');
  const [outletFilter, setOutletFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Data: the full org-scoped set. Mutations upsert into this directly; the
  // visible page, sort, and aggregate counts are all derived from it below.
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [availableOutlets, setAvailableOutlets] = useState<string[]>([]);
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers — selection is an id; the record itself is always derived
  // from allEmployees, so it reflects mutations with no extra sync code.
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [employeeForStatusChange, setEmployeeForStatusChange] = useState<Employee | null>(null);
  const [isProcessingStatus, setIsProcessingStatus] = useState(false);

  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const view = useMemo(
    () =>
      deriveEmployeeView(allEmployees, {
        search: searchQuery,
        status: statusFilter,
        scope: scopeFilter,
        loginAccess: loginFilter,
        outlet: outletFilter,
        department: departmentFilter,
        page,
        pageSize,
      }),
    [allEmployees, searchQuery, statusFilter, scopeFilter, loginFilter, outletFilter, departmentFilter, page, pageSize],
  );
  const selectedEmployee = useMemo(
    () => allEmployees.find((e) => e.id === selectedEmployeeId) ?? null,
    [allEmployees, selectedEmployeeId],
  );

  const deleteConfirmation = useDeleteConfirmation<Employee>({
    deleteRecord: (employee) => employeeService.deleteEmployee(employee.id),
    onDeleted: (employee) => {
      setAllEmployees((prev) => removeById(prev, employee.id));
      setIsDrawerOpen(false);
      setSelectedEmployeeId(null);
    },
  });

  // Load available outlets and departments once on mount
  useEffect(() => {
    async function loadMetadata() {
      try {
        const [activeOutlets, depts] = await Promise.all([
          outletService.getAllActiveOutlets(),
          employeeService.getDepartments(),
        ]);
        setAvailableOutlets(activeOutlets.map((o) => o.name));
        setAvailableDepartments(depts);
      } catch (e) {
        console.error('Error loading metadata:', e);
      }
    }
    loadMetadata();
  }, []);

  // Load Data — only for the initial mount or an error retry. Mutations no
  // longer trigger this; they update allEmployees locally instead.
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setAllEmployees(await employeeService.getAllEmployees());
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to connect to employee registry.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // If a mutation removes the last item(s) from the current page, fall back
  // to the previous page instead of showing an empty page.
  useEffect(() => {
    if (view.total > 0 && view.employees.length === 0 && page > 1) {
      setPage(view.totalPages);
    }
  }, [view, page]);

  // Handlers for search & filters
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleStatusFilterChange = (status: 'All' | EmployeeStatus) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleScopeFilterChange = (scope: 'All' | AssignmentScope) => {
    setScopeFilter(scope);
    setPage(1);
  };

  const handleLoginFilterChange = (login: 'All' | LoginAccessStatus) => {
    setLoginFilter(login);
    setPage(1);
  };

  const handleOutletFilterChange = (outlet: string) => {
    setOutletFilter(outlet);
    setPage(1);
  };

  const handleDepartmentFilterChange = (dept: string) => {
    setDepartmentFilter(dept);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setScopeFilter('All');
    setLoginFilter('All');
    setOutletFilter('');
    setDepartmentFilter('');
    setPage(1);
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
      statusFilter !== 'All' ||
      scopeFilter !== 'All' ||
      loginFilter !== 'All' ||
      outletFilter ||
      departmentFilter
  );

  // Pagination Handlers
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  // Action: Open Add Employee Modal
  const handleOpenAddModal = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  // Action: Open Edit Employee Modal
  const handleOpenEditModal = (emp: Employee) => {
    setEmployeeToEdit(emp);
    setIsModalOpen(true);
  };

  // Action: Open Details Drawer
  const handleViewDetails = (emp: Employee) => {
    setSelectedEmployeeId(emp.id);
    setIsDrawerOpen(true);
  };

  // Action: Submit Create Employee
  const handleCreateEmployee = async (input: CreateEmployeeInput) => {
    const created = await employeeService.createEmployee(input);
    setAllEmployees((prev) => upsertById(prev, created));
  };

  // Action: Submit Update Employee
  const handleUpdateEmployee = async (id: string, input: UpdateEmployeeInput) => {
    const updated = await employeeService.updateEmployee(id, input);
    setAllEmployees((prev) => upsertById(prev, updated));
  };

  const handlePromptDelete = (employee: Employee) => {
    setIsDrawerOpen(false);
    setSelectedEmployeeId(null);
    deleteConfirmation.open(employee);
  };

  // Action: Confirm Status Change
  const handlePromptToggleStatus = (emp: Employee) => {
    setEmployeeForStatusChange(emp);
    setIsStatusDialogOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!employeeForStatusChange) return;
    try {
      setIsProcessingStatus(true);
      const newStatus: EmployeeStatus =
        employeeForStatusChange.employmentStatus === 'Active' ? 'Inactive' : 'Active';
      const updated = await employeeService.changeEmployeeStatus(
        employeeForStatusChange.id,
        newStatus
      );

      setAllEmployees((prev) => upsertById(prev, updated));

      setIsStatusDialogOpen(false);
      setEmployeeForStatusChange(null);
    } catch (err) {
      console.error('Failed to change employee status:', err);
    } finally {
      setIsProcessingStatus(false);
    }
  };

  // Action: Export CSV — derived locally from the already-loaded full set,
  // matching the current filters, with no extra network call.
  const handleExportCsv = () => {
    const res = deriveEmployeeView(allEmployees, {
      search: searchQuery,
      status: statusFilter,
      scope: scopeFilter,
      loginAccess: loginFilter,
      outlet: outletFilter,
      department: departmentFilter,
      page: 1,
      pageSize: Math.max(allEmployees.length, 1),
    });
    exportEmployeesToCsv(res.employees);
  };

  return (
    <div className="p-space-xl max-w-7xl mx-auto space-y-space-xl">
      {/* 1. Header with Title, Meta, and Add Employee Button */}
      <EmployeeHeader activeCount={view.activeCount} onAddEmployee={handleOpenAddModal} />

      {/* 2. Filter Bar */}
      <EmployeeFilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        scopeFilter={scopeFilter}
        onScopeFilterChange={handleScopeFilterChange}
        loginFilter={loginFilter}
        onLoginFilterChange={handleLoginFilterChange}
        outletFilter={outletFilter}
        onOutletFilterChange={handleOutletFilterChange}
        availableOutlets={availableOutlets}
        onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
        onExportCsv={handleExportCsv}
        isFiltered={hasActiveFilters}
        onClearFilters={handleClearFilters}
      />

      {/* 3. Table Container */}
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/30 shadow-xs overflow-hidden">
        <EmployeeTable
          employees={view.employees}
          isLoading={isLoading}
          error={error}
          onViewDetails={handleViewDetails}
          onRetry={loadData}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
          onAddEmployee={handleOpenAddModal}
        />

        {/* 4. Pagination */}
        {!isLoading && !error && (
          <EmployeePagination
            currentPage={page}
            pageSize={pageSize}
            totalItems={view.total}
            totalPages={view.totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>

      {/* 5. Detail Drawer */}
      <EmployeeDetailDrawer
        employee={selectedEmployee}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedEmployeeId(null);
        }}
        onEdit={(emp) => {
          setIsDrawerOpen(false);
          handleOpenEditModal(emp);
        }}
        onToggleStatus={handlePromptToggleStatus}
        onDelete={handlePromptDelete}
      />

      {/* 6. Add / Edit Employee Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitCreate={handleCreateEmployee}
        onSubmitUpdate={handleUpdateEmployee}
        employeeToEdit={employeeToEdit}
        availableOutlets={availableOutlets}
      />

      {/* 7. Status Confirm Dialog */}
      <EmployeeStatusConfirmDialog
        employee={employeeForStatusChange}
        isOpen={isStatusDialogOpen}
        onClose={() => {
          setIsStatusDialogOpen(false);
          setEmployeeForStatusChange(null);
        }}
        onConfirm={handleConfirmStatusChange}
        isProcessing={isProcessingStatus}
      />

      <MasterDeleteConfirmDialog
        entityLabel="Employee"
        recordName={deleteConfirmation.record?.displayName ?? ''}
        isOpen={deleteConfirmation.isOpen}
        isProcessing={deleteConfirmation.isProcessing}
        error={deleteConfirmation.error}
        onClose={deleteConfirmation.close}
        onConfirm={deleteConfirmation.confirm}
      />

      {/* 9. Advanced Filters Modal */}
      <EmployeeMoreFiltersModal
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
        departmentFilter={departmentFilter}
        onDepartmentFilterChange={handleDepartmentFilterChange}
        availableDepartments={availableDepartments}
        onResetAllFilters={handleClearFilters}
      />
    </div>
  );
}
