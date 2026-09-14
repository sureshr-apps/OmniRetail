import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { defineString } from 'firebase-functions/params';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import {
  AppUserStatus, LoginAccessStatus, CustomerType, PurchasePaymentStatus, PurchaseReceiptStatus, PurchaseStatus, SaleTenderType,
  getUserAuthorizationByFirebaseUid,
  recordPasswordChange as recordPasswordChangeAudit,
  recordSuccessfulLogin,
  resolveUsernameLogin,
  updateAppUserProfile,
  getOrganizationTrusted,
  provisionOrganizationAdministrator as provisionOrganizationAdministratorSql,
  getLifecycleIdempotency, claimLifecycleIdempotency, completeLifecycleIdempotency, recordProvisioningReconciliation,
  ProvisioningAttemptStatus,
  changeOrganizationAdministratorStatus as changeOrganizationAdministratorStatusSql,
  resolveOrganizationAdministratorIdentity,
  recordAdministratorSecurityEvent,
  getOrganizationLicenseTrusted,
  listOrganizationsTrusted,
  getLicensePlanTrusted,
  assignOrganizationLicenseTrusted,
  changeOrganizationLicensePlanTrusted,
  modifyOrganizationCommercialTermsTrusted,
  renewOrganizationLicenseTrusted,
  getLicensePlanReferencesTrusted,
  deleteLicensePlanTrusted,
  listOrganizationUsersForDeletionTrusted,
  deleteOrganizationTrusted,
  deleteAppUserTrusted,
  getTenantMembershipTrusted,
  resolveTenantEmployeeIdentityTrusted,
  createTenantOutletTrusted,
  updateTenantOutletTrusted,
  changeTenantOutletStatusTrusted,
  getTenantOutletTrusted,
  provisionTenantEmployeeTrusted,
  updateTenantEmployeeTrusted,
  changeTenantEmployeeStatusTrusted,
  changeTenantEmployeeLoginAccessTrusted,
  createTenantEmployeeProfileTrusted,
  getTenantEmployeeTrusted,
  createTenantServicePersonTrusted,
  updateTenantServicePersonTrusted,
  changeTenantServicePersonStatusTrusted,
  getTenantServicePersonTrusted,
  assignTenantEmployeeOutletTrusted,
  assignTenantServicePersonOutletTrusted,
  adjustTenantInventory,
  createTenantInventoryStock,
  createTenantProduct,
  updateTenantProduct,
  changeTenantProductStatus as changeTenantProductStatusSql,
  getTenantProductTrusted,
  createTenantCustomer,
  updateTenantCustomer,
  changeTenantCustomerStatus as changeTenantCustomerStatusSql,
  getTenantCustomerTrusted,
  createTenantSupplier,
  updateTenantSupplier,
  getTenantSupplierTrusted,
  getOrganizationAdministratorTrusted,
  createTenantPurchase, createTenantPurchaseLine,
  changeTenantPurchaseStatus as changeTenantPurchaseStatusSql,
  receiveTenantPurchaseLine,
  createTenantSale,
  addTenantSaleLine,
  voidTenantSale,
  getTenantInventoryStockTrusted, listTenantOutlets, listTenantCustomers,
  createTenantExpense, updateTenantExpense, changeTenantExpenseApproval, voidTenantExpense,
  changeTenantSupplierStatus as changeTenantSupplierStatusSql,
} from '@omniretail/sql-connect-admin';
import {
  authenticateUsername,
  GENERIC_AUTH_ERROR,
  normalizePassword,
  normalizeUsername,
  toAuthorizedUser,
  type AuthorizationRecord,
} from './auth/core.js';
import { LoginRateLimiter } from './auth/rateLimit.js';
import { orchestrateProvision, type ProvisioningStatus } from './auth/provisioning.js';
import { deriveLicenseStatus } from './licenses/licenseStatus.js';

if (!getApps().length) initializeApp();

const firebaseWebApiKey = defineString('OMNIRETAIL_WEB_API_KEY');
const enforceAppCheck = process.env.AUTH_ENFORCE_APP_CHECK === 'true';
const rateLimiter = new LoginRateLimiter();

const callableOptions = {
  region: 'asia-south1',
  // Callable clients need public transport access; authorization is enforced
  // inside every handler using Firebase Auth, App Check, and tenant RBAC.
  invoker: 'public' as const,
  // Keep callable endpoints available to the deployed Firebase Hosting sites.
  // Explicit origins avoid relying on the runtime's default CORS behavior.
  cors: [
    'https://omniretail.firebaseapp.com',
    'https://omniretail.web.app',
    'https://omniretail-60c71.firebaseapp.com',
    'https://omniretail-60c71.web.app',
  ],
  enforceAppCheck,
  consumeAppCheckToken: true,
  timeoutSeconds: 30,
  memory: '256MiB' as const,
  maxInstances: 10,
};

function genericAuthenticationError(): HttpsError {
  return new HttpsError('unauthenticated', GENERIC_AUTH_ERROR);
}

async function loadAuthorization(firebaseUid: string): Promise<AuthorizationRecord> {
  const result = await getUserAuthorizationByFirebaseUid({ firebaseUid });
  const record = result.data.appUsers[0] as AuthorizationRecord | undefined;
  if (!record || record.status !== AppUserStatus.ACTIVE) throw genericAuthenticationError();
  return record;
}

function requireCapability(record: AuthorizationRecord, capability: string): void {
  const authorized = toAuthorizedUser(record);
  const tenantOperationalCapabilities = new Set([
    'billing.read',
    'sales.read',
    'inventory.read',
    'products.read',
    'purchases.read',
    'suppliers.read',
    'customers.read',
    'expenses.read',
    'outlets.read',
    'employees.read',
    'service_persons.read',
  ]);
  const isOrganizationAdmin = authorized.roles.some((role) => role.code === 'organization.admin')
    && authorized.organizationIds.length > 0;
  if (!authorized.capabilities.includes(capability) && !(isOrganizationAdmin && tenantOperationalCapabilities.has(capability))) {
    throw genericAuthenticationError();
  }
}

function requireVerifiedFirebaseIdentity(
  auth: { uid: string; token: Record<string, unknown> } | undefined
): string {
  // Email verification is optional. Authentication plus the active AppUser/RBAC
  // checks below remain the application access gate.
  if (!auth?.uid) throw genericAuthenticationError();
  return auth.uid;
}

function logCallableFailure(operation: string, error: unknown): void {
  const value = error as { code?: unknown; message?: unknown } | null;
  console.error(`${operation} failed`, {
    code: typeof value?.code === 'string' ? value.code : 'unknown',
    message: typeof value?.message === 'string' ? value.message : 'unknown',
  });
}

function productCreationFailure(error: unknown): HttpsError {
  if (error instanceof HttpsError) return error;
  const value = error as { message?: unknown } | null;
  const message = typeof value?.message === 'string' ? value.message : '';
  if (message === 'scope') return new HttpsError('permission-denied', 'You do not have permission to create products in this organization.');
  if (/invalid input/i.test(message)) return new HttpsError('invalid-argument', 'Some product details are invalid.');
  if (/unique|duplicate|already exists/i.test(message)) return new HttpsError('already-exists', 'A product with this SKU, barcode, or product code already exists.');
  return new HttpsError('internal', 'Unable to create the product.');
}

function outletCreationFailure(error: unknown): HttpsError {
  if (error instanceof HttpsError) return error;
  const value = error as { message?: unknown } | null;
  const message = typeof value?.message === 'string' ? value.message : '';
  if (message === 'scope') return new HttpsError('permission-denied', 'You do not have permission to create outlets in this organization.');
  if (/invalid input|idempotency/i.test(message)) return new HttpsError('invalid-argument', 'Some outlet details are invalid.');
  if (/unique|duplicate|already exists/i.test(message)) return new HttpsError('already-exists', 'An outlet with these details already exists.');
  return new HttpsError('internal', 'Unable to create the outlet.');
}

async function sendManagedPasswordEmail(email: string, requestType: 'PASSWORD_RESET'): Promise<void> {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(firebaseWebApiKey.value())}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ requestType, email })
  });
  if (!response.ok) throw new Error('email delivery failed');
}

async function sendManagedVerificationEmail(email: string, password: string): Promise<void> {
  const signIn = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(firebaseWebApiKey.value())}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  if (!signIn.ok) throw new Error('verification delivery failed');
  const body = await signIn.json() as { idToken?: unknown };
  if (typeof body.idToken !== 'string') throw new Error('verification delivery failed');
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(firebaseWebApiKey.value())}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ requestType: 'VERIFY_EMAIL', idToken: body.idToken }),
  });
  if (!response.ok) throw new Error('verification delivery failed');
}

async function verifyPasswordWithFirebase(email: string, password: string): Promise<{ idToken: string }> {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(firebaseWebApiKey.value())}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );
  if (!response.ok) throw genericAuthenticationError();
  const body = await response.json() as { idToken?: unknown };
  if (typeof body.idToken !== 'string') throw genericAuthenticationError();
  return { idToken: body.idToken };
}

export const usernameLogin = onCall(callableOptions, async (request) => {
  const username = normalizeUsername(request.data?.username);
  const password = normalizePassword(request.data?.password);
  const ipAddress = request.rawRequest.ip || 'unknown';
  if (!username || !password || !rateLimiter.consume(ipAddress, username)) {
    throw genericAuthenticationError();
  }

  try {
    return await authenticateUsername(
      {
        async resolveUsername(value) {
          const result = await resolveUsernameLogin({ username: value });
          return result.data.appUsers[0] ?? null;
        },
        verifyPassword: verifyPasswordWithFirebase,
        async verifyCredential(idToken) {
          const decoded = await getAuth().verifyIdToken(idToken, true);
          return { uid: decoded.uid, emailVerified: decoded.email_verified === true };
        },
        createCustomToken: (uid) => getAuth().createCustomToken(uid),
      },
      { username, password }
    );
  } catch {
    throw genericAuthenticationError();
  }
});

export const bootstrapAuthenticatedUser = onCall(callableOptions, async (request) => {
  try {
    const firebaseUid = requireVerifiedFirebaseIdentity(request.auth);
    const record = await loadAuthorization(firebaseUid);
    const authorizedUser = toAuthorizedUser(record);
    if (request.data?.recordLogin === true) {
      await recordSuccessfulLogin({ userId: record.id, auditId: randomUUID(), requestId: randomUUID() });
    }
    return authorizedUser;
  } catch {
    throw genericAuthenticationError();
  }
});

