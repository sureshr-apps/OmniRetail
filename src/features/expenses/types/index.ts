export type ExpenseCategory =
  | 'Utilities'
  | 'Store Supplies'
  | 'Equipment Maintenance'
  | 'Marketing'
  | 'Logistics'
  | 'Professional Services'
  | 'Other';

export type ExpenseStatus = 'Active' | 'Voided';

export type ExpenseApprovalStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';

export type ExpenseScope = 'Outlet' | 'Organization-wide';

export type PaymentMethod = 'Cash' | 'Card' | 'Bank Transfer' | 'UPI / Digital' | 'Other';

export interface ExpenseAuditEntry {
  id: string;
  title: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  note?: string;
  status: ExpenseApprovalStatus | 'Voided';
}

export interface Expense {
  id: string;
  expenseNumber: string;
  date: string;
  timestamp: number; // epoch ms for deterministic period filtering and sorting
  category: ExpenseCategory;
  description: string;
  reference?: string;
  vendorName?: string;
  outletId?: string;
  outletName: string;
  outletAddress?: string;
  scope: ExpenseScope;
  baseAmount: number;
  taxAmount: number;
  amount: number; // total = baseAmount + taxAmount
  paymentMethod: PaymentMethod;
  paidByEmployee: string;
  settlementDate?: string;
  status: ExpenseStatus; // Active | Voided
  approvalStatus: ExpenseApprovalStatus; // Draft | Pending Approval | Approved | Rejected
  submittedBy: string;
  submittedByRole?: string;
  rejectionReason?: string;
  notes?: string;
  auditTrail: ExpenseAuditEntry[];
  createdAt: string;
  updatedAt: string;
}

export type ExpensePeriod =
  | 'This Month'
  | 'Last Month'
  | 'Last 7 Days'
  | 'Month to Date'
  | 'Custom Range'
  | 'All Time';

export interface ExpenseQuery {
  search?: string;
  period?: ExpensePeriod;
  customStartDate?: string;
  customEndDate?: string;
  outlet?: string; // 'All Outlets' or specific name
  category?: string; // 'All' or specific category
  status?: string; // 'All' | 'Approved' | 'Pending Approval' | 'Draft' | 'Rejected' | 'Voided'
  page: number;
  pageSize: number;
  sortBy?: keyof Expense;
  sortDirection?: 'asc' | 'desc';
}

export interface ExpenseQueryResult {
  expenses: Expense[];
  totalCount: number;
  filteredCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ExpenseKPIs {
  totalExpensesYtd: number;
  ytdGrowthPercent: number;
  thisMonthTotal: number;
  thisMonthCount: number;
  targetPercent: number;
  pendingApprovalCount: number;
  pendingApprovalAmount: number;
  queueCode: string;
  largestCategoryName: string;
  largestCategoryAmount: number;
  largestCategorySharePercent: number;
}

export interface CreateExpenseInput {
  date: string;
  category: ExpenseCategory;
  description: string;
  vendorName: string;
  reference?: string;
  outletId?: string;
  outletName: string;
  scope?: ExpenseScope;
  baseAmount: number;
  taxAmount: number;
  paymentMethod: PaymentMethod;
  paidByEmployee: string;
  notes?: string;
  saveAsDraft?: boolean;
}

export interface UpdateExpenseInput {
  date?: string;
  category?: ExpenseCategory;
  description?: string;
  vendorName?: string;
  reference?: string;
  outletId?: string;
  outletName?: string;
  scope?: ExpenseScope;
  baseAmount?: number;
  taxAmount?: number;
  paymentMethod?: PaymentMethod;
  paidByEmployee?: string;
  notes?: string;
}
