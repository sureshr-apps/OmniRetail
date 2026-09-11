import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyRound, User as UserIcon, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Label } from '@/shared/components/Label';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ username, password });
      const requestedPath = location.state?.from?.pathname;
      navigate(typeof requestedPath === 'string' ? requestedPath : '/overview', { replace: true });
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-5 bg-surface-main">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="w-full bg-surface-elevated rounded-lg shadow-sm border border-border-subdued p-8 flex flex-col">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xl leading-none">O</span>
                </div>
                <span className="font-semibold text-xl tracking-tight text-text-primary ml-1">OmniRetail</span>
                <span className="bg-primary-container/10 text-primary-active font-mono text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ml-1">
                  POS Enterprise
                </span>
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              Sign in to access your retail operations console
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-critical-bg text-critical-text text-sm p-3 rounded border border-red-200">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="username">Email or Username</Label>
                <span className="text-[11px] text-text-muted font-normal">Terminal & Web ID</span>
              </div>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or email"
                icon={<UserIcon className="w-[18px] h-[18px]" />}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="text-[11px] text-text-muted font-normal">Encrypted</span>
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                icon={<KeyRound className="w-[18px] h-[18px]" />}
                required
                rightElement={
                  <button
                    type="button"
                    tabIndex={-1}
                    className="p-1 text-text-muted hover:text-text-primary transition-colors focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                  </button>
                }
              />
            </div>

            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full gap-2" isLoading={isLoading}>
                {!isLoading && (
                  <>
                    Sign In <ArrowRight className="w-[18px] h-[18px]" />
                  </>
                )}
                {isLoading && 'Authenticating...'}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-3 bg-surface-subdued p-3 rounded flex items-start gap-2 border border-border-subdued/50">
            <ShieldCheck className="text-primary w-[18px] h-[18px] shrink-0 mt-0.5" />
            <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
              Firebase verifies your credentials. Application roles are checked before access is granted.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center text-center gap-1">
          <div className="flex items-center gap-2 text-[11px] text-text-secondary font-medium">
            <span>v2.4.8 Cloud Enterprise</span>
            <span className="w-1 h-1 rounded-full bg-border-structural"></span>
            <span className="flex items-center gap-1 text-primary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
          <div className="text-[11px] text-text-muted">
            © 2026 OmniRetail Systems Inc. End-to-end telemetry secured.
          </div>
        </div>
      </div>
    </main>
  );
}
