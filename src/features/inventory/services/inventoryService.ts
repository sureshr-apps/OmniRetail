import {
  InventoryItem,
  InventoryQuery,
  InventoryQueryResult,
  InventoryStatus,
  StockAdjustmentInput,
  InventoryLocation,
  SupplierSummary,
  InventoryKpiSummary,
  InventoryTabCounts,
} from '../types';
import { getCurrentUserAuthorization, listTenantInventory } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { productService } from '@/features/products/services/productService';
import { outletService } from '@/features/outlets/services/outletService';
import { formatOutletCode } from '@/features/outlets/utils/formatOutletCode';
import { supplierService } from '@/features/suppliers/services/supplierService';
import { formatSupplierCode } from '@/features/suppliers/utils/formatSupplierCode';

export async function getInventoryLocations(): Promise<InventoryLocation[]> {
  const outlets = await outletService.getAllActiveOutlets();
  return [
    { id: 'all', name: 'All Locations', code: 'ALL', subLabel: 'All active outlets' },
    ...outlets.map((outlet) => ({ id: outlet.id, name: outlet.name, code: formatOutletCode(outlet.outletCode), subLabel: formatOutletCode(outlet.outletCode) })),
  ];
}

export async function getInventorySuppliers(): Promise<SupplierSummary[]> {
  const result = await supplierService.getSuppliers({ page: 1, pageSize: 1000 });
  return [
    { id: 'all', name: 'All Suppliers', code: 'ALL' },
    ...result.items.map((supplier) => ({ id: supplier.id, name: supplier.name, code: formatSupplierCode(supplier.supplierCode) })),
  ];
}

/**
 * Deterministic derived stock status rule as mandated by specification:
 * - Out of Stock: onHandQty === 0
 * - Low Stock: onHandQty > 0 && onHandQty <= reorderLevel
 * - Overstocked: onHandQty >= overstockThreshold
 * - In Stock: otherwise
 */
export function deriveStockStatus(
  onHandQty: number,
  reorderLevel: number,
  overstockThreshold: number
): InventoryStatus {
  if (onHandQty === 0) {
    return 'OUT_OF_STOCK';
  }
  if (onHandQty > 0 && onHandQty <= reorderLevel) {
    return 'LOW_STOCK';
  }
  if (onHandQty >= overstockThreshold) {
    return 'OVERSTOCKED';
  }
  return 'IN_STOCK';
}

/**
 * Margin calculation: ((retailPrice - cost) / retailPrice) * 100
 */
export function calculateMarginPercent(retailPrice: number, cost: number): number {
  if (retailPrice <= 0) return 0;
  const margin = ((retailPrice - cost) / retailPrice) * 100;
  return Math.round(margin * 10) / 10;
}

