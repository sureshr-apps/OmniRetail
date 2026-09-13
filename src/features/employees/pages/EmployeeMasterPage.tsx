import React, { useState, useEffect, useCallback } from 'react';
import {
  Employee,
  EmployeeStatus,
  AssignmentScope,
  LoginAccessStatus,
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from '../types';
import { employeeService } from '../services/employeeService';
import { outletService } from '../../outlets/services/outletService';
import { exportEmployeesToCsv } from '../utils/exportCsv';
import { EmployeeHeader } from '../components/EmployeeHeader';
import { EmployeeFilterBar } from '../components/EmployeeFilterBar';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeePagination } from '../components/EmployeePagination';
import { EmployeeDetailDrawer } from '../components/EmployeeDetailDrawer';
import { EmployeeModal } from '../components/EmployeeModal';
import { EmployeeStatusConfirmDialog } from '../components/EmployeeStatusConfirmDialog';
import { EmployeeAccessConfirmDialog } from '../components/EmployeeAccessConfirmDialog';
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

  // Data & Results
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCount, setActiveCount] = useState(24);
  const [availableOutlets, setAvailableOutlets] = useState<string[]>([]);
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);
  const [nextEmployeeCode, setNextEmployeeCode] = useState('EMP-125');

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers
  const [selectedEmployeeForDrawer, setSelectedEmployeeForDrawer] = useState<Employee | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [employeeForStatusChange, setEmployeeForStatusChange] = useState<Employee | null>(null);
  const [isProcessingStatus, setIsProcessingStatus] = useState(false);

  const [isAccessDialogOpen, setIsAccessDialogOpen] = useState(false);
  const [employeeForAccessChange, setEmployeeForAccessChange] = useState<Employee | null>(null);
  const [isProcessingAccess, setIsProcessingAccess] = useState(false);

  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

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

  // Fetch employees
  const fetchEmployees = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await employeeService.getEmployees({
        search: searchQuery,
        status: statusFilter,
        scope: scopeFilter,
        loginAccess: loginFilter,
        outlet: outletFilter,
        department: departmentFilter,
        page,
        pageSize,
      });

      setEmployees(result.employees);
      setTotalEmployees(result.total);
      setTotalPages(result.totalPages);
      setActiveCount(result.activeCount);
      setNextEmployeeCode(employeeService.getNextEmployeeCode());

      // If a drawer is open, keep its data fresh
      if (selectedEmployeeForDrawer) {
        const refreshed = await employeeService.getEmployee(selectedEmployeeForDrawer.id);
        if (refreshed) {
          setSelectedEmployeeForDrawer(refreshed);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to connect to employee registry.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [
    searchQuery,
    statusFilter,
    scopeFilter,
    loginFilter,
    outletFilter,
    departmentFilter,
    page,
    pageSize,
    selectedEmployeeForDrawer?.id,
  ]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

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
    setSelectedEmployeeForDrawer(emp);
    setIsDrawerOpen(true);
  };

  // Action: Submit Create Employee
  const handleCreateEmployee = async (input: CreateEmployeeInput) => {
    await employeeService.createEmployee(input);
    await fetchEmployees();
  };

  // Action: Submit Update Employee
  const handleUpdateEmployee = async (id: string, input: UpdateEmployeeInput) => {
    const updated = await employeeService.updateEmployee(id, input);
    if (selectedEmployeeForDrawer && selectedEmployeeForDrawer.id === id) {
      setSelectedEmployeeForDrawer(updated);
    }
    await fetchEmployees();
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

      if (selectedEmployeeForDrawer && selectedEmployeeForDrawer.id === updated.id) {
        setSelectedEmployeeForDrawer(updated);
      }

      setIsStatusDialogOpen(false);
      setEmployeeForStatusChange(null);
      await fetchEmployees();
    } catch (err) {
      console.error('Failed to change employee status:', err);
    } finally {
      setIsProcessingStatus(false);
    }
  };

  // Action: Confirm Login Access Change
  const handlePromptToggleLoginAccess = (emp: Employee) => {
    setEmployeeForAccessChange(emp);
    setIsAccessDialogOpen(true);
  };

  const handleConfirmLoginAccessChange = async () => {
    if (!employeeForAccessChange) return;
    try {
      setIsProcessingAccess(true);
      const newAccess: LoginAccessStatus =
        employeeForAccessChange.loginAccess === 'Enabled' ? 'Disabled' : 'Enabled';
      const updated = await employeeService.changeLoginAccess(
        employeeForAccessChange.id,
        newAccess
      );

      if (selectedEmployeeForDrawer && selectedEmployeeForDrawer.id === updated.id) {
        setSelectedEmployeeForDrawer(updated);
      }

      setIsAccessDialogOpen(false);
      setEmployeeForAccessChange(null);
      await fetchEmployees();
    } catch (err) {
      console.error('Failed to change login access:', err);
    } finally {
      setIsProcessingAccess(false);
    }
  };

  // Action: Export CSV
  const handleExportCsv = async () => {
    // Export all matching current filters
    const result = await employeeService.getEmployees({
      search: searchQuery,
      status: statusFilter,
      scope: scopeFilter,
      loginAccess: loginFilter,
      outlet: outletFilter,
      department: departmentFilter,
      page: 1,
      pageSize: 500,
    });
    exportEmployeesToCsv(result.employees);
  };

  return (
    <div className="p-space-xl max-w-7xl mx-auto space-y-space-xl">
      {/* 1. Header with Title, Meta, and Add Employee Button */}
      <EmployeeHeader activeCount={activeCount} onAddEmployee={handleOpenAddModal} />

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
          employees={employees}
          isLoading={isLoading}
          error={error}
          onViewDetails={handleViewDetails}
          onRetry={fetchEmployees}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
          onAddEmployee={handleOpenAddModal}
        />

        {/* 4. Pagination */}
        {!isLoading && !error && (
          <EmployeePagination
            currentPage={page}
            pageSize={pageSize}
            totalItems={totalEmployees}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>

      {/* 5. Detail Drawer */}
      <EmployeeDetailDrawer
        employee={selectedEmployeeForDrawer}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onEdit={(emp) => {
          setIsDrawerOpen(false);
          handleOpenEditModal(emp);
        }}
        onToggleStatus={handlePromptToggleStatus}
        onToggleLoginAccess={handlePromptToggleLoginAccess}
      />

      {/* 6. Add / Edit Employee Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitCreate={handleCreateEmployee}
        onSubmitUpdate={handleUpdateEmployee}
        employeeToEdit={employeeToEdit}
        generatedEmployeeCode={nextEmployeeCode}
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

      {/* 8. Login Access Confirm Dialog */}
      <EmployeeAccessConfirmDialog
        employee={employeeForAccessChange}
        isOpen={isAccessDialogOpen}
        onClose={() => {
          setIsAccessDialogOpen(false);
          setEmployeeForAccessChange(null);
        }}
        onConfirm={handleConfirmLoginAccessChange}
        isProcessing={isProcessingAccess}
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
