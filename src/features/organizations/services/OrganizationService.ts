import { mockDelay } from '@/shared/utils/mockDelay';
import { organizationLicenseService } from '@/features/licenses/services/OrganizationLicenseService';
import { licensePlanService } from '@/features/plans/services/LicensePlanService';
import { calculateLicenseStatus } from '@/features/licenses/utils/licenseStatus';
import {
  Organization,
  CreateOrganizationInput,
  UpdateOrganizationInput,
  OrganizationStatus,
  OrganizationQuery,
  PaginatedResult,
} from '../types';

export interface IOrganizationService {
  getOrganizations(query: OrganizationQuery): Promise<PaginatedResult<Organization>>;
  getOrganization(id: string): Promise<Organization | null>;
  createOrganization(input: CreateOrganizationInput): Promise<Organization>;
  updateOrganization(id: string, input: UpdateOrganizationInput): Promise<Organization>;
  changeOrganizationStatus(id: string, status: OrganizationStatus): Promise<Organization>;
}

// Initial realistic mock dataset representing Indian retail businesses
const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'ORG-88219',
    name: 'Punarva Fashion Hub',
    legalEntityName: 'Punarva Retail Holdings Pvt Ltd',
    taxId: 'GSTIN 27AABCP8821F1Z8',
    primaryAdmin: {
      name: 'Priya Patel',
      email: 'priya@punarva.com',
      phone: '+91 98201 44552',
      username: 'ppatel',
    },
    licensePlan: 'Multi-Store Enterprise',
    licenseStatus: 'active',
    licenseExpiryDate: '2027-02-15',
    status: 'active',
    createdDate: '2024-10-14',
    contactInfo: {
      primaryContactName: 'Priya Patel',
      email: 'priya@punarva.com',
      phone: '+91 98201 44552',
      address: '742 Brigade Road, 4th Floor',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 5,
    activeStores: 3,
    posRegisters: 7,
  },
  {
    id: 'ORG-41902',
    name: 'FabSutra Silks & Sarees',
    legalEntityName: 'FabSutra Ethnic Weaves Ltd',
    taxId: 'GSTIN 33AAACF4190D1ZO',
    primaryAdmin: {
      name: 'Rajesh Sharma',
      email: 'rajesh@fabsutra.in',
      phone: '+91 94440 18291',
      username: 'rsharma',
    },
    licensePlan: 'Regional Retail Chain',
    licenseStatus: 'expiring_soon',
    licenseExpiryDate: '2026-09-28',
    status: 'active',
    createdDate: '2024-08-20',
    contactInfo: {
      primaryContactName: 'Rajesh Sharma',
      email: 'rajesh@fabsutra.in',
      phone: '+91 94440 18291',
      address: '18 T. Nagar Commercial Complex',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600017',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 8,
    activeStores: 6,
    posRegisters: 12,
  },
  {
    id: 'ORG-76134',
    name: 'Kalyan Heritage Jewelers',
    legalEntityName: 'Kalyan Heritage Gems & Jewels LLP',
    taxId: 'GSTIN 32AAACK7613E1ZL',
    primaryAdmin: {
      name: 'Ananya Iyer',
      email: 'ananya@kalyanheritage.com',
      phone: '+91 98470 33119',
      username: 'aiyer',
    },
    licensePlan: 'Multi-Store Enterprise',
    licenseStatus: 'active',
    licenseExpiryDate: '2027-04-10',
    status: 'active',
    createdDate: '2024-05-11',
    contactInfo: {
      primaryContactName: 'Ananya Iyer',
      email: 'ananya@kalyanheritage.com',
      phone: '+91 98470 33119',
      address: 'M.G. Road Jewel Arcade',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682016',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 15,
    activeStores: 11,
    posRegisters: 24,
  },
  {
    id: 'ORG-29381',
    name: 'Malabar Spices & Provisions',
    legalEntityName: 'Malabar Agro Retailers Pvt Ltd',
    taxId: 'GSTIN 32AABCM2938B1ZF',
    primaryAdmin: {
      name: 'Faizal Rahman',
      email: 'faizal@malabarspices.in',
      phone: '+91 97455 22001',
      username: 'frahman',
    },
    licensePlan: 'Single Store Standard',
    licenseStatus: 'expired',
    licenseExpiryDate: '2026-08-15',
    status: 'suspended',
    createdDate: '2023-11-04',
    contactInfo: {
      primaryContactName: 'Faizal Rahman',
      email: 'faizal@malabarspices.in',
      phone: '+91 97455 22001',
      address: 'Shop 4, Beach Road Bazaar',
      city: 'Kozhikode',
      state: 'Kerala',
      pincode: '673001',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 1,
    activeStores: 1,
    posRegisters: 2,
  },
  {
    id: 'ORG-65410',
    name: 'Deccan Electronics World',
    legalEntityName: 'Deccan Consumer Digital Retail Ltd',
    taxId: 'GSTIN 36AABCD6541H1ZK',
    primaryAdmin: {
      name: 'Vikram Reddy',
      email: 'vikram@deccanelec.com',
      phone: '+91 98490 55123',
      username: 'vreddy',
    },
    licensePlan: 'Multi-Store Enterprise',
    licenseStatus: 'expiring_soon',
    licenseExpiryDate: '2026-10-02',
    status: 'active',
    createdDate: '2024-03-19',
    contactInfo: {
      primaryContactName: 'Vikram Reddy',
      email: 'vikram@deccanelec.com',
      phone: '+91 98490 55123',
      address: 'Hitec City Main Road, Cyber Towers Plaza',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 10,
    activeStores: 7,
    posRegisters: 18,
  },
  {
    id: 'ORG-83204',
    name: 'ChaiPoint Express Outlets',
    legalEntityName: 'ChaiPoint Quick Beverages Pvt Ltd',
    taxId: 'GSTIN 29AAACC8320C1ZP',
    primaryAdmin: {
      name: 'Sneha Sengupta',
      email: 'sneha@chaipointexpress.in',
      phone: '+91 99002 88471',
      username: 'ssengupta',
    },
    licensePlan: 'Regional Retail Chain',
    licenseStatus: 'active',
    licenseExpiryDate: '2027-01-20',
    status: 'active',
    createdDate: '2024-09-02',
    contactInfo: {
      primaryContactName: 'Sneha Sengupta',
      email: 'sneha@chaipointexpress.in',
      phone: '+91 99002 88471',
      address: 'Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 12,
    activeStores: 9,
    posRegisters: 14,
  },
  {
    id: 'ORG-19283',
    name: 'Varanasi Weavers Guild',
    legalEntityName: 'Kashi Handloom Artisan Co-Op',
    taxId: 'GSTIN 09AABCV1928K1ZX',
    primaryAdmin: {
      name: 'Manoj Tripathi',
      email: 'manoj@varanasiweavers.org',
      phone: '+91 94152 77319',
      username: 'mtripathi',
    },
    licensePlan: 'Boutique Starter',
    licenseStatus: 'active',
    licenseExpiryDate: '2026-11-18',
    status: 'active',
    createdDate: '2024-02-14',
    contactInfo: {
      primaryContactName: 'Manoj Tripathi',
      email: 'manoj@varanasiweavers.org',
      phone: '+91 94152 77319',
      address: 'Dashashwamedh Ghat Road',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      pincode: '221001',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 2,
    activeStores: 1,
    posRegisters: 2,
  },
  {
    id: 'ORG-90412',
    name: 'Nandi Organic Supermarket',
    legalEntityName: 'Nandi Natural Provisions LLP',
    taxId: 'GSTIN 29AAACN9041F1ZS',
    primaryAdmin: {
      name: 'Suresh Gowda',
      email: 'suresh@nandiorganic.in',
      phone: '+91 98801 99281',
      username: 'sgowda',
    },
    licensePlan: 'Single Store Standard',
    licenseStatus: 'expiring_soon',
    licenseExpiryDate: '2026-10-14',
    status: 'active',
    createdDate: '2024-06-30',
    contactInfo: {
      primaryContactName: 'Suresh Gowda',
      email: 'suresh@nandiorganic.in',
      phone: '+91 98801 99281',
      address: '45 Malleshwaram 8th Cross',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560003',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 1,
    activeStores: 1,
    posRegisters: 3,
  },
  {
    id: 'ORG-53819',
    name: 'Bawarchi Quick Mart',
    legalEntityName: 'Bawarchi Retail Franchise Systems',
    taxId: 'GSTIN 36AAACB5381G1Z9',
    primaryAdmin: {
      name: 'Imran Qureshi',
      email: 'imran@bawarchimart.com',
      phone: '+91 98480 12890',
      username: 'iqureshi',
    },
    licensePlan: 'Single Store Standard',
    licenseStatus: 'expired',
    licenseExpiryDate: '2026-07-30',
    status: 'suspended',
    createdDate: '2023-09-18',
    contactInfo: {
      primaryContactName: 'Imran Qureshi',
      email: 'imran@bawarchimart.com',
      phone: '+91 98480 12890',
      address: 'RTC X Roads, Musheerabad',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500020',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 3,
    activeStores: 0,
    posRegisters: 0,
  },
  {
    id: 'ORG-72109',
    name: 'Zouk Modern Handcrafted',
    legalEntityName: 'Zouk Lifestyle Brand Retails Pvt Ltd',
    taxId: 'GSTIN 27AAACZ7210M1Z2',
    primaryAdmin: {
      name: 'Meera Nair',
      email: 'meera@zouklifestyle.com',
      phone: '+91 98200 41728',
      username: 'mnair',
    },
    licensePlan: 'Regional Retail Chain',
    licenseStatus: 'active',
    licenseExpiryDate: '2027-03-05',
    status: 'active',
    createdDate: '2024-07-22',
    contactInfo: {
      primaryContactName: 'Meera Nair',
      email: 'meera@zouklifestyle.com',
      phone: '+91 98200 41728',
      address: 'Phoenix Palladium Mall, Lower Parel',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400013',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 6,
    activeStores: 4,
    posRegisters: 8,
  },
  {
    id: 'ORG-34190',
    name: 'Royal Rajasthan Handicrafts',
    legalEntityName: 'Desert Art & Craft Traders Co',
    taxId: 'GSTIN 08AAACR3419D1Z4',
    primaryAdmin: {
      name: 'Gajendra Rathore',
      email: 'gajendra@rajhandicrafts.in',
      phone: '+91 94140 88219',
      username: 'grathore',
    },
    licensePlan: 'Boutique Starter',
    licenseStatus: 'active',
    licenseExpiryDate: '2026-12-01',
    status: 'active',
    createdDate: '2024-04-18',
    contactInfo: {
      primaryContactName: 'Gajendra Rathore',
      email: 'gajendra@rajhandicrafts.in',
      phone: '+91 94140 88219',
      address: 'Johari Bazaar Heritage Lane',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302003',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 2,
    activeStores: 2,
    posRegisters: 3,
  },
  {
    id: 'ORG-61029',
    name: 'FreshCatch Coastal Seafood',
    legalEntityName: 'Konkan Cold Chain Outlets LLP',
    taxId: 'GSTIN 27AAACF6102H1ZQ',
    primaryAdmin: {
      name: 'Deepa Shenoy',
      email: 'deepa@freshcatch.in',
      phone: '+91 98211 63901',
      username: 'dshenoy',
    },
    licensePlan: 'Single Store Standard',
    licenseStatus: 'expiring_soon',
    licenseExpiryDate: '2026-09-25',
    status: 'active',
    createdDate: '2024-01-09',
    contactInfo: {
      primaryContactName: 'Deepa Shenoy',
      email: 'deepa@freshcatch.in',
      phone: '+91 98211 63901',
      address: 'Sasoon Docks Commercial Area',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400005',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 4,
    activeStores: 3,
    posRegisters: 5,
  },
  {
    id: 'ORG-48192',
    name: 'Coimbatore Textile Mills Direct',
    legalEntityName: 'Kongu Cotton Retail Network Ltd',
    taxId: 'GSTIN 33AAACC4819K1ZA',
    primaryAdmin: {
      name: 'K. Senthil Nathan',
      email: 'senthil@ctmdirect.co.in',
      phone: '+91 94433 19280',
      username: 'ksenthil',
    },
    licensePlan: 'Regional Retail Chain',
    licenseStatus: 'expired',
    licenseExpiryDate: '2026-06-12',
    status: 'suspended',
    createdDate: '2023-10-25',
    contactInfo: {
      primaryContactName: 'K. Senthil Nathan',
      email: 'senthil@ctmdirect.co.in',
      phone: '+91 94433 19280',
      address: 'Avinashi Road Textile Square',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641018',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 6,
    activeStores: 0,
    posRegisters: 0,
  },
  {
    id: 'ORG-98321',
    name: 'BlueTokai Craft Coffee Hubs',
    legalEntityName: 'BlueTokai Roasters & Retail India Pvt Ltd',
    taxId: 'GSTIN 07AAACB9832A1ZU',
    primaryAdmin: {
      name: 'Aditya Varma',
      email: 'aditya@craftcoffeehubs.in',
      phone: '+91 98110 99441',
      username: 'avarma',
    },
    licensePlan: 'Multi-Store Enterprise',
    licenseStatus: 'active',
    licenseExpiryDate: '2027-06-30',
    status: 'active',
    createdDate: '2024-11-15',
    contactInfo: {
      primaryContactName: 'Aditya Varma',
      email: 'aditya@craftcoffeehubs.in',
      phone: '+91 98110 99441',
      address: 'Saidulajab, Lane 3, Westend Marg',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110030',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 20,
    activeStores: 16,
    posRegisters: 32,
  },
  {
    id: 'ORG-23910',
    name: 'Vrindavan Pure Dairy',
    legalEntityName: 'Gau Seva Milk Retails & Foods LLP',
    taxId: 'GSTIN 09AAACV2391P1ZE',
    primaryAdmin: {
      name: 'Gaurav Sharma',
      email: 'gaurav@vrindavandairy.com',
      phone: '+91 94122 71092',
      username: 'gsharma',
    },
    licensePlan: 'Single Store Standard',
    licenseStatus: 'active',
    licenseExpiryDate: '2026-11-11',
    status: 'active',
    createdDate: '2024-03-01',
    contactInfo: {
      primaryContactName: 'Gaurav Sharma',
      email: 'gaurav@vrindavandairy.com',
      phone: '+91 94122 71092',
      address: 'Mathura Bypass Junction',
      city: 'Mathura',
      state: 'Uttar Pradesh',
      pincode: '281001',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 3,
    activeStores: 2,
    posRegisters: 4,
  },
  {
    id: 'ORG-81723',
    name: 'Mysore Sandal Emporium',
    legalEntityName: 'Karnataka Fragrances & Heritage Retails',
    taxId: 'GSTIN 29AAACK8172L1ZC',
    primaryAdmin: {
      name: 'Rashmi Hegde',
      email: 'rashmi@mysoresandal.in',
      phone: '+91 98860 44211',
      username: 'rhegde',
    },
    licensePlan: 'Boutique Starter',
    licenseStatus: 'active',
    licenseExpiryDate: '2027-02-14',
    status: 'active',
    createdDate: '2024-06-17',
    contactInfo: {
      primaryContactName: 'Rashmi Hegde',
      email: 'rashmi@mysoresandal.in',
      phone: '+91 98860 44211',
      address: 'Sayyaji Rao Road Heritage Building',
      city: 'Mysuru',
      state: 'Karnataka',
      pincode: '570001',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 2,
    activeStores: 1,
    posRegisters: 2,
  },
  {
    id: 'ORG-55104',
    name: 'Darjeeling Leaf Tea Lounge',
    legalEntityName: 'Himalayan Estate Teas Private Ltd',
    taxId: 'GSTIN 19AAACD5510R1Z6',
    primaryAdmin: {
      name: 'Tenzing Bhutia',
      email: 'tenzing@darjeelingleaf.in',
      phone: '+91 98320 67123',
      username: 'tbhutia',
    },
    licensePlan: 'Boutique Starter',
    licenseStatus: 'expiring_soon',
    licenseExpiryDate: '2026-10-08',
    status: 'active',
    createdDate: '2024-04-03',
    contactInfo: {
      primaryContactName: 'Tenzing Bhutia',
      email: 'tenzing@darjeelingleaf.in',
      phone: '+91 98320 67123',
      address: 'Chowrasta Mall View Arcade',
      city: 'Darjeeling',
      state: 'West Bengal',
      pincode: '734101',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 2,
    activeStores: 2,
    posRegisters: 3,
  },
  {
    id: 'ORG-67291',
    name: 'Surat Diamond Exchange Mart',
    legalEntityName: 'Surat Bourse Fine Gems & Retail Ltd',
    taxId: 'GSTIN 24AAACS6729J1Z1',
    primaryAdmin: {
      name: 'Bhavesh Patel',
      email: 'bhavesh@suratdiamonds.in',
      phone: '+91 98250 81902',
      username: 'bpatel',
    },
    licensePlan: 'Multi-Store Enterprise',
    licenseStatus: 'active',
    licenseExpiryDate: '2027-05-19',
    status: 'active',
    createdDate: '2024-07-08',
    contactInfo: {
      primaryContactName: 'Bhavesh Patel',
      email: 'bhavesh@suratdiamonds.in',
      phone: '+91 98250 81902',
      address: 'DREAM City Diamond Complex',
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395007',
    },
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    allowedStores: 8,
    activeStores: 5,
    posRegisters: 15,
  }
];

class MockOrganizationService implements IOrganizationService {
  private organizations: Organization[] = [...INITIAL_ORGANIZATIONS];

  private async enrichOrganization(org: Organization): Promise<Organization> {
    const license = await organizationLicenseService.getCurrentLicense(org.id);
    if (!license) {
      return {
        ...org,
        licensePlan: 'Unassigned',
        licenseStatus: 'not_assigned',
        licenseExpiryDate: '—',
        allowedStores: 0,
      };
    }
    const plan = await licensePlanService.getPlan(license.planId);
    const status = calculateLicenseStatus(license);
    return {
      ...org,
      licensePlan: plan?.name || 'Unknown Plan',
      licenseStatus: status,
      licenseExpiryDate: license.expiryDate,
      allowedStores: plan?.maxStores ?? org.allowedStores,
    };
  }

  async getOrganizations(query: OrganizationQuery): Promise<PaginatedResult<Organization>> {
    await mockDelay(250);

    // Dynamically enrich all organizations with real license and plan data
    const enrichedList = await Promise.all(
      this.organizations.map((org) => this.enrichOrganization(org))
    );

    let filtered = enrichedList;

    // Search filter: business name, id, primary admin name or email
    if (query.search && query.search.trim()) {
      const term = query.search.trim().toLowerCase();
      filtered = filtered.filter((org) => {
        const matchesName = org.name.toLowerCase().includes(term);
        const matchesId = org.id.toLowerCase().includes(term);
        const matchesAdmin = org.primaryAdmin?.name.toLowerCase().includes(term) || false;
        const matchesEmail = org.primaryAdmin?.email.toLowerCase().includes(term) || false;
        const matchesCity = org.contactInfo.city?.toLowerCase().includes(term) || false;
        return matchesName || matchesId || matchesAdmin || matchesEmail || matchesCity;
      });
    }

    // Organization Status filter
    if (query.organizationStatus && query.organizationStatus !== 'all') {
      filtered = filtered.filter((org) => org.status === query.organizationStatus);
    }

    // License Status filter
    if (query.licenseStatus && query.licenseStatus !== 'all') {
      filtered = filtered.filter((org) => org.licenseStatus === query.licenseStatus);
    }

    const total = filtered.length;
    const page = Math.max(1, query.page);
    const pageSize = Math.max(1, query.pageSize);
    const totalPages = Math.ceil(total / pageSize) || 1;

    const startIndex = (page - 1) * pageSize;
    const items = filtered.slice(startIndex, startIndex + pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  async getOrganization(id: string): Promise<Organization | null> {
    await mockDelay(150);
    const found = this.organizations.find((o) => o.id === id);
    if (!found) return null;
    return this.enrichOrganization(found);
  }

  async createOrganization(input: CreateOrganizationInput): Promise<Organization> {
    await mockDelay(600);

    // Generate unique random 5-digit ID (e.g. ORG-74812)
    let newId = '';
    do {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      newId = `ORG-${randomNum}`;
    } while (this.organizations.some((o) => o.id === newId));

    const today = new Date().toISOString().split('T')[0];

    const newOrg: Organization = {
      id: newId,
      name: input.name.trim(),
      legalEntityName: input.legalEntityName?.trim() || `${input.name.trim()} Retail Operations LLP`,
      taxId: input.taxId?.trim() || `GSTIN 27AAACP${Math.floor(1000 + Math.random() * 9000)}F1Z1`,
      primaryAdmin: {
        name: input.primaryContactName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        username: input.email.split('@')[0],
      },
      licensePlan: 'Unassigned',
      licenseStatus: 'not_assigned',
      licenseExpiryDate: '—',
      status: 'active',
      createdDate: today,
      contactInfo: {
        primaryContactName: input.primaryContactName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        address: input.address?.trim() || 'Headquarters Commercial Complex',
        city: input.city?.trim() || 'Mumbai',
        state: input.state?.trim() || 'Maharashtra',
        pincode: '400001',
      },
      timezone: input.timezone || 'Asia/Kolkata (IST)',
      currency: input.currency || 'INR (₹)',
      allowedStores: 1,
      activeStores: 1,
      posRegisters: 2,
    };

    // Prepend to list so it appears immediately on page 1
    this.organizations.unshift(newOrg);

    return { ...newOrg };
  }

  async updateOrganization(id: string, input: UpdateOrganizationInput): Promise<Organization> {
    await mockDelay(500);
    const index = this.organizations.findIndex((o) => o.id === id);
    if (index === -1) {
      throw new Error(`Organization with ID ${id} not found.`);
    }

    const current = this.organizations[index];
    const updated: Organization = {
      ...current,
      name: input.name.trim(),
      legalEntityName: input.legalEntityName?.trim() || current.legalEntityName,
      taxId: input.taxId?.trim() || current.taxId,
      primaryAdmin: {
        name: input.primaryContactName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        username: current.primaryAdmin?.username || input.email.split('@')[0],
      },
      contactInfo: {
        ...current.contactInfo,
        primaryContactName: input.primaryContactName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        address: input.address?.trim() || current.contactInfo.address,
        city: input.city?.trim() || current.contactInfo.city,
        state: input.state?.trim() || current.contactInfo.state,
      },
      timezone: input.timezone || current.timezone,
      currency: input.currency || current.currency,
    };

    this.organizations[index] = updated;
    return { ...updated };
  }

  async changeOrganizationStatus(id: string, status: OrganizationStatus): Promise<Organization> {
    await mockDelay(400);
    const index = this.organizations.findIndex((o) => o.id === id);
    if (index === -1) {
      throw new Error(`Organization with ID ${id} not found.`);
    }

    const current = this.organizations[index];
    const updated: Organization = {
      ...current,
      status,
    };

    this.organizations[index] = updated;
    return { ...updated };
  }
}

export const organizationService: IOrganizationService = new MockOrganizationService();
