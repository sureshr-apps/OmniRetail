import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { defineString } from 'firebase-functions/params';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import {
  AppUserStatus,
  getUserAuthorizationByFirebaseUid,
  recordPasswordChange as recordPasswordChangeAudit,
  recordSuccessfulLogin,
  resolveUsernameLogin,
  updateAppUserProfile,
  getOrganization,
  provisionOrganizationAdministrator as provisionOrganizationAdministratorSql,
  getLifecycleIdempotency, claimLifecycleIdempotency, completeLifecycleIdempotency, recordProvisioningReconciliation,
  ProvisioningAttemptStatus,
  changeOrganizationAdministratorStatus as changeOrganizationAdministratorStatusSql,
  resolveOrganizationAdministratorIdentity,
  recordAdministratorSecurityEvent,
  getOrganizationLicenseTrusted,
  listOrganizationsTrusted,
  getLicensePlan,
  assignOrganizationLicenseTrusted,
  changeOrganizationLicensePlanTrusted,
  modifyOrganizationCommercialTermsTrusted,
  renewOrganizationLicenseTrusted,
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
import { orchestrateProvision } from './auth/provisioning.js';

if (!getApps().length) initializeApp();

const firebaseWebApiKey = defineString('OMNIRETAIL_WEB_API_KEY');
const enforceAppCheck = process.env.AUTH_ENFORCE_APP_CHECK === 'true';
const rateLimiter = new LoginRateLimiter();

const callableOptions = {
  region: 'asia-south1',
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
  if (!toAuthorizedUser(record).capabilities.includes(capability)) {
    throw genericAuthenticationError();
  }
}

function requireVerifiedFirebaseIdentity(
  auth: { uid: string; token: Record<string, unknown> } | undefined
): string {
  if (!auth || auth.token.email_verified !== true) throw genericAuthenticationError();
  return auth.uid;
}

async function sendManagedPasswordEmail(email: string, requestType: 'PASSWORD_RESET'): Promise<void> {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(firebaseWebApiKey.value())}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ requestType, email })
  });
  if (!response.ok) throw new Error('email delivery failed');
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
    if (!authorizedUser.capabilities.includes('overview.read')) throw genericAuthenticationError();
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
  let createdUid: string | undefined;
  let idempotencyKey = '';
  try {
    const firebaseUid = requireVerifiedFirebaseIdentity(request.auth);
    const caller = await loadAuthorization(firebaseUid);
    requireCapability(caller, 'organization_admins.create');
    const organizationId = typeof request.data?.organizationId === 'string' ? request.data.organizationId : '';
    const displayName = typeof request.data?.displayName === 'string' ? request.data.displayName.trim() : '';
    const username = normalizeUsername(request.data?.username);
    const email = typeof request.data?.email === 'string' ? request.data.email.trim().toLowerCase() : '';
    const phone = typeof request.data?.phone === 'string' ? request.data.phone.trim() : '';
    idempotencyKey = typeof request.data?.idempotencyKey === 'string' ? request.data.idempotencyKey.trim() : '';
    if (!organizationId || !displayName || !username || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !phone) throw new Error('invalid input');
    if (!/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) throw new Error('invalid idempotency key');
    if (!(await getOrganization({ id: organizationId })).data.organization) throw new Error('organization not found');
    if ((await resolveUsernameLogin({ username })).data.appUsers.length) throw new Error('username already in use');
    try { await getAuth().getUserByEmail(email); throw new Error('email already in use'); } catch (error: any) { if (error?.message === 'email already in use') throw error; if (error?.code !== 'auth/user-not-found') throw error; }
    const orchestrated = await orchestrateProvision({ organizationId, username, email, displayName, phone, idempotencyKey }, {
      idempotency: {
        async get(key) { const r = (await getLifecycleIdempotency({ idempotencyKey: key })).data.lifecycleIdempotency; return r ? { ...r, result: r.resultReference ? JSON.parse(r.resultReference) : undefined } : null; },
        async claim(r) { await claimLifecycleIdempotency({ idempotencyKey: r.key, operationType: 'provisionOrganizationAdministrator', requestFingerprint: r.requestFingerprint }); },
        async complete(key, status, result) { await completeLifecycleIdempotency({ idempotencyKey: key, status: status as ProvisioningAttemptStatus, resultReference: result ? JSON.stringify(result) : undefined }); },
      },
      auth: { async create() { const temporaryPassword = randomBytes(32).toString('base64url'); const created = await getAuth().createUser({ email, displayName, phoneNumber: phone, password: temporaryPassword, emailVerified: false, disabled: false }); createdUid = created.uid; return { uid: created.uid }; }, async compensate(uid) { await getAuth().deleteUser(uid); } },
      sql: { async provision(data) { const appUserId = randomUUID(); await provisionOrganizationAdministratorSql({ userId: appUserId, firebaseUid: data.firebaseUid, username, email, displayName, phone, organizationId, roleId: '00000000-0000-4000-8000-000000000002', auditId: randomUUID(), requestId: randomUUID() }); return { appUserId, organizationMembershipId: `${organizationId}:${appUserId}` }; } },
      reconcile: { async record(data) { await recordProvisioningReconciliation(data); } },
    });
    let onboardingStatus: 'sent' | 'delivery_failed' = 'sent';
    try {
      await sendManagedPasswordEmail(email, 'PASSWORD_RESET');
      await recordAdministratorSecurityEvent({ auditId: randomUUID(), actorFirebaseUid: firebaseUid, action: 'organization_administrator.onboarding_email_sent', targetId: orchestrated.appUserId, organizationId, requestId: randomUUID() });
    } catch { onboardingStatus = 'delivery_failed'; }
    return { ...orchestrated, onboardingStatus };
    const requestFingerprint = createHash('sha256').update(`${organizationId}|${username}|${email}`).digest('hex');
    const prior: any = (await getLifecycleIdempotency({ idempotencyKey })).data.lifecycleIdempotency;
    if (prior) {
      if (prior.requestFingerprint !== requestFingerprint) throw new Error('idempotency key conflict');
      if (prior.status === 'SUCCEEDED' && prior.resultReference) return JSON.parse(prior.resultReference);
      if (prior.status === 'IN_PROGRESS') throw new Error('provisioning already in progress');
    } else await claimLifecycleIdempotency({ idempotencyKey, operationType: 'provisionOrganizationAdministrator', requestFingerprint });
    const org = await getOrganization({ id: organizationId });
    if (!org.data.organization) throw new Error('organization not found');
    const existingUsername = await resolveUsernameLogin({ username });
    if (existingUsername.data.appUsers.length) throw new Error('username already in use');
    const auth = getAuth();
    let authUser;
    try { authUser = await auth.getUserByEmail(email); } catch (error: any) { if (error?.code !== 'auth/user-not-found') throw error; }
    if (authUser) throw new Error('email already in use');
    const temporaryPassword = randomBytes(32).toString('base64url');
    authUser = await auth.createUser({ email, displayName, phoneNumber: phone, password: temporaryPassword, emailVerified: false, disabled: false });
    createdUid = authUser.uid;
    const userId = randomUUID();
    await provisionOrganizationAdministratorSql({ userId, firebaseUid: authUser.uid, username, email, displayName, phone, organizationId, roleId: '00000000-0000-4000-8000-000000000002', auditId: randomUUID(), requestId: randomUUID() });
    const result = { id: userId, organizationId, name: displayName, username, email, phone, status: 'active', createdAt: new Date().toISOString().slice(0, 10), lastLoginAt: null };
    await completeLifecycleIdempotency({ idempotencyKey, status: ProvisioningAttemptStatus.SUCCEEDED, resultReference: JSON.stringify(result) });
    return result;
  } catch (error) {
    const orphanUid = createdUid;
    if (orphanUid) await getAuth().deleteUser(orphanUid).catch(async () => { await getAuth().updateUser(orphanUid, { disabled: true }); if (idempotencyKey) await recordProvisioningReconciliation({ idempotencyKey, firebaseUid: orphanUid, errorClass: 'auth_compensation_failed' }); });
    if (idempotencyKey) await completeLifecycleIdempotency({ idempotencyKey, status: ProvisioningAttemptStatus.FAILED_RETRYABLE }).catch(() => undefined);
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
    return { success: true };
  } catch { throw new HttpsError('permission-denied', 'Unable to change administrator status.'); }
});

