// @vitest-environment jsdom
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const state = vi.hoisted(() => ({ user: null as any, isLoading: true }));
vi.mock('@/app/context/AuthContext', () => ({ useAuth: () => state }));

import { ProtectedRoute } from '@/app/routes/ProtectedRoute';

afterEach(cleanup);

describe('ProtectedRoute', () => {
  it('does not flash protected content while authorization bootstrap is loading', () => {
    state.isLoading = true;
    state.user = null;
    const view = render(
      <MemoryRouter initialEntries={['/overview']}>
        <Routes>
          <Route element={<ProtectedRoute />}><Route path="/overview" element={<div>Protected overview</div>} /></Route>
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.queryByText('Protected overview')).not.toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();

    state.isLoading = false;
    state.user = { id: 'user-1' };
    view.rerender(
      <MemoryRouter initialEntries={['/overview']}>
        <Routes>
          <Route element={<ProtectedRoute />}><Route path="/overview" element={<div>Protected overview</div>} /></Route>
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Protected overview')).toBeInTheDocument();
  });
});
