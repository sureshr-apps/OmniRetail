import {
  Employee,
  EmployeeActivity,
  EmployeeQuery,
  EmployeeQueryResult,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeStatus,
  LoginAccessStatus,
} from '../types';
import { getCurrentUserAuthorization, listTenantEmployees } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';

export interface IEmployeeService {
  getEmployees(query: EmployeeQuery): Promise<EmployeeQueryResult>;
  getEmployee(id: string): Promise<Employee | null>;
  createEmployee(input: CreateEmployeeInput): Promise<Employee>;
  updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee>;
  changeEmployeeStatus(id: string, status: EmployeeStatus): Promise<Employee>;
  changeLoginAccess(id: string, access: LoginAccessStatus): Promise<Employee>;
  getNextEmployeeCode(): string;
  getDepartments(): Promise<string[]>;
  getDesignations(): Promise<string[]>;
}

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-101',
    employeeCode: 'EMP-101',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    displayName: 'Sarah Jenkins',
    designation: 'Store Manager',
    department: 'Store Management',
    phone: '+1 (555) 234-5678',
    email: 'sarah.j@punarvafashion.com',
    outletAssignment: ['Downtown Flagship #04'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn-_aSiIShFmwT2pmufWIA9IM7Sy2P7w0fe3Kvg-vwi9bzVnc39I9xXkEN8B4u1ISeibfkoTmxDHL6Z6nTExHn-ptgUvDaJiObWs7OpKJHR1fJLpPrHMpcrzV--7TQ-iLMVuOoPahfzXI4DG5-kmnoVy5OVIOhk_LVzSiHrMiZWMIlXGksJm6hucJyh6r2xvGO7FI_tsUb20nYaG65R7q_ajG--0Z6Ojp4UgmeygIyvvXq-QjeSa8',
    gender: 'Female',
    dateOfBirth: '1989-04-12',
    dateOfJoining: '2022-01-15',
    residentialAddress: '104 Fashion Avenue, Suite 3B',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78701',
    username: 'sarah.jenkins',
    permissionProfile: 'Store Manager (Full Control)',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 08:30 AM (Shift #104)',
    createdAt: '2022-01-15T08:00:00Z',
    updatedAt: '2024-09-12T10:00:00Z',
    recentActivity: [
      {
        id: 'act-1',
        title: 'Opened Cash Register Shift #104',
        timestamp: '08:30 AM',
        description: 'Downtown Flagship Terminal #2',
        icon: 'point_of_sale',
        iconColor: 'text-primary',
      },
      {
        id: 'act-2',
        title: 'Approved Stock Audit Discrepancy',
        timestamp: 'Yesterday',
        description: 'SKU #PF-88219 (Silk Evening Gown)',
        icon: 'inventory_2',
        iconColor: 'text-secondary',
      },
      {
        id: 'act-3',
        title: 'Updated Terminal Permissions',
        timestamp: '3 days ago',
        description: 'Assigned cashier override to Marcus Vance',
        icon: 'key',
        iconColor: 'text-tertiary',
      },
    ],
  },
  {
    id: 'emp-102',
    employeeCode: 'EMP-102',
    firstName: 'Marcus',
    lastName: 'Vance',
    displayName: 'Marcus Vance',
    designation: 'Assistant Manager',
    department: 'Store Management',
    phone: '+1 (555) 432-8765',
    email: 'marcus.v@punarvafashion.com',
    outletAssignment: ['Uptown Mall #12'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAag4j9FxmkjpwHvPnIuLovBwitLy7eNrvM3qoqItSNaqfzmaYv2T7dCn0wDbkTZ4qDSl4dKsgD6D79LxswtiKXcdSjDqFON8EQVvyoonIstdmHID5Z5bnXZ3uEQD7QnhRlnR6KZJwQo4SoMYJyGJNopZnLKTXa6R33E62ezoa23sLuBN6GtCDxP4rJ0m3vHKC92fK5g_r_pEQ5YqGhzVEGK5pOgIw_FdNY3GQ2REeJYJDFslgOImw',
    gender: 'Male',
    dateOfBirth: '1992-08-23',
    dateOfJoining: '2022-06-10',
    residentialAddress: '312 Oak Meadow Dr',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78759',
    username: 'marcus.vance',
    permissionProfile: 'Assistant Store Manager',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 09:15 AM (Shift #105)',
    createdAt: '2022-06-10T09:00:00Z',
    updatedAt: '2024-09-12T09:15:00Z',
    recentActivity: [
      {
        id: 'act-4',
        title: 'Closed Evening Register Batch #08',
        timestamp: 'Yesterday',
        description: 'Settled $3,450.00 tender variance zeroed.',
        icon: 'receipt_long',
        iconColor: 'text-primary',
      },
    ],
  },
  {
    id: 'emp-104',
    employeeCode: 'EMP-104',
    firstName: 'David',
    lastName: 'Chen',
    displayName: 'David Chen',
    designation: 'Inventory Specialist',
    department: 'Warehouse & Logistics',
    phone: '+1 (555) 345-6789',
    email: 'david.c@punarvafashion.com',
    outletAssignment: ['Organization-wide (All Outlets)'],
    assignmentScope: 'Entire Organization',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-0MP8MukS9r1MLpgF2-k7yc641k2qwQIyluvGEMrrR_HqMESabegAlaWi1IhgAHltZC3mOgXaHbw1zfYfCk81JSUsCLOoUfwEXvycxhJCL7QS1tb9hz7bnAmaCq1YtWcYjOqqLWo-HPJ5lMF76vgKU-T9ChyfH_EViieKKQEFgzVow0jAW_vXWSliIoj-vUjkAjtmgl0yvZkbEvj-6QJL51Ig3QK-obnI1xOJ0muVbOVByWq6Vf8',
    gender: 'Male',
    dateOfBirth: '1987-11-05',
    dateOfJoining: '2021-09-01',
    residentialAddress: '88 Barton Springs Rd, Apt 410',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78704',
    username: 'david.chen',
    permissionProfile: 'Inventory Auditor',
    terminalPinConfigured: true,
    lastActiveSession: 'Yesterday, 04:20 PM (Stock Audit)',
    createdAt: '2021-09-01T08:00:00Z',
    updatedAt: '2024-09-11T16:20:00Z',
    recentActivity: [
      {
        id: 'act-5',
        title: 'Initiated Cross-Store Stock Transfer',
        timestamp: 'Yesterday',
        description: 'Dispatched 50 Embroidered Kurtas to Northside Galleria',
        icon: 'local_shipping',
        iconColor: 'text-secondary',
      },
    ],
  },
  {
    id: 'emp-106',
    employeeCode: 'EMP-106',
    firstName: 'Amina',
    lastName: 'Patel',
    displayName: 'Amina Patel',
    designation: 'Visual Merchandiser',
    department: 'Visual Merchandising',
    phone: '+1 (555) 654-3210',
    email: 'amina.p@punarvafashion.com',
    outletAssignment: ['Downtown Flagship #04'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgg3vW5Td240TwgG8XIOiY2hJWPtE-IgYsvVR6oXtWABirmimRwrI5ELQqXpqXB57Bm1uGXu_1XjtYBu7iWITErDOGN_HsAItVxWO6tJFI2H-LoA7g480kBPmEJlBBpbuXmFrOJQm6uH2bkfp7A_AJEJQK2MubJYd4cT0q1s9e0pnkfo0RkKxiZ0b1iSWn7ajxK3Gsrerj3mgPwifxkMvXQTrVk3fX3b03AZ4RYBqCvumjBD5_F-E',
    gender: 'Female',
    dateOfBirth: '1995-02-18',
    dateOfJoining: '2023-03-15',
    residentialAddress: '512 South Lamar Blvd',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78704',
    username: 'amina.patel',
    permissionProfile: 'Store Associate',
    terminalPinConfigured: false,
    lastActiveSession: 'Today, 10:00 AM',
    createdAt: '2023-03-15T10:00:00Z',
    updatedAt: '2024-09-12T10:00:00Z',
    recentActivity: [
      {
        id: 'act-6',
        title: 'Updated Mannequin Display Planogram',
        timestamp: '2h ago',
        description: 'Fall Bridal Collection showroom staging complete.',
        icon: 'style',
        iconColor: 'text-primary',
      },
    ],
  },
  {
    id: 'emp-103',
    employeeCode: 'EMP-103',
    firstName: 'Elena',
    lastName: 'Rostova',
    displayName: 'Elena Rostova',
    designation: 'Senior Cashier',
    department: 'Cash & Billing',
    phone: '+1 (555) 789-0123',
    email: 'elena.r@punarvafashion.com',
    outletAssignment: ['Downtown Flagship #04'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKNoGRBDoAYdciCyrdA0cAkNj_sd75Vca3lh8dM4Yzs5WydkbVHDwjViF3jwHWBvUr1JbN4eDllqHICTiVvd13Fx-PkNGfW-4_6WerycenhCUsV-zoY6Z0D8QCpB4DbgAL3O2BkBiwB-O4F1jlNGvKSY1SFBySlfj5CT3QNvnYYqnDwH11BhKRRkcgcRQgot90ipwj3CGcJfK_bt7QgSNiLb-LVvqpXLyK1fsEoMc0y-0V2BiiLyI',
    gender: 'Female',
    dateOfBirth: '1993-07-29',
    dateOfJoining: '2022-04-01',
    residentialAddress: '900 Guadalupe St, #14',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78701',
    username: 'elena.rostova',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 08:45 AM (Register 01)',
    createdAt: '2022-04-01T08:00:00Z',
    updatedAt: '2024-09-12T08:45:00Z',
    recentActivity: [
      {
        id: 'act-7',
        title: 'Processed Tender Transaction #8892',
        timestamp: '15m ago',
        description: 'Tendered $420.00 via POS Card Terminal',
        icon: 'point_of_sale',
        iconColor: 'text-primary',
      },
    ],
  },
  {
    id: 'emp-105',
    employeeCode: 'EMP-105',
    firstName: 'Jessica',
    lastName: 'Taylor',
    displayName: 'Jessica Taylor',
    designation: 'Sales Associate',
    department: 'Retail Operations & Sales',
    phone: '+1 (555) 901-2345',
    email: 'jessica.t@punarvafashion.com',
    outletAssignment: ['Westside Express #08'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Inactive',
    loginAccess: 'Disabled',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCC9RR3KKuSR-72-BGk7b1NosSfEEIbcGGSi70k9PWJiDWla3q3iQLx4JUxslTuQS2O3bpJBt2ppWMPKQK3DPrZykaYcDjoSGtk7uP9pXw_e89E3tUPyX_yDGkSEBJLG8WxhC5lWc6pnuVwBCtikm--aEe_g98sdr6q6-rYUWiG5D_WNK_9ZgDnttkhjo9jiwT1eDGddwXRXuHX6poS4z4DhUyRarTRgJO7rZMmqyWC450xWFu9wHA',
    gender: 'Female',
    dateOfBirth: '1996-10-14',
    dateOfJoining: '2023-01-10',
    residentialAddress: '2204 Westlake Hills Pkwy',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78746',
    username: 'jessica.taylor',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: false,
    lastActiveSession: 'Inactive (Terminated)',
    createdAt: '2023-01-10T09:00:00Z',
    updatedAt: '2024-08-15T12:00:00Z',
    recentActivity: [
      {
        id: 'act-8',
        title: 'Employee Deactivated',
        timestamp: 'Aug 15, 2024',
        description: 'Account access disabled per HR requisition.',
        icon: 'person_off',
        iconColor: 'text-error',
      },
    ],
  },
  {
    id: 'emp-107',
    employeeCode: 'EMP-107',
    firstName: 'Rachel',
    lastName: 'Green',
    displayName: 'Rachel Green',
    designation: 'Store Manager',
    department: 'Store Management',
    phone: '+1 (555) 789-2210',
    email: 'rachel.g@punarvafashion.com',
    outletAssignment: ['Metro North Hub #01'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Female',
    dateOfBirth: '1991-05-05',
    dateOfJoining: '2023-02-01',
    residentialAddress: '1540 Metro Pkwy',
    city: 'Round Rock',
    state: 'Texas',
    postalCode: '78664',
    username: 'rachel.green',
    permissionProfile: 'Store Manager (Full Control)',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 08:15 AM',
    createdAt: '2023-02-01T08:00:00Z',
    updatedAt: '2024-09-12T08:15:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-108',
    employeeCode: 'EMP-108',
    firstName: 'Arjun',
    lastName: 'Kapoor',
    displayName: 'Arjun Kapoor',
    designation: 'Senior Cashier',
    department: 'Cash & Billing',
    phone: '+1 (555) 341-9876',
    email: 'arjun.k@punarvafashion.com',
    outletAssignment: ['Uptown Mall #12'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Male',
    dateOfBirth: '1994-09-19',
    dateOfJoining: '2023-04-15',
    residentialAddress: '412 Braker Ln',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78758',
    username: 'arjun.kapoor',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: true,
    lastActiveSession: 'Yesterday, 07:00 PM',
    createdAt: '2023-04-15T09:00:00Z',
    updatedAt: '2024-09-11T19:00:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-109',
    employeeCode: 'EMP-109',
    firstName: 'Chloe',
    lastName: 'Dupont',
    displayName: 'Chloe Dupont',
    designation: 'Sales Associate',
    department: 'Retail Operations & Sales',
    phone: '+1 (555) 890-4321',
    email: 'chloe.d@punarvafashion.com',
    outletAssignment: ['Downtown Flagship #04'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Female',
    dateOfBirth: '1998-12-03',
    dateOfJoining: '2023-07-01',
    residentialAddress: '1205 Lavaca St',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78701',
    username: 'chloe.dupont',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 11:00 AM',
    createdAt: '2023-07-01T09:00:00Z',
    updatedAt: '2024-09-12T11:00:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-110',
    employeeCode: 'EMP-110',
    firstName: 'Devon',
    lastName: 'Miles',
    displayName: 'Devon Miles',
    designation: 'Inventory Auditor',
    department: 'Inventory & Audit',
    phone: '+1 (555) 678-1234',
    email: 'devon.m@punarvafashion.com',
    outletAssignment: ['Organization-wide (All Outlets)'],
    assignmentScope: 'Entire Organization',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Non-binary / Other',
    dateOfBirth: '1990-03-21',
    dateOfJoining: '2022-10-01',
    residentialAddress: '704 E 11th St',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78702',
    username: 'devon.miles',
    permissionProfile: 'Inventory Auditor',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 09:30 AM',
    createdAt: '2022-10-01T08:00:00Z',
    updatedAt: '2024-09-12T09:30:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-111',
    employeeCode: 'EMP-111',
    firstName: 'Priya',
    lastName: 'Sharma',
    displayName: 'Priya Sharma',
    designation: 'Sales Associate',
    department: 'Retail Operations & Sales',
    phone: '+1 (555) 456-7890',
    email: 'priya.s@punarvafashion.com',
    outletAssignment: ['Northside Galleria Mall'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Female',
    dateOfBirth: '1997-06-14',
    dateOfJoining: '2023-08-15',
    residentialAddress: '10901 Burnet Rd',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78758',
    username: 'priya.sharma',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: false,
    lastActiveSession: 'Today, 10:15 AM',
    createdAt: '2023-08-15T09:00:00Z',
    updatedAt: '2024-09-12T10:15:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-112',
    employeeCode: 'EMP-112',
    firstName: 'Lucas',
    lastName: 'Silva',
    displayName: 'Lucas Silva',
    designation: 'Cashier',
    department: 'Cash & Billing',
    phone: '+1 (555) 234-9012',
    email: 'lucas.s@punarvafashion.com',
    outletAssignment: ['Dallas Uptown Apparel Hub'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Male',
    dateOfBirth: '1999-01-27',
    dateOfJoining: '2023-11-01',
    residentialAddress: '2800 Routh St',
    city: 'Dallas',
    state: 'Texas',
    postalCode: '75201',
    username: 'lucas.silva',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: true,
    lastActiveSession: 'Yesterday, 06:45 PM',
    createdAt: '2023-11-01T08:30:00Z',
    updatedAt: '2024-09-11T18:45:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-113',
    employeeCode: 'EMP-113',
    firstName: 'Mateo',
    lastName: 'Hernandez',
    displayName: 'Mateo Hernandez',
    designation: 'Assistant Manager',
    department: 'Store Management',
    phone: '+1 (555) 789-5432',
    email: 'mateo.h@punarvafashion.com',
    outletAssignment: ['Houston Galleria Outlet'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Male',
    dateOfBirth: '1991-09-08',
    dateOfJoining: '2022-08-20',
    residentialAddress: '5200 Sage Rd',
    city: 'Houston',
    state: 'Texas',
    postalCode: '77056',
    username: 'mateo.hernandez',
    permissionProfile: 'Assistant Store Manager',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 09:00 AM',
    createdAt: '2022-08-20T08:00:00Z',
    updatedAt: '2024-09-12T09:00:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-114',
    employeeCode: 'EMP-114',
    firstName: 'Zoe',
    lastName: 'Kaufman',
    displayName: 'Zoe Kaufman',
    designation: 'Visual Merchandiser',
    department: 'Visual Merchandising',
    phone: '+1 (555) 345-0987',
    email: 'zoe.k@punarvafashion.com',
    outletAssignment: ['Uptown Mall #12'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Female',
    dateOfBirth: '1995-11-30',
    dateOfJoining: '2023-05-10',
    residentialAddress: '7800 Shoal Creek Blvd',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78757',
    username: 'zoe.kaufman',
    permissionProfile: 'Store Associate',
    terminalPinConfigured: false,
    lastActiveSession: '2 days ago',
    createdAt: '2023-05-10T10:00:00Z',
    updatedAt: '2024-09-10T17:00:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-115',
    employeeCode: 'EMP-115',
    firstName: 'Tariq',
    lastName: 'Mansoor',
    displayName: 'Tariq Mansoor',
    designation: 'Inventory Specialist',
    department: 'Warehouse & Logistics',
    phone: '+1 (555) 901-7654',
    email: 'tariq.m@punarvafashion.com',
    outletAssignment: ['Houston Galleria Outlet'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Male',
    dateOfBirth: '1988-07-12',
    dateOfJoining: '2022-03-01',
    residentialAddress: '3100 Richmond Ave',
    city: 'Houston',
    state: 'Texas',
    postalCode: '77098',
    username: 'tariq.mansoor',
    permissionProfile: 'Inventory Auditor',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 08:30 AM',
    createdAt: '2022-03-01T08:00:00Z',
    updatedAt: '2024-09-12T08:30:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-116',
    employeeCode: 'EMP-116',
    firstName: 'Hannah',
    lastName: 'Abbott',
    displayName: 'Hannah Abbott',
    designation: 'Cashier',
    department: 'Cash & Billing',
    phone: '+1 (555) 123-9876',
    email: 'hannah.a@punarvafashion.com',
    outletAssignment: ['Downtown Flagship #04'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Disabled',
    gender: 'Female',
    dateOfBirth: '2001-04-18',
    dateOfJoining: '2024-01-15',
    residentialAddress: '1600 E 6th St',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78702',
    username: 'hannah.abbott',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: false,
    lastActiveSession: 'Never Logged In',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-09-01T10:00:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-117',
    employeeCode: 'EMP-117',
    firstName: 'Vikram',
    lastName: 'Singhania',
    displayName: 'Vikram Singhania',
    designation: 'Store Manager',
    department: 'Store Management',
    phone: '+1 (555) 567-2345',
    email: 'vikram.s@punarvafashion.com',
    outletAssignment: ['Dallas Uptown Apparel Hub'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Male',
    dateOfBirth: '1985-12-10',
    dateOfJoining: '2021-11-15',
    residentialAddress: '3200 Carlisle St',
    city: 'Dallas',
    state: 'Texas',
    postalCode: '75204',
    username: 'vikram.singhania',
    permissionProfile: 'Store Manager (Full Control)',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 08:45 AM',
    createdAt: '2021-11-15T08:00:00Z',
    updatedAt: '2024-09-12T08:45:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-118',
    employeeCode: 'EMP-118',
    firstName: 'Leila',
    lastName: 'Farah',
    displayName: 'Leila Farah',
    designation: 'Sales Associate',
    department: 'Retail Operations & Sales',
    phone: '+1 (555) 678-9012',
    email: 'leila.f@punarvafashion.com',
    outletAssignment: ['Metro North Hub #01'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Female',
    dateOfBirth: '1997-08-25',
    dateOfJoining: '2023-09-01',
    residentialAddress: '2100 Chisholm Trail Rd',
    city: 'Round Rock',
    state: 'Texas',
    postalCode: '78681',
    username: 'leila.farah',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: true,
    lastActiveSession: 'Yesterday, 05:30 PM',
    createdAt: '2023-09-01T09:00:00Z',
    updatedAt: '2024-09-11T17:30:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-119',
    employeeCode: 'EMP-119',
    firstName: 'Gabriel',
    lastName: 'Santos',
    displayName: 'Gabriel Santos',
    designation: 'Senior Cashier',
    department: 'Cash & Billing',
    phone: '+1 (555) 789-0199',
    email: 'gabriel.s@punarvafashion.com',
    outletAssignment: ['San Antonio Riverwalk Pop-up'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Male',
    dateOfBirth: '1993-02-14',
    dateOfJoining: '2023-06-01',
    residentialAddress: '515 S St Marys St',
    city: 'San Antonio',
    state: 'Texas',
    postalCode: '78205',
    username: 'gabriel.santos',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 09:10 AM',
    createdAt: '2023-06-01T09:00:00Z',
    updatedAt: '2024-09-12T09:10:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-120',
    employeeCode: 'EMP-120',
    firstName: 'Noah',
    lastName: 'Bennett',
    displayName: 'Noah Bennett',
    designation: 'Sales Associate',
    department: 'Retail Operations & Sales',
    phone: '+1 (555) 890-1234',
    email: 'noah.b@punarvafashion.com',
    outletAssignment: ['Northside Galleria Mall'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Male',
    dateOfBirth: '2000-05-19',
    dateOfJoining: '2024-02-01',
    residentialAddress: '2500 Esperanza Crossing',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78758',
    username: 'noah.bennett',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: false,
    lastActiveSession: 'Today, 10:45 AM',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-09-12T10:45:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-121',
    employeeCode: 'EMP-121',
    firstName: 'Grace',
    lastName: 'Kim',
    displayName: 'Grace Kim',
    designation: 'Assistant Manager',
    department: 'Store Management',
    phone: '+1 (555) 901-2399',
    email: 'grace.k@punarvafashion.com',
    outletAssignment: ['Downtown Flagship #04'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Female',
    dateOfBirth: '1992-04-03',
    dateOfJoining: '2022-05-15',
    residentialAddress: '300 Bowie St',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78703',
    username: 'grace.kim',
    permissionProfile: 'Assistant Store Manager',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 08:30 AM',
    createdAt: '2022-05-15T08:00:00Z',
    updatedAt: '2024-09-12T08:30:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-122',
    employeeCode: 'EMP-122',
    firstName: 'Liam',
    lastName: 'O’Connor',
    displayName: 'Liam O’Connor',
    designation: 'Inventory Specialist',
    department: 'Warehouse & Logistics',
    phone: '+1 (555) 234-5611',
    email: 'liam.o@punarvafashion.com',
    outletAssignment: ['Organization-wide (All Outlets)'],
    assignmentScope: 'Entire Organization',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Male',
    dateOfBirth: '1989-10-22',
    dateOfJoining: '2022-09-15',
    residentialAddress: '1400 S Congress Ave',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78704',
    username: 'liam.oconnor',
    permissionProfile: 'Inventory Auditor',
    terminalPinConfigured: true,
    lastActiveSession: 'Yesterday, 03:15 PM',
    createdAt: '2022-09-15T08:00:00Z',
    updatedAt: '2024-09-11T15:15:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-123',
    employeeCode: 'EMP-123',
    firstName: 'Maya',
    lastName: 'Lin',
    displayName: 'Maya Lin',
    designation: 'Cashier',
    department: 'Cash & Billing',
    phone: '+1 (555) 345-6711',
    email: 'maya.l@punarvafashion.com',
    outletAssignment: ['Uptown Mall #12'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Female',
    dateOfBirth: '2001-08-11',
    dateOfJoining: '2024-03-01',
    residentialAddress: '11500 Jollyville Rd',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78759',
    username: 'maya.lin',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 09:30 AM',
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-09-12T09:30:00Z',
    recentActivity: [],
  },
  {
    id: 'emp-124',
    employeeCode: 'EMP-124',
    firstName: 'Sam',
    lastName: 'Holloway',
    displayName: 'Sam Holloway',
    designation: 'Sales Associate',
    department: 'Retail Operations & Sales',
    phone: '+1 (555) 456-7811',
    email: 'sam.h@punarvafashion.com',
    outletAssignment: ['Westside Express #08'],
    assignmentScope: 'Specific Outlets',
    employmentStatus: 'Active',
    loginAccess: 'Enabled',
    gender: 'Male',
    dateOfBirth: '1998-03-09',
    dateOfJoining: '2023-12-01',
    residentialAddress: '3800 Westlake Dr',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78746',
    username: 'sam.holloway',
    permissionProfile: 'Cashier / Standard POS',
    terminalPinConfigured: true,
    lastActiveSession: 'Today, 10:00 AM',
    createdAt: '2023-12-01T09:00:00Z',
    updatedAt: '2024-09-12T10:00:00Z',
    recentActivity: [],
  },
];

class MockEmployeeService implements IEmployeeService {
  private employees: Employee[] = [...INITIAL_EMPLOYEES];

  private delay(ms = 150): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async getEmployees(query: EmployeeQuery): Promise<EmployeeQueryResult> {
    await this.delay(140);

    const {
      search = '',
      status = 'All',
      scope = 'All',
      loginAccess = 'All',
      outlet = '',
      department = '',
      page = 1,
      pageSize = 6,
    } = query;

    const searchNormalized = search.trim().toLowerCase();

    let filtered = this.employees.filter((emp) => {
      // 1. Search text across name, employeeCode, phone, email, designation
      if (searchNormalized) {
        const matchesName = emp.displayName.toLowerCase().includes(searchNormalized);
        const matchesCode = emp.employeeCode.toLowerCase().includes(searchNormalized);
        const matchesPhone = emp.phone.toLowerCase().includes(searchNormalized);
        const matchesEmail = emp.email.toLowerCase().includes(searchNormalized);
        const matchesDesignation = emp.designation.toLowerCase().includes(searchNormalized);
        if (
          !matchesName &&
          !matchesCode &&
          !matchesPhone &&
          !matchesEmail &&
          !matchesDesignation
        ) {
          return false;
        }
      }

      // 2. Status filter
      if (status !== 'All' && emp.employmentStatus !== status) {
        return false;
      }

      // 3. Scope filter
      if (scope !== 'All' && emp.assignmentScope !== scope) {
        return false;
      }

      // 4. Login access filter
      if (loginAccess !== 'All' && emp.loginAccess !== loginAccess) {
        return false;
      }

      // 5. Outlet filter
      if (outlet && outlet !== 'All' && outlet !== 'All Stores') {
        const hasOutlet =
          emp.outletAssignment.includes(outlet) ||
          emp.outletAssignment.some((o) => o.toLowerCase().includes(outlet.toLowerCase()));
        const isOrgWide = emp.assignmentScope === 'Entire Organization';
        if (!hasOutlet && !isOrgWide) {
          return false;
        }
      }

      // 6. Department filter
      if (department && department !== 'All' && emp.department !== department) {
        return false;
      }

      return true;
    });

    const total = filtered.length;
    const activeCount = this.employees.filter((e) => e.employmentStatus === 'Active').length;
    const inactiveCount = this.employees.filter((e) => e.employmentStatus === 'Inactive').length;
    const loginEnabledCount = this.employees.filter((e) => e.loginAccess === 'Enabled').length;

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const validPage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (validPage - 1) * pageSize;
    const paginatedEmployees = filtered.slice(startIndex, startIndex + pageSize);

    return {
      employees: paginatedEmployees,
      total,
      activeCount,
      inactiveCount,
      loginEnabledCount,
      page: validPage,
      pageSize,
      totalPages,
    };
  }

  public async getEmployee(id: string): Promise<Employee | null> {
    await this.delay(60);
    const emp = this.employees.find((e) => e.id === id || e.employeeCode === id);
    return emp ? { ...emp } : null;
  }

  public async createEmployee(input: CreateEmployeeInput): Promise<Employee> {
    await this.delay(180);

    const nextCode = this.getNextEmployeeCode();
    const id = `emp-${Date.now()}`;
    const displayName = `${input.firstName.trim()} ${input.lastName.trim()}`;
    const now = new Date().toISOString();

    const newEmployee: Employee = {
      id,
      employeeCode: nextCode,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      displayName,
      designation: input.designation,
      department: input.department || 'Retail Operations & Sales',
      phone: input.phone.trim(),
      email: input.email.trim(),
      gender: input.gender || 'Prefer not to say',
      dateOfBirth: input.dateOfBirth || '',
      dateOfJoining: input.dateOfJoining || now.split('T')[0],
      residentialAddress: input.residentialAddress || '',
      city: input.city || 'Austin',
      state: input.state || 'Texas',
      postalCode: input.postalCode || '',
      assignmentScope: input.assignmentScope,
      outletAssignment:
        input.assignmentScope === 'Entire Organization'
          ? ['Organization-wide (All Outlets)']
          : input.outletAssignment.length > 0
          ? input.outletAssignment
          : ['Downtown Flagship #04'],
      employmentStatus: 'Active',
      loginAccess: input.allowLogin ? 'Enabled' : 'Disabled',
      username: input.username || `${input.firstName.toLowerCase()}.${input.lastName.toLowerCase()}`,
      permissionProfile: input.permissionProfile || 'Cashier / Standard POS',
      terminalPinConfigured: input.allowLogin,
      lastActiveSession: input.allowLogin ? 'Pending first login' : 'Access Disabled',
      createdAt: now,
      updatedAt: now,
      recentActivity: [
        {
          id: `act-${Date.now()}`,
          title: 'Employee Record Created',
          timestamp: 'Just now',
          description: `Onboarded as ${input.designation}.`,
          icon: 'person_add',
          iconColor: 'text-primary',
        },
      ],
    };

    // Prepend to employee directory
    this.employees.unshift(newEmployee);
    return { ...newEmployee };
  }

  public async updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    await this.delay(180);

    const index = this.employees.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Employee with ID "${id}" was not found.`);
    }

    const current = this.employees[index];
    const updatedFirstName = input.firstName !== undefined ? input.firstName.trim() : current.firstName;
    const updatedLastName = input.lastName !== undefined ? input.lastName.trim() : current.lastName;
    const updatedDisplayName = `${updatedFirstName} ${updatedLastName}`;
    const now = new Date().toISOString();

    const activity: EmployeeActivity = {
      id: `act-${Date.now()}`,
      title: 'Profile Updated',
      timestamp: 'Just now',
      description: 'Employee details updated by store administrator.',
      icon: 'edit',
      iconColor: 'text-primary',
    };

    const updated: Employee = {
      ...current,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      displayName: updatedDisplayName,
      designation: input.designation !== undefined ? input.designation : current.designation,
      department: input.department !== undefined ? input.department : current.department,
      phone: input.phone !== undefined ? input.phone.trim() : current.phone,
      email: input.email !== undefined ? input.email.trim() : current.email,
      gender: input.gender !== undefined ? input.gender : current.gender,
      dateOfBirth: input.dateOfBirth !== undefined ? input.dateOfBirth : current.dateOfBirth,
      dateOfJoining: input.dateOfJoining !== undefined ? input.dateOfJoining : current.dateOfJoining,
      residentialAddress:
        input.residentialAddress !== undefined ? input.residentialAddress : current.residentialAddress,
      city: input.city !== undefined ? input.city : current.city,
      state: input.state !== undefined ? input.state : current.state,
      postalCode: input.postalCode !== undefined ? input.postalCode : current.postalCode,
      assignmentScope:
        input.assignmentScope !== undefined ? input.assignmentScope : current.assignmentScope,
      outletAssignment:
        input.assignmentScope === 'Entire Organization'
          ? ['Organization-wide (All Outlets)']
          : input.outletAssignment !== undefined
          ? input.outletAssignment
          : current.outletAssignment,
      username: input.username !== undefined ? input.username : current.username,
      permissionProfile:
        input.permissionProfile !== undefined ? input.permissionProfile : current.permissionProfile,
      updatedAt: now,
      recentActivity: [activity, ...(current.recentActivity || [])],
    };

    this.employees[index] = updated;
    return { ...updated };
  }

  public async changeEmployeeStatus(id: string, status: EmployeeStatus): Promise<Employee> {
    await this.delay(150);

    const index = this.employees.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Employee with ID "${id}" was not found.`);
    }

    const current = this.employees[index];
    const now = new Date().toISOString();

    const activity: EmployeeActivity = {
      id: `act-${Date.now()}`,
      title: status === 'Active' ? 'Employee Reactivated' : 'Employee Marked Inactive',
      timestamp: 'Just now',
      description:
        status === 'Active'
          ? 'Employment status restored to Active.'
          : 'Employment marked Inactive. Personnel shifted to archived directory.',
      icon: status === 'Active' ? 'check_circle' : 'person_off',
      iconColor: status === 'Active' ? 'text-emerald-600' : 'text-error',
    };

    const updated: Employee = {
      ...current,
      employmentStatus: status,
      updatedAt: now,
      recentActivity: [activity, ...(current.recentActivity || [])],
    };

    this.employees[index] = updated;
    return { ...updated };
  }

  public async changeLoginAccess(id: string, access: LoginAccessStatus): Promise<Employee> {
    await this.delay(150);

    const index = this.employees.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Employee with ID "${id}" was not found.`);
    }

    const current = this.employees[index];
    const now = new Date().toISOString();

    const activity: EmployeeActivity = {
      id: `act-${Date.now()}`,
      title: access === 'Enabled' ? 'Login Access Enabled' : 'Login Access Disabled',
      timestamp: 'Just now',
      description:
        access === 'Enabled'
          ? 'Application and POS terminal access credentials enabled.'
          : 'Application login access suspended.',
      icon: access === 'Enabled' ? 'lock_open' : 'lock',
      iconColor: access === 'Enabled' ? 'text-emerald-600' : 'text-slate-600',
    };

    const updated: Employee = {
      ...current,
      loginAccess: access,
      updatedAt: now,
      recentActivity: [activity, ...(current.recentActivity || [])],
    };

    this.employees[index] = updated;
    return { ...updated };
  }

  public getNextEmployeeCode(): string {
    let maxNum = 100;
    this.employees.forEach((e) => {
      const match = e.employeeCode.match(/EMP-(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    });
    return `EMP-${maxNum + 1}`;
  }

  public async getDepartments(): Promise<string[]> {
    await this.delay(50);
    return [
      'Retail Operations & Sales',
      'Cash & Billing',
      'Warehouse & Logistics',
      'Visual Merchandising',
      'Store Management',
      'Inventory & Audit',
    ];
  }

  public async getDesignations(): Promise<string[]> {
    await this.delay(50);
    return [
      'Store Manager',
      'Assistant Manager',
      'Senior Cashier',
      'Cashier',
      'Sales Associate',
      'Inventory Specialist',
      'Visual Merchandiser',
      'Inventory Auditor',
    ];
  }
}

class ProductionEmployeeService extends MockEmployeeService {
  private async organizationId(): Promise<string> { const result = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = result.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); return membership.organization.id; }
  private map(row: Awaited<ReturnType<typeof listTenantEmployees>>['data']['employees'][number]): Employee { const names = row.fullName.trim().split(/\s+/); return { id: row.id, employeeCode: row.employeeCode, firstName: names[0] ?? row.fullName, lastName: names.slice(1).join(' '), displayName: row.fullName, designation: row.designation, department: row.department ?? undefined, phone: row.phone, email: row.email ?? row.user?.email ?? '', outletAssignment: row.employeeOutlets_on_employee.map((item) => item.outlet.name), assignmentScope: row.assignmentScope === 'ORGANIZATION' ? 'Entire Organization' : 'Specific Outlets', employmentStatus: row.employmentStatus === 'ACTIVE' ? 'Active' : 'Inactive', loginAccess: row.loginAccess === 'ENABLED' ? 'Enabled' : 'Disabled', username: row.user?.username, dateOfJoining: row.dateOfJoining, createdAt: row.createdAt, updatedAt: row.updatedAt, recentActivity: [] }; }
  private async allProduction(): Promise<Employee[]> { const organizationId = await this.organizationId(); const result = await listTenantEmployees(getFirebaseClientServices().dataConnect, { organizationId }); return result.data.employees.map((row) => this.map(row)); }
  public override async getEmployees(query: EmployeeQuery): Promise<EmployeeQueryResult> { let rows = await this.allProduction(); const search = query.search?.trim().toLowerCase() ?? ''; if (search) rows = rows.filter((row) => `${row.employeeCode} ${row.displayName} ${row.email} ${row.phone} ${row.designation}`.toLowerCase().includes(search)); if (query.status && query.status !== 'All') rows = rows.filter((row) => row.employmentStatus === query.status); if (query.scope && query.scope !== 'All') rows = rows.filter((row) => row.assignmentScope === query.scope); if (query.loginAccess && query.loginAccess !== 'All') rows = rows.filter((row) => row.loginAccess === query.loginAccess); if (query.outlet) rows = rows.filter((row) => row.outletAssignment.includes(query.outlet!)); if (query.department) rows = rows.filter((row) => row.department === query.department); const page = Math.max(1, query.page ?? 1); const pageSize = Math.max(1, query.pageSize ?? 10); const total = rows.length; return { employees: rows.slice((page - 1) * pageSize, page * pageSize), total, activeCount: rows.filter((row) => row.employmentStatus === 'Active').length, inactiveCount: rows.filter((row) => row.employmentStatus === 'Inactive').length, loginEnabledCount: rows.filter((row) => row.loginAccess === 'Enabled').length, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) }; }
  public override async getEmployee(id: string): Promise<Employee | null> { const result = await this.getEmployees({ page: 1, pageSize: 1000 }); return result.employees.find((row) => row.id === id || row.employeeCode === id) ?? null; }
  public override async getDepartments(): Promise<string[]> { return Array.from(new Set((await this.allProduction()).map((employee) => employee.department).filter(Boolean))).sort(); }
  public override async getDesignations(): Promise<string[]> { return Array.from(new Set((await this.allProduction()).map((employee) => employee.designation).filter(Boolean))).sort(); }
  public override async createEmployee(input: CreateEmployeeInput): Promise<Employee> { const organizationId = await this.organizationId(); const fullName = `${input.firstName.trim()} ${input.lastName.trim()}`.trim(); const employeeCode = this.getNextEmployeeCode(); const payload = { organizationId, employeeCode, fullName, email: input.email.trim().toLowerCase(), phone: input.phone.trim(), designation: input.designation.trim(), department: input.department?.trim(), dateOfJoining: input.dateOfJoining || new Date().toISOString().slice(0, 10), assignmentScope: input.assignmentScope === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET', requestId: globalThis.crypto.randomUUID() }; if (input.allowLogin) await httpsCallable(getFirebaseClientServices().functions, 'provisionTenantEmployee')( { ...payload, username: input.username?.trim().toLowerCase() ?? '' }); else await httpsCallable(getFirebaseClientServices().functions, 'createTenantEmployeeProfile')(payload); const result = await this.getEmployees({ page: 1, pageSize: 1000 }); const created = result.employees.find((row) => row.employeeCode === employeeCode || row.displayName === fullName); if (!created) throw new Error('Employee was created but could not be loaded.'); return created; }
  public override async updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee> { const organizationId = await this.organizationId(); const current = await this.getEmployee(id); if (!current) throw new Error('Employee not found.'); await httpsCallable(getFirebaseClientServices().functions, 'updateTenantEmployee')({ organizationId, id, fullName: `${input.firstName ?? current.firstName} ${input.lastName ?? current.lastName}`.trim(), email: input.email ?? current.email, phone: input.phone ?? current.phone, designation: input.designation ?? current.designation, department: input.department ?? current.department, dateOfJoining: input.dateOfJoining ?? current.dateOfJoining, assignmentScope: (input.assignmentScope ?? current.assignmentScope) === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET', requestId: globalThis.crypto.randomUUID() }); const updated = await this.getEmployee(id); if (!updated) throw new Error('Employee was updated but could not be loaded.'); return updated; }
  public override async changeEmployeeStatus(id: string, status: EmployeeStatus): Promise<Employee> { const organizationId = await this.organizationId(); await httpsCallable(getFirebaseClientServices().functions, 'changeTenantEmployeeStatus')({ organizationId, id, status: status === 'Active' ? 'ACTIVE' : 'INACTIVE', requestId: globalThis.crypto.randomUUID() }); const updated = await this.getEmployee(id); if (!updated) throw new Error('Employee status was changed but could not be loaded.'); return updated; }
  public override async changeLoginAccess(id: string, access: LoginAccessStatus): Promise<Employee> { const organizationId = await this.organizationId(); const raw = await listTenantEmployees(getFirebaseClientServices().dataConnect, { organizationId }); const row = raw.data.employees.find((candidate) => candidate.id === id); if (!row?.user) throw new Error('Employee has no application identity.'); await httpsCallable(getFirebaseClientServices().functions, 'changeTenantEmployeeLoginAccess')({ organizationId, id, userId: row.user.id, firebaseUid: row.user.firebaseUid, loginAccess: access === 'Enabled' ? 'ENABLED' : 'DISABLED', requestId: globalThis.crypto.randomUUID() }); const updated = await this.getEmployee(id); if (!updated) throw new Error('Employee login access was changed but could not be loaded.'); return updated; }
}

export const employeeService: IEmployeeService = new ProductionEmployeeService();
