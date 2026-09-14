import { Customer } from '../types';
import { formatCustomerCode } from './formatCustomerCode';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getInitials(name: string): string {
  if (!name) return 'CU';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function exportCustomersToCsv(customers: Customer[]): void {
  const headers = [
    'Customer Code',
    'Customer Name',
    'Type',
    'Phone',
    'Email',
    'City',
    'State',
    'Total Purchases',
    'Balance',
    'Status',
    'Tax ID',
  ];

  const rows = customers.map((c) => [
    `"${formatCustomerCode(c.customerCode)}"`,
    `"${c.name.replace(/"/g, '""')}"`,
    `"${c.type}"`,
    `"${c.phone}"`,
    `"${c.email}"`,
    `"${c.city}"`,
    `"${c.state}"`,
    `"${c.totalPurchases.toFixed(2)}"`,
    `"${c.balance.toFixed(2)}"`,
    `"${c.status}"`,
    `"${c.taxId || ''}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `OmniRetail_Customers_Directory_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
