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
