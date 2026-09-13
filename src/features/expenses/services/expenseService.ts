import {
  Expense,
  ExpenseQuery,
  ExpenseQueryResult,
  CreateExpenseInput,
  UpdateExpenseInput,
} from '../types';
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

// 48 initial realistic mock expenses matching the Stitch design
const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-091',
    expenseNumber: 'EX-2024-091',
    date: 'Oct 24, 2024',
    timestamp: new Date('2024-10-24T10:30:00').getTime(),
    category: 'Utilities',
    description: 'Monthly Commercial Power & AC Grid Billing',
    reference: 'GRID-TEX-8820 · Due EOM',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    outletAddress: '410 Congress Ave',
    scope: 'Outlet',
    baseAmount: 1688.07,
    taxAmount: 151.93,
    amount: 1840.0,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    settlementDate: 'Oct 24, 2024 · 09:15 CST',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    notes: 'Standard recurring utility schedule for commercial building power supply.',
    auditTrail: [
      {
        id: 'aud-91-1',
        title: 'Submitted for Review',
        timestamp: 'Oct 24, 2024 · 09:15',
        actor: 'Marcus Vance',
        actorRole: 'Asst. Mgr',
        note: 'October power utility grid invoice processed.',
        status: 'Pending Approval',
      },
      {
        id: 'aud-91-2',
        title: 'Approved & Settled',
        timestamp: 'Oct 24, 2024 · 10:30',
        actor: 'Sarah Jenkins',
        actorRole: 'Store Mgr',
        note: 'Approved under regular facility overhead.',
        status: 'Approved',
      },
    ],
    createdAt: '2024-10-24T09:15:00Z',
    updatedAt: '2024-10-24T10:30:00Z',
  },
  {
    id: 'exp-090',
    expenseNumber: 'EX-2024-090',
    date: 'Oct 23, 2024',
    timestamp: new Date('2024-10-23T14:15:00').getTime(),
    category: 'Store Supplies',
    description: 'Premium Kraft POS Carry Bags & Ribbon Stock',
    reference: 'EcoKraft Packaging Ltd. · INV-EKP-9921',
    vendorName: 'EcoKraft Packaging Supplies Ltd.',
    outletName: 'Downtown Flagship #04',
    outletAddress: '410 Congress Ave',
    scope: 'Outlet',
    baseAmount: 385.32,
    taxAmount: 34.68,
    amount: 420.0,
    paymentMethod: 'Card',
    paidByEmployee: 'Elena Rostova (EMP-103)',
    settlementDate: 'Oct 23, 2024 · 14:15 CST',
    status: 'Active',
    approvalStatus: 'Pending Approval',
    submittedBy: 'Elena Rostova',
    submittedByRole: 'Sr. Cashier',
    notes: 'Urgent replenishment of custom packaging for the weekend sale.',
    attachments: [
      {
        id: 'att-90-1',
        name: 'Invoice_EKP_9921.pdf',
        size: '1.2 MB',
        type: 'application/pdf',
        uploadDate: 'Oct 23, 2024',
      },
    ],
    auditTrail: [
      {
        id: 'aud-90-1',
        title: 'Submitted for Review',
        timestamp: 'Oct 23, 2024 · 14:20',
        actor: 'Elena Rostova',
        actorRole: 'Sr. Cashier',
        note: 'Urgent replenishment of custom packaging for the weekend sale.',
        status: 'Pending Approval',
      },
    ],
    createdAt: '2024-10-23T14:15:00Z',
    updatedAt: '2024-10-23T14:20:00Z',
  },
  {
    id: 'exp-089',
    expenseNumber: 'EX-2024-089',
    date: 'Oct 22, 2024',
    timestamp: new Date('2024-10-22T11:45:00').getTime(),
    category: 'Equipment Maintenance',
    description: 'Chiller Compressor Coil Repair & Filter Swap',
    reference: 'Apex HVAC Systems · WO-7731',
    vendorName: 'Apex HVAC Systems & Facilities',
    outletName: 'Westside Mall #02',
    outletAddress: '782 Westheimer Rd, Ste 14',
    scope: 'Outlet',
    baseAmount: 596.33,
    taxAmount: 53.67,
    amount: 650.0,
    paymentMethod: 'Card',
    paidByEmployee: 'David Chen (EMP-105)',
    settlementDate: 'Oct 22, 2024 · 11:45 CST',
    status: 'Active',
    approvalStatus: 'Pending Approval',
    submittedBy: 'David Chen',
    submittedByRole: 'Inventory Spec.',
    notes: 'Walk-in chiller unit servicing and air intake filtration renewal.',
    attachments: [
      {
        id: 'att-89-1',
        name: 'HVAC_WorkOrder_7731.pdf',
        size: '840 KB',
        type: 'application/pdf',
        uploadDate: 'Oct 22, 2024',
      },
    ],
    auditTrail: [
      {
        id: 'aud-89-1',
        title: 'Submitted for Review',
        timestamp: 'Oct 22, 2024 · 11:50',
        actor: 'David Chen',
        actorRole: 'Inventory Spec.',
        note: 'Dispatched for manager review and audit clearance.',
        status: 'Pending Approval',
      },
    ],
    createdAt: '2024-10-22T11:45:00Z',
    updatedAt: '2024-10-22T11:50:00Z',
  },
  {
    id: 'exp-088',
    expenseNumber: 'EX-2024-088',
    date: 'Oct 21, 2024',
    timestamp: new Date('2024-10-21T16:20:00').getTime(),
    category: 'Marketing',
    description: 'Local Mall Billboard & Fall Promo Flyers',
    reference: 'OmniMedia Printworks · PO-4091',
    vendorName: 'OmniMedia Printworks Ltd.',
    outletName: 'Uptown Mall #12',
    outletAddress: '1200 Post Oak Blvd',
    scope: 'Outlet',
    baseAmount: 1146.79,
    taxAmount: 103.21,
    amount: 1250.0,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Amina Patel (EMP-108)',
    settlementDate: 'Oct 21, 2024 · 16:20 CST',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Amina Patel',
    submittedByRole: 'Visual Merch',
    notes: 'Floor stand displays and atrium flyer distribution.',
    auditTrail: [
      {
        id: 'aud-88-1',
        title: 'Submitted for Review',
        timestamp: 'Oct 21, 2024 · 16:25',
        actor: 'Amina Patel',
        actorRole: 'Visual Merch',
        status: 'Pending Approval',
      },
      {
        id: 'aud-88-2',
        title: 'Approved by Store Manager',
        timestamp: 'Oct 21, 2024 · 17:00',
        actor: 'Sarah Jenkins',
        actorRole: 'Store Mgr',
        status: 'Approved',
      },
    ],
    createdAt: '2024-10-21T16:20:00Z',
    updatedAt: '2024-10-21T17:00:00Z',
  },
  {
    id: 'exp-087',
    expenseNumber: 'EX-2024-087',
    date: 'Oct 20, 2024',
    timestamp: new Date('2024-10-20T08:50:00').getTime(),
    category: 'Logistics',
    description: 'Emergency Stock Transfer Courier Express',
    reference: 'Metro Rapid Dispatch · Slip #490',
    vendorName: 'Metro Rapid Dispatch Inc.',
    outletName: 'Organization-wide',
    scope: 'Organization-wide',
    baseAmount: 169.72,
    taxAmount: 15.28,
    amount: 185.0,
    paymentMethod: 'Cash',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    settlementDate: 'Oct 20, 2024 · 08:50 CST',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    notes: 'Transferred 40 garment units between Flagship and Westside branch.',
    auditTrail: [
      {
        id: 'aud-87-1',
        title: 'Auto-Approved (Manager Petty Cash)',
        timestamp: 'Oct 20, 2024 · 08:55',
        actor: 'Sarah Jenkins',
        actorRole: 'Store Mgr',
        status: 'Approved',
      },
    ],
    createdAt: '2024-10-20T08:50:00Z',
    updatedAt: '2024-10-20T08:55:00Z',
  },
  {
    id: 'exp-086',
    expenseNumber: 'EX-2024-086',
    date: 'Oct 19, 2024',
    timestamp: new Date('2024-10-19T13:10:00').getTime(),
    category: 'Professional Services',
    description: 'Annual Fire Extinguisher & Safety Recertification',
    reference: 'Certified Fire Safety Systems · REF-FS-22',
    vendorName: 'Certified Fire Safety Systems',
    outletName: 'Northside Mall #08',
    outletAddress: '550 Northpark Dr',
    scope: 'Outlet',
    baseAmount: 816.51,
    taxAmount: 73.49,
    amount: 890.0,
    paymentMethod: 'Card',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    settlementDate: 'Oct 19, 2024 · 13:10 CST',
    status: 'Active',
    approvalStatus: 'Rejected',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    rejectionReason: 'Missing vendor tax invoice',
    notes: 'Annual audit inspection certificate pending attachment.',
    auditTrail: [
      {
        id: 'aud-86-1',
        title: 'Submitted for Review',
        timestamp: 'Oct 19, 2024 · 13:15',
        actor: 'Marcus Vance',
        actorRole: 'Asst. Mgr',
        status: 'Pending Approval',
      },
      {
        id: 'aud-86-2',
        title: 'Rejected by Store Manager',
        timestamp: 'Oct 19, 2024 · 15:40',
        actor: 'Sarah Jenkins',
        actorRole: 'Store Mgr',
        note: 'Rejection: Missing vendor tax invoice. Please upload original VAT voucher.',
        status: 'Rejected',
      },
    ],
    createdAt: '2024-10-19T13:10:00Z',
    updatedAt: '2024-10-19T15:40:00Z',
  },
  {
    id: 'exp-085',
    expenseNumber: 'EX-2024-085',
    date: 'Oct 18, 2024',
    timestamp: new Date('2024-10-18T15:00:00').getTime(),
    category: 'Store Supplies',
    description: 'Thermal Receipt Rolls & Barcode Ribbon Cartridges',
    reference: 'PaperCraft Direct · INV-PC-8819',
    vendorName: 'PaperCraft Direct Suppliers',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 320.0,
    taxAmount: 28.8,
    amount: 348.8,
    paymentMethod: 'Card',
    paidByEmployee: 'Elena Rostova (EMP-103)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Elena Rostova',
    submittedByRole: 'Sr. Cashier',
    auditTrail: [],
    createdAt: '2024-10-18T15:00:00Z',
    updatedAt: '2024-10-18T15:00:00Z',
  },
  {
    id: 'exp-084',
    expenseNumber: 'EX-2024-084',
    date: 'Oct 17, 2024',
    timestamp: new Date('2024-10-17T09:30:00').getTime(),
    category: 'Utilities',
    description: 'High-Speed Fiber Business Internet & SD-WAN Line',
    reference: 'Comcast Business · ACC-9941-8',
    vendorName: 'Comcast Business Solutions',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 450.0,
    taxAmount: 40.5,
    amount: 490.5,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-10-17T09:30:00Z',
    updatedAt: '2024-10-17T09:30:00Z',
  },
  {
    id: 'exp-083',
    expenseNumber: 'EX-2024-083',
    date: 'Oct 16, 2024',
    timestamp: new Date('2024-10-16T11:20:00').getTime(),
    category: 'Equipment Maintenance',
    description: 'Barcode Scanner Optical Calibration & Cradle Replacement',
    reference: 'Zebra Tech Care · SR-1029',
    vendorName: 'Zebra Tech Care Partner',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 230.0,
    taxAmount: 20.7,
    amount: 250.7,
    paymentMethod: 'Card',
    paidByEmployee: 'David Chen (EMP-105)',
    status: 'Active',
    approvalStatus: 'Pending Approval',
    submittedBy: 'David Chen',
    submittedByRole: 'Inventory Spec.',
    auditTrail: [],
    createdAt: '2024-10-16T11:20:00Z',
    updatedAt: '2024-10-16T11:20:00Z',
  },
  {
    id: 'exp-082',
    expenseNumber: 'EX-2024-082',
    date: 'Oct 15, 2024',
    timestamp: new Date('2024-10-15T14:00:00').getTime(),
    category: 'Marketing',
    description: 'Store Front Window Vinyl Decal Graphics (Autumn Collection)',
    reference: 'Precision Signs Inc. · INV-9938',
    vendorName: 'Precision Signs Inc.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 680.0,
    taxAmount: 61.2,
    amount: 741.2,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Amina Patel (EMP-108)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Amina Patel',
    submittedByRole: 'Visual Merch',
    auditTrail: [],
    createdAt: '2024-10-15T14:00:00Z',
    updatedAt: '2024-10-15T14:00:00Z',
  },
  {
    id: 'exp-081',
    expenseNumber: 'EX-2024-081',
    date: 'Oct 14, 2024',
    timestamp: new Date('2024-10-14T16:40:00').getTime(),
    category: 'Logistics',
    description: 'Pallet Delivery Surcharge - Inter-warehouse Transit',
    reference: 'Apex Haulage Logistics · SLIP-773',
    vendorName: 'Apex Haulage Logistics',
    outletName: 'Organization-wide',
    scope: 'Organization-wide',
    baseAmount: 410.0,
    taxAmount: 36.9,
    amount: 446.9,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    auditTrail: [],
    createdAt: '2024-10-14T16:40:00Z',
    updatedAt: '2024-10-14T16:40:00Z',
  },
  {
    id: 'exp-080',
    expenseNumber: 'EX-2024-080',
    date: 'Oct 13, 2024',
    timestamp: new Date('2024-10-13T10:15:00').getTime(),
    category: 'Professional Services',
    description: 'Quarterly Tax Consultation & Compliance Advisory',
    reference: 'Deloitte Retail Advisory · INV-44910',
    vendorName: 'Deloitte Retail Advisory LLC',
    outletName: 'Organization-wide',
    scope: 'Organization-wide',
    baseAmount: 1500.0,
    taxAmount: 135.0,
    amount: 1635.0,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-10-13T10:15:00Z',
    updatedAt: '2024-10-13T10:15:00Z',
  },
  {
    id: 'exp-079',
    expenseNumber: 'EX-2024-079',
    date: 'Oct 12, 2024',
    timestamp: new Date('2024-10-12T12:00:00').getTime(),
    category: 'Utilities',
    description: 'Municipal Water & Waste Water Service Q3 Reconcile',
    reference: 'City Utilities Dept. · ACC-0938',
    vendorName: 'City Water Works Board',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 310.0,
    taxAmount: 27.9,
    amount: 337.9,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    auditTrail: [],
    createdAt: '2024-10-12T12:00:00Z',
    updatedAt: '2024-10-12T12:00:00Z',
  },
  {
    id: 'exp-078',
    expenseNumber: 'EX-2024-078',
    date: 'Oct 11, 2024',
    timestamp: new Date('2024-10-11T14:30:00').getTime(),
    category: 'Store Supplies',
    description: 'Biodegradable Garment Hangers & Dust Garment Bags',
    reference: 'GreenStore Supply Co. · GS-4491',
    vendorName: 'GreenStore Supply Co.',
    outletName: 'Westside Mall #02',
    scope: 'Outlet',
    baseAmount: 280.0,
    taxAmount: 25.2,
    amount: 305.2,
    paymentMethod: 'Card',
    paidByEmployee: 'David Chen (EMP-105)',
    status: 'Active',
    approvalStatus: 'Pending Approval',
    submittedBy: 'David Chen',
    submittedByRole: 'Inventory Spec.',
    auditTrail: [],
    createdAt: '2024-10-11T14:30:00Z',
    updatedAt: '2024-10-11T14:30:00Z',
  },
  {
    id: 'exp-077',
    expenseNumber: 'EX-2024-077',
    date: 'Oct 10, 2024',
    timestamp: new Date('2024-10-10T09:00:00').getTime(),
    category: 'Equipment Maintenance',
    description: 'POS Cash Drawer Solenoid & Spring Mechanism Repair',
    reference: 'RetailTech Hardware · WO-199',
    vendorName: 'RetailTech Hardware Services',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 180.0,
    taxAmount: 16.2,
    amount: 196.2,
    paymentMethod: 'Card',
    paidByEmployee: 'Elena Rostova (EMP-103)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Elena Rostova',
    submittedByRole: 'Sr. Cashier',
    auditTrail: [],
    createdAt: '2024-10-10T09:00:00Z',
    updatedAt: '2024-10-10T09:00:00Z',
  },
  {
    id: 'exp-076',
    expenseNumber: 'EX-2024-076',
    date: 'Oct 09, 2024',
    timestamp: new Date('2024-10-09T17:15:00').getTime(),
    category: 'Marketing',
    description: 'Instagram & Facebook Ads Local Geofencing Campaign',
    reference: 'Meta Platforms Ireland · TX-4091',
    vendorName: 'Meta Platforms Inc.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 500.0,
    taxAmount: 45.0,
    amount: 545.0,
    paymentMethod: 'Card',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-10-09T17:15:00Z',
    updatedAt: '2024-10-09T17:15:00Z',
  },
  {
    id: 'exp-075',
    expenseNumber: 'EX-2024-075',
    date: 'Oct 08, 2024',
    timestamp: new Date('2024-10-08T11:00:00').getTime(),
    category: 'Logistics',
    description: 'Courier Express Dispatch for Special Tailoring Alterations',
    reference: 'SwiftPoint Delivery · #882',
    vendorName: 'SwiftPoint Express Delivery',
    outletName: 'Uptown Mall #12',
    scope: 'Outlet',
    baseAmount: 95.0,
    taxAmount: 8.55,
    amount: 103.55,
    paymentMethod: 'Cash',
    paidByEmployee: 'Amina Patel (EMP-108)',
    status: 'Active',
    approvalStatus: 'Draft',
    submittedBy: 'Amina Patel',
    submittedByRole: 'Visual Merch',
    auditTrail: [],
    createdAt: '2024-10-08T11:00:00Z',
    updatedAt: '2024-10-08T11:00:00Z',
  },
  {
    id: 'exp-074',
    expenseNumber: 'EX-2024-074',
    date: 'Oct 07, 2024',
    timestamp: new Date('2024-10-07T14:20:00').getTime(),
    category: 'Utilities',
    description: 'Trash Compactor Rental & Commercial Waste Recycling',
    reference: 'Waste Management Direct · INV-7718',
    vendorName: 'Waste Management Direct Co.',
    outletName: 'Westside Mall #02',
    scope: 'Outlet',
    baseAmount: 260.0,
    taxAmount: 23.4,
    amount: 283.4,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'David Chen (EMP-105)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'David Chen',
    submittedByRole: 'Inventory Spec.',
    auditTrail: [],
    createdAt: '2024-10-07T14:20:00Z',
    updatedAt: '2024-10-07T14:20:00Z',
  },
  {
    id: 'exp-073',
    expenseNumber: 'EX-2024-073',
    date: 'Oct 06, 2024',
    timestamp: new Date('2024-10-06T15:45:00').getTime(),
    category: 'Store Supplies',
    description: 'Sanitizing Disinfectant & Floor Cleaning Detergents',
    reference: 'EcoClean Systems · INV-3391',
    vendorName: 'EcoClean Janitorial Supplies',
    outletName: 'Northside Mall #08',
    scope: 'Outlet',
    baseAmount: 140.0,
    taxAmount: 12.6,
    amount: 152.6,
    paymentMethod: 'Card',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    auditTrail: [],
    createdAt: '2024-10-06T15:45:00Z',
    updatedAt: '2024-10-06T15:45:00Z',
  },
  {
    id: 'exp-072',
    expenseNumber: 'EX-2024-072',
    date: 'Oct 05, 2024',
    timestamp: new Date('2024-10-05T10:00:00').getTime(),
    category: 'Utilities',
    description: 'Monthly Commercial HVAC Gas Heater Pre-Season Service',
    reference: 'CenterPoint Energy · ACC-88910',
    vendorName: 'CenterPoint Energy Utilities',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 420.0,
    taxAmount: 37.8,
    amount: 457.8,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-10-05T10:00:00Z',
    updatedAt: '2024-10-05T10:00:00Z',
  },
  {
    id: 'exp-071',
    expenseNumber: 'EX-2024-071',
    date: 'Oct 04, 2024',
    timestamp: new Date('2024-10-04T16:00:00').getTime(),
    category: 'Professional Services',
    description: 'Store Security Guard Overtime Shift Coverage',
    reference: 'Securitas Shield Services · INV-2281',
    vendorName: 'Securitas Shield Services',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 520.0,
    taxAmount: 46.8,
    amount: 566.8,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    status: 'Active',
    approvalStatus: 'Pending Approval',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    auditTrail: [],
    createdAt: '2024-10-04T16:00:00Z',
    updatedAt: '2024-10-04T16:00:00Z',
  },
  {
    id: 'exp-070',
    expenseNumber: 'EX-2024-070',
    date: 'Oct 03, 2024',
    timestamp: new Date('2024-10-03T11:30:00').getTime(),
    category: 'Store Supplies',
    description: 'POS Ribbon Rolls, Security Tags & Lanyards (500pk)',
    reference: 'Checkpoint Retail Direct · #4991',
    vendorName: 'Checkpoint Retail Solutions',
    outletName: 'Uptown Mall #12',
    scope: 'Outlet',
    baseAmount: 390.0,
    taxAmount: 35.1,
    amount: 425.1,
    paymentMethod: 'Card',
    paidByEmployee: 'Amina Patel (EMP-108)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Amina Patel',
    submittedByRole: 'Visual Merch',
    auditTrail: [],
    createdAt: '2024-10-03T11:30:00Z',
    updatedAt: '2024-10-03T11:30:00Z',
  },
  {
    id: 'exp-069',
    expenseNumber: 'EX-2024-069',
    date: 'Oct 02, 2024',
    timestamp: new Date('2024-10-02T13:45:00').getTime(),
    category: 'Logistics',
    description: 'Bulk Warehouse Pallet Shrink Wrap & Strapping Tape',
    reference: 'Packaging Pro Direct · SLIP-992',
    vendorName: 'Packaging Pro Direct',
    outletName: 'Organization-wide',
    scope: 'Organization-wide',
    baseAmount: 180.0,
    taxAmount: 16.2,
    amount: 196.2,
    paymentMethod: 'Card',
    paidByEmployee: 'David Chen (EMP-105)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'David Chen',
    submittedByRole: 'Inventory Spec.',
    auditTrail: [],
    createdAt: '2024-10-02T13:45:00Z',
    updatedAt: '2024-10-02T13:45:00Z',
  },
  {
    id: 'exp-068',
    expenseNumber: 'EX-2024-068',
    date: 'Oct 01, 2024',
    timestamp: new Date('2024-10-01T09:15:00').getTime(),
    category: 'Utilities',
    description: 'Downtown Flagship Primary Electric Sub-Station Lease Charge',
    reference: 'Austin Power & Municipal · INV-9901',
    vendorName: 'Austin Power & Light Board',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1650.0,
    taxAmount: 148.5,
    amount: 1798.5,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-10-01T09:15:00Z',
    updatedAt: '2024-10-01T09:15:00Z',
  },
  // Previous months in 2024 to flesh out the $54,230 YTD and utilities spend
  {
    id: 'exp-067',
    expenseNumber: 'EX-2024-067',
    date: 'Sep 28, 2024',
    timestamp: new Date('2024-09-28T10:00:00').getTime(),
    category: 'Utilities',
    description: 'September Commercial Power & AC Grid Billing',
    reference: 'GRID-TEX-7801 · Settled',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1820.0,
    taxAmount: 163.8,
    amount: 1983.8,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-09-28T10:00:00Z',
    updatedAt: '2024-09-28T10:00:00Z',
  },
  {
    id: 'exp-066',
    expenseNumber: 'EX-2024-066',
    date: 'Sep 25, 2024',
    timestamp: new Date('2024-09-25T14:30:00').getTime(),
    category: 'Store Supplies',
    description: 'Point-of-Sale Receipt Paper & Packing Tape Rolls',
    reference: 'EcoKraft Packaging Ltd. · INV-EKP-8710',
    vendorName: 'EcoKraft Packaging Supplies Ltd.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 395.0,
    taxAmount: 35.55,
    amount: 430.55,
    paymentMethod: 'Card',
    paidByEmployee: 'Elena Rostova (EMP-103)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Elena Rostova',
    submittedByRole: 'Sr. Cashier',
    auditTrail: [],
    createdAt: '2024-09-25T14:30:00Z',
    updatedAt: '2024-09-25T14:30:00Z',
  },
  {
    id: 'exp-065',
    expenseNumber: 'EX-2024-065',
    date: 'Sep 20, 2024',
    timestamp: new Date('2024-09-20T11:00:00').getTime(),
    category: 'Equipment Maintenance',
    description: 'Security EAS Anti-Theft Pedestal Sensor Tuning',
    reference: 'Sensormatic Global · WO-4481',
    vendorName: 'Sensormatic Global Systems',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 780.0,
    taxAmount: 70.2,
    amount: 850.2,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'David Chen (EMP-105)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'David Chen',
    submittedByRole: 'Inventory Spec.',
    auditTrail: [],
    createdAt: '2024-09-20T11:00:00Z',
    updatedAt: '2024-09-20T11:00:00Z',
  },
  {
    id: 'exp-064',
    expenseNumber: 'EX-2024-064',
    date: 'Sep 15, 2024',
    timestamp: new Date('2024-09-15T15:00:00').getTime(),
    category: 'Marketing',
    description: 'Fall Fashion Lookbook Print Collateral (1,000 copies)',
    reference: 'OmniMedia Printworks · PO-3910',
    vendorName: 'OmniMedia Printworks Ltd.',
    outletName: 'Organization-wide',
    scope: 'Organization-wide',
    baseAmount: 1200.0,
    taxAmount: 108.0,
    amount: 1308.0,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Amina Patel (EMP-108)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Amina Patel',
    submittedByRole: 'Visual Merch',
    auditTrail: [],
    createdAt: '2024-09-15T15:00:00Z',
    updatedAt: '2024-09-15T15:00:00Z',
  },
  {
    id: 'exp-063',
    expenseNumber: 'EX-2024-063',
    date: 'Sep 10, 2024',
    timestamp: new Date('2024-09-10T12:00:00').getTime(),
    category: 'Utilities',
    description: 'August Commercial Power & Grid Demand Billing',
    reference: 'GRID-TEX-6910 · Settled',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1950.0,
    taxAmount: 175.5,
    amount: 2125.5,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-09-10T12:00:00Z',
    updatedAt: '2024-09-10T12:00:00Z',
  },
  {
    id: 'exp-062',
    expenseNumber: 'EX-2024-062',
    date: 'Aug 29, 2024',
    timestamp: new Date('2024-08-29T10:30:00').getTime(),
    category: 'Utilities',
    description: 'July Commercial Grid Power Consumption Bill',
    reference: 'GRID-TEX-5819 · Settled',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 2100.0,
    taxAmount: 189.0,
    amount: 2289.0,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-08-29T10:30:00Z',
    updatedAt: '2024-08-29T10:30:00Z',
  },
  {
    id: 'exp-061',
    expenseNumber: 'EX-2024-061',
    date: 'Aug 18, 2024',
    timestamp: new Date('2024-08-18T14:00:00').getTime(),
    category: 'Utilities',
    description: 'Commercial Airflow HVAC Inspection & Coolant Recharge',
    reference: 'Apex HVAC Systems · WO-6610',
    vendorName: 'Apex HVAC Systems & Facilities',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1450.0,
    taxAmount: 130.5,
    amount: 1580.5,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    auditTrail: [],
    createdAt: '2024-08-18T14:00:00Z',
    updatedAt: '2024-08-18T14:00:00Z',
  },
  {
    id: 'exp-060',
    expenseNumber: 'EX-2024-060',
    date: 'Jul 28, 2024',
    timestamp: new Date('2024-07-28T09:00:00').getTime(),
    category: 'Utilities',
    description: 'June Peak Summer Electric Grid Surcharge',
    reference: 'GRID-TEX-4419 · Settled',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 2250.0,
    taxAmount: 202.5,
    amount: 2452.5,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-07-28T09:00:00Z',
    updatedAt: '2024-07-28T09:00:00Z',
  },
  {
    id: 'exp-059',
    expenseNumber: 'EX-2024-059',
    date: 'Jul 15, 2024',
    timestamp: new Date('2024-07-15T11:30:00').getTime(),
    category: 'Professional Services',
    description: 'Mid-Year Inventory Audit & Asset Valuation Appraisal',
    reference: 'BDO Global Retail · INV-8819',
    vendorName: 'BDO Global Advisory',
    outletName: 'Organization-wide',
    scope: 'Organization-wide',
    baseAmount: 2400.0,
    taxAmount: 216.0,
    amount: 2616.0,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-07-15T11:30:00Z',
    updatedAt: '2024-07-15T11:30:00Z',
  },
  {
    id: 'exp-058',
    expenseNumber: 'EX-2024-058',
    date: 'Jun 30, 2024',
    timestamp: new Date('2024-06-30T10:00:00').getTime(),
    category: 'Utilities',
    description: 'May Commercial Power & Electric Distribution Charge',
    reference: 'GRID-TEX-3810 · Settled',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1850.0,
    taxAmount: 166.5,
    amount: 2016.5,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    auditTrail: [],
    createdAt: '2024-06-30T10:00:00Z',
    updatedAt: '2024-06-30T10:00:00Z',
  },
  {
    id: 'exp-057',
    expenseNumber: 'EX-2024-057',
    date: 'Jun 12, 2024',
    timestamp: new Date('2024-06-12T14:15:00').getTime(),
    category: 'Store Supplies',
    description: 'Summer Promo Branded Shopping Bags & Silk Ties',
    reference: 'EcoKraft Packaging Ltd. · INV-EKP-7029',
    vendorName: 'EcoKraft Packaging Supplies Ltd.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 850.0,
    taxAmount: 76.5,
    amount: 926.5,
    paymentMethod: 'Card',
    paidByEmployee: 'Elena Rostova (EMP-103)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Elena Rostova',
    submittedByRole: 'Sr. Cashier',
    auditTrail: [],
    createdAt: '2024-06-12T14:15:00Z',
    updatedAt: '2024-06-12T14:15:00Z',
  },
  {
    id: 'exp-056',
    expenseNumber: 'EX-2024-056',
    date: 'May 28, 2024',
    timestamp: new Date('2024-05-28T09:30:00').getTime(),
    category: 'Utilities',
    description: 'April Commercial Electricity & Municipal Waste Utility',
    reference: 'GRID-TEX-2910 · Settled',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1720.0,
    taxAmount: 154.8,
    amount: 1874.8,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-05-28T09:30:00Z',
    updatedAt: '2024-05-28T09:30:00Z',
  },
  {
    id: 'exp-055',
    expenseNumber: 'EX-2024-055',
    date: 'May 14, 2024',
    timestamp: new Date('2024-05-14T16:00:00').getTime(),
    category: 'Equipment Maintenance',
    description: 'Conveyor Belt Motor Overhaul & Lubrication (Stockroom)',
    reference: 'Apex Automation · WO-3310',
    vendorName: 'Apex Automation Services',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1100.0,
    taxAmount: 99.0,
    amount: 1199.0,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'David Chen (EMP-105)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'David Chen',
    submittedByRole: 'Inventory Spec.',
    auditTrail: [],
    createdAt: '2024-05-14T16:00:00Z',
    updatedAt: '2024-05-14T16:00:00Z',
  },
  {
    id: 'exp-054',
    expenseNumber: 'EX-2024-054',
    date: 'Apr 25, 2024',
    timestamp: new Date('2024-04-25T11:00:00').getTime(),
    category: 'Utilities',
    description: 'March Commercial Power & Water Treatment Invoice',
    reference: 'GRID-TEX-1902 · Settled',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1680.0,
    taxAmount: 151.2,
    amount: 1831.2,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-04-25T11:00:00Z',
    updatedAt: '2024-04-25T11:00:00Z',
  },
  {
    id: 'exp-053',
    expenseNumber: 'EX-2024-053',
    date: 'Apr 10, 2024',
    timestamp: new Date('2024-04-10T15:30:00').getTime(),
    category: 'Marketing',
    description: 'Spring Fashion Week Sponsorship & Billboard Space',
    reference: 'City Media Hub · INV-4491',
    vendorName: 'City Media Hub Agency',
    outletName: 'Organization-wide',
    scope: 'Organization-wide',
    baseAmount: 2500.0,
    taxAmount: 225.0,
    amount: 2725.0,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Amina Patel (EMP-108)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Amina Patel',
    submittedByRole: 'Visual Merch',
    auditTrail: [],
    createdAt: '2024-04-10T15:30:00Z',
    updatedAt: '2024-04-10T15:30:00Z',
  },
  {
    id: 'exp-052',
    expenseNumber: 'EX-2024-052',
    date: 'Mar 26, 2024',
    timestamp: new Date('2024-03-26T10:00:00').getTime(),
    category: 'Utilities',
    description: 'February Commercial Heating & Grid Power Charges',
    reference: 'GRID-TEX-0941 · Settled',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1790.0,
    taxAmount: 161.1,
    amount: 1951.1,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    auditTrail: [],
    createdAt: '2024-03-26T10:00:00Z',
    updatedAt: '2024-03-26T10:00:00Z',
  },
  {
    id: 'exp-051',
    expenseNumber: 'EX-2024-051',
    date: 'Mar 15, 2024',
    timestamp: new Date('2024-03-15T13:45:00').getTime(),
    category: 'Store Supplies',
    description: 'Hanger Replacements, Garment Sizing Rings & Markers',
    reference: 'Retail Supply Corp · #8819',
    vendorName: 'Retail Supply Corp',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 420.0,
    taxAmount: 37.8,
    amount: 457.8,
    paymentMethod: 'Card',
    paidByEmployee: 'Elena Rostova (EMP-103)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Elena Rostova',
    submittedByRole: 'Sr. Cashier',
    auditTrail: [],
    createdAt: '2024-03-15T13:45:00Z',
    updatedAt: '2024-03-15T13:45:00Z',
  },
  {
    id: 'exp-050',
    expenseNumber: 'EX-2024-050',
    date: 'Feb 24, 2024',
    timestamp: new Date('2024-02-24T09:15:00').getTime(),
    category: 'Utilities',
    description: 'January Commercial Power Utility Settlement',
    reference: 'GRID-TEX-0112 · Settled',
    vendorName: 'Texas Electric Power Grid Co.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 1810.0,
    taxAmount: 162.9,
    amount: 1972.9,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-02-24T09:15:00Z',
    updatedAt: '2024-02-24T09:15:00Z',
  },
  {
    id: 'exp-049',
    expenseNumber: 'EX-2024-049',
    date: 'Feb 12, 2024',
    timestamp: new Date('2024-02-12T14:30:00').getTime(),
    category: 'Professional Services',
    description: 'Annual Store License & Sound Recording Royalty Clearance',
    reference: 'BMI & ASCAP Music Lic · LIC-4491',
    vendorName: 'ASCAP Commercial Music Licensing',
    outletName: 'Organization-wide',
    scope: 'Organization-wide',
    baseAmount: 950.0,
    taxAmount: 85.5,
    amount: 1035.5,
    paymentMethod: 'Card',
    paidByEmployee: 'Sarah Jenkins (Store Mgr)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Sarah Jenkins',
    submittedByRole: 'Store Mgr',
    auditTrail: [],
    createdAt: '2024-02-12T14:30:00Z',
    updatedAt: '2024-02-12T14:30:00Z',
  },
  {
    id: 'exp-048',
    expenseNumber: 'EX-2024-048',
    date: 'Jan 28, 2024',
    timestamp: new Date('2024-01-28T10:00:00').getTime(),
    category: 'Utilities',
    description: 'Annual Facility Water Treatment Plant Connection Fee',
    reference: 'Austin Water Dept · ACC-8819',
    vendorName: 'City Water Works Board',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 820.0,
    taxAmount: 73.8,
    amount: 893.8,
    paymentMethod: 'Bank Transfer',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    auditTrail: [],
    createdAt: '2024-01-28T10:00:00Z',
    updatedAt: '2024-01-28T10:00:00Z',
  },
  {
    id: 'exp-047',
    expenseNumber: 'EX-2024-047',
    date: 'Jan 15, 2024',
    timestamp: new Date('2024-01-15T11:45:00').getTime(),
    category: 'Equipment Maintenance',
    description: 'Emergency Alarm Siren & Glass Break Sensor Testing',
    reference: 'ADT Commercial Security · SR-9941',
    vendorName: 'ADT Commercial Services',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 640.0,
    taxAmount: 57.6,
    amount: 697.6,
    paymentMethod: 'Card',
    paidByEmployee: 'David Chen (EMP-105)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'David Chen',
    submittedByRole: 'Inventory Spec.',
    auditTrail: [],
    createdAt: '2024-01-15T11:45:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
  },
  {
    id: 'exp-046',
    expenseNumber: 'EX-2024-046',
    date: 'Jan 05, 2024',
    timestamp: new Date('2024-01-05T16:00:00').getTime(),
    category: 'Store Supplies',
    description: 'Annual First Aid Kits & Eyewash Station Refills',
    reference: 'Cintas First Aid · INV-4491',
    vendorName: 'Cintas Corporation',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 310.0,
    taxAmount: 27.9,
    amount: 337.9,
    paymentMethod: 'Card',
    paidByEmployee: 'Elena Rostova (EMP-103)',
    status: 'Active',
    approvalStatus: 'Approved',
    submittedBy: 'Elena Rostova',
    submittedByRole: 'Sr. Cashier',
    auditTrail: [],
    createdAt: '2024-01-05T16:00:00Z',
    updatedAt: '2024-01-05T16:00:00Z',
  },
  {
    id: 'exp-045',
    expenseNumber: 'EX-2024-045',
    date: 'Oct 04, 2024',
    timestamp: new Date('2024-10-04T12:00:00').getTime(),
    category: 'Logistics',
    description: 'Duplicate Freight Charge for Vendor Return (Voided)',
    reference: 'Metro Rapid Dispatch · Slip #401',
    vendorName: 'Metro Rapid Dispatch Inc.',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 120.0,
    taxAmount: 10.8,
    amount: 130.8,
    paymentMethod: 'Card',
    paidByEmployee: 'Marcus Vance (EMP-102)',
    status: 'Voided',
    approvalStatus: 'Draft',
    submittedBy: 'Marcus Vance',
    submittedByRole: 'Asst. Mgr',
    notes: 'Voided because carrier billed direct through accounts payable.',
    auditTrail: [
      {
        id: 'aud-45-1',
        title: 'Voided by Store Manager',
        timestamp: 'Oct 04, 2024 · 14:00',
        actor: 'Sarah Jenkins',
        actorRole: 'Store Mgr',
        note: 'Double invoice voided to prevent ledger variance.',
        status: 'Voided',
      },
    ],
    createdAt: '2024-10-04T12:00:00Z',
    updatedAt: '2024-10-04T14:00:00Z',
  },
  {
    id: 'exp-044',
    expenseNumber: 'EX-2024-044',
    date: 'Oct 02, 2024',
    timestamp: new Date('2024-10-02T10:00:00').getTime(),
    category: 'Marketing',
    description: 'Expired Influencer Event Catering Deposit (Voided)',
    reference: 'SweetTreats Bakery · INV-100',
    vendorName: 'SweetTreats Bakery & Cafe',
    outletName: 'Downtown Flagship #04',
    scope: 'Outlet',
    baseAmount: 350.0,
    taxAmount: 31.5,
    amount: 381.5,
    paymentMethod: 'Card',
    paidByEmployee: 'Amina Patel (EMP-108)',
    status: 'Voided',
    approvalStatus: 'Rejected',
    submittedBy: 'Amina Patel',
    submittedByRole: 'Visual Merch',
    rejectionReason: 'Event cancelled before service occurred',
    auditTrail: [],
    createdAt: '2024-10-02T10:00:00Z',
    updatedAt: '2024-10-02T10:00:00Z',
  },
];

