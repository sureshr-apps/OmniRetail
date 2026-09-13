import {
  ServicePerson,
  ServicePersonStatus,
  ServicePersonScope,
  ServicePersonQuery,
  ServicePersonQueryResult,
  CreateServicePersonInput,
  UpdateServicePersonInput,
} from '../types';
import { getCurrentUserAuthorization, listTenantServicePersons } from '@omniretail/sql-connect';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';

export interface IServicePersonService {
  getServicePersons(query: ServicePersonQuery): Promise<ServicePersonQueryResult>;
  getServicePerson(id: string): Promise<ServicePerson | null>;
  createServicePerson(input: CreateServicePersonInput): Promise<ServicePerson>;
  updateServicePerson(id: string, input: UpdateServicePersonInput): Promise<ServicePerson>;
  changeServicePersonStatus(id: string, status: ServicePersonStatus): Promise<ServicePerson>;
  getSpecializations(): Promise<string[]>;
  getNextServicePersonCode(): string;
  getActiveCount(): Promise<number>;
}

const INITIAL_SERVICE_PERSONS: ServicePerson[] = [
  {
    id: 'srv-101',
    servicePersonCode: 'SRV-101',
    firstName: 'Marcus',
    lastName: 'Vance',
    displayName: 'Marcus Vance',
    email: 'm.vance@omnitrade.internal',
    phone: '+1 (555) 382-9102',
    specialization: 'HVAC & Appliance Repair',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-1',
    outletName: 'Downtown Flagship #04',
    status: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArAWdGFeibF2HcHx-7nRe5INqK9z3uzQd_sszy-I4zAjq89wTHtuICsgl0krBwDpUnhVan24RG93sBQLt2tl8V7GrsEUNC-nhkSCJMw4Rk15R1FeBbfpJTMrz2AVJKEB3O1XZLMkx4o9ACsrWxZw8WB-PXn7-cAhFYxDpEtdYmk6JnCZCpCcDXqqjYi0ZtdEPf2pwBd_Rr17sO1XUkcE4lZqnFGEPW6THOCW3QdAwxmRdjKMBUB1o',
    dateOfJoining: '2023-10-15',
    address: '410 Congress Ave, Ste 100',
    city: 'Austin',
    postalCode: '78701',
    yearsOfExperience: 6,
    skills: ['EPA Universal Certified', 'Commercial Chiller Diagnostics', 'POS Terminal Wiring'],
    notes: 'Primary technician on-call for Downtown Flagship refrigeration and primary climate controls.',
    openJobsCount: 3,
    openJobs: [
      {
        id: 'job-1',
        title: 'HVAC Unit #3 Compressor Fault',
        outletName: 'Downtown Flagship',
        assignedTimeAgo: 'Assigned 2 hrs ago',
        status: 'In Progress',
      },
      {
        id: 'job-2',
        title: 'Walk-in Freezer Temp Drift',
        outletName: 'Westside Mall #02',
        assignedTimeAgo: 'Assigned Yesterday',
        status: 'Pending Parts',
      },
    ],
    timelineEvents: [
      {
        id: 'tl-1',
        title: 'Completed Job #JB-9041',
        timestamp: 'Today at 10:15 AM · Downtown Flagship #04',
        isPrimary: true,
      },
      {
        id: 'tl-2',
        title: 'Checked in for morning shift',
        timestamp: 'Today at 08:30 AM',
      },
      {
        id: 'tl-3',
        title: 'Assigned to Westside Mall maintenance',
        timestamp: 'Yesterday at 04:00 PM',
      },
    ],
    createdAt: '2023-10-15T08:00:00Z',
    updatedAt: '2024-09-12T10:15:00Z',
  },
  {
    id: 'srv-102',
    servicePersonCode: 'SRV-102',
    firstName: 'Elena',
    lastName: 'Rostova',
    displayName: 'Elena Rostova',
    email: 'e.rostova@omnitrade.internal',
    phone: '+1 (555) 492-1105',
    specialization: 'Electronics & POS Hardware',
    assignmentScope: 'Entire Organization',
    outletName: 'Organization-wide',
    status: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBypI1QweyV8JNCapBS8tIIWH1O56lux3ZwrXpYpXPR4HsHMXhRfFA7IcctMI8eTztxS9W2FKaWYvuC_pkxrrJl3j8X511T_O8COZYY12Bq0Bb0Do-Nm_M3r8UDXMw9I-7f0LeMzPr0JXSyG5qVhzumkRcAZ32NFIhtqXLwtsgC4MMfWzmr-IT47HmmK_rty3jZy0psWPYLM6OohDrM-Io3hIAF1EOVrac9ZcHLOef1wh8HI5yeHI',
    dateOfJoining: '2023-08-01',
    address: '8201 Uptown Blvd',
    city: 'Austin',
    postalCode: '78759',
    yearsOfExperience: 8,
    skills: ['Epson & Zebra Thermal Printers', 'Verifone P400 Pinpad Diagnostics', 'Ingenico Lane 3000'],
    notes: 'Lead mobile POS hardware technician. Regional dispatch coverage across Central Texas.',
    openJobsCount: 5,
    openJobs: [
      {
        id: 'job-3',
        title: 'Barcode Scanner Optic Calibration',
        outletName: 'Downtown Flagship',
        assignedTimeAgo: 'Assigned 4 hrs ago',
        status: 'In Progress',
      },
      {
        id: 'job-4',
        title: 'Register #2 Thermal Receipt Feed Jam',
        outletName: 'North Outlet #08',
        assignedTimeAgo: 'Assigned Today',
        status: 'Scheduled',
      },
    ],
    timelineEvents: [
      {
        id: 'tl-4',
        title: 'Upgraded Firmware on 4 POS Registers',
        timestamp: 'Today at 11:20 AM · Downtown Flagship #04',
        isPrimary: true,
      },
      {
        id: 'tl-5',
        title: 'Dispatch ticket assigned for Register #2',
        timestamp: 'Today at 09:10 AM',
      },
    ],
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2024-09-12T11:20:00Z',
  },
  {
    id: 'srv-103',
    servicePersonCode: 'SRV-103',
    firstName: 'Derrick',
    lastName: 'Sterling',
    displayName: 'Derrick Sterling',
    email: 'd.sterling@omnitrade.internal',
    phone: '+1 (555) 839-2041',
    specialization: 'Plumbing & Fixtures',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-10',
    outletName: 'Westside Mall #02',
    status: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNNfnLvlxjXiRCqrd08Qt3hUCz9l1gmxbf_5BpTXPbkOyCVaK142dSXycvDqrjIa1WJw8nVHSUpTsbJByk6pI5Z_HtQGCafYLShR6v_BBoy8zWR-Uuf3wgEmwUJbpOatgibFZswoJ5ZeE7URhyh68CltO93zhIRrvw2OPytk3wkkXJbX5VcD39RcrToa93-HyIiK2ei94QKjEsHIkMTaOLlG-mKF9_g8CLm9G98mSWhwYx5_N4Y8Q',
    dateOfJoining: '2024-01-10',
    address: '2901 S Capital of Texas Hwy',
    city: 'Austin',
    postalCode: '78746',
    yearsOfExperience: 5,
    skills: ['Commercial Plumbing', 'Drain Maintenance', 'Emergency Water Shutoff Cert'],
    notes: 'Handles Westside mall retail facilities and water fixture infrastructure.',
    openJobsCount: 1,
    openJobs: [
      {
        id: 'job-5',
        title: 'Restroom Valve Replacement',
        outletName: 'Westside Mall #02',
        assignedTimeAgo: 'Assigned Yesterday',
        status: 'In Progress',
      },
    ],
    timelineEvents: [
      {
        id: 'tl-6',
        title: 'Scheduled inspection of backroom pipes',
        timestamp: 'Yesterday at 02:00 PM',
        isPrimary: true,
      },
    ],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-09-11T16:00:00Z',
  },
  {
    id: 'srv-104',
    servicePersonCode: 'SRV-104',
    firstName: 'Amina',
    lastName: 'Lin',
    displayName: 'Amina Lin',
    email: 'a.lin@omnitrade.internal',
    phone: '+1 (555) 710-9832',
    specialization: 'IT & Network Setup',
    assignmentScope: 'Entire Organization',
    outletName: 'Organization-wide',
    status: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1y9OFKvbDvedbWCBuABjfbpZ0vSG-NXbYyJiFBQWWUBQxCCewpgQZsTw0yJOXx6HoovQyuxYIxMJgHk-E1TqzwhDDBafu7t8GxqoeZybi23HmCjwmkIJG9hdjMo76jGBC2u7NdFXysh2FqgzPyQJcGioDZBh7-DfnUszKrMOgE91b9GJqMj-4VyNHtfuCcBz6qY3E1iiNBU0w_XPLKFeXUWh9jo2asy2gn_rtZDiTVvxCBlY_k7g',
    dateOfJoining: '2023-05-12',
    address: '1540 Metro Pkwy',
    city: 'Round Rock',
    postalCode: '78664',
    yearsOfExperience: 7,
    skills: ['Cisco Meraki Switching', 'VLAN Configuration', 'LTE Failover Modem Setup', 'Cat6 Cabling'],
    notes: 'Oversees network redundancy, Wi-Fi access points, and POS VLAN routing across all retail locations.',
    openJobsCount: 0,
    openJobs: [],
    timelineEvents: [
      {
        id: 'tl-7',
        title: 'Network latency benchmark cleared (4ms)',
        timestamp: 'Today at 09:00 AM · All Outlets',
        isPrimary: true,
      },
    ],
    createdAt: '2023-05-12T09:00:00Z',
    updatedAt: '2024-09-12T09:00:00Z',
  },
  {
    id: 'srv-105',
    servicePersonCode: 'SRV-105',
    firstName: 'Robert',
    lastName: 'Thorne',
    displayName: 'Robert Thorne',
    email: 'r.thorne@omnitrade.internal',
    phone: '+1 (555) 234-5511',
    specialization: 'HVAC & Appliance Repair',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-11',
    outletName: 'North Outlet #08',
    status: 'Inactive',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuU5QTKvaJl3yk2ZZITU9SnayK2TIrb-8T1LTf-nqC2YuG5gSj9Cn0wGGwegzKxtUTan6OjnfonaoJwTHC34JPfqUoTlxN6D_d7YUi4LA-H4E1l4E8Ozjy2L8LYtKRojv3vBI5udDcYW7jLeQTigwrDEBaDcM4hb0QpymtwfxauOpICU2BtMO-0zPXH4UK3TP6kFVBlNXZ1dgY6swdm3MkBZa3YIN8UeTrTMu9l8UzZ2hfOo_DdpA',
    dateOfJoining: '2022-11-20',
    address: '10200 Research Blvd',
    city: 'Austin',
    postalCode: '78759',
    yearsOfExperience: 14,
    skills: ['Commercial HVAC', 'Duct Sealing', 'Boiler Maintenance'],
    notes: 'Inactive due to seasonal maintenance contract conclusion. Preserved for historical service records.',
    openJobsCount: 0,
    openJobs: [],
    timelineEvents: [
      {
        id: 'tl-8',
        title: 'Account set to Inactive status',
        timestamp: 'Aug 30, 2024 by Administrator',
        isPrimary: true,
      },
    ],
    createdAt: '2022-11-20T11:00:00Z',
    updatedAt: '2024-08-30T17:00:00Z',
  },
  {
    id: 'srv-106',
    servicePersonCode: 'SRV-106',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    displayName: 'Sarah Jenkins',
    email: 's.jenkins@omnitrade.internal',
    phone: '+1 (555) 902-3341',
    specialization: 'Electronics & POS Hardware',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-1',
    outletName: 'Downtown Flagship #04',
    status: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwZcOUycWriJteN4-uNE0AtSU5-EWxBpkt4ibyuUWOqSv6VRV3iKj65S8Ak9NamIwYqIrZudH-q25lmiVIP8Yz6YLq5I53s6XBPI8QPDhAMYO4J5xgEq8j_cR2JlLqOUHxuWkDUwterzj16su8A9ldxXJ0W2jeCvWvUvR7K5loNw-1gfzeC30f_ti8eKwiiEWK7RXfHzcUzRo89AUYk09I08eXpuU9EfseZvx266Wbaclf1Db4na0',
    dateOfJoining: '2023-09-01',
    address: '410 Congress Ave',
    city: 'Austin',
    postalCode: '78701',
    yearsOfExperience: 4,
    skills: ['Touchscreen Digitizer Repair', 'Receipt Printer Calibration', 'Cash Drawer Solenoids'],
    notes: 'Local hardware specialist stationed on-site for Flagship Store 04 registers.',
    openJobsCount: 2,
    openJobs: [
      {
        id: 'job-6',
        title: 'Customer Display Pole Mount Fix',
        outletName: 'Downtown Flagship #04',
        assignedTimeAgo: 'Assigned 1 hr ago',
        status: 'In Progress',
      },
      {
        id: 'job-7',
        title: 'Replace Backup UPS Battery',
        outletName: 'Downtown Flagship #04',
        assignedTimeAgo: 'Assigned Yesterday',
        status: 'Scheduled',
      },
    ],
    timelineEvents: [
      {
        id: 'tl-9',
        title: 'Installed Pole Mount Bracket on Reg 03',
        timestamp: 'Today at 10:00 AM',
        isPrimary: true,
      },
    ],
    createdAt: '2023-09-01T08:30:00Z',
    updatedAt: '2024-09-12T10:00:00Z',
  },
  {
    id: 'srv-107',
    servicePersonCode: 'SRV-107',
    firstName: 'Jonathan',
    lastName: 'Brooks',
    displayName: 'Jonathan Brooks',
    email: 'j.brooks@omnitrade.internal',
    phone: '+1 (555) 345-8812',
    specialization: 'HVAC & Appliance Repair',
    assignmentScope: 'Entire Organization',
    outletName: 'Organization-wide',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2024-02-01',
    address: '123 Retail Pkwy',
    city: 'Austin',
    postalCode: '78704',
    yearsOfExperience: 5,
    skills: ['HVAC EPA Certified', 'POS Terminal Diagnostics', 'Circuit Repair'],
    notes: 'Mobile technician supporting retail heating, ventilation, and air systems.',
    openJobsCount: 2,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-09-10T11:00:00Z',
  },
  {
    id: 'srv-108',
    servicePersonCode: 'SRV-108',
    firstName: 'Carlos',
    lastName: 'Mendez',
    displayName: 'Carlos Mendez',
    email: 'c.mendez@omnitrade.internal',
    phone: '+1 (555) 431-7729',
    specialization: 'Plumbing & Fixtures',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-12',
    outletName: 'Eastside Depot #11',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2023-11-15',
    address: '3800 Airport Blvd',
    city: 'Austin',
    postalCode: '78722',
    yearsOfExperience: 7,
    skills: ['Warehouse Plumbing', 'Pressure Regulators', 'Backflow Prevention'],
    notes: 'Handles depot piping, warehouse drainage, and staff washroom fixtures.',
    openJobsCount: 1,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2023-11-15T09:00:00Z',
    updatedAt: '2024-09-09T14:20:00Z',
  },
  {
    id: 'srv-109',
    servicePersonCode: 'SRV-109',
    firstName: 'Maya',
    lastName: 'Patel',
    displayName: 'Maya Patel',
    email: 'm.patel@omnitrade.internal',
    phone: '+1 (555) 890-1234',
    specialization: 'IT & Network Setup',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-1',
    outletName: 'Downtown Flagship #04',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2024-01-18',
    address: '410 Congress Ave',
    city: 'Austin',
    postalCode: '78701',
    yearsOfExperience: 4,
    skills: ['Network Security', 'Firewall Rules', 'VoIP Setup'],
    notes: 'Downtown store local network and wireless telemetry coordinator.',
    openJobsCount: 1,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-09-08T15:00:00Z',
  },
  {
    id: 'srv-110',
    servicePersonCode: 'SRV-110',
    firstName: 'Leon',
    lastName: 'Kim',
    displayName: 'Leon Kim',
    email: 'l.kim@omnitrade.internal',
    phone: '+1 (555) 678-3342',
    specialization: 'Electronics & POS Hardware',
    assignmentScope: 'Entire Organization',
    outletName: 'Organization-wide',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2023-04-10',
    address: '11410 Century Oaks Terrace',
    city: 'Austin',
    postalCode: '78758',
    yearsOfExperience: 6,
    skills: ['Cash Drawer Mechanism', 'Barcode Scanners', 'Scale Calibration'],
    notes: 'Certified for trade legal weigh-scale calibration and scanner recalibration.',
    openJobsCount: 3,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2023-04-10T09:00:00Z',
    updatedAt: '2024-09-10T12:00:00Z',
  },
  {
    id: 'srv-111',
    servicePersonCode: 'SRV-111',
    firstName: 'Zoe',
    lastName: 'Alvarez',
    displayName: 'Zoe Alvarez',
    email: 'z.alvarez@omnitrade.internal',
    phone: '+1 (555) 456-7890',
    specialization: 'HVAC & Appliance Repair',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-10',
    outletName: 'Westside Mall #02',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2024-03-01',
    address: '2901 S Capital of Texas Hwy',
    city: 'Austin',
    postalCode: '78746',
    yearsOfExperience: 5,
    skills: ['Thermostat Logic', 'Ductless Mini-Splits', 'Air Filter Cycling'],
    notes: 'Handles mall temperature sensor calibrations and air quality management.',
    openJobsCount: 0,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-09-07T14:00:00Z',
  },
  {
    id: 'srv-112',
    servicePersonCode: 'SRV-112',
    firstName: 'Thomas',
    lastName: 'Wright',
    displayName: 'Thomas Wright',
    email: 't.wright@omnitrade.internal',
    phone: '+1 (555) 789-0123',
    specialization: 'Plumbing & Fixtures',
    assignmentScope: 'Entire Organization',
    outletName: 'Organization-wide',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2023-07-22',
    address: '500 E 4th St',
    city: 'Austin',
    postalCode: '78701',
    yearsOfExperience: 9,
    skills: ['Commercial Fixture Diagnostics', 'Water Heaters', 'Grease Traps'],
    notes: 'Senior plumbing lead dispatched for organization emergency leaks.',
    openJobsCount: 2,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2023-07-22T08:00:00Z',
    updatedAt: '2024-09-11T13:30:00Z',
  },
  {
    id: 'srv-113',
    servicePersonCode: 'SRV-113',
    firstName: 'Kavita',
    lastName: 'Reddy',
    displayName: 'Kavita Reddy',
    email: 'k.reddy@omnitrade.internal',
    phone: '+1 (555) 321-6549',
    specialization: 'IT & Network Setup',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-11',
    outletName: 'North Outlet #08',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2024-04-15',
    address: '10200 Research Blvd',
    city: 'Austin',
    postalCode: '78759',
    yearsOfExperience: 3,
    skills: ['LAN Optimization', 'Barcode Scanner Pairing', 'Handheld Terminal Setup'],
    notes: 'North retail technology installer and inventory terminal technician.',
    openJobsCount: 1,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2024-04-15T09:00:00Z',
    updatedAt: '2024-09-09T16:00:00Z',
  },
  {
    id: 'srv-114',
    servicePersonCode: 'SRV-114',
    firstName: 'Liam',
    lastName: 'O\'Connor',
    displayName: 'Liam O\'Connor',
    email: 'l.oconnor@omnitrade.internal',
    phone: '+1 (555) 654-9871',
    specialization: 'Electronics & POS Hardware',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-12',
    outletName: 'Eastside Depot #11',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2023-12-05',
    address: '3800 Airport Blvd',
    city: 'Austin',
    postalCode: '78722',
    yearsOfExperience: 4,
    skills: ['Zebra Barcode Printers', 'Industrial Scanners', 'RFID Gates'],
    notes: 'Specialist for depot loading dock scanners and warehouse inventory guns.',
    openJobsCount: 2,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2023-12-05T08:30:00Z',
    updatedAt: '2024-09-11T17:00:00Z',
  },
  {
    id: 'srv-115',
    servicePersonCode: 'SRV-115',
    firstName: 'Hannah',
    lastName: 'Nguyen',
    displayName: 'Hannah Nguyen',
    email: 'h.nguyen@omnitrade.internal',
    phone: '+1 (555) 234-8901',
    specialization: 'HVAC & Appliance Repair',
    assignmentScope: 'Entire Organization',
    outletName: 'Organization-wide',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2024-05-10',
    address: '1600 S 1st St',
    city: 'Austin',
    postalCode: '78704',
    yearsOfExperience: 6,
    skills: ['Refrigeration Diagnostics', 'Compressor Rebuilding', 'Thermostatic Expansion Valves'],
    notes: 'Mobile technician handling refrigeration and display freezer units.',
    openJobsCount: 1,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2024-05-10T09:00:00Z',
    updatedAt: '2024-09-10T10:30:00Z',
  },
  {
    id: 'srv-116',
    servicePersonCode: 'SRV-116',
    firstName: 'Lucas',
    lastName: 'Silva',
    displayName: 'Lucas Silva',
    email: 'l.silva@omnitrade.internal',
    phone: '+1 (555) 876-5432',
    specialization: 'IT & Network Setup',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-10',
    outletName: 'Westside Mall #02',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2023-06-19',
    address: '2901 S Capital of Texas Hwy',
    city: 'Austin',
    postalCode: '78746',
    yearsOfExperience: 5,
    skills: ['POS Peripheral Networking', 'Ethernet Testing', 'Switch Stacking'],
    notes: 'Westside Mall terminal and back-office cabling maintainer.',
    openJobsCount: 0,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2023-06-19T09:00:00Z',
    updatedAt: '2024-09-08T11:00:00Z',
  },
  {
    id: 'srv-117',
    servicePersonCode: 'SRV-117',
    firstName: 'Daniel',
    lastName: 'Choi',
    displayName: 'Daniel Choi',
    email: 'd.choi@omnitrade.internal',
    phone: '+1 (555) 345-6712',
    specialization: 'Electronics & POS Hardware',
    assignmentScope: 'Entire Organization',
    outletName: 'Organization-wide',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2024-06-01',
    address: '2204 Westlake Hills Pkwy',
    city: 'Austin',
    postalCode: '78746',
    yearsOfExperience: 3,
    skills: ['Customer Facing Displays', 'Card Reader Calibration', 'Cable Harnessing'],
    notes: 'Support technician for terminal register attachments and power conditioners.',
    openJobsCount: 2,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2024-06-01T08:00:00Z',
    updatedAt: '2024-09-11T12:00:00Z',
  },
  {
    id: 'srv-118',
    servicePersonCode: 'SRV-118',
    firstName: 'Grace',
    lastName: 'Miller',
    displayName: 'Grace Miller',
    email: 'g.miller@omnitrade.internal',
    phone: '+1 (555) 987-6543',
    specialization: 'Plumbing & Fixtures',
    assignmentScope: 'Specific Outlet',
    outletId: 'out-1',
    outletName: 'Downtown Flagship #04',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2024-07-10',
    address: '410 Congress Ave',
    city: 'Austin',
    postalCode: '78701',
    yearsOfExperience: 4,
    skills: ['Fixture Polishing', 'Drainage Valves', 'Leak Detection Sensors'],
    notes: 'On-site facilities maintenance for Flagship VIP fitting rooms and lounges.',
    openJobsCount: 1,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2024-07-10T09:00:00Z',
    updatedAt: '2024-09-12T08:00:00Z',
  },
  {
    id: 'srv-119',
    servicePersonCode: 'SRV-119',
    firstName: 'Ethan',
    lastName: 'Hunt',
    displayName: 'Ethan Hunt',
    email: 'e.hunt@omnitrade.internal',
    phone: '+1 (555) 654-3210',
    specialization: 'IT & Network Setup',
    assignmentScope: 'Entire Organization',
    outletName: 'Organization-wide',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    dateOfJoining: '2024-08-01',
    address: '849 E Commerce St',
    city: 'San Antonio',
    postalCode: '78205',
    yearsOfExperience: 8,
    skills: ['SD-WAN Deployments', 'Switch Provisioning', 'POS Terminal VLAN'],
    notes: 'Regional network lead for Central Texas stores and satellite depots.',
    openJobsCount: 3,
    openJobs: [],
    timelineEvents: [],
    createdAt: '2024-08-01T08:00:00Z',
    updatedAt: '2024-09-11T15:00:00Z',
  },
];

