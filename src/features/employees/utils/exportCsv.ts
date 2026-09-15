import { Employee } from '../types';
import { formatEmployeeCode } from './formatEmployeeCode';

export function exportEmployeesToCsv(employees: Employee[], filename = 'omni_retail_employees.csv'): void {
  const headers = [
    'Employee Code',
    'Full Name',
    'Designation',
    'Department',
    'Phone',
    'Email',
    'Assignment Scope',
    'Assigned Outlets',
    'Login Access',
    'Employment Status',
    'Date of Birth',
    'Date of Joining',
    'Address',
    'Notes',
    'Created Date',
  ];

  const rows = employees.map((emp) => [
    `"${formatEmployeeCode(emp.employeeCode)}"`,
    `"${emp.displayName.replace(/"/g, '""')}"`,
    `"${emp.designation.replace(/"/g, '""')}"`,
    `"${(emp.department || '').replace(/"/g, '""')}"`,
    `"${emp.phone.replace(/"/g, '""')}"`,
    `"${emp.email.replace(/"/g, '""')}"`,
    `"${emp.assignmentScope}"`,
    `"${emp.outletAssignment.join('; ').replace(/"/g, '""')}"`,
    `"${emp.loginAccess}"`,
    `"${emp.employmentStatus}"`,
    `"${emp.dateOfBirth || ''}"`,
    `"${emp.dateOfJoining || ''}"`,
    `"${(emp.address || '').replace(/"/g, '""')}"`,
    `"${(emp.notes || '').replace(/"/g, '""')}"`,
    `"${emp.createdAt}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
