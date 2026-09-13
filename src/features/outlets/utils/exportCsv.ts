import { Outlet } from '../types';

export function exportOutletsToCsv(outlets: Outlet[]): void {
  const headers = [
    'Outlet Code',
    'Outlet Name',
    'Contact Person',
    'Contact Email',
    'Phone',
    'Street Address',
    'Status',
    'Created At',
  ];

  const escapeField = (val: unknown): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = outlets.map((o) => [
    escapeField(o.outletCode),
    escapeField(o.name),
    escapeField(o.contactPerson),
    escapeField(o.contactEmail || ''),
    escapeField(o.phone),
    escapeField(o.address || ''),
    escapeField(o.status),
    escapeField(o.createdAt),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `outlets_export_${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
