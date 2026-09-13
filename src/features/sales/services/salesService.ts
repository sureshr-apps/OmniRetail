import {
  SalesTransaction,
  SalesFilterQuery,
  SalesQueryResult,
  SalesKpiSummary,
} from '../types';

export const INITIAL_MOCK_SALES: SalesTransaction[] = [
  {
    id: 'TRX-10492',
    receiptNumber: '8821',
    source: 'Local',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    displayDate: 'Today',
    displayTime: '14:32',
    customer: {
      id: 'CUST-001',
      name: 'Priya Patel',
      isWalkIn: false,
      email: 'priya.patel@acme-design.io',
      phone: '+1 (555) 019-8192',
      vipTier: 'GOLD VIP',
      rewardDelta: 14,
      rewardBalance: 1420,
    },
    staff: {
      id: 'STAFF-104',
      name: 'Sarah Jenkins',
      shiftId: 'SHIFT #104',
      role: 'Store Mgr',
    },
    channel: 'POS Register 01 (Front Left)',
    terminalId: 'TER-DF04-L1',
    terminalName: 'Downtown Flagship · Lane 01',
    items: [
      {
        id: 'ITM-01',
        name: 'Single Origin Ethiopia Yirgacheffe 250g',
        sku: 'ETH-BN-801',
        quantity: 1,
        unitPrice: 18.5,
        subtotal: 18.5,
      },
      {
        id: 'ITM-02',
        name: 'Organic Barista Oat Milk 1L',
        sku: 'MIL-OAT-01',
        quantity: 2,
        unitPrice: 5.5,
        subtotal: 11.0,
      },
      {
        id: 'ITM-03',
        name: 'Precision Coffee Scale with Timer',
        sku: 'SCL-DIG-BLK',
        quantity: 1,
        unitPrice: 108.0,
        subtotal: 108.0,
      },
    ],
    itemsSummary: '3 items: Ethiopia Beans, Oat Milk (x2)',
    skuSummary: 'SKU: ETH-BN-801, MIL-OAT-01',
    tender: {
      type: 'visa',
      label: 'Visa ····4921',
      cardLast4: '4921',
      cardBrand: 'Visa Signature',
      authCode: '894109',
      stan: '0092819',
      traceId: '20241028-DF04-8821-POS1',
    },
    tax: 10.5,
    taxLabel: '+$10.50 Tax',
    discount: 5.0,
    discountLabel: '-$5.00 VIP',
    subtotal: 137.5,
    totalNet: 142.5,
    status: 'COMPLETED',
    shiftNote:
      'Customer applied gold loyalty code for coffee scale warranty upgrade. Offered cold brew sample cup on exit.',
  },
  {
    id: 'TRX-10491',
    receiptNumber: '8820',
    source: 'Online',
    timestamp: new Date(Date.now() - 1000 * 60 * 49).toISOString(),
    displayDate: 'Today',
    displayTime: '14:18',
    customer: {
      id: 'CUST-002',
      name: 'James Liu',
      isWalkIn: false,
      email: 'j.liu@matrix-labs.com',
      phone: '+1 (555) 042-9912',
      vipTier: 'SILVER',
      rewardDelta: 28,
      rewardBalance: 650,
    },
    staff: {
      id: 'SYS-BOT',
      name: 'System Dispatch',
      shiftId: 'DISPATCH #01',
      role: 'Automated Bot',
    },
    channel: 'Online Store (Click & Collect)',
    terminalId: 'WEB-ORDER-99',
    terminalName: 'E-Commerce Dispatch Hub',
    items: [
      {
        id: 'ITM-04',
        name: 'Barista Burr Grinder Pro 40mm Steel',
        sku: 'GRD-PRO-992',
        quantity: 1,
        unitPrice: 276.6,
        subtotal: 276.6,
      },
    ],
    itemsSummary: '1 item: Barista Burr Grinder Pro',
    skuSummary: 'SKU: GRD-PRO-992',
    tender: {
      type: 'apple_pay',
      label: 'Apple Pay',
      cardBrand: 'Apple Card Master',
      authCode: '992104',
      stan: '0092818',
      traceId: '20241028-WEB-8820-DISP',
    },
    tax: 22.4,
    taxLabel: '+$22.40 Tax',
    discount: 0,
    discountLabel: 'Free Ship',
    subtotal: 276.6,
    totalNet: 299.0,
    status: 'COMPLETED',
    shiftNote: 'Online click & collect scheduled for pickup at downtown locker #4.',
  },
  {
    id: 'TRX-10490',
    receiptNumber: '8819',
    source: 'Counter',
    timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
    displayDate: 'Today',
    displayTime: '14:02',
    customer: {
      name: 'Walk-in Customer',
      isWalkIn: true,
    },
    staff: {
      id: 'STAFF-108',
      name: 'Marcus Brody',
      shiftId: 'SHIFT #108',
      role: 'Senior Cashier',
    },
    channel: 'POS Register 02 (Speed Counter)',
    terminalId: 'TER-DF04-L2',
    terminalName: 'Downtown Flagship · Speed Lane 02',
    items: [
      {
        id: 'ITM-05',
        name: 'Pour-over Paper Filter #02 Cone',
        sku: 'ACC-FLT-20',
        quantity: 1,
        unitPrice: 14.5,
        subtotal: 14.5,
      },
      {
        id: 'ITM-06',
        name: 'Artisan Ceramic Latte Mug 350ml',
        sku: 'ACC-MUG-CRM',
        quantity: 1,
        unitPrice: 20.9,
        subtotal: 20.9,
      },
    ],
    itemsSummary: '2 items: Pour-over Filter #02, Ceramic Mug',
    skuSummary: 'SKU: ACC-FLT-20, ACC-MUG-CRM',
    tender: {
      type: 'cash',
      label: 'Cash',
      authCode: 'CASH-DRAWER-02',
      stan: '0092817',
      traceId: '20241028-DF04-8819-POS2',
    },
    tax: 3.1,
    taxLabel: '+$3.10 Tax',
    discount: 0,
    discountLabel: '$0.00 Disc',
    subtotal: 35.4,
    totalNet: 38.5,
    status: 'COMPLETED',
    shiftNote: 'Cash tendered $40.00, exact change $1.50 returned.',
  },
  {
    id: 'TRX-10489',
    receiptNumber: '8818',
    source: 'Split',
    timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    displayDate: 'Today',
    displayTime: '13:47',
    customer: {
      id: 'CUST-003',
      name: 'Arthur Nygard',
      isWalkIn: false,
      email: 'arthur.n@nordic-craft.org',
      phone: '+1 (555) 390-1184',
      vipTier: 'REGULAR',
      rewardDelta: 8,
      rewardBalance: 320,
    },
    staff: {
      id: 'STAFF-104',
      name: 'Sarah Jenkins',
      shiftId: 'SHIFT #104',
      role: 'Store Mgr',
    },
    channel: 'POS Register 01 (Front Left)',
    terminalId: 'TER-DF04-L1',
    terminalName: 'Downtown Flagship · Lane 01',
    items: [
      {
        id: 'ITM-07',
        name: 'Stainless French Press 800ml',
        sku: 'ACC-FP-01',
        quantity: 1,
        unitPrice: 58.0,
        subtotal: 58.0,
      },
      {
        id: 'ITM-08',
        name: 'Cold Brew Bottle Infuser 500ml',
        sku: 'BOT-CB-500',
        quantity: 1,
        unitPrice: 24.0,
        subtotal: 24.0,
      },
    ],
    itemsSummary: '4 items: French Press, Cold Brew Bottle...',
    skuSummary: 'SKU: ACC-FP-01, BOT-CB-500',
    tender: {
      type: 'split',
      label: 'Split (Card+Cash)',
      cardLast4: '8831',
      cardBrand: 'Visa Debit ($50) + Cash ($32)',
      authCode: '920194',
      stan: '0092816',
      traceId: '20241028-DF04-8818-SPLIT',
    },
    tax: 7.2,
    taxLabel: '+$7.20 Tax',
    discount: 64.0,
    discountLabel: '-$64.00 Part.',
    subtotal: 138.8,
    totalNet: 82.0,
    status: 'PARTIAL_REFUND',
    shiftNote:
      'Partial return issued for chipped French press accessory piece (-$64.00 credited back to original card). Customer retained cold brew bottle.',
  },
  {
    id: 'TRX-10488',
    receiptNumber: '8817',
    source: 'Returned',
    timestamp: new Date(Date.now() - 1000 * 60 * 172).toISOString(),
    displayDate: 'Today',
    displayTime: '12:15',
    customer: {
      id: 'CUST-004',
      name: 'David Lynch',
      isWalkIn: false,
      email: 'd.lynch@twinpeaks-sound.com',
      phone: '+1 (555) 882-9901',
      vipTier: 'PRO',
      rewardDelta: -16,
      rewardBalance: 810,
    },
    staff: {
      id: 'STAFF-104',
      name: 'Sarah Jenkins',
      shiftId: 'SHIFT #104',
      role: 'Store Mgr',
    },
    channel: 'POS Register 01 (Front Left)',
    terminalId: 'TER-DF04-L1',
    terminalName: 'Downtown Flagship · Lane 01',
    items: [
      {
        id: 'ITM-09',
        name: 'Electric Gooseneck Kettle (Defect Heating Element)',
        sku: 'KTL-ELEC-BLK',
        quantity: 1,
        unitPrice: 146.8,
        subtotal: 146.8,
      },
    ],
    itemsSummary: '1 item: Electric Gooseneck Kettle (Defect)',
    skuSummary: 'SKU: KTL-ELEC-BLK',
    tender: {
      type: 'reversal',
      label: 'Reversal MC ··1190',
      cardLast4: '1190',
      cardBrand: 'Mastercard World',
      authCode: 'REV-88170',
      stan: '0092815',
      traceId: '20241028-DF04-8817-REV',
    },
    tax: -18.2,
    taxLabel: '-$18.20 Tax',
    discount: 0,
    discountLabel: 'Reversed',
    subtotal: -146.8,
    totalNet: -165.0,
    status: 'REFUNDED',
    shiftNote:
      'Defective kettle base RMA #9983 approved by store manager. 100% refund credited back to Mastercard card ending 1190.',
  },
  {
    id: 'TRX-10487',
    receiptNumber: '8816',
    source: 'Counter',
    timestamp: new Date(Date.now() - 1000 * 60 * 189).toISOString(),
    displayDate: 'Today',
    displayTime: '11:58',
    customer: {
      id: 'CUST-005',
      name: 'Chloe Henderson',
      isWalkIn: false,
      email: 'chloe.h@horizon-capital.com',
      phone: '+1 (555) 919-4402',
      vipTier: 'PLATINUM',
      rewardDelta: 0,
      rewardBalance: 2400,
    },
    staff: {
      id: 'STAFF-108',
      name: 'Marcus Brody',
      shiftId: 'SHIFT #108',
      role: 'Senior Cashier',
    },
    channel: 'POS Register 02 (Speed Counter)',
    terminalId: 'TER-DF04-L2',
    terminalName: 'Downtown Flagship · Speed Lane 02',
    items: [
      {
        id: 'ITM-10',
        name: 'Espresso Dark Roast Whole Bean 500g',
        sku: 'ESP-RST-500',
        quantity: 3,
        unitPrice: 28.0,
        subtotal: 84.0,
      },
      {
        id: 'ITM-11',
        name: 'Madagascar Vanilla Syrup 750ml',
        sku: 'SYR-VAN-01',
        quantity: 2,
        unitPrice: 17.0,
        subtotal: 34.0,
      },
    ],
    itemsSummary: '5 items: Espresso Roast (x3), Syrup Pack',
    skuSummary: 'SKU: ESP-RST-500, SYR-VAN-01',
    tender: {
      type: 'mastercard',
      label: 'Mastercard ··9821',
      cardLast4: '9821',
      cardBrand: 'Mastercard Elite',
      authCode: 'VOID-7729',
      stan: '0092814',
      traceId: '20241028-DF04-8816-VOID',
    },
    tax: 8.9,
    taxLabel: '+$8.90 Tax',
    discount: 12.0,
    discountLabel: '-$12.00 VIP',
    subtotal: 118.0,
    totalNet: 114.9,
    status: 'VOIDED',
    shiftNote:
      'Customer realized card was expiring today and declined transaction before pinpad authorization. Session voided by supervisor.',
  },
  {
    id: 'TRX-10486',
    receiptNumber: '8815',
    source: 'Cancelled',
    timestamp: new Date(Date.now() - 1000 * 60 * 217).toISOString(),
    displayDate: 'Today',
    displayTime: '11:30',
    customer: {
      name: 'Walk-in Customer',
      isWalkIn: true,
    },
    staff: {
      id: 'STAFF-104',
      name: 'Sarah Jenkins',
      shiftId: 'SHIFT #104',
      role: 'Store Mgr',
    },
    channel: 'POS Register 01 (Front Left)',
    terminalId: 'TER-DF04-L1',
    terminalName: 'Downtown Flagship · Lane 01',
    items: [
      {
        id: 'ITM-12',
        name: 'Travel Tumbler 16oz Matte Ceramic',
        sku: 'TMB-16-MAT',
        quantity: 1,
        unitPrice: 24.0,
        subtotal: 24.0,
      },
    ],
    itemsSummary: '1 item: Travel Tumbler 16oz',
    skuSummary: 'SKU: TMB-16-MAT',
    tender: {
      type: 'none',
      label: 'None (Void)',
      authCode: 'NO-TENDER',
      stan: '0092813',
      traceId: '20241028-DF04-8815-VOID',
    },
    tax: 0.0,
    taxLabel: '$0.00 Tax',
    discount: 0,
    discountLabel: 'Voided',
    subtotal: 24.0,
    totalNet: 24.0,
    status: 'VOIDED',
    shiftNote: 'Accidental barcode scan by cashier trainee. Item immediately voided from ledger.',
  },
  // Additional realistic transactions to power filters, pagination, date presets, and KPIs
  {
    id: 'TRX-10485',
    receiptNumber: '8814',
    source: 'Local',
    timestamp: new Date(Date.now() - 1000 * 60 * 260).toISOString(),
    displayDate: 'Today',
    displayTime: '10:45',
    customer: {
      id: 'CUST-006',
      name: 'Samantha Reed',
      email: 's.reed@urban-arch.co',
      phone: '+1 (555) 604-1294',
      vipTier: 'GOLD VIP',
      rewardDelta: 21,
      rewardBalance: 1190,
    },
    staff: {
      id: 'STAFF-112',
      name: 'Elena Rostova',
      shiftId: 'SHIFT #112',
      role: 'Shift Lead',
    },
    channel: 'POS Register 01 (Front Left)',
    terminalId: 'TER-DF04-L1',
    terminalName: 'Downtown Flagship · Lane 01',
    items: [
      {
        id: 'ITM-13',
        name: 'AeroPress Coffee Maker XL',
        sku: 'AER-MAK-XL',
        quantity: 1,
        unitPrice: 62.0,
        subtotal: 62.0,
      },
      {
        id: 'ITM-14',
        name: 'Specialty Filter Micro-pack',
        sku: 'FLT-MIC-350',
        quantity: 2,
        unitPrice: 9.5,
        subtotal: 19.0,
      },
    ],
    itemsSummary: '3 items: AeroPress XL, Filter Pack (x2)',
    skuSummary: 'SKU: AER-MAK-XL, FLT-MIC-350',
    tender: {
      type: 'visa',
      label: 'Visa ····1920',
      cardLast4: '1920',
      cardBrand: 'Visa Signature',
      authCode: '772910',
      stan: '0092812',
      traceId: '20241028-DF04-8814-POS1',
    },
    tax: 6.8,
    taxLabel: '+$6.80 Tax',
    discount: 5.0,
    discountLabel: '-$5.00 VIP',
    subtotal: 81.0,
    totalNet: 82.8,
    status: 'COMPLETED',
  },
  {
    id: 'TRX-10484',
    receiptNumber: '8813',
    source: 'Counter',
    timestamp: new Date(Date.now() - 1000 * 60 * 310).toISOString(),
    displayDate: 'Today',
    displayTime: '09:55',
    customer: {
      name: 'Walk-in Customer',
      isWalkIn: true,
    },
    staff: {
      id: 'STAFF-108',
      name: 'Marcus Brody',
      shiftId: 'SHIFT #108',
      role: 'Senior Cashier',
    },
    channel: 'POS Register 02 (Speed Counter)',
    terminalId: 'TER-DF04-L2',
    terminalName: 'Downtown Flagship · Speed Lane 02',
    items: [
      {
        id: 'ITM-15',
        name: 'Colombia Geisha Reserve 200g',
        sku: 'COL-GSH-200',
        quantity: 1,
        unitPrice: 42.0,
        subtotal: 42.0,
      },
    ],
    itemsSummary: '1 item: Colombia Geisha Reserve',
    skuSummary: 'SKU: COL-GSH-200',
    tender: {
      type: 'cash',
      label: 'Cash',
      authCode: 'CASH-DRAWER-02',
      stan: '0092811',
      traceId: '20241028-DF04-8813-POS2',
    },
    tax: 3.4,
    taxLabel: '+$3.40 Tax',
    discount: 0,
    discountLabel: '$0.00 Disc',
    subtotal: 42.0,
    totalNet: 45.4,
    status: 'COMPLETED',
  },
  {
    id: 'TRX-10483',
    receiptNumber: '8812',
    source: 'Online',
    timestamp: new Date(Date.now() - 1000 * 60 * 370).toISOString(),
    displayDate: 'Today',
    displayTime: '08:55',
    customer: {
      id: 'CUST-007',
      name: 'Mateo Rossi',
      email: 'm.rossi@caffe-studio.com',
      phone: '+1 (555) 712-9903',
      vipTier: 'GOLD VIP',
      rewardDelta: 45,
      rewardBalance: 3100,
    },
    staff: {
      id: 'SYS-BOT',
      name: 'System Dispatch',
      shiftId: 'DISPATCH #01',
      role: 'Automated Bot',
    },
    channel: 'Direct Dispatch (B2B)',
    terminalId: 'B2B-DISP-01',
    terminalName: 'B2B Commercial Warehouse',
    items: [
      {
        id: 'ITM-16',
        name: 'Commercial Wholesale Espresso Beans 5kg',
        sku: 'WHL-ESP-5KG',
        quantity: 2,
        unitPrice: 195.0,
        subtotal: 390.0,
      },
    ],
    itemsSummary: '2 items: Wholesale Espresso 5kg (x2)',
    skuSummary: 'SKU: WHL-ESP-5KG',
    tender: {
      type: 'mastercard',
      label: 'Mastercard ··4012',
      cardLast4: '4012',
      cardBrand: 'Mastercard Corporate',
      authCode: 'B2B-99812',
      stan: '0092810',
      traceId: '20241028-B2B-8812-INV',
    },
    tax: 32.2,
    taxLabel: '+$32.20 Tax',
    discount: 25.0,
    discountLabel: '-$25.00 B2B',
    subtotal: 390.0,
    totalNet: 397.2,
    status: 'COMPLETED',
  },
  // Yesterday's Transactions
  {
    id: 'TRX-10482',
    receiptNumber: '8811',
    source: 'Local',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    displayDate: 'Yesterday',
    displayTime: '16:40',
    customer: {
      id: 'CUST-008',
      name: 'Hannah Brooks',
      email: 'h.brooks@gmail.com',
      phone: '+1 (555) 234-8891',
    },
    staff: {
      id: 'STAFF-112',
      name: 'Elena Rostova',
      shiftId: 'SHIFT #112',
    },
    channel: 'POS Register 01 (Front Left)',
    terminalId: 'TER-DF04-L1',
    terminalName: 'Downtown Flagship · Lane 01',
    items: [
      {
        id: 'ITM-17',
        name: 'Double-walled Glass Cups Set of 2',
        sku: 'ACC-GLS-SET',
        quantity: 2,
        unitPrice: 28.0,
        subtotal: 56.0,
      },
    ],
    itemsSummary: '2 items: Glass Cups Set of 2 (x2)',
    skuSummary: 'SKU: ACC-GLS-SET',
    tender: {
      type: 'visa',
      label: 'Visa ····3319',
      cardLast4: '3319',
    },
    tax: 4.6,
    taxLabel: '+$4.60 Tax',
    discount: 0,
    discountLabel: '$0.00 Disc',
    subtotal: 56.0,
    totalNet: 60.6,
    status: 'COMPLETED',
  },
  {
    id: 'TRX-10481',
    receiptNumber: '8810',
    source: 'Counter',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    displayDate: 'Yesterday',
    displayTime: '14:20',
    customer: {
      name: 'Walk-in Customer',
      isWalkIn: true,
    },
    staff: {
      id: 'STAFF-108',
      name: 'Marcus Brody',
      shiftId: 'SHIFT #108',
    },
    channel: 'POS Register 02 (Speed Counter)',
    terminalId: 'TER-DF04-L2',
    terminalName: 'Downtown Flagship · Speed Lane 02',
    items: [
      {
        id: 'ITM-18',
        name: 'Matcha Ceremonial Grade Tin 50g',
        sku: 'TEA-MAT-050',
        quantity: 1,
        unitPrice: 34.0,
        subtotal: 34.0,
      },
    ],
    itemsSummary: '1 item: Matcha Ceremonial Grade 50g',
    skuSummary: 'SKU: TEA-MAT-050',
    tender: {
      type: 'cash',
      label: 'Cash',
    },
    tax: 2.8,
    taxLabel: '+$2.80 Tax',
    discount: 0,
    discountLabel: '$0.00 Disc',
    subtotal: 34.0,
    totalNet: 36.8,
    status: 'COMPLETED',
  },
  {
    id: 'TRX-10480',
    receiptNumber: '8809',
    source: 'Online',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    displayDate: 'Yesterday',
    displayTime: '12:10',
    customer: {
      id: 'CUST-009',
      name: 'Derek Vance',
      email: 'derek.v@apex-capital.com',
    },
    staff: {
      id: 'SYS-BOT',
      name: 'System Dispatch',
    },
    channel: 'Online Store (Click & Collect)',
    terminalId: 'WEB-ORDER-99',
    terminalName: 'E-Commerce Dispatch Hub',
    items: [
      {
        id: 'ITM-19',
        name: 'Manual Hand Coffee Grinder Wood/Steel',
        sku: 'GRD-MAN-WD',
        quantity: 1,
        unitPrice: 89.0,
        subtotal: 89.0,
      },
    ],
    itemsSummary: '1 item: Manual Hand Coffee Grinder',
    skuSummary: 'SKU: GRD-MAN-WD',
    tender: {
      type: 'apple_pay',
      label: 'Apple Pay',
    },
    tax: 7.3,
    taxLabel: '+$7.30 Tax',
    discount: 0,
    discountLabel: 'Free Ship',
    subtotal: 89.0,
    totalNet: 96.3,
    status: 'COMPLETED',
  },
  // Last 7 days transactions
  {
    id: 'TRX-10479',
    receiptNumber: '8808',
    source: 'Local',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    displayDate: '3 days ago',
    displayTime: '15:10',
    customer: {
      id: 'CUST-010',
      name: 'Liam Zhang',
      email: 'l.zhang@techwave.io',
      vipTier: 'GOLD VIP',
    },
    staff: {
      id: 'STAFF-104',
      name: 'Sarah Jenkins',
    },
    channel: 'POS Register 01 (Front Left)',
    terminalId: 'TER-DF04-L1',
    terminalName: 'Downtown Flagship · Lane 01',
    items: [
      {
        id: 'ITM-20',
        name: 'Coffee Cupping Bowl Set of 4',
        sku: 'CUP-BWL-04',
        quantity: 1,
        unitPrice: 48.0,
        subtotal: 48.0,
      },
    ],
    itemsSummary: '1 item: Cupping Bowl Set (x4)',
    skuSummary: 'SKU: CUP-BWL-04',
    tender: {
      type: 'visa',
      label: 'Visa ····9920',
    },
    tax: 3.9,
    taxLabel: '+$3.90 Tax',
    discount: 5.0,
    discountLabel: '-$5.00 VIP',
    subtotal: 48.0,
    totalNet: 46.9,
    status: 'COMPLETED',
  },
  {
    id: 'TRX-10478',
    receiptNumber: '8807',
    source: 'Returned',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    displayDate: '4 days ago',
    displayTime: '11:05',
    customer: {
      id: 'CUST-011',
      name: 'Rachel Adams',
      email: 'rachel.a@designhouse.org',
    },
    staff: {
      id: 'STAFF-112',
      name: 'Elena Rostova',
    },
    channel: 'POS Register 01 (Front Left)',
    terminalId: 'TER-DF04-L1',
    terminalName: 'Downtown Flagship · Lane 01',
    items: [
      {
        id: 'ITM-21',
        name: 'Cold Drip Tower Glass Column',
        sku: 'CLD-DRP-TWR',
        quantity: 1,
        unitPrice: 210.0,
        subtotal: 210.0,
      },
    ],
    itemsSummary: '1 item: Cold Drip Tower (Cracked Base)',
    skuSummary: 'SKU: CLD-DRP-TWR',
    tender: {
      type: 'reversal',
      label: 'Reversal MC ··7712',
    },
    tax: -17.3,
    taxLabel: '-$17.30 Tax',
    discount: 0,
    discountLabel: 'Reversed',
    subtotal: -210.0,
    totalNet: -227.3,
    status: 'REFUNDED',
  },
  {
    id: 'TRX-10477',
    receiptNumber: '8806',
    source: 'Counter',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    displayDate: '5 days ago',
    displayTime: '17:30',
    customer: {
      name: 'Walk-in Customer',
      isWalkIn: true,
    },
    staff: {
      id: 'STAFF-108',
      name: 'Marcus Brody',
    },
    channel: 'POS Register 02 (Speed Counter)',
    terminalId: 'TER-DF04-L2',
    terminalName: 'Downtown Flagship · Speed Lane 02',
    items: [
      {
        id: 'ITM-22',
        name: 'Stainless Milk Pitcher 600ml',
        sku: 'ACC-PIT-600',
        quantity: 2,
        unitPrice: 22.0,
        subtotal: 44.0,
      },
    ],
    itemsSummary: '2 items: Milk Pitcher 600ml (x2)',
    skuSummary: 'SKU: ACC-PIT-600',
    tender: {
      type: 'cash',
      label: 'Cash',
    },
    tax: 3.6,
    taxLabel: '+$3.60 Tax',
    discount: 0,
    discountLabel: '$0.00 Disc',
    subtotal: 44.0,
    totalNet: 47.6,
    status: 'COMPLETED',
  },
  {
    id: 'TRX-10476',
    receiptNumber: '8805',
    source: 'Local',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 140).toISOString(),
    displayDate: '5 days ago',
    displayTime: '14:15',
    customer: {
      id: 'CUST-012',
      name: 'Ethan Cole',
      email: 'e.cole@summit-agency.com',
    },
    staff: {
      id: 'STAFF-104',
      name: 'Sarah Jenkins',
    },
    channel: 'POS Register 01 (Front Left)',
    terminalId: 'TER-DF04-L1',
    terminalName: 'Downtown Flagship · Lane 01',
    items: [
      {
        id: 'ITM-23',
        name: 'Guatemala Huehuetenango Washed 250g',
        sku: 'GUA-HUE-250',
        quantity: 2,
        unitPrice: 19.5,
        subtotal: 39.0,
      },
      {
        id: 'ITM-24',
        name: 'Cascara Coffee Cherry Tea 100g',
        sku: 'TEA-CAS-100',
        quantity: 1,
        unitPrice: 16.0,
        subtotal: 16.0,
      },
    ],
    itemsSummary: '3 items: Guatemala Beans (x2), Cascara Tea',
    skuSummary: 'SKU: GUA-HUE-250, TEA-CAS-100',
    tender: {
      type: 'visa',
      label: 'Visa ····5512',
    },
    tax: 4.5,
    taxLabel: '+$4.50 Tax',
    discount: 0,
    discountLabel: '$0.00 Disc',
    subtotal: 55.0,
    totalNet: 59.5,
    status: 'COMPLETED',
  },
];

