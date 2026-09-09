// RESPONSIBILITY: Renders the ParentLoginMain component.
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { authApi as api } from '@/app/parent/parent_lib/parent_api/ParentAuth';
import { setSession } from '@/app/parent/parent_lib/parent_auth/ParentSession';

export function ParentLoginMain() {
  const router = useRouter();
  const [email, setEmail] = useState('peter.m@example.com');
  const [password, setPassword] = useState('Parent@123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user = api.login({ email, password, expectedRole: 'parent' });
      setSession(user);
      router.push('/parent/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div className="bg-card border border-border p-8 rounded-lg max-w-md w-full shadow-lg">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">Parent Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full bg-input border border-border text-primary rounded-md px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full bg-input border border-border text-primary rounded-md px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          
          {error && <div className="text-danger text-sm bg-danger-bg p-3 rounded-md">{error}</div>}
          
          <button type="submit" className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary-hover motion-safe:transition-colors">
            Login
          </button>
        </form>

        <div className="mt-6 p-4 bg-page rounded-md border border-border text-xs text-secondary">
          <strong>Demo Credentials:</strong><br/>
          Email: peter.m@example.com<br/>
          Password: Parent@123
        </div>
      </div>
    </div>
  );
}
