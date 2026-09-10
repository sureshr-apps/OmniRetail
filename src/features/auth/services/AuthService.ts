import { mockDelay } from '@/shared/utils/mockDelay';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password?: string;
}

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

class MockAuthService implements IAuthService {
  private currentUser: User | null = null;

  async login(credentials: LoginCredentials): Promise<User> {
    await mockDelay(800);

    // Mock validation
    if (!credentials.username || !credentials.password) {
      throw new Error('Username and password are required.');
    }
    
    // Simulate invalid credentials check
    if (credentials.username === 'invalid' || credentials.password === 'invalid') {
      throw new Error('Invalid username or password.');
    }

    this.currentUser = {
      id: 'usr-admin-01',
      name: 'Platform Admin',
      email: credentials.username.includes('@') ? credentials.username : `${credentials.username}@example.com`,
      username: credentials.username,
    };

    return this.currentUser;
  }

  async logout(): Promise<void> {
    await mockDelay(400);
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<User | null> {
    await mockDelay(200);
    return this.currentUser;
  }
}

export const authService = new MockAuthService();
