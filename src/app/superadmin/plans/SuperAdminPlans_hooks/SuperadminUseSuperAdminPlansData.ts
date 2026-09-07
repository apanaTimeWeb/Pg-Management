// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminPlansData.ts]
'use client';

import { useState, useEffect } from 'react';
import { plansApi } from '@/app/superadmin/superadmin_lib/superadmin_api/SuperadminPlans';
import type { SuperAdminPlan } from '@/app/superadmin/plans/SuperAdminPlans_types/SuperAdminPlans.types';

export function SuperadminUseSuperAdminPlansData() {
  const [plans, setPlans] = useState<SuperAdminPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlans = () => {
    setLoading(true);
    setPlans(plansApi.listPlans() as unknown as SuperAdminPlan[]);
    setLoading(false);
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return {
    plans,
    loading,
    refetch: loadPlans
  };
}