export const assignOrganizationLicense = onCall(callableOptions, async (request) => {
  try {
    const callerUid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(callerUid); requireCapability(caller, 'licenses.assign');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const planId = typeof d.planId === 'string' ? d.planId : '';
    const startDate = typeof d.startDate === 'string' ? d.startDate : ''; const expiryDate = typeof d.expiryDate === 'string' ? d.expiryDate : ''; const negotiatedPrice = Number(d.negotiatedPrice); const currency = typeof d.currency === 'string' ? d.currency.trim() : '';
    if (!organizationId || !planId || !/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(expiryDate) || new Date(expiryDate) <= new Date(startDate) || !Number.isFinite(negotiatedPrice) || negotiatedPrice < 0 || !currency) throw new Error('invalid input');
    if (!(await getOrganization({ id: organizationId })).data.organization) throw new Error('organization');
    if ((await getOrganizationLicenseTrusted({ organizationId })).data.organizationLicenses.length) throw new Error('already assigned');
    const plan = (await getLicensePlan({ id: planId })).data.licensePlan; if (!plan || plan.status !== 'ACTIVE') throw new Error('plan');
    const idempotencyKey = typeof d.idempotencyKey === 'string' ? d.idempotencyKey : ''; if (!idempotencyKey) throw new Error('idempotency');
    const fp = createHash('sha256').update(`${organizationId}|${planId}|${startDate}|${expiryDate}|${negotiatedPrice}|${currency}`).digest('hex');
    const prior: any = (await getLifecycleIdempotency({ idempotencyKey })).data.lifecycleIdempotency; if (prior) { if (prior.requestFingerprint !== fp) throw new Error('conflict'); if (prior.status === 'SUCCEEDED' && prior.resultReference) return JSON.parse(prior.resultReference); throw new Error('in progress'); }
    await claimLifecycleIdempotency({ idempotencyKey, operationType: 'assignOrganizationLicense', requestFingerprint: fp });
    const licenseId = randomUUID(); const safe = { licenseId, organizationId, planId, startDate, expiryDate, negotiatedPrice, currency };
    await assignOrganizationLicenseTrusted({ id: licenseId, organizationId, planId, startDate, expiryDate, negotiatedPrice, currency, historyId: randomUUID(), planCode: plan.planCode, planName: plan.name, planLevel: plan.level, maxStores: plan.maxStores, maxUsers: plan.maxUsers, auditId: randomUUID(), actorFirebaseUid: callerUid, requestId: randomUUID() });
    await completeLifecycleIdempotency({ idempotencyKey, status: ProvisioningAttemptStatus.SUCCEEDED, resultReference: JSON.stringify(safe) }); return safe;
  } catch { throw new HttpsError('permission-denied', 'Unable to assign the organization license.'); }
});

