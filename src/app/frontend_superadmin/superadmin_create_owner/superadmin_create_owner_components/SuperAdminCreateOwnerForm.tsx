// RESPONSIBILITY: Renders the SuperAdminCreateOwnerForm component.
import React from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

import { SuperadminUseSuperAdminCreateOwner } from '@/app/frontend_superadmin/superadmin_create_owner/SuperAdminCreateOwner_hooks/SuperadminUseSuperAdminCreateOwner';
import { SuperAdminCreateOwnerPersonalFields } from '@/app/frontend_superadmin/superadmin_create_owner/SuperAdminCreateOwner_components/SuperAdminCreateOwnerPersonalFields';
import { SuperAdminCreateOwnerBusinessFields } from '@/app/frontend_superadmin/superadmin_create_owner/SuperAdminCreateOwner_components/SuperAdminCreateOwnerBusinessFields';
import { SuperAdminCreateOwnerAccessFields } from '@/app/frontend_superadmin/superadmin_create_owner/SuperAdminCreateOwner_components/SuperAdminCreateOwnerAccessFields';
import { SuperAdminCreateOwnerPlanFields } from '@/app/frontend_superadmin/superadmin_create_owner/SuperAdminCreateOwner_components/SuperAdminCreateOwnerPlanFields';
import { SuperAdminCreateOwnerSuccess } from '@/app/frontend_superadmin/superadmin_create_owner/SuperAdminCreateOwner_components/SuperAdminCreateOwnerSuccess';

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
  } = SuperadminUseSuperAdminCreateOwner();

  if (success && createdCreds) {
    return <SuperAdminCreateOwnerSuccess credentials={createdCreds} />;
  }

  const fieldProps = { formData, setFormData, errors };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Create PG Owner</h1>
        <p className="text-secondary text-sm flex items-center gap-2 mt-2">
          <AlertCircle className="w-4 h-4 text-warning" />
          Owner self-signup is disabled. SuperAdmin must provision accounts directly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <SuperAdminCreateOwnerPersonalFields {...fieldProps} />
        <SuperAdminCreateOwnerBusinessFields {...fieldProps} />
        <SuperAdminCreateOwnerAccessFields {...fieldProps} />
        <SuperAdminCreateOwnerPlanFields {...fieldProps} onPlanChange={handlePlanChange} />

        <div className="flex justify-end pt-6 border-t border-border gap-4 mt-8">
          <Link 
            href="/frontend_superadmin/superadmin_owners" 
            className="px-6 py-2.5 border border-border text-secondary rounded-xl hover:bg-page font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading} 
            className="px-8 py-2.5 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA] font-semibold disabled:opacity-50 transition-colors shadow-sm focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
          >
            {loading ? 'Provisioning...' : 'Create Owner Account'}
          </button>
        </div>
      </form>
    </div>
  );
};
