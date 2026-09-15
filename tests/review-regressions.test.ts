import { describe, expect, it } from 'vitest';
import { calculateGstTax, getGstRate } from '@/features/billing/utils/tax';
import { deriveExpenseView } from '@/features/expenses/services/expenseService';
import { matchesSalesFilter } from '@/features/sales/services/salesService';
import { deriveSupplierView } from '@/features/suppliers/services/supplierService';
import { buildSaleInsertQuery, isStockTrackedProduct, validateCheckoutInput } from '../functions/src/checkout';
import { validateProductFields } from '../functions/src/productBatch';
import type { Expense } from '@/features/expenses/types';
import type { SalesTransaction } from '@/features/sales/types';

const expense = (overrides: Partial<Expense> = {}): Expense => ({
  id: 'e1', expenseNumber: 'EX-1', date: '2026-09-15', timestamp: Date.parse('2026-09-15T10:00:00Z'),
  category: 'Utilities', description: 'Power', vendorName: 'Grid Co', outletName: 'Main', scope: 'Outlet',
  baseAmount: 100, taxAmount: 18, amount: 118, paymentMethod: 'Bank Transfer', paidByEmployee: 'Asha',
  status: 'Active', approvalStatus: 'Approved', submittedBy: 'Asha', auditTrail: [], createdAt: '', updatedAt: '', ...overrides,
});

describe('review regression coverage', () => {
  it('calculates Indian GST from the item tax category and allocates discounts', () => {
    expect(getGstRate('GST 18%')).toBe(0.18);
    expect(getGstRate('Tax Exempt')).toBe(0);
    expect(calculateGstTax([
      { quantity: 1, effectiveRate: 100, taxCategory: 'GST 5%' },
      { quantity: 2, effectiveRate: 100, taxCategory: 'GST 18%' },
    ], 30)).toBe(36.9);
  });

  it('applies production expense filters before pagination', () => {
    const all = [
      expense({ id: 'e1', category: 'Utilities', outletName: 'Main', approvalStatus: 'Approved' }),
      expense({ id: 'e2', category: 'Marketing', outletName: 'Branch', approvalStatus: 'Pending Approval', timestamp: Date.parse('2026-08-15T10:00:00Z') }),
      expense({ id: 'e3', status: 'Voided', outletName: 'Main', timestamp: Date.parse('2026-09-14T10:00:00Z') }),
    ];
    const view = deriveExpenseView(all, { period: 'This Month', outlet: 'Main', status: 'Active (Exclude Voids)', page: 1, pageSize: 10 });
    expect(view.expenses.map((item) => item.id)).toEqual(['e1']);
    expect(view.totalCount).toBe(1);
  });

  it('accepts custom checkout lines without inventing an inventory product id', () => {
    expect(() => validateCheckoutInput({
      organizationId: 'org', outletId: 'outlet', customerId: null, receiptNumber: 'R-1', customerName: 'Walk-in',
      staffName: 'Cashier', channel: 'POS', terminalId: 'POS-01', tenderType: 'CASH', tax: 0, discount: 0,
      subtotal: 25, totalNet: 25, lines: [{ productId: null, itemName: 'Alteration', quantity: 1, unitPrice: 25, subtotal: 25 }],
    })).not.toThrow();
  });

  it('builds the checkout sale INSERT with matching placeholders and parameters', () => {
    const input = {
      organizationId: 'org', outletId: 'outlet', customerId: 'customer', receiptNumber: 'R-1', customerName: 'Walk-in',
      staffName: 'Cashier', channel: 'POS', terminalId: 'POS-01', tenderType: 'CASH', tax: 18, discount: 5,
      subtotal: 100, totalNet: 113, lines: [],
    };
    const query = buildSaleInsertQuery(input, 'sale-1');

    expect(query.values).toHaveLength(14);
    expect(query.text.match(/\$\d+/g)).toEqual(Array.from({ length: 14 }, (_, index) => `$${index + 1}`));
    expect(query.text).not.toContain('$15');
  });

  it('requires inventory for stockable and consumable products, but not service products', () => {
    expect(isStockTrackedProduct('STOCKABLE')).toBe(true);
    expect(isStockTrackedProduct('SERVICE')).toBe(false);
    expect(isStockTrackedProduct('CONSUMABLE')).toBe(true);
  });

  it('rejects oversized product text at the callable boundary', () => {
    expect(() => validateProductFields({
      name: 'x'.repeat(129), brand: 'Brand', categoryName: 'Apparel', subcategoryName: null,
      type: 'STOCKABLE', sku: 'SKU-1', barcode: null, hsnCode: null, unitOfMeasure: 'Pieces',
      sellingPrice: 10, mrp: null, cost: null, minSellingPrice: null, discountAllowed: true,
      taxCategory: 'GST 5%', reorderLevel: 1, reorderQuantity: 1, primarySupplier: null, description: null,
    })).toThrow('invalid input');
  });

  it('maps the labels used by the Sales filter bar to production values', () => {
    const transaction = {
      id: 's1', receiptNumber: 'R-1', source: 'Data Connect', timestamp: new Date().toISOString(), displayDate: '', displayTime: '',
      customer: { name: 'Walk-in' }, staff: { id: 'u1', name: 'Asha' }, channel: 'POS', terminalId: 'POS-01', terminalName: 'POS-01',
      items: [], itemsSummary: 'Tea', skuSummary: 'TEA-1', tender: { type: 'cash', label: 'CASH' }, tax: 0, discount: 0,
      taxLabel: '', discountLabel: '', subtotal: 10, totalNet: 10, status: 'COMPLETED',
    } as SalesTransaction;
    expect(matchesSalesFilter(transaction, { dateRange: 'today', channel: 'All Channels (Unified)', paymentMethod: 'Cash Drawer', status: 'Completed', cashier: 'All Personnel', searchQuery: 'TEA-1', page: 1, pageSize: 10 })).toBe(true);
    expect(matchesSalesFilter(transaction, { dateRange: 'today', channel: 'POS Register 01 (Front Left)', paymentMethod: 'All Tender Methods', status: 'All Statuses', cashier: 'Asha (EMP-1)', searchQuery: '', page: 1, pageSize: 10 })).toBe(true);
  });

  it('derives supplier KPIs from production purchase aggregates', () => {
    const view = deriveSupplierView([
      { id: 's1', supplierCode: 1, name: 'A', contactPerson: 'A', phone: '1', email: 'a@a.test', category: 'General', paymentTerms: 'Immediate Wire', creditLimit: 1000, status: 'Active', outstandingBalance: 125, pendingDeliveriesCount: 2, totalOrdersCount: 3 },
      { id: 's2', supplierCode: 2, name: 'B', contactPerson: 'B', phone: '2', email: 'b@b.test', category: 'General', paymentTerms: 'Immediate Wire', creditLimit: 1000, status: 'Inactive', outstandingBalance: 50, pendingDeliveriesCount: 1, totalOrdersCount: 1 },
    ], { page: 1, pageSize: 10 });
    expect(view.totalCount).toBe(2);
    expect(view.kpiSummary.outstandingBalance).toBe(175);
    expect(view.kpiSummary.pendingDeliveries).toBe(3);
  });
});
