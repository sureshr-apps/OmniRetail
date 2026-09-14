import { Supplier } from '../types';
import { formatSupplierCode } from './formatSupplierCode';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(num);
}

export function exportSuppliersToCsv(suppliers: Supplier[]): void {
  const headers = [
    'Supplier Code',
    'Supplier Name',
    'Contact Person',
    'Phone',
    'Email',
    'City',
    'Category',
    'Tax ID',
    'Payment Terms',
    'Credit Limit',
    'Outstanding Balance',
    'Pending Deliveries',
    'Status',
  ];

  const rows = suppliers.map((s) => [
    `"${formatSupplierCode(s.supplierCode)}"`,
    `"${s.name.replace(/"/g, '""')}"`,
    `"${s.contactPerson.replace(/"/g, '""')}"`,
    `"${s.phone}"`,
    `"${s.email}"`,
    `"${s.city}"`,
    `"${s.category}"`,
    `"${s.taxId}"`,
    `"${s.paymentTerms}"`,
    s.creditLimit.toFixed(2),
    s.outstandingBalance.toFixed(2),
    s.pendingDeliveriesCount,
    `"${s.status}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `OmniRetail_Suppliers_Directory_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