// Initial mock dataset strictly populated with items from the approved Stitch design
const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-001',
    sku: 'SKU-8821',
    barcode: '0849201948',
    name: 'Ethiopian Yirgacheffe Beans 1kg',
    department: 'Coffee',
    category: 'Whole Bean',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1p_8_TteHlkH-R33KbUyUaB_5G6UXgudfpGYwz1hfvp5vyRb3TRiDEPIRDSDS8TGrRkeMLA9MLzup3k9P19ePyJA8oYmAgWf5ht3fjKG3Eb8hGmH6TtMzM-LaNWB-CfWYbFKpK3AZqJiAqkz6Nze01HGIu5z7uZnWskLzTdsvX2WPmlijOHASUZN6hQKEcUD26gd7LaU7KQsorUmMVPJnqOXiThehKzHhrOlnu0ZiigvT7ST_CpM',
    imageAlt: 'Ethiopian Yirgacheffe Beans 1kg bag',
    locationId: 'store-01',
    locationName: 'Downtown Flagship - Store #01',
    binRack: 'Shelf A2',
    supplierId: 'sup-ethiopia',
    supplierName: 'Addis Highland Exports',
    onHandQty: 3,
    reorderLevel: 10,
    overstockThreshold: 100,
    mrp: 24.0,
    cost: 11.5,
    retailPrice: 22.0,
    lotNumber: 'Lot #2024-ETH-09',
    recentMovements: [
      {
        id: 'MOV-101',
        type: 'sale',
        title: 'Sale Receipt #POS-9812',
        subtitle: 'Terminal 01 • Cashier: Alex K. • 12 mins ago',
        timeAgo: '12 mins ago',
        delta: -2,
        balanceAfter: 3,
      },
      {
        id: 'MOV-102',
        type: 'purchase_order',
        title: 'PO Receipt #PO-2024-044',
        subtitle: 'Whse Inbound • Verified by Sarah J. • Yesterday',
        timeAgo: 'Yesterday',
        delta: 25,
        balanceAfter: 5,
      },
      {
        id: 'MOV-103',
        type: 'adjustment',
        title: 'Manual Adjustment - Spoilage',
        subtitle: 'Expired test roast lot #2023-B • 3 days ago',
        timeAgo: '3 days ago',
        delta: -1,
        balanceAfter: 20,
      },
    ],
  },
  {
    id: 'INV-002',
    sku: 'SKU-4402',
    barcode: '0718293041',
    name: 'Pro 58mm Portafilter Wood Handle',
    department: 'Equipment',
    category: 'Brewing Tools',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRk2cxThX5YhmS5KmctbRlGiUbA0poiHV3kBLIZcKeQAZUBswN2YZoh6YS0JgBz6KCakmaNPQTx1V6l6OYjkavZ6ONhUlUAim1pwkOXJ9dp_hg2NAZZZgv7YamcW-m9q8SKfqR-M1RxG9LE4tatNvWS-WLD6w_YJ_IGpH8KRqgt_mNu0GEFbXIZhYXM4wHsOcRsy8yI62bMyvP1EboE1zsXeTGM5R8GxWaSoclRGqlM3NFyl5EE_I',
    imageAlt: 'Pro 58mm Portafilter with wooden handle',
    locationId: 'store-01',
    locationName: 'Downtown Flagship - Store #01',
    binRack: 'Bin B4',
    supplierId: 'sup-barista',
    supplierName: 'Barista Precision Tools',
    onHandQty: 158,
    reorderLevel: 20,
    overstockThreshold: 300,
    mrp: 85.0,
    cost: 38.0,
    retailPrice: 75.0,
    badgeMetadata: 'Precision Series',
  },
  {
    id: 'INV-003',
    sku: 'SKU-9104',
    barcode: '0923841059',
    name: 'Compostable Hot Cups 12oz (Case 500)',
    department: 'Packaging',
    category: 'Drinkware',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDE74q5v3bwfc_LFaii4RWfNSGIxXplzpDCQAyYVjQ4wOd_TS4OPeofDRmgkgzVh2bqyRr7RRo6rUoflLbNEe1l1dgMvh_JBG0rOhfqKKI_A3x0Ofzq-4b3_UtM36Ze0NdPNBF2cdNNeo6bdbAiVieyIA2hS5wwDP0UJsHdGixiHwmLmXpplkBl5rvRbPnZNY-smfVYys_NPI0MDgV3QPtHT-D1v_9XuuhNirxQQQ2XkUWmd0sQgGs',
    imageAlt: 'Compostable kraft paper cups',
    locationId: 'whse-central',
    locationName: 'Central Warehouse',
    binRack: 'Bay 01',
    supplierId: 'sup-eco',
    supplierName: 'EcoPack Global Solutions',
    onHandQty: 0,
    reorderLevel: 15,
    overstockThreshold: 100,
    mrp: 75.0,
    cost: 42.0,
    retailPrice: 68.0,
    badgeMetadata: 'Out of Stock',
  },
  {
    id: 'INV-004',
    sku: 'SKU-3190',
    barcode: '0112938491',
    name: 'Artisan Bourbon Vanilla Syrup 750ml',
    department: 'Pantry',
    category: 'Syrups',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKCkQ_XTMevGnnXIZqc6Mxd23gdFagdcLUUVgfhjMDQKm6HKybCtSJ0U3Q8SF2askkrCL7PA_U6IQpEaP86tfsjBJQf8KmRvZ8_az92rVcbJ2OtWEM_gckDcoPaop6GXPG1wf2PwNVjFsazA9qthgK_IbTI-CoKURDjpC_dmaBMBJbaCKNv77kzTgGpQa6AtyFwkNX67cYZ4gV-IP3689MVMAZOp9McdGu_DaTmx8AxfKN2clOE-M',
    imageAlt: 'Artisan Bourbon Vanilla Syrup 750ml',
    locationId: 'store-01',
    locationName: 'Downtown Flagship - Store #01',
    binRack: 'Pantry Rack',
    supplierId: 'sup-syrup',
    supplierName: 'Artisan Culinary Extracts',
    onHandQty: 18,
    reorderLevel: 12,
    overstockThreshold: 80,
    mrp: 16.0,
    cost: 6.2,
    retailPrice: 14.5,
    incomingPurchaseOrder: 'PO #1089 In Transit',
  },
  {
    id: 'INV-005',
    sku: 'SKU-7734',
    barcode: '0492817290',
    name: 'Digital Variable Gooseneck Kettle 0.9L',
    department: 'Equipment',
    category: 'Electrics',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAuV_mmuYloYrdWHfk-b0AfirVSlowrjsYf3_GaC5OTih1iju7Pjm3Hgn10r0I9q6963kD2h9MVQuUyhj3WH44ONr0SPQdtsy7d5Fj9IaBieufv3V6HZELLlfWCUfUPylNwZkoK3UXv1Wq2vDWJLX3eiPnFUuJ_cLbU-hVzfHETxe5f7M88lstO15GYZtdk7OajE7xavTI-PY_sc5GPWF6nIx1kAoZnwbbdU9s_lWCUreytMjgqLOM',
    imageAlt: 'Digital variable temperature gooseneck kettle',
    locationId: 'store-01',
    locationName: 'Downtown Flagship - Store #01',
    binRack: 'Showcase Shelf',
    supplierId: 'sup-appliances',
    supplierName: 'Nordic Brew Equipment Corp',
    onHandQty: 30,
    reorderLevel: 10,
    overstockThreshold: 150,
    mrp: 155.0,
    cost: 72.5,
    retailPrice: 139.0,
    badgeMetadata: 'Serial Tracking',
  },
  {
    id: 'INV-006',
    sku: 'SKU-2051',
    barcode: '0681928312',
    name: 'V60 Microfine Paper Filters (100pk)',
    department: 'Packaging',
    category: 'Filters',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3QG-K1k7kemTvm1L1Syi6_jLwl68-EN74XGhYC-ymGQsnwBCHq8G1pguoabKb4S0qNLJOeZtvUp6UZdDVtd7mZswbZk0IyleV68-byr8ScIrBsZF-OZyUP0FIBs-xhfa6-HxUooaNzWDRkrLjyqTC_GcmgFrLRyz-rfC2i_lXm0zazt3FH4OYzF7jSlhWNDSYsOMMYBuSiBxeaCCKu453eiJ3l9TO6UwlqOtaYMdRNaFfU2gYRRA',
    imageAlt: 'V60 Microfine Paper Filters',
    locationId: 'whse-central',
    locationName: 'Central Warehouse',
    binRack: 'Pallet 09',
    supplierId: 'sup-eco',
    supplierName: 'EcoPack Global Solutions',
    onHandQty: 484,
    reorderLevel: 50,
    overstockThreshold: 400,
    mrp: 8.5,
    cost: 2.8,
    retailPrice: 7.0,
    badgeMetadata: 'Fast Mover',
  },
  {
    id: 'INV-007',
    sku: 'SKU-8845',
    barcode: '0849204412',
    name: 'Colombia Huila Reserve Whole Bean 250g',
    department: 'Coffee',
    category: 'Whole Bean',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBfZcSCqVOOR8CbXR926htX9qmQ0ttX0w4TtMIeJmIfjrWjTnZDcWRd6mcvCC1I6Dxa1xhV7cPn4qleA-c9JeYokkigfO4uC0WNEg0D8ikXbbV_D-PlMAe5ReH7KRxJJy2g5vMkRg7aLUSiIR9hQfIrifMX8UCfH2ApNmFMpW7EofQYIKM-EjDP7EQcF8Ieo8cglRdG_zUSPfqmYKV9KCdoPSR3oiTKWn1X0UDy5PnJU_yySI8YBc',
    imageAlt: 'Colombia Huila Reserve Whole Bean 250g',
    locationId: 'store-01',
    locationName: 'Downtown Flagship - Store #01',
    binRack: 'Shelf A3',
    supplierId: 'sup-colombia',
    supplierName: 'Huila Growers Cooperative',
    onHandQty: 87,
    reorderLevel: 25,
    overstockThreshold: 200,
    mrp: 14.0,
    cost: 5.4,
    retailPrice: 12.5,
    lotNumber: 'Lot #2024-COL-18',
  },
  {
    id: 'INV-008',
    sku: 'SKU-1120',
    barcode: '0412893810',
    name: 'Precision Conical Burr Grinder',
    department: 'Equipment',
    category: 'Electrics',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAuV_mmuYloYrdWHfk-b0AfirVSlowrjsYf3_GaC5OTih1iju7Pjm3Hgn10r0I9q6963kD2h9MVQuUyhj3WH44ONr0SPQdtsy7d5Fj9IaBieufv3V6HZELLlfWCUfUPylNwZkoK3UXv1Wq2vDWJLX3eiPnFUuJ_cLbU-hVzfHETxe5f7M88lstO15GYZtdk7OajE7xavTI-PY_sc5GPWF6nIx1kAoZnwbbdU9s_lWCUreytMjgqLOM',
    imageAlt: 'Precision Burr Grinder',
    locationId: 'store-04',
    locationName: 'Store #04',
    binRack: 'Display Rack 2',
    supplierId: 'sup-appliances',
    supplierName: 'Nordic Brew Equipment Corp',
    onHandQty: 8,
    reorderLevel: 10,
    overstockThreshold: 50,
    mrp: 220.0,
    cost: 110.0,
    retailPrice: 195.0,
    incomingPurchaseOrder: 'PO #1092 In Transit',
  },
  {
    id: 'INV-009',
    sku: 'SKU-5509',
    barcode: '0981726351',
    name: 'Organic Oat Barista Blend 1L (Case 6)',
    department: 'Dairy & Plant',
    category: 'Plant Milk',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKCkQ_XTMevGnnXIZqc6Mxd23gdFagdcLUUVgfhjMDQKm6HKybCtSJ0U3Q8SF2askkrCL7PA_U6IQpEaP86tfsjBJQf8KmRvZ8_az92rVcbJ2OtWEM_gckDcoPaop6GXPG1wf2PwNVjFsazA9qthgK_IbTI-CoKURDjpC_dmaBMBJbaCKNv77kzTgGpQa6AtyFwkNX67cYZ4gV-IP3689MVMAZOp9McdGu_DaTmx8AxfKN2clOE-M',
    imageAlt: 'Organic Oat Milk Case',
    locationId: 'whse-central',
    locationName: 'Central Warehouse',
    binRack: 'Cold Store B',
    supplierId: 'sup-syrup',
    supplierName: 'Artisan Culinary Extracts',
    onHandQty: 0,
    reorderLevel: 20,
    overstockThreshold: 150,
    mrp: 32.0,
    cost: 16.0,
    retailPrice: 28.0,
    badgeMetadata: 'Cold Chain',
  },
  {
    id: 'INV-010',
    sku: 'SKU-6612',
    barcode: '0512894719',
    name: 'Stainless Steel Milk Frothing Pitcher 600ml',
    department: 'Equipment',
    category: 'Brewing Tools',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRk2cxThX5YhmS5KmctbRlGiUbA0poiHV3kBLIZcKeQAZUBswN2YZoh6YS0JgBz6KCakmaNPQTx1V6l6OYjkavZ6ONhUlUAim1pwkOXJ9dp_hg2NAZZZgv7YamcW-m9q8SKfqR-M1RxG9LE4tatNvWS-WLD6w_YJ_IGpH8KRqgt_mNu0GEFbXIZhYXM4wHsOcRsy8yI62bMyvP1EboE1zsXeTGM5R8GxWaSoclRGqlM3NFyl5EE_I',
    imageAlt: 'Milk Frothing Pitcher',
    locationId: 'store-04',
    locationName: 'Store #04',
    binRack: 'Bar Counter 1',
    supplierId: 'sup-barista',
    supplierName: 'Barista Precision Tools',
    onHandQty: 42,
    reorderLevel: 15,
    overstockThreshold: 60,
    mrp: 28.0,
    cost: 12.0,
    retailPrice: 24.5,
  },
  {
    id: 'INV-011',
    sku: 'SKU-9921',
    barcode: '0719284102',
    name: 'Guatemala Antigua Pastoral Whole Bean 1kg',
    department: 'Coffee',
    category: 'Whole Bean',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1p_8_TteHlkH-R33KbUyUaB_5G6UXgudfpGYwz1hfvp5vyRb3TRiDEPIRDSDS8TGrRkeMLA9MLzup3k9P19ePyJA8oYmAgWf5ht3fjKG3Eb8hGmH6TtMzM-LaNWB-CfWYbFKpK3AZqJiAqkz6Nze01HGIu5z7uZnWskLzTdsvX2WPmlijOHASUZN6hQKEcUD26gd7LaU7KQsorUmMVPJnqOXiThehKzHhrOlnu0ZiigvT7ST_CpM',
    imageAlt: 'Guatemala Antigua Pastoral Whole Bean 1kg',
    locationId: 'store-01',
    locationName: 'Downtown Flagship - Store #01',
    binRack: 'Shelf A1',
    supplierId: 'sup-colombia',
    supplierName: 'Huila Growers Cooperative',
    onHandQty: 4,
    reorderLevel: 12,
    overstockThreshold: 80,
    mrp: 26.0,
    cost: 12.0,
    retailPrice: 23.5,
    lotNumber: 'Lot #2024-GUA-05',
  },
  {
    id: 'INV-012',
    sku: 'SKU-3820',
    barcode: '0382910481',
    name: 'Double-Walled Borosilicate Glass Tumbler 350ml',
    department: 'Packaging',
    category: 'Drinkware',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDE74q5v3bwfc_LFaii4RWfNSGIxXplzpDCQAyYVjQ4wOd_TS4OPeofDRmgkgzVh2bqyRr7RRo6rUoflLbNEe1l1dgMvh_JBG0rOhfqKKI_A3x0Ofzq-4b3_UtM36Ze0NdPNBF2cdNNeo6bdbAiVieyIA2hS5wwDP0UJsHdGixiHwmLmXpplkBl5rvRbPnZNY-smfVYys_NPI0MDgV3QPtHT-D1v_9XuuhNirxQQQ2XkUWmd0sQgGs',
    imageAlt: 'Double Walled Glass Tumbler',
    locationId: 'store-04',
    locationName: 'Store #04',
    binRack: 'Retail Rack C',
    supplierId: 'sup-eco',
    supplierName: 'EcoPack Global Solutions',
    onHandQty: 520,
    reorderLevel: 50,
    overstockThreshold: 450,
    mrp: 22.0,
    cost: 7.5,
    retailPrice: 18.0,
    badgeMetadata: 'Overstocked',
  },
];

