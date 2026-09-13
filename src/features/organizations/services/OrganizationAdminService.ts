import {
  OrganizationAdministrator,
  CreateAdminInput,
  UpdateAdminInput,
  AdminStatus,
} from '../types';
import { listOrganizationAdministrators, updateOrganizationAdministrator } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';

export interface IOrganizationAdminService {
  getAdministrators(organizationId: string): Promise<OrganizationAdministrator[]>;
  createAdministrator(
    organizationId: string,
    input: CreateAdminInput
  ): Promise<OrganizationAdministrator>;
  updateAdministrator(
    organizationId: string,
    administratorId: string,
    input: UpdateAdminInput
  ): Promise<OrganizationAdministrator>;
  changeAdministratorStatus(
    organizationId: string,
    administratorId: string,
    status: AdminStatus
  ): Promise<OrganizationAdministrator>;
  resetPassword(
    organizationId: string,
    administratorId: string,
    initialPassword: string
  ): Promise<{ success: boolean; message: string }>;
}

const INITIAL_ADMINISTRATORS: OrganizationAdministrator[] = [
  // Punarva Fashion Hub (ORG-88219)
  {
    id: 'ADM-88201',
    organizationId: 'ORG-88219',
    name: 'Priya Patel',
    username: 'ppatel',
    email: 'priya@punarva.com',
    phone: '+91 98201 44552',
    status: 'active',
    createdAt: '2024-10-14',
    lastLoginAt: '2026-09-08 11:24 IST',
  },
  {
    id: 'ADM-88202',
    organizationId: 'ORG-88219',
    name: 'Rohan Mehta',
    username: 'rmehta',
    email: 'rohan.m@punarva.com',
    phone: '+91 98201 99182',
    status: 'active',
    createdAt: '2024-11-02',
    lastLoginAt: '2026-09-09 18:45 IST',
  },
  {
    id: 'ADM-88203',
    organizationId: 'ORG-88219',
    name: 'Kavita Rao',
    username: 'krao',
    email: 'kavita.ops@punarva.com',
    phone: '+91 98201 33410',
    status: 'inactive',
    createdAt: '2025-01-18',
    lastLoginAt: '2026-08-30 09:12 IST',
  },

  // FabSutra Silks & Sarees (ORG-41902)
  {
    id: 'ADM-41901',
    organizationId: 'ORG-41902',
    name: 'Rajesh Sharma',
    username: 'rsharma',
    email: 'rajesh@fabsutra.in',
    phone: '+91 94440 18291',
    status: 'active',
    createdAt: '2024-08-20',
    lastLoginAt: '2026-09-07 15:30 IST',
  },
  {
    id: 'ADM-41902',
    organizationId: 'ORG-41902',
    name: 'Sundar Raman',
    username: 'sraman',
    email: 'sundar@fabsutra.in',
    phone: '+91 94440 77123',
    status: 'inactive',
    createdAt: '2024-09-12',
    lastLoginAt: null,
  },

  // Kalyan Heritage Jewelers (ORG-76134)
  {
    id: 'ADM-76101',
    organizationId: 'ORG-76134',
    name: 'Ananya Iyer',
    username: 'aiyer',
    email: 'ananya@kalyanheritage.com',
    phone: '+91 98470 33119',
    status: 'active',
    createdAt: '2024-05-11',
    lastLoginAt: '2026-09-10 08:15 IST',
  },
  {
    id: 'ADM-76102',
    organizationId: 'ORG-76134',
    name: 'George Varghese',
    username: 'gvarghese',
    email: 'george@kalyanheritage.com',
    phone: '+91 98470 44881',
    status: 'active',
    createdAt: '2024-06-03',
    lastLoginAt: '2026-09-09 19:40 IST',
  },

  // Deccan Electronics World (ORG-65410)
  {
    id: 'ADM-65401',
    organizationId: 'ORG-65410',
    name: 'Vikram Reddy',
    username: 'vreddy',
    email: 'vikram@deccanelec.com',
    phone: '+91 98490 55123',
    status: 'active',
    createdAt: '2024-03-19',
    lastLoginAt: '2026-09-06 14:10 IST',
  },

  // BlueTokai Craft Coffee Hubs (ORG-98321)
  {
    id: 'ADM-98301',
    organizationId: 'ORG-98321',
    name: 'Aditya Varma',
    username: 'avarma',
    email: 'aditya@craftcoffeehubs.in',
    phone: '+91 98110 99441',
    status: 'active',
    createdAt: '2024-11-15',
    lastLoginAt: '2026-09-09 21:04 IST',
  },
];

class OrganizationAdminService implements IOrganizationAdminService {

  async getAdministrators(organizationId: string): Promise<OrganizationAdministrator[]> {
    try {
      const result = await listOrganizationAdministrators(getFirebaseClientServices().dataConnect, {
        organizationId,
      });
      return result.data.organizationMemberships.map((membership) => ({
        id: membership.user.id,
        organizationId,
        name: membership.user.displayName,
        username: membership.user.username,
        email: membership.user.email,
        phone: membership.user.phone ?? '',
        status: membership.user.status === 'ACTIVE' ? 'active' : 'inactive',
        createdAt: membership.user.createdAt.slice(0, 10),
        lastLoginAt: membership.user.lastLoginAt ?? null,
      }));
    } catch {
      throw new Error('Unable to load organization administrators.');
    }
  }

