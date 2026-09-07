// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminDashboardData.ts]
'use client';

import { useEffect, useState } from 'react';

import { MOCK_DASHBOARD_STATS } from '@/app/superadmin/superadmin_lib/superadmin_mock_data';

import type { SuperAdminDashboardData } from '@/app/superadmin/dashboard/SuperAdminDashboard_types/SuperAdminDashboard.types';

export function SuperadminUseSuperAdminDashboardData() {
  const [data, setData] = useState<SuperAdminDashboardData | null>(MOCK_DASHBOARD_STATS as unknown as SuperAdminDashboardData);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // In a real app, replace with async call and error handling
    const fetched = MOCK_DASHBOARD_STATS;
    // Safely cast to our strict type matching the API structure
    console.log('FETCHED MOCK DATA:', fetched);
    setData(fetched as unknown as SuperAdminDashboardData);
    setLoading(false);
  }, []);

  return { data, loading };
}



