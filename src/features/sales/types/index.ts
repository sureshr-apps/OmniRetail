export type TransactionStatus = 'COMPLETED' | 'PARTIAL_REFUND' | 'REFUNDED' | 'VOIDED';

export type TenderType = 'visa' | 'mastercard' | 'apple_pay' | 'cash' | 'split' | 'reversal' | 'none';

export interface SalesItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface SalesCustomer {
  id?: string;
  name: string;
  isWalkIn?: boolean;
  email?: string;
  phone?: string;
  vipTier?: string;
  rewardDelta?: number;
  rewardBalance?: number;
}

export interface SalesStaff {
  id: string;
  name: string;
  shiftId?: string;
  role?: string;
}

export interface SalesTender {
  type: TenderType;
  label: string;
  cardLast4?: string;
  cardBrand?: string;
  authCode?: string;
  stan?: string;
  traceId?: string;
  terminalLane?: string;
}

export interface SalesTransaction {
  id: string;
  receiptNumber: string;
  source: string;
  timestamp: string; // ISO string
  displayDate: string; // "Today", "Yesterday", etc.
  displayTime: string; // "14:32"
  customer: SalesCustomer;
  staff: SalesStaff;
  channel: string;
  terminalId: string;
  terminalName: string;
  items: SalesItem[];
  itemsSummary: string;
  skuSummary: string;
  tender: SalesTender;
  tax: number;
  taxLabel: string;
  discount: number;
  discountLabel: string;
  subtotal: number;
  totalNet: number;
  status: TransactionStatus;
  shiftNote?: string;
}

export type DateRangePreset = 'today' | 'yesterday' | 'last7days' | 'monthToDate' | 'custom';

export interface SalesFilterQuery {
  dateRange: DateRangePreset;
  customStartDate?: string;
  customEndDate?: string;
  channel: string;
  paymentMethod: string;
  status: string;
  cashier: string;
  searchQuery: string;
  page: number;
  pageSize: number;
}

export interface SalesKpiSummary {
  filteredSalesTotal: number;
  recordedSalesCount: number;
  vsYesterdayPct: number;
  cashDrawerBalance: number;
  cashVolumePct: number;
  cardAndDigitalTender: number;
  cardCount: number;
  contactlessCount: number;
  cardVolumePct: number;
  totalReturnsAndVoids: number;
  refundEventsCount: number;
  returnRatePct: number;
}

export interface SalesQueryResult {
  transactions: SalesTransaction[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  kpis: SalesKpiSummary;
}

export interface ColumnVisibility {
  transactionRec: boolean;
  timestamp: boolean;
  customer: boolean;
  staff: boolean;
  itemsCount: boolean;
  taxDiscount: boolean;
  totalNet: boolean;
  status: boolean;
  actions: boolean;
  tender?: boolean;
}