export const changeOrganizationLicensePlan = onCall(callableOptions, async (request) => {
  try {
    const callerUid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(callerUid); requireCapability(caller, 'licenses.change_plan');
    const d = request.data ?? {}; const organizationId = typeof d.organizationId === 'string' ? d.organizationId : ''; const targetPlanId = typeof d.targetPlanId === 'string' ? d.targetPlanId : ''; const negotiatedPrice = Number(d.negotiatedPrice); const currency = typeof d.currency === 'string' ? d.currency.trim() : '';
    if (!organizationId || !targetPlanId || !Number.isFinite(negotiatedPrice) || negotiatedPrice < 0 || !currency) throw new Error('invalid input');
    const current = (await getOrganizationLicenseTrusted({ organizationId })).data.organizationLicenses[0]; if (!current) throw new Error('license');
    const currentPlan = (await getLicensePlan({ id: current.plan.id })).data.licensePlan; const target = (await getLicensePlan({ id: targetPlanId })).data.licensePlan;
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
    const plan = (await getLicensePlan({ id: current.plan.id })).data.licensePlan; if (!plan) throw new Error('plan');
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
    const currentPlan = (await getLicensePlan({ id: current.plan.id })).data.licensePlan; const plan = (await getLicensePlan({ id: planId })).data.licensePlan; if (!currentPlan || !plan || plan.status !== 'ACTIVE' || plan.level < currentPlan.level) throw new Error('plan');
    const idempotencyKey = typeof d.idempotencyKey === 'string' ? d.idempotencyKey : ''; if (!idempotencyKey) throw new Error('idempotency'); const fp = createHash('sha256').update(`${organizationId}|${planId}|${newStartDate}|${newExpiryDate}|${negotiatedPrice}|${currency}`).digest('hex'); const prior: any = (await getLifecycleIdempotency({ idempotencyKey })).data.lifecycleIdempotency; if (prior) { if (prior.requestFingerprint !== fp) throw new Error('conflict'); if (prior.status === 'SUCCEEDED' && prior.resultReference) return JSON.parse(prior.resultReference); throw new Error('in progress'); }
    await claimLifecycleIdempotency({ idempotencyKey, operationType: 'renewOrganizationLicense', requestFingerprint: fp }); const safe = { licenseId: current.id, organizationId, planId: plan.id, startDate: newStartDate, expiryDate: newExpiryDate, negotiatedPrice, currency };
    await renewOrganizationLicenseTrusted({ id: current.id, organizationId, planId: plan.id, startDate: newStartDate, expiryDate: newExpiryDate, negotiatedPrice, currency, historyId: randomUUID(), planCode: plan.planCode, planName: plan.name, planLevel: plan.level, maxStores: plan.maxStores, maxUsers: plan.maxUsers, auditId: randomUUID(), actorFirebaseUid: callerUid, requestId: randomUUID(), changes: { previousStartDate: current.startDate, previousExpiryDate: current.expiryDate, previousPlanId: current.plan.id } }); await completeLifecycleIdempotency({ idempotencyKey, status: ProvisioningAttemptStatus.SUCCEEDED, resultReference: JSON.stringify(safe) }); return safe;
  } catch { throw new HttpsError('permission-denied', 'Unable to renew the organization license.'); }
});

