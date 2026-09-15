import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { TenantSidebar } from './TenantSidebar';
import { TenantOutletProvider } from '@/app/context/TenantOutletContext';

export function TenantAppLayout() {
  return <TenantOutletProvider><div className="flex h-screen w-full bg-surface-subdued overflow-hidden">
    <TenantSidebar />
    <div className="flex-1 flex flex-col min-w-0"><Header /><main className="flex-1 overflow-auto p-6"><div className="mx-auto max-w-7xl"><Outlet /></div></main></div>
  </div></TenantOutletProvider>;
}