class MockInventoryService {
  private items: InventoryItem[] = [...INITIAL_INVENTORY];

  // Base total count scaling to simulate 1,428 catalog items
  private catalogVirtualCount = 1428;

  async getInventory(query: InventoryQuery = {}): Promise<InventoryQueryResult> {
    // Artificial latency for realism
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = [...this.items];

    // 1. Filter by Search (SKU, name, barcode, department, lotNumber)
    if (query.search && query.search.trim()) {
      const q = query.search.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.sku.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.barcode.includes(q) ||
          item.department.toLowerCase().includes(q) ||
          (item.lotNumber && item.lotNumber.toLowerCase().includes(q))
      );
    }

    // 2. Filter by Location
    if (query.locationId && query.locationId !== 'all') {
      filtered = filtered.filter((item) => item.locationId === query.locationId);
    }

    // 3. Filter by Supplier
    if (query.supplierId && query.supplierId !== 'all') {
      filtered = filtered.filter((item) => item.supplierId === query.supplierId);
    }

    // 4. Filter by Status Tab
    if (query.statusTab && query.statusTab !== 'ALL') {
      filtered = filtered.filter((item) => {
        const status = deriveStockStatus(
          item.onHandQty,
          item.reorderLevel,
          item.overstockThreshold
        );
        return status === query.statusTab;
      });
    }