export const updateCurrentUserProfile = onCall(callableOptions, async (request) => {
  try {
    const firebaseUid = requireVerifiedFirebaseIdentity(request.auth);
    const record = await loadAuthorization(firebaseUid);
    requireCapability(record, 'profile.update');
    const displayName = typeof request.data?.displayName === 'string' ? request.data.displayName.trim() : '';
    const phone = typeof request.data?.phone === 'string' ? request.data.phone.trim() || null : null;
    if (displayName.length < 1 || displayName.length > 120 || (phone && phone.length > 32)) {
      throw new Error('invalid profile');
    }

    await updateAppUserProfile({
      userId: record.id,
      displayName,
      phone,
      auditId: randomUUID(),
      requestId: randomUUID(),
    });
    return toAuthorizedUser({ ...record, displayName, phone });
  } catch {
    throw new HttpsError('permission-denied', 'Unable to update the profile.');
  }
});

export const recordPasswordChange = onCall(callableOptions, async (request) => {
  try {
    const firebaseUid = requireVerifiedFirebaseIdentity(request.auth);
    const record = await loadAuthorization(firebaseUid);
    requireCapability(record, 'profile.change_password');
    await recordPasswordChangeAudit({ userId: record.id, auditId: randomUUID(), requestId: randomUUID() });
    return { recorded: true };
  } catch {
    throw new HttpsError('internal', 'Password changed, but its audit event could not be recorded.');
  }
});

export const provisionOrganizationAdministrator = onCall(callableOptions, async (request) => {
  try {
    const firebaseUid = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(firebaseUid);
    requireCapability(caller, 'organization_admins.create');
    const organizationId = typeof request.data?.organizationId === 'string' ? request.data.organizationId : '';
    const displayName = typeof request.data?.displayName === 'string' ? request.data.displayName.trim() : '';
    const username = normalizeUsername(request.data?.username);
    const email = typeof request.data?.email === 'string' ? request.data.email.trim().toLowerCase() : '';
    const phone = typeof request.data?.phone === 'string' ? request.data.phone.trim() : '';
    const idempotencyKey = typeof request.data?.idempotencyKey === 'string' ? request.data.idempotencyKey.trim() : '';
    if (!organizationId || !displayName || !username || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !phone) throw new Error('invalid input');
    if (!/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) throw new Error('invalid idempotency key');
    const orchestrated = await orchestrateProvision({ organizationId, username, email, displayName, phone, idempotencyKey }, {
      idempotency: {
        async get(key) { const r = (await getLifecycleIdempotency({ idempotencyKey: key })).data.lifecycleIdempotency; return r ? { ...r, status: r.status as ProvisioningStatus, result: r.resultReference ? JSON.parse(r.resultReference) : undefined } : null; },
        async claim(r) { await claimLifecycleIdempotency({ idempotencyKey: r.key, operationType: 'provisionOrganizationAdministrator', requestFingerprint: r.requestFingerprint }); },
        async complete(key, status, result) { await completeLifecycleIdempotency({ idempotencyKey: key, status: status as ProvisioningAttemptStatus, resultReference: result ? JSON.stringify(result) : undefined }); },
      },
      async preflight() {
        if (!(await getOrganizationTrusted({ id: organizationId })).data.organization) throw new Error('organization not found');
        if ((await resolveUsernameLogin({ username })).data.appUsers.length) throw new Error('username already in use');
        try {
          await getAuth().getUserByEmail(email);
          throw new Error('email already in use');
        } catch (error: any) {
          if (error?.message === 'email already in use') throw error;
          if (error?.code !== 'auth/user-not-found') throw error;
        }
      },
      auth: { async create() { const temporaryPassword = randomBytes(32).toString('base64url'); const created = await getAuth().createUser({ email, displayName, phoneNumber: phone, password: temporaryPassword, emailVerified: false, disabled: false }); return { uid: created.uid }; }, async compensate(uid) { try { await getAuth().deleteUser(uid); } catch (error: any) { if (error?.code === 'auth/user-not-found') return; await getAuth().updateUser(uid, { disabled: true }); } } },
      sql: {
        async provisionAndComplete(data) {
          const appUserId = randomUUID();
          const result = {
            appUserId,
            organizationMembershipId: `${organizationId}:${appUserId}`,
            organizationId,
            username,
            displayName,
            email,
            phone,
            status: 'active' as const,
          };
          await provisionOrganizationAdministratorSql({
            userId: appUserId,
            firebaseUid: data.firebaseUid,
            username,
            email,
            displayName,
            phone,
            organizationId,
            roleId: '00000000-0000-4000-8000-000000000002',
            auditId: randomUUID(),
            requestId: randomUUID(),
            idempotencyKey,
            resultReference: JSON.stringify(result),
          });
          return result;
        },
      },
      reconcile: { async record(data) { await recordProvisioningReconciliation(data); } },
    });
    let onboardingStatus: 'sent' | 'delivery_failed' = 'sent';
    try {
      await sendManagedPasswordEmail(email, 'PASSWORD_RESET');
      await recordAdministratorSecurityEvent({ auditId: randomUUID(), actorFirebaseUid: firebaseUid, action: 'organization_administrator.onboarding_email_sent', targetId: orchestrated.appUserId, organizationId, requestId: randomUUID() });
    } catch { onboardingStatus = 'delivery_failed'; }
    return { ...orchestrated, onboardingStatus };
  } catch (error) {
    logCallableFailure('provisionOrganizationAdministrator', error);
    if (error instanceof Error && /already in use|email already/.test(error.message)) throw new HttpsError('already-exists', error.message);
    throw new HttpsError('permission-denied', 'Unable to provision the organization administrator.');
  }
});

export const changeOrganizationAdministratorStatus = onCall(callableOptions, async (request) => {
  try {
    const callerUid = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(callerUid);
    requireCapability(caller, 'organization_admins.change_status');
    const organizationId = typeof request.data?.organizationId === 'string' ? request.data.organizationId : '';
    const userId = typeof request.data?.userId === 'string' ? request.data.userId : '';
    const status = request.data?.status === 'active' ? 'active' : request.data?.status === 'inactive' ? 'inactive' : '';
    if (!organizationId || !userId || !status) throw new Error('invalid request');
    const identity = (await resolveOrganizationAdministratorIdentity({ organizationId, appUserId: userId })).data.organizationMembership;
    if (!identity?.user?.firebaseUid) throw new Error('scope');
    const targetUid = identity.user.firebaseUid;
    const requestId = randomUUID();
    const action = status === 'active' ? 'organization_administrator.activated' : 'organization_administrator.deactivated';
    const auth = getAuth();
    const previousStatus = identity.user.status;
    // Auth is changed first; relational state follows atomically. If SQL fails,
    // compensate the Auth change so an ambiguous access state is not left behind.
    if (status === 'active') await auth.updateUser(targetUid, { disabled: false });
    else { await auth.updateUser(targetUid, { disabled: true }); await auth.revokeRefreshTokens(targetUid); }
    try {
      await changeOrganizationAdministratorStatusSql({ organizationId, userId, status: status === 'active' ? AppUserStatus.ACTIVE : AppUserStatus.INACTIVE, membershipStatus: status === 'active' ? 'ACTIVE' as any : 'INACTIVE' as any, auditId: randomUUID(), requestId, actorFirebaseUid: callerUid, action });
    } catch {
      try { await auth.updateUser(targetUid, { disabled: previousStatus !== AppUserStatus.ACTIVE }); }
      catch { await recordProvisioningReconciliation({ idempotencyKey: requestId, firebaseUid: targetUid, errorClass: 'status_compensation_failed' }); }
      throw new Error('status persistence failed');
    }
    const membership = (await getOrganizationAdministratorTrusted({ organizationId, userId })).data.organizationMemberships[0];
    if (!membership) throw new Error('administrator not found after status change');
    return {
      success: true,
      id: membership.user.id,
      organizationId,
      name: membership.user.displayName,
      username: membership.user.username,
      email: membership.user.email,
      phone: membership.user.phone ?? '',
      status: membership.user.status === 'ACTIVE' ? 'active' : 'inactive',
      createdAt: membership.user.createdAt,
      lastLoginAt: membership.user.lastLoginAt ?? null,
    };
  } catch { throw new HttpsError('permission-denied', 'Unable to change administrator status.'); }
});

export const assignOrganizationLicense = onCall(callableOptions, async (request) => {
  try {
    const callerUid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(callerUid); requireCapability(caller, 'licenses.assign');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const planId = typeof d.planId === 'string' ? d.planId : '';
    const startDate = typeof d.startDate === 'string' ? d.startDate : ''; const expiryDate = typeof d.expiryDate === 'string' ? d.expiryDate : ''; const negotiatedPrice = Number(d.negotiatedPrice); const currency = typeof d.currency === 'string' ? d.currency.trim() : '';
    if (!organizationId || !planId || !/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(expiryDate) || new Date(expiryDate) <= new Date(startDate) || !Number.isFinite(negotiatedPrice) || negotiatedPrice < 0 || !currency) throw new Error('invalid input');
    if (!(await getOrganizationTrusted({ id: organizationId })).data.organization) throw new Error('organization');
    if ((await getOrganizationLicenseTrusted({ organizationId })).data.organizationLicenses.length) throw new Error('already assigned');
    const plan = (await getLicensePlanTrusted({ id: planId })).data.licensePlan; if (!plan || plan.status !== 'ACTIVE') throw new Error('plan');
    const idempotencyKey = typeof d.idempotencyKey === 'string' ? d.idempotencyKey : ''; if (!idempotencyKey) throw new Error('idempotency');
    const fp = createHash('sha256').update(`${organizationId}|${planId}|${startDate}|${expiryDate}|${negotiatedPrice}|${currency}`).digest('hex');
    const prior: any = (await getLifecycleIdempotency({ idempotencyKey })).data.lifecycleIdempotency; if (prior) { if (prior.requestFingerprint !== fp) throw new Error('conflict'); if (prior.status === 'SUCCEEDED' && prior.resultReference) return JSON.parse(prior.resultReference); throw new Error('in progress'); }
    await claimLifecycleIdempotency({ idempotencyKey, operationType: 'assignOrganizationLicense', requestFingerprint: fp });
    const licenseId = randomUUID(); const safe = { licenseId, organizationId, planId, startDate, expiryDate, negotiatedPrice, currency };
    await assignOrganizationLicenseTrusted({ id: licenseId, organizationId, planId, startDate, expiryDate, negotiatedPrice, currency, historyId: randomUUID(), planCode: plan.planCode, planName: plan.name, planLevel: plan.level, maxStores: plan.maxStores, maxUsers: plan.maxUsers, auditId: randomUUID(), actorFirebaseUid: callerUid, requestId: randomUUID() });
    await completeLifecycleIdempotency({ idempotencyKey, status: ProvisioningAttemptStatus.SUCCEEDED, resultReference: JSON.stringify(safe) }); return safe;
  } catch (error) { logCallableFailure('assignOrganizationLicense', error); throw new HttpsError('permission-denied', 'Unable to assign the organization license.'); }
});

