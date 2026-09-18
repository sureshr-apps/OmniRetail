export type PurchaseStatus = 'active' | 'draft' | 'cancelled';
export type PaymentStatus = 'PAID' | 'PARTIALLY_PAID' | 'UNPAID';
export type ReceiptStatus = 'PENDING' | 'PARTIALLY_RECEIVED' | 'RECEIVED';
export type PurchaseScope = 'outlet' | 'organization';

export interface PurchaseItem {
  id: string;
  productId: string;
  productCode: string; // e.g. PRD-1024
  productName: string; // e.g. Classic Linen Relaxed Shirt
  sku: string; // e.g. AP-SH-001
  variantInfo?: string; // e.g. Sand / L
  quantityOrdered: number;
  quantityReceived: number;
  unitCost: number;
  discountPercent: number; // e.g. 0%
  taxRate: number; // e.g. 12 or 18%
  taxAmount: number;
  lineTotal: number;
}

export interface PurchaseAuditEntry {
  id: string;
  title: string;
  timeAgo: string;
  details: string;
  timestamp: string;
  dotType: 'primary' | 'outline' | 'variant';
}

export interface PurchaseReceiptBatch {
  quantity: number;
  batchNumber: string;
  mfgDate: string;
  expiryDate: string;
}

export interface PurchaseReceiptLine {
  lineId: string;
  batches: PurchaseReceiptBatch[];
}

export interface Purchase {
  id: string;
  purchaseNumber: string; // e.g. PUR-2024-104
  purchaseOrderNumber?: string; // e.g. PO-2024-082 or DRAFT-ORD
  invoiceNumber?: string; // e.g. INV-ZTM-8821
  date: string; // formatted date, e.g. "Oct 24, 2024"
  time: string; // formatted time, e.g. "10:15 AM"
  timestamp: number; // raw timestamp for sorting/filtering
  supplierId: string;
  supplierName: string; // e.g. Zenith Textile Mills
  supplierTaxId?: string; // e.g. "tax-id: US-8829104"
  supplierContact?: string; // e.g. "rep: john@apexge.com"
  supplierNote?: string; // e.g. "Net 30 Terms", "Direct DSD Route", "Quote Pending"
  outletId?: string;
  outletName: string; // e.g. "Downtown Flagship #04", "Uptown Mall #12", "Organization-wide"
  scope: PurchaseScope;
  items: PurchaseItem[];
  totalUnits: number;
  subtotal: number;
  shippingFee: number;
  handlingFee: number;
  tax: number;
  totalAmount: number;
  amountPaid: number;
  outstandingAmount: number;
  paymentStatus: PaymentStatus;
  receiptStatus: ReceiptStatus;
  status: PurchaseStatus;
  paymentMethodNote?: string; // e.g. "Tax Incl.", "Fully Settled", "Due in 10 days", "Paid via ACH", "Draft Est.", "Voided"
  paidNote?: string; // e.g. "₹1,500 Paid"
  dueDate?: string; // e.g. "2024-11-05"
  paymentTerms?: string; // e.g. "Net 15 Days", "Net 30 Days", "Immediate / Cash"
  receivingNotes?: string; // e.g. "Bay B, Store Stockroom"
  batchNumber?: string; // e.g. "BATCH-2024-OCT-09"
  mfgDate?: string;
  expiryDate?: string;
  createdBy: string; // e.g. "Sarah Jenkins"
  creatorRole: string; // e.g. "Store Mgr", "Procurement Head", "Inventory Lead", "Admin"
  auditTrail?: PurchaseAuditEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface PurchasesKpiSummary {
  totalPurchasesAmount: number;
  totalPurchasesGrowthText: string;
  pendingReceiptsCount: number;
  urgentStockoutRiskCount: number;
  outstandingBalanceAmount: number;
  outstandingBalanceDueText: string;
  purchasesThisMonthAmount: number;
  transactionsRecordedCount: number;
}

export interface PurchaseQuery {
  search?: string;
  customStartDate?: string;
  customEndDate?: string;
  outlet?: string;
  supplier?: string;
  paymentStatus?: PaymentStatus | 'ALL';
  page: number;
  pageSize: number;
}

export interface PurchaseQueryResult {
  items: Purchase[];
  totalCount: number;
  filteredCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  kpis: PurchasesKpiSummary;
}

export interface CreatePurchaseLineInput {
  productId: string;
  productCode: string;
  productName: string;
  sku: string;
  variantInfo?: string;
  quantity: number;
  unitCost: number;
  discountPercent: number;
  taxRate: number;
}

export interface CreatePurchaseInput {
  supplierId: string;
  supplierName: string;
  outletId?: string;
  outletName: string;
  scope: PurchaseScope;
  purchaseDate: string;
  invoiceNumber?: string;
  purchaseOrderNumber?: string;
  paymentTerms: string;
  items: CreatePurchaseLineInput[];
  shippingFee: number;
  handlingFee: number;
  initialPaymentRecorded: number;
  paymentOption: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID';
  status: PurchaseStatus;
  batchNumber?: string;
  mfgDate?: string;
  expiryDate?: string;
}
