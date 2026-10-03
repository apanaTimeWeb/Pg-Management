// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminPlansActions.ts]
'use client';

import { useState } from 'react';

import { plansApi } from '@/app/frontend_superadmin/superadmin_lib/superadmin_api/SuperadminPlans';

import type { SuperAdminPlan } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperAdminPlans.types';

export function SuperadminUseSuperAdminPlansActions(refetch: () => void) {
  const [editPlan, setEditPlan] = useState<SuperAdminPlan | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPlan) return;
    
    plansApi.updatePlan(editPlan.id, editPlan as unknown as any);
    setEditPlan(null);
    refetch();
  };

  return {
    editPlan,
    setEditPlan,
    handleSave
  };
}
