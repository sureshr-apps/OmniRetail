import { mockDelay } from '@/shared/utils/mockDelay';
import { licensePlanService } from '@/features/plans/services/LicensePlanService';
import { formatCurrency } from '@/shared/utils/currency';
import {
  OrganizationLicense,
  OrganizationLicenseHistory,
  AssignLicenseInput,
  ChangePlanInput,
  ModifyCommercialTermsInput,
  RenewLicenseInput,
  EnrichedOrganizationLicense,
  PlanSnapshot,
  LicenseChangeDiff,
} from '../types';
import { calculateLicenseStatus } from '../utils/licenseStatus';

export interface IOrganizationLicenseService {
  getCurrentLicense(organizationId: string): Promise<OrganizationLicense | null>;
  getLicenseWithPlan(organizationId: string): Promise<EnrichedOrganizationLicense>;
  getLicenseHistory(organizationId: string): Promise<OrganizationLicenseHistory[]>;
  assignLicense(organizationId: string, input: AssignLicenseInput): Promise<OrganizationLicense>;
  changePlan(organizationId: string, input: ChangePlanInput): Promise<OrganizationLicense>;
  modifyCommercialTerms(organizationId: string, input: ModifyCommercialTermsInput): Promise<OrganizationLicense>;
  renewLicense(organizationId: string, input: RenewLicenseInput): Promise<OrganizationLicense>;
  getAllLicenses(): Promise<OrganizationLicense[]>;
  getLicenseSync(organizationId: string): OrganizationLicense | null;
}

