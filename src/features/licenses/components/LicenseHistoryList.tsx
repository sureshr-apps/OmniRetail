import React from 'react';
import { History, Shield, Store, Users, Calendar, Coins, ArrowRight } from 'lucide-react';
import { Badge } from '@/shared/components/Badge';
import { formatCurrency } from '@/shared/utils/currency';
import { OrganizationLicenseHistory, LicenseEventType } from '../types';

export interface LicenseHistoryListProps {
  history: OrganizationLicenseHistory[];
}

function getEventBadge(eventType: LicenseEventType) {
  switch (eventType) {
    case 'assigned':
      return (
        <Badge variant="info" className="text-[10px] font-semibold">
          License Assigned
        </Badge>
      );
    case 'plan_changed':
      return (
        <Badge variant="info" className="text-[10px] font-semibold">
          Plan Changed
        </Badge>
      );
    case 'commercial_terms_modified':
      return (
        <Badge variant="neutral" className="text-[10px] font-semibold">
          Commercial Terms Modified
        </Badge>
      );
    case 'renewed':
      return (
        <Badge variant="success" className="text-[10px] font-semibold">
          License Renewed
        </Badge>
      );
  }
}

function formatEventDateTime(isoStr: string): string {
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    return isoStr;
  }
}

export function LicenseHistoryList({ history }: LicenseHistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="p-8 text-center bg-surface-subdued/40 rounded-lg border border-border-subdued">
        <History className="w-6 h-6 text-text-muted mx-auto mb-2 opacity-60" />
        <div className="text-xs font-semibold text-text-primary">No License History Recorded</div>
        <p className="text-[11px] text-text-secondary mt-0.5">
          History events are automatically captured when a license is assigned, upgraded, modified, or renewed.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="h-8 bg-surface-subdued border-b border-border-subdued text-[10px] uppercase font-bold text-text-muted tracking-wider select-none">
            <th className="px-4 py-2">Event</th>
            <th className="px-4 py-2">Date & Time</th>
            <th className="px-4 py-2">Plan (Snapshot)</th>
            <th className="px-4 py-2">License Period</th>
            <th className="px-4 py-2 text-center">Stores</th>
            <th className="px-4 py-2 text-center">Users</th>
            <th className="px-4 py-2 text-right">Negotiated Price</th>
            <th className="px-4 py-2">Changes Log</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subdued text-xs text-text-primary">
          {history.map((record) => {
            const { planSnapshot } = record;

            return (
              <tr key={record.id} className="hover:bg-row-hover/60 transition-colors">
                {/* Event Type */}
                <td className="px-4 py-3 align-top whitespace-nowrap">
                  {getEventBadge(record.eventType)}
                </td>

                {/* Event Timestamp */}
                <td className="px-4 py-3 align-top whitespace-nowrap">
                  <div className="font-mono text-[11px] text-text-secondary">
                    {formatEventDateTime(record.eventAt)}
                  </div>
                  <div className="text-[10px] text-text-muted font-mono">{record.id}</div>
                </td>

                {/* Plan Snapshot */}
                <td className="px-4 py-3 align-top whitespace-nowrap">
                  <div className="font-semibold text-text-primary">{planSnapshot.planName}</div>
                  <span className="text-[10px] text-text-muted">Level {planSnapshot.planLevel}</span>
                </td>

                {/* License Period */}
                <td className="px-4 py-3 align-top whitespace-nowrap">
                  <div className="font-mono text-[11px] text-text-secondary">
                    {record.startDate} <span className="text-text-muted">to</span> {record.expiryDate}
                  </div>
                </td>

                {/* Stores Snapshot */}
                <td className="px-4 py-3 align-top text-center whitespace-nowrap font-medium text-text-primary">
                  {planSnapshot.maxStores}
                </td>

                {/* Users Snapshot */}
                <td className="px-4 py-3 align-top text-center whitespace-nowrap font-medium text-text-primary">
                  {planSnapshot.maxUsers}
                </td>

                {/* Price */}
                <td className="px-4 py-3 align-top text-right whitespace-nowrap font-semibold text-text-primary">
                  {formatCurrency(record.negotiatedPrice, record.currency)}
                </td>

                {/* Changes log */}
                <td className="px-4 py-3 align-top">
                  {record.changes && record.changes.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-w-sm">
                      {record.changes.map((change, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] bg-surface-subdued px-2 py-0.5 rounded border border-border-structural text-text-secondary"
                        >
                          <span className="text-text-muted font-medium">{change.label}:</span>
                          <span className="line-through text-text-muted">{change.from}</span>
                          <ArrowRight className="w-2.5 h-2.5 text-text-muted" />
                          <span className="font-semibold text-text-primary">{change.to}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-text-muted text-[11px] italic">Initial Baseline Agreement</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