export interface ISalesService {
  getSales(query: SalesFilterQuery): Promise<SalesQueryResult>;
  getSale(id: string): Promise<SalesTransaction | null>;
}

export class MockSalesService implements ISalesService {
  private transactions: SalesTransaction[] = [...INITIAL_MOCK_SALES];

  async getSales(query: SalesFilterQuery): Promise<SalesQueryResult> {
    // Simulate brief deterministic latency
    await new Promise((resolve) => setTimeout(resolve, 60));

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;
    const last7DaysStart = todayStart - 6 * 24 * 60 * 60 * 1000;
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    // 1. Filter by Date Range
    let filtered = this.transactions.filter((tx) => {
      const txTime = new Date(tx.timestamp).getTime();

      switch (query.dateRange) {
        case 'today':
          return txTime >= todayStart;
        case 'yesterday':
          return txTime >= yesterdayStart && txTime < todayStart;
        case 'last7days':
          return txTime >= last7DaysStart;
        case 'monthToDate':
          return txTime >= monthStart;
        case 'custom':
          if (query.customStartDate && query.customEndDate) {
            const start = new Date(query.customStartDate).getTime();
            const end = new Date(query.customEndDate).getTime() + 24 * 60 * 60 * 1000 - 1;
            return txTime >= start && txTime <= end;
          }
          return true;
        default:
          return true;
      }
    });

    // 2. Filter by Register / Channel
    if (query.channel && query.channel !== 'All Channels (Unified)') {
      filtered = filtered.filter((tx) => {
        if (query.channel === 'POS Register 01 (Front Left)') return tx.channel.includes('Register 01');
        if (query.channel === 'POS Register 02 (Speed Counter)') return tx.channel.includes('Register 02');
        if (query.channel === 'Online Store (Click & Collect)') return tx.channel.includes('Online Store');
        if (query.channel === 'Direct Dispatch (B2B)') return tx.channel.includes('Direct Dispatch');
        return tx.channel === query.channel;
      });
    }

    // 3. Filter by Payment Method
    if (query.paymentMethod && query.paymentMethod !== 'All Tender Methods') {
      filtered = filtered.filter((tx) => {
        if (query.paymentMethod === 'Visa / Mastercard') {
          return tx.tender.type === 'visa' || tx.tender.type === 'mastercard';
        }
        if (query.paymentMethod === 'Cash Drawer') {
          return tx.tender.type === 'cash';
        }
        if (query.paymentMethod === 'Split Tender (Multi-Pay)') {
          return tx.tender.type === 'split';
        }
        if (query.paymentMethod === 'Omni Gift Card / Points') {
          return tx.tender.type === 'apple_pay' || tx.customer.vipTier === 'GOLD VIP';
        }
        return true;
      });
    }

    // 4. Filter by Order Status
    if (query.status && query.status !== 'All Statuses') {
      filtered = filtered.filter((tx) => {
        if (query.status === 'Completed') return tx.status === 'COMPLETED';
        if (query.status === 'Partially Refunded') return tx.status === 'PARTIAL_REFUND';
        if (query.status === 'Refunded (Full)') return tx.status === 'REFUNDED';
        if (query.status === 'Voided Terminal Session') return tx.status === 'VOIDED';
        return true;
      });
    }

    // 5. Filter by Cashier on Duty
    if (query.cashier && query.cashier !== 'All Personnel') {
      filtered = filtered.filter((tx) => {
        if (query.cashier.includes('Sarah Jenkins')) return tx.staff.name.includes('Sarah Jenkins');
        if (query.cashier.includes('Marcus Brody')) return tx.staff.name.includes('Marcus Brody');
        if (query.cashier.includes('Elena Rostova')) return tx.staff.name.includes('Elena Rostova');
        if (query.cashier.includes('System Automation')) return tx.staff.name.includes('System');
        return tx.staff.name === query.cashier;
      });
    }

    // 6. Search Filter (customer, transaction ID, or SKU)
    if (query.searchQuery.trim()) {
      const q = query.searchQuery.trim().toLowerCase();
      filtered = filtered.filter((tx) => {
        return (
          tx.id.toLowerCase().includes(q) ||
          tx.receiptNumber.toLowerCase().includes(q) ||
          tx.customer.name.toLowerCase().includes(q) ||
          (tx.customer.email && tx.customer.email.toLowerCase().includes(q)) ||
          tx.skuSummary.toLowerCase().includes(q) ||
          tx.items.some((i) => i.sku.toLowerCase().includes(q) || i.name.toLowerCase().includes(q))
        );
      });
    }

    // Compute dynamic KPI metrics on the entire filtered dataset (before pagination)
    const kpis = this.calculateKpis(filtered);

    // 7. Pagination
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / query.pageSize) || 1;
    const validPage = Math.min(Math.max(1, query.page), totalPages);
    const startIndex = (validPage - 1) * query.pageSize;
    const paginatedTransactions = filtered.slice(startIndex, startIndex + query.pageSize);

