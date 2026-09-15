export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  categoryLabel?: string;
  stock: number;
  mrp: number;
  discount: number;
  rate: number;
  barcode: string;
  taxCategory?: string;
  isPromo?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitDiscount: number;
  effectiveRate: number;
  customRetail?: number;
  customSalePrice?: number;
  customDiscount?: number;
  isCustom?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  tier: string;
  points: number;
  memberDiscount: number; // Flat discount or applied benefit
  phone?: string;
}

export interface HeldOrder {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: Customer;
  heldAt: string;
  itemCount: number;
  unitCount: number;
  totalPayable: number;
}

export interface OrderTotals {
  itemCount: number;
  unitCount: number;
  subtotal: number;
  memberDiscount: number;
  tax: number;
  totalPayable: number;
}

export type PaymentMethod = 'card' | 'cash' | 'digital' | 'split' | 'points' | 'fast_cash';

export interface PaymentTransaction {
  orderNumber: string;
  method: PaymentMethod;
  totalAmount: number;
  tenderedAmount: number;
  changeAmount: number;
  timestamp: string;
  customerName: string;
}
