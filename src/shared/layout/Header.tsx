import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, User as UserIcon, KeyRound, LogOut, Store } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { useTenantOutlet } from '@/app/context/TenantOutletContext';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOutletOpen, setIsOutletOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const outletRef = useRef<HTMLDivElement>(null);
  const outletSelection = useTenantOutlet();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (outletRef.current && !outletRef.current.contains(event.target as Node)) {
        setIsOutletOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="h-14 bg-surface-elevated border-b border-border-subdued flex items-center justify-between px-6 shrink-0">
      <div className="flex-1">
         {/* Future: Breadcrumbs or global search */}
      </div>

      <div className="flex items-center gap-4">
        {outletSelection && (
          <div className="relative" ref={outletRef}>
            <button
              type="button"
              aria-label="Select active outlet"
              aria-expanded={isOutletOpen}
              onClick={() => setIsOutletOpen((open) => !open)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-subdued bg-surface-subdued hover:bg-surface-subdued/70 transition-colors"
            >
              <Store className="w-4 h-4 text-primary" />
              <span className="max-w-44 truncate text-xs font-semibold text-text-primary">
                {outletSelection.isLoading ? 'Loading outlets…' : outletSelection.selectedOutlet?.name ?? 'Select outlet'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
            </button>
            {isOutletOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-surface-elevated rounded-md shadow-lg border border-border-subdued py-1 z-50">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-text-muted border-b border-border-subdued">
                  Active outlet
                </div>
                <button
                  type="button"
                  onClick={() => { outletSelection.selectOutlet(null); setIsOutletOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs text-text-secondary hover:bg-surface-subdued"
                >
                  No outlet selected
                </button>
                {outletSelection.outlets.map((outlet) => (
                  <button
                    key={outlet.id}
                    type="button"
                    onClick={() => { outletSelection.selectOutlet(outlet.id); setIsOutletOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-surface-subdued ${outlet.id === outletSelection.selectedOutletId ? 'text-primary font-semibold' : 'text-text-secondary'}`}
                  >
                    {outlet.name}
                  </button>
                ))}
                {outletSelection.error && <p className="px-3 py-2 text-xs text-critical">{outletSelection.error}</p>}
              </div>
            )}
          </div>
        )}
        <div className="relative" ref={profileRef}>
          <button 
            className="flex items-center gap-2 hover:bg-surface-subdued px-2 py-1 rounded transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-semibold text-text-primary leading-tight">{user?.name}</span>
              <span className="text-[10px] text-text-muted leading-tight">{user?.roles[0]?.name ?? 'Authorized User'}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-text-muted ml-1" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-surface-elevated rounded-md shadow-lg border border-border-subdued py-1 z-50">
              <div className="px-4 py-2 border-b border-border-subdued mb-1">
                <p className="text-sm font-semibold text-text-primary truncate">{user?.name}</p>
                <p className="text-xs text-text-muted truncate">{user?.email}</p>
              </div>
              <Link 
                to="/profile" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface-subdued hover:text-text-primary"
                onClick={() => setIsProfileOpen(false)}
              >
                <UserIcon className="w-4 h-4" /> Profile
              </Link>
              <Link
                to="/profile#change-password"
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface-subdued hover:text-text-primary"
                onClick={() => setIsProfileOpen(false)}
              >
                <KeyRound className="w-4 h-4" /> Change Password
              </Link>
              <div className="h-px bg-border-subdued my-1"></div>
              <button 
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-critical hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
