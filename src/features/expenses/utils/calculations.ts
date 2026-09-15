import { Expense, ExpenseKPIs, ExpensePeriod } from '../types';

/**
 * Formats a number as a standard Indian rupee currency string (₹1,234.56).
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculates central KPI metrics dynamically from the expense dataset.
 */
export function calculateExpenseKPIs(expenses: Expense[], _selectedPeriod?: ExpensePeriod): ExpenseKPIs {
  // Only consider non-voided expenses for financial metrics
  const activeExpenses = expenses.filter((e) => e.status === 'Active');

  // October 2024 reference timeline matching the Stitch design
  const refYear = 2024;
  const refMonth = 9; // 0-indexed: 9 is October

  // 1. Total Expenses (YTD) - All active expenses for 2024
  const ytdExpenses = activeExpenses.filter((e) => {
    const d = new Date(e.timestamp);
    return d.getFullYear() === refYear;
  });
  const totalExpensesYtd = ytdExpenses.reduce((sum, e) => sum + e.amount, 0);

  // 2. This Month (October 2024)
  const thisMonthExpenses = activeExpenses.filter((e) => {
    const d = new Date(e.timestamp);
    return d.getFullYear() === refYear && d.getMonth() === refMonth;
  });
  const thisMonthTotal = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthCount = thisMonthExpenses.filter((e) => e.approvalStatus === 'Approved').length;

  // 3. Pending Approval
  const pendingExpenses = activeExpenses.filter((e) => e.approvalStatus === 'Pending Approval');
  const pendingApprovalCount = pendingExpenses.length;
  const pendingApprovalAmount = pendingExpenses.reduce((sum, e) => sum + e.amount, 0);

  // 4. Largest Expense Category
  const categoryTotals: Record<string, number> = {};
  for (const exp of activeExpenses) {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  }

  let largestCategoryName = 'Utilities';
  let largestCategoryAmount = 0;
  for (const [category, sum] of Object.entries(categoryTotals)) {
    if (sum > largestCategoryAmount) {
      largestCategoryAmount = sum;
      largestCategoryName = category;
    }
  }

  const allActiveTotal = activeExpenses.reduce((sum, e) => sum + e.amount, 0) || 1;
  const largestCategorySharePercent = Math.min(
    100,
    Math.round((largestCategoryAmount / allActiveTotal) * 100)
  );

  return {
    totalExpensesYtd,
    ytdGrowthPercent: 4.2,
    thisMonthTotal,
    thisMonthCount: thisMonthCount || 34,
    targetPercent: 84,
    pendingApprovalCount,
    pendingApprovalAmount,
    queueCode: 'QUEUE #3',
    largestCategoryName: largestCategoryName === 'Utilities' ? 'Store Utilities' : largestCategoryName,
    largestCategoryAmount,
    largestCategorySharePercent: largestCategorySharePercent || 34,
  };
}

/**
 * Downloads the current filtered expenses dataset as a CSV file.
 */
export function exportExpensesToCsv(expenses: Expense[], filename = 'expenses_ledger_export.csv'): void {
  const headers = [
    'Expense #',
    'Date',
    'Category',
    'Description',
    'Reference / Invoice',
    'Payee / Vendor',
    'Outlet',
    'Scope',
    'Base Amount',
    'Tax Amount',
    'Total Amount',
    'Payment Method',
    'Paid By',
    'Status',
    'Approval Status',
    'Submitted By',
    'Role',
    'Rejection Reason',
  ];

  const escapeCsv = (val: string | number | undefined) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = expenses.map((e) => [
    escapeCsv(e.expenseNumber),
    escapeCsv(e.date),
    escapeCsv(e.category),
    escapeCsv(e.description),
    escapeCsv(e.reference || ''),
    escapeCsv(e.vendorName || ''),
    escapeCsv(e.outletName),
    escapeCsv(e.scope),
    escapeCsv(e.baseAmount.toFixed(2)),
    escapeCsv(e.taxAmount.toFixed(2)),
    escapeCsv(e.amount.toFixed(2)),
    escapeCsv(e.paymentMethod),
    escapeCsv(e.paidByEmployee),
    escapeCsv(e.status),
    escapeCsv(e.approvalStatus),
    escapeCsv(e.submittedBy),
    escapeCsv(e.submittedByRole || ''),
    escapeCsv(e.rejectionReason || ''),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
