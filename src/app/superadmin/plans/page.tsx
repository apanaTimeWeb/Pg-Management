'use client';

import React from 'react';
import { SuperAdminPlansHeader } from '@/app/superadmin/plans/SuperAdminPlans_components/SuperAdminPlansHeader';
import { SuperAdminPlansGrid } from '@/app/superadmin/plans/SuperAdminPlans_components/SuperAdminPlansGrid';
import { SuperAdminPlansEditModal } from '@/app/superadmin/plans/SuperAdminPlans_components/SuperAdminPlansEditModal';
import { useSuperAdminPlansData } from '@/app/superadmin/plans/SuperAdminPlans_hooks/useSuperAdminPlansData';
import { useSuperAdminPlansActions } from '@/app/superadmin/plans/SuperAdminPlans_hooks/useSuperAdminPlansActions';

export default function SubscriptionPlansPage() {
  const { plans, loading, refetch } = useSuperAdminPlansData();
  const { editPlan, setEditPlan, handleSave } = useSuperAdminPlansActions(refetch);

  return (
    <div className="space-y-6 pb-20">
      <SuperAdminPlansHeader />
      
      <SuperAdminPlansGrid 
        plans={plans} 
        loading={loading} 
        onEditClick={setEditPlan} 
      />

      <SuperAdminPlansEditModal 
        editPlan={editPlan} 
        setEditPlan={setEditPlan} 
        onSave={handleSave} 
      />
    </div>
  );
}