    return {
      transactions: paginatedTransactions,
      totalCount,
      page: validPage,
      pageSize: query.pageSize,
      totalPages,
      kpis,
    };
  }

  async getSale(id: string): Promise<SalesTransaction | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return this.transactions.find((t) => t.id === id) || null;
  }

  private calculateKpis(transactions: SalesTransaction[]): SalesKpiSummary {
    let salesTotal = 0;
    let recordedSalesCount = 0;
    let cashBalance = 0;
    let cardAndDigital = 0;
    let cardCount = 0;
    let contactlessCount = 0;
    let returnsAndVoids = 0;
    let refundEvents = 0;

    for (const tx of transactions) {
      if (tx.status === 'COMPLETED' || tx.status === 'PARTIAL_REFUND') {
        salesTotal += tx.totalNet;
        recordedSalesCount += 1;

        if (tx.tender.type === 'cash') {
          cashBalance += tx.totalNet;
        } else if (tx.tender.type === 'split') {
          cashBalance += 32.0; // split portion
          cardAndDigital += 50.0;
          cardCount += 1;
        } else if (tx.tender.type === 'visa' || tx.tender.type === 'mastercard') {
          cardAndDigital += tx.totalNet;
          cardCount += 1;
        } else if (tx.tender.type === 'apple_pay') {
          cardAndDigital += tx.totalNet;
          contactlessCount += 1;
        }
      } else if (tx.status === 'REFUNDED') {
        // Negative amount
        returnsAndVoids += Math.abs(tx.totalNet);
        refundEvents += 1;
        if (tx.tender.type === 'cash') {
          cashBalance -= Math.abs(tx.totalNet);
        }
      } else if (tx.status === 'VOIDED') {
        returnsAndVoids += Math.abs(tx.totalNet);
        refundEvents += 1;
      }
    }

    const totalVolume = Math.max(1, cashBalance + cardAndDigital);
    const cashVolPct = Math.round((cashBalance / totalVolume) * 1000) / 10;
    const cardVolPct = Math.round((cardAndDigital / totalVolume) * 1000) / 10;
    const returnRatePct =
      salesTotal > 0
        ? Math.round((returnsAndVoids / (salesTotal + returnsAndVoids)) * 1000) / 10
        : 0;

    return {
      filteredSalesTotal: salesTotal,
      recordedSalesCount: recordedSalesCount,
      vsYesterdayPct: 8.4,
      cashDrawerBalance: Math.max(0, cashBalance),
      cashVolumePct: cashVolPct > 0 ? cashVolPct : 30.7,
      cardAndDigitalTender: cardAndDigital,
      cardCount: Math.max(1, cardCount),
      contactlessCount: Math.max(0, contactlessCount),
      cardVolumePct: cardVolPct > 0 ? cardVolPct : 65.8,
      totalReturnsAndVoids: -Math.abs(returnsAndVoids),
      refundEventsCount: refundEvents,
      returnRatePct: returnRatePct > 0 ? returnRatePct : 3.4,
    };
  }
}

export const salesService = new MockSalesService();
