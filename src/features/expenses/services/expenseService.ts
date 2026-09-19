import { Expense, ExpenseQuery, ExpenseQueryResult, CreateExpenseInput, UpdateExpenseInput } from '../types';
import { listTenantExpenses, listTenantExpensesPage, ExpenseApprovalStatus, ExpenseStatus } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { getCachedCurrentUserAuthorization } from '@/features/auth/services/authorizationCache';
import { httpsCallable } from 'firebase/functions';

export interface IExpenseService {
  getExpenses(query: ExpenseQuery): Promise<ExpenseQueryResult>;
  getExpense(id: string): Promise<Expense | null>;
  createExpense(input: CreateExpenseInput): Promise<Expense>;
  updateExpense(id: string, input: UpdateExpenseInput, currentExpense?: Expense): Promise<Expense>;
  voidExpense(id: string, reason?: string, currentExpense?: Expense): Promise<Expense>;
  approveExpense(id: string, currentExpense?: Expense): Promise<Expense>;
  rejectExpense(id: string, reason: string, currentExpense?: Expense): Promise<Expense>;
  getAllExpenses(): Promise<Expense[]>;
}

type TenantExpenseRow = Awaited<ReturnType<typeof listTenantExpenses>>['data']['expenses'][number];
type TenantExpensePageRow = Awaited<ReturnType<typeof listTenantExpensesPage>>['data']['expensesPage'][number];

interface ExpenseActor { displayName?: string | null; username?: string | null; }

export function resolveExpenseActor(user: ExpenseActor | undefined): string {
  const displayName = user?.displayName?.trim();
  const username = user?.username?.trim();
  if (!displayName && !username) throw new Error('Current user identity is unavailable.');
  return displayName || username!;
}

function mapTenantExpense(row: TenantExpenseRow | TenantExpensePageRow): Expense {
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

function expenseDateRange(query: ExpenseQuery): { start: string; end: string } {
  const now = new Date();
  const format = (date: Date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  if (!query.period || query.period === 'All Time') return { start: '1970-01-01', end: '9999-12-31' };
  if (query.period === 'Custom Range') {
    const end = query.customEndDate ? new Date(`${query.customEndDate}T00:00:00`) : new Date('9999-12-31T00:00:00');
    end.setDate(end.getDate() + 1);
    return { start: query.customStartDate || '1970-01-01', end: format(end) };
  }
  if (query.period === 'Last Month') return { start: format(new Date(now.getFullYear(), now.getMonth() - 1, 1)), end: format(new Date(now.getFullYear(), now.getMonth(), 1)) };
  const start = query.period === 'Last 7 Days' ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7) : new Date(now.getFullYear(), now.getMonth(), 1);
  return { start: format(start), end: format(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)) };
}

