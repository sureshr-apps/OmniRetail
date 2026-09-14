// @vitest-environment jsdom
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  user: {
    id: 'user-1', firebaseUid: 'firebase-1', name: 'Employee', displayName: 'Employee',
    email: 'employee@example.com', username: 'employee', phone: null, roles: [], capabilities: [], organizationIds: ['org-1'],
  },
  updateProfile: vi.fn(),
  changePassword: vi.fn().mockResolvedValue(undefined),
  hasCapability: vi.fn(() => false),
}));

vi.mock('@/app/context/AuthContext', () => ({ useAuth: () => state }));

import { ProfilePage } from '@/features/profile/pages/ProfilePage';

afterEach(() => {
  cleanup();
  state.changePassword.mockClear();
});

describe('ProfilePage', () => {
  it('shows password change to users without platform profile capabilities', async () => {
    render(<ProfilePage />);

    fireEvent.change(screen.getByLabelText('Current password'), { target: { value: 'old-password' } });
    fireEvent.change(screen.getByLabelText('New password'), { target: { value: 'new-password' } });
    fireEvent.change(screen.getByLabelText('Confirm new password'), { target: { value: 'new-password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Change password' }));

    await waitFor(() => expect(state.changePassword).toHaveBeenCalledWith({
      currentPassword: 'old-password',
      newPassword: 'new-password',
    }));
    expect(screen.getByText('Password changed successfully.')).toBeInTheDocument();
  });
});