class MockServicePersonService implements IServicePersonService {
  private servicePersons: ServicePerson[] = [...INITIAL_SERVICE_PERSONS];

  private delay(ms = 180): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async getServicePersons(query: ServicePersonQuery): Promise<ServicePersonQueryResult> {
    await this.delay(160);

    const {
      search = '',
      status = 'All',
      assignmentScope = 'All',
      specialization = 'All',
      page = 1,
      pageSize = 10,
    } = query;

    let filtered = [...this.servicePersons];

    // Status filter
    if (status !== 'All') {
      filtered = filtered.filter((sp) => sp.status === status);
    }

    // Assignment scope filter
    if (assignmentScope !== 'All') {
      filtered = filtered.filter((sp) => sp.assignmentScope === assignmentScope);
    }

    // Specialization filter
    if (specialization && specialization !== 'All' && specialization !== 'all') {
      const lowerSpec = specialization.toLowerCase();
      filtered = filtered.filter((sp) => {
        const itemSpec = sp.specialization.toLowerCase();
        // Support shorthand filter keys like 'hvac', 'pos', 'plumbing', 'it'
        if (lowerSpec === 'hvac') return itemSpec.includes('hvac');
        if (lowerSpec === 'pos') return itemSpec.includes('pos') || itemSpec.includes('electronics');
        if (lowerSpec === 'plumbing') return itemSpec.includes('plumbing');
        if (lowerSpec === 'it') return itemSpec.includes('it') || itemSpec.includes('network');
        return itemSpec === lowerSpec;
      });
    }

    // Search filter across: Name, Code, Phone, Email, Specialization
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter((sp) => {
        return (
          sp.displayName.toLowerCase().includes(q) ||
          sp.firstName.toLowerCase().includes(q) ||
          sp.lastName.toLowerCase().includes(q) ||
          sp.servicePersonCode.toLowerCase().includes(q) ||
          sp.phone.toLowerCase().includes(q) ||
          sp.email.toLowerCase().includes(q) ||
          sp.specialization.toLowerCase().includes(q) ||
          (sp.outletName && sp.outletName.toLowerCase().includes(q))
        );
      });
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const normalizedPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (normalizedPage - 1) * pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

    const activeCount = this.servicePersons.filter((sp) => sp.status === 'Active').length;

    return {
      servicePersons: paginatedItems,
      total,
      page: normalizedPage,
      pageSize,
      totalPages,
      activeCount,
    };
  }

