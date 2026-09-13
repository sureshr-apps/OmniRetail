import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Expense,
  ExpenseCategory,
  ExpensePeriod,
  CreateExpenseInput,
  ExpenseKPIs,
} from '../types';
import { expenseService } from '../services/expenseService';
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
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [allExpensesForKpi, setAllExpensesForKpi] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Selected & Modal State
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [expenseToVoid, setExpenseToVoid] = useState<Expense | null>(null);
  const [isVoidDialogOpen, setIsVoidDialogOpen] = useState(false);

  // Workflow Banner State
  const [showWorkflowBanner, setShowWorkflowBanner] = useState(true);
  const [workflowBannerData, setWorkflowBannerData] = useState({
    expenseNumber: 'EX-2024-090',
    message: 'successfully submitted for Tier-2 Manager Review and Audit Clearance.',
    dispatchCode: 'DISPATCHED #04',
  });

  // Fetch KPI data (all expenses or period-based)
  const loadKpiData = useCallback(async () => {
    try {
      const all = await expenseService.getAllExpenses();
      setAllExpensesForKpi(all);
    } catch (err) {
      console.error('Failed to load KPI data:', err);
    }
  }, []);

  // Fetch table expenses according to filters
  const loadExpenses = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await expenseService.getExpenses({
        search: searchQuery,
        period,
        outlet,
        category: category !== 'All' ? (category as ExpenseCategory) : undefined,
        status,
        page: currentPage,
        pageSize,
      });
      setExpenses(response.expenses);
      setTotalCount(response.totalCount);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, period, outlet, category, status, currentPage, pageSize]);

  // Initial load
  useEffect(() => {
    loadKpiData();
  }, [loadKpiData]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

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
      // Update banner notification
      setWorkflowBannerData({
        expenseNumber: created.expenseNumber,
        message: isDraft
          ? 'saved as Draft. Accessible in Draft status filter.'
          : created.approvalStatus === 'Approved'
          ? 'automatically approved under auto-reimbursement threshold ($50).'
          : 'successfully submitted for Tier-2 Manager Review and Audit Clearance.',
        dispatchCode: `DISPATCHED #${created.outletName.slice(-2)}`,
      });
      setShowWorkflowBanner(true);
      // Reload lists
      await loadExpenses();
      await loadKpiData();
    } catch (err) {
      console.error('Failed to create expense:', err);
    }
  };

  // Handler for updating an existing expense
  const handleUpdateExpense = async (id: string, input: Partial<CreateExpenseInput>) => {
    try {
      const updated = await expenseService.updateExpense(id, input);
      if (selectedExpense && selectedExpense.id === id) {
        setSelectedExpense(updated);
      }
      await loadExpenses();
      await loadKpiData();
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
      const voided = await expenseService.voidExpense(id, reason);
      if (selectedExpense && selectedExpense.id === id) {
        setSelectedExpense(voided);
      }
      await loadExpenses();
      await loadKpiData();
    } catch (err) {
      console.error('Failed to void expense:', err);
    }
  };

  // Mock manager approval action
  const handleApproveExpense = async (expense: Expense) => {
    try {
      const approved = await expenseService.approveExpense(expense.id, 'Sarah Jenkins (Store Mgr #04)');
      setSelectedExpense(approved);
      await loadExpenses();
      await loadKpiData();
    } catch (err) {
      console.error('Failed to approve expense:', err);
    }
  };

  // Mock manager rejection action
  const handleRejectExpense = async (expense: Expense) => {
    try {
      const rejected = await expenseService.rejectExpense(
        expense.id,
        'Voucher lacks valid tax registration number. Please re-submit.',
        'Sarah Jenkins (Store Mgr #04)'
      );
      setSelectedExpense(rejected);
      await loadExpenses();
      await loadKpiData();
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
    exportExpensesToCsv(expenses, filename);
  };

  // Export PDF handler
  const handleExportPdf = () => {
    alert(
      `Generating pre-formatted Audit PDF for ${expenses.length} records. In production, this compiles a certified reconciliation balance sheet.`
    );
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex-1 min-w-0 bg-surface flex flex-col">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-space-base md:p-space-lg flex flex-col gap-space-base">
        {/* 1. Ledger Breadcrumb Ribbon */}
        <LedgerBreadcrumbRibbon />

        {/* 2. Success / Workflow Notification Banner */}
        {showWorkflowBanner && (
          <WorkflowBanner
            expenseNumber={workflowBannerData.expenseNumber}
            message={workflowBannerData.message}
            dispatchCode={workflowBannerData.dispatchCode}
            onInspectRouting={() => {
              const target = expenses.find((e) => e.expenseNumber === workflowBannerData.expenseNumber);
              if (target) {
                handleSelectExpense(target);
              } else {
                alert(`Routing reference for ${workflowBannerData.expenseNumber}: Dispatched to Store Mgr Tier-2 approval queue.`);
              }
            }}
            onDismiss={() => setShowWorkflowBanner(false)}
          />
        )}

        {/* 3. Page Header */}
        <ExpensesHeader
          totalRecordsCount={allExpensesForKpi.length || 48}
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
          periodLabel="Oct 2024"
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
          filteredCount={totalCount}
          totalCount={allExpensesForKpi.length || 48}
        />

        {/* 6. High-density Expenses Data Table */}
        <ExpensesTable
          expenses={expenses}
          onSelectExpense={handleSelectExpense}
          isLoading={isLoading}
        />

        {/* 7. Pagination Bar */}
        <ExpensesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          filteredCount={totalCount}
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