export const changeOrganizationLicensePlan = onCall(callableOptions, async (request) => {
  try {
    const callerUid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(callerUid); requireCapability(caller, 'licenses.change_plan');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const targetPlanId = typeof d.targetPlanId === 'string' ? d.targetPlanId : ''; const negotiatedPrice = Number(d.negotiatedPrice); const currency = typeof d.currency === 'string' ? d.currency.trim() : '';
    if (!organizationId || !targetPlanId || !Number.isFinite(negotiatedPrice) || negotiatedPrice < 0 || !currency) throw new Error('invalid input');
    const current = (await getOrganizationLicenseTrusted({ organizationId })).data.organizationLicenses[0]; if (!current) throw new Error('license');
    const currentPlan = (await getLicensePlanTrusted({ id: current.plan.id })).data.licensePlan; const target = (await getLicensePlanTrusted({ id: targetPlanId })).data.licensePlan;
    if (!currentPlan || !target || target.status !== 'ACTIVE' || target.level <= currentPlan.level) throw new Error('plan');
    const idempotencyKey = typeof d.idempotencyKey === 'string' ? d.idempotencyKey : ''; if (!idempotencyKey) throw new Error('idempotency');
    const fp = createHash('sha256').update(`${organizationId}|${targetPlanId}|${negotiatedPrice}|${currency}`).digest('hex'); const prior: any = (await getLifecycleIdempotency({ idempotencyKey })).data.lifecycleIdempotency;
    if (prior) { if (prior.requestFingerprint !== fp) throw new Error('conflict'); if (prior.status === 'SUCCEEDED' && prior.resultReference) return JSON.parse(prior.resultReference); throw new Error('in progress'); }
    await claimLifecycleIdempotency({ idempotencyKey, operationType: 'changeOrganizationLicensePlan', requestFingerprint: fp });
    const safe = { licenseId: current.id, organizationId, planId: target.id, startDate: current.startDate, expiryDate: current.expiryDate, negotiatedPrice, currency };
    await changeOrganizationLicensePlanTrusted({ id: current.id, organizationId, planId: target.id, startDate: current.startDate, expiryDate: current.expiryDate, negotiatedPrice, currency, historyId: randomUUID(), planCode: target.planCode, planName: target.name, planLevel: target.level, maxStores: target.maxStores, maxUsers: target.maxUsers, auditId: randomUUID(), actorFirebaseUid: callerUid, requestId: randomUUID(), changes: { previousPlanId: currentPlan.id, previousPlanName: currentPlan.name, previousPlanLevel: currentPlan.level, previousMaxStores: currentPlan.maxStores, previousMaxUsers: currentPlan.maxUsers, previousNegotiatedPrice: current.negotiatedPrice, previousCurrency: current.currency } });
    await completeLifecycleIdempotency({ idempotencyKey, status: ProvisioningAttemptStatus.SUCCEEDED, resultReference: JSON.stringify(safe) }); return safe;
  } catch { throw new HttpsError('permission-denied', 'Unable to change the organization license plan.'); }
});

export const modifyOrganizationCommercialTerms = onCall(callableOptions, async (request) => {
  try {
    const callerUid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(callerUid); requireCapability(caller, 'licenses.modify_commercial_terms');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const negotiatedPrice = Number(d.negotiatedPrice); const currency = typeof d.currency === 'string' ? d.currency.trim() : '';
    if (!organizationId || !Number.isFinite(negotiatedPrice) || negotiatedPrice < 0 || !currency) throw new Error('invalid input');
    const current = (await getOrganizationLicenseTrusted({ organizationId })).data.organizationLicenses[0]; if (!current) throw new Error('license');
    const noOp = current.negotiatedPrice === negotiatedPrice && current.currency === currency;
    if (noOp) return { licenseId: current.id, organizationId, planId: current.plan.id, startDate: current.startDate, expiryDate: current.expiryDate, negotiatedPrice: current.negotiatedPrice, currency: current.currency, noOp: true };
    const plan = (await getLicensePlanTrusted({ id: current.plan.id })).data.licensePlan; if (!plan) throw new Error('plan');
    const idempotencyKey = typeof d.idempotencyKey === 'string' ? d.idempotencyKey : ''; if (!idempotencyKey) throw new Error('idempotency');
    const fp = createHash('sha256').update(`${organizationId}|${negotiatedPrice}|${currency}`).digest('hex'); const prior: any = (await getLifecycleIdempotency({ idempotencyKey })).data.lifecycleIdempotency; if (prior) { if (prior.requestFingerprint !== fp) throw new Error('conflict'); if (prior.status === 'SUCCEEDED' && prior.resultReference) return JSON.parse(prior.resultReference); throw new Error('in progress'); }
    await claimLifecycleIdempotency({ idempotencyKey, operationType: 'modifyOrganizationCommercialTerms', requestFingerprint: fp });
    const safe = { licenseId: current.id, organizationId, planId: current.plan.id, startDate: current.startDate, expiryDate: current.expiryDate, negotiatedPrice, currency };
    await modifyOrganizationCommercialTermsTrusted({ id: current.id, organizationId, planId: plan.id, startDate: current.startDate, expiryDate: current.expiryDate, negotiatedPrice, currency, historyId: randomUUID(), planCode: plan.planCode, planName: plan.name, planLevel: plan.level, maxStores: plan.maxStores, maxUsers: plan.maxUsers, auditId: randomUUID(), actorFirebaseUid: callerUid, requestId: randomUUID(), changes: { negotiatedPrice: { from: current.negotiatedPrice, to: negotiatedPrice }, currency: { from: current.currency, to: currency } } });
    await completeLifecycleIdempotency({ idempotencyKey, status: ProvisioningAttemptStatus.SUCCEEDED, resultReference: JSON.stringify(safe) }); return safe;
  } catch { throw new HttpsError('permission-denied', 'Unable to modify the organization license terms.'); }
});

export const renewOrganizationLicense = onCall(callableOptions, async (request) => {
  try {
    const callerUid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(callerUid); requireCapability(caller, 'licenses.renew');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const planId = typeof d.planId === 'string' ? d.planId : ''; const newStartDate = typeof d.newStartDate === 'string' ? d.newStartDate : ''; const newExpiryDate = typeof d.newExpiryDate === 'string' ? d.newExpiryDate : ''; const negotiatedPrice = Number(d.negotiatedPrice); const currency = typeof d.currency === 'string' ? d.currency.trim() : '';
    if (!organizationId || !planId || !/^\d{4}-\d{2}-\d{2}$/.test(newStartDate) || !/^\d{4}-\d{2}-\d{2}$/.test(newExpiryDate) || !Number.isFinite(negotiatedPrice) || negotiatedPrice < 0 || !currency) throw new Error('invalid input');
    const current = (await getOrganizationLicenseTrusted({ organizationId })).data.organizationLicenses[0]; if (!current || new Date(newStartDate) <= new Date(current.expiryDate) || new Date(newExpiryDate) <= new Date(newStartDate)) throw new Error('invalid term');
    const currentPlan = (await getLicensePlanTrusted({ id: current.plan.id })).data.licensePlan; const plan = (await getLicensePlanTrusted({ id: planId })).data.licensePlan; if (!currentPlan || !plan || plan.status !== 'ACTIVE' || plan.level < currentPlan.level) throw new Error('plan');
    const idempotencyKey = typeof d.idempotencyKey === 'string' ? d.idempotencyKey : ''; if (!idempotencyKey) throw new Error('idempotency'); const fp = createHash('sha256').update(`${organizationId}|${planId}|${newStartDate}|${newExpiryDate}|${negotiatedPrice}|${currency}`).digest('hex'); const prior: any = (await getLifecycleIdempotency({ idempotencyKey })).data.lifecycleIdempotency; if (prior) { if (prior.requestFingerprint !== fp) throw new Error('conflict'); if (prior.status === 'SUCCEEDED' && prior.resultReference) return JSON.parse(prior.resultReference); throw new Error('in progress'); }
    await claimLifecycleIdempotency({ idempotencyKey, operationType: 'renewOrganizationLicense', requestFingerprint: fp }); const safe = { licenseId: current.id, organizationId, planId: plan.id, startDate: newStartDate, expiryDate: newExpiryDate, negotiatedPrice, currency };
    await renewOrganizationLicenseTrusted({ id: current.id, organizationId, planId: plan.id, startDate: newStartDate, expiryDate: newExpiryDate, negotiatedPrice, currency, historyId: randomUUID(), planCode: plan.planCode, planName: plan.name, planLevel: plan.level, maxStores: plan.maxStores, maxUsers: plan.maxUsers, auditId: randomUUID(), actorFirebaseUid: callerUid, requestId: randomUUID(), changes: { previousStartDate: current.startDate, previousExpiryDate: current.expiryDate, previousPlanId: current.plan.id } }); await completeLifecycleIdempotency({ idempotencyKey, status: ProvisioningAttemptStatus.SUCCEEDED, resultReference: JSON.stringify(safe) }); return safe;
  } catch (error) { logCallableFailure('renewOrganizationLicense', error); throw new HttpsError('permission-denied', 'Unable to renew the organization license.'); }
});

export const deleteOrganizationLicensePlan = onCall(callableOptions, async (request) => {
  try {
    const uid = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(uid);
    requireCapability(caller, 'plans.update');
    const id = typeof request.data?.id === 'string' ? request.data.id : '';
    if (!id) throw new Error('invalid request');
    const refs = (await getLicensePlanReferencesTrusted({ id })).data;
    if (refs.organizationLicenses.length || refs.licenseHistories.length) {
      throw new Error('plan is referenced');
    }
    await deleteLicensePlanTrusted({ id, auditId: randomUUID(), requestId: randomUUID(), actorFirebaseUid: uid });
    return { success: true };
  } catch (error) {
    logCallableFailure('deleteOrganizationLicensePlan', error);
    throw new HttpsError('failed-precondition', 'This plan is referenced by existing licenses or history and cannot be deleted. Deactivate it instead.');
  }
});

export const deleteOrganization = onCall(callableOptions, async (request) => {
  const operationKey = typeof request.data?.confirmation === 'string' ? request.data.confirmation : '';
  try {
    const uid = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(uid);
    requireCapability(caller, 'organizations.delete');
    const organizationId = typeof request.data?.organizationId === 'string' ? request.data.organizationId : '';
    if (!organizationId || operationKey !== `DELETE ${organizationId}`) throw new Error('invalid confirmation');
    const organization = (await getOrganizationTrusted({ id: organizationId })).data.organization;
    if (!organization) throw new Error('not found');
    if (organization.status !== 'SUSPENDED') throw new Error('organization must be suspended');
    const members = (await listOrganizationUsersForDeletionTrusted({ organizationId })).data.organizationMemberships;
    await deleteOrganizationTrusted({ id: organizationId });
    for (const member of members) {
      await deleteAppUserTrusted({ id: member.user.id });
      try { await getAuth().deleteUser(member.user.firebaseUid); } catch (error: any) {
        if (error?.code !== 'auth/user-not-found') await recordProvisioningReconciliation({ idempotencyKey: `organization-delete:${organizationId}:${member.user.id}`, firebaseUid: member.user.firebaseUid, errorClass: 'auth_delete_failed' });
      }
    }
    return { success: true };
  } catch (error) {
    logCallableFailure('deleteOrganization', error);
    throw new HttpsError('failed-precondition', 'Unable to delete the organization. It must be suspended and have a valid confirmation.');
  }
});

