import {
  Outlet,
  OutletActivity,
  OutletQuery,
  OutletQueryResult,
  CreateOutletInput,
  UpdateOutletInput,
  OutletStatus,
} from '../types';

export interface IOutletService {
  getOutlets(query: OutletQuery): Promise<OutletQueryResult>;
  getOutlet(id: string): Promise<Outlet | null>;
  createOutlet(input: CreateOutletInput): Promise<Outlet>;
  updateOutlet(id: string, input: UpdateOutletInput): Promise<Outlet>;
  changeOutletStatus(id: string, status: OutletStatus): Promise<Outlet>;
  getCities(): Promise<string[]>;
  getAllActiveOutlets(): Promise<Outlet[]>;
}

const INITIAL_OUTLETS: Outlet[] = [
  {
    id: 'out-1',
    outletCode: 'OUT-001',
    name: 'Downtown Flagship #04',
    description: 'Main Retail & VIP Showroom · 4 Registers',
    type: 'Flagship',
    contactPerson: 'Sarah Jenkins',
    contactEmail: 'sarah.j@punarvafashion.com',
    phone: '+1 (512) 555-0142',
    address: '410 Congress Ave, Suite 100',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78701',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 4,
    employeeCount: 18,
    status: 'Active',
    createdAt: '2024-01-12T09:30:00Z',
    updatedAt: '2024-09-12T17:42:00Z',
    recentActivity: [
      {
        id: 'act-1',
        title: 'Register 02 Cash Limit Alert',
        timestamp: '12m ago',
        description: 'Threshold reached ($1,580.00 cash limit). Initiated manager safe drop.',
      },
      {
        id: 'act-2',
        title: 'Stock Transfer Completed',
        timestamp: '2h ago',
        description: 'Received 48 units of Silk Kurti Sets from Central Whse via PO #1089.',
      },
      {
        id: 'act-3',
        title: 'Manager Profile Swapped',
        timestamp: 'Yesterday',
        description: 'Sarah Jenkins logged on to active terminal shift #104.',
      },
    ],
  },
  {
    id: 'out-2',
    outletCode: 'OUT-002',
    name: 'Northside Galleria Mall',
    description: 'Mall Kiosk & Apparel Annex · 2 Registers',
    type: 'Mall Kiosk / Annex',
    contactPerson: 'Marcus Vance',
    contactEmail: 'm.vance@punarvafashion.com',
    phone: '+1 (512) 555-0891',
    address: '11410 Century Oaks Terrace, Space #204',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78758',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 2,
    employeeCount: 12,
    status: 'Active',
    createdAt: '2024-02-18T11:00:00Z',
    updatedAt: '2024-09-10T14:20:00Z',
    recentActivity: [
      {
        id: 'act-4',
        title: 'Terminal REG-02 Online',
        timestamp: '45m ago',
        description: 'POS terminal synced successfully with cloud transaction pipeline.',
      },
      {
        id: 'act-5',
        title: 'Inventory Count Verified',
        timestamp: '3d ago',
        description: 'Monthly physical stock audit reconciled with 99.4% accuracy.',
      },
    ],
  },
  {
    id: 'out-3',
    outletCode: 'OUT-003',
    name: 'Dallas Uptown Apparel Hub',
    description: 'High-Street Outlet · 3 Registers',
    type: 'High-Street Outlet',
    contactPerson: 'Elena Lin',
    contactEmail: 'elena.lin@punarvafashion.com',
    phone: '+1 (214) 555-0377',
    address: '2620 McKinney Ave',
    city: 'Dallas',
    state: 'Texas',
    postalCode: '75204',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 3,
    employeeCount: 15,
    status: 'Active',
    createdAt: '2024-03-05T08:15:00Z',
    updatedAt: '2024-09-11T16:05:00Z',
    recentActivity: [
      {
        id: 'act-6',
        title: 'Price Rules Updated',
        timestamp: '1h ago',
        description: 'Promotional discount weekend matrix applied across all 3 registers.',
      },
    ],
  },
  {
    id: 'out-4',
    outletCode: 'OUT-004',
    name: 'Houston Galleria Outlet',
    description: 'Regional Flagship & Warehouse Stock · 3 Registers',
    type: 'Regional Flagship',
    contactPerson: 'David Kowalski',
    contactEmail: 'david.k@punarvafashion.com',
    phone: '+1 (713) 555-0621',
    address: '5085 Westheimer Rd, Suite B280',
    city: 'Houston',
    state: 'Texas',
    postalCode: '77056',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 3,
    employeeCount: 14,
    status: 'Active',
    createdAt: '2024-04-10T10:00:00Z',
    updatedAt: '2024-09-08T18:40:00Z',
    recentActivity: [
      {
        id: 'act-7',
        title: 'Regional Fulfillment Enabled',
        timestamp: '4h ago',
        description: 'Configured store as regional click-and-collect fulfillment node.',
      },
    ],
  },
  {
    id: 'out-5',
    outletCode: 'OUT-005',
    name: 'San Antonio Riverwalk Pop-up',
    description: 'Seasonal Boutique & Tourist Line · 1 Register',
    type: 'Seasonal Pop-up',
    contactPerson: 'Carlos Morales',
    contactEmail: 'c.morales@punarvafashion.com',
    phone: '+1 (210) 555-0914',
    address: '849 E Commerce St',
    city: 'San Antonio',
    state: 'Texas',
    postalCode: '78205',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 1,
    employeeCount: 6,
    status: 'Active',
    createdAt: '2024-05-20T14:45:00Z',
    updatedAt: '2024-09-05T09:12:00Z',
    recentActivity: [
      {
        id: 'act-8',
        title: 'Weekly EOD Settlement',
        timestamp: 'Yesterday',
        description: 'Batch closure balanced without reconciliation variances.',
      },
    ],
  },
  {
    id: 'out-6',
    outletCode: 'OUT-006',
    name: 'Westlake Center Depot',
    description: 'Closed for Lease Renegotiation · Terminated',
    type: 'Warehouse Store',
    contactPerson: 'Rachel Adams',
    contactEmail: 'r.adams@punarvafashion.com',
    phone: '+1 (512) 555-0288',
    address: '3300 Bee Caves Rd',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78746',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 0,
    employeeCount: 0,
    status: 'Inactive',
    createdAt: '2023-11-15T09:00:00Z',
    updatedAt: '2024-08-30T12:00:00Z',
    recentActivity: [
      {
        id: 'act-9',
        title: 'Deactivated by Org Administrator',
        timestamp: 'Aug 30, 2024',
        description: 'Lease concluded. All remaining active stock transferred to Flagship #04.',
      },
    ],
  },
  {
    id: 'out-7',
    outletCode: 'OUT-007',
    name: 'Uptown Mall #12',
    description: 'Shopping Mall Wing A · 3 Registers',
    type: 'Mall Kiosk / Annex',
    contactPerson: 'Marcus Vance',
    contactEmail: 'marcus.v@punarvafashion.com',
    phone: '+1 (555) 432-8765',
    address: '8201 Uptown Blvd, Space 12A',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78759',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 3,
    employeeCount: 8,
    status: 'Active',
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-09-12T11:00:00Z',
    recentActivity: [
      {
        id: 'act-10',
        title: 'Morning Shift Terminal Sync',
        timestamp: '1h ago',
        description: 'All 3 POS terminals initialized for retail trading.',
      },
    ],
  },
  {
    id: 'out-8',
    outletCode: 'OUT-008',
    name: 'Westside Express #08',
    description: 'Express Boutique & Quick Checkout · 2 Registers',
    type: 'Standard Retail',
    contactPerson: 'Jessica Taylor',
    contactEmail: 'jessica.t@punarvafashion.com',
    phone: '+1 (555) 901-2345',
    address: '2204 Westlake Hills Pkwy',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78746',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 2,
    employeeCount: 5,
    status: 'Active',
    createdAt: '2024-06-15T09:00:00Z',
    updatedAt: '2024-09-11T14:30:00Z',
    recentActivity: [],
  },
  {
    id: 'out-9',
    outletCode: 'OUT-009',
    name: 'Metro North Hub #01',
    description: 'Suburban Flagship & Apparel Center · 4 Registers',
    type: 'Regional Flagship',
    contactPerson: 'Rachel Green',
    contactEmail: 'rachel.g@punarvafashion.com',
    phone: '+1 (555) 789-2210',
    address: '1540 Metro Pkwy',
    city: 'Round Rock',
    state: 'Texas',
    postalCode: '78664',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 4,
    employeeCount: 14,
    status: 'Active',
    createdAt: '2024-07-01T08:00:00Z',
    updatedAt: '2024-09-10T16:00:00Z',
    recentActivity: [],
  },
  {
    id: 'out-10',
    outletCode: 'OUT-010',
    name: 'Westside Mall #02',
    description: 'Shopping Mall Service Node · 2 Registers',
    type: 'Mall Kiosk / Annex',
    contactPerson: 'Derrick Sterling',
    contactEmail: 'd.sterling@omnitrade.internal',
    phone: '+1 (555) 839-2041',
    address: '2901 S Capital of Texas Hwy',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78746',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 2,
    employeeCount: 8,
    status: 'Active',
    createdAt: '2024-07-15T08:00:00Z',
    updatedAt: '2024-09-12T10:00:00Z',
    recentActivity: [],
  },
  {
    id: 'out-11',
    outletCode: 'OUT-011',
    name: 'North Outlet #08',
    description: 'North Regional Outlet & Hardware Annex · 2 Registers',
    type: 'Standard Retail',
    contactPerson: 'Robert Thorne',
    contactEmail: 'r.thorne@omnitrade.internal',
    phone: '+1 (555) 234-5511',
    address: '10200 Research Blvd',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78759',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 2,
    employeeCount: 6,
    status: 'Active',
    createdAt: '2024-08-01T08:00:00Z',
    updatedAt: '2024-09-12T10:00:00Z',
    recentActivity: [],
  },
  {
    id: 'out-12',
    outletCode: 'OUT-012',
    name: 'Eastside Depot #11',
    description: 'Eastside Supply Hub & Distribution Depot · 3 Registers',
    type: 'Warehouse Store',
    contactPerson: 'Alan Vance',
    contactEmail: 'a.vance@omnitrade.internal',
    phone: '+1 (555) 678-9012',
    address: '3800 Airport Blvd',
    city: 'Austin',
    state: 'Texas',
    postalCode: '78722',
    country: 'US',
    timezone: 'America/Chicago (CST/CDT)',
    currency: 'USD ($)',
    registerCount: 3,
    employeeCount: 10,
    status: 'Active',
    createdAt: '2024-08-15T08:00:00Z',
    updatedAt: '2024-09-12T10:00:00Z',
    recentActivity: [],
  },
];

