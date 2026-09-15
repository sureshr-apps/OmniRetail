import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { outletService } from '@/features/outlets/services/outletService';
import type { Outlet } from '@/features/outlets/types';

interface TenantOutletContextValue {
  outlets: Outlet[];
  selectedOutletId: string | null;
  selectedOutlet: Outlet | null;
  isLoading: boolean;
  error: string | null;
  selectOutlet: (outletId: string | null) => void;
}

const TenantOutletContext = createContext<TenantOutletContextValue | null>(null);
const ACTIVE_OUTLET_STORAGE_KEY = 'omniretail.activeOutletId';

export function TenantOutletProvider({ children }: { children: ReactNode }) {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return window.sessionStorage.getItem(ACTIVE_OUTLET_STORAGE_KEY);
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    outletService.getAllActiveOutlets().then((loaded) => {
      if (!active) return;
      setOutlets(loaded);
      setSelectedOutletId((current) => current && loaded.some((outlet) => outlet.id === current) ? current : null);
      setError(null);
    }).catch((loadError: unknown) => {
      if (!active) return;
      setError(loadError instanceof Error ? loadError.message : 'Unable to load outlets.');
    }).finally(() => {
      if (active) setIsLoading(false);
    });
    return () => { active = false; };
  }, []);

  const selectOutlet = (outletId: string | null) => {
    setSelectedOutletId(outletId);
    if (typeof window === 'undefined') return;
    if (outletId) window.sessionStorage.setItem(ACTIVE_OUTLET_STORAGE_KEY, outletId);
    else window.sessionStorage.removeItem(ACTIVE_OUTLET_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('omniretail:active-outlet-changed', { detail: { outletId } }));
  };

  const value = useMemo(() => ({
    outlets,
    selectedOutletId,
    selectedOutlet: outlets.find((outlet) => outlet.id === selectedOutletId) ?? null,
    isLoading,
    error,
    selectOutlet,
  }), [error, isLoading, outlets, selectedOutletId]);

  return <TenantOutletContext.Provider value={value}>{children}</TenantOutletContext.Provider>;
}

export function useTenantOutlet(): TenantOutletContextValue | null {
  return useContext(TenantOutletContext);
}
