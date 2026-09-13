import React from 'react';
import { ServicePerson } from '../types';

interface ServicePersonTableProps {
  servicePersons: ServicePerson[];
  onView: (person: ServicePerson) => void;
}

export function ServicePersonTable({ servicePersons, onView }: ServicePersonTableProps) {
  const getSpecializationBadgeClass = (spec: string) => {
    const lower = spec.toLowerCase();
    if (lower.includes('hvac')) {
      return 'bg-secondary-container text-on-secondary-container';
    }
    if (lower.includes('electronics') || lower.includes('pos')) {
      return 'bg-tertiary-container/10 text-tertiary';
    }
    if (lower.includes('plumbing')) {
      return 'bg-primary-fixed/30 text-on-primary-fixed';
    }
    if (lower.includes('it') || lower.includes('network')) {
      return 'bg-surface-container-high text-on-surface';
    }
    return 'bg-surface-container-high text-on-surface';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant/30 h-8">
            <th className="px-space-base font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider">
              Service Person Code
            </th>
            <th className="px-space-base font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider">
              Name &amp; Contact
            </th>
            <th className="px-space-base font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider">
              Specialization
            </th>
            <th className="px-space-base font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider">
              Assigned Outlet
            </th>
            <th className="px-space-base font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider">
              Phone
            </th>
            <th className="px-space-base font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider">
              Status
            </th>
            <th className="px-space-base font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20 font-body-default text-body-default">
          {servicePersons.map((person) => {
            const isInactive = person.status === 'Inactive';
            return (
              <tr
                key={person.id}
                onClick={() => onView(person)}
                className={`hover:bg-surface-container-low/60 transition-colors group cursor-pointer ${
                  isInactive ? 'opacity-75' : ''
                }`}
              >
                {/* Service Person Code */}
                <td
                  className={`px-space-base py-3 font-body-mono-num text-caption font-semibold ${
                    isInactive ? 'text-on-surface-variant' : 'text-primary'
                  }`}
                >
                  {person.servicePersonCode}
                </td>

                {/* Name & Contact */}
                <td className="px-space-base py-3">
                  <div className="flex items-center gap-3">
                    {person.avatarUrl ? (
                      <img
                        className={`w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/40 shrink-0 ${
                          isInactive ? 'grayscale' : ''
                        }`}
                        src={person.avatarUrl}
                        alt={person.displayName}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Fallback to initials if image link breaks
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center text-caption font-bold shrink-0 ${
                        person.avatarUrl ? 'hidden' : 'flex'
                      }`}
                    >
                      {person.firstName[0]}
                      {person.lastName[0]}
                    </div>
                    <div>
                      <div className="font-body-medium text-body-medium text-on-surface group-hover:text-primary transition-colors">
                        {person.displayName}
                      </div>
                      <div className="font-caption text-caption text-on-surface-variant truncate max-w-[220px]">
                        {person.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Specialization */}
                <td className="px-space-base py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-caption font-medium ${getSpecializationBadgeClass(
                      person.specialization
                    )}`}
                  >
                    {person.specialization}
                  </span>
                </td>

                {/* Assigned Outlet */}
                <td className="px-space-base py-3 font-caption text-caption text-on-surface">
                  {person.assignmentScope === 'Entire Organization'
                    ? 'Organization-wide'
                    : person.outletName || 'Specific Outlet'}
                </td>

                {/* Phone */}
                <td className="px-space-base py-3 font-body-mono-num text-caption text-on-surface-variant whitespace-nowrap">
                  {person.phone}
                </td>

                {/* Status */}
                <td className="px-space-base py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-micro-label font-bold ${
                      isInactive
                        ? 'bg-surface-container-high text-on-surface-variant'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {person.status}
                  </span>
                </td>

                {/* Actions */}
                <td
                  className="px-space-base py-3 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => onView(person)}
                      className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
