'use client';

// RESPONSIBILITY: Renders the OwnerFirstLoginMain component. Receives data via props/hooks.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/login/lib/api/auth';
import { getSession, setSession } from '@/app/login/lib/auth/session';

export function OwnerFirstLoginMain() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const session = getSession();
      if(!session) return;
      api.auth.changePassword(session.id, newPassword);
      session.mustChangePassword = false;
      setSession(session);
      router.push('/owner/dashboard');
    } catch(err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-card border border-border p-8 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold text-primary mb-4">Set Your Permanent Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">New Password</label>
          <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required className="w-full bg-input border border-border text-primary rounded-md px-4 py-2" />
        </div>
        {error && <div className="text-danger text-sm">{error}</div>}
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover">Save & Continue</button>
      </form>
    </div>
  );
}
