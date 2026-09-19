import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Expense,
  ExpensePeriod,
  CreateExpenseInput,
  ExpenseKPIs,
} from '../types';
import { expenseService, deriveExpenseView } from '../services/expenseService';
import { calculateExpenseKPIs, exportExpensesToCsv } from '../utils/calculations';

import { LedgerBreadcrumbRibbon } from '../components/LedgerBreadcrumbRibbon';
import { WorkflowBanner } from '../components/WorkflowBanner';
import { ExpensesHeader } from '../components/ExpensesHeader';
import { ExpensesKpiCards } from '../components/ExpensesKpiCards';
import { ExpensesFilterBar } from '../components/ExpensesFilterBar';
import { ExpensesTable } from '../components/ExpensesTable';
import { ExpensesPagination } from '../components/ExpensesPagination';
import { ExpenseDetailDrawer } from '../components/ExpenseDetailDrawer';
import { AddExpenseModal } from '../components/AddExpenseModal';
import { VoidConfirmDialog } from '../components/VoidConfirmDialog';
import { outletService } from '@/features/outlets/services/outletService';
import { employeeService } from '@/features/employees/services/employeeService';
import { useAuth } from '@/app/context/AuthContext';
import { upsertById } from '@/shared/utils/listState';

export function ExpensesPage() {
  // Filters & Query State
  const [searchQuery, setSearchQuery] = useState('');
  const [period, setPeriod] = useState<ExpensePeriod>('This Month');
  const [outlet, setOutlet] = useState('All Outlets');
  const [category, setCategory] = useState<string>('All');
  const [status, setStatus] = useState<string>('Active (Exclude Voids)');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Data State
  const [allExpensesForKpi, setAllExpensesForKpi] = useState<Expense[]>([]);
  const [availableOutlets, setAvailableOutlets] = useState<Array<{ id: string; name: string }>>([]);
  const [availableEmployees, setAvailableEmployees] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const currentUserName = user?.displayName?.trim() || user?.username?.trim() || '';
  const expenseEmployees = useMemo(() => {
    if (availableEmployees.length === 0) return currentUserName ? [{ id: 'current-user', name: currentUserName }] : [];
    if (currentUserName && !availableEmployees.some((employee) => employee.name === currentUserName)) {
      return [{ id: 'current-user', name: currentUserName }, ...availableEmployees];
    }
    return availableEmployees;
  }, [availableEmployees, currentUserName]);
  const data = useMemo(() => deriveExpenseView(allExpensesForKpi, {
    search: searchQuery,
    period,
    outlet,
    category: category !== 'All' ? category : undefined,
    status,
    page: currentPage,
    pageSize,
  }), [allExpensesForKpi, searchQuery, period, outlet, category, status, currentPage, pageSize]);

  // Selected & Modal State
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [expenseToVoid, setExpenseToVoid] = useState<Expense | null>(null);
  const [isVoidDialogOpen, setIsVoidDialogOpen] = useState(false);

  // Workflow Banner State
  const [showWorkflowBanner, setShowWorkflowBanner] = useState(false);
  const [workflowBannerData, setWorkflowBannerData] = useState<{ expenseNumber: string; message: string; dispatchCode: string } | null>(null);

  // Load the collection once per session. Filtering, pagination, and KPIs are
  // derived locally so typing in the search box does not refetch the ledger.
  const loadExpenses = useCallback(async () => {
    setIsLoading(true);
    try {
      const all = await expenseService.getAllExpenses();
      setAllExpensesForKpi(all);
    } catch (err) {
      console.error('Failed to load expenses:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  useEffect(() => {
    let active = true;
    void outletService.getAllActiveOutlets().then((outlets) => {
      if (active) setAvailableOutlets(outlets.map((outlet) => ({ id: outlet.id, name: outlet.name })));
    }).catch((error) => console.error('Failed to load expense outlets:', error));
    void employeeService.getAllEmployees().then((employees) => {
      if (active) setAvailableEmployees(employees.filter((employee) => employee.employmentStatus === 'Active').map((employee) => ({ id: employee.id, name: employee.displayName })));
    }).catch((error) => console.error('Failed to load expense employees:', error));
    return () => { active = false; };
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, period, outlet, category, status]);

  // Keyboard shortcut Alt+E for Add Expense
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.altKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        setExpenseToEdit(null);
        setIsAddModalOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute live dynamic KPIs based on all active expenses in system
  const dynamicKpis: ExpenseKPIs = useMemo(() => {
    return calculateExpenseKPIs(allExpensesForKpi);
  }, [allExpensesForKpi]);

  // Handler for opening an expense in the detail drawer
  const handleSelectExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDetailDrawerOpen(true);
  };

  // Handler for adding a new expense
  const handleCreateExpense = async (input: CreateExpenseInput, isDraft = false) => {
    try {
      const created = await expenseService.createExpense(input);
      setAllExpensesForKpi((current) => upsertById(current, created));
      // Update banner notification
      setWorkflowBannerData({
        expenseNumber: created.expenseNumber,
        message: isDraft
          ? 'saved as Draft.'
          : `recorded with status ${created.approvalStatus}.`,
        dispatchCode: created.approvalStatus,
      });
      setShowWorkflowBanner(true);
    } catch (err) {
      console.error('Failed to create expense:', err);
    }
  };

  // Handler for updating an existing expense
  const handleUpdateExpense = async (id: string, input: Partial<CreateExpenseInput>) => {
    try {
      const updated = await expenseService.updateExpense(id, input, selectedExpense?.id === id ? selectedExpense : undefined);
      if (selectedExpense && selectedExpense.id === id) {
        setSelectedExpense(updated);
      }
      setAllExpensesForKpi((current) => upsertById(current, updated));
    } catch (err) {
      console.error('Failed to update expense:', err);
    }
  };

  // Handler for opening edit modal from drawer
  const handleOpenEditExpense = (expense: Expense) => {
    setExpenseToEdit(expense);
    setIsDetailDrawerOpen(false);
    setIsAddModalOpen(true);
  };

  // Handler for opening void confirmation
  const handleOpenVoidDialog = (expense: Expense) => {
    setExpenseToVoid(expense);
    setIsVoidDialogOpen(true);
  };

  // Handler to confirm voiding
  const handleConfirmVoid = async (id: string, reason: string) => {
    try {
      const voided = await expenseService.voidExpense(id, reason, selectedExpense?.id === id ? selectedExpense : undefined);
      if (selectedExpense && selectedExpense.id === id) {
        setSelectedExpense(voided);
      }
      setAllExpensesForKpi((current) => upsertById(current, voided));
    } catch (err) {
      console.error('Failed to void expense:', err);
    }
  };

  // Manager approval action
  const handleApproveExpense = async (expense: Expense) => {
    try {
      const approved = await expenseService.approveExpense(expense.id, expense);
      setSelectedExpense(approved);
      setAllExpensesForKpi((current) => upsertById(current, approved));
    } catch (err) {
      console.error('Failed to approve expense:', err);
    }
  };

  // Manager rejection action
  const handleRejectExpense = async (expense: Expense) => {
    const reason = window.prompt('Enter a rejection reason for this expense:')?.trim();
    if (!reason) return;
    try {
      const rejected = await expenseService.rejectExpense(expense.id, reason, expense);
      setSelectedExpense(rejected);
      setAllExpensesForKpi((current) => upsertById(current, rejected));
    } catch (err) {
      console.error('Failed to reject expense:', err);
    }
  };

  // Filter pending approvals when KPI card 3 is clicked
  const handleFilterPending = () => {
    setStatus('Pending Approval');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setPeriod('This Month');
    setOutlet('All Outlets');
    setCategory('All');
    setStatus('Active (Exclude Voids)');
    setCurrentPage(1);
  };

  // Export CSV handler
  const handleExportCsv = () => {
    const filename = `expenses_ledger_${new Date().toISOString().split('T')[0]}.csv`;
    exportExpensesToCsv(data.items, filename);
  };

  // Export PDF handler
  const handleExportPdf = () => {
    alert(
      `Generating pre-formatted Audit PDF for ${data.items.length} records. In production, this compiles a certified reconciliation balance sheet.`
    );
  };

  return (
    <div className="flex-1 min-w-0 bg-surface flex flex-col">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-space-base md:p-space-lg flex flex-col gap-space-base">
        {/* 1. Ledger Breadcrumb Ribbon */}
        <LedgerBreadcrumbRibbon />

        {/* 2. Success / Workflow Notification Banner */}
        {showWorkflowBanner && workflowBannerData && (
          <WorkflowBanner
            expenseNumber={workflowBannerData.expenseNumber}
            message={workflowBannerData.message}
            dispatchCode={workflowBannerData.dispatchCode}
            onInspectRouting={() => {
              const target = allExpensesForKpi.find((e) => e.expenseNumber === workflowBannerData.expenseNumber);
              if (target) {
                handleSelectExpense(target);
              }
            }}
            onDismiss={() => setShowWorkflowBanner(false)}
          />
        )}

        {/* 3. Page Header */}
        <ExpensesHeader
          totalRecordsCount={allExpensesForKpi.length}
          onOpenAddExpense={() => {
            setExpenseToEdit(null);
            setIsAddModalOpen(true);
          }}
          onExportCsv={handleExportCsv}
          onExportPdf={handleExportPdf}
        />

        {/* 4. KPI Metrics Cards */}
        <ExpensesKpiCards
          kpis={dynamicKpis}
          periodLabel={new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(new Date())}
          onFilterPending={handleFilterPending}
        />

        {/* 5. Filter Controls & Active Constraint Chips */}
        <ExpensesFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          period={period}
          onPeriodChange={setPeriod}
          outlet={outlet}
          onOutletChange={setOutlet}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
          onResetFilters={handleResetFilters}
          filteredCount={data.totalCount}
          totalCount={allExpensesForKpi.length}
          outlets={availableOutlets}
        />

        {/* 6. High-density Expenses Data Table */}
        <ExpensesTable
          expenses={data.expenses}
          onSelectExpense={handleSelectExpense}
          isLoading={isLoading}
        />

        {/* 7. Pagination Bar */}
        <ExpensesPagination
          currentPage={data.page}
          totalPages={data.totalPages}
          pageSize={pageSize}
          filteredCount={data.totalCount}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* 8. Expense Detail Drawer */}
      <ExpenseDetailDrawer
        expense={selectedExpense}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        onEditExpense={handleOpenEditExpense}
        onVoidExpense={handleOpenVoidDialog}
        onApproveExpense={handleApproveExpense}
        onRejectExpense={handleRejectExpense}
      />

      {/* 9. Add / Edit Expense Modal */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setExpenseToEdit(null);
        }}
        onSubmit={handleCreateExpense}
        expenseToEdit={expenseToEdit}
        onUpdate={handleUpdateExpense}
        outlets={availableOutlets}
        employees={expenseEmployees}
        currentUserName={currentUserName}
      />

      {/* 10. Void Confirmation Dialog */}
      <VoidConfirmDialog
        expense={expenseToVoid}
        isOpen={isVoidDialogOpen}
        onClose={() => {
          setIsVoidDialogOpen(false);
          setExpenseToVoid(null);
        }}
        onConfirmVoid={handleConfirmVoid}
      />
    </div>
  );
}
