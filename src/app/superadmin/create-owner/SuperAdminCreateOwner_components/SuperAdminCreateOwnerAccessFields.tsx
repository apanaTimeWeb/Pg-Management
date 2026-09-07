import React from 'react';
import { Shield } from 'lucide-react';
import { InputError } from '@/lib/ui/InputError';
import { SuperAdminCreateOwnerFieldProps } from '../SuperAdminCreateOwner_types/SuperAdminCreateOwner.types';

export const SuperAdminCreateOwnerAccessFields: React.FC<SuperAdminCreateOwnerFieldProps> = ({ formData, setFormData, errors }) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
      <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-[var(--primary)]" />
        <h2 className="font-bold text-[var(--text-primary)]">Account Access</h2>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Login Email *</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({ ...formData, email: e.target.value })} 
            className={`w-full p-2.5 rounded-md border ${errors.email ? 'border-[var(--danger)]' : 'border-[var(--border)]'} bg-[var(--bg-input)] text-[var(--text-primary)] text-sm focus:ring-[var(--primary)]`} 
          />
          <InputError message={errors.email} />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Temporary Password *</label>
          <input 
            type="text" 
            value={formData.temporaryPassword || ''} 
            onChange={e => setFormData({ ...formData, temporaryPassword: e.target.value })} 
            className={`w-full p-2.5 rounded-md border ${errors.temporaryPassword ? 'border-[var(--danger)]' : 'border-[var(--border)]'} bg-[var(--bg-input)] text-[var(--text-primary)] text-sm font-mono focus:ring-[var(--primary)]`} 
            placeholder="e.g. Temp@123" 
          />
          <InputError message={errors.temporaryPassword} />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 mt-2 cursor-pointer w-fit">
            <input 
              type="checkbox" 
              checked={formData.mustChangePassword} 
              onChange={e => setFormData({ ...formData, mustChangePassword: e.target.checked })} 
              className="rounded text-[var(--primary)] focus:ring-[var(--primary)] bg-[var(--bg-input)] border-[var(--border)] w-4 h-4" 
            />
            <span className="text-sm text-[var(--text-primary)]">Force password change on first login</span>
          </label>
        </div>
      </div>
    </div>
  );
};
