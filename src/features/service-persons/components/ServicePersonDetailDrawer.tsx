import React from 'react';
import { ServicePerson } from '../types';
import { formatServicePersonCode } from '../utils/formatServicePersonCode';

interface ServicePersonDetailDrawerProps {
  person: ServicePerson | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (person: ServicePerson) => void;
  onToggleStatus: (person: ServicePerson) => void;
  onDelete: (person: ServicePerson) => void;
}

export function ServicePersonDetailDrawer({
  person,
  isOpen,
  onClose,
  onEdit,
  onToggleStatus,
  onDelete,
}: ServicePersonDetailDrawerProps) {
  if (!isOpen || !person) return null;

  const isInactive = person.status === 'Inactive';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        id="detailsPanel"
        className="fixed inset-y-0 right-0 w-full max-w-lg bg-surface-container-lowest shadow-2xl z-50 flex flex-col border-l border-outline-variant/30 animate-in slide-in-from-right duration-200"
      >
        {/* Panel Header */}
        <div className="h-16 px-space-lg bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-space-sm">
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              badge
            </span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Service Person Profile</h3>
              <span
                className={`font-body-mono-num text-micro-label font-bold ${
                  isInactive ? 'text-on-surface-variant' : 'text-primary'
                }`}
              >
                {formatServicePersonCode(person.servicePersonCode)} · {person.status}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-space-lg space-y-space-2xl">
          {/* Profile Card Summary */}
          <div className="flex items-center gap-space-lg p-space-base rounded-xl bg-surface-container-low border border-outline-variant/20">
            {person.avatarUrl ? (
              <img
                className={`w-16 h-16 rounded-full object-cover ring-2 ring-primary shrink-0 ${
                  isInactive ? 'grayscale' : ''
                }`}
                src={person.avatarUrl}
                alt={person.displayName}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md font-bold shrink-0 ring-2 ring-primary">
                {person.firstName[0]}
                {person.lastName[0]}
              </div>
            )}
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface">{person.displayName}</h4>
              {person.specialization && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-caption bg-secondary-container text-on-secondary-container font-medium mt-1">
                  {person.specialization}
                </span>
              )}
              <div className="font-caption text-caption text-on-surface-variant mt-1">
                {person.assignmentScope === 'Entire Organization'
                  ? 'Organization-wide'
                  : person.outletName || 'Specific Outlet'}
              </div>
            </div>
          </div>

          {/* Contact Info & Specs */}
          <div className="grid grid-cols-2 gap-space-base">
            <div className="p-space-base rounded-xl bg-surface-container-low border border-outline-variant/10">
              <span className="font-micro-label text-micro-label uppercase text-on-surface-variant">Phone</span>
              <div className="font-body-mono-num text-body-medium text-on-surface mt-0.5">{person.phone}</div>
            </div>
            <div className="p-space-base rounded-xl bg-surface-container-low border border-outline-variant/10">
              <span className="font-micro-label text-micro-label uppercase text-on-surface-variant">Email</span>
              <div className="font-body-default text-body-medium text-on-surface mt-0.5 truncate" title={person.email}>
                {person.email}
              </div>
            </div>
          </div>

          {/* Address Information */}
          {(person.address || person.city) && (
            <div className="p-space-base rounded-xl bg-surface-container-low border border-outline-variant/10">
              <span className="font-micro-label text-micro-label uppercase text-on-surface-variant">
                Location &amp; Address
              </span>
              <div className="font-body-default text-body-default text-on-surface mt-1">
                {person.address ? `${person.address}, ` : ''}
                {person.city || 'Austin'} {person.postalCode ? `· ${person.postalCode}` : ''}
              </div>
            </div>
          )}

          {/* Service Notes */}
          {person.notes && (
            <div>
              <h5 className="font-headline-sm text-headline-sm text-on-surface mb-1.5">Service Notes</h5>
              <div className="p-space-base rounded-xl bg-surface-container-low border border-outline-variant/15 text-body-default text-on-surface-variant">
                {person.notes}
              </div>
            </div>
          )}

          {/* Open Service Jobs (Contextual read-only) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-headline-sm text-headline-sm text-on-surface">
                Open Service Jobs ({person.openJobs ? person.openJobs.length : person.openJobsCount || 0})
              </h5>
              <span className="font-micro-label text-micro-label text-primary font-bold uppercase">
                Active Dispatch
              </span>
            </div>
            <div className="space-y-2">
              {person.openJobs && person.openJobs.length > 0 ? (
                person.openJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-body-medium text-body-medium text-on-surface">{job.title}</div>
                      <div className="font-caption text-caption text-on-surface-variant">
                        {job.outletName} · {job.assignedTimeAgo}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-micro-label font-bold ${
                        job.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-caption text-on-surface-variant">
                  No open service jobs currently queued for this technician.
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div>
            <h5 className="font-headline-sm text-headline-sm text-on-surface mb-3">Recent Activity Timeline</h5>
            <div className="space-y-3 pl-3 border-l-2 border-primary/30">
              {person.timelineEvents && person.timelineEvents.length > 0 ? (
                person.timelineEvents.map((evt) => (
                  <div key={evt.id} className="relative pl-3">
                    <div
                      className={`absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full ${
                        evt.isPrimary ? 'bg-primary' : 'bg-outline-variant'
                      }`}
                    />
                    <div className="font-caption text-caption text-on-surface font-semibold">{evt.title}</div>
                    <div className="font-micro-label text-micro-label text-on-surface-variant">{evt.timestamp}</div>
                  </div>
                ))
              ) : (
                <div className="relative pl-3">
                  <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                  <div className="font-caption text-caption text-on-surface font-semibold">
                    Profile active in personnel registry
                  </div>
                  <div className="font-micro-label text-micro-label text-on-surface-variant">
                    {person.createdAt ? new Date(person.createdAt).toLocaleDateString() : 'Active'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel Footer Actions */}
        <div className="p-space-base bg-surface-container-low border-t border-outline-variant/20 flex items-center gap-space-base shrink-0">
          <button
            type="button"
            onClick={() => onEdit(person)}
            className="flex-1 h-9 rounded-xl bg-surface hover:bg-surface-container-high border border-outline-variant/50 font-body-medium text-caption text-on-surface transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            <span>Edit Profile</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleStatus(person)}
            className={`flex-1 h-9 rounded-xl border border-outline-variant/50 font-body-medium text-caption transition-colors flex items-center justify-center gap-1 ${
              isInactive
                ? 'bg-surface hover:bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-surface hover:bg-error-container/20 text-error'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isInactive ? 'lock_open' : 'lock'}
            </span>
            <span>{isInactive ? 'Activate' : 'Deactivate'}</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(person)}
            className="flex-1 h-9 rounded-xl border border-error/30 bg-surface hover:bg-error-container/20 text-error font-body-medium text-caption transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Delete Service Person"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </>
  );
}