export const listOrganizationsDirectory = onCall(callableOptions, async (request) => {
  try {
    const uid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(uid); requireCapability(caller, 'organizations.read');
    const organizations = (await listOrganizationsTrusted()).data.organizations;
    const rows = await Promise.all(organizations.map(async (o: any) => {
      const license = (await getOrganizationLicenseTrusted({ organizationId: o.id })).data.organizationLicenses[0];
      return {
        id: o.id,
        organizationCode: o.organizationCode,
        businessName: o.businessName,
        primaryContactName: o.primaryContactName,
        email: o.email,
        phone: o.phone,
        status: o.status,
        createdAt: o.createdAt,
        licenseId: license?.id ?? null,
        planId: license?.plan?.id ?? null,
        planName: license?.plan?.name ?? null,
        licenseStartDate: license?.startDate ?? null,
        licenseExpiryDate: license?.expiryDate ?? null,
        licenseStatus: deriveLicenseStatus(license?.startDate, license?.expiryDate),
      };
    }));
    return { organizations: rows };
  } catch { throw new HttpsError('permission-denied', 'Unable to load organizations.'); }
});

export const getMasterAdminOverview = onCall(callableOptions, async (request) => {
  try {
    const uid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(uid); requireCapability(caller, 'overview.read');
    const orgs = (await listOrganizationsTrusted()).data.organizations as any[];
    const rows = await Promise.all(orgs.map(async o => {
      const license = (await getOrganizationLicenseTrusted({ organizationId: o.id })).data.organizationLicenses[0];
      return {
        ...o,
        license: license ?? null,
        licenseStatus: deriveLicenseStatus(license?.startDate, license?.expiryDate),
      };
    }));
    const expiring = rows.filter(r => r.licenseStatus === 'expiring_soon'); const mapOrg = (r: any) => ({ id: r.id, organizationCode: r.organizationCode, name: r.businessName, legalEntityName: r.legalEntityName ?? '', taxId: r.taxId ?? '', primaryAdmin: undefined, licensePlan: r.license?.plan?.name ?? 'Unassigned', licenseStatus: r.licenseStatus, licenseExpiryDate: r.license?.expiryDate ?? '—', status: String(r.status).toLowerCase(), createdDate: String(r.createdAt).slice(0,10), contactInfo: { primaryContactName: r.primaryContactName, email: r.email, phone: r.phone }, timezone: r.timezone, currency: r.currency });
    return { metrics: { totalOrganizations: rows.length, activeOrganizations: rows.filter(r=>r.status==='ACTIVE').length, suspendedOrganizations: rows.filter(r=>r.status==='SUSPENDED').length, licensesExpiringSoon: expiring.length }, recentlyAddedOrganizations: rows.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()).slice(0,4).map(mapOrg), expiringLicenses: expiring.map(r=>({ license: { id:r.license.id, organizationId:r.id, planId:r.license.plan.id, startDate:r.license.startDate, expiryDate:r.license.expiryDate, negotiatedPrice:r.license.negotiatedPrice, currency:r.license.currency, createdAt:r.license.createdAt, updatedAt:r.license.updatedAt }, organization: mapOrg(r), plan: r.license.plan, daysRemaining: Math.ceil((new Date(r.license.expiryDate).getTime()-Date.now())/86400000), formattedExpiryDate: r.license.expiryDate })), totalOrganizationsCount: rows.length };
  } catch { throw new HttpsError('permission-denied', 'Unable to load the overview.'); }
});

function mapTrustedOutletRow(row: {
  id: string; outletCode: number; name: string; contactPerson: string;
  email?: string | null; phone: string; address: string; status: string;
}) {
  return {
    id: row.id,
    outletCode: row.outletCode,
    name: row.name,
    contactPerson: row.contactPerson,
    email: row.email ?? null,
    phone: row.phone,
    address: row.address,
    status: row.status,
  };
}

export const createTenantOutlet = onCall(callableOptions, async (request) => {
  try {
    const actorFirebaseUid = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(actorFirebaseUid);
    requireCapability(caller, 'outlets.read');
    const d = request.data ?? {};
    const organizationId = typeof d.organizationId === 'string' ? d.organizationId : '';
    const name = typeof d.name === 'string' ? d.name.trim() : '';
    const contactPerson = typeof d.contactPerson === 'string' ? d.contactPerson.trim() : '';
    const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() || null : null;
    const phone = typeof d.phone === 'string' ? d.phone.trim() : '';
    const address = typeof d.address === 'string' ? d.address.trim() : '';
    if (!organizationId || !name || !contactPerson || !phone || !address) throw new Error('invalid input');
    const membership = (await getTenantMembershipTrusted({ organizationId, firebaseUid: actorFirebaseUid })).data.organizationMemberships[0];
    if (!membership || membership.role.code !== 'organization.admin') throw new Error('scope');
    const idempotencyKey = typeof d.idempotencyKey === 'string' ? d.idempotencyKey.trim() : '';
    if (!/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) throw new Error('idempotency');
    const id = randomUUID();
    await createTenantOutletTrusted({ id, organizationId, name, contactPerson, email, phone, address, auditId: randomUUID(), requestId: idempotencyKey, actorFirebaseUid });
    const row = (await getTenantOutletTrusted({ organizationId, id })).data.outlets[0];
    if (!row) throw new Error('outlet not found after creation');
    return { success: true, organizationId, ...mapTrustedOutletRow(row) };
  } catch (error) {
    logCallableFailure('createTenantOutlet', error);
    throw outletCreationFailure(error);
  }
});

async function requireOrganizationAdmin(uid: string, organizationId: string): Promise<void> {
  const membership = (await getTenantMembershipTrusted({ organizationId, firebaseUid: uid })).data.organizationMemberships[0];
  if (!membership || membership.role.code !== 'organization.admin') throw new Error('scope');
}

async function requireOrganizationCapability(uid: string, organizationId: string, capability: string): Promise<void> {
  const membership = (await getTenantMembershipTrusted({ organizationId, firebaseUid: uid })).data.organizationMemberships[0];
  if (!membership) throw new Error('scope');
  if (membership.role.code === 'organization.admin') return;
  if (!membership.role.rolePermissions_on_role.some((item) => item.permission.code === capability)) throw new Error('scope');
}

export const updateTenantOutlet = onCall(callableOptions, async (request) => {
  try {
    const actorFirebaseUid = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(actorFirebaseUid); requireCapability(caller, 'outlets.read');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : '';
    const name = typeof d.name === 'string' ? d.name.trim() : ''; const contactPerson = typeof d.contactPerson === 'string' ? d.contactPerson.trim() : ''; const phone = typeof d.phone === 'string' ? d.phone.trim() : ''; const address = typeof d.address === 'string' ? d.address.trim() : '';
    if (!organizationId || !id || !name || !contactPerson || !phone || !address) throw new Error('invalid input');
    await requireOrganizationAdmin(actorFirebaseUid, organizationId);
    const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('request');
    await updateTenantOutletTrusted({ organizationId, id, name, contactPerson, email: typeof d.email === 'string' ? d.email.trim().toLowerCase() || null : null, phone, address, auditId: randomUUID(), requestId, actorFirebaseUid });
    const row = (await getTenantOutletTrusted({ organizationId, id })).data.outlets[0];
    if (!row) throw new Error('outlet not found after update');
    return { success: true, organizationId, ...mapTrustedOutletRow(row) };
  } catch (error) { logCallableFailure('updateTenantOutlet', error); throw new HttpsError('permission-denied', 'Unable to update the outlet.'); }
});

export const changeTenantOutletStatus = onCall(callableOptions, async (request) => {
  try {
    const actorFirebaseUid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actorFirebaseUid); requireCapability(caller, 'outlets.read');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const status = d.status === 'ACTIVE' || d.status === 'INACTIVE' ? d.status : '';
    const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !id || !status || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input');
    await requireOrganizationAdmin(actorFirebaseUid, organizationId);
    await changeTenantOutletStatusTrusted({ organizationId, id, status, auditId: randomUUID(), requestId, actorFirebaseUid });
    const row = (await getTenantOutletTrusted({ organizationId, id })).data.outlets[0];
    if (!row) throw new Error('outlet not found after status change');
    return { success: true, organizationId, ...mapTrustedOutletRow(row) };
  } catch (error) { logCallableFailure('changeTenantOutletStatus', error); throw new HttpsError('permission-denied', 'Unable to change the outlet status.'); }
});

function mapTrustedEmployeeRow(row: {
  id: string; employeeCode: string; fullName: string; email?: string | null; phone: string;
  designation: string; department?: string | null; dateOfJoining: string; assignmentScope: string;
  employmentStatus: string; loginAccess: string; createdAt: string; updatedAt: string;
  user?: { id: string; username: string; email: string } | null;
  employeeOutlets_on_employee: { outlet: { id: string; outletCode: number; name: string } }[];
}) {
  return {
    id: row.id, employeeCode: row.employeeCode, fullName: row.fullName, email: row.email ?? null,
    phone: row.phone, designation: row.designation, department: row.department ?? null,
    dateOfJoining: row.dateOfJoining, assignmentScope: row.assignmentScope,
    employmentStatus: row.employmentStatus, loginAccess: row.loginAccess,
    createdAt: row.createdAt, updatedAt: row.updatedAt,
    user: row.user ? { id: row.user.id, username: row.user.username, email: row.user.email } : null,
    employeeOutlets_on_employee: row.employeeOutlets_on_employee.map((item) => ({ outlet: item.outlet })),
  };
}

