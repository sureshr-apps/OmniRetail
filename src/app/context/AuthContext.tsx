import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  authService,
  LoginCredentials,
  PasswordChange,
  ProfileUpdate,
} from '@/features/auth/services/AuthService';

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

  const login = async (credentials: LoginCredentials) => {
    const loggedInUser = await authService.login(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateProfile = async (update: ProfileUpdate) => {
    const updatedUser = await authService.updateProfile(update);
    setUser(updatedUser);
  };

  const changePassword = (change: PasswordChange) => authService.changePassword(change);
  const hasCapability = (capability: string) => user?.capabilities.includes(capability) ?? false;

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      updateProfile,
      changePassword,
      hasCapability,
    }}>
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
