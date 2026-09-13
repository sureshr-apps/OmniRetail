// @vitest-environment jsdom
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  hasCapability: vi.fn(() => true),
}));

vi.mock('@/app/context/AuthContext', () => ({ useAuth: () => state }));

import { Sidebar } from '@/shared/layout/Sidebar';

afterEach(cleanup);

describe('Sidebar', () => {
  it('does not expose non-operational platform status decorations or the POS shortcut', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('link', { name: /open store pos/i })).not.toBeInTheDocument();
    expect(screen.queryByText('Platform Console')).not.toBeInTheDocument();
    expect(screen.queryByText('Stable')).not.toBeInTheDocument();
    expect(screen.queryByText('Platform Services')).not.toBeInTheDocument();
    expect(screen.queryByText('All Systems Operational')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
  });
});
