import { Expense, ExpenseQuery, ExpenseQueryResult, CreateExpenseInput, UpdateExpenseInput } from '../types';
import { getCurrentUserAuthorization, listTenantExpenses } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';

export interface IExpenseService {
  getExpenses(query: ExpenseQuery): Promise<ExpenseQueryResult>;
  getExpense(id: string): Promise<Expense | null>;
  createExpense(input: CreateExpenseInput): Promise<Expense>;
  updateExpense(id: string, input: UpdateExpenseInput): Promise<Expense>;
  voidExpense(id: string, reason?: string): Promise<Expense>;
  approveExpense(id: string, approverName?: string): Promise<Expense>;
  rejectExpense(id: string, reason: string, rejectorName?: string): Promise<Expense>;
  getAllExpenses(): Promise<Expense[]>;
}

type TenantExpenseRow = Awaited<ReturnType<typeof listTenantExpenses>>['data']['expenses'][number];

function mapTenantExpense(row: TenantExpenseRow): Expense {
  return {
    id: row.id, expenseNumber: row.expenseNumber, date: row.expenseDate, timestamp: Date.parse(row.expenseDate),
    category: row.category as Expense['category'], description: row.description, reference: row.reference ?? undefined,
    vendorName: row.vendorName ?? undefined, outletId: row.outlet?.id, outletName: row.outlet?.name ?? 'Organization-wide',
    scope: row.scope as Expense['scope'], baseAmount: row.baseAmount, taxAmount: row.taxAmount, amount: row.amount,
    paymentMethod: row.paymentMethod as Expense['paymentMethod'], paidByEmployee: row.paidByEmployee,
    settlementDate: row.settlementDate ?? undefined, status: row.status === 'ACTIVE' ? 'Active' : 'Voided',
    approvalStatus: row.approvalStatus.replace('_', ' ') as Expense['approvalStatus'], submittedBy: row.submittedBy,
    notes: row.notes ?? undefined, auditTrail: [], createdAt: row.createdAt, updatedAt: row.updatedAt,
  };
}

export function expenseDateBounds(period: ExpenseQuery['period'], customStartDate?: string, customEndDate?: string, now = new Date()): { start: number; end: number } | null {
  if (!period || period === 'All Time') return null;
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  if (period === 'This Month' || period === 'Month to Date') return { start: currentMonthStart, end: now.getTime() + 1 };
  if (period === 'Last Month') return { start: new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime(), end: currentMonthStart };
  if (period === 'Last 7 Days') return { start: now.getTime() - 7 * 24 * 60 * 60 * 1000, end: now.getTime() + 1 };
  return { start: customStartDate ? Date.parse(customStartDate) : Number.NEGATIVE_INFINITY, end: customEndDate ? Date.parse(customEndDate) + 24 * 60 * 60 * 1000 : Number.POSITIVE_INFINITY };
}

/** Applies every expense-list filter before pagination, independent of the data source. */
export function deriveExpenseView(all: Expense[], query: ExpenseQuery): ExpenseQueryResult {
  const search = query.search?.trim().toLowerCase() ?? '';
  const bounds = expenseDateBounds(query.period, query.customStartDate, query.customEndDate);
  const targetOutlet = query.outlet?.replace(/^Outlet: /i, '');
  const targetCategory = query.category?.replace(/^Category: /i, '');
  const filtered = all.filter((expense) => {
    const searchable = `${expense.expenseNumber} ${expense.category} ${expense.description} ${expense.vendorName ?? ''} ${expense.reference ?? ''} ${expense.submittedBy} ${expense.outletName}`.toLowerCase();
    if (search && !searchable.includes(search)) return false;
    if (bounds && !(expense.timestamp >= bounds.start && expense.timestamp < bounds.end)) return false;
    if (targetOutlet && targetOutlet !== 'All Outlets' && expense.outletName !== targetOutlet) return false;
    if (targetCategory && targetCategory !== 'All' && expense.category !== targetCategory) return false;
    if (query.status && query.status !== 'All') {
      if (query.status === 'Active (Exclude Voids)' && expense.status !== 'Active') return false;
      if (query.status === 'Voided' && expense.status !== 'Voided') return false;
      if (!['Active (Exclude Voids)', 'Voided'].includes(query.status) && expense.approvalStatus !== query.status) return false;
    }
    return true;
  });
  const sorted = [...filtered];
  if (query.sortBy) {
    const direction = query.sortDirection === 'desc' ? -1 : 1;
    sorted.sort((left, right) => String(left[query.sortBy!] ?? '').localeCompare(String(right[query.sortBy!] ?? ''), undefined, { numeric: true }) * direction);
  }
  const pageSize = Math.max(1, query.pageSize); const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize)); const page = Math.min(Math.max(1, query.page), totalPages);
  return { expenses: sorted.slice((page - 1) * pageSize, page * pageSize), totalCount: sorted.length, filteredCount: sorted.length, page, pageSize, totalPages };
}