export const provisionTenantEmployee = onCall(callableOptions, async (request) => {
  let createdUid: string | undefined;
  try {
    const actorFirebaseUid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actorFirebaseUid); requireCapability(caller, 'employees.read');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const username = normalizeUsername(d.username); const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() : ''; const fullName = typeof d.fullName === 'string' ? d.fullName.trim() : ''; const phone = typeof d.phone === 'string' ? d.phone.trim() : ''; const designation = typeof d.designation === 'string' ? d.designation.trim() : ''; const dateOfJoining = typeof d.dateOfJoining === 'string' ? d.dateOfJoining : ''; const employeeCode = typeof d.employeeCode === 'string' ? d.employeeCode.trim() : '';
    const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : '';
    if (!organizationId || !username || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !fullName || !phone || !designation || !/^\d{4}-\d{2}-\d{2}$/.test(dateOfJoining) || !employeeCode || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input');
    await requireOrganizationAdmin(actorFirebaseUid, organizationId);
    if ((await resolveUsernameLogin({ username })).data.appUsers.length) throw new Error('username');
    try { await getAuth().getUserByEmail(email); throw new Error('email'); } catch (error: any) { if (error?.message === 'email') throw error; if (error?.code !== 'auth/user-not-found') throw error; }
    const created = await getAuth().createUser({ email, password: randomBytes(32).toString('base64url'), displayName: fullName, phoneNumber: phone, emailVerified: false, disabled: false }); createdUid = created.uid;
    const employeeId = randomUUID();
    await provisionTenantEmployeeTrusted({ id: employeeId, userId: randomUUID(), firebaseUid: created.uid, username, email, organizationId, employeeCode, fullName, phone, designation, department: typeof d.department === 'string' ? d.department.trim() || null : null, dateOfJoining, assignmentScope: typeof d.assignmentScope === 'string' ? d.assignmentScope : 'ORGANIZATION', roleId: '00000000-0000-4000-8000-000000000003', auditId: randomUUID(), requestId, actorFirebaseUid });
    await sendManagedPasswordEmail(email, 'PASSWORD_RESET');
    const row = (await getTenantEmployeeTrusted({ organizationId, id: employeeId })).data.employees[0];
    if (!row) throw new Error('employee not found after provisioning');
    return { success: true, organizationId, ...mapTrustedEmployeeRow(row) };
  } catch (error) { if (createdUid) await getAuth().deleteUser(createdUid).catch(() => undefined); logCallableFailure('provisionTenantEmployee', error); throw new HttpsError('permission-denied', 'Unable to provision the employee login.'); }
});

export const createTenantEmployeeProfile = onCall(callableOptions, async (request) => {
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'employees.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const employeeCode = typeof d.employeeCode === 'string' ? d.employeeCode.trim() : ''; const fullName = typeof d.fullName === 'string' ? d.fullName.trim() : ''; const phone = typeof d.phone === 'string' ? d.phone.trim() : ''; const designation = typeof d.designation === 'string' ? d.designation.trim() : ''; const dateOfJoining = typeof d.dateOfJoining === 'string' ? d.dateOfJoining : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : '';
    if (!organizationId || !employeeCode || !fullName || !phone || !designation || !/^\d{4}-\d{2}-\d{2}$/.test(dateOfJoining) || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationAdmin(actor, organizationId);
    const id = randomUUID();
    await createTenantEmployeeProfileTrusted({ id, organizationId, employeeCode, fullName, email: typeof d.email === 'string' ? d.email.trim().toLowerCase() || null : null, phone, designation, department: typeof d.department === 'string' ? d.department.trim() || null : null, dateOfJoining, assignmentScope: typeof d.assignmentScope === 'string' ? d.assignmentScope : 'ORGANIZATION', auditId: randomUUID(), requestId, actorFirebaseUid: actor });
    const row = (await getTenantEmployeeTrusted({ organizationId, id })).data.employees[0];
    if (!row) throw new Error('employee not found after creation');
    return { success: true, organizationId, ...mapTrustedEmployeeRow(row) };
  } catch (error) { logCallableFailure('createTenantEmployeeProfile', error); throw new HttpsError('permission-denied', 'Unable to create the employee profile.'); }
});

export const updateTenantEmployee = onCall(callableOptions, async (request) => {
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'employees.read');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; const fullName = typeof d.fullName === 'string' ? d.fullName.trim() : ''; const phone = typeof d.phone === 'string' ? d.phone.trim() : ''; const designation = typeof d.designation === 'string' ? d.designation.trim() : ''; const dateOfJoining = typeof d.dateOfJoining === 'string' ? d.dateOfJoining : '';
    if (!organizationId || !id || !fullName || !phone || !designation || !/^\d{4}-\d{2}-\d{2}$/.test(dateOfJoining) || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input');
    await requireOrganizationAdmin(actor, organizationId);
    await updateTenantEmployeeTrusted({ organizationId, id, fullName, email: typeof d.email === 'string' ? d.email.trim().toLowerCase() || null : null, phone, designation, department: typeof d.department === 'string' ? d.department.trim() || null : null, dateOfJoining, assignmentScope: typeof d.assignmentScope === 'string' ? d.assignmentScope : 'ORGANIZATION', auditId: randomUUID(), requestId, actorFirebaseUid: actor });
    const row = (await getTenantEmployeeTrusted({ organizationId, id })).data.employees[0];
    if (!row) throw new Error('employee not found after update');
    return { success: true, organizationId, ...mapTrustedEmployeeRow(row) };
  } catch (error) { logCallableFailure('updateTenantEmployee', error); throw new HttpsError('permission-denied', 'Unable to update the employee.'); }
});

export const changeTenantEmployeeStatus = onCall(callableOptions, async (request) => {
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'employees.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const status = d.status === 'ACTIVE' || d.status === 'INACTIVE' ? d.status : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : '';
    if (!organizationId || !id || !status || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationAdmin(actor, organizationId);
    await changeTenantEmployeeStatusTrusted({ organizationId, id, status, auditId: randomUUID(), requestId, actorFirebaseUid: actor });
    const row = (await getTenantEmployeeTrusted({ organizationId, id })).data.employees[0];
    if (!row) throw new Error('employee not found after status change');
    return { success: true, organizationId, ...mapTrustedEmployeeRow(row) };
  } catch (error) { logCallableFailure('changeTenantEmployeeStatus', error); throw new HttpsError('permission-denied', 'Unable to change the employee status.'); }
});

export const changeTenantEmployeeLoginAccess = onCall(callableOptions, async (request) => {
  let targetUid = '';
  let previousDisabled = false;
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(actor);
    requireCapability(caller, 'employees.read');
    const d = request.data ?? {};
    const organizationId = typeof d.organizationId === 'string' ? d.organizationId : '';
    const id = typeof d.id === 'string' ? d.id : '';
    const loginAccess = d.loginAccess === 'ENABLED' || d.loginAccess === 'DISABLED' ? d.loginAccess : '';
    const enabled = loginAccess === 'ENABLED';
    const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : '';
    if (!organizationId || !id || !loginAccess || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input');
    await requireOrganizationAdmin(actor, organizationId);

    const employee = (await resolveTenantEmployeeIdentityTrusted({ organizationId, employeeId: id })).data.employees[0];
    if (!employee?.user?.firebaseUid) throw new Error('employee identity not found');
    targetUid = employee.user.firebaseUid;

    const authUser = await getAuth().getUser(targetUid);
    previousDisabled = authUser.disabled;
    await getAuth().updateUser(targetUid, { disabled: !enabled });
    if (!enabled) await getAuth().revokeRefreshTokens(targetUid);
    await changeTenantEmployeeLoginAccessTrusted({ organizationId, id, userId: employee.user.id, loginAccess: enabled ? LoginAccessStatus.ENABLED : LoginAccessStatus.DISABLED, auditId: randomUUID(), requestId, actorFirebaseUid: actor });
    const row = (await getTenantEmployeeTrusted({ organizationId, id })).data.employees[0];
    if (!row) throw new Error('employee not found after login access change');
    return { success: true, organizationId, ...mapTrustedEmployeeRow(row) };
  } catch (error) {
    if (targetUid) await getAuth().updateUser(targetUid, { disabled: previousDisabled }).catch(() => undefined);
    logCallableFailure('changeTenantEmployeeLoginAccess', error);
    throw new HttpsError('permission-denied', 'Unable to change employee login access.');
  }
});

export const createTenantServicePerson = onCall(callableOptions, async (request) => {
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'service_persons.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const code = typeof d.servicePersonCode === 'string' ? d.servicePersonCode.trim() : ''; const fullName = typeof d.fullName === 'string' ? d.fullName.trim() : ''; const phone = typeof d.phone === 'string' ? d.phone.trim() : ''; const specialization = typeof d.specialization === 'string' ? d.specialization.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : '';
    if (!organizationId || !code || !fullName || !phone || !specialization || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationAdmin(actor, organizationId);
    const id = randomUUID();
    await createTenantServicePersonTrusted({ id, organizationId, servicePersonCode: code, fullName, email: typeof d.email === 'string' ? d.email.trim().toLowerCase() || null : null, phone, specialization, skills: typeof d.skills === 'string' ? d.skills.trim() || null : null, yearsOfExperience: Number.isInteger(d.yearsOfExperience) ? d.yearsOfExperience : null, assignmentScope: typeof d.assignmentScope === 'string' ? d.assignmentScope : 'ORGANIZATION', auditId: randomUUID(), requestId, actorFirebaseUid: actor });
    const row = (await getTenantServicePersonTrusted({ organizationId, id })).data.servicePeople[0];
    if (!row) throw new Error('service person not found after creation');
    return { success: true, organizationId, ...row };
  } catch (error) { logCallableFailure('createTenantServicePerson', error); throw new HttpsError('permission-denied', 'Unable to create the service person.'); }
});

export const updateTenantServicePerson = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'service_persons.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const fullName = typeof d.fullName === 'string' ? d.fullName.trim() : ''; const phone = typeof d.phone === 'string' ? d.phone.trim() : ''; const specialization = typeof d.specialization === 'string' ? d.specialization.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !id || !fullName || !phone || !specialization || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationAdmin(actor, organizationId); await updateTenantServicePersonTrusted({ organizationId, id, fullName, email: typeof d.email === 'string' ? d.email.trim().toLowerCase() || null : null, phone, specialization, skills: typeof d.skills === 'string' ? d.skills.trim() || null : null, yearsOfExperience: Number.isInteger(d.yearsOfExperience) ? d.yearsOfExperience : null, assignmentScope: typeof d.assignmentScope === 'string' ? d.assignmentScope : 'ORGANIZATION', auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantServicePersonTrusted({ organizationId, id })).data.servicePeople[0]; if (!row) throw new Error('service person not found after update'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('updateTenantServicePerson', error); throw new HttpsError('permission-denied', 'Unable to update the service person.'); }
});

export const changeTenantServicePersonStatus = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'service_persons.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const status = d.status === 'ACTIVE' || d.status === 'INACTIVE' ? d.status : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !id || !status || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationAdmin(actor, organizationId); await changeTenantServicePersonStatusTrusted({ organizationId, id, status, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantServicePersonTrusted({ organizationId, id })).data.servicePeople[0]; if (!row) throw new Error('service person not found after status change'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('changeTenantServicePersonStatus', error); throw new HttpsError('permission-denied', 'Unable to change the service person status.'); }
});

export const assignTenantEmployeeOutlet = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'employees.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const employeeId = typeof d.employeeId === 'string' ? d.employeeId : ''; const outletId = typeof d.outletId === 'string' ? d.outletId : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !employeeId || !outletId || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationAdmin(actor, organizationId); await assignTenantEmployeeOutletTrusted({ organizationId, employeeId, outletId, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, employeeId, outletId }; } catch (error) { logCallableFailure('assignTenantEmployeeOutlet', error); throw new HttpsError('permission-denied', 'Unable to assign the employee to the outlet.'); }
});