  public async getServicePerson(id: string): Promise<ServicePerson | null> {
    await this.delay(100);
    const found = this.servicePersons.find((sp) => sp.id === id || sp.servicePersonCode === id);
    return found ? { ...found } : null;
  }

  public async createServicePerson(input: CreateServicePersonInput): Promise<ServicePerson> {
    await this.delay(200);

    const code = this.getNextServicePersonCode();
    const newId = `srv-${Date.now()}`;
    const displayName = `${input.firstName.trim()} ${input.lastName.trim()}`;

    const newRecord: ServicePerson = {
      id: newId,
      servicePersonCode: code,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      displayName,
      email: input.email?.trim() || `${input.firstName.toLowerCase()[0]}.${input.lastName.toLowerCase()}@omnitrade.internal`,
      phone: input.phone.trim(),
      specialization: input.specialization,
      assignmentScope: input.assignmentScope,
      outletId: input.assignmentScope === 'Specific Outlet' ? input.outletId : undefined,
      outletName: input.assignmentScope === 'Specific Outlet' ? input.outletName : 'Organization-wide',
      status: input.status || 'Active',
      dateOfJoining: input.dateOfJoining || new Date().toISOString().split('T')[0],
      address: input.address?.trim() || '',
      city: input.city?.trim() || 'Austin',
      postalCode: input.postalCode?.trim() || '78701',
      yearsOfExperience: input.yearsOfExperience ?? 3,
      skills: input.skills && input.skills.length > 0 ? input.skills : [input.specialization],
      notes: input.notes?.trim() || '',
      openJobsCount: 0,
      openJobs: [],
      timelineEvents: [
        {
          id: `tl-${Date.now()}`,
          title: `Service person created and assigned to dispatch queue`,
          timestamp: 'Just now',
          isPrimary: true,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.servicePersons.unshift(newRecord);
    return { ...newRecord };
  }

  public async updateServicePerson(id: string, input: UpdateServicePersonInput): Promise<ServicePerson> {
    await this.delay(180);

    const index = this.servicePersons.findIndex((sp) => sp.id === id);
    if (index === -1) {
      throw new Error(`Service person with id ${id} not found.`);
    }

    const existing = this.servicePersons[index];
    const firstName = input.firstName !== undefined ? input.firstName.trim() : existing.firstName;
    const lastName = input.lastName !== undefined ? input.lastName.trim() : existing.lastName;
    const displayName = `${firstName} ${lastName}`;

    const updated: ServicePerson = {
      ...existing,
      firstName,
      lastName,
      displayName,
      email: input.email !== undefined ? input.email.trim() : existing.email,
      phone: input.phone !== undefined ? input.phone.trim() : existing.phone,
      specialization: input.specialization !== undefined ? input.specialization : existing.specialization,
      assignmentScope: input.assignmentScope !== undefined ? input.assignmentScope : existing.assignmentScope,
      outletId: input.assignmentScope === 'Specific Outlet' ? (input.outletId ?? existing.outletId) : undefined,
      outletName: input.assignmentScope === 'Specific Outlet' ? (input.outletName ?? existing.outletName) : 'Organization-wide',
      status: input.status !== undefined ? input.status : existing.status,
      dateOfJoining: input.dateOfJoining !== undefined ? input.dateOfJoining : existing.dateOfJoining,
      address: input.address !== undefined ? input.address.trim() : existing.address,
      city: input.city !== undefined ? input.city.trim() : existing.city,
      postalCode: input.postalCode !== undefined ? input.postalCode.trim() : existing.postalCode,
      yearsOfExperience: input.yearsOfExperience !== undefined ? input.yearsOfExperience : existing.yearsOfExperience,
      skills: input.skills !== undefined ? input.skills : existing.skills,
      notes: input.notes !== undefined ? input.notes.trim() : existing.notes,
      updatedAt: new Date().toISOString(),
    };

    this.servicePersons[index] = updated;
    return { ...updated };
  }

  public async changeServicePersonStatus(id: string, status: ServicePersonStatus): Promise<ServicePerson> {
    await this.delay(150);

    const index = this.servicePersons.findIndex((sp) => sp.id === id);
    if (index === -1) {
      throw new Error(`Service person with id ${id} not found.`);
    }

    const existing = this.servicePersons[index];
    const updated: ServicePerson = {
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
      timelineEvents: [
        {
          id: `tl-${Date.now()}`,
          title: `Status changed to ${status}`,
          timestamp: 'Just now',
          isPrimary: true,
        },
        ...(existing.timelineEvents || []),
      ],
    };

    this.servicePersons[index] = updated;
    return { ...updated };
  }

  public async getSpecializations(): Promise<string[]> {
    await this.delay(50);
    const specSet = new Set<string>([
      'HVAC & Appliance Repair',
      'Electronics & POS Hardware',
      'Plumbing & Fixtures',
      'IT & Network Setup',
    ]);
    this.servicePersons.forEach((sp) => {
      if (sp.specialization) specSet.add(sp.specialization);
    });
    return Array.from(specSet);
  }

  public getNextServicePersonCode(): string {
    let maxNum = 100;
    this.servicePersons.forEach((sp) => {
      const match = sp.servicePersonCode.match(/SRV-(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    });
    const next = maxNum + 1;
    return `SRV-${next}`;
  }

  public async getActiveCount(): Promise<number> {
    return this.servicePersons.filter((sp) => sp.status === 'Active').length;
  }
}

class ProductionServicePersonService implements IServicePersonService {
  getNextServicePersonCode(): string { return `SRV-${Date.now().toString().slice(-6)}`; }
  private async organizationId(): Promise<string> { const result = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = result.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); return membership.organization.id; }
  private map(row: Awaited<ReturnType<typeof listTenantServicePersons>>['data']['servicePeople'][number]): ServicePerson { const names = row.fullName.trim().split(/\s+/); return { id: row.id, servicePersonCode: row.servicePersonCode, firstName: names[0] ?? row.fullName, lastName: names.slice(1).join(' '), displayName: row.fullName, email: row.email ?? '', phone: row.phone, specialization: row.specialization, assignmentScope: row.assignmentScope === 'ORGANIZATION' ? 'Entire Organization' : 'Specific Outlet', outletId: row.servicePersonOutlets_on_servicePerson[0]?.outlet.id, outletName: row.servicePersonOutlets_on_servicePerson[0]?.outlet.name ?? 'Organization-wide', status: row.status === 'ACTIVE' ? 'Active' : 'Inactive', yearsOfExperience: row.yearsOfExperience ?? undefined, skills: row.skills ? row.skills.split(',').map((value) => value.trim()).filter(Boolean) : [], createdAt: row.createdAt, updatedAt: row.updatedAt, openJobs: [], openJobsCount: 0, timelineEvents: [] }; }
  private async all(): Promise<ServicePerson[]> { const organizationId = await this.organizationId(); const result = await listTenantServicePersons(getFirebaseClientServices().dataConnect, { organizationId }); return result.data.servicePeople.map((row) => this.map(row)); }
  async getServicePersons(query: ServicePersonQuery): Promise<ServicePersonQueryResult> { let rows = await this.all(); const search = query.search?.trim().toLowerCase() ?? ''; if (search) rows = rows.filter((row) => `${row.servicePersonCode} ${row.displayName} ${row.phone} ${row.specialization}`.toLowerCase().includes(search)); if (query.status && query.status !== 'All') rows = rows.filter((row) => row.status === query.status); if (query.assignmentScope && query.assignmentScope !== 'All') rows = rows.filter((row) => row.assignmentScope === query.assignmentScope); if (query.specialization) rows = rows.filter((row) => row.specialization === query.specialization); const page = Math.max(1, query.page ?? 1); const pageSize = Math.max(1, query.pageSize ?? 10); const total = rows.length; return { servicePersons: rows.slice((page - 1) * pageSize, page * pageSize), total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)), activeCount: rows.filter((row) => row.status === 'Active').length }; }
  async getServicePerson(id: string): Promise<ServicePerson | null> { const result = await this.getServicePersons({ page: 1, pageSize: 1000 }); return result.servicePersons.find((row) => row.id === id || row.servicePersonCode === id) ?? null; }
  async createServicePerson(input: CreateServicePersonInput): Promise<ServicePerson> { const organizationId = await this.organizationId(); await httpsCallable(getFirebaseClientServices().functions, 'createTenantServicePerson')({ organizationId, servicePersonCode: this.getNextServicePersonCode(), fullName: `${input.firstName.trim()} ${input.lastName.trim()}`.trim(), email: input.email, phone: input.phone, specialization: input.specialization, skills: input.skills?.join(', '), yearsOfExperience: input.yearsOfExperience, assignmentScope: input.assignmentScope === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET', requestId: globalThis.crypto.randomUUID() }); const result = await this.getServicePersons({ page: 1, pageSize: 1000 }); const created = result.servicePersons.find((row) => row.displayName === `${input.firstName.trim()} ${input.lastName.trim()}`.trim()); if (!created) throw new Error('Service person was created but could not be loaded.'); return created; }
  async updateServicePerson(id: string, input: UpdateServicePersonInput): Promise<ServicePerson> { const organizationId = await this.organizationId(); const current = await this.getServicePerson(id); if (!current) throw new Error('Service person not found.'); await httpsCallable(getFirebaseClientServices().functions, 'updateTenantServicePerson')({ organizationId, id, fullName: `${input.firstName ?? current.firstName} ${input.lastName ?? current.lastName}`.trim(), email: input.email ?? current.email, phone: input.phone ?? current.phone, specialization: input.specialization ?? current.specialization, skills: (input.skills ?? current.skills ?? []).join(', '), yearsOfExperience: input.yearsOfExperience ?? current.yearsOfExperience, assignmentScope: (input.assignmentScope ?? current.assignmentScope) === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET', requestId: globalThis.crypto.randomUUID() }); const updated = await this.getServicePerson(id); if (!updated) throw new Error('Service person was updated but could not be loaded.'); return updated; }
  async changeServicePersonStatus(id: string, status: ServicePersonStatus): Promise<ServicePerson> { const organizationId = await this.organizationId(); await httpsCallable(getFirebaseClientServices().functions, 'changeTenantServicePersonStatus')({ organizationId, id, status: status === 'Active' ? 'ACTIVE' : 'INACTIVE', requestId: globalThis.crypto.randomUUID() }); const updated = await this.getServicePerson(id); if (!updated) throw new Error('Service person status was changed but could not be loaded.'); return updated; }
  async getSpecializations(): Promise<string[]> { return Array.from(new Set((await this.all()).map((row) => row.specialization))).sort(); }
  async getActiveCount(): Promise<number> { return (await this.all()).filter((row) => row.status === 'Active').length; }
}

export const servicePersonService: IServicePersonService = new ProductionServicePersonService();
