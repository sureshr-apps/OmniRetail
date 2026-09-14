import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8');

describe('requested shell cleanup', () => {
  it('removes support, notification, and tenant status decorations', () => {
    const header = read('shared/layout/Header.tsx');
    const tenantSidebar = read('shared/layout/TenantSidebar.tsx');

    expect(header).not.toContain('Docs & Support');
    expect(header).not.toContain('Bell');
    expect(tenantSidebar).not.toContain('Retail Operations');
    expect(tenantSidebar).not.toContain('Live');
  });

  it('removes the sample cart action from Billing/POS', () => {
    const orderItemsTable = read('features/billing/components/OrderItemsTable.tsx');
    const billingPage = read('features/billing/pages/BillingPage.tsx');

    expect(orderItemsTable).not.toContain('Load Sample Cart');
    expect(orderItemsTable).not.toContain('onQuickAddFirstItem');
    expect(billingPage).not.toContain('onQuickAddFirstItem');
  });

  it('allows password audit recording without a role-specific capability', () => {
    const functions = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');
    const start = functions.indexOf('export const recordPasswordChange');
    const end = functions.indexOf('export const provisionOrganizationAdministrator', start);
    const handler = functions.slice(start, end);

    expect(handler).not.toContain("requireCapability(record, 'profile.change_password')");
  });

  it('does not present unsupported Service Person date fields', () => {
    const modal = read('features/service-persons/components/ServicePersonModal.tsx');
    const drawer = read('features/service-persons/components/ServicePersonDetailDrawer.tsx');

    expect(modal).not.toContain('Date of Joining');
    expect(modal).not.toContain('dateOfJoining');
    expect(drawer).not.toContain('dateOfJoining');
  });

  it('does not present the removed Service Person skills field', () => {
    const modal = read('features/service-persons/components/ServicePersonModal.tsx');
    const drawer = read('features/service-persons/components/ServicePersonDetailDrawer.tsx');

    expect(modal).not.toContain('Skills &amp; Certifications');
    expect(modal).not.toContain('skillsString');
    expect(drawer).not.toContain('Skills &amp; Certifications');
    expect(drawer).not.toContain('person.skills');
  });
});