export const assignTenantServicePersonOutlet = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'service_persons.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const servicePersonId = typeof d.servicePersonId === 'string' ? d.servicePersonId : ''; const outletId = typeof d.outletId === 'string' ? d.outletId : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !servicePersonId || !outletId || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationAdmin(actor, organizationId); await assignTenantServicePersonOutletTrusted({ organizationId, servicePersonId, outletId, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, servicePersonId, outletId }; } catch (error) { logCallableFailure('assignTenantServicePersonOutlet', error); throw new HttpsError('permission-denied', 'Unable to assign the service person to the outlet.'); }
});

export const adjustTenantInventoryStock = onCall(callableOptions, async (request) => {
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'inventory.read');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const outletId = typeof d.outletId === 'string' ? d.outletId : ''; const productId = typeof d.productId === 'string' ? d.productId : ''; const mode = d.mode === 'INCREASE' || d.mode === 'DECREASE' || d.mode === 'RECONCILE' ? d.mode : ''; const quantity = Number(d.quantity); const previousQty = Number(d.previousQty); const newQty = Number(d.newQty); const reasonCode = typeof d.reasonCode === 'string' ? d.reasonCode.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : '';
    if (!organizationId || !outletId || !productId || !mode || !Number.isFinite(quantity) || quantity < 0 || !Number.isFinite(previousQty) || previousQty < 0 || !Number.isFinite(newQty) || newQty < 0 || !reasonCode || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input');
    await requireOrganizationCapability(actor, organizationId, 'inventory.read');
    await adjustTenantInventory({ organizationId, outletId, productId, mode, quantity, previousQty, newQty, reasonCode, auditNote: typeof d.auditNote === 'string' ? d.auditNote.trim() || null : null, requestId, actorFirebaseUid: actor });
    return { success: true, organizationId, outletId, productId, newQty };
  } catch (error) { logCallableFailure('adjustTenantInventoryStock', error); throw new HttpsError('permission-denied', 'Unable to adjust inventory stock.'); }
});

export const createTenantInventoryStockRecord = onCall(callableOptions, async (request) => {
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(actor);
    requireCapability(caller, 'inventory.read');
    const d = request.data ?? {};
    const organizationId = typeof d.organizationId === 'string' ? d.organizationId : '';
    const outletId = typeof d.outletId === 'string' ? d.outletId : '';
    const productId = typeof d.productId === 'string' ? d.productId : '';
    const onHandQty = Number(d.onHandQty);
    const reorderLevel = Number(d.reorderLevel);
    const overstockThreshold = Number(d.overstockThreshold);
    const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : '';
    if (!organizationId || !outletId || !productId || !Number.isFinite(onHandQty) || onHandQty < 0 || !Number.isFinite(reorderLevel) || reorderLevel < 0 || !Number.isFinite(overstockThreshold) || overstockThreshold < reorderLevel || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input');
    await requireOrganizationCapability(actor, organizationId, 'inventory.read');
    await createTenantInventoryStock({ organizationId, outletId, productId, onHandQty, reorderLevel, overstockThreshold, requestId, actorFirebaseUid: actor });
    return { success: true, organizationId, outletId, productId };
  } catch (error) { logCallableFailure('createTenantInventoryStockRecord', error); throw new HttpsError('permission-denied', 'Unable to create the inventory record.'); }
});

function productFields(d: any) {
  return { name: typeof d.name === 'string' ? d.name.trim() : '', brand: typeof d.brand === 'string' ? d.brand.trim() : '', categoryId: typeof d.categoryId === 'string' ? d.categoryId.trim() : '', categoryName: typeof d.categoryName === 'string' ? d.categoryName.trim() : '', subcategory: typeof d.subcategory === 'string' ? d.subcategory.trim() || null : null, type: d.type === 'SERVICE' || d.type === 'CONSUMABLE' ? d.type : 'STOCKABLE', sku: typeof d.sku === 'string' ? d.sku.trim() : '', barcode: typeof d.barcode === 'string' ? d.barcode.trim() || null : null, hsnCode: typeof d.hsnCode === 'string' ? d.hsnCode.trim() || null : null, unitOfMeasure: typeof d.unitOfMeasure === 'string' ? d.unitOfMeasure.trim() || null : null, sellingPrice: Number(d.sellingPrice), mrp: Number.isFinite(Number(d.mrp)) ? Number(d.mrp) : null, cost: Number.isFinite(Number(d.cost)) ? Number(d.cost) : null, minSellingPrice: Number.isFinite(Number(d.minSellingPrice)) ? Number(d.minSellingPrice) : null, discountAllowed: d.discountAllowed !== false, taxCategory: typeof d.taxCategory === 'string' ? d.taxCategory.trim() || null : null, reorderLevel: Number.isFinite(Number(d.reorderLevel)) ? Number(d.reorderLevel) : null, reorderQuantity: Number.isFinite(Number(d.reorderQuantity)) ? Number(d.reorderQuantity) : null, primarySupplier: typeof d.primarySupplier === 'string' ? d.primarySupplier.trim() || null : null, supplierProductCode: typeof d.supplierProductCode === 'string' ? d.supplierProductCode.trim() || null : null, description: typeof d.description === 'string' ? d.description.trim() || null : null, imageUrl: typeof d.imageUrl === 'string' ? d.imageUrl.trim() || null : null };
}

export const createTenantProductRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'products.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const productCode = typeof d.productCode === 'string' ? d.productCode.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; const fields = productFields(d); if (!organizationId || !productCode || !fields.name || !fields.brand || !fields.categoryId || !fields.categoryName || !fields.sku || !Number.isFinite(fields.sellingPrice) || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'products.read'); const id = randomUUID(); await createTenantProduct({ id, organizationId, productCode, ...fields, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantProductTrusted({ organizationId, id })).data.products[0]; if (!row) throw new Error('product not found after creation'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('createTenantProductRecord', error); throw productCreationFailure(error); }
});

export const updateTenantProductRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'products.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; const fields = productFields(d); if (!organizationId || !id || !fields.name || !fields.brand || !fields.categoryId || !fields.categoryName || !fields.sku || !Number.isFinite(fields.sellingPrice) || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'products.read'); await updateTenantProduct({ organizationId, id, ...fields, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantProductTrusted({ organizationId, id })).data.products[0]; if (!row) throw new Error('product not found after update'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('updateTenantProductRecord', error); throw new HttpsError('permission-denied', 'Unable to update the product.'); }
});

export const changeTenantProductStatus = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'products.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const status = d.status === 'ACTIVE' || d.status === 'INACTIVE' ? d.status : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !id || !status || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'products.read'); await changeTenantProductStatusSql({ organizationId, id, status, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantProductTrusted({ organizationId, id })).data.products[0]; if (!row) throw new Error('product not found after status change'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('changeTenantProductStatus', error); throw new HttpsError('permission-denied', 'Unable to change the product status.'); }
});

export const createTenantCustomerRecord = onCall(callableOptions, async (request) => {
    try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'customers.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const customerCode = typeof d.customerCode === 'string' ? d.customerCode.trim() : ''; const name = typeof d.name === 'string' ? d.name.trim() : ''; const phone = typeof d.phone === 'string' ? d.phone.trim() : ''; const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() : ''; const city = typeof d.city === 'string' ? d.city.trim() : ''; const state = typeof d.state === 'string' ? d.state.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; const type: CustomerType = d.type === 'BUSINESS' ? CustomerType.BUSINESS : CustomerType.INDIVIDUAL; if (!organizationId || !customerCode || !name || !phone || !email || !city || !state || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'customers.read'); const id = randomUUID(); await createTenantCustomer({ id, organizationId, customerCode, type, name, phone, email, taxId: typeof d.taxId === 'string' ? d.taxId.trim() || null : null, address: typeof d.address === 'string' ? d.address.trim() || null : null, city, state, postalCode: typeof d.postalCode === 'string' ? d.postalCode.trim() || null : null, country: typeof d.country === 'string' ? d.country.trim() || null : null, creditLimit: Number.isFinite(Number(d.creditLimit)) ? Number(d.creditLimit) : null, preferredContact: typeof d.preferredContact === 'string' ? d.preferredContact : null, dateOfBirth: typeof d.dateOfBirth === 'string' ? d.dateOfBirth : null, gender: typeof d.gender === 'string' ? d.gender.trim() || null : null, notes: typeof d.notes === 'string' ? d.notes.trim() || null : null, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantCustomerTrusted({ organizationId, id })).data.customers[0]; if (!row) throw new Error('customer not found after creation'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('createTenantCustomerRecord', error); throw new HttpsError('permission-denied', 'Unable to create the customer.'); }
});

export const updateTenantCustomerRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'customers.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const name = typeof d.name === 'string' ? d.name.trim() : ''; const phone = typeof d.phone === 'string' ? d.phone.trim() : ''; const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() : ''; const city = typeof d.city === 'string' ? d.city.trim() : ''; const state = typeof d.state === 'string' ? d.state.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; const type: CustomerType = d.type === 'BUSINESS' ? CustomerType.BUSINESS : CustomerType.INDIVIDUAL; if (!organizationId || !id || !name || !phone || !email || !city || !state || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'customers.read'); await updateTenantCustomer({ organizationId, id, type, name, phone, email, taxId: typeof d.taxId === 'string' ? d.taxId.trim() || null : null, address: typeof d.address === 'string' ? d.address.trim() || null : null, city, state, postalCode: typeof d.postalCode === 'string' ? d.postalCode.trim() || null : null, country: typeof d.country === 'string' ? d.country.trim() || null : null, creditLimit: Number.isFinite(Number(d.creditLimit)) ? Number(d.creditLimit) : null, preferredContact: typeof d.preferredContact === 'string' ? d.preferredContact : null, dateOfBirth: typeof d.dateOfBirth === 'string' ? d.dateOfBirth : null, gender: typeof d.gender === 'string' ? d.gender.trim() || null : null, notes: typeof d.notes === 'string' ? d.notes.trim() || null : null, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantCustomerTrusted({ organizationId, id })).data.customers[0]; if (!row) throw new Error('customer not found after update'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('updateTenantCustomerRecord', error); throw new HttpsError('permission-denied', 'Unable to update the customer.'); }
});

export const changeTenantCustomerStatus = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'customers.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const status = d.status === 'ACTIVE' || d.status === 'INACTIVE' ? d.status : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !id || !status || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'customers.read'); await changeTenantCustomerStatusSql({ organizationId, id, status, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantCustomerTrusted({ organizationId, id })).data.customers[0]; if (!row) throw new Error('customer not found after status change'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('changeTenantCustomerStatus', error); throw new HttpsError('permission-denied', 'Unable to change the customer status.'); }
});

