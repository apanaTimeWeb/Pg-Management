'use client';

import { useState } from 'react';
import { plansApi } from '@/app/superadmin/lib/api/plans';
import { SuperAdminPlan } from '../SuperAdminPlans_types/SuperAdminPlans.types';

export function useSuperAdminPlansActions(refetch: () => void) {
  const [editPlan, setEditPlan] = useState<SuperAdminPlan | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPlan) return;
    
    plansApi.updatePlan(editPlan.id, editPlan);
    setEditPlan(null);
    refetch();
  };

  return {
    editPlan,
    setEditPlan,
    handleSave
  };
}
