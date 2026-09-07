import React from 'react';
import { User } from 'lucide-react';
import { InputError } from '@/components/ui/InputError';
import { SuperAdminCreateOwnerFieldProps } from '../SuperAdminCreateOwner_types/SuperAdminCreateOwner.types';

export const SuperAdminCreateOwnerPersonalFields: React.FC<SuperAdminCreateOwnerFieldProps> = ({ formData, setFormData, errors }) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
      <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2">
        <User className="w-5 h-5 text-[var(--primary)]" />
        <h2 className="font-bold text-[var(--text-primary)]">Personal Details</h2>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Full Name *</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })} 
            className={`w-full p-2.5 rounded-md border ${errors.name ? 'border-[var(--danger)]' : 'border-[var(--border)]'} bg-[var(--bg-input)] text-[var(--text-primary)] text-sm focus:ring-[var(--primary)]`} 
          />
          <InputError message={errors.name} />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Phone Number *</label>
          <input 
            type="text" 
            value={formData.phone} 
            onChange={e => setFormData({ ...formData, phone: e.target.value })} 
            className={`w-full p-2.5 rounded-md border ${errors.phone ? 'border-[var(--danger)]' : 'border-[var(--border)]'} bg-[var(--bg-input)] text-[var(--text-primary)] text-sm focus:ring-[var(--primary)]`} 
          />
          <InputError message={errors.phone} />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">City *</label>
          <input 
            required 
            type="text" 
            value={formData.city} 
            onChange={e => setFormData({ ...formData, city: e.target.value })} 
            className="w-full p-2.5 rounded-md border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm" 
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Address</label>
          <input 
            type="text" 
            value={formData.address} 
            onChange={e => setFormData({ ...formData, address: e.target.value })} 
            className="w-full p-2.5 rounded-md border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm" 
          />
        </div>
      </div>
    </div>
  );
};