// Initial realistic license mock data
const INITIAL_LICENSES: OrganizationLicense[] = [
  {
    id: 'LIC-88219-02',
    organizationId: 'ORG-88219', // Punarva Fashion Hub
    planId: 'PLN-002-PROFESSIONAL',
    startDate: '2025-10-14',
    expiryDate: '2027-02-15',
    negotiatedPrice: 85000,
    currency: 'INR (₹)',
    createdAt: '2024-10-14T10:00:00.000Z',
    updatedAt: '2025-10-14T14:30:00.000Z',
  },
  {
    id: 'LIC-41902-01',
    organizationId: 'ORG-41902', // FabSutra Silks & Sarees (Expiring Soon - 2026-09-28)
    planId: 'PLN-002-PROFESSIONAL',
    startDate: '2025-09-28',
    expiryDate: '2026-09-28',
    negotiatedPrice: 72000, // Different negotiated price for same plan
    currency: 'INR (₹)',
    createdAt: '2025-09-28T09:15:00.000Z',
    updatedAt: '2025-09-28T09:15:00.000Z',
  },
  {
    id: 'LIC-76134-02',
    organizationId: 'ORG-76134', // Kalyan Heritage Jewelers
    planId: 'PLN-003-ENTERPRISE',
    startDate: '2025-04-10',
    expiryDate: '2027-04-10',
    negotiatedPrice: 195000,
    currency: 'INR (₹)',
    createdAt: '2024-05-11T11:00:00.000Z',
    updatedAt: '2025-04-10T16:20:00.000Z',
  },
  {
    id: 'LIC-29381-01',
    organizationId: 'ORG-29381', // Malabar Spices (Expired - 2026-08-15)
    planId: 'PLN-001-STARTER',
    startDate: '2025-08-15',
    expiryDate: '2026-08-15',
    negotiatedPrice: 28000,
    currency: 'INR (₹)',
    createdAt: '2025-08-15T08:30:00.000Z',
    updatedAt: '2025-08-15T08:30:00.000Z',
  },
  {
    id: 'LIC-65410-02',
    organizationId: 'ORG-65410', // Deccan Electronics (Expiring Soon - 2026-10-02)
    planId: 'PLN-002-PROFESSIONAL',
    startDate: '2025-10-02',
    expiryDate: '2026-10-02',
    negotiatedPrice: 90000,
    currency: 'INR (₹)',
    createdAt: '2024-03-19T10:00:00.000Z',
    updatedAt: '2025-10-02T12:00:00.000Z',
  },
  {
    id: 'LIC-83204-01',
    organizationId: 'ORG-83204', // ChaiPoint Express
    planId: 'PLN-002-PROFESSIONAL',
    startDate: '2026-01-20',
    expiryDate: '2027-01-20',
    negotiatedPrice: 65000,
    currency: 'INR (₹)',
    createdAt: '2026-01-20T10:30:00.000Z',
    updatedAt: '2026-01-20T10:30:00.000Z',
  },
  {
    id: 'LIC-19283-01',
    organizationId: 'ORG-19283', // Varanasi Weavers (Not Yet Active - Starts 2026-10-01)
    planId: 'PLN-001-STARTER',
    startDate: '2026-10-01',
    expiryDate: '2027-09-30',
    negotiatedPrice: 24000,
    currency: 'INR (₹)',
    createdAt: '2026-09-01T14:00:00.000Z',
    updatedAt: '2026-09-01T14:00:00.000Z',
  },
  // ORG-90412 (Nandi Organic Supermarket) intentionally has NO LICENSE (Not Assigned)
  {
    id: 'LIC-53819-01',
    organizationId: 'ORG-53819', // Bawarchi Quick Mart (Expired - 2026-07-30)
    planId: 'PLN-001-STARTER',
    startDate: '2025-07-30',
    expiryDate: '2026-07-30',
    negotiatedPrice: 30000,
    currency: 'INR (₹)',
    createdAt: '2025-07-30T10:00:00.000Z',
    updatedAt: '2025-07-30T10:00:00.000Z',
  },
  {
    id: 'LIC-72109-01',
    organizationId: 'ORG-72109', // Zouk Modern Handcrafted (On highest active plan - Level 3)
    planId: 'PLN-003-ENTERPRISE',
    startDate: '2025-03-05',
    expiryDate: '2027-03-05',
    negotiatedPrice: 210000,
    currency: 'INR (₹)',
    createdAt: '2025-03-05T09:00:00.000Z',
    updatedAt: '2025-03-05T09:00:00.000Z',
  },
  {
    id: 'LIC-34190-02',
    organizationId: 'ORG-34190', // Royal Rajasthan Handicrafts
    planId: 'PLN-001-STARTER',
    startDate: '2026-04-18',
    expiryDate: '2027-04-18',
    negotiatedPrice: 32000,
    currency: 'INR (₹)',
    createdAt: '2024-04-18T11:00:00.000Z',
    updatedAt: '2026-04-18T10:00:00.000Z',
  },
  {
    id: 'LIC-61029-01',
    organizationId: 'ORG-61029', // FreshCatch Coastal (Expiring Soon - 2026-09-25)
    planId: 'PLN-001-STARTER',
    startDate: '2025-09-25',
    expiryDate: '2026-09-25',
    negotiatedPrice: 31000,
    currency: 'INR (₹)',
    createdAt: '2025-09-25T11:30:00.000Z',
    updatedAt: '2025-09-25T11:30:00.000Z',
  },
  // ORG-48192 (Coimbatore Textile Mills) intentionally has NO LICENSE (Not Assigned)
  {
    id: 'LIC-98321-01',
    organizationId: 'ORG-98321', // BlueTokai Craft Coffee Hubs (Assigned inactive plan PLN-000-LEGACY)
    planId: 'PLN-000-LEGACY',
    startDate: '2025-06-30',
    expiryDate: '2027-06-30',
    negotiatedPrice: 45000,
    currency: 'INR (₹)',
    createdAt: '2024-11-15T12:00:00.000Z',
    updatedAt: '2025-06-30T10:00:00.000Z',
  },
  {
    id: 'LIC-23910-01',
    organizationId: 'ORG-23910', // Vrindavan Pure Dairy
    planId: 'PLN-001-STARTER',
    startDate: '2025-11-11',
    expiryDate: '2026-11-11',
    negotiatedPrice: 33000,
    currency: 'INR (₹)',
    createdAt: '2025-11-11T09:00:00.000Z',
    updatedAt: '2025-11-11T09:00:00.000Z',
  },
  {
    id: 'LIC-81723-01',
    organizationId: 'ORG-81723', // Mysore Sandal Emporium
    planId: 'PLN-001-STARTER',
    startDate: '2026-02-14',
    expiryDate: '2027-02-14',
    negotiatedPrice: 35000,
    currency: 'INR (₹)',
    createdAt: '2026-02-14T10:00:00.000Z',
    updatedAt: '2026-02-14T10:00:00.000Z',
  },
  {
    id: 'LIC-55104-01',
    organizationId: 'ORG-55104', // Darjeeling Leaf Tea Lounge (Expiring Soon - 2026-10-08)
    planId: 'PLN-001-STARTER',
    startDate: '2025-10-08',
    expiryDate: '2026-10-08',
    negotiatedPrice: 29000,
    currency: 'INR (₹)',
    createdAt: '2025-10-08T11:00:00.000Z',
    updatedAt: '2025-10-08T11:00:00.000Z',
  },
  {
    id: 'LIC-67291-01',
    organizationId: 'ORG-67291', // Surat Diamond Exchange Mart
    planId: 'PLN-003-ENTERPRISE',
    startDate: '2025-05-19',
    expiryDate: '2027-05-19',
    negotiatedPrice: 225000,
    currency: 'INR (₹)',
    createdAt: '2025-05-19T10:00:00.000Z',
    updatedAt: '2025-05-19T10:00:00.000Z',
  },
];

