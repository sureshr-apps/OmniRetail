import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Layers } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { useAuth } from '@/app/context/AuthContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  capability: string;
}

const NAVIGATION: NavItem[] = [
  { label: 'Overview', href: '/overview', icon: LayoutDashboard, capability: 'overview.read' },
  { label: 'Organizations', href: '/organizations', icon: Building2, capability: 'organizations.read' },
  { label: 'Plans', href: '/plans', icon: Layers, capability: 'plans.read' },
];

export function Sidebar() {
  const { hasCapability } = useAuth();
  const navigation = NAVIGATION.filter((item) => hasCapability(item.capability));

  return (
    <aside className="w-64 bg-surface-main border-r border-border-subdued flex flex-col h-full shrink-0">
      <div className="h-14 flex items-center px-4 border-b border-border-subdued">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
             <span className="text-white font-bold text-xs leading-none">O</span>
          </div>
          <span className="font-semibold text-sm tracking-tight text-text-primary">OmniRetail</span>
        </div>
      </div>
      
      <div className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
        <nav className="flex flex-col gap-0.5 mt-2">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:bg-surface-subdued hover:text-text-primary'
              )}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </aside>
  );
}
