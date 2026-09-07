import React from 'react';
import { Briefcase } from 'lucide-react';
import { SuperAdminCreateOwnerFieldProps } from '@/app/superadmin/create-owner/SuperAdminCreateOwner_types/SuperAdminCreateOwner.types';

export const SuperAdminCreateOwnerBusinessFields: React.FC<SuperAdminCreateOwnerFieldProps> = ({ formData, setFormData }) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] overflow-hidden shadow-sm">
      <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-[var(--primary)]" />
        <h2 className="font-bold text-[var(--text-primary)]">Business Information</h2>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Business/Company Name *</label>
          <input 
            required 
            type="text" 
            value={formData.businessName} 
            onChange={e => setFormData({ ...formData, businessName: e.target.value })} 
            className="w-full p-2.5 rounded-md border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm" 
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">GST Number (Optional)</label>
          <input 
            type="text" 
            value={formData.gst} 
            onChange={e => setFormData({ ...formData, gst: e.target.value })} 
            className="w-full p-2.5 rounded-md border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm uppercase" 
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">PAN Number (Optional)</label>
          <input 
            type="text" 
            value={formData.pan} 
            onChange={e => setFormData({ ...formData, pan: e.target.value })} 
            className="w-full p-2.5 rounded-md border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm uppercase" 
          />
        </div>
      </div>
    </div>
  );
};
