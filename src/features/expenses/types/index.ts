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

export interface ExpenseAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
}

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
  expenseNumber: string; // e.g. EX-2024-091
  date: string; // formatted e.g. "Oct 24, 2024" or ISO "2024-10-24"
  timestamp: number; // epoch ms for deterministic period filtering and sorting
  category: ExpenseCategory;
  description: string;
  reference?: string; // e.g. "GRID-TEX-8820 · Due EOM" or "INV-EKP-9921"
  vendorName?: string; // e.g. "EcoKraft Packaging Ltd."
  outletId?: string;
  outletName: string; // e.g. "Downtown Flagship #04", "Westside Mall #02", "Organization-wide"
  outletAddress?: string; // e.g. "410 Congress Ave"
  scope: ExpenseScope;
  baseAmount: number;
  taxAmount: number;
  amount: number; // total = baseAmount + taxAmount
  paymentMethod: PaymentMethod;
  paidByEmployee: string; // e.g. "Elena Rostova (EMP-103)"
  settlementDate?: string;
  status: ExpenseStatus; // Active | Voided
  approvalStatus: ExpenseApprovalStatus; // Draft | Pending Approval | Approved | Rejected
  submittedBy: string; // e.g. "Marcus Vance"
  submittedByRole?: string; // e.g. "Asst. Mgr"
  rejectionReason?: string; // e.g. "Missing vendor tax invoice"
  notes?: string;
  attachments?: ExpenseAttachment[];
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
  outletName: string;
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
  outletName?: string;
  baseAmount?: number;
  taxAmount?: number;
  paymentMethod?: PaymentMethod;
  paidByEmployee?: string;
  notes?: string;
}