function expenseLike(value: string | undefined): string {
  const normalized = value?.trim();
  return normalized ? `%${normalized.replaceAll('%', '\\%').replaceAll('_', '\\_')}%` : '%';
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
    const auth = await getCachedCurrentUserAuthorization();
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
  async getExpenses(query: ExpenseQuery): Promise<ExpenseQueryResult> {
    const organizationId = await this.organizationId();
    const page = Math.max(1, query.page);
    const pageSize = Math.max(1, query.pageSize);
    const range = expenseDateRange(query);
    const targetOutlet = query.outlet?.replace(/^Outlet: /i, '');
    const targetCategory = query.category?.replace(/^Category: /i, '');
    const targetStatus = query.status === 'Voided' ? ExpenseStatus.VOIDED : query.status === 'Active (Exclude Voids)' ? ExpenseStatus.ACTIVE : null;
    const targetApproval = query.status && !['All', 'Active (Exclude Voids)', 'Voided'].includes(query.status) ? query.status.replaceAll(' ', '_').toUpperCase() as ExpenseApprovalStatus : null;
    const result = await listTenantExpensesPage(getFirebaseClientServices().dataConnect, {
      organizationId,
      searchPattern: expenseLike(query.search),
      startDate: range.start,
      endDate: range.end,
      outletPattern: expenseLike(targetOutlet && targetOutlet !== 'All Outlets' ? targetOutlet : undefined),
      categoryPattern: expenseLike(targetCategory && targetCategory !== 'All' ? targetCategory : undefined),
      status: targetStatus,
      approvalStatus: targetApproval,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    const expenses = result.data.expensesPage.map(mapTenantExpense);
    const totalCount = result.data.expensesCount[0]?._count ?? 0;
    return { expenses, totalCount, filteredCount: totalCount, page, pageSize, totalPages: Math.max(1, Math.ceil(totalCount / pageSize)) };
  }
  async getExpense(id: string): Promise<Expense | null> { return (await this.all()).find((expense) => expense.id === id || expense.expenseNumber === id) ?? null; }

  async createExpense(input: CreateExpenseInput): Promise<Expense> {
    const authorization = await getCachedCurrentUserAuthorization();
    const membership = authorization.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    const organizationId = membership.organization.id;
    const submittedBy = resolveExpenseActor(authorization.data.appUsers[0]);
    const expenseNumber = `EX-${new Date().getFullYear()}-${globalThis.crypto.randomUUID().replaceAll('-', '').slice(0, 16).toUpperCase()}`;
    const response = await httpsCallable(getFirebaseClientServices().functions, 'createTenantExpenseRecord')({ organizationId, expenseNumber, ...input, expenseDate: input.date, outletId: input.outletId ?? null, scope: input.scope ?? 'Outlet', amount: input.baseAmount + input.taxAmount, submittedBy, requestId: globalThis.crypto.randomUUID() });
    const id = (response.data as { id?: string }).id;
    if (!id) throw new Error('Expense was created but the server did not return its record.');
    const now = new Date().toISOString();
    return {
      id, expenseNumber, date: input.date, timestamp: Date.parse(input.date), category: input.category,
      description: input.description, vendorName: input.vendorName, reference: input.reference,
      outletId: input.outletId, outletName: input.outletName, scope: input.scope ?? 'Outlet',
      baseAmount: input.baseAmount, taxAmount: input.taxAmount, amount: input.baseAmount + input.taxAmount,
      paymentMethod: input.paymentMethod, paidByEmployee: input.paidByEmployee, status: 'Active',
      approvalStatus: 'Draft', submittedBy, notes: input.notes, auditTrail: [], createdAt: now, updatedAt: now,
    };
  }

  async updateExpense(id: string, input: UpdateExpenseInput, currentExpense?: Expense): Promise<Expense> {
    const current = currentExpense ?? await this.getExpense(id);
    if (!current) throw new Error(`Expense with id ${id} not found`);
    const organizationId = await this.organizationId(); const baseAmount = input.baseAmount ?? current.baseAmount; const taxAmount = input.taxAmount ?? current.taxAmount;
    await httpsCallable(getFirebaseClientServices().functions, 'updateTenantExpenseRecord')({ organizationId, id: current.id, expenseDate: input.date ?? current.date, category: input.category ?? current.category, description: input.description ?? current.description, reference: input.reference ?? current.reference ?? null, vendorName: input.vendorName ?? current.vendorName ?? null, outletId: input.outletId ?? current.outletId ?? null, scope: input.scope ?? current.scope, baseAmount, taxAmount, amount: baseAmount + taxAmount, paymentMethod: input.paymentMethod ?? current.paymentMethod, paidByEmployee: input.paidByEmployee ?? current.paidByEmployee, notes: input.notes ?? current.notes ?? null, requestId: globalThis.crypto.randomUUID() });
    return { ...current, ...input, date: input.date ?? current.date, timestamp: Date.parse(input.date ?? current.date), outletName: input.outletName ?? current.outletName, scope: input.scope ?? current.scope, baseAmount, taxAmount, amount: baseAmount + taxAmount, updatedAt: new Date().toISOString() };
  }

  async approveExpense(id: string, currentExpense?: Expense): Promise<Expense> { return this.changeApproval(id, 'APPROVED', undefined, currentExpense); }
  async rejectExpense(id: string, reason: string, currentExpense?: Expense): Promise<Expense> { return this.changeApproval(id, 'REJECTED', reason, currentExpense); }
  private async changeApproval(id: string, approvalStatus: 'APPROVED' | 'REJECTED', reason?: string, currentExpense?: Expense): Promise<Expense> {
    const current = currentExpense ?? await this.getExpense(id);
    if (!current) throw new Error(`Expense with id ${id} not found`);
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'changeTenantExpenseApprovalStatus')({ organizationId, id, approvalStatus, reason: reason ?? null, requestId: globalThis.crypto.randomUUID() });
    return { ...current, approvalStatus: approvalStatus === 'APPROVED' ? 'Approved' : 'Rejected', notes: reason ?? current.notes, updatedAt: new Date().toISOString() };
  }
  async voidExpense(id: string, reason = 'Voided by operator', currentExpense?: Expense): Promise<Expense> {
    const current = currentExpense ?? await this.getExpense(id);
    if (!current) throw new Error(`Expense with id ${id} not found`);
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'voidTenantExpenseRecord')({ organizationId, id, reason, requestId: globalThis.crypto.randomUUID() });
    return { ...current, status: 'Voided', notes: reason, updatedAt: new Date().toISOString() };
  }
}

export const expenseService: IExpenseService = new ProductionExpenseService();
