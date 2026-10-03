// DATA FLOW: Mock data → useState → UI
'use client';

import { useState } from 'react';
import { MOCK_PLANS } from '@/app/frontend_superadmin/superadmin_lib/superadmin_mock_data';
import type { SuperAdminPlan } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperAdminPlans.types';

export function SuperadminUseSuperAdminPlansData() {
  const [plans] = useState<SuperAdminPlan[]>(MOCK_PLANS as unknown as SuperAdminPlan[]);
  const [loading] = useState(false);

  return {
    plans,
    loading,
    refetch: () => {},
  };
}
