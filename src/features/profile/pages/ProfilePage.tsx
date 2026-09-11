import React, { useEffect, useState } from 'react';
import { KeyRound, Save, UserRound } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Label } from '@/shared/components/Label';

type Notice = { kind: 'success' | 'error'; message: string } | null;

export function ProfilePage() {
  const { user, updateProfile, changePassword, hasCapability } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [profileNotice, setProfileNotice] = useState<Notice>(null);
  const [passwordNotice, setPasswordNotice] = useState<Notice>(null);

  useEffect(() => {
    setDisplayName(user?.displayName ?? '');
    setPhone(user?.phone ?? '');
  }, [user?.displayName, user?.phone]);

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setProfileNotice(null);
    setProfileSaving(true);
    try {
      await updateProfile({ displayName, phone });
      setProfileNotice({ kind: 'success', message: 'Profile updated.' });
    } catch (error) {
      setProfileNotice({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Unable to update the profile.',
      });
    } finally {
      setProfileSaving(false);
    }
  };

  const savePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordNotice(null);
    if (newPassword.length < 8) {
      setPasswordNotice({ kind: 'error', message: 'New password must contain at least 8 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordNotice({ kind: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    setPasswordSaving(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordNotice({ kind: 'success', message: 'Password changed successfully.' });
    } catch (error) {
      setPasswordNotice({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Unable to change password.',
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  const noticeClass = (kind: 'success' | 'error') => kind === 'success'
    ? 'bg-green-50 text-green-800 border-green-200'
    : 'bg-critical-bg text-critical-text border-red-200';

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">Profile</h1>
        <p className="text-sm text-text-secondary mt-1">Manage your supported account details and password.</p>
      </div>

      <form onSubmit={saveProfile} className="bg-surface-elevated p-6 rounded-lg border border-border-subdued shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <UserRound className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-text-primary">Account details</h2>
        </div>
        {profileNotice && <div className={`text-sm p-3 rounded border ${noticeClass(profileNotice.kind)}`}>{profileNotice.message}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="profile-display-name">Display name</Label>
            <Input id="profile-display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={120} required disabled={!hasCapability('profile.update')} />
          </div>
          <div>
            <Label htmlFor="profile-phone">Phone</Label>
            <Input id="profile-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={32} disabled={!hasCapability('profile.update')} />
          </div>
          <div>
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" value={user?.email ?? ''} disabled />
          </div>
          <div>
            <Label htmlFor="profile-username">Username</Label>
            <Input id="profile-username" value={user?.username ?? ''} disabled />
          </div>
        </div>
        {hasCapability('profile.update') && <Button type="submit" isLoading={profileSaving} className="gap-2"><Save className="w-4 h-4" />Save profile</Button>}
      </form>

      {hasCapability('profile.change_password') && (
        <form id="change-password" onSubmit={savePassword} className="bg-surface-elevated p-6 rounded-lg border border-border-subdued shadow-sm space-y-5 scroll-mt-6">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-text-primary">Change password</h2>
          </div>
          {passwordNotice && <div className={`text-sm p-3 rounded border ${noticeClass(passwordNotice.kind)}`}>{passwordNotice.message}</div>}
          <div className="space-y-4 max-w-md">
            <div><Label htmlFor="current-password">Current password</Label><Input id="current-password" type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required /></div>
            <div><Label htmlFor="new-password">New password</Label><Input id="new-password" type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required /></div>
            <div><Label htmlFor="confirm-password">Confirm new password</Label><Input id="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></div>
          </div>
          <Button type="submit" isLoading={passwordSaving}>Change password</Button>
        </form>
      )}
    </div>
  );
}
