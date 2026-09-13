// @vitest-environment jsdom
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const state = vi.hoisted(() => ({
  user: null as any,
  isLoading: false,
  hasCapability: vi.fn(),
}));

vi.mock('@/app/context/AuthContext', () => ({ useAuth: () => state }));

import { CapabilityRoute } from '@/app/routes/CapabilityRoute';
import { PublicRoute } from '@/app/routes/PublicRoute';

afterEach(() => {
  cleanup();
  state.user = null;
  state.hasCapability.mockReset();
});

const organizationAdmin = {
  id: 'user-1', firebaseUid: 'firebase-1', name: 'Org Admin', displayName: 'Org Admin',
  email: 'admin@example.com', username: 'admin', phone: null,
  roles: [{ code: 'organization.admin', name: 'Organization Administrator', scope: 'ORGANIZATION' }],
  capabilities: [], organizationIds: ['org-1'],
};

describe('role-aware routing', () => {
  it('sends an authenticated organization admin to the tenant workspace from login', () => {
    state.user = organizationAdmin;
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route element={<PublicRoute />}><Route path="/login" element={<div>Login</div>} /></Route>
          <Route path="/billing" element={<div>Billing workspace</div>} />
          <Route path="/overview" element={<div>Platform overview</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Billing workspace')).toBeInTheDocument();
    expect(screen.queryByText('Platform overview')).not.toBeInTheDocument();
  });

  it('sends an organization admin away from a platform route when it lacks platform capability', () => {
    state.user = organizationAdmin;
    state.hasCapability.mockReturnValue(false);
    render(
      <MemoryRouter initialEntries={['/overview']}>
        <Routes>
          <Route element={<CapabilityRoute capability="overview.read" />}><Route path="/overview" element={<div>Platform overview</div>} /></Route>
          <Route path="/billing" element={<div>Billing workspace</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Billing workspace')).toBeInTheDocument();
  });
});