    // 5. Sort
    filtered.sort((a, b) => {
      switch (query.sort) {
        case 'STOCK_ASC':
          return a.onHandQty - b.onHandQty;
        case 'STOCK_DESC':
          return b.onHandQty - a.onHandQty;
        case 'NAME_ASC':
          return a.name.localeCompare(b.name);
        case 'RETAIL_PRICE_ASC':
          return a.retailPrice - b.retailPrice;
        case 'RETAIL_PRICE_DESC':
          return b.retailPrice - a.retailPrice;
        case 'MARGIN_DESC': {
          const marginA = calculateMarginPercent(a.retailPrice, a.cost);
          const marginB = calculateMarginPercent(b.retailPrice, b.cost);
          return marginB - marginA;
        }
        default:
          return a.onHandQty - b.onHandQty; // Default to stock ascending
      }
    });

    // Derive tab counts from total active collection
    const tabCounts: InventoryTabCounts = {
      all: this.catalogVirtualCount,
      inStock: 1310,
      lowStock: 14,
      outOfStock: 4,
      overstocked: 8,
    };

    // Calculate dynamic in-memory tab counts
    let memLow = 0;
    let memOut = 0;
    let memOver = 0;
    let memIn = 0;
    for (const item of this.items) {
      const st = deriveStockStatus(item.onHandQty, item.reorderLevel, item.overstockThreshold);
      if (st === 'LOW_STOCK') memLow++;
      else if (st === 'OUT_OF_STOCK') memOut++;
      else if (st === 'OVERSTOCKED') memOver++;
      else memIn++;
    }

