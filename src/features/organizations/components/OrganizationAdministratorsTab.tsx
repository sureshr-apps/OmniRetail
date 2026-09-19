import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  KeyRound,
  Edit2,
  CheckCircle2,
  UserX,
  UserCheck,
  RotateCcw,
  Shield,
  X,
} from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Badge } from '@/shared/components/Badge';
import { EmptyState } from '@/shared/components/EmptyState';
import { OrganizationAdministrator, Organization } from '../types';
import { AddAdminModal } from './AddAdminModal';
import { EditAdminModal } from './EditAdminModal';
import { ChangeAdminStatusModal } from './ChangeAdminStatusModal';
import { ResetAdminPasswordModal } from './ResetAdminPasswordModal';
import { upsertById } from '@/shared/utils/listState';

export interface OrganizationAdministratorsTabProps {
  organization: Organization;
  admins: OrganizationAdministrator[];
  onAdminsChange: (admins: OrganizationAdministrator[]) => void;
}

export function OrganizationAdministratorsTab({
  organization,
  admins,
  onAdminsChange,
}: OrganizationAdministratorsTabProps) {
  const [search, setSearch] = useState('');

  // Notification Banner
  const [feedback, setFeedback] = useState<{ message: string; type?: 'success' | 'info' } | null>(
    null
  );

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<OrganizationAdministrator | null>(null);
  const [statusTargetAdmin, setStatusTargetAdmin] = useState<{
    admin: OrganizationAdministrator;
    targetStatus: 'active' | 'inactive';
  } | null>(null);
  const [resetTargetAdmin, setResetTargetAdmin] = useState<OrganizationAdministrator | null>(null);

  // Filtered administrators
  const filteredAdmins = admins.filter((a) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      a.name.toLowerCase().includes(term) ||
      a.username.toLowerCase().includes(term) ||
      a.email.toLowerCase().includes(term) ||
      a.phone.toLowerCase().includes(term)
    );
  });

  const handleAdminCreated = (newAdmin: OrganizationAdministrator) => {
    setFeedback({
      message: `Administrator "${newAdmin.name}" (@${newAdmin.username}) created successfully.`,
      type: 'success',
    });
    onAdminsChange(upsertById(admins, newAdmin));
  };

  const handleAdminUpdated = (updatedAdmin: OrganizationAdministrator) => {
    setFeedback({
      message: `Administrator profile for "${updatedAdmin.name}" updated successfully.`,
      type: 'success',
    });
    onAdminsChange(upsertById(admins, updatedAdmin));
  };

  const handleAdminStatusChanged = (updatedAdmin: OrganizationAdministrator) => {
    onAdminsChange(upsertById(admins, updatedAdmin));
    setFeedback({
      message: `Administrator "${updatedAdmin.name}" has been ${
        updatedAdmin.status === 'active' ? 'activated' : 'deactivated'
      }.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Action & Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-surface-elevated p-3.5 rounded-lg border border-border-subdued shadow-xs">
        <div>
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <span>Tenant Administrators</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-surface-subdued text-text-muted border border-border-structural">
              {admins.length} registered
            </span>
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Personnel authorized to manage store operations, catalog configurations, and registers for{' '}
            <span className="font-semibold text-text-primary">{organization.name}</span>
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          className="gap-1.5 self-start sm:self-auto text-xs shrink-0"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Add Administrator</span>
        </Button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-3 rounded-lg flex items-center justify-between shadow-xs transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search Input Filter */}
      {admins.length > 0 && (
        <div className="w-full sm:w-80">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search administrators by name, username, email..."
            icon={<Search className="w-3.5 h-3.5" />}
            className="h-8 text-xs"
          />
        </div>
      )}

      {/* Main Table / Container */}
      <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xs overflow-hidden">
        {/* Data Table */}
        {filteredAdmins.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="h-8 bg-surface-subdued border-b border-border-subdued text-[10px] uppercase font-bold text-text-muted tracking-wider select-none">
                  <th className="px-4 py-2">Administrator</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2 hidden sm:table-cell">Contact Details</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 hidden md:table-cell">Created Date</th>
                  <th className="px-4 py-2 hidden lg:table-cell">Last Login</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subdued text-xs text-text-primary">
                {filteredAdmins.map((admin) => {
                  const initials = admin.name
                    .split(' ')
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

                  return (
                    <tr
                      key={admin.id}
                      className="hover:bg-row-hover transition-colors group"
                    >
                      {/* Administrator Name + Initials */}
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 border border-primary/20">
                            {initials}
                          </div>
                          <div>
                            <div className="font-semibold text-text-primary">{admin.name}</div>
                            <div className="text-[10px] font-mono text-text-muted">@{admin.username}</div>
                          </div>
                        </div>
                      </td>

                      {/* Username */}
                      <td className="px-4 py-2.5">
                        <span className="font-mono text-xs font-semibold text-text-secondary bg-surface-subdued px-1.5 py-0.5 rounded border border-border-structural/70">
                          @{admin.username}
                        </span>
                      </td>

                      {/* Email & Phone */}
                      <td className="px-4 py-2.5 hidden sm:table-cell">
                        <div className="min-w-0">
                          <div className="text-text-primary font-medium">{admin.email}</div>
                          <div className="text-[11px] text-text-muted">{admin.phone}</div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-2.5">
                        {admin.status === 'active' ? (
                          <Badge variant="success" withDot>
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="neutral" withDot>
                            Inactive
                          </Badge>
                        )}
                      </td>

                      {/* Created Date */}
                      <td className="px-4 py-2.5 hidden md:table-cell text-text-secondary font-mono text-[11px]">
                        {admin.createdAt}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2.5 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => setEditingAdmin(admin)}
                            className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-subdued rounded transition-colors"
                            title="Edit Administrator"
                            aria-label={`Edit ${admin.name}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Reset Password Button */}
                          <button
                            type="button"
                            onClick={() => setResetTargetAdmin(admin)}
                            className="p-1 text-text-muted hover:text-primary hover:bg-primary/5 rounded transition-colors"
                            title="Reset Password"
                            aria-label={`Reset password for ${admin.name}`}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>

                          {/* Activate / Deactivate Button */}
                          {admin.status === 'active' ? (
                            <button
                              type="button"
                              onClick={() =>
                                setStatusTargetAdmin({
                                  admin,
                                  targetStatus: 'inactive',
                                })
                              }
                              className="p-1 text-text-muted hover:text-critical hover:bg-critical/5 rounded transition-colors"
                              title="Deactivate Administrator"
                              aria-label={`Deactivate ${admin.name}`}
                            >
                              <UserX className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                setStatusTargetAdmin({
                                  admin,
                                  targetStatus: 'active',
                                })
                              }
                              className="p-1 text-text-muted hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                              title="Activate Administrator"
                              aria-label={`Activate ${admin.name}`}
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {filteredAdmins.length === 0 && (
          <div className="p-8">
            {search.trim() ? (
              <EmptyState
                icon={Search}
                title="No administrators matched search"
                description={`No administrators matched "${search}". Try searching with another name or username.`}
                actionLabel="Clear Search"
                onAction={() => setSearch('')}
              />
            ) : (
              <EmptyState
                icon={Users}
                title="No administrators provisioned"
                description={`There are currently no administrators assigned to ${organization.name}. Add an administrator to enable store management logins.`}
                actionLabel="+ Add First Administrator"
                onAction={() => setIsAddModalOpen(true)}
              />
            )}
          </div>
        )}
      </div>

      {/* Add Administrator Modal */}
      <AddAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        organizationId={organization.id}
        organizationName={organization.name}
        onSuccess={handleAdminCreated}
      />

      {/* Edit Administrator Modal */}
      {editingAdmin && (
        <EditAdminModal
          isOpen={!!editingAdmin}
          onClose={() => setEditingAdmin(null)}
          organizationId={organization.id}
          admin={editingAdmin}
          onSuccess={handleAdminUpdated}
        />
      )}

      {/* Change Status (Deactivate / Activate) Confirmation Modal */}
      {statusTargetAdmin && (
        <ChangeAdminStatusModal
          isOpen={!!statusTargetAdmin}
          onClose={() => setStatusTargetAdmin(null)}
          organizationId={organization.id}
          organizationName={organization.name}
          admin={statusTargetAdmin.admin}
          targetStatus={statusTargetAdmin.targetStatus}
          onSuccess={handleAdminStatusChanged}
        />
      )}

      {/* Reset Password Modal */}
      {resetTargetAdmin && (
        <ResetAdminPasswordModal
          isOpen={!!resetTargetAdmin}
          onClose={() => setResetTargetAdmin(null)}
          organizationId={organization.id}
          organizationName={organization.name}
          admin={resetTargetAdmin}
        />
      )}
    </div>
  );
}
