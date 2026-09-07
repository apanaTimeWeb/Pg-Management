// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminAnalyticsData.ts]
'use client';

import { useState, useEffect } from 'react';
import { platformApi } from '@/app/superadmin/superadmin_lib/superadmin_api/SuperadminPlatform';
import type { SuperAdminAnalyticsStats } from '@/app/superadmin/analytics/SuperAdminAnalytics_types/SuperAdminAnalytics.types';

export function SuperadminUseSuperAdminAnalyticsData() {
  const [stats, setStats] = useState<SuperAdminAnalyticsStats | null>(null);

  useEffect(() => {
    setStats(platformApi.getDashboardStats() as SuperAdminAnalyticsStats);
  }, []);

  return {
    stats
  };
}
