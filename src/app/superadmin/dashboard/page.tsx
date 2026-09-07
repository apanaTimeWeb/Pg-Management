'use client';

import React from 'react';
import { SuperAdminDashboardKpiGrid } from '@/app/superadmin/dashboard/SuperAdminDashboard_components/SuperAdminDashboardKpiGrid';
import { SuperAdminDashboardLatestRequestsTable } from '@/app/superadmin/dashboard/SuperAdminDashboard_components/SuperAdminDashboardLatestRequestsTable';
import { SuperAdminDashboardAcquisitionChart } from '@/app/superadmin/dashboard/SuperAdminDashboard_components/SuperAdminDashboardAcquisitionChart';
import { useSuperAdminDashboardData } from '@/app/superadmin/dashboard/SuperAdminDashboard_hooks/useSuperAdminDashboardData';
import { SUPER_ADMIN_DASHBOARD_ACQUISITION_MOCK } from '@/app/superadmin/dashboard/SuperAdminDashboard_utils/SuperAdminDashboard.constants';

export default function SuperAdminDashboardPage() {
  const { data, loading } = useSuperAdminDashboardData();

  if (loading || !data) {
    // We rely on loading.tsx for the initial suspense, but keep this fallback 
    // just in case the hook forces a re-render with loading=true.
    return (
      <div className="flex items-center justify-center h-64 text-[var(--text-secondary)]">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <SuperAdminDashboardKpiGrid data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Requests Table */}
        <div className="lg:col-span-2">
          <SuperAdminDashboardLatestRequestsTable requests={data.latestRequests} />
        </div>

        {/* Student Acquisition Chart */}
        <div className="lg:col-span-1">
          <SuperAdminDashboardAcquisitionChart data={SUPER_ADMIN_DASHBOARD_ACQUISITION_MOCK} />
        </div>
      </div>
    </div>
  );
}