export const createTenantSupplierRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'suppliers.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const supplierCode = typeof d.supplierCode === 'string' ? d.supplierCode.trim() : ''; const name = typeof d.name === 'string' ? d.name.trim() : ''; const contactPerson = typeof d.contactPerson === 'string' ? d.contactPerson.trim() : ''; const phone = typeof d.phone === 'string' ? d.phone.trim() : ''; const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() : ''; const taxId = typeof d.taxId === 'string' ? d.taxId.trim() : ''; const city = typeof d.city === 'string' ? d.city.trim() : ''; const category = typeof d.category === 'string' ? d.category.trim() : ''; const paymentTerms = typeof d.paymentTerms === 'string' ? d.paymentTerms.trim() : ''; const creditLimit = Number(d.creditLimit); const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !supplierCode || !name || !contactPerson || !phone || !email || !taxId || !city || !category || !paymentTerms || !Number.isFinite(creditLimit) || creditLimit < 0 || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'suppliers.read'); const id = randomUUID(); await createTenantSupplier({ id, organizationId, supplierCode, name, contactPerson, phone, email, taxId, address: typeof d.address === 'string' ? d.address.trim() || null : null, city, state: typeof d.state === 'string' ? d.state.trim() || null : null, postalCode: typeof d.postalCode === 'string' ? d.postalCode.trim() || null : null, country: typeof d.country === 'string' ? d.country.trim() || null : null, category, paymentTerms, creditLimit, notes: typeof d.notes === 'string' ? d.notes.trim() || null : null, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantSupplierTrusted({ organizationId, id })).data.suppliers[0]; if (!row) throw new Error('supplier not found after creation'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('createTenantSupplierRecord', error); throw new HttpsError('permission-denied', 'Unable to create the supplier.'); }
});

export const changeTenantSupplierStatus = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'suppliers.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const status = d.status === 'ACTIVE' || d.status === 'INACTIVE' ? d.status : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !id || !status || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'suppliers.read'); await changeTenantSupplierStatusSql({ organizationId, id, status, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantSupplierTrusted({ organizationId, id })).data.suppliers[0]; if (!row) throw new Error('supplier not found after status change'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('changeTenantSupplierStatus', error); throw new HttpsError('permission-denied', 'Unable to change supplier status.'); }
});

export const updateTenantSupplierRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'suppliers.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const required = (key: string) => typeof d[key] === 'string' ? d[key].trim() : ''; const creditLimit = Number(d.creditLimit); const requestId = required('requestId'); if (!organizationId || !id || !required('name') || !required('contactPerson') || !required('phone') || !required('email') || !required('taxId') || !required('city') || !required('category') || !required('paymentTerms') || !Number.isFinite(creditLimit) || creditLimit < 0 || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'suppliers.read'); await updateTenantSupplier({ organizationId, id, name: required('name'), contactPerson: required('contactPerson'), phone: required('phone'), email: required('email').toLowerCase(), taxId: required('taxId'), address: required('address') || null, city: required('city'), state: required('state') || null, postalCode: required('postalCode') || null, country: required('country') || null, category: required('category'), paymentTerms: required('paymentTerms'), creditLimit, notes: required('notes') || null, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); const row = (await getTenantSupplierTrusted({ organizationId, id })).data.suppliers[0]; if (!row) throw new Error('supplier not found after update'); return { success: true, organizationId, ...row }; } catch (error) { logCallableFailure('updateTenantSupplierRecord', error); throw new HttpsError('permission-denied', 'Unable to update the supplier.'); }
});

export const createTenantPurchaseRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'purchases.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const purchaseNumber = typeof d.purchaseNumber === 'string' ? d.purchaseNumber.trim() : ''; const supplierId = typeof d.supplierId === 'string' ? d.supplierId : ''; const purchaseDate = typeof d.purchaseDate === 'string' ? d.purchaseDate : ''; const createdBy = typeof d.createdBy === 'string' ? d.createdBy.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; const n = (key: string) => Number(d[key]); const lines = Array.isArray(d.lines) ? d.lines : []; const outletId = typeof d.outletId === 'string' ? d.outletId : ''; if (!organizationId || !purchaseNumber || !supplierId || !/^\d{4}-\d{2}-\d{2}$/.test(purchaseDate) || !createdBy || !Number.isFinite(n('totalAmount')) || !lines.every((line: any) => line && typeof line.productId === 'string' && Number.isFinite(Number(line.quantity)) && Number(line.quantity) > 0) || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'purchases.read'); if (outletId && !(await listTenantOutlets({ organizationId })).data.outlets.some((outlet) => outlet.id === outletId && outlet.status === 'ACTIVE')) throw new Error('outlet is not in this organization'); const createdPurchase = await createTenantPurchase({ organizationId, purchaseNumber, purchaseDate, supplierId, outletId: outletId || null, scope: typeof d.scope === 'string' ? d.scope : 'outlet', paymentTerms: typeof d.paymentTerms === 'string' ? d.paymentTerms : null, subtotal: n('subtotal'), shippingFee: n('shippingFee'), handlingFee: n('handlingFee'), tax: n('tax'), totalAmount: n('totalAmount'), amountPaid: n('amountPaid'), outstandingAmount: n('outstandingAmount'), paymentStatus: PurchasePaymentStatus.UNPAID, receiptStatus: PurchaseReceiptStatus.PENDING, status: PurchaseStatus.ACTIVE, createdBy, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); for (const line of lines as any[]) { const quantity = Number(line.quantity); const unitCost = Number(line.unitCost); const discountPercent = Number(line.discountPercent ?? 0); const taxRate = Number(line.taxRate ?? 0); const taxAmount = Number(line.taxAmount ?? 0); const lineTotal = Number(line.lineTotal ?? quantity * unitCost); if (![unitCost, discountPercent, taxRate, taxAmount, lineTotal].every(Number.isFinite) || unitCost < 0 || lineTotal < 0) throw new Error('invalid line'); await createTenantPurchaseLine({ organizationId, purchaseId: createdPurchase.data.purchase_insert.id, productId: line.productId, quantityOrdered: quantity, unitCost, discountPercent, taxRate, taxAmount, lineTotal, auditId: randomUUID(), requestId: `${requestId}-${randomUUID()}`, actorFirebaseUid: actor }); } return { success: true, organizationId, purchaseNumber }; } catch (error) { logCallableFailure('createTenantPurchaseRecord', error); throw new HttpsError('permission-denied', 'Unable to create the purchase.'); }
});

export const changeTenantPurchaseStatus = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'purchases.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const status = d.status === 'ACTIVE' || d.status === 'DRAFT' || d.status === 'CANCELLED' ? d.status : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !id || !status || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'purchases.read'); await changeTenantPurchaseStatusSql({ organizationId, id, status, reason: typeof d.reason === 'string' ? d.reason.trim() || null : null, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, organizationId, id, status }; } catch (error) { logCallableFailure('changeTenantPurchaseStatus', error); throw new HttpsError('permission-denied', 'Unable to change purchase status.'); }
});

export const receiveTenantPurchaseLineRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'purchases.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const purchaseId = typeof d.purchaseId === 'string' ? d.purchaseId : ''; const lineId = typeof d.lineId === 'string' ? d.lineId : ''; const outletId = typeof d.outletId === 'string' ? d.outletId : ''; const productId = typeof d.productId === 'string' ? d.productId : ''; const quantityReceived = Number(d.quantityReceived); const receiptStatus = d.receiptStatus === 'PENDING' || d.receiptStatus === 'PARTIALLY_RECEIVED' || d.receiptStatus === 'RECEIVED' ? d.receiptStatus : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !purchaseId || !lineId || !outletId || !productId || !receiptStatus || !Number.isFinite(quantityReceived) || quantityReceived < 0 || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'purchases.read'); const stock = (await getTenantInventoryStockTrusted({ organizationId, outletId, productId })).data.inventoryStocks[0]; if (!stock) throw new Error('inventory item not found'); await receiveTenantPurchaseLine({ organizationId, purchaseId, lineId, outletId, productId, quantityReceived, newStockQty: stock.onHandQty + quantityReceived, receiptStatus, batchNumber: typeof d.batchNumber === 'string' ? d.batchNumber.trim() || null : null, mfgDate: typeof d.mfgDate === 'string' ? d.mfgDate : null, expiryDate: typeof d.expiryDate === 'string' ? d.expiryDate : null, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, organizationId, purchaseId, lineId }; } catch (error) { logCallableFailure('receiveTenantPurchaseLineRecord', error); throw new HttpsError('permission-denied', 'Unable to receive the purchase line.'); }
});

export const createTenantExpenseRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'expenses.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const expenseNumber = typeof d.expenseNumber === 'string' ? d.expenseNumber.trim() : ''; const expenseDate = typeof d.expenseDate === 'string' ? d.expenseDate : ''; const category = typeof d.category === 'string' ? d.category.trim() : ''; const description = typeof d.description === 'string' ? d.description.trim() : ''; const paidByEmployee = typeof d.paidByEmployee === 'string' ? d.paidByEmployee.trim() : ''; const submittedBy = typeof d.submittedBy === 'string' ? d.submittedBy.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; const baseAmount = Number(d.baseAmount); const taxAmount = Number(d.taxAmount); const amount = Number(d.amount); if (!organizationId || !expenseNumber || !/^\d{4}-\d{2}-\d{2}$/.test(expenseDate) || !category || !description || !paidByEmployee || !submittedBy || !Number.isFinite(baseAmount) || !Number.isFinite(taxAmount) || !Number.isFinite(amount) || amount < 0 || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'expenses.read'); await createTenantExpense({ organizationId, expenseNumber, expenseDate, category, description, reference: typeof d.reference === 'string' ? d.reference.trim() || null : null, vendorName: typeof d.vendorName === 'string' ? d.vendorName.trim() || null : null, outletId: typeof d.outletId === 'string' ? d.outletId : null, scope: typeof d.scope === 'string' ? d.scope : 'Outlet', baseAmount, taxAmount, amount, paymentMethod: typeof d.paymentMethod === 'string' ? d.paymentMethod : 'Other', paidByEmployee, submittedBy, notes: typeof d.notes === 'string' ? d.notes.trim() || null : null, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, organizationId, expenseNumber }; } catch (error) { logCallableFailure('createTenantExpenseRecord', error); throw new HttpsError('permission-denied', 'Unable to create the expense.'); }
});

