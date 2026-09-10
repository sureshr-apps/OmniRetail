import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Layers, Lock } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAVIGATION: NavItem[] = [
  { label: 'Overview', href: '/overview', icon: LayoutDashboard },
  { label: 'Organizations', href: '/organizations', icon: Building2 },
  { label: 'Plans', href: '/plans', icon: Layers },
];

export function Sidebar() {
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
        <div className="px-3 mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Platform Console</span>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-primary inline-block"></span>
            Stable
          </span>
        </div>
        
        <nav className="flex flex-col gap-0.5 mt-2">
          {NAVIGATION.map((item) => (
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

      <div className="p-4 border-t border-border-subdued mt-auto">
        <div className="bg-surface-subdued rounded border border-border-structural/50 p-2.5 flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          <div className="flex flex-col">
             <span className="text-[11px] font-semibold text-text-primary leading-tight">Platform Services</span>
             <span className="text-[10px] text-primary leading-tight">All Systems Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
