import { createHash } from 'node:crypto';

export interface IdempotencyRecord {
  key: string;
  fingerprint: string;
  status: 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED_RETRYABLE';
  resultReference?: string;
}

export function provisioningFingerprint(organizationId: string, username: string, email: string): string {
  return createHash('sha256').update(`${organizationId}|${username.trim().toLowerCase()}|${email.trim().toLowerCase()}`).digest('hex');
}

export function safeProvisioningResult(value: Record<string, unknown>): string {
  const forbidden = /(password|token|actioncode|credential|secret)/i;
  const safe = Object.fromEntries(Object.entries(value).filter(([key]) => !forbidden.test(key)));
  return JSON.stringify(safe);
}
