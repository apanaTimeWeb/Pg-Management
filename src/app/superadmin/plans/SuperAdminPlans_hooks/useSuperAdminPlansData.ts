'use client';

import { useState, useEffect } from 'react';
import { plansApi } from '@/app/superadmin/lib/api/plans';
import { SuperAdminPlan } from '../SuperAdminPlans_types/SuperAdminPlans.types';

export function useSuperAdminPlansData() {
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