// Initial immutable history records with snapshots
const INITIAL_HISTORY: OrganizationLicenseHistory[] = [
  // Punarva Fashion Hub History
  {
    id: 'HIST-88219-01',
    organizationId: 'ORG-88219',
    eventType: 'assigned',
    eventAt: '2024-10-14T10:00:00.000Z',
    planSnapshot: {
      planId: 'PLN-001-STARTER',
      planName: 'Starter',
      planLevel: 1,
      maxStores: 1,
      maxUsers: 5,
    },
    startDate: '2024-10-14',
    expiryDate: '2025-10-14',
    negotiatedPrice: 35000,
    currency: 'INR (₹)',
  },
  {
    id: 'HIST-88219-02',
    organizationId: 'ORG-88219',
    eventType: 'plan_changed',
    eventAt: '2025-10-14T14:30:00.000Z',
    planSnapshot: {
      planId: 'PLN-002-PROFESSIONAL',
      planName: 'Professional',
      planLevel: 2,
      maxStores: 5,
      maxUsers: 25,
    },
    startDate: '2025-10-14',
    expiryDate: '2027-02-15',
    negotiatedPrice: 85000,
    currency: 'INR (₹)',
    changes: [
      { field: 'planName', label: 'Plan', from: 'Starter', to: 'Professional' },
      { field: 'maxStores', label: 'Maximum Stores', from: 1, to: 5 },
      { field: 'maxUsers', label: 'Maximum Users', from: 5, to: 25 },
      { field: 'negotiatedPrice', label: 'Negotiated Price', from: '₹35,000', to: '₹85,000' },
    ],
  },

  // FabSutra History
  {
    id: 'HIST-41902-01',
    organizationId: 'ORG-41902',
    eventType: 'assigned',
    eventAt: '2025-09-28T09:15:00.000Z',
    planSnapshot: {
      planId: 'PLN-002-PROFESSIONAL',
      planName: 'Professional',
      planLevel: 2,
      maxStores: 5,
      maxUsers: 25,
    },
    startDate: '2025-09-28',
    expiryDate: '2026-09-28',
    negotiatedPrice: 72000,
    currency: 'INR (₹)',
  },

  // Kalyan Heritage Jewelers History
  {
    id: 'HIST-76134-01',
    organizationId: 'ORG-76134',
    eventType: 'assigned',
    eventAt: '2024-05-11T11:00:00.000Z',
    planSnapshot: {
      planId: 'PLN-002-PROFESSIONAL',
      planName: 'Professional',
      planLevel: 2,
      maxStores: 5,
      maxUsers: 25,
    },
    startDate: '2024-05-11',
    expiryDate: '2025-05-11',
    negotiatedPrice: 75000,
    currency: 'INR (₹)',
  },
  {
    id: 'HIST-76134-02',
    organizationId: 'ORG-76134',
    eventType: 'plan_changed',
    eventAt: '2025-04-10T16:20:00.000Z',
    planSnapshot: {
      planId: 'PLN-003-ENTERPRISE',
      planName: 'Enterprise',
      planLevel: 3,
      maxStores: 20,
      maxUsers: 100,
    },
    startDate: '2025-04-10',
    expiryDate: '2027-04-10',
    negotiatedPrice: 195000,
    currency: 'INR (₹)',
    changes: [
      { field: 'planName', label: 'Plan', from: 'Professional', to: 'Enterprise' },
      { field: 'maxStores', label: 'Maximum Stores', from: 5, to: 20 },
      { field: 'maxUsers', label: 'Maximum Users', from: 25, to: 100 },
      { field: 'negotiatedPrice', label: 'Negotiated Price', from: '₹75,000', to: '₹195,000' },
    ],
  },

  // Malabar Spices History
  {
    id: 'HIST-29381-01',
    organizationId: 'ORG-29381',
    eventType: 'assigned',
    eventAt: '2025-08-15T08:30:00.000Z',
    planSnapshot: {
      planId: 'PLN-001-STARTER',
      planName: 'Starter',
      planLevel: 1,
      maxStores: 1,
      maxUsers: 5,
    },
    startDate: '2025-08-15',
    expiryDate: '2026-08-15',
    negotiatedPrice: 28000,
    currency: 'INR (₹)',
  },

  // Royal Rajasthan History (Assigned, then Renewed)
  {
    id: 'HIST-34190-01',
    organizationId: 'ORG-34190',
    eventType: 'assigned',
    eventAt: '2024-04-18T11:00:00.000Z',
    planSnapshot: {
      planId: 'PLN-001-STARTER',
      planName: 'Starter',
      planLevel: 1,
      maxStores: 1,
      maxUsers: 5,
    },
    startDate: '2024-04-18',
    expiryDate: '2025-04-18',
    negotiatedPrice: 30000,
    currency: 'INR (₹)',
  },
  {
    id: 'HIST-34190-02',
    organizationId: 'ORG-34190',
    eventType: 'renewed',
    eventAt: '2026-04-18T10:00:00.000Z',
    planSnapshot: {
      planId: 'PLN-001-STARTER',
      planName: 'Starter',
      planLevel: 1,
      maxStores: 1,
      maxUsers: 5,
    },
    startDate: '2026-04-18',
    expiryDate: '2027-04-18',
    negotiatedPrice: 32000,
    currency: 'INR (₹)',
    changes: [
      { field: 'validityPeriod', label: 'License Period', from: '2024-04-18 to 2025-04-18', to: '2026-04-18 to 2027-04-18' },
      { field: 'negotiatedPrice', label: 'Negotiated Price', from: '₹30,000', to: '₹32,000' },
    ],
  },
];

