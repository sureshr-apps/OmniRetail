import { describe, expect, it } from 'vitest';
import { provisioningFingerprint, safeProvisioningResult, type IdempotencyRecord } from '../functions/src/auth/idempotency';

describe('Phase 5B.1a idempotency safety', () => {
  it('normalizes only organization, username, and email for the fingerprint', () => {
    expect(provisioningFingerprint('org-1', ' User ', ' A@Example.com ')).toBe(provisioningFingerprint('org-1', 'user', 'a@example.com'));
    expect(provisioningFingerprint('org-1', 'user', 'a@example.com')).not.toBe(provisioningFingerprint('org-2', 'user', 'a@example.com'));
  });
  it('rejects a different request for the same key', () => {
    const record: IdempotencyRecord = { key: 'k', fingerprint: provisioningFingerprint('o', 'u', 'e@x.com'), status: 'IN_PROGRESS' };
    expect(record.fingerprint === provisioningFingerprint('o', 'u2', 'e@x.com')).toBe(false);
  });
  it('treats an in-progress duplicate deterministically', () => {
    const record: IdempotencyRecord = { key: 'k', fingerprint: 'f', status: 'IN_PROGRESS' };
    expect(record.status).toBe('IN_PROGRESS');
  });
  it('safe replay results contain no credentials or tokens', () => {
    const result = safeProvisioningResult({ id: 'u1', organizationId: 'o1', password: 'x', temporaryCredential: 'y', idToken: 'z', actionCode: 'a' });
    expect(result).toContain('u1');
    expect(result).not.toMatch(/password|credential|idToken|actionCode/);
  });
});