class MockExpenseServiceImpl implements IExpenseService {
  private expenses: Expense[] = [...INITIAL_EXPENSES];

  public async getAllExpenses(): Promise<Expense[]> {
    // Simulate lightweight async delay
    await new Promise((res) => setTimeout(res, 50));
    return [...this.expenses];
  }

  public async getExpenses(query: ExpenseQuery): Promise<ExpenseQueryResult> {
    await new Promise((res) => setTimeout(res, 120));

    let filtered = [...this.expenses];

    // 1. Search across number, category, payee, description, reference, submittedBy
    if (query.search && query.search.trim()) {
      const q = query.search.toLowerCase().trim();
      filtered = filtered.filter(
        (e) =>
          e.expenseNumber.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          (e.vendorName && e.vendorName.toLowerCase().includes(q)) ||
          (e.reference && e.reference.toLowerCase().includes(q)) ||
          e.submittedBy.toLowerCase().includes(q) ||
          e.outletName.toLowerCase().includes(q)
      );
    }

    // 2. Period filter
    const refYear = 2024;
    const refMonth = 9; // October (0-indexed)
    if (query.period && query.period !== 'All Time') {
      filtered = filtered.filter((e) => {
        const d = new Date(e.timestamp);
        if (query.period === 'This Month') {
          return d.getFullYear() === refYear && d.getMonth() === refMonth;
        }
        if (query.period === 'Last Month') {
          return d.getFullYear() === refYear && d.getMonth() === refMonth - 1;
        }
        if (query.period === 'Last 7 Days') {
          const sevenDaysAgo = new Date('2024-10-25T00:00:00').getTime() - 7 * 24 * 60 * 60 * 1000;
          return e.timestamp >= sevenDaysAgo && e.timestamp <= new Date('2024-10-25T23:59:59').getTime();
        }
        if (query.period === 'Month to Date') {
          return (
            d.getFullYear() === refYear &&
            d.getMonth() === refMonth &&
            d.getDate() <= 25
          );
        }
        if (query.period === 'Custom Range') {
          if (query.customStartDate && query.customEndDate) {
            const start = new Date(query.customStartDate).getTime();
            const end = new Date(query.customEndDate).getTime() + 86400000;
            return e.timestamp >= start && e.timestamp <= end;
          }
        }
        return true;
      });
    }

    // 3. Outlet filter
    if (query.outlet && query.outlet !== 'All Outlets' && query.outlet !== 'Outlet: All Outlets') {
      const targetOutlet = query.outlet.replace('Outlet: ', '');
      filtered = filtered.filter((e) => e.outletName === targetOutlet);
    }

    // 4. Category filter
    if (query.category && query.category !== 'All' && query.category !== 'Category: All') {
      const targetCategory = query.category.replace('Category: ', '');
      filtered = filtered.filter((e) => {
        if (targetCategory.includes('Utilities') && e.category === 'Utilities') return true;
        if (targetCategory.includes('Store Supplies') && e.category === 'Store Supplies') return true;
        if (targetCategory.includes('Equipment') && e.category === 'Equipment Maintenance') return true;
        if (targetCategory.includes('Marketing') && e.category === 'Marketing') return true;
        if (targetCategory.includes('Logistics') && e.category === 'Logistics') return true;
        if (targetCategory.includes('Professional') && e.category === 'Professional Services') return true;
        return e.category === targetCategory;
      });
    }

    // 5. Status filter
    if (query.status && query.status !== 'All' && query.status !== 'Status: All') {
      const targetStatus = query.status.replace('Status: ', '');
      filtered = filtered.filter((e) => {
        if (targetStatus === 'Active (Exclude Voids)') return e.status === 'Active';
        if (targetStatus === 'Voided') return e.status === 'Voided';
        if (targetStatus === 'Approved') return e.approvalStatus === 'Approved' && e.status === 'Active';
        if (targetStatus === 'Pending Approval' || targetStatus === 'Submitted') {
          return e.approvalStatus === 'Pending Approval' && e.status === 'Active';
        }
        if (targetStatus === 'Draft') return e.approvalStatus === 'Draft' && e.status === 'Active';
        if (targetStatus === 'Rejected') return e.approvalStatus === 'Rejected';
        return true;
      });
    }

    // Sort by timestamp desc by default
    filtered.sort((a, b) => b.timestamp - a.timestamp);

    const filteredCount = filtered.length;
    const page = Math.max(1, query.page || 1);
    const pageSize = Math.max(1, query.pageSize || 6);
    const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));

    const startIndex = (page - 1) * pageSize;
    const paginatedExpenses = filtered.slice(startIndex, startIndex + pageSize);

    return {
      expenses: paginatedExpenses,
      totalCount: this.expenses.length,
      filteredCount,
      page,
      pageSize,
      totalPages,
    };
  }

  public async getExpense(id: string): Promise<Expense | null> {
    await new Promise((res) => setTimeout(res, 50));
    return this.expenses.find((e) => e.id === id || e.expenseNumber === id) || null;
  }

  public async createExpense(input: CreateExpenseInput): Promise<Expense> {
    await new Promise((res) => setTimeout(res, 180));

    // Next sequential number
    const count = this.expenses.length + 92;
    const expenseNumber = `EX-2024-${String(count).padStart(3, '0')}`;
    const baseAmount = Number(input.baseAmount) || 0;
    const taxAmount = Number(input.taxAmount) || 0;
    const totalAmount = baseAmount + taxAmount;

    // Determine mock approval routing
    // If saveAsDraft is requested -> Draft
    // If baseAmount <= 200 -> Approved immediately for minor petty cash
    // Otherwise -> Pending Approval (Requires Manager Sign-Off)
    let approvalStatus: Expense['approvalStatus'] = 'Pending Approval';
    if (input.saveAsDraft) {
      approvalStatus = 'Draft';
    } else if (totalAmount <= 200 && input.category !== 'Utilities') {
      approvalStatus = 'Approved';
    }

    const scope = input.outletName === 'Organization-wide Allocation' ? 'Organization-wide' : 'Outlet';
    const cleanOutletName =
      input.outletName === 'Organization-wide Allocation'
        ? 'Organization-wide'
        : input.outletName;

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      expenseNumber,
      date: 'Oct 25, 2024',
      timestamp: new Date().getTime(),
      category: input.category,
      description: input.description,
      reference: input.reference || `INV-GEN-${Math.floor(1000 + Math.random() * 9000)}`,
      vendorName: input.vendorName,
      outletName: cleanOutletName,
      scope,
      baseAmount,
      taxAmount,
      amount: totalAmount,
      paymentMethod: input.paymentMethod || 'Card',
      paidByEmployee: input.paidByEmployee || 'Elena Rostova (EMP-103)',
      settlementDate: 'Oct 25, 2024 · Just now',
      status: 'Active',
      approvalStatus,
      submittedBy: 'Sarah Jenkins',
      submittedByRole: 'Store Mgr',
      notes: input.notes,
      attachments: [
        {
          id: `att-${Date.now()}`,
          name: `Receipt_${expenseNumber}.pdf`,
          size: '1.1 MB',
          type: 'application/pdf',
          uploadDate: 'Oct 25, 2024',
        },
      ],
      auditTrail: [
        {
          id: `aud-${Date.now()}-1`,
          title: approvalStatus === 'Draft' ? 'Saved as Draft' : 'Submitted for Review',
          timestamp: 'Oct 25, 2024 · 12:00',
          actor: 'Sarah Jenkins',
          actorRole: 'Store Mgr',
          note: input.description,
          status: approvalStatus,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.expenses.unshift(newExpense);
    return newExpense;
  }

  public async updateExpense(id: string, input: UpdateExpenseInput): Promise<Expense> {
    await new Promise((res) => setTimeout(res, 150));
    const index = this.expenses.findIndex((e) => e.id === id || e.expenseNumber === id);
    if (index === -1) {
      throw new Error(`Expense with id ${id} not found`);
    }

    const current = this.expenses[index];
    // Can only edit non-finalized expenses (Draft or Pending Approval)
    if (current.approvalStatus === 'Approved' || current.status === 'Voided') {
      throw new Error('Approved or Voided expenses cannot be modified directly.');
    }

    const baseAmount = input.baseAmount !== undefined ? input.baseAmount : current.baseAmount;
    const taxAmount = input.taxAmount !== undefined ? input.taxAmount : current.taxAmount;

    const updated: Expense = {
      ...current,
      date: input.date || current.date,
      category: input.category || current.category,
      description: input.description || current.description,
      vendorName: input.vendorName !== undefined ? input.vendorName : current.vendorName,
      reference: input.reference !== undefined ? input.reference : current.reference,
      outletName: input.outletName || current.outletName,
      baseAmount,
      taxAmount,
      amount: baseAmount + taxAmount,
      paymentMethod: input.paymentMethod || current.paymentMethod,
      paidByEmployee: input.paidByEmployee || current.paidByEmployee,
      notes: input.notes !== undefined ? input.notes : current.notes,
      updatedAt: new Date().toISOString(),
      auditTrail: [
        ...current.auditTrail,
        {
          id: `aud-${Date.now()}`,
          title: 'Updated by Submitter',
          timestamp: 'Oct 25, 2024 · Updated',
          actor: 'Elena Rostova',
          actorRole: 'Sr. Cashier',
          note: 'Expense attributes re-indexed.',
          status: current.approvalStatus,
        },
      ],
    };

    this.expenses[index] = updated;
    return updated;
  }

  public async voidExpense(id: string, reason = 'Voided by store manager'): Promise<Expense> {
    await new Promise((res) => setTimeout(res, 120));
    const index = this.expenses.findIndex((e) => e.id === id || e.expenseNumber === id);
    if (index === -1) {
      throw new Error(`Expense with id ${id} not found`);
    }

    const current = this.expenses[index];
    const updated: Expense = {
      ...current,
      status: 'Voided',
      notes: current.notes ? `${current.notes} (Void reason: ${reason})` : `Void reason: ${reason}`,
      updatedAt: new Date().toISOString(),
      auditTrail: [
        ...current.auditTrail,
        {
          id: `aud-${Date.now()}`,
          title: 'Voided Record',
          timestamp: 'Oct 25, 2024 · Voided',
          actor: 'Sarah Jenkins',
          actorRole: 'Store Mgr',
          note: reason,
          status: 'Voided',
        },
      ],
    };

    this.expenses[index] = updated;
    return updated;
  }

  public async approveExpense(id: string, approverName = 'Sarah Jenkins'): Promise<Expense> {
    await new Promise((res) => setTimeout(res, 120));
    const index = this.expenses.findIndex((e) => e.id === id || e.expenseNumber === id);
    if (index === -1) throw new Error(`Expense ${id} not found`);

    const current = this.expenses[index];
    const updated: Expense = {
      ...current,
      approvalStatus: 'Approved',
      rejectionReason: undefined,
      updatedAt: new Date().toISOString(),
      auditTrail: [
        ...current.auditTrail,
        {
          id: `aud-${Date.now()}`,
          title: `Approved by ${approverName}`,
          timestamp: 'Just now',
          actor: approverName,
          actorRole: 'Store Mgr',
          note: 'Audit clearance verified. Posted to ledger journal.',
          status: 'Approved',
        },
      ],
    };

    this.expenses[index] = updated;
    return updated;
  }

  public async rejectExpense(id: string, reason: string, rejectorName = 'Sarah Jenkins'): Promise<Expense> {
    await new Promise((res) => setTimeout(res, 120));
    const index = this.expenses.findIndex((e) => e.id === id || e.expenseNumber === id);
    if (index === -1) throw new Error(`Expense ${id} not found`);

    const current = this.expenses[index];
    const updated: Expense = {
      ...current,
      approvalStatus: 'Rejected',
      rejectionReason: reason,
      updatedAt: new Date().toISOString(),
      auditTrail: [
        ...current.auditTrail,
        {
          id: `aud-${Date.now()}`,
          title: `Rejected by ${rejectorName}`,
          timestamp: 'Just now',
          actor: rejectorName,
          actorRole: 'Store Mgr',
          note: `Rejection: ${reason}`,
          status: 'Rejected',
        },
      ],
    };

    this.expenses[index] = updated;
    return updated;
  }
}

type TenantExpenseRow = Awaited<ReturnType<typeof listTenantExpenses>>['data']['expenses'][number];
function mapTenantExpense(row: TenantExpenseRow): Expense { return { id: row.id, expenseNumber: row.expenseNumber, date: row.expenseDate, timestamp: Date.parse(row.expenseDate), category: row.category as Expense['category'], description: row.description, reference: row.reference ?? undefined, vendorName: row.vendorName ?? undefined, outletId: row.outlet?.id, outletName: row.outlet?.name ?? 'Organization-wide', scope: row.scope as Expense['scope'], baseAmount: row.baseAmount, taxAmount: row.taxAmount, amount: row.amount, paymentMethod: row.paymentMethod as Expense['paymentMethod'], paidByEmployee: row.paidByEmployee, settlementDate: row.settlementDate ?? undefined, status: row.status === 'ACTIVE' ? 'Active' : 'Voided', approvalStatus: row.approvalStatus.replace('_', ' ') as Expense['approvalStatus'], submittedBy: row.submittedBy, notes: row.notes ?? undefined, auditTrail: [], createdAt: row.createdAt, updatedAt: row.updatedAt }; }
class ProductionExpenseService extends MockExpenseServiceImpl {
  private async all(): Promise<Expense[]> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); const result = await listTenantExpenses(getFirebaseClientServices().dataConnect, { organizationId: membership.organization.id }); return result.data.expenses.map(mapTenantExpense); }
  override async getAllExpenses(): Promise<Expense[]> { return this.all(); }
  override async getExpenses(query: ExpenseQuery): Promise<ExpenseQueryResult> { let expenses = await this.all(); const search = query.search?.trim().toLowerCase() ?? ''; expenses = expenses.filter((e) => !search || `${e.expenseNumber} ${e.description} ${e.vendorName ?? ''} ${e.category}`.toLowerCase().includes(search)); const page = Math.max(1, query.page); const pageSize = Math.max(1, query.pageSize); const totalPages = Math.max(1, Math.ceil(expenses.length / pageSize)); const validPage = Math.min(page, totalPages); return { expenses: expenses.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: expenses.length, filteredCount: expenses.length, page: validPage, pageSize, totalPages }; }
  override async getExpense(id: string): Promise<Expense | null> { return (await this.all()).find((e) => e.id === id || e.expenseNumber === id) ?? null; }
  private async organizationId(): Promise<string> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); return membership.organization.id; }
  override async createExpense(input: CreateExpenseInput): Promise<Expense> { const organizationId = await this.organizationId(); const expenseNumber = `EX-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`; await httpsCallable(getFirebaseClientServices().functions, 'createTenantExpenseRecord')({ organizationId, expenseNumber, ...input, expenseDate: input.date, amount: input.baseAmount + input.taxAmount, submittedBy: input.paidByEmployee, requestId: globalThis.crypto.randomUUID() }); const created = (await this.all()).find((e) => e.expenseNumber === expenseNumber); if (!created) throw new Error('Expense was created but could not be loaded.'); return created; }
  override async updateExpense(id: string, input: UpdateExpenseInput): Promise<Expense> { const current = await this.getExpense(id); if (!current) throw new Error(`Expense with id ${id} not found`); const organizationId = await this.organizationId(); const baseAmount = input.baseAmount ?? current.baseAmount; const taxAmount = input.taxAmount ?? current.taxAmount; await httpsCallable(getFirebaseClientServices().functions, 'updateTenantExpenseRecord')({ organizationId, id: current.id, expenseDate: input.date ?? current.date, category: input.category ?? current.category, description: input.description ?? current.description, reference: input.reference ?? current.reference ?? null, vendorName: input.vendorName ?? current.vendorName ?? null, scope: current.scope, baseAmount, taxAmount, amount: baseAmount + taxAmount, paymentMethod: input.paymentMethod ?? current.paymentMethod, paidByEmployee: input.paidByEmployee ?? current.paidByEmployee, notes: input.notes ?? current.notes ?? null, requestId: globalThis.crypto.randomUUID() }); const updated = await this.getExpense(current.id); if (!updated) throw new Error('Expense was updated but could not be loaded.'); return updated; }
  override async approveExpense(id: string, approverName?: string): Promise<Expense> { return this.changeApproval(id, 'APPROVED', approverName); }
  override async rejectExpense(id: string, reason: string): Promise<Expense> { return this.changeApproval(id, 'REJECTED', reason); }
  private async changeApproval(id: string, approvalStatus: 'APPROVED' | 'REJECTED', reason?: string): Promise<Expense> { const organizationId = await this.organizationId(); await httpsCallable(getFirebaseClientServices().functions, 'changeTenantExpenseApprovalStatus')({ organizationId, id, approvalStatus, reason: reason ?? null, requestId: globalThis.crypto.randomUUID() }); const updated = await this.getExpense(id); if (!updated) throw new Error('Expense approval was changed but could not be loaded.'); return updated; }
  override async voidExpense(id: string, reason = 'Voided by operator'): Promise<Expense> { const organizationId = await this.organizationId(); await httpsCallable(getFirebaseClientServices().functions, 'voidTenantExpenseRecord')({ organizationId, id, reason, requestId: globalThis.crypto.randomUUID() }); const updated = await this.getExpense(id); if (!updated) throw new Error('Expense was voided but could not be loaded.'); return updated; }
}
export const expenseService: IExpenseService = new ProductionExpenseService();
