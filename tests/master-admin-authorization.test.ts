import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const connector = readFileSync(
  new URL('../dataconnect/master-admin/identity.gql', import.meta.url),
  'utf8',
);

function operation(name: string): string {
  const match = connector.match(
    new RegExp(`(?:query|mutation) ${name}\\b[\\s\\S]*?(?=\\n(?:query|mutation) \\w|$)`),
  );
  expect(match, `${name} should exist`).not.toBeNull();
  return match?.[0] ?? '';
}

describe('master-admin connector authorization', () => {
  it.each([
    ['ListLicensePlans', 'plans.read'],
    ['GetLicensePlan', 'plans.read'],
    ['CreateLicensePlan', 'plans.create'],
    ['UpdateLicensePlan', 'plans.update'],
    ['ChangeLicensePlanStatus', 'plans.change_status'],
    ['DeleteLicensePlan', 'plans.change_status'],
  ])('requires %s callers to hold %s', (operationName, capability) => {
    const source = operation(operationName);

    expect(source).toContain('status: { eq: ACTIVE }');
    expect(source).toContain(`rp.permission.code == '${capability}'`);
  });

  it('prevents direct plan deletion while the plan is referenced', () => {
    const source = operation('DeleteLicensePlan');

    expect(source).toContain('organizationLicenses(where: { plan: { id: { eq: $id } } }');
    expect(source).toContain('licenseHistories(where: { plan: { id: { eq: $id } } }');
    expect(source.match(/this\.size\(\) == 0/g)).toHaveLength(2);
  });
});