  async createAdministrator(
    organizationId: string,
    input: CreateAdminInput
  ): Promise<OrganizationAdministrator> {
    const provision = httpsCallable<
      { organizationId: string; displayName: string; username: string; email: string; phone: string; idempotencyKey: string },
      { appUserId: string; organizationMembershipId: string; organizationId: string; username: string; displayName: string; email: string; phone: string; status: 'active'; onboardingStatus?: string }
    >(getFirebaseClientServices().functions, 'provisionOrganizationAdministrator', { limitedUseAppCheckTokens: true });
    try {
      const result = await provision({ organizationId, displayName: input.name.trim(), username: input.username.trim().toLowerCase(), email: input.email.trim(), phone: input.phone.trim(), idempotencyKey: globalThis.crypto.randomUUID() });
      // The trusted provisioning response uses domain names that are explicit
      // about their source (AppUser ID/displayName). Normalize it at the
      // service boundary to the UI's administrator model.
      const created = result.data;
      return {
        id: created.appUserId,
        organizationId: created.organizationId,
        name: created.displayName,
        username: created.username,
        email: created.email,
        phone: created.phone,
        status: created.status,
        createdAt: new Date().toISOString().slice(0, 10),
        lastLoginAt: null,
      };
    } catch (error: unknown) {
      const code = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code?: unknown }).code) : '';
      if (code === 'functions/already-exists') throw new Error('That username or email is already assigned to an administrator.');
      throw new Error('Unable to create the organization administrator.');
    }

    /* Mock lifecycle fallback remains below for deferred operations. */
    /*
    const cleanUsername = input.username.trim().toLowerCase();
    // Validate unique username across all organization administrators in mock scope
    const existing = this.admins.find((a) => a.username.toLowerCase() === cleanUsername);
    if (existing) {
      throw new Error(`Username "${input.username.trim()}" is already assigned to an administrator.`);
    }

    // Check duplicate email in this organization
    const duplicateEmail = this.admins.find(
      (a) => a.organizationId === organizationId && a.email.toLowerCase() === input.email.trim().toLowerCase()
    );
    if (duplicateEmail) {
      throw new Error(`An administrator with email "${input.email.trim()}" already exists in this organization.`);
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newAdminId = `ADM-${randomNum}`;
    const today = new Date().toISOString().split('T')[0];

    const newAdmin: OrganizationAdministrator = {
      id: newAdminId,
      organizationId,
      name: input.name.trim(),
      username: cleanUsername,
      email: input.email.trim(),
      phone: input.phone.trim(),
      status: 'active',
      createdAt: today,
      lastLoginAt: null,
    };

    this.admins.unshift(newAdmin);
    return { ...newAdmin };
    */
  }

  async updateAdministrator(
    organizationId: string,
    administratorId: string,
    input: UpdateAdminInput
  ): Promise<OrganizationAdministrator> {
    try {
      await updateOrganizationAdministrator(getFirebaseClientServices().dataConnect, {
        organizationId,
        userId: administratorId,
        displayName: input.name.trim(),
        phone: input.phone.trim(),
        auditId: globalThis.crypto.randomUUID(),
        requestId: globalThis.crypto.randomUUID(),
      });
      const refreshed = await this.getAdministrators(organizationId);
      const result = refreshed.find((admin) => admin.id === administratorId);
      if (!result) throw new Error('Administrator not found.');
      return { ...result, name: input.name.trim(), phone: input.phone.trim(), email: result.email };
    } catch {
      throw new Error('Unable to update the organization administrator.');
    }
    /* Deferred mock fallback retained for future lifecycle work. */
    /*
    await mockDelay(380);

    const index = this.admins.findIndex(
      (a) => a.id === administratorId && a.organizationId === organizationId
    );
    if (index === -1) {
      throw new Error(`Administrator ${administratorId} was not found in organization ${organizationId}.`);
    }

    const current = this.admins[index];
    const updated: OrganizationAdministrator = {
      ...current,
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
    };

    this.admins[index] = updated;
    return { ...updated };
    */
  }

  async changeAdministratorStatus(
    organizationId: string,
    administratorId: string,
    status: AdminStatus
  ): Promise<OrganizationAdministrator> {
    try {
      const callable = httpsCallable<
        { organizationId: string; userId: string; status: AdminStatus },
        { success: boolean }
      >(getFirebaseClientServices().functions, 'changeOrganizationAdministratorStatus');
      await callable({ organizationId, userId: administratorId, status });
      const refreshed = await this.getAdministrators(organizationId);
      const updated = refreshed.find((admin) => admin.id === administratorId);
      if (!updated) throw new Error('Administrator not found.');
      // The mutation is authoritative; an immediate read may briefly return
      // the previous status while the Data Connect read replica catches up.
      return { ...updated, status };
    } catch {
      throw new Error('Unable to change the organization administrator status.');
    }
  }

  async resetPassword(
    organizationId: string,
    administratorId: string,
    initialPassword: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const callable = httpsCallable<{ organizationId: string; administratorId: string; initialPassword: string }, { success: boolean }>(getFirebaseClientServices().functions, 'resetOrganizationAdministratorPassword');
      await callable({ organizationId, administratorId, initialPassword });
      return { success: true, message: 'The initial password has been set. Share it with the administrator through a secure channel.' };
    } catch { throw new Error('Unable to reset the administrator password.'); }
  }
}

export const organizationAdminService: IOrganizationAdminService = new OrganizationAdminService();
