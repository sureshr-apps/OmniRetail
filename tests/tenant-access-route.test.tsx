// @vitest-environment jsdom
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const state = vi.hoisted(() => ({ user: null as any, isLoading: false }));
vi.mock('@/app/context/AuthContext', () => ({ useAuth: () => state }));

import { TenantAccessRoute } from '@/app/routes/TenantAccessRoute';

afterEach(() => { cleanup(); state.user = null; });

const user = (roleCode: string, capabilities: string[] = []) => ({
  id: 'user-1', firebaseUid: 'firebase-1', name: 'Test', displayName: 'Test',
  email: 'test@example.com', username: 'test', phone: null,
  roles: [{ code: roleCode, name: roleCode, scope: 'ORGANIZATION' }], capabilities, organizationIds: roleCode === 'organization.admin' ? ['org-1'] : [],
});

describe('TenantAccessRoute', () => {
  it('allows an organization admin into administrative routes', () => {
    state.user = user('organization.admin');
    render(<MemoryRouter initialEntries={['/employees']}><Routes>
      <Route element={<TenantAccessRoute capability="employees.read" administrationOnly />}><Route path="/employees" element={<div>Employees</div>} /></Route>
      <Route path="/overview" element={<div>Overview</div>} />
    </Routes></MemoryRouter>);
    expect(screen.getByText('Employees')).toBeInTheDocument();
  });

  it('denies an employee administrative routes even with an operational capability', () => {
    state.user = user('employee', ['billing.read']);
    render(<MemoryRouter initialEntries={['/employees']}><Routes>
      <Route element={<TenantAccessRoute capability="employees.read" administrationOnly />}><Route path="/employees" element={<div>Employees</div>} /></Route>
      <Route path="/overview" element={<div>Overview</div>} />
    </Routes></MemoryRouter>);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('allows an employee only when the requested operational capability is present', () => {
    state.user = user('employee', ['billing.read']);
    render(<MemoryRouter initialEntries={['/billing']}><Routes>
      <Route element={<TenantAccessRoute capability="billing.read" />}><Route path="/billing" element={<div>Billing</div>} /></Route>
      <Route path="/overview" element={<div>Overview</div>} />
    </Routes></MemoryRouter>);
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });
});
