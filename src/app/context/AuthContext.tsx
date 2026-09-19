import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import {
  User,
  authService,
  LoginCredentials,
  PasswordChange,
  ProfileUpdate,
} from '@/features/auth/services/AuthService';
import { invalidateAuthorizationCache } from '@/features/auth/services/authorizationCache';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (update: ProfileUpdate) => Promise<void>;
  changePassword: (change: PasswordChange) => Promise<void>;
  hasCapability: (capability: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return authService.subscribe((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const loggedInUser = await authService.login(credentials);
    invalidateAuthorizationCache();
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    invalidateAuthorizationCache();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (update: ProfileUpdate) => {
    const updatedUser = await authService.updateProfile(update);
    invalidateAuthorizationCache();
    setUser(updatedUser);
  }, []);

  const changePassword = useCallback((change: PasswordChange) => authService.changePassword(change), []);
  const hasCapability = useCallback((capability: string) => user?.capabilities.includes(capability) ?? false, [user]);
  const contextValue = useMemo(() => ({
    user,
    isLoading,
    login,
    logout,
    updateProfile,
    changePassword,
    hasCapability,
  }), [changePassword, hasCapability, isLoading, login, logout, updateProfile, user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