class ProductionExpenseService implements IExpenseService {
  private async organizationId(): Promise<string> {
    const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    return membership.organization.id;
  }

  private async all(): Promise<Expense[]> {
    const organizationId = await this.organizationId();
    const result = await listTenantExpenses(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.expenses.map(mapTenantExpense);
  }

  async getAllExpenses(): Promise<Expense[]> { return this.all(); }
  async getExpenses(query: ExpenseQuery): Promise<ExpenseQueryResult> { return deriveExpenseView(await this.all(), query); }
  async getExpense(id: string): Promise<Expense | null> { return (await this.all()).find((expense) => expense.id === id || expense.expenseNumber === id) ?? null; }

  async createExpense(input: CreateExpenseInput): Promise<Expense> {
    const organizationId = await this.organizationId();
    const expenseNumber = `EX-${new Date().getFullYear()}-${globalThis.crypto.randomUUID().replaceAll('-', '').slice(0, 16).toUpperCase()}`;
    await httpsCallable(getFirebaseClientServices().functions, 'createTenantExpenseRecord')({ organizationId, expenseNumber, ...input, expenseDate: input.date, amount: input.baseAmount + input.taxAmount, submittedBy: input.paidByEmployee, requestId: globalThis.crypto.randomUUID() });
    const created = (await this.all()).find((expense) => expense.expenseNumber === expenseNumber);
    if (!created) throw new Error('Expense was created but could not be loaded.');
    return created;
  }

  async updateExpense(id: string, input: UpdateExpenseInput): Promise<Expense> {
    const current = await this.getExpense(id);
    if (!current) throw new Error(`Expense with id ${id} not found`);
    const organizationId = await this.organizationId(); const baseAmount = input.baseAmount ?? current.baseAmount; const taxAmount = input.taxAmount ?? current.taxAmount;
    await httpsCallable(getFirebaseClientServices().functions, 'updateTenantExpenseRecord')({ organizationId, id: current.id, expenseDate: input.date ?? current.date, category: input.category ?? current.category, description: input.description ?? current.description, reference: input.reference ?? current.reference ?? null, vendorName: input.vendorName ?? current.vendorName ?? null, scope: current.scope, baseAmount, taxAmount, amount: baseAmount + taxAmount, paymentMethod: input.paymentMethod ?? current.paymentMethod, paidByEmployee: input.paidByEmployee ?? current.paidByEmployee, notes: input.notes ?? current.notes ?? null, requestId: globalThis.crypto.randomUUID() });
    const updated = await this.getExpense(current.id); if (!updated) throw new Error('Expense was updated but could not be loaded.'); return updated;
  }

  async approveExpense(id: string, approverName?: string): Promise<Expense> { return this.changeApproval(id, 'APPROVED', approverName); }
  async rejectExpense(id: string, reason: string): Promise<Expense> { return this.changeApproval(id, 'REJECTED', reason); }
  private async changeApproval(id: string, approvalStatus: 'APPROVED' | 'REJECTED', reason?: string): Promise<Expense> {
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'changeTenantExpenseApprovalStatus')({ organizationId, id, approvalStatus, reason: reason ?? null, requestId: globalThis.crypto.randomUUID() });
    const updated = await this.getExpense(id); if (!updated) throw new Error('Expense approval was changed but could not be loaded.'); return updated;
  }
  async voidExpense(id: string, reason = 'Voided by operator'): Promise<Expense> {
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'voidTenantExpenseRecord')({ organizationId, id, reason, requestId: globalThis.crypto.randomUUID() });
    const updated = await this.getExpense(id); if (!updated) throw new Error('Expense was voided but could not be loaded.'); return updated;
  }
}

export const expenseService: IExpenseService = new ProductionExpenseService();
