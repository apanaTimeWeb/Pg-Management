'use client';

import { useState, useEffect } from 'react';
import { platformApi } from '@/app/superadmin/lib/api/platform';
import { SuperAdminAnalyticsStats } from '../SuperAdminAnalytics_types/SuperAdminAnalytics.types';

export function useSuperAdminAnalyticsData() {
  const [stats, setStats] = useState<SuperAdminAnalyticsStats | null>(null);

  useEffect(() => {
    setStats(platformApi.getDashboardStats() as SuperAdminAnalyticsStats);
  }, []);

  return {
    stats
  };
}
