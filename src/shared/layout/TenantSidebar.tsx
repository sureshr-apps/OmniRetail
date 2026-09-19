import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Boxes, BriefcaseBusiness, CircleDollarSign, ClipboardList, Contact, FileText, Package, ShoppingCart, Store, Truck, Users, WalletCards } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { useAuth } from '@/app/context/AuthContext';
import { getTenantNavigation } from '@/app/navigation/tenantNavigation';

const ICONS: Record<string, React.ElementType> = {
  '/billing': CircleDollarSign, '/sales': BarChart3, '/inventory': Boxes, '/products': Package,
  '/purchases': ShoppingCart, '/suppliers': Truck, '/customers': Users, '/expenses': FileText,
  '/cash-management': WalletCards,
  '/outlets': Store, '/employees': Contact, '/service-persons': BriefcaseBusiness,
};

export function TenantSidebar() {
  const { user } = useAuth();
  const navigation = getTenantNavigation(user);

  return (
    <aside className="w-64 bg-surface-main border-r border-border-subdued flex flex-col h-full shrink-0">
      <div className="h-14 flex items-center px-4 border-b border-border-subdued">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center"><span className="text-white font-bold text-xs leading-none">O</span></div>
          <span className="font-semibold text-sm tracking-tight text-text-primary">OmniRetail</span>
        </div>
      </div>
      <div className="flex-1 py-4 px-3 overflow-y-auto">
        <nav className="flex flex-col gap-0.5 mt-2">
          {navigation.map((item) => {
            const Icon = ICONS[item.href] ?? ClipboardList;
            return <NavLink key={item.href} to={item.href} className={({ isActive }) => cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-subdued hover:text-text-primary'
            )}><Icon className="w-[18px] h-[18px]" />{item.label}</NavLink>;
          })}
        </nav>
      </div>
    </aside>
  );
}