class MockOrganizationLicenseService implements IOrganizationLicenseService {
  private licenses: OrganizationLicense[] = [...INITIAL_LICENSES];
  private history: OrganizationLicenseHistory[] = [...INITIAL_HISTORY];

  getLicenseSync(organizationId: string): OrganizationLicense | null {
    const found = this.licenses.find((l) => l.organizationId === organizationId);
    return found ? { ...found } : null;
  }

  async getAllLicenses(): Promise<OrganizationLicense[]> {
    return [...this.licenses];
  }

  async getCurrentLicense(organizationId: string): Promise<OrganizationLicense | null> {
    await mockDelay(200);
    const found = this.licenses.find((l) => l.organizationId === organizationId);
    return found ? { ...found } : null;
  }

  async getLicenseWithPlan(organizationId: string): Promise<EnrichedOrganizationLicense> {
    await mockDelay(250);
    const license = this.licenses.find((l) => l.organizationId === organizationId) || null;
    if (!license) {
      return {
        license: null,
        plan: null,
        status: 'not_assigned',
      };
    }

    const plan = await licensePlanService.getPlan(license.planId);
    const status = calculateLicenseStatus(license);

    return {
      license: { ...license },
      plan: plan ? { ...plan } : null,
      status,
    };
  }

  async getLicenseHistory(organizationId: string): Promise<OrganizationLicenseHistory[]> {
    await mockDelay(200);
    const records = this.history
      .filter((h) => h.organizationId === organizationId)
      // Sort newest event first
      .sort((a, b) => new Date(b.eventAt).getTime() - new Date(a.eventAt).getTime());

    return records.map((r) => ({
      ...r,
      planSnapshot: { ...r.planSnapshot },
      changes: r.changes ? [...r.changes] : undefined,
    }));
  }

