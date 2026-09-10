import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, HelpCircle, ChevronDown, User as UserIcon, KeyRound, LogOut } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
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
        <button className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <HelpCircle className="w-[18px] h-[18px]" />
          Docs & Support
        </button>
        
        <button className="relative text-text-secondary hover:text-text-primary transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute 1 top-0 right-0 w-1.5 h-1.5 bg-critical rounded-full border border-white"></span>
        </button>

        <div className="h-6 w-px bg-border-structural mx-2"></div>

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
              <span className="text-[10px] text-text-muted leading-tight">Operations Lead</span>
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
              <button 
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface-subdued hover:text-text-primary"
                onClick={() => {
                  /* Future: open change password modal or route */
                  setIsProfileOpen(false);
                }}
              >
                <KeyRound className="w-4 h-4" /> Change Password
              </button>
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
