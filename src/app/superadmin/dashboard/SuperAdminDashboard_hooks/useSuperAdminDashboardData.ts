'use client';

import { useEffect, useState } from 'react';
import { platformApi } from '@/app/superadmin/lib/api/platform';
import { SuperAdminDashboardData } from '@/app/superadmin/dashboard/SuperAdminDashboard_types/SuperAdminDashboard.types';

export function useSuperAdminDashboardData() {
  const [data, setData] = useState<SuperAdminDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, replace with async call and error handling
    const fetched = platformApi.getDashboardStats();
    // Safely cast to our strict type matching the API structure
    setData(fetched as unknown as SuperAdminDashboardData);
    setLoading(false);
  }, []);

  return { data, loading };
}
