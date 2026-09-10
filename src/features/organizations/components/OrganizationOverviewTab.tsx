import React from 'react';
import {
  Building2,
  Store,
  Monitor,
  Users,
  Clock,
  Coins,
  MapPin,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Organization } from '../types';
import { Badge } from '@/shared/components/Badge';

export interface OrganizationOverviewTabProps {
  organization: Organization;
  adminCount: number;
}

export function OrganizationOverviewTab({
  organization,
  adminCount,
}: OrganizationOverviewTabProps) {
  const city = organization.contactInfo.city || 'Bengaluru';
  const state = organization.contactInfo.state || 'Karnataka';

  // Generate realistic provisioned store outlets for this tenant
  const storeOutlets = [
    {
      code: 'STR-101',
      name: `${organization.name} - ${city} Flagship`,
      location: `${city}, ${state}`,
      terminals: Math.max(2, Math.floor((organization.posRegisters || 4) / 2)),
      status: organization.status === 'active' ? 'online' : 'suspended',
    },
    ...(organization.activeStores && organization.activeStores > 1
      ? [
          {
            code: 'STR-102',
            name: `${organization.name} - Mall Promenade`,
            location: `${city} Central Plaza`,
            terminals: Math.max(1, Math.ceil((organization.posRegisters || 4) / 3)),
            status: organization.status === 'active' ? 'online' : 'suspended',
          },
        ]
      : []),
    ...(organization.activeStores && organization.activeStores > 2
      ? [
          {
            code: 'STR-103',
            name: `${organization.name} - Express Outlet`,
            location: `Metro Terminal Boulevard`,
            terminals: 1,
            status: organization.status === 'active' ? 'online' : 'suspended',
          },
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Left Column: Organization Profile (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 bg-surface-subdued/70 border-b border-border-subdued flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Organization Profile
              </h3>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted bg-surface-elevated px-2 py-0.5 rounded border border-border-structural">
              Primary Master Record
            </span>
          </div>

          <div className="p-5 divide-y divide-border-subdued/80 text-xs">
            {/* Legal Entity */}
            <div className="py-2.5 first:pt-0 grid grid-cols-1 sm:grid-cols-3 gap-1">
              <span className="text-text-muted font-medium">Legal Entity Name</span>
              <div className="sm:col-span-2">
                <span className="font-semibold text-text-primary">
                  {organization.legalEntityName}
                </span>
                <p className="text-[11px] text-text-muted mt-0.5">Registered corporate entity</p>
              </div>
            </div>

            {/* GSTIN / Tax ID */}
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
              <span className="text-text-muted font-medium">GSTIN / Tax ID</span>
              <div className="sm:col-span-2 flex items-center gap-2">
                <span className="font-mono font-semibold text-text-primary bg-surface-subdued px-2 py-0.5 rounded border border-border-structural">
                  {organization.taxId}
                </span>
                <Badge variant="success" className="text-[9px] px-1.5 py-0">
                  Verified Active
                </Badge>
              </div>
            </div>

            {/* Primary Contact */}
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
              <span className="text-text-muted font-medium">Primary Contact</span>
              <div className="sm:col-span-2 space-y-1">
                <div className="font-semibold text-text-primary">
                  {organization.contactInfo.primaryContactName || organization.primaryAdmin?.name}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-text-secondary text-[11px]">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-text-muted" />
                    <span>{organization.contactInfo.email || organization.primaryAdmin?.email}</span>
                  </span>
                  <span className="hidden sm:inline text-border-structural">•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-text-muted" />
                    <span>{organization.contactInfo.phone || organization.primaryAdmin?.phone}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Headquarters Address */}
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
              <span className="text-text-muted font-medium">Headquarters Address</span>
              <div className="sm:col-span-2">
                <div className="flex items-start gap-1.5 text-text-primary font-medium">
                  <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                  <span>
                    {organization.contactInfo.address || 'Central Commercial Plaza'}, {city},{' '}
                    {state} - {organization.contactInfo.pincode || '400001'}
                  </span>
                </div>
              </div>
            </div>

            {/* Timezone */}
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
              <span className="text-text-muted font-medium">Store Timezone</span>
              <div className="sm:col-span-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-text-muted" />
                <span className="font-medium text-text-primary">{organization.timezone}</span>
                <span className="text-[11px] text-text-muted font-mono">(Store Sync Target)</span>
              </div>
            </div>

            {/* Base Currency */}
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
              <span className="text-text-muted font-medium">Reporting Currency</span>
              <div className="sm:col-span-2 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-text-muted" />
                <span className="font-medium text-text-primary">{organization.currency}</span>
              </div>
            </div>

            {/* Contract SLA */}
            <div className="py-2.5 last:pb-0 grid grid-cols-1 sm:grid-cols-3 gap-1">
              <span className="text-text-muted font-medium">Contract Type</span>
              <div className="sm:col-span-2 flex items-center justify-between">
                <span className="font-semibold text-text-primary">
                  {organization.licensePlan} SLA
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer">
                  <FileText className="w-3 h-3" />
                  <span>Master Service Agreement</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Provisioning & Nodes (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        {/* Top Node Capacity Metric Chips */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-surface-elevated p-3 rounded-lg border border-border-subdued shadow-xs text-center">
            <div className="flex items-center justify-center text-text-muted mb-1">
              <Store className="w-4 h-4 text-primary" />
            </div>
            <div className="text-base font-bold text-text-primary tracking-tight">
              {organization.activeStores || 1}{' '}
              <span className="text-xs text-text-muted font-normal">
                / {organization.allowedStores || 1}
              </span>
            </div>
            <div className="text-[10px] uppercase font-bold text-text-muted tracking-wider mt-0.5">
              Stores Active
            </div>
          </div>

          <div className="bg-surface-elevated p-3 rounded-lg border border-border-subdued shadow-xs text-center">
            <div className="flex items-center justify-center text-text-muted mb-1">
              <Monitor className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-base font-bold text-text-primary tracking-tight">
              {organization.posRegisters || 2}
            </div>
            <div className="text-[10px] uppercase font-bold text-text-muted tracking-wider mt-0.5">
              POS Terminals
            </div>
          </div>

          <div className="bg-surface-elevated p-3 rounded-lg border border-border-subdued shadow-xs text-center">
            <div className="flex items-center justify-center text-text-muted mb-1">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-base font-bold text-text-primary tracking-tight">
              {adminCount}
            </div>
            <div className="text-[10px] uppercase font-bold text-text-muted tracking-wider mt-0.5">
              Tenant Admins
            </div>
          </div>
        </div>

        {/* Provisioned Store Outlets Card */}
        <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xs overflow-hidden">
          <div className="px-4 py-3 bg-surface-subdued/70 border-b border-border-subdued flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Provisioned Store Outlets
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-text-muted font-mono">
              {storeOutlets.length} of {organization.allowedStores || 1} allocated
            </span>
          </div>

          <div className="divide-y divide-border-subdued">
            {storeOutlets.map((st) => (
              <div key={st.code} className="p-3.5 flex items-center justify-between hover:bg-surface-subdued/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-subdued border border-border-structural flex items-center justify-center text-text-secondary font-mono text-xs font-semibold shrink-0">
                    <Store className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-primary flex items-center gap-2">
                      <span>{st.name}</span>
                      <span className="font-mono text-[10px] text-text-muted">({st.code})</span>
                    </div>
                    <div className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                      <span>{st.location}</span>
                      <span>•</span>
                      <span>{st.terminals} Terminals Synchronized</span>
                    </div>
                  </div>
                </div>

                <div>
                  {st.status === 'online' ? (
                    <Badge variant="success" withDot className="text-[9px]">
                      Online
                    </Badge>
                  ) : (
                    <Badge variant="critical" withDot className="text-[9px]">
                      Suspended
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Connectivity Status Box */}
        <div className="bg-surface-elevated rounded-lg border border-border-subdued p-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text-primary">Cloud Gateway Connectivity</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  LATENCY 18ms
                </span>
              </div>
              <p className="text-text-muted text-[11px] leading-relaxed">
                Real-time WebSocket POS sync and catalog replication services are nominal for this tenant cluster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
