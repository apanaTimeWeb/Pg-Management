// RESPONSIBILITY: Renders the StaffFirstLoginMain component.
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi as api } from '@/app/staff/staff_lib/staff_api/StaffAuth';
import { getSession, setSession } from '@/app/staff/staff_lib/staff_auth/StaffSession';

export function StaffFirstLoginMain() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const session = getSession();
      if(!session) return;
      api.changePassword(session.id, newPassword);
      session.mustChangePassword = false;
      setSession(session);
      router.push('/staff/dashboard');
    } catch (err: any) {
      setError((err as any).message);
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
