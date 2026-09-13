import React from 'react';

interface ServicePersonHeaderProps {
  activeCount: number;
  onAddClick: () => void;
}

export function ServicePersonHeader({ activeCount, onAddClick }: ServicePersonHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-base mb-space-2xl bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/20">
      <div>
        <div className="flex items-center gap-space-sm">
          <span
            className="material-symbols-outlined text-[24px] text-primary"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            badge
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Service Person Master</h1>
          <span className="font-micro-label text-micro-label px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-semibold">
            {activeCount} Active Personnel
          </span>
        </div>
        <p className="font-body-default text-body-default text-on-surface-variant mt-0.5">
          Manage service personnel and their service assignments across all retail outlets.
        </p>
      </div>

      <div className="flex items-center gap-space-base flex-wrap">
        <button
          id="btn-add-service-person"
          onClick={onAddClick}
          className="h-9 px-space-lg bg-primary hover:bg-primary-container text-on-primary rounded-xl font-body-medium text-body-medium flex items-center gap-space-xs transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Add Service Person</span>
        </button>
      </div>
    </div>
  );
}