    // Base KPI stats dynamically computed
    let computedValuation = 0;
    const poSet = new Set<string>();
    for (const item of this.items) {
      computedValuation += item.onHandQty * item.cost;
      if (item.incomingPurchaseOrder) {
        poSet.add(item.incomingPurchaseOrder);
      }
    }

    // Scale valuation to realistic enterprise scale (₹184,250.00 base)
    const baseScaleFactor = 184250 / 21850;
    const totalValuation = Math.round(computedValuation * baseScaleFactor * 100) / 100;

    const kpis: InventoryKpiSummary = {
      totalValuation: totalValuation > 0 ? totalValuation : 184250.0,
      lowStockCount: Math.max(14, memLow),
      outOfStockCount: Math.max(4, memOut),
      incomingPoCount: Math.max(3, poSet.size),
    };

    // Pagination
    const page = query.page || 1;
    const pageSize = query.pageSize || 25;
    const totalFiltered = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

    return {
      items: paginatedItems,
      totalCount: this.catalogVirtualCount,
      filteredCount: totalFiltered,
      page,
      pageSize,
      totalPages: Math.max(58, totalPages), // Matching the "58" pages in Stitch design
      kpis,
      tabCounts,
    };
  }

  async getInventoryItem(id: string): Promise<InventoryItem | null> {
    const item = this.items.find((i) => i.id === id || i.sku === id);
    return item ? { ...item } : null;
  }

  async adjustStock(input: StockAdjustmentInput): Promise<{
    item: InventoryItem;
    previousQty: number;
    newQty: number;
  }> {
    await new Promise((resolve) => setTimeout(resolve, 60));

    const index = this.items.findIndex(
      (i) => i.id === input.itemId || i.sku === input.sku
    );
    if (index === -1) {
      throw new Error(`Item with SKU ${input.sku} not found`);
    }

    const currentItem = this.items[index];
    const previousQty = currentItem.onHandQty;
    let newQty = previousQty;

    if (input.mode === 'decrease') {
      newQty = Math.max(0, previousQty - input.quantity);
    } else if (input.mode === 'increase') {
      newQty = previousQty + input.quantity;
    } else if (input.mode === 'reconcile') {
      newQty = Math.max(0, input.quantity);
    }

    const delta = newQty - previousQty;

    const newLog = {
      id: `MOV-${Date.now()}`,
      type: 'adjustment' as const,
      title: `Manual Adjustment - ${input.reasonCode}`,
      subtitle: `${input.auditNote || 'Stock reconciliation'} • Just now`,
      timeAgo: 'Just now',
      delta,
      balanceAfter: newQty,
    };

    const updatedItem: InventoryItem = {
      ...currentItem,
      onHandQty: newQty,
      recentMovements: [newLog, ...(currentItem.recentMovements || [])],
    };

    this.items[index] = updatedItem;

    return {
      item: updatedItem,
      previousQty,
      newQty,
    };
  }

  async addProduct(newItem: Partial<InventoryItem>): Promise<InventoryItem> {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const product: InventoryItem = {
      id: `INV-${String(this.items.length + 1).padStart(3, '0')}`,
      sku: newItem.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: newItem.barcode || `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      name: newItem.name || 'New Inventory Item',
      department: newItem.department || 'Coffee',
      category: newItem.category || 'General',
      imageUrl:
        newItem.imageUrl ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA1p_8_TteHlkH-R33KbUyUaB_5G6UXgudfpGYwz1hfvp5vyRb3TRiDEPIRDSDS8TGrRkeMLA9MLzup3k9P19ePyJA8oYmAgWf5ht3fjKG3Eb8hGmH6TtMzM-LaNWB-CfWYbFKpK3AZqJiAqkz6Nze01HGIu5z7uZnWskLzTdsvX2WPmlijOHASUZN6hQKEcUD26gd7LaU7KQsorUmMVPJnqOXiThehKzHhrOlnu0ZiigvT7ST_CpM',
      locationId: newItem.locationId || 'store-01',
      locationName: newItem.locationName || 'Downtown Flagship - Store #01',
      supplierId: newItem.supplierId || 'sup-ethiopia',
      supplierName: newItem.supplierName || 'Addis Highland Exports',
      onHandQty: newItem.onHandQty ?? 10,
      reorderLevel: newItem.reorderLevel ?? 5,
      overstockThreshold: newItem.overstockThreshold ?? 100,
      mrp: newItem.mrp ?? 20.0,
      cost: newItem.cost ?? 10.0,
      retailPrice: newItem.retailPrice ?? 18.0,
      recentMovements: [],
    };

    this.items.unshift(product);
    this.catalogVirtualCount++;
    return product;
  }
}

type TenantInventoryRow = Awaited<ReturnType<typeof listTenantInventory>>['data']['inventoryStocks'][number];

function mapTenantInventory(row: TenantInventoryRow): InventoryItem {
  return {
    id: String(row._id),
    productId: row.product.id,
    sku: row.product.sku,
    barcode: row.product.barcode ?? '',
    name: row.product.name,
    department: row.product.brand,
    category: row.product.category.value,
    imageUrl: '',
    locationId: row.outlet.id,
    locationName: row.outlet.name,
    supplierId: row.product.primarySupplier ?? '',
    supplierName: row.product.primarySupplier ?? row.product.brand,
    binRack: row.binRack ?? undefined,
    onHandQty: row.onHandQty,
    reorderLevel: row.reorderLevel,
    overstockThreshold: row.overstockThreshold,
    mrp: row.product.sellingPrice,
    cost: row.product.cost ?? 0,
    retailPrice: row.product.sellingPrice,
    incomingPurchaseOrder: row.incomingPurchaseOrder ?? undefined,
  };
}

class ProductionInventoryService {
  private async organizationId(): Promise<string> {
    const result = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = result.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    return membership.organization.id;
  }

  private async all(query: InventoryQuery = {}): Promise<InventoryItem[]> {
    const organizationId = await this.organizationId();
    const outletId = query.locationId && query.locationId !== 'all' ? query.locationId : undefined;
    const result = outletId
      ? await listTenantInventory(getFirebaseClientServices().dataConnect, { organizationId, outletId })
      : await listTenantInventory(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.inventoryStocks.map(mapTenantInventory);
  }

  async getInventory(query: InventoryQuery = {}): Promise<InventoryQueryResult> {
    let items = await this.all(query);
    const search = query.search?.trim().toLowerCase() ?? '';
    if (search) items = items.filter((item) => `${item.sku} ${item.name} ${item.barcode} ${item.department} ${item.lotNumber ?? ''}`.toLowerCase().includes(search));
    if (query.supplierId && query.supplierId !== 'all') {
      const supplier = await supplierService.getSupplierById(query.supplierId);
      const supplierNames = new Set([query.supplierId, supplier?.name, supplier ? formatSupplierCode(supplier.supplierCode) : undefined].filter(Boolean));
      items = items.filter((item) => supplierNames.has(item.supplierId) || supplierNames.has(item.supplierName));
    }
    if (query.statusTab && query.statusTab !== 'ALL') items = items.filter((item) => deriveStockStatus(item.onHandQty, item.reorderLevel, item.overstockThreshold) === query.statusTab);
    items.sort((a, b) => query.sort === 'NAME_ASC' ? a.name.localeCompare(b.name) : a.onHandQty - b.onHandQty);
    const counts = { all: items.length, inStock: 0, lowStock: 0, outOfStock: 0, overstocked: 0 };
    items.forEach((item) => { const status = deriveStockStatus(item.onHandQty, item.reorderLevel, item.overstockThreshold).toLowerCase().replace('_stock', 'Stock') as keyof typeof counts; if (status in counts) counts[status] += 1; });
    const page = Math.max(1, query.page ?? 1); const pageSize = Math.max(1, query.pageSize ?? 25); const totalPages = Math.max(1, Math.ceil(items.length / pageSize)); const validPage = Math.min(page, totalPages);
    return { items: items.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: items.length, filteredCount: items.length, page: validPage, pageSize, totalPages, tabCounts: counts, kpis: { totalValuation: items.reduce((sum, item) => sum + item.onHandQty * item.cost, 0), lowStockCount: counts.lowStock, outOfStockCount: counts.outOfStock, incomingPoCount: items.filter((item) => item.incomingPurchaseOrder).length } };
  }

  async getInventoryItem(id: string): Promise<InventoryItem | null> { return (await this.all()).find((item) => item.id === id || item.sku === id) ?? null; }
  async addProduct(newItem: Partial<InventoryItem>): Promise<InventoryItem> {
    const organizationId = await this.organizationId();
    const outlets = await outletService.getAllActiveOutlets();
    const outlet = outlets.find((candidate) => candidate.id === newItem.locationId || candidate.name === newItem.locationName);
    if (!outlet) throw new Error('Select an active outlet before creating inventory.');
    const name = newItem.name?.trim();
    const sku = newItem.sku?.trim();
    if (!name || !sku) throw new Error('Product name and SKU are required.');
    const categoryName = newItem.category?.trim() || 'General';
    const created = await productService.createProduct({
      name,
      brand: newItem.department?.trim() || 'General',
      categoryName,
      type: 'stockable',
      sku,
      barcode: newItem.barcode?.trim() || undefined,
      sellingPrice: newItem.retailPrice ?? 0,
      mrp: newItem.mrp ?? newItem.retailPrice ?? 0,
      cost: newItem.cost ?? 0,
      reorderLevel: newItem.reorderLevel ?? 0,
      reorderQuantity: 0,
    });
    await httpsCallable(getFirebaseClientServices().functions, 'createTenantInventoryStockRecord')({
      organizationId,
      outletId: outlet.id,
      productId: created.id,
      onHandQty: newItem.onHandQty ?? 0,
      reorderLevel: newItem.reorderLevel ?? 0,
      overstockThreshold: newItem.overstockThreshold ?? Math.max(100, (newItem.reorderLevel ?? 0) * 10),
      requestId: globalThis.crypto.randomUUID(),
    });
    const inventory = (await this.all({ locationId: outlet.id })).find((item) => item.productId === created.id);
    if (!inventory) throw new Error('Inventory was created but could not be loaded.');
    return inventory;
  }
  async adjustStock(input: StockAdjustmentInput): Promise<{ item: InventoryItem; previousQty: number; newQty: number }> { const item = await this.getInventoryItem(input.itemId) ?? (await this.getInventoryItem(input.sku)); if (!item?.productId) throw new Error(`Item with SKU ${input.sku} not found`); const organizationId = await this.organizationId(); const previousQty = item.onHandQty; const newQty = input.mode === 'increase' ? previousQty + input.quantity : input.mode === 'decrease' ? Math.max(0, previousQty - input.quantity) : Math.max(0, input.quantity); await httpsCallable(getFirebaseClientServices().functions, 'adjustTenantInventoryStock')({ organizationId, outletId: item.locationId, productId: item.productId, mode: input.mode.toUpperCase(), quantity: input.quantity, previousQty, newQty, reasonCode: input.reasonCode, auditNote: input.auditNote ?? null, requestId: globalThis.crypto.randomUUID() }); const updated = await this.getInventoryItem(input.itemId); if (!updated) throw new Error('Inventory was adjusted but could not be loaded.'); return { item: updated, previousQty, newQty };
  }
}

export const inventoryService = new ProductionInventoryService();
