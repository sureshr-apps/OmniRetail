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
  ExternalLink,
} from 'lucide-react';
import { Organization } from '../types';

export interface OrganizationOverviewTabProps {
  organization: Organization;
  adminCount: number;
}

export function OrganizationOverviewTab({
  organization,
  adminCount,
}: OrganizationOverviewTabProps) {
  const city = organization.contactInfo.city;
  const state = organization.contactInfo.state;

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
                    {[organization.contactInfo.address, city, state, organization.contactInfo.pincode].filter(Boolean).join(', ') || '—'}
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
                <span className="font-medium text-text-primary">INR (₹)</span>
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
              {organization.activeStores ?? '—'}{' '}
              <span className="text-xs text-text-muted font-normal">
                / {organization.allowedStores ?? '—'}
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
              {organization.posRegisters ?? '—'}
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

      </div>
    </div>
  );
}