class MockOutletService implements IOutletService {
  private outlets: Outlet[] = [...INITIAL_OUTLETS];

  // Helper delay to simulate production network latency
  private delay(ms = 180): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async getOutlets(query: OutletQuery): Promise<OutletQueryResult> {
    await this.delay(160);

    const { search = '', status = 'All', city = '', page = 1, pageSize = 10 } = query;

    // Filter by search string across name, outletCode, city, phone, contactPerson
    const searchNormalized = search.trim().toLowerCase();

    let filtered = this.outlets.filter((outlet) => {
      if (searchNormalized) {
        const matchesName = outlet.name.toLowerCase().includes(searchNormalized);
        const matchesCode = outlet.outletCode.toLowerCase().includes(searchNormalized);
        const matchesCity = outlet.city.toLowerCase().includes(searchNormalized);
        const matchesPhone = outlet.phone.toLowerCase().includes(searchNormalized);
        const matchesContact = outlet.contactPerson.toLowerCase().includes(searchNormalized);
        const matchesDesc = outlet.description?.toLowerCase().includes(searchNormalized) || false;

        if (!(matchesName || matchesCode || matchesCity || matchesPhone || matchesContact || matchesDesc)) {
          return false;
        }
      }

      // Filter by status
      if (status !== 'All') {
        if (outlet.status !== status) {
          return false;
        }
      }

      // Filter by city
      if (city && city.trim() !== '') {
        if (outlet.city.toLowerCase() !== city.trim().toLowerCase()) {
          return false;
        }
      }

      return true;
    });

    const total = filtered.length;
    const activeCount = this.outlets.filter((o) => o.status === 'Active').length;
    const inactiveCount = this.outlets.filter((o) => o.status === 'Inactive').length;

    // Pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedOutlets = filtered.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      outlets: paginatedOutlets,
      total,
      activeCount,
      inactiveCount,
      page,
      pageSize,
      totalPages,
    };
  }

  public async getOutlet(id: string): Promise<Outlet | null> {
    await this.delay(100);
    const found = this.outlets.find((o) => o.id === id || o.outletCode === id);
    return found ? { ...found } : null;
  }

  public async createOutlet(input: CreateOutletInput): Promise<Outlet> {
    await this.delay(220);

    const nextCode = this.getNextOutletCode();
    const newId = `out-${Date.now()}`;
    const now = new Date().toISOString();

    const newOutlet: Outlet = {
      id: newId,
      outletCode: nextCode,
      name: input.name.trim(),
      description: input.description?.trim() || `${input.type || 'Standard Retail'} · ${input.registerCount ?? 2} Registers`,
      type: input.type || 'Standard Retail',
      contactPerson: input.contactPerson.trim(),
      contactEmail: input.contactEmail?.trim() || `${input.contactPerson.toLowerCase().replace(/\s+/g, '.')}@punarvafashion.com`,
      phone: input.phone.trim(),
      address: input.address?.trim() || 'Central Boulevard',
      city: input.city.trim(),
      state: input.state?.trim() || 'Texas',
      postalCode: input.postalCode?.trim() || '78701',
      country: input.country?.trim() || 'US',
      timezone: input.timezone || 'America/Chicago (CST/CDT)',
      currency: input.currency || 'USD ($)',
      registerCount: typeof input.registerCount === 'number' ? Math.max(0, input.registerCount) : 2,
      employeeCount: 8, // Derived default deterministic mock count for new outlet
      status: input.status || 'Active',
      createdAt: now,
      updatedAt: now,
      recentActivity: [
        {
          id: `act-${Date.now()}`,
          title: 'Outlet Initialized with POS Sync',
          timestamp: 'Just now',
          description: `Configured new branch location ${input.name} under Punarva Fashion Hub.`,
        },
      ],
    };

    // Prepend or append to in-memory list
    this.outlets.unshift(newOutlet);
    return { ...newOutlet };
  }

  public async updateOutlet(id: string, input: UpdateOutletInput): Promise<Outlet> {
    await this.delay(200);

    const index = this.outlets.findIndex((o) => o.id === id || o.outletCode === id);
    if (index === -1) {
      throw new Error(`Outlet not found: ${id}`);
    }

    const current = this.outlets[index];
    const now = new Date().toISOString();

    const updated: Outlet = {
      ...current,
      name: input.name !== undefined ? input.name.trim() : current.name,
      description: input.description !== undefined ? input.description.trim() : current.description,
      type: input.type !== undefined ? input.type : current.type,
      contactPerson: input.contactPerson !== undefined ? input.contactPerson.trim() : current.contactPerson,
      contactEmail: input.contactEmail !== undefined ? input.contactEmail.trim() : current.contactEmail,
      phone: input.phone !== undefined ? input.phone.trim() : current.phone,
      address: input.address !== undefined ? input.address.trim() : current.address,
      city: input.city !== undefined ? input.city.trim() : current.city,
      state: input.state !== undefined ? input.state.trim() : current.state,
      postalCode: input.postalCode !== undefined ? input.postalCode.trim() : current.postalCode,
      country: input.country !== undefined ? input.country.trim() : current.country,
      timezone: input.timezone !== undefined ? input.timezone : current.timezone,
      currency: input.currency !== undefined ? input.currency : current.currency,
      registerCount: input.registerCount !== undefined ? Math.max(0, input.registerCount) : current.registerCount,
      status: input.status !== undefined ? input.status : current.status,
      updatedAt: now,
    };

    this.outlets[index] = updated;
    return { ...updated };
  }

  public async changeOutletStatus(id: string, status: OutletStatus): Promise<Outlet> {
    await this.delay(160);

    const index = this.outlets.findIndex((o) => o.id === id || o.outletCode === id);
    if (index === -1) {
      throw new Error(`Outlet not found: ${id}`);
    }

    const current = this.outlets[index];
    const now = new Date().toISOString();

    const activity: OutletActivity = {
      id: `act-${Date.now()}`,
      title: status === 'Active' ? 'Outlet Activated' : 'Outlet Deactivated',
      timestamp: 'Just now',
      description:
        status === 'Active'
          ? 'Operational licenses restored and POS terminal cloud sync enabled.'
          : 'Store marked inactive. POS terminals moved to standby/historical reference.',
    };

    const updated: Outlet = {
      ...current,
      status,
      updatedAt: now,
      recentActivity: [activity, ...(current.recentActivity || [])],
    };

    this.outlets[index] = updated;
    return { ...updated };
  }

  public async getCities(): Promise<string[]> {
    await this.delay(50);
    const citiesSet = new Set<string>();
    this.outlets.forEach((o) => {
      if (o.city) citiesSet.add(o.city);
    });
    return Array.from(citiesSet).sort();
  }

  public async getAllActiveOutlets(): Promise<Outlet[]> {
    await this.delay(50);
    return this.outlets.filter((o) => o.status === 'Active');
  }

  public getNextOutletCode(): string {
    // Find highest OUT-XXX number
    let maxNum = 0;
    this.outlets.forEach((o) => {
      const match = o.outletCode.match(/OUT-(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    });
    const next = maxNum + 1;
    return `OUT-${next.toString().padStart(3, '0')}`;
  }
}

export const outletService = new MockOutletService();
