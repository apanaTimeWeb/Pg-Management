import React from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { useSuperAdminCreateOwner } from '../SuperAdminCreateOwner_hooks/useSuperAdminCreateOwner';
import { SuperAdminCreateOwnerPersonalFields } from './SuperAdminCreateOwnerPersonalFields';
import { SuperAdminCreateOwnerBusinessFields } from './SuperAdminCreateOwnerBusinessFields';
import { SuperAdminCreateOwnerAccessFields } from './SuperAdminCreateOwnerAccessFields';
import { SuperAdminCreateOwnerPlanFields } from './SuperAdminCreateOwnerPlanFields';
import { SuperAdminCreateOwnerSuccess } from './SuperAdminCreateOwnerSuccess';

export const SuperAdminCreateOwnerForm: React.FC = () => {
  const {
    formData,
    setFormData,
    errors,
    loading,
    success,
    createdCreds,
    handlePlanChange,
    handleSubmit
  } = useSuperAdminCreateOwner();

  if (success && createdCreds) {
    return <SuperAdminCreateOwnerSuccess credentials={createdCreds} />;
  }

  const fieldProps = { formData, setFormData, errors };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Create PG Owner</h1>
        <p className="text-[var(--text-secondary)] text-sm flex items-center gap-2 mt-1">
          <AlertCircle className="w-4 h-4 text-[var(--warning)]" />
          Owner self-signup nahi karta. Aap account banaake email+password doge.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <SuperAdminCreateOwnerPersonalFields {...fieldProps} />
        <SuperAdminCreateOwnerBusinessFields {...fieldProps} />
        <SuperAdminCreateOwnerAccessFields {...fieldProps} />
        <SuperAdminCreateOwnerPlanFields {...fieldProps} onPlanChange={handlePlanChange} />

        <div className="flex justify-end pt-4 border-t border-[var(--border)] gap-4">
          <Link 
            href="/superadmin/owners" 
            className="px-6 py-2.5 border border-[var(--border)] text-[var(--text-secondary)] rounded-md hover:bg-[var(--bg-card)] font-medium"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading} 
            className="px-8 py-2.5 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-hover)] font-medium disabled:opacity-50"
          >
            {loading ? 'Provisioning...' : 'Create Owner Account'}
          </button>
        </div>
      </form>
    </div>
  );
};