  async assignLicense(organizationId: string, input: AssignLicenseInput): Promise<OrganizationLicense> {
    await mockDelay(500);

    // Validate plan
    const plan = await licensePlanService.getPlan(input.planId);
    if (!plan) {
      throw new Error(`Selected plan (${input.planId}) was not found.`);
    }
    if (plan.status !== 'active') {
      throw new Error('Only active plans may be assigned to an organization.');
    }

    // Validate dates
    if (!input.startDate || !input.expiryDate) {
      throw new Error('Start date and expiry date are required.');
    }
    if (new Date(input.expiryDate).getTime() <= new Date(input.startDate).getTime()) {
      throw new Error('Expiry date must be after the start date.');
    }

    // Validate pricing
    if (input.negotiatedPrice === undefined || input.negotiatedPrice === null || input.negotiatedPrice < 0) {
      throw new Error('Negotiated price is required and cannot be negative.');
    }
    if (!input.currency || !input.currency.trim()) {
      throw new Error('Currency is required.');
    }

    const nowIso = new Date().toISOString();
    const licenseId = `LIC-${Math.floor(10000 + Math.random() * 90000)}`;

    const newLicense: OrganizationLicense = {
      id: licenseId,
      organizationId,
      planId: plan.id,
      startDate: input.startDate,
      expiryDate: input.expiryDate,
      negotiatedPrice: Number(input.negotiatedPrice),
      currency: input.currency.trim(),
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // Replace or insert
    const existingIndex = this.licenses.findIndex((l) => l.organizationId === organizationId);
    if (existingIndex >= 0) {
      this.licenses[existingIndex] = newLicense;
    } else {
      this.licenses.push(newLicense);
    }

    // Create immutable history record with Plan snapshot at this moment
    const historyRecord: OrganizationLicenseHistory = {
      id: `HIST-${Math.floor(100000 + Math.random() * 900000)}`,
      organizationId,
      eventType: 'assigned',
      eventAt: nowIso,
      planSnapshot: {
        planId: plan.id,
        planName: plan.name,
        planLevel: plan.level,
        maxStores: plan.maxStores,
        maxUsers: plan.maxUsers,
      },
      startDate: input.startDate,
      expiryDate: input.expiryDate,
      negotiatedPrice: Number(input.negotiatedPrice),
      currency: input.currency.trim(),
    };

    this.history.unshift(historyRecord);

    return { ...newLicense };
  }

  async changePlan(organizationId: string, input: ChangePlanInput): Promise<OrganizationLicense> {
    await mockDelay(500);

    const currentLicense = this.licenses.find((l) => l.organizationId === organizationId);
    if (!currentLicense) {
      throw new Error('Cannot change plan: Organization does not have an existing license.');
    }

    const currentPlan = await licensePlanService.getPlan(currentLicense.planId);
    const newPlan = await licensePlanService.getPlan(input.newPlanId);

    if (!newPlan) {
      throw new Error(`Target plan (${input.newPlanId}) was not found.`);
    }
    if (newPlan.status !== 'active') {
      throw new Error('Target plan must be active to perform a plan change.');
    }

    const currentLevel = currentPlan ? currentPlan.level : 0;
    if (newPlan.level <= currentLevel) {
      throw new Error(
        `Plan change requires an upgrade to a higher-level plan. Selected plan level (${newPlan.level}) is not higher than current level (${currentLevel}). Downgrade is not supported.`
      );
    }

    if (input.newNegotiatedPrice === undefined || input.newNegotiatedPrice === null || input.newNegotiatedPrice < 0) {
      throw new Error('New negotiated price is required and must be zero or greater.');
    }
    if (!input.currency || !input.currency.trim()) {
      throw new Error('Currency is required.');
    }

    const nowIso = new Date().toISOString();

    // Calculate changes diff
    const changes: LicenseChangeDiff[] = [
      {
        field: 'planName',
        label: 'Plan',
        from: currentPlan?.name || 'Previous Plan',
        to: newPlan.name,
      },
      {
        field: 'maxStores',
        label: 'Maximum Stores',
        from: currentPlan?.maxStores ?? 0,
        to: newPlan.maxStores,
      },
      {
        field: 'maxUsers',
        label: 'Maximum Users',
        from: currentPlan?.maxUsers ?? 0,
        to: newPlan.maxUsers,
      },
      {
        field: 'negotiatedPrice',
        label: 'Negotiated Price',
        from: formatCurrency(currentLicense.negotiatedPrice, currentLicense.currency),
        to: formatCurrency(input.newNegotiatedPrice, input.currency),
      },
    ];

    if (currentLicense.currency !== input.currency.trim()) {
      changes.push({
        field: 'currency',
        label: 'Currency',
        from: currentLicense.currency,
        to: input.currency.trim(),
      });
    }

    // Update license: preserves start date and expiry date!
    const updatedLicense: OrganizationLicense = {
      ...currentLicense,
      planId: newPlan.id,
      negotiatedPrice: Number(input.newNegotiatedPrice),
      currency: input.currency.trim(),
      updatedAt: nowIso,
    };

    const index = this.licenses.findIndex((l) => l.organizationId === organizationId);
    this.licenses[index] = updatedLicense;

    // Create history entry
    const historyRecord: OrganizationLicenseHistory = {
      id: `HIST-${Math.floor(100000 + Math.random() * 900000)}`,
      organizationId,
      eventType: 'plan_changed',
      eventAt: nowIso,
      planSnapshot: {
        planId: newPlan.id,
        planName: newPlan.name,
        planLevel: newPlan.level,
        maxStores: newPlan.maxStores,
        maxUsers: newPlan.maxUsers,
      },
      startDate: updatedLicense.startDate,
      expiryDate: updatedLicense.expiryDate,
      negotiatedPrice: Number(input.newNegotiatedPrice),
      currency: input.currency.trim(),
      changes,
    };

    this.history.unshift(historyRecord);

    return { ...updatedLicense };
  }

  async modifyCommercialTerms(
    organizationId: string,
    input: ModifyCommercialTermsInput
  ): Promise<OrganizationLicense> {
    await mockDelay(400);

    const currentLicense = this.licenses.find((l) => l.organizationId === organizationId);
    if (!currentLicense) {
      throw new Error('Cannot modify terms: Organization does not have an active license.');
    }

    if (input.negotiatedPrice === undefined || input.negotiatedPrice === null || input.negotiatedPrice < 0) {
      throw new Error('Negotiated price is required and must be zero or greater.');
    }
    if (!input.currency || !input.currency.trim()) {
      throw new Error('Currency is required.');
    }

    const priceChanged = Number(input.negotiatedPrice) !== currentLicense.negotiatedPrice;
    const currencyChanged = input.currency.trim() !== currentLicense.currency;

    // If no values actually changed, do not create a history record
    if (!priceChanged && !currencyChanged) {
      return { ...currentLicense };
    }

    const nowIso = new Date().toISOString();
    const currentPlan = await licensePlanService.getPlan(currentLicense.planId);

    const changes: LicenseChangeDiff[] = [];
    if (priceChanged) {
      changes.push({
        field: 'negotiatedPrice',
        label: 'Negotiated Price',
        from: formatCurrency(currentLicense.negotiatedPrice, currentLicense.currency),
        to: formatCurrency(input.negotiatedPrice, input.currency),
      });
    }
    if (currencyChanged) {
      changes.push({
        field: 'currency',
        label: 'Currency',
        from: currentLicense.currency,
        to: input.currency.trim(),
      });
    }

    const updatedLicense: OrganizationLicense = {
      ...currentLicense,
      negotiatedPrice: Number(input.negotiatedPrice),
      currency: input.currency.trim(),
      updatedAt: nowIso,
    };

    const index = this.licenses.findIndex((l) => l.organizationId === organizationId);
    this.licenses[index] = updatedLicense;

    // Create history entry
    const historyRecord: OrganizationLicenseHistory = {
      id: `HIST-${Math.floor(100000 + Math.random() * 900000)}`,
      organizationId,
      eventType: 'commercial_terms_modified',
      eventAt: nowIso,
      planSnapshot: {
        planId: currentLicense.planId,
        planName: currentPlan?.name || 'Current Plan',
        planLevel: currentPlan?.level ?? 1,
        maxStores: currentPlan?.maxStores ?? 1,
        maxUsers: currentPlan?.maxUsers ?? 1,
      },
      startDate: updatedLicense.startDate,
      expiryDate: updatedLicense.expiryDate,
      negotiatedPrice: updatedLicense.negotiatedPrice,
      currency: updatedLicense.currency,
      changes,
    };

    this.history.unshift(historyRecord);

    return { ...updatedLicense };
  }

  async renewLicense(organizationId: string, input: RenewLicenseInput): Promise<OrganizationLicense> {
    await mockDelay(500);

    const currentLicense = this.licenses.find((l) => l.organizationId === organizationId);
    if (!currentLicense) {
      throw new Error('Cannot renew: Organization does not have an existing license.');
    }

    const currentPlan = await licensePlanService.getPlan(currentLicense.planId);
    const targetPlan = await licensePlanService.getPlan(input.planId);

    if (!targetPlan) {
      throw new Error(`Selected plan (${input.planId}) was not found.`);
    }
    if (targetPlan.status !== 'active') {
      throw new Error('Renewal requires an active plan.');
    }

    const currentLevel = currentPlan ? currentPlan.level : 0;
    if (targetPlan.level < currentLevel) {
      throw new Error(
        `Renewal cannot downgrade the plan. Selected level (${targetPlan.level}) is lower than current plan level (${currentLevel}).`
      );
    }

    if (!input.newStartDate || !input.newExpiryDate) {
      throw new Error('New start date and new expiry date are required.');
    }
    if (new Date(input.newExpiryDate).getTime() <= new Date(input.newStartDate).getTime()) {
      throw new Error('New expiry date must be after the new start date.');
    }

    if (input.negotiatedPrice === undefined || input.negotiatedPrice === null || input.negotiatedPrice < 0) {
      throw new Error('Negotiated price is required and must be zero or greater.');
    }
    if (!input.currency || !input.currency.trim()) {
      throw new Error('Currency is required.');
    }

    const nowIso = new Date().toISOString();

    const changes: LicenseChangeDiff[] = [
      {
        field: 'validityPeriod',
        label: 'License Period',
        from: `${currentLicense.startDate} to ${currentLicense.expiryDate}`,
        to: `${input.newStartDate} to ${input.newExpiryDate}`,
      },
    ];

    if (targetPlan.id !== currentLicense.planId) {
      changes.push({
        field: 'planName',
        label: 'Plan',
        from: currentPlan?.name || 'Previous Plan',
        to: targetPlan.name,
      });
      changes.push({
        field: 'maxStores',
        label: 'Maximum Stores',
        from: currentPlan?.maxStores ?? 0,
        to: targetPlan.maxStores,
      });
      changes.push({
        field: 'maxUsers',
        label: 'Maximum Users',
        from: currentPlan?.maxUsers ?? 0,
        to: targetPlan.maxUsers,
      });
    }

    if (currentLicense.negotiatedPrice !== Number(input.negotiatedPrice) || currentLicense.currency !== input.currency.trim()) {
      changes.push({
        field: 'negotiatedPrice',
        label: 'Negotiated Price',
        from: formatCurrency(currentLicense.negotiatedPrice, currentLicense.currency),
        to: formatCurrency(input.negotiatedPrice, input.currency),
      });
    }

    // Update current license to the renewed period
    const updatedLicense: OrganizationLicense = {
      ...currentLicense,
      planId: targetPlan.id,
      startDate: input.newStartDate,
      expiryDate: input.newExpiryDate,
      negotiatedPrice: Number(input.negotiatedPrice),
      currency: input.currency.trim(),
      updatedAt: nowIso,
    };

    const index = this.licenses.findIndex((l) => l.organizationId === organizationId);
    this.licenses[index] = updatedLicense;

    // Create history entry
    const historyRecord: OrganizationLicenseHistory = {
      id: `HIST-${Math.floor(100000 + Math.random() * 900000)}`,
      organizationId,
      eventType: 'renewed',
      eventAt: nowIso,
      planSnapshot: {
        planId: targetPlan.id,
        planName: targetPlan.name,
        planLevel: targetPlan.level,
        maxStores: targetPlan.maxStores,
        maxUsers: targetPlan.maxUsers,
      },
      startDate: input.newStartDate,
      expiryDate: input.newExpiryDate,
      negotiatedPrice: Number(input.negotiatedPrice),
      currency: input.currency.trim(),
      changes,
    };

    this.history.unshift(historyRecord);

    return { ...updatedLicense };
  }
}

export const organizationLicenseService: IOrganizationLicenseService = new MockOrganizationLicenseService();
