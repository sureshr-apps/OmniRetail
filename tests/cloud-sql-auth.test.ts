import { describe, expect, it } from 'vitest';
import { cloudSqlIamUserFromServiceAccount } from '../functions/src/cloudSql';

describe('Cloud SQL IAM service-account usernames', () => {
  it('removes the PostgreSQL service-account suffix and normalizes case', () => {
    expect(cloudSqlIamUserFromServiceAccount('Runtime-SA@Example.iam.gserviceaccount.com'))
      .toBe('runtime-sa@example.iam');
  });

  it('keeps the default Compute Engine service-account username valid', () => {
    expect(cloudSqlIamUserFromServiceAccount('1039046217091-compute@developer.gserviceaccount.com'))
      .toBe('1039046217091-compute@developer');
  });

  it('rejects a missing service-account username', () => {
    expect(() => cloudSqlIamUserFromServiceAccount('   ')).toThrow('Cloud SQL service account is not configured.');
  });
});