export const listOrganizationsDirectory = onCall(callableOptions, async (request) => {
  try {
    const uid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(uid); requireCapability(caller, 'organizations.read');
    const organizations = (await listOrganizationsTrusted()).data.organizations;
    const rows = await Promise.all(organizations.map(async (o: any) => { const l = (await getOrganizationLicenseTrusted({ organizationId: o.id })).data.organizationLicenses[0]; let licenseStatus = 'not_assigned'; if (l) { const now = Date.now(); const start = new Date(l.startDate).getTime(); const expiry = new Date(l.expiryDate).getTime(); const days = (expiry - now) / 86400000; licenseStatus = now < start ? 'not_yet_active' : now > expiry ? 'expired' : days <= 30 ? 'expiring_soon' : 'active'; } return { id: o.id, organizationCode: o.organizationCode, businessName: o.businessName, primaryContactName: o.primaryContactName, email: o.email, phone: o.phone, status: o.status, createdAt: o.createdAt, licenseId: l?.id ?? null, planId: l?.plan?.id ?? null, planName: l?.plan?.name ?? null, licenseStartDate: l?.startDate ?? null, licenseExpiryDate: l?.expiryDate ?? null, licenseStatus }; }));
    return { organizations: rows };
  } catch { throw new HttpsError('permission-denied', 'Unable to load organizations.'); }
});

export const getMasterAdminOverview = onCall(callableOptions, async (request) => {
  try {
    const uid = requireVerifiedFirebaseIdentity(request.auth); const caller = await loadAuthorization(uid); requireCapability(caller, 'overview.read');
    const orgs = (await listOrganizationsTrusted()).data.organizations as any[]; const rows = await Promise.all(orgs.map(async o => { const l = (await getOrganizationLicenseTrusted({ organizationId: o.id })).data.organizationLicenses[0]; let status = 'not_assigned'; if (l) { const now = Date.now(); const start = new Date(l.startDate).getTime(); const expiry = new Date(l.expiryDate).getTime(); const days = (expiry-now)/86400000; status = now < start ? 'not_yet_active' : now > expiry ? 'expired' : days <= 30 ? 'expiring_soon' : 'active'; } return { ...o, license: l ?? null, licenseStatus: status }; }));
    const expiring = rows.filter(r => r.licenseStatus === 'expiring_soon'); const mapOrg = (r: any) => ({ id: r.id, organizationCode: r.organizationCode, name: r.businessName, legalEntityName: r.legalEntityName ?? '', taxId: r.taxId ?? '', primaryAdmin: undefined, licensePlan: r.license?.plan?.name ?? 'Unassigned', licenseStatus: r.licenseStatus, licenseExpiryDate: r.license?.expiryDate ?? '—', status: String(r.status).toLowerCase(), createdDate: String(r.createdAt).slice(0,10), contactInfo: { primaryContactName: r.primaryContactName, email: r.email, phone: r.phone }, timezone: r.timezone, currency: r.currency });
    return { metrics: { totalOrganizations: rows.length, activeOrganizations: rows.filter(r=>r.status==='ACTIVE').length, suspendedOrganizations: rows.filter(r=>r.status==='SUSPENDED').length, licensesExpiringSoon: expiring.length }, recentlyAddedOrganizations: rows.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()).slice(0,4).map(mapOrg), expiringLicenses: expiring.map(r=>({ license: { id:r.license.id, organizationId:r.id, planId:r.license.plan.id, startDate:r.license.startDate, expiryDate:r.license.expiryDate, negotiatedPrice:r.license.negotiatedPrice, currency:r.license.currency, createdAt:r.license.createdAt, updatedAt:r.license.updatedAt }, organization: mapOrg(r), plan: r.license.plan, daysRemaining: Math.ceil((new Date(r.license.expiryDate).getTime()-Date.now())/86400000), formattedExpiryDate: r.license.expiryDate })), totalOrganizationsCount: rows.length };
  } catch { throw new HttpsError('permission-denied', 'Unable to load the overview.'); }
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
  try { const t = await authorizeTarget(request, 'organization_admins.reset_password'); if (t.identity.user.status !== AppUserStatus.ACTIVE) throw new Error('inactive target'); const auth = getAuth(); await auth.revokeRefreshTokens(t.identity.user.firebaseUid); await sendManagedPasswordEmail(t.identity.user.email, 'PASSWORD_RESET'); await recordAdministratorSecurityEvent({ auditId: randomUUID(), actorFirebaseUid: t.callerUid, action: 'organization_administrator.password_reset_initiated', targetId: t.appUserId, organizationId: t.organizationId, requestId: randomUUID() }); return { success: true }; }
  catch { throw new HttpsError('permission-denied', 'Unable to reset the administrator password.'); }
});
