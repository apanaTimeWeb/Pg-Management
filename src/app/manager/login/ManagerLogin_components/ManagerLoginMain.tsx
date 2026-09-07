// RESPONSIBILITY: Renders the ManagerLoginMain component.
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';
import { setSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';

export function ManagerLoginMain() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user = api.auth.login({ email, password, expectedRole: 'manager' });
      setSession(user);
      router.push(user.mustChangePassword ? '/manager/first-login' : '/manager/dashboard');
    } catch (err: unknown) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div className="bg-card border border p-8 rounded-[var(--radius-lg,12px)] max-w-md w-full shadow-lg">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">Manager Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full bg-input border border text-primary rounded-[var(--radius-md,8px)] px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full bg-input border border text-primary rounded-[var(--radius-md,8px)] px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          
          {error && <div className="text-danger text-sm bg-danger-bg p-3 rounded-md">{error}</div>}
          
          <button type="submit" className="w-full bg-primary text-white font-medium py-2 rounded-[var(--radius-md,8px)] hover:bg-primary-hover motion-safe:transition-colors">
            Login
          </button>
        </form>

        <div className="mt-6 p-4 bg-page rounded-md border border text-xs text-secondary">
          <strong>Demo Credentials:</strong><br/>
          Email: tom.h@example.org<br/>
          Password: Manager@123
        </div>
      </div>
    </div>
  );
}