export const updateTenantExpenseRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'expenses.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const expenseDate = typeof d.expenseDate === 'string' ? d.expenseDate : ''; const category = typeof d.category === 'string' ? d.category.trim() : ''; const description = typeof d.description === 'string' ? d.description.trim() : ''; const paidByEmployee = typeof d.paidByEmployee === 'string' ? d.paidByEmployee.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; const baseAmount = Number(d.baseAmount); const taxAmount = Number(d.taxAmount); const amount = Number(d.amount); if (!organizationId || !id || !/^\d{4}-\d{2}-\d{2}$/.test(expenseDate) || !category || !description || !paidByEmployee || !Number.isFinite(baseAmount) || !Number.isFinite(taxAmount) || !Number.isFinite(amount) || amount < 0 || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'expenses.read'); await updateTenantExpense({ organizationId, id, expenseDate, category, description, reference: typeof d.reference === 'string' ? d.reference.trim() || null : null, vendorName: typeof d.vendorName === 'string' ? d.vendorName.trim() || null : null, scope: typeof d.scope === 'string' ? d.scope : 'Outlet', baseAmount, taxAmount, amount, paymentMethod: typeof d.paymentMethod === 'string' ? d.paymentMethod : 'Other', paidByEmployee, notes: typeof d.notes === 'string' ? d.notes.trim() || null : null, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, organizationId, id }; } catch (error) { logCallableFailure('updateTenantExpenseRecord', error); throw new HttpsError('permission-denied', 'Unable to update the expense.'); }
});

export const changeTenantExpenseApprovalStatus = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'expenses.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const approvalStatus = ['DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED'].includes(d.approvalStatus) ? d.approvalStatus : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !id || !approvalStatus || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'expenses.read'); await changeTenantExpenseApproval({ organizationId, id, approvalStatus, reason: typeof d.reason === 'string' ? d.reason.trim() || null : null, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, organizationId, id, approvalStatus }; } catch (error) { logCallableFailure('changeTenantExpenseApprovalStatus', error); throw new HttpsError('permission-denied', 'Unable to update expense approval.'); }
});

export const voidTenantExpenseRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'expenses.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const id = typeof d.id === 'string' ? d.id : ''; const reason = typeof d.reason === 'string' ? d.reason.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !id || !reason || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'expenses.read'); await voidTenantExpense({ organizationId, id, reason, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, organizationId, id }; } catch (error) { logCallableFailure('voidTenantExpenseRecord', error); throw new HttpsError('permission-denied', 'Unable to void the expense.'); }
});

export const completeTenantSale = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'sales.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const outletId = typeof d.outletId === 'string' ? d.outletId : ''; const receiptNumber = typeof d.receiptNumber === 'string' ? d.receiptNumber.trim() : ''; const customerName = typeof d.customerName === 'string' ? d.customerName.trim() : ''; const staffName = typeof d.staffName === 'string' ? d.staffName.trim() : ''; const terminalId = typeof d.terminalId === 'string' ? d.terminalId.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; const tenderType = Object.values(SaleTenderType).includes(d.tenderType) ? d.tenderType as SaleTenderType : SaleTenderType.NONE; const n = (key: string) => Number(d[key]); if (!organizationId || !outletId || !receiptNumber || !customerName || !staffName || !terminalId || !Number.isFinite(n('totalNet')) || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'sales.read'); const result = await createTenantSale({ organizationId, outletId, receiptNumber, saleTimestamp: typeof d.saleTimestamp === 'string' ? d.saleTimestamp : new Date().toISOString(), customerId: typeof d.customerId === 'string' ? d.customerId : null, customerName, staffName, channel: typeof d.channel === 'string' ? d.channel : null, terminalId, tenderType, tax: n('tax'), discount: n('discount'), subtotal: n('subtotal'), totalNet: n('totalNet'), auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, organizationId, outletId, receiptNumber, saleId: result.data.sale_insert.id }; } catch (error) { logCallableFailure('completeTenantSale', error); throw new HttpsError('permission-denied', 'Unable to complete the sale.'); }
});

export const addTenantSaleLineRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'sales.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const saleId = typeof d.saleId === 'string' ? d.saleId : ''; const outletId = typeof d.outletId === 'string' ? d.outletId : ''; const productId = typeof d.productId === 'string' ? d.productId : ''; const quantity = Number(d.quantity); const unitPrice = Number(d.unitPrice); const subtotal = Number(d.subtotal); const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !saleId || !outletId || !productId || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unitPrice) || unitPrice < 0 || !Number.isFinite(subtotal) || subtotal < 0 || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'sales.read'); const stock = (await getTenantInventoryStockTrusted({ organizationId, outletId, productId })).data.inventoryStocks[0]; if (!stock || stock.onHandQty < quantity) throw new Error('insufficient stock'); await addTenantSaleLine({ organizationId, saleId, outletId, productId, quantity, newStockQty: stock.onHandQty - quantity, unitPrice, subtotal, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, organizationId, saleId, productId }; } catch (error) { logCallableFailure('addTenantSaleLineRecord', error); throw new HttpsError('permission-denied', 'Unable to add the sale line.'); }
});

export const voidTenantSaleRecord = onCall(callableOptions, async (request) => {
  try { const actor = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(actor); requireCapability(caller, 'sales.read'); const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const saleId = typeof d.saleId === 'string' ? d.saleId : ''; const reason = typeof d.reason === 'string' ? d.reason.trim() : ''; const requestId = typeof d.requestId === 'string' ? d.requestId.trim() : ''; if (!organizationId || !saleId || !reason || !/^[A-Za-z0-9._:-]{8,128}$/.test(requestId)) throw new Error('invalid input'); await requireOrganizationCapability(actor, organizationId, 'sales.read'); await voidTenantSale({ organizationId, saleId, reason, auditId: randomUUID(), requestId, actorFirebaseUid: actor }); return { success: true, organizationId, saleId }; } catch (error) { logCallableFailure('voidTenantSaleRecord', error); throw new HttpsError('permission-denied', 'Unable to void the incomplete sale.'); }
});

async function authorizeTarget(request: any, capability: string) {
  const callerUid = requireVerifiedFirebaseIdentity(request.auth);
  const caller = await loadAuthorization(callerUid); requireCapability(caller, capability);
  const organizationId = typeof request.data?.organizationId === 'string' ? request.data.organizationId : '';
  const appUserId = typeof request.data?.administratorId === 'string' ? request.data.administratorId : '';
  if (!organizationId || !appUserId) throw new Error('invalid request');
  const identity = (await resolveOrganizationAdministratorIdentity({ organizationId, appUserId })).data.organizationMembership;
  if (!identity?.user?.firebaseUid || !identity.user.email) throw new Error('not found');
  return { callerUid, organizationId, appUserId, identity };
}

export const resendAdministratorOnboardingEmail = onCall(callableOptions, async (request) => {
  try { const t = await authorizeTarget(request, 'organization_admins.create'); await sendManagedPasswordEmail(t.identity.user.email, 'PASSWORD_RESET'); await recordAdministratorSecurityEvent({ auditId: randomUUID(), actorFirebaseUid: t.callerUid, action: 'organization_administrator.onboarding_email_resent', targetId: t.appUserId, organizationId: t.organizationId, requestId: randomUUID() }); return { success: true }; }
  catch { throw new HttpsError('permission-denied', 'Unable to send the onboarding email.'); }
});

export const resetOrganizationAdministratorPassword = onCall(callableOptions, async (request) => {
  try {
    const t = await authorizeTarget(request, 'organization_admins.reset_password');
    if (t.identity.user.status !== AppUserStatus.ACTIVE) throw new Error('inactive target');
    const initialPassword = typeof request.data?.initialPassword === 'string' ? request.data.initialPassword : '';
    if (initialPassword.length < 6 || initialPassword.length > 4096) throw new Error('invalid password');
    const auth = getAuth();
    await auth.updateUser(t.identity.user.firebaseUid, { password: initialPassword });
    await auth.revokeRefreshTokens(t.identity.user.firebaseUid);
    await sendManagedVerificationEmail(t.identity.user.email, initialPassword);
    await recordAdministratorSecurityEvent({ auditId: randomUUID(), actorFirebaseUid: t.callerUid, action: 'organization_administrator.password_reset_initiated', targetId: t.appUserId, organizationId: t.organizationId, requestId: randomUUID() });
    return { success: true };
  } catch (error) { logCallableFailure('resetOrganizationAdministratorPassword', error); throw new HttpsError('permission-denied', 'Unable to reset the administrator password.'); }
});

function tenantOrganizationId(record: AuthorizationRecord): string {
  const authorized = toAuthorizedUser(record);
  if (!authorized.organizationIds[0]) throw new Error('No active organization membership.');
  return authorized.organizationIds[0];
}

function heldOrdersCollection(organizationId: string) {
  return getFirestore().collection('organizations').doc(organizationId).collection('heldOrders');
}

function isHeldOrderPayload(value: unknown): value is Record<string, unknown> {
  const payload = value as Record<string, unknown> | null;
  if (!payload) return false;
  return typeof payload.orderNumber === 'string'
    && Array.isArray(payload.items)
    && payload.items.length <= 100
    && Boolean(payload.customer)
    && typeof payload.itemCount === 'number'
    && typeof payload.unitCount === 'number'
    && typeof payload.totalPayable === 'number';
}

export const listTenantHeldOrders = onCall(callableOptions, async (request) => {
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(actor);
    requireCapability(caller, 'billing.read');
    const organizationId = tenantOrganizationId(caller);
    const snapshot = await heldOrdersCollection(organizationId).orderBy('heldAt', 'desc').get();
    return { heldOrders: snapshot.docs.map((doc) => doc.data().heldOrder) };
  } catch (error) {
    logCallableFailure('listTenantHeldOrders', error);
    throw new HttpsError('permission-denied', 'Unable to load held orders.');
  }
});

export const createTenantHeldOrder = onCall(callableOptions, async (request) => {
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(actor);
    requireCapability(caller, 'billing.read');
    const organizationId = tenantOrganizationId(caller);
    const payload = request.data?.heldOrder;
    if (!isHeldOrderPayload(payload)) throw new Error('Invalid held order.');
    const id = randomUUID();
    const heldOrder = { ...payload, id, heldAt: new Date().toISOString() };
    await heldOrdersCollection(organizationId).doc(id).set({
      heldOrder,
      heldAt: FieldValue.serverTimestamp(),
      createdBy: actor,
    });
    return { heldOrder };
  } catch (error) {
    logCallableFailure('createTenantHeldOrder', error);
    throw new HttpsError('permission-denied', 'Unable to hold the order.');
  }
});

export const deleteTenantHeldOrder = onCall(callableOptions, async (request) => {
  try {
    const actor = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(actor);
    requireCapability(caller, 'billing.read');
    const organizationId = tenantOrganizationId(caller);
    const id = typeof request.data?.id === 'string' ? request.data.id : '';
    if (!id) throw new Error('Invalid held order id.');
    await heldOrdersCollection(organizationId).doc(id).delete();
    return { success: true as const };
  } catch (error) {
    logCallableFailure('deleteTenantHeldOrder', error);
    throw new HttpsError('permission-denied', 'Unable to resume the held order.');
  }
});
